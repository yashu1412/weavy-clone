"use server";

import prisma from "@/lib/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { tasks, runs } from "@trigger.dev/sdk/v3";
import type { SaveWorkflowParams } from "@/lib/types";
import { saveWorkflowSchema } from "@/lib/schemas";
import { isDemoWorkflowId, isNumericWorkflowId } from "@/lib/demoWorkflows";
import { createShortWorkflowId } from "@/lib/workflowId";
import { z } from "zod";

// Helper to ensure User exists in our DB before acting
async function ensureUserExists(userId: string) {
    const dbUser = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!dbUser) {
        const clerkUser = await currentUser();
        if (!clerkUser) throw new Error("User not found in Clerk");

        await prisma.user.create({
            data: {
                id: userId,
                email: clerkUser.emailAddresses[0].emailAddress,
                firstName: clerkUser.firstName,
                lastName: clerkUser.lastName,
            },
        });
    }
}

// ------------------------------------------------------------------
// SAVE ACTION
// ------------------------------------------------------------------
export async function saveWorkflowAction(params: SaveWorkflowParams) {
    try {
        const user = await currentUser();
        if (!user) {
            return { success: false, error: "Unauthorized" };
        }

        // Validate Input using Zod
        const result = saveWorkflowSchema.safeParse(params);
        if (!result.success) {
            console.error("Validation Error:", result.error.format());
            // Zod v3 uses .issues or .errors. If TS complains about .errors, we can map .issues.
            const firstError = result.error.issues[0];
            return { success: false, error: "Invalid workflow data: " + firstError.message };
        }

        const { id, name, nodes, edges } = result.data;

        await ensureUserExists(user.id);

        // Prepare JSON data
        // We cast to 'any' because Prisma's InputJsonValue is stricter than 
        // our complex Node types, even though they are valid JSON at runtime.
        const workflowData = { nodes, edges };

        // Handle string IDs (new format) vs numeric IDs (legacy)
        const isStringId = typeof id === "string" && !isNumericWorkflowId(id);
        
        if (id && !isDemoWorkflowId(id)) {
            // UPDATE Existing workflow
            console.log(`Updating Workflow ID: ${id}`);

            const workflow = await prisma.workflow.update({
                where: {
                    id: String(id),
                    userId: user.id,
                },
                data: {
                    name,
                    data: workflowData as any,
                },
            });

            revalidatePath("/flow");
            return { success: true, id: workflow.id.toString() };
        } else {
            // CREATE New workflow with string ID
            console.log(`Creating New Workflow for: ${user.id}`);

            const workflowId = id || createShortWorkflowId();

            const workflow = await prisma.workflow.create({
                data: {
                    id: workflowId, // Use string ID
                    name,
                    data: workflowData as any,
                    userId: user.id,
                },
            });

            console.log(`[Action] Created Workflow with ID: ${workflow.id}`);
            revalidatePath("/flow");
            return { success: true, id: workflow.id.toString() };
        }
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to save workflow." };
    }
}

// ------------------------------------------------------------------
// LOAD ACTION
// ------------------------------------------------------------------
export async function loadWorkflowAction(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        const workflow = await prisma.workflow.findUnique({
            where: {
                id: id, // Use string ID directly
                userId: userId,
            },
        });

        if (!workflow) return { success: false, error: "Workflow not found" };

        // Define a type for workflow data if not already defined
        type WorkflowData = {
            nodes: unknown[];
            edges: unknown[];
        };

        return {
            success: true,
            data: workflow.data as WorkflowData,
            name: workflow.name,
        };
    } catch (error) {
        console.error("Load Error:", error);
        return { success: false, error: "Failed to load workflow." };
    }
}

// ------------------------------------------------------------------
// GET ALL ACTION
// ------------------------------------------------------------------
export async function getAllWorkflowsAction() {
    try {
        const { userId } = await auth();
        console.log(`[getAllWorkflowsAction] Fetching workflows for User: ${userId}`);

        if (!userId) {
            console.error("[getAllWorkflowsAction] No User ID found (Unauthorized)");
            return { success: false, error: "Unauthorized", workflows: [] };
        }

        const workflows = await prisma.workflow.findMany({
            where: { userId },
            orderBy: { updatedAt: "desc" },
            select: {
                id: true,
                name: true,
                updatedAt: true,
                createdAt: true,
            },
        });

        console.log(`[getAllWorkflowsAction] Found ${workflows.length} workflows`);

        interface WorkflowSummary {
            id: string;
            name: string;
            created_at: string;
            updated_at: string;
        }

        const formattedWorkflows: WorkflowSummary[] = workflows.map((wf: any) => ({
            id: wf.id.toString(), // Convert to string
            name: wf.name,
            created_at: wf.createdAt.toISOString(),
            updated_at: wf.updatedAt.toISOString(),
        }));

        return { success: true, workflows: formattedWorkflows };
    } catch (error) {
        console.error("Fetch Workflows Error:", error);
        return { success: false, error: "Failed to fetch workflows.", workflows: [] };
    }
}

