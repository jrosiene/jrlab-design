import React, { useState, useEffect, useCallback } from 'react';

/**
 * NavBar — jrlab-design
 *
 * Horizontal bar: logo left, links right, dark-mode toggle.
 *   <NavBar
 *     logo={<span>jr<span className="text-accent-500">lab</span></span>}
 *     links={[{ label: 'Sim', href: 'https://sim.jrlab.org' }, ...]}
 *   />
 *
 * The dark-mode toggle adds/removes the `dark` class on <html> and persists the
 * choice to localStorage. Pass `onToggleTheme` / `dark` to control it yourself.
 */

/** Hook: manage the `dark` class on <html>, persisted to localStorage. */
export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    try {
      localStorage.setItem('jrlab-theme', dark ? 'dark' : 'light');
    } catch (_) {
      /* storage unavailable — ignore */
    }
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return { dark, setDark, toggle };
}

function SunIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export function NavBar({
  logo,
  links = [],
  dark: darkProp,
  onToggleTheme,
  className = '',
  ...props
}) {
  const internal = useDarkMode();
  // Controlled if both `dark` and `onToggleTheme` are supplied; else self-managed.
  const isControlled = darkProp != null && typeof onToggleTheme === 'function';
  const dark = isControlled ? darkProp : internal.dark;
  const toggle = isControlled ? onToggleTheme : internal.toggle;

  const classes = [
    'sticky top-0 z-40 w-full border-b backdrop-blur',
    'border-slate-200 bg-white/80 text-slate-900',
    'dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-100',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <nav className={classes} {...props}>
      <div className="mx-auto flex h-16 max-w-content items-center justify-between px-4 sm:px-6">
        {/* Logo (left) */}
        <a href="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
          {logo ?? (
            <span>
              jr<span className="text-accent-500">lab</span>
            </span>
          )}
        </a>

        {/* Links + toggle (right) */}
        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <li key={link.href ?? link.label}>
                <a
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            aria-pressed={dark}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
