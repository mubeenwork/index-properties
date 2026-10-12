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

## October 2026 visual refresh

The active React homepage now uses a rounded architectural hero with natural page scrolling, an absolute glass navigation bar, a four-column property showcase, and a photographic city grid. The previous pinned hero and custom cursor are no longer mounted. `src/styles/redesign.css` contains the visual refresh and responsive overrides.

Property cards and quick views display the same sample asking price with an explicit CAD label. Search supports city, neighbourhood and property name; the explore button expands all eight sample listings. Prices remain illustrative, not verified market listings. The standalone HTML prototype is unchanged.

The final Index identity pass uses `styles/identity.css`: red/charcoal branding, a non-sticky navigation bar, a two-column property layout, and a numbered interactive city index. Selecting a city updates its image and details; its Explore action filters the property list.

## Homepage section coverage (13 October 2026)

Compared against the public homepage at https://indexrealtybrokerage.com/.

- Hero/search and office featured listings: retained existing sections.
- Zero Down and Rent-to-Own promotions: `BuyerPrograms`, links to original program pages.
- Recent office sold listings: `SoldListings`, three public address records with official detail links. No transaction prices are reproduced or inferred.
- Buy/sell promotions, dream-home search and home-worth request: `BuyerSellerTools`. Location search opens the official results page; valuation continues on the official service page.
- Search by city: six existing local sample filters plus twelve further Ontario city links.
- Our Team: four verified public profiles with original portraits and a link to the full directory.
- Why Join Us: training, support, mentorship and career benefits.
- About: retained existing section.
- Free Real Estate Reports: locally prepares a mailto draft for the visitor to review and send. No backend submission or automatic delivery.
- Footer: official office phone/address, planning tools, market report, social profiles, privacy and CRM links.

New content: `components/HomepageSections.jsx`, `data/homepage.js`, and `styles/homepage.css`. Team portraits are served from the original site with initials as the unavailable-image fallback. Existing sample listings and reviews remain clearly marked.

## Editorial revamp

The homepage now follows a deliberate visitor journey: hero and quick orientation → featured property edit → neighbourhood explorer → interactive Buy/Sell/Rent Move Studio → expandable buyer programs → office results → brokerage story → selectable team profile → testimonials → careers → reports → contact.

The former standalone Services tiles are consolidated into the Move Studio; all original homepage content categories are retained. `styles/editorial.css` defines the final composition. Property results have one lead feature and smaller supporting cards, team profiles switch interactively, sold records use a compact list, and the reports section uses a publication-style cover. Section motion is reduced to a subtle fade/rise and continues to respect reduced-motion preferences.


## Gentle motion

Section reveals now follow scroll position through the shared animation-frame listener, rather than completing on a timer. Groups move up by at most 32px and reach full opacity as their top travels from 94% to 68% of viewport height. Reveal progress never reverses while content remains visible; it resets only once the group is fully below the viewport with a 40px buffer. ResizeObserver refreshes positions when section layout changes. Property images ease from 1.045 scale to their natural size using the same progress. Focused content is fully visible; reduced-motion preferences disable these effects, including live preference changes.

Selected images drift by at most 8px on desktop only. The hero retains a slow zoom and interactive controls retain subtle hover/selection transitions. Typography uses stronger weights and larger body/label sizes, with a compact left-aligned listings heading and reduced section gaps.

## Section finish and cursor

The homepage uses framed property detail panels, highlighted city/agent selections, inset buyer-program cards, reader-controlled reviews, and visible contact labels. Reports and contact forms have distinct panels; hero search, careers and footer spacing share the same visual treatment.

The homepage uses a small black SVG arrow cursor with a white outline and subtle blue glow, rendered natively without JavaScript tracking or a trailing ring. Text fields retain a typing cursor; touch devices keep normal behavior.

Scroll regression checks: `node --test tests/revealProgress.test.js` covers entry, reverse scrolling, offscreen reset, keyboard focus and mobile height.

## Dummy-data-only preview

All homepage people, sold records and contacts are fictional placeholders. Real agent portraits and external brokerage/social/CRM links have been removed. Former external actions show local demo feedback, city links filter sample listings, and all forms stay on-page without email drafts, network submission or persistence. Brand styling and geographic city filters are retained as design context.
