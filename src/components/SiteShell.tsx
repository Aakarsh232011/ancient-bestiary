import { Link } from "@tanstack/react-router";
import { ReactNode } from "react";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Header() {
  const nav = [
    { to: "/bestiary", label: "Bestiary" },
    { to: "/mythology", label: "Mythology" },
    { to: "/map", label: "World Map" },
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 backdrop-blur-md bg-background/70">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-rune text-gold text-sm sm:text-base font-bold tracking-[0.25em]">
          ⸙ Ancient Bestiary
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map(n => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-xs sm:text-sm font-rune text-foreground/80 hover:text-gold transition-colors rounded-md"
              activeProps={{ className: "text-gold" }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/forbidden"
            className="ml-2 px-3 py-2 text-xs font-rune text-blood hover:text-red-400 transition-colors"
            title="Hidden archive"
          >
            ⛧
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/15 bg-background/80">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-display text-2xl gold-gradient">Ancient Bestiary</div>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            A digital sanctum preserving the mythical beasts of forgotten civilizations.
          </p>
        </div>
        <div className="flex gap-6 text-xs font-rune text-muted-foreground">
          <Link to="/bestiary" className="hover:text-gold">Archive</Link>
          <Link to="/mythology" className="hover:text-gold">Pantheons</Link>
          <Link to="/map" className="hover:text-gold">Cartography</Link>
        </div>
      </div>
      <div className="text-center text-[10px] font-rune text-muted-foreground py-4 border-t border-gold/10">
        ⸙ MMXXVI · Bestiary of the Ancient World ⸙
      </div>
    </footer>
  );
}