// ------------------------------------------------------------------
// DELETE ACTION
// ------------------------------------------------------------------
export async function deleteWorkflowAction(id: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        await prisma.workflow.delete({
            where: {
                id: id, // Use string ID directly
                userId: userId,
            },
        });

        revalidatePath("/flow");
        return { success: true };
    } catch (error) {
        console.error("Delete Error:", error);
        return { success: false, error: "Failed to delete workflow." };
    }
}

// ------------------------------------------------------------------
// RUN ACTION (Trigger.dev)
// ------------------------------------------------------------------
function getTriggerDevErrorMessage(error: unknown): string {
    const msg = error instanceof Error ? error.message : String(error);
    const lower = msg.toLowerCase();
    // Unwrap cause chain (e.g. TriggerApiError "Connection error." with cause.cause.code === 'ECONNREFUSED')
    const cause = error && typeof error === "object" && "cause" in error ? (error as { cause?: unknown }).cause : undefined;
    const causeCode = cause && typeof cause === "object" && cause !== null && "code" in cause ? (cause as { code?: string }).code : undefined;
    const nestedCode = cause && typeof cause === "object" && cause !== null && "cause" in cause
        ? (cause as { cause?: { code?: string } }).cause?.code
        : undefined;
    const isConnectionRefused = lower.includes("econnrefused") || lower.includes("connection refused")
        || causeCode === "ECONNREFUSED" || nestedCode === "ECONNREFUSED"
        || lower.includes("connection error");

    if (!process.env.TRIGGER_SECRET_KEY || process.env.TRIGGER_SECRET_KEY === "") {
        return "Trigger.dev is not configured. Add TRIGGER_SECRET_KEY to .env and restart the dev server. For demo workflows, use the Run button on each LLM node instead.";
    }
    if (isConnectionRefused) {
        return "Trigger.dev dev server is not running. In a separate terminal run: npx trigger dev (then try Run again).";
    }
    if (lower.includes("timeout") || lower.includes("etimedout")) {
        return "Trigger.dev request timed out. Check your network and that the Trigger.dev dev server is running.";
    }
    if (lower.includes("api") && (lower.includes("key") || lower.includes("auth") || lower.includes("401") || lower.includes("403"))) {
        return "Trigger.dev authentication failed. Check TRIGGER_SECRET_KEY in .env.";
    }
    return msg || "Unknown Trigger.dev error.";
}

export async function runWorkflowAction(workflowId: string): Promise<{ success: true; runId: string } | { success: false; error: string }> {
    console.log(`[Action] Attempting to run workflow: "${workflowId}"`);
    console.log(`[Action] Trigger Secret Key: ${process.env.TRIGGER_SECRET_KEY ? 'SET' : 'NOT SET'}`);
    console.log(`[Action] Trigger API URL: ${process.env.TRIGGER_API_URL}`);

    try {
        const { userId } = await auth();
        if (!userId) {
            console.error("[Action] User not found");
            return { success: false, error: "Unauthorized" };
        }

        // Full workflow run requires Trigger.dev; fail fast with a clear message if not configured
        if (!process.env.TRIGGER_SECRET_KEY || process.env.TRIGGER_SECRET_KEY === "") {
            const isDemo = isDemoWorkflowId(workflowId);
            return {
                success: false,
                error: isDemo
                    ? "Full workflow run requires Trigger.dev. Use the Run button on each LLM node to run with Gemini directly."
                    : "Trigger.dev is not configured. Add TRIGGER_SECRET_KEY to .env, run `npx trigger dev`, and restart your app. To run only the LLM nodes, use each node's Run button.",
            };
        }

        // 1. Validate ID and handle demo workflows
        if (isDemoWorkflowId(workflowId)) {
            console.log(`[Action] Demo workflow detected: ${workflowId}. Creating temporary database record...`);
            
            // For demo workflows, create a temporary database record
            const demoWorkflow = await prisma.workflow.create({
                data: {
                    id: `demo_${workflowId}_${Date.now()}`, // Unique string ID
                    name: `Demo Workflow - ${workflowId}`,
                    userId: userId,
                    data: {
                        nodes: [],
                        edges: [],
                    },
                },
            });
            
            return await executeWorkflowRun(demoWorkflow.id, userId);
        }
        
        // Handle both string and numeric IDs (for backward compatibility)
        if (!isDemoWorkflowId(workflowId) && !isNumericWorkflowId(workflowId)) {
            console.error(`[Action] Invalid Workflow ID: ${workflowId}`);
            return { success: false, error: `Invalid Workflow ID: "${workflowId}". Please save workflow first.` };
        }
        
        return await executeWorkflowRun(workflowId, userId);

    } catch (error) {
        console.error("[Action] CRITICAL FAILURE:", error);
        const isDemo = isDemoWorkflowId(workflowId);
        if (isDemo) {
            return {
                success: false,
                error: "Full workflow run requires Trigger.dev. Use the Run button on each LLM node to run with Gemini directly.",
            };
        }
        const detail = getTriggerDevErrorMessage(error);
        return { success: false, error: `Run failed: ${detail}` };
    }
}

