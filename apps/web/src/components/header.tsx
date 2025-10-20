import { Link } from "@tanstack/react-router";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Header() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/optimize", label: "Optimize" },
    { to: "/about", label: "About" },
  ] as const;

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      return <span className="i-hugeicons-sun-02 size-5" />;
    }
    if (theme === "dark") {
      return <span className="i-hugeicons-moon-02 size-5" />;
    }
    return <span className="i-hugeicons-computer size-5" />;
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-8">
          <Link className="flex items-center gap-2 font-bold text-xl" to="/">
            <span className="i-hugeicons-image-compress size-6" />
            <span>Tiny SVG</span>
          </Link>
          <nav className="flex gap-6">
            {links.map(({ to, label }) => (
              <Link
                activeProps={{ className: "active" }}
                className="text-muted-foreground transition-colors hover:text-foreground [&.active]:font-medium [&.active]:text-foreground"
                key={to}
                to={to}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              aria-label="Toggle theme"
              className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent"
              onClick={cycleTheme}
              title={`Current theme: ${theme}`}
              type="button"
            >
              {getThemeIcon()}
            </button>
          )}
          <a
            aria-label="View on GitHub"
            className="flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent"
            href="https://github.com/[username]/tiny-svg"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="i-hugeicons-github size-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
