import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { LocaleSwitcher } from "./intlayer/locale-swithcer";
import { LocalizedLink } from "./intlayer/localized-link";
import { useTheme } from "./theme-provider";

export default function Header() {
  const { nav } = useIntlayer("header");
  const links = [
    { to: "/", label: nav.home },
    { to: "/optimize", label: nav.optimize },
    { to: "/blog", label: nav.blog },
    { to: "/about", label: nav.about },
  ] as const;

  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cycleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getThemeIcon = () => {
    if (theme === "light") {
      return (
        <span className="i-hugeicons-sun-02 size-5" suppressHydrationWarning />
      );
    }
    if (theme === "dark") {
      return (
        <span className="i-hugeicons-moon-02 size-5" suppressHydrationWarning />
      );
    }
    return (
      <span className="i-hugeicons-computer size-5" suppressHydrationWarning />
    );
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-4 md:gap-8">
          <LocalizedLink
            className="flex items-center gap-2 font-bold text-lg md:text-xl"
            to="/"
          >
            <span className="i-hugeicons-chef-hat size-5 md:size-6" />
            <span>Tiny SVG</span>
          </LocalizedLink>
          {/* Desktop Navigation */}
          <nav className="hidden gap-6 md:flex">
            {links.map(({ to, label }) => (
              <LocalizedLink
                activeProps={{ className: "active" }}
                className="text-muted-foreground transition-colors hover:text-foreground [&.active]:font-medium [&.active]:text-foreground"
                key={to}
                to={to}
              >
                {label}
              </LocalizedLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1 md:gap-3">
          <LocaleSwitcher />
          <button
            aria-label="Toggle theme"
            className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent"
            onClick={cycleTheme}
            suppressHydrationWarning
            title={`Current theme: ${theme}`}
            type="button"
          >
            {getThemeIcon()}
          </button>
          <a
            aria-label="View on GitHub"
            className="hidden items-center justify-center rounded-md p-2 transition-colors hover:bg-accent sm:flex"
            href="https://github.com/hehehai/ting-svg"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="i-hugeicons-github size-5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
          >
            {mobileMenuOpen ? (
              <span className="i-hugeicons-cancel-01 size-5" />
            ) : (
              <span className="i-hugeicons-menu-02 size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-b bg-background md:hidden">
          <nav className="flex flex-col px-4 py-2">
            {links.map(({ to, label }) => (
              <LocalizedLink
                activeProps={{ className: "active" }}
                className="rounded-md px-3 py-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:bg-accent/50 [&.active]:font-medium [&.active]:text-foreground"
                key={to}
                onClick={() => setMobileMenuOpen(false)}
                to={to}
              >
                {label}
              </LocalizedLink>
            ))}
            <a
              className="flex items-center gap-2 rounded-md px-3 py-3 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              href="https://github.com/hehehai/ting-svg"
              onClick={() => setMobileMenuOpen(false)}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="i-hugeicons-github size-5" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
