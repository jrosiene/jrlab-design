import React from 'react';

/**
 * Badge — jrlab-design
 *
 * Variants: default | success | warning | error | info
 *
 * Small status pill. Uses the semantic token ramps (soft bg + strong text in
 * light mode; translucent base + bright text in dark mode).
 */

const base =
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ' +
  'ring-1 ring-inset whitespace-nowrap';

const variants = {
  default:
    'bg-slate-100 text-slate-700 ring-slate-200 ' +
    'dark:bg-slate-800 dark:text-slate-300 dark:ring-slate-700',
  success:
    'bg-success-soft text-success-strong ring-success/20 ' +
    'dark:bg-success/15 dark:text-success dark:ring-success/30',
  warning:
    'bg-warning-soft text-warning-strong ring-warning/20 ' +
    'dark:bg-warning/15 dark:text-warning dark:ring-warning/30',
  error:
    'bg-error-soft text-error-strong ring-error/20 ' +
    'dark:bg-error/15 dark:text-error dark:ring-error/30',
  info:
    'bg-info-soft text-info-strong ring-info/20 ' +
    'dark:bg-info/15 dark:text-info dark:ring-info/30',
};

const dotColors = {
  default: 'bg-slate-400',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
};

export function Badge({
  variant = 'default',
  dot = false,
  className = '',
  children,
  ...props
}) {
  const classes = [base, variants[variant] || variants.default, className]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {dot && (
        <span
          className={['h-1.5 w-1.5 rounded-full', dotColors[variant] || dotColors.default].join(' ')}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export default Badge;
