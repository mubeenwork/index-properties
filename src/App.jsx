import { useCallback, useState } from 'react'
import useTheme from './hooks/useTheme'
import { scrollToId } from './utils'
import Preloader from './components/Preloader'
import Header from './components/Header'
import HeroScroll from './components/HeroScroll'
import Statement from './components/Statement'
import Listings from './components/Listings'
import Services from './components/Services'
import About from './components/About'
import Team from './components/Team'
import Neighbourhoods from './components/Neighbourhoods'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import SectionTransition from './components/SectionTransition'
import Cursor from './components/Cursor'

export default function App() {
  const { toggle } = useTheme()
  const [filters, setFilters] = useState({ type: 'all', city: '' })
  const [introKey, setIntroKey] = useState(0)

  // The hero text animates in once the logo intro is done (see styles/base.css).
  const introDone = useCallback(() => document.documentElement.classList.add('ready'), [])
  const replayIntro = () => {
    document.documentElement.classList.remove('ready')
    window.scrollTo(0, 0)
    setIntroKey((k) => k + 1)
  }

  // Set the listing filters (from the hero search, header menu or a city button) and scroll to them.
  const showListings = useCallback((next = {}) => {
    setFilters({ type: 'all', city: '', ...next })
    setTimeout(() => scrollToId('listings'), 0)
  }, [])

  // What a header menu item does. Items with no `type` or `to` are design-only for now.
  const navigate = useCallback(
    (item) => {
      if (item.type) showListings({ type: item.type })
      else if (item.to) scrollToId(item.to)
    },
    [showListings],
  )

  return (
    <>
      <Preloader key={introKey} onReady={introDone} />
      <Header onToggleTheme={toggle} onNavigate={navigate} />
      <main id="top">
        {/* Pinned hero: scroll through it and the INDEX wordmark carries you into the page */}
        <HeroScroll onSearch={showListings} onSell={() => scrollToId('contact')} />
        <Statement />
        {/* Each section eases in as a whole when you reach it (scroll or menu click) */}
        <SectionTransition>
          <Listings filters={filters} onFilters={setFilters} onContact={() => scrollToId('contact')} />
        </SectionTransition>
        <SectionTransition><Neighbourhoods onPick={(city) => showListings({ city })} /></SectionTransition>
        <SectionTransition><Services /></SectionTransition>
        <SectionTransition><About /></SectionTransition>
        <SectionTransition><Team /></SectionTransition>
        <SectionTransition><Testimonials /></SectionTransition>
        <SectionTransition><Contact /></SectionTransition>
      </main>
      <Footer onReplay={replayIntro} />
      <WhatsAppButton />
      <Cursor />
    </>
  )
}
