import { useEffect, useState } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas'
import Accordion from 'react-bootstrap/Accordion'
import { MENU } from '../data/site'
import { ChevronIcon, LogoMark, MenuIcon, MoonIcon, SunIcon } from './icons'

/**
 * Header with the same tabs as indexrealtybrokerage.com.
 * Desktop: click-controlled dropdowns with a single active menu. Mobile: Bootstrap Offcanvas with an Accordion.
 * `onNavigate(item)` decides what a menu item does (see App.jsx).
 */
export default function Header({ onToggleTheme, onNavigate }) {
  const [openIndex, setOpenIndex] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileIndex, setMobileIndex] = useState(null)

  useEffect(() => {
    const close = () => setOpenIndex(null)
    const onKey = (e) => {
      if (e.key === 'Escape') {
        const menu = document.activeElement?.closest('.ix-dd')
        close()
        menu?.querySelector('.ix-dd-b')?.focus()
      }
    }
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
    setMobileIndex(null)
    onNavigate(item)
  }
  const href = (item) => (item.to ? `#${item.to}` : item.type ? '#listings' : '#')

  const logo = (
    <a className="ix-logo" href="#top" aria-label="Index Realty Brokerage home" onClick={(e) => go(e, { to: 'top' })}>
      <LogoMark />
      <b>INDEX</b>
    </a>
  )

  return (
    <>
      <header className="ix-hdr">
        <div className="ix-container">
          {logo}

          <nav className="ix-nav" aria-label="Main">
            {MENU.map((entry, i) =>
              entry.items ? (
                <div className={`ix-dd ${openIndex === i ? 'open' : ''}`} key={entry.label}
                  onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setOpenIndex(current => current === i ? null : current) }}>

                  <button
                    className="ix-dd-b"
                    type="button"
                    aria-haspopup="true"
                    aria-controls={`desktop-menu-${i}`}
                    aria-expanded={openIndex === i}
                    onClick={(e) => { e.stopPropagation(); setOpenIndex(openIndex === i ? null : i) }}
                  >
                    {entry.label} <ChevronIcon />
                  </button>
                  <div className="ix-dd-m" id={`desktop-menu-${i}`} hidden={openIndex !== i}>
                    {entry.items.map((item) => (
                      <a key={item.label} href={href(item)} onClick={(e) => go(e, item)}>{item.label}</a>
                    ))}
                  </div>
                </div>
              ) : (
                <a key={entry.label} href={href(entry)} onClick={(e) => go(e, entry)}>{entry.label}</a>
              ),
            )}
          </nav>

          <div className="ix-hdr-r">
            <button className="ix-icon-btn" type="button" onClick={onToggleTheme} aria-label="Switch light or dark theme">
              <SunIcon />
              <MoonIcon />
            </button>
            <a className="ix-login" href="#contact" onClick={(e) => go(e, { to: 'contact' })}>Let’s talk ↗</a>
            <button className="ix-icon-btn ix-burger" type="button" aria-label="Open menu" aria-expanded={mobileOpen} onClick={() => { setOpenIndex(null); setMobileIndex(null); setMobileOpen(true) }}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <Offcanvas show={mobileOpen} onHide={() => { setMobileOpen(false); setMobileIndex(null) }} placement="top" className="ix-offcanvas" aria-label="Menu">
        <Offcanvas.Header closeButton closeLabel="Close menu">
          <Offcanvas.Title as="div">{logo}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {MENU.map((entry) =>
            entry.items ? (
              <Accordion className="ix-acc" key={entry.label} activeKey={mobileIndex === entry.label ? "0" : null} onSelect={key => setMobileIndex(key === "0" ? entry.label : null)}>
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
          <a className="ix-login" href="#contact" onClick={(e) => go(e, { to: 'contact' })}>Let’s talk ↗</a>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}
