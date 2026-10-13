import { CITIES } from '../data/listings'
import { BANNER_IMG } from '../data/site'
import ParallaxImg from './ParallaxImg'

/** Photo banner with one button per city. Picking a city filters the listings above. */
export default function Neighbourhoods({ onPick }) {
  return (
    <section className="ix-banner" id="areas">
      <ParallaxImg amount={28}src={BANNER_IMG.src} alt={BANNER_IMG.alt} loading="lazy" />
      <div className="ix-container">
        <div className="tw:grid tw:gap-3.5 tw:max-w-[560px]">
          <span className="ix-eyebrow">Neighbourhoods</span>
          <h2 className="ix-h2">Where we <em>work</em></h2>
          <p className="tw:text-white/85">Pick a city to see its homes.</p>
        </div>
        <div className="ix-cities">
          {CITIES.map((c) => (
            <button key={c.name} className="ix-city" type="button" onClick={() => onPick(c.name)}>{c.name}</button>
          ))}
        </div>
      </div>
    </section>
  )
}
