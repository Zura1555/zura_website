export default function Footer() {
  return (
    <footer
      className="w-full border-t border-border/40 bg-transparent"
      style={{
        marginTop: '5rem',
        height: '104px',
        contain: 'layout size style', // Enhanced containment for better CLS
      }}
    >
      <div
        className="container mx-auto flex max-w-7xl flex-col items-center justify-center"
        style={{
          height: '100%',
          paddingTop: '2rem',
          paddingBottom: '2rem',
          contain: 'layout', // Contain the inner layout
        }}
      >
        <p
          className="text-muted-foreground font-loading" // Use font loading optimization class
          style={{
            fontSize: '0.875rem',
            lineHeight: '1.25rem',
            height: '1.25rem',
            margin: 0,
            padding: 0,
            minHeight: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            // Font fallback metrics to prevent layout shift
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
            overflow: 'hidden', // Prevent text overflow causing layout shifts
            whiteSpace: 'nowrap', // Prevent text wrapping causing height changes
            letterSpacing: '0.0175em', // Exact letter spacing
          }}
        >
          <span style={{ display: 'inline-block' }}>
            © {new Date().getFullYear()} Zura. All rights reserved.
          </span>
        </p>
      </div>
    </footer>
  );
}
