import { useEffect, useState } from 'react'
import { CITIES } from '../data/listings'
import { HERO_SLIDES } from '../data/site'
import { prefersReducedMotion } from '../utils'

const MODES = [
  { id: 'buy', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
  { id: 'sell', label: 'Sell' },
]

/** Full-screen photo slider with the Buy / Rent / Sell search. */
export default function Hero({ onSearch, onSell }) {
  const [slide, setSlide] = useState(2)
  const [mode, setMode] = useState('buy')
  const [city, setCity] = useState('')
  const [type, setType] = useState('all')
  const [address, setAddress] = useState('')

  // Advance every 8.5s. The timer restarts whenever the slide changes (also after a dot click).
  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = setTimeout(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 8500)
    return () => clearTimeout(id)
  }, [slide])

  const submit = (e) => {
    e.preventDefault()
    if (mode === 'sell') onSell(address)
    else onSearch({ city, type })
  }

  return (
    <section className="ix-hero">
      <div className="ix-slides">
        {HERO_SLIDES.map((s, i) => (
          <div className={`ix-slide ${i === slide ? 'on' : ''}`} key={s.src}>
            <img src={s.src} alt={s.alt} fetchPriority={i === 2 ? 'high' : 'auto'} style={{ objectPosition: s.position }} />
          </div>
        ))}
      </div>

      <div className="ix-hero-in">
        <span className="ix-hero-kicker">THE NEXT MOVE IS YOURS.</span><h1>
          <span className="l"><span>Find your</span></span>
          <span className="l"><span><em>own address.</em></span></span>
        </h1>
        <p className="sub ix-hf" style={{ '--d': 0 }}>Buy, sell or rent across Brampton, Mississauga, Toronto and beyond.</p>

        <div className="ix-modes ix-hf" style={{ '--d': 1 }} role="tablist" aria-label="I want to">
          {MODES.map((m) => (
            <button key={m.id} className="ix-mode" type="button" role="tab" aria-selected={mode === m.id} onClick={() => setMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>

        <form className="ix-search ix-hf" style={{ '--d': 2 }} role="search" onSubmit={submit}>
          {mode !== 'sell' ? (
            <>
              <div className="ix-fld">
                <label htmlFor="s-city">City</label>
                <select id="s-city" value={city} onChange={(e) => setCity(e.target.value)}>
                  <option value="">All GTA</option>
                  {CITIES.map((c) => <option key={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div className="ix-fld">
                <label htmlFor="s-type">Property type</label>
                <select id="s-type" value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="all">Any</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                </select>
              </div>
            </>
          ) : (
            <div className="ix-fld">
              <label htmlFor="s-addr">Your home address</label>
              <input id="s-addr" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="e.g. 12 Maple Ave, Brampton" autoComplete="street-address" />
            </div>
          )}
          <button className="ix-btn" type="submit">{mode === 'sell' ? 'Get valuation' : 'Search'}</button>
        </form>
      </div>

      <a className="ix-hero-route" href="#areas"><span>01 — 06</span><strong>Six cities.<br />Your next address.</strong><span className="ix-route-arrow" aria-hidden="true">↗</span></a><div className="ix-hero-foot"><span>INDEX REALTY / GREATER TORONTO</span>
        <div className="ix-hdots">
          {HERO_SLIDES.map((s, i) => (
            <button key={s.src} type="button" aria-label={`Photo ${i + 1}`} aria-current={i === slide} onClick={() => setSlide(i)}><i /></button>
          ))}
        </div>
      </div>
    </section>
  )
}