// Timeout for Trigger.dev trigger call so we don't hang and get request aborted / 404
const TRIGGER_DEV_TIMEOUT_MS = 30_000;

// Helper function to execute workflow run
async function executeWorkflowRun(workflowId: string, userId: string): Promise<{ success: true; runId: string } | { success: false; error: string }> {
    // 2. Create the PENDING record
    console.log(`[Action] Creating DB Record for ID: ${workflowId}...`);

    const run = await prisma.workflowRun.create({
        data: {
            workflowId: workflowId, // String ID
            status: "PENDING",
            triggerType: "MANUAL",
        },
    });

    console.log(`[Action] Run Created! Run ID: ${run.id}`);

    // 3. Trigger the Task (with timeout to avoid long hang → client abort / 404)
    console.log(`[Action] Triggering Orchestrator...`);
    const triggerPromise = tasks.trigger("workflow-orchestrator", {
        runId: run.id,
    });
    const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error("Trigger.dev request timed out. Is the dev server running? Run: npx trigger dev")), TRIGGER_DEV_TIMEOUT_MS)
    );
    await Promise.race([triggerPromise, timeoutPromise]);

    return { success: true as const, runId: run.id };
}

// ------------------------------------------------------------------
// EXECUTE SINGLE NODE ACTION (Trigger.dev)
// ------------------------------------------------------------------
export async function executeNodeAction(nodeType: string, data: any) {
    // Basic Input Validation for Node Execution
    if (!nodeType || !data) {
        return { success: false, error: "Invalid input: Missing nodeType or data" };
    }

    // Optional: Add specific schemas for node types here if needed
    // For now, we ensure basic structure is valid JSON
    try {
        JSON.stringify(data);
    } catch (e) {
        return { success: false, error: "Invalid data: Not JSON serializable" };
    }

    try {
        const user = await currentUser();
        if (!user) return { success: false, error: "Unauthorized" };
        const userId = user.id; // Define userId from the currentUser

        const workflowId = data.workflowId ? data.workflowId.toString() : null;
        if (!workflowId) {
            return { success: false, error: "Please save workflow before running nodes." };
        }

        // 1. Create a "Single Node" Run Record
        const run = await prisma.workflowRun.create({
            data: {
                workflowId: workflowId,
                status: "RUNNING",
                triggerType: "SINGLE_NODE",
            }
        });

        // 2. Create the Node Execution Record
        const nodeExecution = await prisma.nodeExecution.create({
            data: {
                runId: run.id,
                nodeId: data.id || "unknown-node",
                nodeType: nodeType,
                status: "RUNNING",
                inputData: data,
                startedAt: new Date(),
            }
        });

        let taskPayload: any;
        let taskId: string;

        switch (nodeType) {
            case "llmNode":
                taskId = "generate-text";
                taskPayload = {
                    model: data.model,
                    prompt: data.prompt,
                    systemPrompt: data.systemPrompt,
                    imageUrls: data.imageUrls
                };
                break;

            case "cropImageNode":
                taskId = "crop-image";
                taskPayload = {
                    imageUrl: data.imageUrl,
                    x: data.xPercent,
                    y: data.yPercent,
                    width: data.widthPercent,
                    height: data.heightPercent
                };
                break;

            case "extractFrameNode":
                taskId = "extract-frame";
                taskPayload = {
                    videoUrl: data.videoUrl,
                    timestamp: data.timestamp
                };
                break;

            default:
                throw new Error("Unknown node type");
        }

        try {
            // Step 1: Fire the task
            const handle = await tasks.trigger(taskId, taskPayload);

            // Step 2: Poll until complete
            const completedRun = await runs.poll(handle, { pollIntervalMs: 500 });

            // Step 3: Check result
            if (completedRun.status === "COMPLETED" && completedRun.output) {
                await prisma.nodeExecution.update({
                    where: { id: nodeExecution.id },
                    data: {
                        status: "SUCCESS",
                        finishedAt: new Date(),
                        outputData: completedRun.output as any
                    }
                });

                await prisma.workflowRun.update({
                    where: { id: run.id },
                    data: { status: "COMPLETED", finishedAt: new Date() }
                });

                revalidatePath(`/flow/${workflowId}`);
                return { success: true, output: completedRun.output };
            } else {
                throw new Error(`Task failed with status: ${completedRun.status}` + (completedRun.output?.error ? ` - ${completedRun.output.error}` : ""));
            }

        } catch (taskError: any) {
            console.error("Task Execution Failed:", taskError);
            const errorMessage = taskError.message || "Unknown error";

            await prisma.nodeExecution.update({
                where: { id: nodeExecution.id },
                data: {
                    status: "FAILED",
                    finishedAt: new Date(),
                    error: errorMessage
                }
            });

            await prisma.workflowRun.update({
                where: { id: run.id },
                data: { status: "FAILED", finishedAt: new Date() }
            });

            revalidatePath(`/flow/${workflowId}`);
            return { success: false, error: errorMessage };
        }

    } catch (error) {
        console.error("Execute Node Error:", error);
        return { success: false, error: "Failed to execute node." };
    }
}