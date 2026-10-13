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

## Section by section (each one has its own look)

| # | Section | Look | Files |
|---|---|---|---|
| - | Header | floating glass pill, red highlight slides between tabs, dot shows the current section, dark glass over the hero and light glass elsewhere | `Header.jsx`, `styles/header.css` |
| - | Hero + INDEX scene | full-screen photo slider that stays pinned for about two screens. Scrolling lifts the headline away, darkens the screen, shows a giant INDEX with the Toronto skyline inside the letters, then zooms it while Why Index rises over it. Retime it in `HeroScroll.jsx` (the seg ranges) and `height: 220vh` in `styles/scenes.css`; with reduce motion it is a plain hero | `Hero.jsx`, `HeroScroll.jsx`, `styles/hero.css` |
| 01 | Why Index | short statement that fills in word by word, then a bento grid of four reasons (a big photo tile, two photo tiles and a red number tile). Small tiles open their text on hover | `Statement.jsx`, `ScrollWords.jsx`, `styles/scenes.css` |
| 02 | Featured listings | **Property Showcase**: Sale / Rent tabs, search box, swipeable row of cards. Each card shows its number (01 / 08), the price (old price crossed out) and its offer | `Listings.jsx`, `ListingCard.jsx`, `styles/listings.css` |
| 03 | Neighbourhoods | dark rounded panel with six expanding panels: hover, focus or tap a city and it opens wide with its photo, number of homes and an Explore button; the others become thin strips with a vertical name (stacked on phones) | `Neighbourhoods.jsx`, `styles/locations.css` |
| 04 | What we do | soft grey rounded panel with three big photo tiles | `Services.jsx`, `styles/identity.css` |
| 05 | About | red rounded panel with the broker photo, three promises and numbers | `About.jsx`, `styles/identity.css` |
| 06 | Our team | a marquee: a row of agent cards slides sideways by itself and pauses on hover; social icons slide in on hover. Dummy agents and stock portraits in `src/data/team.js` | `Team.jsx`, `styles/team.css` |
| 07 | Client stories | tinted band with one big rounded quote card | `Testimonials.jsx`, `styles/identity.css` |
| 08 | Contact | black rounded panel with a red glow | `Contact.jsx`, `styles/identity.css` |

To change what a listing shows, edit `src/data/listings.js` (`mode`: sale or rent, `offer`, `was` for a reduced price). The scroll effects share one listener (`hooks/scrollEngine.js`) and switch off with "reduce motion".

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
