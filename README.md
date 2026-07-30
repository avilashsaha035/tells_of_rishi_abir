# Rishi Abir — Portfolio

A lightweight, single-page portfolio for Rishi Abir (Voice Artist · Model · Photographer · Senior Executive Officer, Media & Branding at Jamuna Future Park).

## Tech stack

- **HTML5** — semantic, single-file structure
- **Tailwind CSS (CDN + inline config)** — utility-first styling, no build step, no separate CSS file
- **jQuery 3.7** — mobile menu, smooth scroll, scroll-spy nav, scroll reveals, animated equalizer signature, contact form handling
- **Google Fonts** — Fraunces (display), Manrope (body), JetBrains Mono (labels)

No bundler, no `node_modules`, no build pipeline — open `index.html` and it works. This keeps the site fast to load and trivial to host anywhere, including basic shared hosting.

## File structure

```
rishi-abir-portfolio/
├── index.html      # all markup + Tailwind config
├── js/
│   └── main.js     # jQuery interactions
└── images/         # add real photos here
```

## Hero visual

The hero features a large demo photo of a studio recording microphone (from LoremFlickr, a free keyword-based placeholder image service — `https://loremflickr.com/1000/1000/microphone,studio`), duotone-graded to match the site's cool palette, with a "REC" indicator, pulsing soundwave rings, and a "Demo photo" badge.

**Before final launch**: replace the `src` on that `<img>` with a real photo (of Rishi in the studio, his own mic, etc.) saved into `/images`, and remove the "Demo photo" badge `<span>`. Everything else — sizing, duotone overlay, rings, tilt — keeps working unchanged. Note LoremFlickr serves random Flickr photos matching the keyword, so the exact image can change on reload/cache-refresh; the `?lock=42` parameter pins it to one consistent photo for the demo.

## Fonts

An editorial, artist-leaning type pairing:

- **Instrument Serif** (italic) — display headings, an elegant editorial serif for an artist-portfolio feel
- **Caveat** — small handwritten accent line under the hero name (`font-script`)
- **Manrope** — body copy
- **JetBrains Mono** — labels, eyebrows, timecodes (ties into the broadcast/radio theme)

## Photo placeholders — demo mode

Every photo on the page (hero, About strip, Brand cards, Photography gallery) is currently a **demo stock image** from `picsum.photos`, each carrying a small "Demo" badge so it's clear to whoever's reviewing the pitch that these are placeholders, not real photos of Rishi. This is intentional for showing the design to the client before real assets exist.

**Before final launch**: replace each `src="https://picsum.photos/seed/..."` (and the matching `data-full="..."` on gallery buttons) with real photos saved into `/images`, e.g. `src="images/portrait-01.jpg"`, and remove the "Demo" badge `<span>` elements. Everything else — sizing, hover effects, grayscale treatment, lightbox — keeps working unchanged.

## Icons

Hand-built inline SVG line icons (no external icon library, keeps the page dependency-light) used throughout: mic, screen, spark, radio dial, hanger, newspaper, camera, briefcase-style timeline markers, music note, film reel, video camera, palette, plant, cooking pot, envelope, map pin, and simple social glyphs for Instagram/Facebook/YouTube/LinkedIn.

## Animation

- **Directional section reveals** — every section uses `data-reveal="up|left|right|scale"` so content enters from a direction that fits its layout (About text slides in from opposite sides, hero image scales in, career items alternate left/right) instead of one uniform fade.
- **Career timeline draw-in** — the connecting line animates from top to bottom as the section scrolls into view.
- **Staggered cards** — grouped cards/items cascade in with a short delay between each.
- **Scrolling ticker, drifting ambient glow, animated gradient name, button shine, icon hover pop, tilt-on-hover** — carried over and extended from the previous pass.

A cool, artistic palette — deep indigo/near-black background, a periwinkle-blue accent, and a teal/cyan accent, in place of the earlier warm violet/amber pairing:

