"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { isDemoWorkflowId, isNumericWorkflowId } from "@/lib/demoWorkflows";

export async function getWorkflowHistoryAction(workflowId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Unauthorized" };

        // Handle demo workflows - find their temporary database records
        if (isDemoWorkflowId(workflowId)) {
            // Find all temporary workflow records created for this demo workflow
            const demoWorkflows = await prisma.workflow.findMany({
                where: {
                    userId: userId,
                    name: {
                        startsWith: `Demo Workflow - ${workflowId}`
                    }
                },
                select: { id: true }
            });
            
            if (demoWorkflows.length === 0) {
                return { success: true, runs: [] };
            }
            
            // Fetch runs for all temporary demo workflow records
            const runs = await prisma.workflowRun.findMany({
                where: {
                    workflowId: {
                        in: demoWorkflows.map(w => w.id)
                    },
                },
                include: {
                    nodeExecutions: {
                        orderBy: { startedAt: "asc" },
                    },
                },
                orderBy: { startedAt: "desc" },
                take: 20,
            });
            
            return formatRunsResponse(runs);
        }
        
        // Handle regular numeric workflow IDs
        if (!isNumericWorkflowId(workflowId)) {
            return { success: true, runs: [] };
        }
        const numericId = parseInt(workflowId, 10);

        // Fetch runs with detailed node executions
        const runs = await prisma.workflowRun.findMany({
            where: {
                workflowId: numericId,
            },
            include: {
                nodeExecutions: {
                    orderBy: { startedAt: "asc" },
                },
            },
            orderBy: { startedAt: "desc" },
            take: 20, // Limit to last 20 runs to keep it fast
        });

        return formatRunsResponse(runs);

    } catch (error) {
        console.error("Fetch History Error:", error);
        return { success: false, error: "Failed to fetch history" };
    }
}

// Helper function to format runs response
function formatRunsResponse(runs: any[]) {
    // Format for Frontend
    const formattedRuns = runs.map((run) => ({
        id: run.id,
        status: run.status,
        triggerType: run.triggerType,
        startedAt: run.startedAt.toISOString(),
        finishedAt: run.finishedAt?.toISOString() || null,
        duration: run.finishedAt
            ? Math.round((run.finishedAt.getTime() - run.startedAt.getTime()) / 1000) + "s"
            : "...",
        nodes: run.nodeExecutions.map((node: any) => ({
            id: node.id,
            nodeId: node.nodeId, // The React Flow Node ID
            type: node.nodeType,
            status: node.status,
            input: node.inputData,
            output: node.outputData,
            error: node.error,
            duration: node.finishedAt
                ? ((node.finishedAt.getTime() - node.startedAt.getTime()) / 1000).toFixed(2) + "s"
                : null
        })),
    }));

    return { success: true, runs: formattedRuns };
}