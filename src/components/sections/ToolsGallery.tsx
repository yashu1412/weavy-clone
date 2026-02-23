'use client';

import { useState } from 'react';
import { TOOLS, TOOL_DEFAULT } from './data';
import { ToolChip } from './primitives';

const TOOL_DESCRIPTIONS: Record<string, string> = {
  describer: "A unique ceramic or clay artifact, possibly a vase or a decorative piece, with a speckled black and white pattern. It is displayed on a rectangular pedestal against a muted beige background. The artifact has an asymmetrical shape, with one side appearing more voluminous and the other more slender. The pedestal itself is of a solid beige color and is placed on a white platform. soft dramatic gradient warm flare. dramatic",
  default: "",
};

const CLOUD_POSITIONS = [
  // Left Side — tuned to match reference UI
  { top: '26%', left: '28%' },   // Crop
  { top: '33%', left: '19%' },  // Invert (near image)
  { top: '20%', left: '8%' },  // Outpaint
  { top: '43%', left: '10%' },  // Inpaint
  { top: '50%', left: '25%' },  // Mask Extractor
  { top: '60%', left: '16%' },  // Upscale
  // Right Side — tuned to match reference UI
  { top: '58%', right: '23%' },  // Painter
  { top: '38%', right: '18%' }, // Channels
  { top: '28%', right: '12%' },  // Image Describer
  { top: '19%', right: '6%' }, // Relight
  { top: '50%', right: '9%' },  // Z Depth Extractor
];

const ToolsGallery = () => {
  const [selectedTool, setSelectedTool] = useState<string>('default');

  const previewImage =
    TOOLS.find((t) => t.id === selectedTool)?.asset || TOOL_DEFAULT;
  
  const toolDescription = TOOL_DESCRIPTIONS[selectedTool] || TOOL_DESCRIPTIONS.default;

  return (
    <section
      className="relative w-full overflow-hidden py-8 md:py-[1rem] flex items-center justify-center"
    >
      <div
        className="absolute inset-0 bg-[#f5f5f5]"
        style={{
          backgroundImage: `
             linear-gradient(rgba(255, 255, 255, 0.9) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.9) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          zIndex: 0,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, rgba(255,255,255,0.4) 0%, rgba(255, 255, 255, 0.4) 30%, transparent 70%),
            linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(209,217,226,0.5) 100%)
          `,
          zIndex: 1,
        }}
      />
      <div className="container relative z-10 px-4 md:px-[5%]" style={{ zIndex: 2 }}>
        <div className="flex flex-col items-center">
          <div className="text-center max-w-[1200px] px-2 pt-20">
            <h3 className="font-dmsans text-[32px] md:text-[60px] lg:text-[6.2rem] leading-[0.9] tracking-[-0.05em] text-[#333333] mb-4 md:mb-[24px]">
              With all the professional <br /> tools you rely on
            </h3>
            <p className="font-dmsans text-[14px] md:text-[16px] lg:text-[1.5rem] text-[#666666] font-normal pt-4">
              In one seamless workflow
            </p>
          </div>

          <div className="relative w-full max-w-[1400px] mx-auto">
            {toolDescription && (
              <div className="md:hidden px-4 py-6 text-center">
                <p className="text-[14px] leading-relaxed text-black/80 font-serif italic">
                  {toolDescription}
                </p>
              </div>
            )}

            {/* Exact image container size and logic */}
            <div className="relative w-full aspect-[16/9] rounded-[20px] md:rounded-[20px] overflow-hidden -translate-y-[30%] md:-translate-y-[30%] mx-auto max-w-[400px] md:max-w-none">
              <img
                src={previewImage}
                alt="Professional Tool Demonstration"
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500"
                loading="eager"
                decoding="async"
              />
            </div>

            <div className="md:hidden relative -mt-4 pb-4">
              <div className="flex gap-3 overflow-x-auto px-4 py-2 scrollbar-hide snap-x snap-mandatory">
                {TOOLS.map((tool) => (
                  <ToolChip
                    key={tool.id}
                    label={tool.label}
                    isActive={selectedTool === tool.id}
                    onHover={() => setSelectedTool(tool.id)}
                    onLeave={() => {}}
                    onClick={() => setSelectedTool(selectedTool === tool.id ? 'default' : tool.id)}
                    className="tool_chip tool_chip--inline flex-shrink-0 snap-center"
                  />
                ))}
              </div>
            </div>

            {/* Floating chips using CLOUD_POSITIONS to place them properly */}
            <div className="hidden md:block">
              {TOOLS.slice(0, CLOUD_POSITIONS.length).map((tool, index) => {
                const pos = CLOUD_POSITIONS[index];
                
                return (
                  <ToolChip
                    key={tool.id}
                    label={tool.label}
                    isActive={selectedTool === tool.id}
                    onHover={() => setSelectedTool(tool.id)}
                    onLeave={() => setSelectedTool('default')}
                    className="tool_chip"
                    style={{
                      top: pos.top,
                      left: pos.left,
                      right: pos.right,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsGallery;