| Token | Hex | Use |
|---|---|---|
| `ink` | `#070A14` | Page background |
| `surface` / `surface2` | `#0E1424` / `#141B30` | Section and card backgrounds |
| `violet` | `#6C7CF7` | Primary accent (buttons, links, name highlight) |
| `amber` | `#2FD9C7` | Secondary "on-air" accent (teal, despite the token name) |
| `fog` | `#8A93B8` | Muted/body text |
| `paper` | `#EEF1FB` | Primary text |
| `line` | `#212A45` | Borders/dividers |

All defined once in the `tailwind.config` block in `index.html` — change them there to retheme the whole site.

## Photo placeholders — important

No real photo of Rishi was supplied, so instead of using random stock photos of strangers (which would misrepresent him), every spot meant for his photo is a clearly-labeled **dashed-border placeholder** with a shimmer animation — the hero portrait, the three About tiles, and the two Brand/Media cover images. Nothing on the page currently claims to be a real photo of him.

**To finish the site**: drop real photos into `/images` and replace each placeholder `<div>` with an `<img>` tag pointing at the file — the surrounding classes (`rounded-*`, `aspect-*`, hover/tilt behavior) will keep working unchanged. The Photography gallery section still uses generic `picsum.photos` demo images since that section represents sample photography *work*, not his likeness — swap those for his real shots the same way.

## Interactive features

- **Role cycler** — the "Currently /" line in the hero rotates through his roles (Voice Artist, Model, Photographer, Media & Branding Exec.) automatically.
- **Tilt-on-hover** — the hero placeholder and the two Brand/Media cards tilt subtly toward the cursor (`data-tilt`); voice-work cards and About tiles get a lighter version (`data-tilt-soft`).
- **Photo lightbox** — clicking any Photography tile opens a full-screen preview with next/prev, click-outside-to-close, and arrow-key/Escape support.
- **Scroll progress bar** — a thin teal bar under the header fills as the visitor scrolls down the page.
- **Scroll-spy nav** — the active section is highlighted in the nav as you scroll, with an animated underline.
- **Scrolling ticker** — an infinite marquee band beneath the hero cycles through his roles continuously.
- **Drifting ambient glow** — the two soft background blobs in the hero slowly drift and scale for a living, atmospheric feel.
- **Staggered reveals** — cards and list items within the same section fade/slide in with a slight cascade rather than all at once.
- **Button shine** — primary buttons get a light-sweep animation on hover.

## Customizing content

- **Photography section**: swap the demo `picsum.photos` images for real ones as described above.
- **Brand tags**: swap or add brand names in the `#brand` section.
- **Social links**: update the `href="#"` placeholders in `#contact` with real profile URLs.
- **Contact form**: the form currently only shows a confirmation message client-side. Wire it to a form backend (e.g. Formspree, a serverless function, or a small PHP/Laravel endpoint) to actually receive submissions.
- **Colors/fonts**: all tokens are defined once in the `tailwind.config` script block in `index.html` (`ink`, `surface`, `violet`, `amber`, `fog`, `paper`, `line`) — change them there and they apply site-wide.

## Performance notes

- Everything loads from CDNs (Tailwind, jQuery, Google Fonts) — no local dependencies to install.
- Images are the only thing to watch: compress/resize real photos before adding them (WebP recommended) to keep the page lightweight.
- For production, consider swapping the Tailwind CDN script for a compiled Tailwind CLI build (removes the small runtime compile cost and unused utilities) — optional, not required for a portfolio of this size.

## Deployment

Since this is fully static, it deploys anywhere without a Laravel/PHP runtime:

- **Shared cPanel hosting**: upload the folder contents directly into `public_html` (or a subfolder) via File Manager or FTP — no `.htaccess`, storage symlinks, or Vite build step needed, unlike a Laravel app.
- **Netlify / Vercel / GitHub Pages**: drag-and-drop or connect the repo; zero configuration required.

## Accessibility & responsiveness

- Semantic landmarks (`header`, `section`, `footer`), labeled form fields, visible focus states via Tailwind's default focus ring on inputs.
- Fully responsive from mobile up; mobile nav collapses into a slide-down menu.
- Respects reduced motion in spirit by keeping animations short and non-essential to comprehension (equalizer bars and reveals are decorative, not load-bearing for content).
