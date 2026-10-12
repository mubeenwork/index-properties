import { useMemo, useRef, useState } from 'react'
import { LISTINGS } from '../data/listings'
import ListingCard from './ListingCard'
import QuickView from './QuickView'

const TYPES = [
  { id: 'all', label: 'All' },
  { id: 'house', label: 'Houses' },
  { id: 'condo', label: 'Condos' },
]

/**
 * Our office / Featured listings: filter chips, sort, Bootstrap grid of cards and the quick view popup.
 * The filters live in App so the hero search, the header menu and the city buttons can set them too.
 */
export default function Listings({ filters, onFilters, onContact }) {
  const { type, city } = filters
  const [sort, setSort] = useState('new')
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [saved, setSaved] = useState({})
  const [openId, setOpenId] = useState(null)

  const list = useMemo(() => {
    const out = LISTINGS.filter((l) => (type === 'all' || l.type === type) && (!city || l.city === city) && (!query.trim() || [l.title, l.area, l.city].join(' ').toLowerCase().includes(query.trim().toLowerCase())))
    if (sort === 'low') out.sort((a, b) => a.price - b.price)
    if (sort === 'high') out.sort((a, b) => b.price - a.price)
    return expanded || city || query.trim() ? out : out.slice(0, 4)
  }, [type, city, sort, query, expanded])

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

  return (
    <section className="ix-sec" id="listings">
      <div className="ix-container">
        <div className="ix-head-row">
          <div>
            <span className="ix-eyebrow">THE PROPERTY EDIT / SAMPLE LISTINGS</span>
            <h2 className="ix-h2">Find a space.<br /><em>Make it yours.</em></h2>
          </div>
          <div className="ix-tools"><label className="ix-property-search"><span className="ix-sr">Search city, neighbourhood or home</span><input type="search" placeholder="City, neighbourhood or home" value={query} onChange={e => setQuery(e.target.value)} /><span aria-hidden="true">⌕</span></label>
            <div className="ix-chips" role="group" aria-label="Filter homes">
              {TYPES.map((t) => (
                <button key={t.id} className="ix-chip" type="button" aria-pressed={type === t.id} onClick={() => onFilters({ ...filters, type: t.id })}>
                  {t.label}
                </button>
              ))}
            </div>
            <label className="ix-sort">
              <span className="ix-sr">Sort homes</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="new">Featured order</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
            </label>
          </div>
        </div>

        <p className="ix-count" aria-live="polite">
          {list.length} {list.length === 1 ? 'home' : 'homes'} {city ? `in ${city}` : 'in the GTA'}
        </p>

        {/* Bootstrap grid. The key restarts the entry animation whenever the filters change. */}
        <div className="ix-property-editorial" key={`${type}-${city}-${sort}`}>
          {list.length ? (
            list.map((item, i) => (
              <div className="ix-property-cell" key={item.id}>
                <ListingCard
                  item={item}
                  index={i}
                  saved={!!saved[item.id]}
                  onToggleSave={toggleSave}
                  onOpen={setOpenId}
                  onContact={onContact}
                />
              </div>
            ))
          ) : (
            <div className="col-12">
              <div className="ix-empty">
                No sample homes match.{' '}
                <button className="ix-chip" type="button" onClick={() => { onFilters({ type: 'all', city: '' }); setQuery('') }}>Show all</button>
              </div>
            </div>
          )}
        </div>

        <div className="ix-more">
          <button className="ix-link" type="button" onClick={() => { if (city) onFilters({ ...filters, city: '' }); setExpanded(!expanded) }}>
            {city ? 'Explore all cities ↗' : expanded ? 'Show featured homes ↑' : 'Explore all 8 homes ↗'}
          </button>
        </div>
        <p className="ix-note tw:mt-5 tw:text-center">Sample listings and stock photos for the design</p>
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
