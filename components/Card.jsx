import React from 'react';

/**
 * Card — jrlab-design
 *
 * A surface container with optional `header` and `footer` slots.
 *   <Card header={<Card.Title>Vitals</Card.Title>} footer={<Button>Save</Button>}>
 *     body content
 *   </Card>
 *
 * Set `glow` for a muted-cyberpunk neon edge on dark surfaces.
 */

export function Card({
  header,
  footer,
  glow = false,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'rounded-xl border bg-white text-slate-900 shadow-sm overflow-hidden',
    'border-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100',
    glow ? 'dark:shadow-glow-accent dark:border-accent-500/40' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {header != null && (
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          {header}
        </div>
      )}
      <div className="px-5 py-4">{children}</div>
      {footer != null && (
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/40">
          {footer}
        </div>
      )}
    </div>
  );
}

/** Convenience title for use inside a Card header. */
Card.Title = function CardTitle({ className = '', children, ...props }) {
  return (
    <h3
      className={['text-base font-semibold leading-tight', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </h3>
  );
};

/** Convenience subtitle / description for use inside a Card header. */
Card.Description = function CardDescription({ className = '', children, ...props }) {
  return (
    <p
      className={['mt-1 text-sm text-slate-500 dark:text-slate-400', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </p>
  );
};

export default Card;
