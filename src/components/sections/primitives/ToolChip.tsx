'use client';

import type { ToolChipProps } from '../types';

/**
 * Interactive tool chip component for the Professional Tools section
 * Displays a pill-shaped button that highlights on hover
 * 
 * @example
 * ```tsx
 * <ToolChip
 *   label="Crop"
 *   isActive={activeTool === 'crop'}
 *   onHover={() => setActiveTool('crop')}
 *   onLeave={() => setActiveTool('default')}
 *   className="absolute top-[23%] left-[3%]"
 * />
 * ```
 */
export const ToolChip = ({
  label,
  onHover,
  onLeave,
  onClick,
  className = '',
  style,
}: ToolChipProps) => {
  return (
    <div
      className={`tool_chip ${className}`}
      style={style}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick || onHover}
    >
      <div className="whitespace-nowrap">{label}</div>
    </div>
  );
};
