import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
            P
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Product Hunt
          </span>
        </Link>

        <nav className="ml-4 hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <Link to="/" className="transition-colors hover:text-foreground">
            Launches
          </Link>
          <span className="cursor-default">Topics</span>
          <span className="cursor-default">Newsletter</span>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-muted/60 px-3 py-1.5 text-sm text-muted-foreground sm:flex">
            <Search className="size-4" />
            <span>Search products</span>
          </div>
          <button className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
