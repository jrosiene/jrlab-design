import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header slot — usually <Card.Title> (+ <Card.Description>). */
  header?: React.ReactNode;
  /** Footer slot — actions or metadata, sits on a tinted bar. */
  footer?: React.ReactNode;
  /** Teal neon edge + glow in dark mode. Use to spotlight one surface. @default false */
  glow?: boolean;
  className?: string;
}

type CardSubComponent = React.FC<React.HTMLAttributes<HTMLElement>>;
type CardComponent = React.FC<CardProps> & {
  Title: CardSubComponent;
  Description: CardSubComponent;
};

const CardBase: React.FC<CardProps> = ({
  header,
  footer,
  glow = false,
  className = '',
  style = {},
  children,
  ...props
}) => {
  const composed: React.CSSProperties = {
    borderRadius: 'var(--radius-xl)',
    border: `1px solid ${glow ? 'rgb(var(--color-accent-500) / 0.4)' : 'rgb(var(--border))'}`,
    background: 'rgb(var(--surface))',
    color: 'rgb(var(--fg))',
    boxShadow: glow ? 'var(--glow-accent)' : 'var(--shadow-sm)',
    overflow: 'hidden',
    ...style,
  };
  return (
    <div className={className} style={composed} {...props}>
      {header != null && (
        <div style={{ borderBottom: '1px solid rgb(var(--border))', padding: '16px 20px' }}>
          {header}
        </div>
      )}
      <div style={{ padding: '16px 20px' }}>{children}</div>
      {footer != null && (
        <div style={{
          borderTop: '1px solid rgb(var(--border))',
          background: 'rgb(var(--surface-2) / 0.5)',
          padding: '16px 20px',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};

const CardTitle: CardSubComponent = ({ className = '', style = {}, children, ...props }) => (
  <h3
    className={className}
    style={{
      margin: 0,
      fontSize: 'var(--text-xl)',
      fontWeight: 'var(--weight-semibold)',
      lineHeight: 'var(--leading-tight)',
      letterSpacing: 'var(--tracking-tight)',
      ...style,
    }}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription: CardSubComponent = ({ className = '', style = {}, children, ...props }) => (
  <p
    className={className}
    style={{
      margin: '4px 0 0',
      fontSize: 'var(--text-sm)',
      color: 'rgb(var(--fg-muted))',
      ...style,
    }}
    {...props}
  >
    {children}
  </p>
);

export const Card = CardBase as CardComponent;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;
