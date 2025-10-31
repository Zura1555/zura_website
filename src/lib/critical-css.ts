// Critical CSS for above-the-fold content
// Extracted from the most essential styles needed for initial render

export const criticalCSS = `
  /* Reset and base */
  *, ::before, ::after {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: system-ui, -apple-system, sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Critical dark theme variables */
  :root {
    --background: 252 67% 8%;
    --foreground: 0 0% 98%;
    --card: 252 67% 11%;
    --border: 252 67% 30%;
    --primary: 226 97% 65%;
    --muted: 252 67% 16%;
    --muted-foreground: 240 5% 75%;
  }
  
  /* Layout */
  html {
    height: 100%;
  }
  
  body {
    min-height: 100vh;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    display: flex;
  }
  
  /* Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  /* Grid for hero section */
  .grid {
    display: grid;
  }
  
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  
  .gap-8 {
    gap: 2rem;
  }
  
  .items-center {
    align-items: center;
  }
  
  /* Typography */
  .font-bold {
    font-weight: 700;
  }
  
  .text-6xl {
    font-size: 3.75rem;
    line-height: 1;
  }
  
  .text-4xl {
    font-size: 2.25rem;
    line-height: 1.1;
  }
  
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
    line-height: 2rem;
  }
  
  /* Text colors */
  .text-foreground {
    color: hsl(var(--foreground));
  }
  
  .text-primary {
    color: hsl(var(--primary));
  }
  
  .text-muted-foreground {
    color: hsl(var(--muted-foreground));
  }
  
  /* Spacing */
  .py-12 {
    padding-top: 3rem;
    padding-bottom: 3rem;
  }
  
  .py-16 {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  
  .mt-4 {
    margin-top: 1rem;
  }
  
  .mt-3 {
    margin-top: 0.75rem;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  .max-w-md {
    max-width: 28rem;
  }
  
  /* Flex utilities */
  .flex {
    display: flex;
  }
  
  .flex-col {
    flex-direction: column;
  }
  
  .items-start {
    align-items: flex-start;
  }
  
  .gap-3 {
    gap: 0.75rem;
  }
  
  .gap-4 {
    gap: 1rem;
  }
  
  /* Button styles */
  .inline-flex {
    display: inline-flex;
  }
  
  .items-center {
    align-items: center;
  }
  
  .justify-center {
    justify-content: center;
  }
  
  .rounded-lg {
    border-radius: 0.5rem;
  }
  
  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .py-3 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  .border {
    border-width: 1px;
    border-style: solid;
    border-color: hsl(var(--border));
  }
  
  .bg-background {
    background-color: hsl(var(--background));
  }
  
  .text-foreground {
    color: hsl(var(--foreground));
  }
  
  /* Hover states */
  .hover\\:text-primary\\/80:hover {
    color: hsl(var(--primary) / 0.8);
  }
  
  .hover\\:bg-background\\/80:hover {
    background-color: hsl(var(--background) / 0.8);
  }
  
  .transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  /* Positioning */
  .relative {
    position: relative;
  }
  
  .w-full {
    width: 100%;
  }
  
  /* Responsive */
  @media (min-width: 768px) {
    .md\\:text-4xl {
      font-size: 2.25rem;
      line-height: 1.1;
    }
    
    .md\\:text-5xl {
      font-size: 3rem;
      line-height: 1;
    }
    
    .md\\:text-lg {
      font-size: 1.125rem;
      line-height: 1.75rem;
    }
    
    .sm\\:flex-row {
      flex-direction: row;
    }
    
    .sm\\:gap-4 {
      gap: 1rem;
    }
    
    .sm\\:mt-6 {
      margin-top: 1.5rem;
    }
    
    .sm\\:mt-4 {
      margin-top: 1rem;
    }
    
    .md\\:py-24 {
      padding-top: 6rem;
      padding-bottom: 6rem;
    }
  }
  
  @media (min-width: 640px) {
    .sm\\:text-3xl {
      font-size: 1.875rem;
      line-height: 1.2;
    }
    
    .sm\\:text-4xl {
      font-size: 2.25rem;
      line-height: 1.1;
    }
    
    .sm\\:px-8 {
      padding-left: 2rem;
      padding-right: 2rem;
    }
  }
  
  @media (min-width: 1024px) {
    .lg\\:text-5xl {
      font-size: 3rem;
      line-height: 1;
    }
    
    .lg\\:text-6xl {
      font-size: 3.75rem;
      line-height: 1;
    }
  }

  /* Critical image container styles */
  .absolute {
    position: absolute;
  }
  
  .inset-0 {
    inset: 0px;
  }
  
  .bg-primary {
    background-color: hsl(var(--primary));
  }
  
  .rounded-t-3xl {
    border-top-left-radius: 1.5rem;
    border-top-right-radius: 1.5rem;
  }
  
  .rounded-bl-3xl {
    border-bottom-left-radius: 1.5rem;
    border-bottom-right-radius: 1.5rem;
  }
  
  .rounded-br-\\[80px\\] {
    border-bottom-right-radius: 80px;
  }
  
  .rounded-t-2xl {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  
  .rounded-bl-2xl {
    border-bottom-left-radius: 1rem;
  }
  
  .rounded-br-\\[60px\\] {
    border-bottom-right-radius: 60px;
  }
  
  .object-cover {
    object-fit: cover;
  }
  
  /* Button icon positioning */
  .absolute {
    position: absolute;
  }
  
  .bottom-0 {
    bottom: 0px;
  }
  
  .right-0 {
    right: 0px;
  }
  
  .h-16 {
    height: 4rem;
  }
  
  .w-16 {
    width: 4rem;
  }
  
  .rounded-full {
    border-radius: 9999px;
  }
  
  .cursor-pointer {
    cursor: pointer;
  }

  /* Font loading optimization */
  .font-sora {
    font-family: Sora, system-ui, sans-serif;
  }
  
  .font-luckiest {
    font-family: "Luckiest Guy", cursive, system-ui;
  }
`;

export function injectCriticalCSS() {
  if (typeof window !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = criticalCSS;
    styleElement.setAttribute('data-critical', 'true');
    document.head.appendChild(styleElement);
    return styleElement;
  }
  return null;
}
