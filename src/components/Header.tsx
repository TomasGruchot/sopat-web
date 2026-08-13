"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { company } from "@/lib/data";

const NAV_LINKS = [
  { href: "/skladba-strechy", label: "Skladba střechy" },
  { href: "/sluzby", label: "Služby" },
  { href: "/realizace", label: "Realizace" },
  { href: "/kde-pracujeme", label: "Působnost" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b border-ink bg-paper transition-shadow",
        scrolled && "shadow-[0_8px_24px_rgba(28,25,20,0.08)]"
      )}
    >
      <div className="hidden border-b border-line md:block">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-1.5 md:px-8">
          <span className="mono-label truncate text-ink-soft">
            Hydroizolace a sanace plochých střech — vlastní zaměstnanci od roku {company.founded}
          </span>
          <a
            href={`tel:${company.phoneHref}`}
            className="mono-label shrink-0 whitespace-nowrap text-ink hover:text-oxide"
          >
            tel. {company.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-4 px-5 py-3.5 sm:py-4 md:px-8">
        <Link href="/" className="font-display text-[1.35rem] font-semibold tracking-tight sm:text-2xl">
          SOPAT<span className="text-oxide">.</span>CZ
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "mono-label transition-colors",
                pathname === link.href
                  ? "text-ink underline decoration-oxide decoration-2 underline-offset-8"
                  : "text-ink-soft hover:text-ink"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="mono-label border border-ink px-4 py-2.5 text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            Nezávazná poptávka
          </Link>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="mono-label flex items-center gap-2 text-ink lg:hidden"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Zavřít" : "Menu"}
          <span className="relative flex h-3.5 w-5 flex-col justify-between" aria-hidden>
            <span
              className={clsx(
                "block h-[2px] w-full origin-center bg-ink transition-transform duration-200",
                menuOpen && "translate-y-[6px] rotate-45"
              )}
            />
            <span
              className={clsx(
                "block h-[2px] w-full bg-ink transition-opacity duration-200",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={clsx(
                "block h-[2px] w-full origin-center bg-ink transition-transform duration-200",
                menuOpen && "-translate-y-[6px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-paper lg:hidden"
          aria-label="Mobilní navigace"
        >
          <div className="mx-auto flex max-h-[min(32rem,calc(100dvh-4.75rem))] max-w-[1320px] flex-col overflow-y-auto overscroll-contain px-5 pb-6 pt-1 md:max-h-[min(32rem,calc(100dvh-7.5rem))] md:px-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={clsx(
                  "border-b border-line py-3.5 font-display text-xl sm:py-4 sm:text-2xl",
                  pathname === link.href ? "text-oxide" : "text-ink"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontakt"
              onClick={() => setMenuOpen(false)}
              className="mono-label mt-5 bg-ink px-5 py-3.5 text-center text-paper transition-colors hover:bg-oxide"
            >
              Nezávazná poptávka
            </Link>
            <a
              href={`tel:${company.phoneHref}`}
              className="mono-label mt-4 text-center text-ink-soft hover:text-oxide md:hidden"
            >
              tel. {company.phone}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
