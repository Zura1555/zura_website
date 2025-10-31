export default function Footer() {
  return (
    <footer
      className="w-full border-t border-border/40 bg-transparent"
      style={{
        marginTop: '5rem', // 80px - replaces mt-20
        height: '104px', // Fixed height: 32px (py-8) * 2 + 20px (text) + 20px (gap)
        contain: 'layout', // CSS containment prevents layout shifts
      }}
    >
      <div
        className="container mx-auto flex max-w-7xl flex-col items-center justify-center"
        style={{
          height: '100%',
          paddingTop: '2rem', // 32px
          paddingBottom: '2rem', // 32px
        }}
      >
        <p
          className="text-muted-foreground"
          style={{
            fontSize: '0.875rem', // 14px - replaces text-sm
            lineHeight: '1.25rem', // 20px
            height: '1.25rem',
            margin: 0,
            padding: 0,
            // Reserve exact text height to prevent font loading shift
            minHeight: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          © {new Date().getFullYear()} Zura. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
