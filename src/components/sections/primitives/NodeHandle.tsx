'use client';

import { Handle, Position } from '@xyflow/react';

interface NodeHandleProps {
  type: 'source' | 'target';
  position: Position;
}

export const NodeHandle = ({ type, position }: NodeHandleProps) => {
  const positionClass = {
    [Position.Left]: '!left-1',
    [Position.Right]: '!right-1',
    [Position.Top]: '!top-1',
    [Position.Bottom]: '!bottom-1',
  }[position];

  return (
    <Handle
      type={type}
      position={position}
      className={`!w-[12px] !h-[12px] !border-white !border-[2px] !bg-[#cfcfcf] !shadow-md !z-20 ${positionClass}`}
    />
  );
};
