import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { temporal } from "zundo";

import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  Edge,
  EdgeChange,
  NodeChange,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
} from "@xyflow/react";

import { AppNode } from "@/lib/types";

type WorkflowState = {
  userId: string | null;
  nodes: AppNode[];
  edges: Edge[];

  workflowId: string | null;
  workflowName: string;

  lastRunTimestamp: number | null;

  // actions
  setUserId: (userId: string | null) => void;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;

  updateNodeData: (id: string, data: Partial<AppNode["data"]>) => void;

  addNode: (node: AppNode) => void;
  deleteNode: (id: string) => void;

  resetWorkflow: () => void;

  setWorkflowId: (id: string | null) => void;
  setWorkflowName: (name: string) => void;

  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;

  clearUserData: () => void;

  setLastRunTimestamp: (timestamp: number) => void;
};

const initialNodes: AppNode[] = [];
const initialEdges: Edge[] = [];

/* ------------------------------------------------------- */
/* ✅ USER AWARE LOCAL STORAGE */
/* ------------------------------------------------------- */

const userAwareStorage = {
  getItem: (name: string) => {
    const keys = Object.keys(localStorage).filter((k) =>
      k.startsWith(name)
    );

    if (!keys.length) return null;

    return localStorage.getItem(keys[0]);
  },

  setItem: (name: string, value: string) => {
    const parsed = JSON.parse(value);
    const userId = parsed.state?.userId;

    const key = userId ? `${name}-${userId}` : name;

    localStorage.setItem(key, value);
  },

  removeItem: (name: string) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(name)) {
        localStorage.removeItem(key);
      }
    });
  },
};

/* ------------------------------------------------------- */
/* ✅ STORE */
/* ------------------------------------------------------- */

export const useWorkflowStore = create<WorkflowState>()(
  temporal(
    persist(
      (set, get) => ({
        userId: null,
        workflowId: null,
        workflowName: "Untitled Workflow",

        nodes: initialNodes,
        edges: initialEdges,

        lastRunTimestamp: null,

        /* ---------------- USER ---------------- */

        setUserId: (userId) => {
          const current = get().userId;

          if (current !== userId) {
            set({
              userId,
              nodes: [],
              edges: [],
              workflowId: null,
              workflowName: "Untitled Workflow",
            });
          } else {
            set({ userId });
          }
        },

        /* ---------------- FLOW ---------------- */

        onNodesChange: (changes: NodeChange[]) =>
          set({
            nodes: applyNodeChanges(
              changes,
              get().nodes
            ) as AppNode[],
          }),

        onEdgesChange: (changes: EdgeChange[]) =>
          set({
            edges: applyEdgeChanges(changes, get().edges),
          }),

        onConnect: (connection: Connection) => {
                    // Create edge with required properties for addEdge function
                    const edge = {
                        ...connection,
                        type: 'animatedEdge' as const, // Matches to key we will define in FlowEditor
                        animated: true,       // Adds "marching ants" animation automatically
                        style: { strokeWidth: 3 },
                    };

                    set({
                        edges: addEdge(edge as Edge, get().edges),
                    });
                },

        updateNodeData: (id, newData) =>
          set({
            nodes: get().nodes.map((n) =>
              n.id === id
                ? { ...n, data: { ...n.data, ...newData } }
                : n
            ),
          }),

        addNode: (node) =>
          set({
            nodes: [...get().nodes, node],
          }),

        deleteNode: (id) =>
          set({
            nodes: get().nodes.filter((n) => n.id !== id),
            edges: get().edges.filter(
              (e) => e.source !== id && e.target !== id
            ),
          }),

        /* ---------------- WORKFLOW ---------------- */

        resetWorkflow: () =>
          set({
            nodes: [],
            edges: [],
            workflowId: null,
            workflowName: "Untitled Workflow",
          }),

        setWorkflowId: (id) => set({ workflowId: id }),

        setWorkflowName: (name) =>
          set({ workflowName: name }),

        setNodes: (nodes) => set({ nodes }),

        setEdges: (edges) => set({ edges }),

        clearUserData: () =>
          set({
            userId: null,
            nodes: [],
            edges: [],
            workflowId: null,
            workflowName: "Untitled Workflow",
          }),

        setLastRunTimestamp: (timestamp) =>
          set({ lastRunTimestamp: timestamp }),
      }),

      /* ---------------- PERSIST CONFIG ---------------- */

      {
        name: "workflow-storage",
        version: 4,
        storage: createJSONStorage(() => userAwareStorage),

        partialize: (state) => ({
          userId: state.userId,
          nodes: state.nodes,
          edges: state.edges,
          workflowId: state.workflowId,
          workflowName: state.workflowName,
        }),
      }
    ),

    /* ---------------- UNDO/REDO ---------------- */

    {
      limit: 100,

      equality: (past, current) => {
        const strip = (state: any) => ({
          edges: state.edges,
          nodes: state.nodes?.map(
            ({ position, selected, dragging, measured, ...rest }: any) =>
              rest
          ),
        });

        return (
          JSON.stringify(strip(past)) ===
          JSON.stringify(strip(current))
        );
      },
    }
  )
);
