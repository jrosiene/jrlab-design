import React, { useState, useEffect, useCallback } from 'react';
import { jsx, jsxs } from 'react/jsx-runtime';

// src/components/Button.tsx
var SIZES = {
  sm: { height: 32, padding: "0 12px", fontSize: "var(--text-sm)" },
  md: { height: 40, padding: "0 16px", fontSize: "var(--text-sm)" },
  lg: { height: 48, padding: "0 24px", fontSize: "var(--text-base)" }
};
var VARIANTS = {
  primary: {
    base: { background: "rgb(var(--color-accent-600))", color: "#fff", boxShadow: "var(--shadow-sm)" },
    hover: { background: "rgb(var(--color-accent-500))" },
    active: { background: "rgb(var(--color-accent-700))" }
  },
  secondary: {
    base: { background: "rgb(var(--surface-2))", color: "rgb(var(--fg))", border: "1px solid rgb(var(--border))" },
    hover: { background: "rgb(var(--color-slate-200) / 0.7)" },
    active: { background: "rgb(var(--color-slate-300) / 0.7)" }
  },
  ghost: {
    base: { background: "transparent", color: "rgb(var(--fg-muted))" },
    hover: { background: "rgb(var(--surface-2))", color: "rgb(var(--fg))" },
    active: { background: "rgb(var(--border))" }
  },
  danger: {
    base: { background: "rgb(var(--color-error))", color: "#fff", boxShadow: "var(--shadow-sm)" },
    hover: { background: "rgb(var(--color-error) / 0.9)" },
    active: { background: "rgb(var(--color-error) / 0.8)" }
  }
};
function Button({
  variant = "primary",
  size = "md",
  as,
  className = "",
  style = {},
  type,
  disabled = false,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const sz = SIZES[size] ?? SIZES.md;
  const Component = as ?? "button";
  const composed = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    whiteSpace: "nowrap",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-medium)",
    lineHeight: 1,
    borderRadius: "var(--radius-md)",
    border: "none",
    cursor: disabled ? "default" : "pointer",
    userSelect: "none",
    transition: "background-color 150ms ease, box-shadow 150ms ease",
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : void 0,
    height: sz.height,
    padding: sz.padding,
    fontSize: sz.fontSize,
    ...v.base,
    ...hover && !disabled ? v.hover : {},
    ...active && !disabled ? v.active : {},
    ...style
  };
  const resolvedType = !as || as === "button" ? type ?? "button" : type;
  return /* @__PURE__ */ jsx(
    Component,
    {
      className,
      style: composed,
      type: resolvedType,
      disabled: !as || as === "button" ? disabled : void 0,
      onMouseEnter: (e) => {
        setHover(true);
        onMouseEnter?.(e);
      },
      onMouseLeave: (e) => {
        setHover(false);
        setActive(false);
        onMouseLeave?.(e);
      },
      onMouseDown: (e) => {
        setActive(true);
        onMouseDown?.(e);
      },
      onMouseUp: (e) => {
        setActive(false);
        onMouseUp?.(e);
      },
      ...props
    }
  );
}
var VARIANTS2 = {
  default: {
    bg: "rgb(var(--surface-2))",
    fg: "rgb(var(--fg-muted))",
    ring: "rgb(var(--border))",
    dot: "rgb(var(--color-slate-400))"
  },
  success: {
    bg: "rgb(var(--color-success) / 0.14)",
    fg: "rgb(var(--color-success-strong))",
    ring: "rgb(var(--color-success) / 0.25)",
    dot: "rgb(var(--color-success))"
  },
  warning: {
    bg: "rgb(var(--color-warning) / 0.16)",
    fg: "rgb(var(--color-warning-strong))",
    ring: "rgb(var(--color-warning) / 0.25)",
    dot: "rgb(var(--color-warning))"
  },
  error: {
    bg: "rgb(var(--color-error) / 0.14)",
    fg: "rgb(var(--color-error-strong))",
    ring: "rgb(var(--color-error) / 0.25)",
    dot: "rgb(var(--color-error))"
  },
  info: {
    bg: "rgb(var(--color-info) / 0.14)",
    fg: "rgb(var(--color-info-strong))",
    ring: "rgb(var(--color-info) / 0.25)",
    dot: "rgb(var(--color-info))"
  }
};
function Badge({
  variant = "default",
  dot = false,
  className = "",
  style = {},
  children,
  ...props
}) {
  const v = VARIANTS2[variant] ?? VARIANTS2.default;
  const composed = {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    borderRadius: "var(--radius-full)",
    padding: "2px 10px",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-xs)",
    fontWeight: "var(--weight-medium)",
    lineHeight: 1.4,
    whiteSpace: "nowrap",
    background: v.bg,
    color: v.fg,
    boxShadow: `inset 0 0 0 1px ${v.ring}`,
    ...style
  };
  return /* @__PURE__ */ jsxs("span", { className, style: composed, ...props, children: [
    dot && /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": "true",
        style: { width: 6, height: 6, borderRadius: "9999px", background: v.dot, flex: "0 0 auto" }
      }
    ),
    children
  ] });
}
var CardBase = ({
  header,
  footer,
  glow = false,
  className = "",
  style = {},
  children,
  ...props
}) => {
  const composed = {
    borderRadius: "var(--radius-xl)",
    border: `1px solid ${glow ? "rgb(var(--color-accent-500) / 0.4)" : "rgb(var(--border))"}`,
    background: "rgb(var(--surface))",
    color: "rgb(var(--fg))",
    boxShadow: glow ? "var(--glow-accent)" : "var(--shadow-sm)",
    overflow: "hidden",
    ...style
  };
  return /* @__PURE__ */ jsxs("div", { className, style: composed, ...props, children: [
    header != null && /* @__PURE__ */ jsx("div", { style: { borderBottom: "1px solid rgb(var(--border))", padding: "16px 20px" }, children: header }),
    /* @__PURE__ */ jsx("div", { style: { padding: "16px 20px" }, children }),
    footer != null && /* @__PURE__ */ jsx("div", { style: {
      borderTop: "1px solid rgb(var(--border))",
      background: "rgb(var(--surface-2) / 0.5)",
      padding: "16px 20px"
    }, children: footer })
  ] });
};
var CardTitle = ({ className = "", style = {}, children, ...props }) => /* @__PURE__ */ jsx(
  "h3",
  {
    className,
    style: {
      margin: 0,
      fontSize: "var(--text-xl)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tight)",
      ...style
    },
    ...props,
    children
  }
);
var CardDescription = ({ className = "", style = {}, children, ...props }) => /* @__PURE__ */ jsx(
  "p",
  {
    className,
    style: {
      margin: "4px 0 0",
      fontSize: "var(--text-sm)",
      color: "rgb(var(--fg-muted))",
      ...style
    },
    ...props,
    children
  }
);
var Card = CardBase;
Card.Title = CardTitle;
Card.Description = CardDescription;
var STATUS_COLOR = {
  success: "rgb(var(--color-success))",
  warning: "rgb(var(--color-warning))",
  error: "rgb(var(--color-error))",
  info: "rgb(var(--color-info))"
};
function Metric({
  label,
  value,
  unit,
  delta,
  deltaSuffix = "",
  invertDelta = false,
  status,
  statusLabel,
  className = "",
  style = {},
  ...props
}) {
  const hasDelta = delta !== void 0 && delta !== null;
  const dir = !hasDelta || delta === 0 ? "flat" : delta > 0 ? "up" : "down";
  const good = invertDelta ? "down" : "up";
  const deltaColor = dir === "flat" ? "rgb(var(--fg-muted))" : dir === good ? "rgb(var(--color-success))" : "rgb(var(--color-error))";
  const arrow = dir === "up" ? "\u2191" : dir === "down" ? "\u2193" : "\u2192";
  const statusColor = status ? STATUS_COLOR[status] : void 0;
  return /* @__PURE__ */ jsxs("div", { className, style: { display: "flex", flexDirection: "column", gap: 6, ...style }, ...props, children: [
    /* @__PURE__ */ jsx("div", { style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "rgb(var(--fg-muted))"
    }, children: label }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 6 }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-3xl)",
        fontWeight: "var(--weight-medium)",
        lineHeight: 1,
        color: "rgb(var(--fg))",
        fontVariantNumeric: "tabular-nums"
      }, children: value }),
      unit && /* @__PURE__ */ jsx("span", { style: { fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)", color: "rgb(var(--fg-muted))" }, children: unit })
    ] }),
    (hasDelta || statusLabel) && /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: "var(--text-xs)" }, children: [
      hasDelta && /* @__PURE__ */ jsxs("span", { style: { fontFamily: "var(--font-mono)", fontWeight: "var(--weight-medium)", color: deltaColor }, children: [
        arrow,
        " ",
        Math.abs(delta),
        deltaSuffix
      ] }),
      statusLabel && /* @__PURE__ */ jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 5, color: "rgb(var(--fg-muted))" }, children: [
        statusColor && /* @__PURE__ */ jsx("span", { style: { width: 6, height: 6, borderRadius: "9999px", background: statusColor } }),
        statusLabel
      ] })
    ] })
  ] });
}
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof document === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("jrlab-theme", dark ? "dark" : "light");
    } catch (_) {
    }
  }, [dark]);
  const toggle = useCallback(() => setDark((d) => !d), []);
  return { dark, setDark, toggle };
}
function SunIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      width: 18,
      height: 18,
      children: [
        /* @__PURE__ */ jsx("circle", { cx: 12, cy: 12, r: 4 }),
        /* @__PURE__ */ jsx("path", { d: "M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" })
      ]
    }
  );
}
function MoonIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      width: 18,
      height: 18,
      children: /* @__PURE__ */ jsx("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
    }
  );
}
function NavLinkItem({ label, href }) {
  const [hover, setHover] = useState(false);
  return /* @__PURE__ */ jsx(
    "a",
    {
      href,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: "inline-block",
        padding: "8px 12px",
        borderRadius: "var(--radius-md)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-medium)",
        textDecoration: "none",
        color: hover ? "rgb(var(--fg))" : "rgb(var(--fg-muted))",
        background: hover ? "rgb(var(--surface-2))" : "transparent",
        transition: "color 150ms ease, background-color 150ms ease"
      },
      children: label
    }
  );
}
function NavBar({
  logo,
  links = [],
  dark: darkProp,
  onToggleTheme,
  className = "",
  style = {},
  ...props
}) {
  const internal = useDarkMode();
  const isControlled = darkProp != null && typeof onToggleTheme === "function";
  const dark = isControlled ? darkProp : internal.dark;
  const toggle = isControlled ? onToggleTheme : internal.toggle;
  const [togHover, setTogHover] = useState(false);
  return /* @__PURE__ */ jsx(
    "nav",
    {
      className,
      style: {
        position: "sticky",
        top: 0,
        zIndex: 40,
        width: "100%",
        borderBottom: "1px solid rgb(var(--border))",
        background: "rgb(var(--surface) / 0.8)",
        backdropFilter: "saturate(180%) blur(8px)",
        WebkitBackdropFilter: "saturate(180%) blur(8px)",
        color: "rgb(var(--fg))",
        ...style
      },
      ...props,
      children: /* @__PURE__ */ jsxs("div", { style: {
        margin: "0 auto",
        maxWidth: "var(--max-content)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px"
      }, children: [
        /* @__PURE__ */ jsx("a", { href: "/", style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: "var(--text-lg)",
          fontWeight: "var(--weight-semibold)",
          letterSpacing: "var(--tracking-tight)",
          textDecoration: "none",
          color: "inherit"
        }, children: logo ?? /* @__PURE__ */ jsxs("span", { children: [
          "jr",
          /* @__PURE__ */ jsx("span", { style: { color: "rgb(var(--color-accent-500))" }, children: "lab" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
          links.map((link, i) => /* @__PURE__ */ jsx(NavLinkItem, { label: link.label, href: link.href }, link.href ?? String(i))),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: toggle,
              "aria-label": "Toggle dark mode",
              "aria-pressed": dark,
              onMouseEnter: () => setTogHover(true),
              onMouseLeave: () => setTogHover(false),
              style: {
                marginLeft: 4,
                width: 36,
                height: 36,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--radius-md)",
                border: "none",
                cursor: "pointer",
                color: togHover ? "rgb(var(--fg))" : "rgb(var(--fg-muted))",
                background: togHover ? "rgb(var(--surface-2))" : "transparent",
                transition: "color 150ms ease, background-color 150ms ease"
              },
              children: dark ? /* @__PURE__ */ jsx(SunIcon, {}) : /* @__PURE__ */ jsx(MoonIcon, {})
            }
          )
        ] })
      ] })
    }
  );
}

export { Badge, Button, Card, Metric, NavBar, useDarkMode };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map