import { useEffect, useRef, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Accordion from 'react-bootstrap/Accordion'
import { MENU } from '../data/site'
import { ArrowIcon, ChevronIcon, LogoMark, MenuIcon, MoonIcon, SunIcon } from './icons'

const SECTIONS = ['listings', 'areas', 'about', 'team', 'reviews', 'contact']

/**
 * Floating glass header (a pill that hovers above the page) with the same tabs as indexrealtybrokerage.com.
 *  - a red highlight slides between the tabs as you hover them
 *  - a small dot shows which section you are in
 *  - it is dark glass over the hero and light glass over the rest, and hides while you scroll down
 * Desktop: tabs with dropdowns. Mobile: Bootstrap Offcanvas with an Accordion.
 * `onNavigate(item)` decides what a menu item does (see App.jsx).
 */
export default function Header({ onToggleTheme, onNavigate }) {
  const [overHero, setOverHero] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState('top')
  const [openIndex, setOpenIndex] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hl, setHl] = useState({ x: 0, w: 0, show: false })
  const lastY = useRef(0)
  const navRef = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const vh = window.innerHeight
      // The header stays as dark glass while the pinned scene plays, and turns light after it.
      // (the "Why Index" section is pulled up 26vh over the end of the scene, see scenes.css)
      const scene = document.getElementById('hero-scroll')
      const end = scene ? scene.offsetHeight - vh * 0.26 - 80 : vh * 0.7
      setOverHero(y < end)
      setScrolled(y > 24)
      setHidden(y > lastY.current && y > Math.max(vh * 0.9, end + 200))
      lastY.current = y
      let current = 'top'
      for (const id of SECTIONS) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < vh * 0.4) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const close = () => setOpenIndex(null)
    const onKey = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('click', close)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', close)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const go = (e, item) => {
    e.preventDefault()
    setOpenIndex(null)
    setMobileOpen(false)
    onNavigate(item)
  }
  const href = (item) => (item.to ? `#${item.to}` : item.type ? '#listings' : '#')

  // Slide the red highlight under the tab the mouse is on.
  const moveHl = (e) => {
    const nav = navRef.current
    const tab = e.currentTarget
    if (!nav) return
    const n = nav.getBoundingClientRect()
    const t = tab.getBoundingClientRect()
    setHl({ x: t.left - n.left, w: t.width, show: true })
  }
  const isActive = (entry) => entry.match && entry.match.includes(active)

  const logo = (
    <a className="ix-logo" href="#top" aria-label="Index Realty Brokerage home" onClick={(e) => go(e, { to: 'top' })}>
      <LogoMark />
      <b>INDEX</b>
    </a>
  )

  return (
    <>
      <header className={`ix-hdr ${overHero ? 'on-hero' : ''} ${scrolled ? 'scrolled' : ''} ${hidden ? 'hide' : ''}`}>
        <div className="ix-pill">
          {logo}

          <nav className="ix-nav" aria-label="Main" ref={navRef} onMouseLeave={() => setHl((h) => ({ ...h, show: false }))}>
            <span className="ix-hl" aria-hidden="true" style={{ transform: `translateX(${hl.x}px)`, width: hl.w, opacity: hl.show ? 1 : 0 }} />
            {MENU.map((entry, i) =>
              entry.items ? (
                <div className={`ix-dd ${openIndex === i ? 'open' : ''} ${isActive(entry) ? 'is-active' : ''}`} key={entry.label} onMouseEnter={moveHl}>
                  <button
                    className="ix-dd-b"
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openIndex === i}
                    onClick={(e) => { e.stopPropagation(); setOpenIndex(openIndex === i ? null : i) }}
                  >
                    {entry.label} <ChevronIcon />
                  </button>
                  <div className="ix-dd-m">
                    {entry.items.map((item) => (
                      <a key={item.label} href={href(item)} onClick={(e) => go(e, item)}>{item.label}</a>
                    ))}
                  </div>
                </div>
              ) : (
                <a key={entry.label} className={isActive(entry) ? 'is-active' : ''} href={href(entry)} onClick={(e) => go(e, entry)} onMouseEnter={moveHl}>
                  {entry.label}
                </a>
              ),
            )}
          </nav>

          <div className="ix-hdr-r">
            <button className="ix-icon-btn" type="button" onClick={onToggleTheme} aria-label="Switch light or dark theme">
              <SunIcon />
              <MoonIcon />
            </button>
            <a className="ix-login" href="#" onClick={(e) => e.preventDefault()}>Login <ArrowIcon /></a>
            <button className="ix-icon-btn ix-burger" type="button" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <Offcanvas show={mobileOpen} onHide={() => setMobileOpen(false)} placement="top" className="ix-offcanvas" aria-label="Menu">
        <Offcanvas.Header closeButton closeLabel="Close menu">
          <Offcanvas.Title as="div">{logo}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {MENU.map((entry) =>
            entry.items ? (
              <Accordion className="ix-acc" key={entry.label}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header as="div">{entry.label}</Accordion.Header>
                  <Accordion.Body>
                    {entry.items.map((item) => (
                      <a key={item.label} href={href(item)} onClick={(e) => go(e, item)}>{item.label}</a>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ) : (
              <a key={entry.label} className="ix-mlink" href={href(entry)} onClick={(e) => go(e, entry)}>{entry.label}</a>
            ),
          )}
          <a className="ix-login" href="#" onClick={(e) => e.preventDefault()}>Login</a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
