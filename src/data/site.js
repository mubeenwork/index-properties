import city2 from '../assets/images/city2.jpg'
import hero2 from '../assets/images/hero2.jpg'
import hero3 from '../assets/images/hero3.jpg'
import home3 from '../assets/images/home3.jpg'
import home8 from '../assets/images/home8.jpg'
import home9 from '../assets/images/home9.jpg'
import about from '../assets/images/about.jpg'
import toronto from '../assets/images/toronto.jpg'

// Stock photos from Unsplash, used as placeholders. Replace with the client's own photography.
export const HERO_SLIDES = [
  { src: city2, alt: 'Toronto skyline at sunset', position: '50% 40%' },
  { src: hero2, alt: 'Modern villa with a pool', position: '50% 50%' },
  { src: hero3, alt: 'Modern white house with glass doors', position: '50% 45%' },
]

export const SERVICES = [
  { title: 'Buy', img: home3, alt: 'Bright modern living room', text: 'We find the right home, check the price against recent sales and negotiate for you.', to: 'listings' },
  { title: 'Sell', img: home8, alt: 'Modern villa with a pool', text: 'Smart pricing, great photos and a clear plan to get you the best offer.', to: 'contact' },
  { title: 'Rent & New Builds', img: home9, alt: 'White modern house', text: 'Rentals, leases and early access to pre-construction launches across the GTA.', to: 'contact' },
]

export const ABOUT_IMG = { src: about, alt: 'Small house model with keys on a table' }
export const BANNER_IMG = { src: toronto, alt: 'Aerial view of downtown Toronto' }

export const TESTIMONIALS = [
  { text: 'They explained every number before we made an offer. We always knew why we were paying what we paid.', who: 'Sample review · Buyers in Brampton' },
  { text: 'Our condo sold in under two weeks. The pricing advice made all the difference.', who: 'Sample review · Seller in Mississauga' },
  { text: 'Simple, honest and always available. We would work with them again.', who: 'Sample review · Buyers in Whitby' },
]

// Header tabs, copied from indexrealtybrokerage.com. Items without `type` or `to` are design-only for now.
export const MENU = [
  { label: 'Home', to: 'top' },
  { label: 'Listings', items: [
    { label: 'Residential', type: 'house' },
    { label: 'Condo', type: 'condo' },
    { label: 'Commercial' },
    { label: 'Pre-Construction' },
  ] },
  { label: 'Calculators', items: [
    { label: 'Mortgage Payment' }, { label: 'Land Transfer Tax' }, { label: 'Affordability' }, { label: 'Closing Costs' },
  ] },
  { label: 'Sold Properties' },
  { label: 'About', items: [
    { label: 'About Us', to: 'about' }, { label: 'Our Team', to: 'about' },
    { label: 'Join Index Realty', to: 'contact' }, { label: 'Contact Us', to: 'contact' },
  ] },
  { label: 'Visitors Tools', items: [
    { label: 'Buyer Programs' }, { label: 'Listing Alerts' }, { label: 'School Rankings' },
    { label: 'Buyer Guide' }, { label: 'Seller Guide' }, { label: 'Useful Links' },
  ] },
]
