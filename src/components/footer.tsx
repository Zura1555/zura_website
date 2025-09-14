export default function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-transparent mt-20">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 py-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Zura. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
