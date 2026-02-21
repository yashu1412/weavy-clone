"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/** Payload for direct LLM runs (demo workflows or when Trigger.dev is unavailable). */
export type RunLLMDirectPayload = {
    model: string;
    prompt: string;
    systemPrompt?: string;
    imageUrls?: string[];
    temperature?: number;
};

/**
 * Run Gemini directly from the server (no Trigger.dev).
 * Use for demo workflows or when the orchestrator is unavailable.
 * Return shape matches executeNodeAction so LLMNode can use either path.
 */
export async function runLLMDirectAction(payload: RunLLMDirectPayload): Promise<
    { success: true; output: { text: string } } | { success: false; error: string }
> {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return { success: false, error: "GEMINI_API_KEY is not set. Add it in .env to run nodes." };
        }

        const modelName = payload.model || "gemini-flash-latest";
        const model = genAI.getGenerativeModel({
            model: modelName,
            generationConfig: payload.temperature != null ? { temperature: payload.temperature } : undefined,
        });

        let fullText = payload.prompt;
        if (payload.systemPrompt) {
            fullText = `System Instructions: ${payload.systemPrompt}\n\nUser Request: ${payload.prompt}`;
        }

        if (payload.imageUrls && payload.imageUrls.length > 0) {
            const imageParts = payload.imageUrls.map((base64String) => {
                const base64Data = base64String.split(",")[1] || base64String;
                const mimeMatch = base64String.match(/data:(.*?);base64/);
                const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
                return {
                    inlineData: { data: base64Data, mimeType },
                };
            });
            
            const result = await model.generateContent([
                { text: fullText },
                ...imageParts
            ]);
            const response = await result.response;
            return { success: true, output: { text: response.text() } };
        }

        const result = await model.generateContent(fullText);
        const response = await result.response;
        return { success: true, output: { text: response.text() } };
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Unknown error during generation";
        return { success: false, error: message };
    }
}

export async function generateContent(
    model: string,
    prompt: string,
    imageUrls: string[] = []
) {
    try {
        const geminiModel = genAI.getGenerativeModel({ model });

        if (imageUrls.length > 0) {
            const imageParts = imageUrls.map((base64String) => {
                // Safe split to get data
                const base64Data = base64String.split(',')[1] || base64String;
                const mimeMatch = base64String.match(/data:(.*?);base64/);
                const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

                return {
                    inlineData: {
                        data: base64Data,
                        mimeType: mimeType,
                    },
                };
            });

            const result = await geminiModel.generateContent([
                { text: prompt },
                ...imageParts
            ]);
            const response = await result.response;

            return { success: true, text: response.text() };
        } else {
            const result = await geminiModel.generateContent(prompt);
            const response = await result.response;

            return { success: true, text: response.text() };
        }
    } catch (error: unknown) {
        console.error("Gemini API Error:", error);

        // Fix: Type-safe error handling
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred during generation";

        return {
            success: false,
            error: errorMessage,
        };
    }
}   