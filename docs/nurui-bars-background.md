# Nurui Bars-Background Implementation Guide

This guide explains how to implement the nurui bars-background (GradientBars component) on your website.

## Installation

The required dependencies should already be installed:
- `motion` (for animations)
- `framer-motion` (already in your project)

If you need to install motion:
```bash
npm install motion
```

## Component Implementation

The GradientBars component has been updated to use `framer-motion` instead of `motion/react` for better compatibility with your existing setup.

### Component Props

- `bars` (number, optional): Number of bars to display (default: 20)
- `colors` (string[], optional): Array of colors for the gradient (default: ['#3ca2faD9', 'transparent'])

## Usage Examples

### 1. Basic Implementation (as shown in your page.tsx)

```tsx
import { GradientBars } from "@/components/nurui";

// In your JSX:
<section id="home" className="px-4 relative">
  {/* Gradient Bars Background */}
  <GradientBars bars={15} colors={['#3ca2faD9', 'transparent']} />
  <div className="container mx-auto max-w-5xl py-16 sm:py-24 relative z-10">
    {/* Your content here */}
  </div>
</section>
```

### 2. Custom Colors

```tsx
<GradientBars 
  bars={25} 
  colors={['#ff6b6b', 'transparent']} 
/>
```

### 3. Multiple Colors Gradient

```tsx
<GradientBars 
  bars={30} 
  colors={['#3ca2faD9', '#a855f7', 'transparent']} 
/>
```

## Styling Tips

1. Always set the parent container to `relative` position
2. Set the GradientBars component to `absolute inset-0 z-0` to cover the entire area
3. Set your content containers to `relative z-10` to appear above the bars
4. Adjust the number of bars based on your design needs (fewer bars = wider bars)
5. Modify colors to match your site's color scheme

## Troubleshooting

If you encounter issues:
1. Ensure `motion` package is installed
2. Verify the import path is correct: `@/components/nurui`
3. Check that the parent container has proper positioning
4. Make sure content has a higher z-index than the bars