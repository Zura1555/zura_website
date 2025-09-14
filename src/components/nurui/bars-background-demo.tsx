'use client';

import { GradientBars } from "@/components/nurui";

export const BarsBackgroundDemo = () => {
  return (
    <div className="space-y-12">
      {/* Example 1: Default bars */}
      <div className="relative h-64 rounded-xl overflow-hidden border">
        <GradientBars />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3 className="text-2xl font-bold text-white bg-black/30 px-4 py-2 rounded-lg">
            Default Bars
          </h3>
        </div>
      </div>

      {/* Example 2: Custom number of bars */}
      <div className="relative h-64 rounded-xl overflow-hidden border">
        <GradientBars bars={10} />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3 className="text-2xl font-bold text-white bg-black/30 px-4 py-2 rounded-lg">
            10 Bars
          </h3>
        </div>
      </div>

      {/* Example 3: Custom colors */}
      <div className="relative h-64 rounded-xl overflow-hidden border">
        <GradientBars bars={20} colors={['#ff6b6b', 'transparent']} />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3 className="text-2xl font-bold text-white bg-black/30 px-4 py-2 rounded-lg">
            Red Gradient
          </h3>
        </div>
      </div>

      {/* Example 4: Multi-color gradient */}
      <div className="relative h-64 rounded-xl overflow-hidden border">
        <GradientBars bars={25} colors={['#3ca2faD9', '#a855f7', 'transparent']} />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <h3 className="text-2xl font-bold text-white bg-black/30 px-4 py-2 rounded-lg">
            Multi-color Gradient
          </h3>
        </div>
      </div>
    </div>
  );
};