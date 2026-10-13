import toronto from '../assets/images/toronto.jpg'
import home6 from '../assets/images/home6.jpg'
import home2 from '../assets/images/home2.jpg'

// Blog articles. Replace with real articles (or a CMS) later.
export const POSTS = [
  {
    id: 'market', cat: 'Market update', date: 'Oct 8, 2026', read: '5 min read', img: toronto, pos: '50% 35%',
    title: 'Reading the GTA market: what buyers should watch this fall',
    excerpt: 'Prices, supply and days on market look different in Peel, Halton, Toronto and Durham. Here is how to compare them properly.',
    body: [
      'The GTA is not one market. Prices, the number of homes for sale and how fast they sell can be very different in Brampton, Oakville, downtown Toronto and Whitby, even in the same month.',
      'Before you make an offer, compare the same type of home in the same neighbourhood over the last three months. A city-wide average hides too much, while a handful of recent nearby sales tells you what a fair price looks like today.',
      'Ask your agent for the sold prices, the asking prices and how many days each home took to sell. If homes are selling above asking, plan your offer and your financing early. If they are sitting, you have more room to negotiate.',
    ],
  },
  {
    id: 'ltt', cat: 'Buyer guide', date: 'Sep 24, 2026', read: '7 min read', img: home6, pos: '50% 55%',
    title: 'Buying your first home in Ontario: land transfer tax explained',
    excerpt: 'It is paid when you close, and Toronto buyers pay a second one. See how it works and how first-time buyers can save.',
    body: [
      'In Ontario, land transfer tax is paid on closing day, so it needs to be part of your budget from the start. It is calculated on the purchase price.',
      'If the home is in the City of Toronto, you also pay a municipal land transfer tax on top of the provincial one. Eligible first-time buyers may get a refund on some or all of it.',
      'The rules and refund limits change from time to time, so ask your lawyer to confirm the amount before closing. We include land transfer tax in every cost breakdown we prepare for you.',
    ],
  },
  {
    id: 'sell', cat: 'Seller guide', date: 'Sep 11, 2026', read: '6 min read', img: home2, pos: '50% 50%',
    title: 'Getting your home ready to sell: five fixes that pay back',
    excerpt: 'You do not need a renovation. A few simple jobs can change how buyers see your home.',
    body: [
      'Start by clearing the clutter. Buyers need to picture their own things in your rooms, so pack away personal items and extra furniture.',
      'Repaint bold colours in a soft neutral, fix the small things such as loose handles, dripping taps and chipped paint, and make sure every room is bright with clean windows and working bulbs.',
      'Finish with the entrance and the photos. A tidy front door and professional photography decide whether a buyer clicks on your listing or scrolls past it.',
    ],
  },
]

// Frequently asked questions
export const FAQS = [
  {
    q: 'How much do I need for a down payment?',
    a: 'In Canada the minimum is 5% of the first $500,000 of the price and 10% of the part above that, up to $1.5 million. Homes of $1.5 million or more need at least 20% down. These rules can change, so confirm them with your lender.',
  },
  {
    q: 'How long does it take to buy a home?',
    a: 'Finding the right home takes as long as it takes. After your offer is accepted, closing is usually 30 to 90 days later, depending on the date you agree on and your financing.',
  },
  {
    q: 'What does it cost to sell my home?',
    a: 'The main costs are the agent commission, legal fees and any mortgage discharge fee. We agree the commission in writing before we list, and we give you an estimate of all the costs up front.',
  },
  {
    q: 'Do I have to pay land transfer tax?',
    a: 'Yes, in Ontario it is paid when you close. Buyers in the City of Toronto pay a second, municipal land transfer tax. First-time buyers may be eligible for a refund.',
  },
  {
    q: 'Can you help with pre-construction homes?',
    a: 'Yes. We explain the deposit schedule, assignments and closing costs before you sign, and we follow the project with you until you get the keys.',
  },
  {
    q: 'How do I book a viewing?',
    a: 'Press "Book Viewing" on any listing, or use the contact form at the bottom of the page. An agent will reply within one business day.',
  },
]
