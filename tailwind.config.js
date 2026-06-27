/**
 * jrlab-design — Tailwind configuration / preset
 * ------------------------------------------------------------------
 * Aesthetic: muted cyberpunk. Slate anchor, teal primary accent, a
 * muted magenta highlight, sky-blue info, semantic status colors.
 *
 * Colors reference the CSS custom properties defined in
 * `tokens/index.css` (raw RGB channels), so the Tailwind theme and the
 * portable CSS variables share ONE source of truth. The `<alpha-value>`
 * placeholder keeps opacity utilities (e.g. `bg-accent-600/40`) working.
 *
 * Usage as a project config: import tokens/index.css in your app, then
 * point Tailwind `content` at your source. Usage as a preset:
 *   // tailwind.config.js  (ESM)
 *   import jrlab from 'jrlab-design/tailwind.config.js';
 *   export default { presets: [jrlab], content: [...] };
 *
 * @type {import('tailwindcss').Config}
 */

/** Build an 11-step color ramp bound to CSS variables. */
const ramp = (name) => {
  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  return Object.fromEntries(
    steps.map((s) => [s, `rgb(var(--color-${name}-${s}) / <alpha-value>)`])
  );
};

/** Semantic status color with base / soft (bg) / strong (text). */
const status = (name) => ({
  DEFAULT: `rgb(var(--color-${name}) / <alpha-value>)`,
  soft: `rgb(var(--color-${name}-soft) / <alpha-value>)`,
  strong: `rgb(var(--color-${name}-strong) / <alpha-value>)`,
});

export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,jsx,ts,tsx}',
    './layouts/**/*.{js,jsx,ts,tsx}',
    './themes/**/*.{js,jsx,ts,tsx}',
    './docs/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        slate: ramp('slate'),
        accent: ramp('accent'),
        magenta: ramp('magenta'),
        success: status('success'),
        warning: status('warning'),
        error: status('error'),
        info: status('info'),
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      spacing: {
        // Tailwind defaults + a couple of layout extensions.
        18: '4.5rem',
        22: '5.5rem',
        128: '32rem',
      },
      maxWidth: {
        content: '72rem', // primary content column
        prose: '65ch',
      },
      boxShadow: {
        // Muted-cyberpunk "neon" glows for dark surfaces. Use sparingly.
        'glow-accent':
          '0 0 0 1px rgb(var(--color-accent-500) / 0.35), 0 0 22px -4px rgb(var(--color-accent-500) / 0.55)',
        'glow-magenta':
          '0 0 0 1px rgb(var(--color-magenta-500) / 0.35), 0 0 22px -4px rgb(var(--color-magenta-500) / 0.55)',
      },
      ringColor: {
        DEFAULT: 'rgb(var(--color-accent-500) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};
