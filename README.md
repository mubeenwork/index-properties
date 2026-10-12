# Index Realty Brokerage: homepage (React)

Homepage design for Index Realty Brokerage. Built with **Vite + React**, **Tailwind CSS v4** and **Bootstrap 5**.
Red / black / white, light and dark theme, photo hero, listing cards with quick view, header tabs copied from indexrealtybrokerage.com.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build on http://localhost:4173
```

## Where things are

```
src/
  App.jsx                  page order + the shared listing filters
  index.css                CSS layer order, Bootstrap + Tailwind imports, Tailwind theme
  styles/                  our own CSS, one file per area (colour tokens are in base.css)
  components/
    Preloader.jsx          logo intro (plays on every reload; "Replay intro" in the footer)
    Header.jsx             tabs + dropdowns (desktop), Bootstrap Offcanvas + Accordion (mobile)
    Hero.jsx               photo slider + Buy / Rent / Sell search
    Listings.jsx           filter chips, sort, Bootstrap grid
    ListingCard.jsx        one card (price on the photo, Book Viewing, call, WhatsApp)
    QuickView.jsx          popup for a listing (Bootstrap Modal)
    Services, About, Neighbourhoods, Testimonials, Contact, Footer, WhatsAppButton
    SectionTransition.jsx  wraps a whole section so it eases in when you reach it (small rise + fade + red line)
    Cursor.jsx             custom cursor: dot + trailing ring, grows on buttons, "View" on cards
    Reveal.jsx, CountUp.jsx, icons.jsx
  data/
    listings.js            sample listings and cities  <- replace with the real feed
    site.js                hero photos, services, testimonials, header menu
  hooks/useTheme.js        light / dark (saved in localStorage, circular reveal animation)
  hooks/useInView.js       "scrolled into view" helper used by Reveal, CountUp, About, Footer
  hooks/scrollEngine.js    one shared scroll listener for the scroll scene, text fill and parallax
```

## Scroll scene (inspired by findrealestate.com, not copied)

- **`HeroScroll.jsx`** pins the hero for about 2 screens. Scrolling lifts the headline away, darkens the photo, shows a giant INDEX wordmark with the city photo inside the letters, then grows it towards you while the next section rises over it. Each step is a number on a 0 to 1 scale written to CSS variables (`--h-o`, `--w-s` ...) and `styles/scenes.css` uses them. To retime it change the `seg(p, from, to)` ranges in `HeroScroll.jsx`. To make it shorter or longer change `height: 220vh` in `scenes.css`. For a gentler zoom lower the `6` in the `--w-s` line.
- **`Statement.jsx`** ("Why Index"): `ScrollWords` fills a paragraph in word by word, then four slanted photo strips rise one after another. On hover the strip under the mouse widens, its photo zooms, the others dim and its name slides up (labels are in the `STRIPS` list at the top of the file).
- **`ParallaxImg.jsx`**: photos drift a few pixels inside their frame (Services, About, the Toronto banner).
- They share one scroll listener (`hooks/scrollEngine.js`). With "reduce motion" the pinned scene is skipped and the page is static.

## Motion

- **Section ease-in:** wrap a section in `<SectionTransition>` (see `App.jsx`). Sections below the fold start hidden and are revealed just before they enter the screen. Timing and distance are in `styles/motion.css` (`.ix-sx`).
- **Cursor:** add `data-cursor="Text"` to any element to make the cursor show that text there (used on listing cards and service tiles). It only runs with a mouse, and is off when the visitor has "reduce motion" turned on.
- Both turn themselves off for visitors who prefer reduced motion.

## How Tailwind and Bootstrap work together

- **Bootstrap** gives the grid (`row`, `col-*`), the quick view **Modal**, and the mobile menu (**Offcanvas** + **Accordion**) through `react-bootstrap`.
- **Tailwind** utilities are written with a `tw:` prefix (`tw:grid tw:gap-4`). The prefix avoids clashes with Bootstrap class names such as `.container`.
- **Our own classes** start with `ix-` (for example `ix-card`) and live in `src/styles/*.css`.
- `src/index.css` sets the layer order `theme, base, bootstrap, components, utilities`, so our CSS always wins over Bootstrap's defaults.
- The colours are CSS variables (`--bg`, `--ink`, `--brand` ...) that change with `<html data-theme="dark">`. `data-bs-theme` is switched at the same time so Bootstrap components follow.

The build prints one harmless warning about Bootstrap's `@charset`. It can be ignored.

## Placeholders to replace before launch

- **Photos** in `src/assets/images` are free Unsplash stock photos. Use the client's own photography.
- **Listings** in `src/data/listings.js` are samples. Connect an MLS / CREA DDF feed or an API.
- **Reviews, team name, stats** are samples. The office address and "Broker of Record" came from third-party directories and should be confirmed with the client.
- **Forms** (`Contact.jsx`, hero "Get valuation") do not send anything yet. Connect them to the CRM or an email service.
- **Call and WhatsApp buttons** scroll to the contact form. Point them at `tel:` and `https://wa.me/<number>` links.
- **Header items** without a page (Calculators, Sold Properties, Visitors Tools, Commercial, Pre-Construction) are design only. Residential and Condo filter the listings.
- **Logo** is a placeholder mark. Swap `LogoMark` in `components/icons.jsx` and `public/favicon.svg` for the real logo.
