import home1 from '../assets/images/home1.jpg'
import home2 from '../assets/images/home2.jpg'
import home4 from '../assets/images/home4.jpg'
import home5 from '../assets/images/home5.jpg'
import home6 from '../assets/images/home6.jpg'
import condo1 from '../assets/images/condo1.jpg'
import home3 from '../assets/images/home3.jpg'
import brampton from '../assets/images/city_brampton.jpg'

/**
 * Sample listings for the design. Replace with an MLS / CREA DDF feed later.
 * mode: 'sale' | 'rent' (rent prices are per month)
 * offer: a short line shown on the card (a price drop, a credit, an open house ...)
 * was: the previous price, shown crossed out when the price was reduced
 */
export const LISTINGS = [
  { id: 'IDX-0142', mode: 'sale', type: 'house', img: home6, title: 'Castlemore Family Home', price: 1249000, area: 'Castlemore', city: 'Brampton', beds: 4, baths: 3, sqft: 2310, status: 'Open house Sat 2–4', hot: true,
    offer: 'Open house Saturday 2–4 pm',
    desc: 'Bright detached home with a wraparound porch, a large backyard and a finished basement. Walking distance to schools and parks.' },
  { id: 'IDX-0157', mode: 'sale', type: 'condo', img: home5, title: 'City Centre Corner Suite', price: 689900, was: 729900, area: 'City Centre', city: 'Mississauga', beds: 2, baths: 2, sqft: 910, status: 'Price reduced', hot: true,
    offer: 'Price reduced by $40,000',
    desc: 'Corner suite with floor-to-ceiling windows, two balconies and underground parking. Steps from Square One and transit.' },
  { id: 'IDX-0163', mode: 'sale', type: 'house', img: home2, title: 'Glen Abbey Modern House', price: 1529000, area: 'Glen Abbey', city: 'Oakville', beds: 5, baths: 4, sqft: 3140, status: 'New listing',
    offer: 'New this week · virtual tour',
    desc: 'Architect-designed family home with an open kitchen, glass walls to the garden and a mature tree-lined lot.' },
  { id: 'IDX-0171', mode: 'sale', type: 'house', img: home4, title: 'Lakeview Pool Residence', price: 1089000, area: 'Lakeview', city: 'Whitby', beds: 4, baths: 4, sqft: 2480, status: 'For sale',
    offer: '$15,000 closing credit',
    desc: 'Modern two-storey home with a heated pool, terrace and four bedrooms. Quiet street close to the lake.' },
  { id: 'IDX-0178', mode: 'rent', type: 'condo', img: condo1, title: 'King West One-Bedroom', price: 2650, area: 'King West', city: 'Toronto', beds: 1, baths: 1, sqft: 620, status: 'For rent',
    offer: 'First month free on a 2-year lease',
    desc: 'Bright one-bedroom in the financial core with a gym, concierge and a short walk to the waterfront.' },
  { id: 'IDX-0190', mode: 'sale', type: 'house', img: home1, title: 'Willmott Garden Cottage', price: 899000, was: 925000, area: 'Willmott', city: 'Milton', beds: 3, baths: 3, sqft: 1850, status: 'Price reduced', hot: true,
    offer: 'Price reduced by $26,000',
    desc: 'Cosy three-bedroom home with big windows, a stone fireplace and a private garden backing onto green space.' },
  { id: 'IDX-0196', mode: 'sale', type: 'house', img: brampton, title: 'Heart Lake Family Home', price: 979000, area: 'Heart Lake', city: 'Brampton', beds: 3, baths: 3, sqft: 1920, status: 'For sale',
    offer: 'Flexible closing date',
    desc: 'Well kept brick family home with a double garage, updated kitchen and a deep lot on a quiet crescent.' },
  { id: 'IDX-0203', mode: 'rent', type: 'condo', img: home3, title: 'Downtown Milton Condo', price: 2200, area: 'Downtown', city: 'Milton', beds: 1, baths: 1, sqft: 540, status: 'For rent',
    offer: 'Locker and parking included',
    desc: 'Modern one-bedroom with a balcony and a locker, close to the GO station and shops.' },
]

export const CITIES = [
  { name: 'Brampton', region: 'Peel' },
  { name: 'Mississauga', region: 'Peel' },
  { name: 'Toronto', region: 'Toronto' },
  { name: 'Oakville', region: 'Halton' },
  { name: 'Milton', region: 'Halton' },
  { name: 'Whitby', region: 'Durham' },
]
