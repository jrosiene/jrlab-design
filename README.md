# jrlab-design

A small, personal design system for use across [jrlab.org](https://jrlab.org)
projects — the clinical physiology simulator at **sim.jrlab.org**, the academic
site, and whatever comes next.

**Aesthetic:** muted cyberpunk — a slate/navy anchor, a teal primary accent, a
muted magenta highlight for occasional "neon," sky-blue info, and standard
green/amber/red status colors. Clean, minimal, slightly clinical. Works in light
and dark mode.

**Stack:** React + Tailwind CSS. No build step required to consume the
components — they're plain functional React with no dependencies beyond React
and Tailwind.

---

## Layout

```
tokens/index.css      CSS custom properties (the portable source of truth)
tailwind.config.js    Tailwind theme/preset bound to those tokens
components/            Button, Card, Badge, NavBar (+ index barrel)
layouts/              (reserved) page/section layout primitives
themes/               (reserved) alternate theme presets
docs/index.html       Static preview of every component (open in a browser)
```

## Quick start

1. **Install peer deps in your project** (if not already present):

   ```bash
   npm install react react-dom
   npm install -D tailwindcss
   ```

2. **Import the tokens once**, at your app entry (these define the CSS variables
   the Tailwind theme and components rely on, and load the fonts):

   ```js
   import 'jrlab-design/tokens/index.css';
   ```

3. **Wire up Tailwind.** Use the config directly, or extend it as a preset:

   ```js
   // tailwind.config.js  (ESM — this package ships as ES modules)
   import jrlab from 'jrlab-design/tailwind.config.js';

   export default {
     presets: [jrlab],
     content: ['./src/**/*.{js,jsx,ts,tsx}'],
   };
   ```

   > Using CommonJS (`tailwind.config.cjs`)? Import the preset with
   > `(await import('jrlab-design/tailwind.config.js')).default`, or copy the
   > token block from this file directly.

4. **Use the components:**

   ```jsx
   import { Button, Card, Badge, NavBar } from 'jrlab-design/components';

   export default function App() {
     return (
       <>
         <NavBar
           logo={<span>jr<span className="text-accent-500">lab</span></span>}
           links={[
             { label: 'Simulator', href: 'https://sim.jrlab.org' },
             { label: 'Academic', href: 'https://jrlab.org' },
           ]}
         />
         <main className="mx-auto max-w-content p-6">
           <Card
             header={<Card.Title>Cardiac output</Card.Title>}
             footer={<Button size="sm">View detail</Button>}
           >
             <p className="font-mono text-3xl">4.9 <span className="text-base text-slate-500">L/min</span></p>
             <Badge variant="success" dot className="mt-3">Within range</Badge>
           </Card>
         </main>
       </>
     );
   }
   ```

## Components

| Component | Props |
| --- | --- |
| `Button` | `variant`: `primary` \| `secondary` \| `ghost` \| `danger` · `size`: `sm` \| `md` \| `lg` · `as` (e.g. `"a"`) |
| `Card` | `header`, `footer` (slots) · `glow` (neon edge in dark mode) · `Card.Title`, `Card.Description` |
| `Badge` | `variant`: `default` \| `success` \| `warning` \| `error` \| `info` · `dot` |
| `NavBar` | `logo`, `links: [{ label, href }]` · `dark` + `onToggleTheme` (controlled) · exports `useDarkMode()` |

All components accept `className` (merged last) and pass through extra props to
the root element.

## Dark mode

Dark mode is class-based: a `dark` class on `<html>`. Toggle it however you
like — `NavBar` ships with a built-in toggle and a `useDarkMode()` hook that
persists the choice to `localStorage` under `jrlab-theme`.

```jsx
import { useDarkMode } from 'jrlab-design/components';
const { dark, toggle } = useDarkMode();
```

To avoid a flash of the wrong theme, restore it before paint:

```html
<script>
  try { if (localStorage.getItem('jrlab-theme') === 'dark')
    document.documentElement.classList.add('dark'); } catch (e) {}
</script>
```

## Tokens

`tokens/index.css` is the single source of truth. Colors are stored as raw RGB
channels (e.g. `--color-accent-500: 20 184 166;`) so the same variable works for:

- **Tailwind** — `rgb(var(--color-accent-500) / <alpha-value>)` (keeps opacity
  utilities like `bg-accent-600/40` working).
- **Plain CSS** — `color: rgb(var(--color-accent-500));` or with alpha
  `rgb(var(--color-accent-500) / 0.5)`.

Portable semantic aliases (`--bg`, `--surface`, `--fg`, `--border`, `--accent`,
`--highlight`, …) flip automatically under `.dark`, so non-React/non-Tailwind
consumers get light/dark for free.

**Type:** `--font-sans` = Inter (UI), `--font-mono` = JetBrains Mono (data/code).

## Preview

Open `docs/index.html` in any browser — it's standalone (CDN Tailwind + inlined
tokens) and renders every component and ramp, with a working theme toggle.

## License

Personal project — © Joel Rosiene.
