export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-transparent mt-20" style={{ minHeight: '120px' }}>
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center gap-4" style={{ height: '120px' }}>
        <p className="text-sm leading-[1.25rem]" style={{ height: '1.25rem', color: 'hsl(var(--muted-foreground))' }}>
          © {new Date().getFullYear()} Zura. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
