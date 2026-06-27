import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual emphasis. @default "primary" */
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    /** Control height + padding. @default "md" */
    size?: 'sm' | 'md' | 'lg';
    /** Render as a different element, e.g. "a" for a link button. @default "button" */
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
}
declare function Button({ variant, size, as, className, style, type, disabled, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, ...props }: ButtonProps): React.JSX.Element;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Semantic status color. @default "default" */
    variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
    /** Show a leading status dot. @default false */
    dot?: boolean;
    className?: string;
}
declare function Badge({ variant, dot, className, style, children, ...props }: BadgeProps): React.JSX.Element;

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare const Card: CardComponent;

interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
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
declare function Metric({ label, value, unit, delta, deltaSuffix, invertDelta, status, statusLabel, className, style, ...props }: MetricProps): React.JSX.Element;

interface NavLink {
    label: React.ReactNode;
    href?: string;
}
interface NavBarProps extends React.HTMLAttributes<HTMLElement> {
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
declare function useDarkMode(): {
    dark: boolean;
    setDark: React.Dispatch<React.SetStateAction<boolean>>;
    toggle: () => void;
};
declare function NavBar({ logo, links, dark: darkProp, onToggleTheme, className, style, ...props }: NavBarProps): React.JSX.Element;

export { Badge, type BadgeProps, Button, type ButtonProps, Card, type CardProps, Metric, type MetricProps, NavBar, type NavBarProps, type NavLink, useDarkMode };
