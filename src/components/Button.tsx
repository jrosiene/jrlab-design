import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis. @default "primary" */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  /** Control height + padding. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element, e.g. "a" for a link button. @default "button" */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

type SizeConfig = { height: number; padding: string; fontSize: string };
type VariantConfig = {
  base: React.CSSProperties;
  hover: React.CSSProperties;
  active: React.CSSProperties;
};

const SIZES: Record<string, SizeConfig> = {
  sm: { height: 32, padding: '0 12px', fontSize: 'var(--text-sm)' },
  md: { height: 40, padding: '0 16px', fontSize: 'var(--text-sm)' },
  lg: { height: 48, padding: '0 24px', fontSize: 'var(--text-base)' },
};

const VARIANTS: Record<string, VariantConfig> = {
  primary: {
    base:   { background: 'rgb(var(--color-accent-600))', color: '#fff', boxShadow: 'var(--shadow-sm)' },
    hover:  { background: 'rgb(var(--color-accent-500))' },
    active: { background: 'rgb(var(--color-accent-700))' },
  },
  secondary: {
    base:   { background: 'rgb(var(--surface-2))', color: 'rgb(var(--fg))', border: '1px solid rgb(var(--border))' },
    hover:  { background: 'rgb(var(--color-slate-200) / 0.7)' },
    active: { background: 'rgb(var(--color-slate-300) / 0.7)' },
  },
  ghost: {
    base:   { background: 'transparent', color: 'rgb(var(--fg-muted))' },
    hover:  { background: 'rgb(var(--surface-2))', color: 'rgb(var(--fg))' },
    active: { background: 'rgb(var(--border))' },
  },
  danger: {
    base:   { background: 'rgb(var(--color-error))', color: '#fff', boxShadow: 'var(--shadow-sm)' },
    hover:  { background: 'rgb(var(--color-error) / 0.9)' },
    active: { background: 'rgb(var(--color-error) / 0.8)' },
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  as,
  className = '',
  style = {},
  type,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const sz = SIZES[size] ?? SIZES.md;
  const Component = (as ?? 'button') as React.ElementType;

  const composed: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--weight-medium)',
    lineHeight: 1,
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: disabled ? 'default' : 'pointer',
    userSelect: 'none',
    transition: 'background-color 150ms ease, box-shadow 150ms ease',
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? 'none' : undefined,
    height: sz.height,
    padding: sz.padding,
    fontSize: sz.fontSize,
    ...v.base,
    ...(hover && !disabled ? v.hover : {}),
    ...(active && !disabled ? v.active : {}),
    ...style,
  };

  const resolvedType = !as || as === 'button' ? (type ?? 'button') : type;

  return (
    <Component
      className={className}
      style={composed}
      type={resolvedType}
      disabled={(!as || as === 'button') ? disabled : undefined}
      onMouseEnter={(e: React.MouseEvent) => { setHover(true); onMouseEnter?.(e as React.MouseEvent<HTMLButtonElement>); }}
      onMouseLeave={(e: React.MouseEvent) => { setHover(false); setActive(false); onMouseLeave?.(e as React.MouseEvent<HTMLButtonElement>); }}
      onMouseDown={(e: React.MouseEvent) => { setActive(true); onMouseDown?.(e as React.MouseEvent<HTMLButtonElement>); }}
      onMouseUp={(e: React.MouseEvent) => { setActive(false); onMouseUp?.(e as React.MouseEvent<HTMLButtonElement>); }}
      {...props}
    />
  );
}

export default Button;
