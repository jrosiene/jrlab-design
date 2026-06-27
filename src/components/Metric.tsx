import React from 'react';

export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Overline label, e.g. "Cardiac output". */
  label: React.ReactNode;
  /** The value — rendered in monospace, tabular figures. */
  value: React.ReactNode;
  /** Optional unit shown after the value, e.g. "L/min". */
  unit?: React.ReactNode;
  /** Signed change; sign drives arrow direction + color. */
  delta?: number;
  /** Suffix on the delta number, e.g. "%". */
  deltaSuffix?: string;
  /** When a decrease should read as "good" (green). @default false */
  invertDelta?: boolean;
  /** Status dot color next to statusLabel. */
  status?: 'success' | 'warning' | 'error' | 'info';
  /** Short status caption, e.g. "Within range". */
  statusLabel?: React.ReactNode;
  className?: string;
}

const STATUS_COLOR: Record<string, string> = {
  success: 'rgb(var(--color-success))',
  warning: 'rgb(var(--color-warning))',
  error:   'rgb(var(--color-error))',
  info:    'rgb(var(--color-info))',
};

export function Metric({
  label,
  value,
  unit,
  delta,
  deltaSuffix = '',
  invertDelta = false,
  status,
  statusLabel,
  className = '',
  style = {},
  ...props
}: MetricProps) {
  const hasDelta = delta !== undefined && delta !== null;
  const dir = !hasDelta || delta === 0 ? 'flat' : delta > 0 ? 'up' : 'down';
  const good = invertDelta ? 'down' : 'up';
  const deltaColor =
    dir === 'flat' ? 'rgb(var(--fg-muted))'
    : dir === good ? 'rgb(var(--color-success))'
    : 'rgb(var(--color-error))';
  const arrow = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→';
  const statusColor = status ? STATUS_COLOR[status] : undefined;

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 6, ...style }} {...props}>
      <div style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        color: 'rgb(var(--fg-muted))',
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--weight-medium)',
          lineHeight: 1,
          color: 'rgb(var(--fg))',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {value}
        </span>
        {unit && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'rgb(var(--fg-muted))' }}>
            {unit}
          </span>
        )}
      </div>
      {(hasDelta || statusLabel) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 'var(--text-xs)' }}>
          {hasDelta && (
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 'var(--weight-medium)', color: deltaColor }}>
              {arrow} {Math.abs(delta!)}{deltaSuffix}
            </span>
          )}
          {statusLabel && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'rgb(var(--fg-muted))' }}>
              {statusColor && (
                <span style={{ width: 6, height: 6, borderRadius: '9999px', background: statusColor }} />
              )}
              {statusLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Metric;
