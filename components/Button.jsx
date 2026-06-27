import React from 'react';

/**
 * Button — jrlab-design
 *
 * Variants: primary | secondary | ghost | danger
 * Sizes:    sm | md | lg
 *
 * Functional React, no dependencies beyond React + Tailwind. Colors come from
 * the design tokens (see tokens/index.css + tailwind.config.js). Dark mode is
 * handled with Tailwind `dark:` utilities (class on <html>).
 *
 * Pass `as` to render a different element (e.g. `as="a"` for a link button).
 */

const base =
  'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-lg ' +
  'transition-colors duration-150 select-none ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ' +
  'disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary:
    'bg-accent-600 text-white hover:bg-accent-500 active:bg-accent-700 ' +
    'shadow-sm dark:hover:shadow-glow-accent',
  secondary:
    'bg-slate-100 text-slate-900 hover:bg-slate-200 active:bg-slate-300 border border-slate-200 ' +
    'dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 dark:border-slate-700',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 active:bg-slate-200 ' +
    'dark:text-slate-300 dark:hover:bg-slate-800 dark:active:bg-slate-700',
  danger:
    'bg-error text-white hover:bg-error/90 active:bg-error/80 shadow-sm',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  className = '',
  type,
  ...props
}) {
  const classes = [base, variants[variant] || variants.primary, sizes[size] || sizes.md, className]
    .filter(Boolean)
    .join(' ');

  // Only default a type when actually rendering a <button>.
  const resolvedType = Component === 'button' ? type ?? 'button' : type;

  return <Component className={classes} type={resolvedType} {...props} />;
}

export default Button;
