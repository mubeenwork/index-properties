import { useState } from 'react'
import DriftImage from './DriftImage'
import { EXTRA_CITIES } from '../data/homepage'
import { CITIES, LISTINGS } from '../data/listings'
import toronto from '../assets/images/toronto.jpg'
import home2 from '../assets/images/home2.jpg'
import home4 from '../assets/images/home4.jpg'
import home6 from '../assets/images/home6.jpg'
import condo from '../assets/images/condo1.jpg'
import home1 from '../assets/images/home1.jpg'
const photos = [home6, condo, toronto, home2, home1, home4]
export default function Neighbourhoods({ onPick }) {
  const [selected, setSelected] = useState(2)
  const city = CITIES[selected]
  const count = LISTINGS.filter(l => l.city === city.name).length
  return <section className="ix-sec ix-locations" id="areas"><div className="ix-container">
    <div className="ix-head-row"><div><span className="ix-eyebrow">THE NEIGHBOURHOOD INDEX</span><h2 className="ix-h2">Where do you<br /><em>feel at home?</em></h2></div><p className="ix-section-copy">Start with a city. Find your corner of it.<br />Select a destination to explore our local index.</p></div>
    <div className="ix-atlas">
      <div className="ix-city-index" role="group" aria-label="Choose a city">
        {CITIES.map((item, i) => <button key={item.name} aria-pressed={selected === i} aria-controls="city-preview" onClick={() => setSelected(i)}><span className="ix-city-number">0{i + 1}</span><span>{item.name}<small>{item.region} Region</small></span><span aria-hidden="true">↗</span></button>)}
      </div>
      <div className="ix-city-preview" id="city-preview">
        <DriftImage key={city.name} src={photos[selected]} alt={'Illustrative photograph for ' + city.name} />
        <span className="ix-atlas-stamp">INDEX / GTA <b>0{selected + 1}</b></span>
        <div className="ix-city-caption" aria-live="polite"><span>{city.region} Region · {count} sample {count === 1 ? 'home' : 'homes'}</span><h3>{city.name}</h3><button className="ix-btn" onClick={() => onPick(city.name)}>Explore {city.name} <span aria-hidden="true">↗</span></button></div>
      </div>
    </div><p className="ix-note tw:mt-5">Illustrative photography · Explore sample listings by city.</p><div className="ix-more-cities"><h3>Explore more Ontario communities</h3><p>Try a location filter in the sample collection.</p><div>{EXTRA_CITIES.map(name => <button type="button" key={name} onClick={() => onPick(name)}>{name} <span aria-hidden="true">↗</span></button>)}</div></div>
  </div></section>
}
