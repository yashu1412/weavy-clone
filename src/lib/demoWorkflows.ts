import { AppNode } from "./types";
import { Edge } from "@xyflow/react";

/** Prefix for demo workflow URL slugs (e.g. demo-product-listing). */
export const DEMO_ID_PREFIX = "demo-";

/** True if the id is a known demo workflow slug (no DB record). */
export function isDemoWorkflowId(id: string | null | undefined): boolean {
    if (id == null || id === "") return false;
    return DEMO_WORKFLOWS.some((d) => d.id === id) || id.startsWith(DEMO_ID_PREFIX);
}

/** True if the id is a valid numeric DB workflow id (positive integer). */
export function isNumericWorkflowId(id: string | number | null | undefined): boolean {
    if (id == null || id === "") return false;
    const n = typeof id === "string" ? parseInt(id, 10) : id;
    return typeof n === "number" && !isNaN(n) && n > 0;
}

export const DEMO_WORKFLOWS = [
  {
    id: "demo-workflow",
    name: "Visual Marketing Pipeline",
    description:
      "Generates a product description from a cropped photo + extracts a mid-video frame, then writes a tweet-length marketing post using both visuals.",
    thumbnail: "🧠",
    image:
      "https://media.weavy.ai/image/upload/f_auto,q_auto/v1/uploads/gclnmopestmtomr4wk9k?_a=BAMAMiWO0",
    getGraph: (): { nodes: AppNode[]; edges: Edge[] } => {
      const nodes: AppNode[] = [
        // =========================================================
        // BRANCH A — Image Processing + Product Description
        // Nodes: Upload.Image -> Crop.Image + Text(x2) -> LLM #1
        // =========================================================
        {
          id: "img-upload",
          type: "imageNode",
          position: { x: 0, y: 40 },
          data: {
            label: "Upload Product Image",
            status: "success",
            inputType: "upload",
            file: {
              url: "/demo/demo_1.png",
              name: "demo_1.png",
              type: "image/png"
            },
          },
        },

        {
          id: "img-crop",
          type: "cropImageNode",
          position: { x: 260, y: 40 },
          data: {
            label: "Crop Image (Center 80%)",
            status: "idle",
            xPercent: 10,
            yPercent: 10,
            widthPercent: 80,
            heightPercent: 80,
            // optional preview image for demo purposes
            imageUrl: "/demo/demo_1.png",
          },
        },

        {
          id: "txt-a-system",
          type: "textNode",
          position: { x: 260, y: 250 },
          data: {
            label: "Text #1 (System Prompt)",
            status: "idle",
            text: `You are a professional marketing copywriter.
Generate a compelling one-paragraph product description.`,
          },
        },

        {
          id: "txt-a-details",
          type: "textNode",
          position: { x: 260, y: 430 },
          data: {
            label: "Text #2 (Product Details)",
            status: "idle",
            text: `Product: Wireless Bluetooth Headphones.
Features: Noise cancellation, 30-hour battery, foldable design.`,
          },
        },

        {
          id: "llm-1",
          type: "llmNode",
          position: { x: 560, y: 220 },
          data: {
            label: "LLM Node #1 — Product Description",
            status: "idle",
            model: "gemini-2.5-flash",
            outputs: [],
            temperature: 0.6,
            viewMode: "single",
            imageHandleCount: 1,
            systemPrompt: "",
          },
        },

        // =========================================================
        // BRANCH B — Video Frame Extraction
        // Nodes: Upload.Video -> Extract Frame (timestamp 50%)
        // =========================================================
        {
          id: "vid-upload",
          type: "videoNode",
          position: { x: 0, y: 720 },
          data: {
            label: "Upload Product Video",
            status: "success",
            inputType: "upload",
            file: {
              url: "/demo/demoV_1.mp4",
              name: "demoV_1.mp4",
              type: "video/mp4"
            },
          },
        },

        {
          id: "vid-frame",
          type: "extractFrameNode",
          position: { x: 260, y: 720 },
          data: {
            label: "Extract Frame (50%)",
            status: "idle",
            timestamp: "50%", // 50% into the video
          },
        },

        // =========================================================
        // CONVERGENCE — Final Marketing Summary (tweet-length)
        // Node: LLM #2 (waits for BOTH branches)
        // Inputs: system prompt + LLM#1 output + cropped image + video frame
        // =========================================================
        {
          id: "txt-c-system",
          type: "textNode",
          position: { x: 560, y: 520 },
          data: {
            label: "Text #3 (System Prompt)",
            status: "idle",
            text: `You are a social media manager.
Create a tweet-length marketing post based on the product image and video frame.`,
          },
        },

        {
          id: "llm-2",
          type: "llmNode",
          position: { x: 900, y: 520 },
          data: {
            label: "LLM Node #2 — Final Tweet/Post",
            status: "idle",
            model: "gemini-2.5-flash",
            outputs: [],
            temperature: 0.7,
            viewMode: "single",
            imageHandleCount: 2, // cropped image + extracted frame
            systemPrompt: "",
          },
        },
      ];

      const edges: Edge[] = [
        // -----------------------
        // Branch A wiring
        // -----------------------
        {
          id: "a1",
          source: "img-upload",
          sourceHandle: "output",
          target: "img-crop",
          targetHandle: "image_url",
          type: "animatedEdge",
          animated: true,
        },
        {
          id: "a2",
          source: "img-crop",
          target: "llm-1",
          targetHandle: "image-0",
          type: "animatedEdge",
          animated: true,
        },
        {
          id: "a3",
          source: "txt-a-system",
          target: "llm-1",
          targetHandle: "system-prompt",
          type: "default",
        },
        {
          id: "a4",
          source: "txt-a-details",
          target: "llm-1",
          targetHandle: "prompt",
          type: "default",
        },

        // -----------------------
        // Branch B wiring
        // -----------------------
        {
          id: "b1",
          source: "vid-upload",
          sourceHandle: "output",
          target: "vid-frame",
          targetHandle: "video_url",
          type: "animatedEdge",
          animated: true,
        },

        // -----------------------
        // Convergence wiring
        // -----------------------
        {
          id: "c1",
          source: "txt-c-system",
          target: "llm-2",
          targetHandle: "system-prompt",
          type: "default",
        },
        {
          id: "c2",
          source: "llm-1",
          sourceHandle: "response",
          target: "llm-2",
          targetHandle: "prompt",
          type: "animatedEdge",
          animated: true,
        },
        {
          id: "c3",
          source: "img-crop",
          target: "llm-2",
          targetHandle: "image-0",
          type: "animatedEdge",
          animated: true,
        },
        {
          id: "c4",
          source: "vid-frame",
          target: "llm-2",
          targetHandle: "image-1",
          type: "animatedEdge",
          animated: true,
        },
      ];

      return { nodes, edges };
    },
  },
];

export const TUTORIALS = [
    {
        id: "intro-weavy",
        title: "Introduction to Weavy",
        thumbnail: "https://media.weavy.ai/image/upload/v1748958081/product/assets/tutorials_posters/Intro_s89joq.avif",
        url: "https://www.youtube.com/watch?v=YGx90x8XaHI?utm_source=weavy_gallery"
    },
    {
        id: "weavy-101",
        title: "Weavy 101",
        thumbnail: "https://media.weavy.ai/image/upload/v1751201353/product/assets/tutorials_posters/gr5rtbqs7jevqrku1rep.avif",
        url: "https://www.youtube.com/watch?v=wMTqdtTexe4?utm_source=weavy_gallery"
    },
    {
        id: "build-first-ai-workflow",
        title: "Build Your First AI Workflow...",
        thumbnail: "https://media.weavy.ai/image/upload/v1748958081/product/assets/tutorials_posters/Tutorial_1_pd4ykx.avif",
        url: "https://www.youtube.com/watch?v=ihOFi5lpQr8?utm_source=weavy_gallery"
    },
];