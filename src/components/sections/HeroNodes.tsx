"use client";

import {
  Position,
  useNodeId,
  useStore,
} from "@xyflow/react";

import { NodeHandle } from "./primitives";
import type {
  ImageNodeData,
  TextNodeData,
  VideoNodeData,
} from "./types";

/* =====================================================
   Detect Node Connections
===================================================== */

const useNodeConnections = () => {
  const nodeId = useNodeId();

  const { hasIncoming, hasOutgoing } = useStore((store) => {
    const edges = store.edges;

    return {
      hasIncoming: edges.some((e) => e.target === nodeId),
      hasOutgoing: edges.some((e) => e.source === nodeId),
    };
  });

  return { hasIncoming, hasOutgoing };
};

/* =====================================================
   IMAGE NODE
===================================================== */

interface ImageNodeProps {
  data: ImageNodeData;
}

export const ImageNode = ({ data }: ImageNodeProps) => {
  const { hasIncoming, hasOutgoing } = useNodeConnections();

  return (
    <div className="group select-none">
      <div className="flex items-center gap-3 mb-2 px-1">
        {data.sublabel && (
          <span className="text-[11px] tracking-wider text-black/50 uppercase">
            {data.sublabel}
          </span>
        )}
        <span className="text-[11px] tracking-wider text-black uppercase">
          {data.label}
        </span>
      </div>

      <div
        className="relative rounded-lg overflow-hidden bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/10"
        style={{ width: data.width, height: data.height }}
      >
        <img
          src={data.image}
          alt={data.label}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {hasIncoming && (
          <NodeHandle type="target" position={Position.Left} />
        )}

        {hasOutgoing && (
          <NodeHandle type="source" position={Position.Right} />
        )}
      </div>
    </div>
  );
};

/* =====================================================
   TEXT NODE
===================================================== */

interface TextNodeProps {
  data: TextNodeData;
}

export const TextNode = ({ data }: TextNodeProps) => {
  const { hasIncoming, hasOutgoing } = useNodeConnections();

  return (
    <div className="group select-none">
      <div className="flex items-center gap-3 mb-2 px-1">
        <span className="text-[11px] tracking-wider text-black uppercase">
          {data.label}
        </span>
      </div>

      <div
        className="relative p-5 rounded-lg bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/10"
        style={{ width: data.width }}
      >
        <p className="text-[12px] leading-[1.7] text-black/70">
          {data.text}
        </p>

        {hasIncoming && (
          <NodeHandle type="target" position={Position.Left} />
        )}

        {hasOutgoing && (
          <NodeHandle type="source" position={Position.Right} />
        )}
      </div>
    </div>
  );
};

/* =====================================================
   VIDEO NODE
===================================================== */

interface VideoNodeProps {
  data: VideoNodeData;
}

export const VideoNode = ({ data }: VideoNodeProps) => {
  const { hasIncoming, hasOutgoing } = useNodeConnections();

  return (
    <div className="group select-none">
      <div className="flex items-center gap-3 mb-2 px-1">
        {data.sublabel && (
          <span className="text-[11px] tracking-wider text-black/50 uppercase">
            {data.sublabel}
          </span>
        )}
        <span className="text-[11px] tracking-wider text-black uppercase">
          {data.label}
        </span>
      </div>

      <div
        className="relative rounded-lg overflow-hidden bg-white shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-black/10"
        style={{ width: data.width, height: data.height }}
      >
        <video
          src={data.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        {hasIncoming && (
          <NodeHandle type="target" position={Position.Left} />
        )}

        {hasOutgoing && (
          <NodeHandle type="source" position={Position.Right} />
        )}
      </div>
    </div>
  );
};
