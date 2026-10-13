import { useEffect, useMemo, useRef, useState } from 'react'
import { LISTINGS } from '../data/listings'
import { ArrowLeftIcon, ArrowRightIcon, SearchIcon } from './icons'
import ListingCard from './ListingCard'
import QuickView from './QuickView'

const MODES = [
  { id: 'all', label: 'All' },
  { id: 'sale', label: 'Sale' },
  { id: 'rent', label: 'Rent' },
]
const TYPES = [
  { id: 'all', label: 'All types' },
  { id: 'house', label: 'Houses' },
  { id: 'condo', label: 'Condos' },
]
const pad = (n) => String(n).padStart(2, '0')

/**
 * Property showcase: a title with an underline, Sale / Rent tabs and a search box, then a row of cards you
 * can swipe or step through with the arrows. Every card shows its number in the list and its offer.
 * The type and city filters live in App so the hero search, the header menu and the city tiles can set them too.
 */
export default function Listings({ filters, onFilters, onContact }) {
  const { type, city } = filters
  const [mode, setMode] = useState('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('new')
  const [saved, setSaved] = useState({})
  const [openId, setOpenId] = useState(null)
  const [pos, setPos] = useState(0) // which card is at the left edge of the row
  const trackRef = useRef(null)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    const out = LISTINGS.filter(
      (l) =>
        (mode === 'all' || l.mode === mode) &&
        (type === 'all' || l.type === type) &&
        (!city || l.city === city) &&
        (!q || `${l.title} ${l.area} ${l.city}`.toLowerCase().includes(q)),
    )
    if (sort === 'low') out.sort((a, b) => a.price - b.price)
    if (sort === 'high') out.sort((a, b) => b.price - a.price)
    return out
  }, [mode, type, city, query, sort])

  // Picking a city from outside (a city tile or the hero search) starts a fresh search.
  useEffect(() => {
    if (city) { setQuery(''); setMode('all') }
  }, [city])

  // Go back to the first card whenever the list changes.
  useEffect(() => {
    const el = trackRef.current
    if (el) el.scrollTo({ left: 0 })
    setPos(0)
  }, [mode, type, city, query, sort])

  const step = () => {
    const el = trackRef.current
    const card = el && el.querySelector('.ix-slot')
    return card ? card.getBoundingClientRect().width + 24 : 380
  }
  const onScroll = () => {
    const el = trackRef.current
    if (el) setPos(Math.round(el.scrollLeft / step()))
  }
  const go = (dir) => trackRef.current && trackRef.current.scrollBy({ left: dir * step(), behavior: 'smooth' })

  // Keep the last opened home so the popup content does not vanish while it fades out.
  const openItem = LISTINGS.find((l) => l.id === openId)
  const lastItem = useRef(null)
  if (openItem) lastItem.current = openItem
  const shown = openItem || lastItem.current

  const toggleSave = (id) => setSaved((s) => ({ ...s, [id]: !s[id] }))
  const book = () => {
    setOpenId(null)
    setTimeout(onContact, 300) // wait for the popup to close and release the page scroll
  }
  const reset = () => { setMode('all'); setQuery(''); onFilters({ type: 'all', city: '' }) }

  const shownIndex = Math.min(pos, Math.max(0, list.length - 1))
  const progress = list.length ? (shownIndex + 1) / list.length : 0

  return (
    <section className="ix-sec ix-showcase" id="listings">
      <div className="ix-container">
        <div className="ix-sh-top">
          <div className="ix-sh-title">
            <span className="ix-eyebrow">02 / Featured listings</span>
            <h2 className="ix-h2">Property <em>Showcase</em></h2>
            <i className="ix-underline" />
          </div>

          <div className="ix-sh-controls">
            <div className="ix-seg" role="tablist" aria-label="Sale or rent">
              {MODES.map((m) => (
                <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} onClick={() => setMode(m.id)}>{m.label}</button>
              ))}
            </div>
            <label className="ix-searchpill">
              <span className="ix-sr">Search by city or area</span>
              <input type="search" placeholder="Enter city or area" value={query} onChange={(e) => setQuery(e.target.value)} />
              <SearchIcon />
            </label>
          </div>
        </div>

        <div className="ix-sh-bar">
          <div className="ix-sh-filters">
            <div className="ix-chips" role="group" aria-label="Property type">
              {TYPES.map((t) => (
                <button key={t.id} className="ix-chip" type="button" aria-pressed={type === t.id} onClick={() => onFilters({ ...filters, type: t.id })}>{t.label}</button>
              ))}
            </div>
            {city && <button className="ix-chip ix-chip-city" type="button" onClick={() => onFilters({ ...filters, city: '' })}>{city} ✕</button>}
            <label className="ix-sort">
              <span className="ix-sr">Sort homes</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="new">Newest</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>
          <p className="ix-count" aria-live="polite">{list.length} {list.length === 1 ? 'property' : 'properties'}{city ? ` in ${city}` : ''}</p>
        </div>

        <div className="ix-track" ref={trackRef} onScroll={onScroll} tabIndex={-1}>
          {list.length ? (
            list.map((item, i) => (
              <div className="ix-slot" key={`${item.id}-${mode}-${type}-${city}-${query}-${sort}`}>
                <ListingCard
                  item={item}
                  index={i}
                  total={list.length}
                  saved={!!saved[item.id]}
                  onToggleSave={toggleSave}
                  onOpen={setOpenId}
                  onContact={onContact}
                />
              </div>
            ))
          ) : (
            <div className="ix-empty">
              No homes match.{' '}
              <button className="ix-chip" type="button" onClick={reset}>Show all</button>
            </div>
          )}
        </div>

        <div className="ix-sh-foot">
          <div className="ix-index" aria-hidden="true">
            <span><b>{pad(list.length ? shownIndex + 1 : 0)}</b> / {pad(list.length)}</span>
            <i><u style={{ transform: `scaleX(${progress})` }} /></i>
          </div>
          <div className="ix-arrows">
            <button type="button" aria-label="Previous properties" onClick={() => go(-1)} disabled={shownIndex <= 0}><ArrowLeftIcon /></button>
            <button type="button" aria-label="Next properties" onClick={() => go(1)}><ArrowRightIcon /></button>
          </div>
        </div>
      </div>

      <QuickView
        item={shown}
        show={!!openItem}
        saved={shown ? !!saved[shown.id] : false}
        onHide={() => setOpenId(null)}
        onToggleSave={toggleSave}
        onBook={book}
      />
    </section>
  )
}
