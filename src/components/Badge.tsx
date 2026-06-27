import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Semantic status color. @default "default" */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  /** Show a leading status dot. @default false */
  dot?: boolean;
  className?: string;
}

type VariantTokens = { bg: string; fg: string; ring: string; dot: string };

const VARIANTS: Record<string, VariantTokens> = {
  default: {
    bg: 'rgb(var(--surface-2))', fg: 'rgb(var(--fg-muted))',
    ring: 'rgb(var(--border))', dot: 'rgb(var(--color-slate-400))',
  },
  success: {
    bg: 'rgb(var(--color-success) / 0.14)', fg: 'rgb(var(--color-success-strong))',
    ring: 'rgb(var(--color-success) / 0.25)', dot: 'rgb(var(--color-success))',
  },
  warning: {
    bg: 'rgb(var(--color-warning) / 0.16)', fg: 'rgb(var(--color-warning-strong))',
    ring: 'rgb(var(--color-warning) / 0.25)', dot: 'rgb(var(--color-warning))',
  },
  error: {
    bg: 'rgb(var(--color-error) / 0.14)', fg: 'rgb(var(--color-error-strong))',
    ring: 'rgb(var(--color-error) / 0.25)', dot: 'rgb(var(--color-error))',
  },
  info: {
    bg: 'rgb(var(--color-info) / 0.14)', fg: 'rgb(var(--color-info-strong))',
    ring: 'rgb(var(--color-info) / 0.25)', dot: 'rgb(var(--color-info))',
  },
};

export function Badge({
  variant = 'default',
  dot = false,
  className = '',
  style = {},
  children,
  ...props
}: BadgeProps) {
  const v = VARIANTS[variant] ?? VARIANTS.default;
  const composed: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 'var(--radius-full)',
    padding: '2px 10px',
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-xs)',
    fontWeight: 'var(--weight-medium)',
    lineHeight: 1.4,
    whiteSpace: 'nowrap',
    background: v.bg,
    color: v.fg,
    boxShadow: `inset 0 0 0 1px ${v.ring}`,
    ...style,
  };
  return (
    <span className={className} style={composed} {...props}>
      {dot && (
        <span
          aria-hidden="true"
          style={{ width: 6, height: 6, borderRadius: '9999px', background: v.dot, flex: '0 0 auto' }}
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
