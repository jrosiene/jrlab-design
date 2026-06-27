import React, { useState, useEffect, useCallback } from 'react';

export interface NavLink {
  label: React.ReactNode;
  href?: string;
}

export interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Brand mark on the left. Defaults to the jrlab wordmark. */
  logo?: React.ReactNode;
  /** Right-aligned links. */
  links?: NavLink[];
  /** Controlled dark state (pair with onToggleTheme). */
  dark?: boolean;
  /** Controlled toggle handler. */
  onToggleTheme?: () => void;
  className?: string;
}

export function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('jrlab-theme', dark ? 'dark' : 'light'); } catch (_) {}
  }, [dark]);

  const toggle = useCallback(() => setDark((d) => !d), []);
  return { dark, setDark, toggle };
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <circle cx={12} cy={12} r={4} />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function NavLinkItem({ label, href }: NavLink) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-block',
        padding: '8px 12px',
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--text-sm)',
        fontWeight: 'var(--weight-medium)',
        textDecoration: 'none',
        color: hover ? 'rgb(var(--fg))' : 'rgb(var(--fg-muted))',
        background: hover ? 'rgb(var(--surface-2))' : 'transparent',
        transition: 'color 150ms ease, background-color 150ms ease',
      }}
    >
      {label}
    </a>
  );
}

export function NavBar({
  logo,
  links = [],
  dark: darkProp,
  onToggleTheme,
  className = '',
  style = {},
  ...props
}: NavBarProps) {
  const internal = useDarkMode();
  const isControlled = darkProp != null && typeof onToggleTheme === 'function';
  const dark = isControlled ? darkProp : internal.dark;
  const toggle = isControlled ? onToggleTheme! : internal.toggle;
  const [togHover, setTogHover] = useState(false);

  return (
    <nav
      className={className}
      style={{
        position: 'sticky', top: 0, zIndex: 40, width: '100%',
        borderBottom: '1px solid rgb(var(--border))',
        background: 'rgb(var(--surface) / 0.8)',
        backdropFilter: 'saturate(180%) blur(8px)',
        WebkitBackdropFilter: 'saturate(180%) blur(8px)',
        color: 'rgb(var(--fg))',
        ...style,
      }}
      {...props}
    >
      <div style={{
        margin: '0 auto', maxWidth: 'var(--max-content)',
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px',
      }}>
        <a href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: 'var(--text-lg)', fontWeight: 'var(--weight-semibold)',
          letterSpacing: 'var(--tracking-tight)', textDecoration: 'none',
          color: 'inherit',
        }}>
          {logo ?? (
            <span>
              jr<span style={{ color: 'rgb(var(--color-accent-500))' }}>lab</span>
            </span>
          )}
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map((link, i) => (
            <NavLinkItem key={link.href ?? String(i)} label={link.label} href={link.href} />
          ))}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle dark mode"
            aria-pressed={dark}
            onMouseEnter={() => setTogHover(true)}
            onMouseLeave={() => setTogHover(false)}
            style={{
              marginLeft: 4, width: 36, height: 36,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
              color: togHover ? 'rgb(var(--fg))' : 'rgb(var(--fg-muted))',
              background: togHover ? 'rgb(var(--surface-2))' : 'transparent',
              transition: 'color 150ms ease, background-color 150ms ease',
            }}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
