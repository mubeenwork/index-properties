import { useState } from 'react'
import DriftImage from './DriftImage'
import { SOLD, TEAM } from '../data/homepage'
import { scrollToId } from '../utils'
import { BedIcon, BathIcon } from './icons'
import home from '../assets/images/home3.jpg'

import DemoAction from './DemoAction'

export function BuyerPrograms() {
  return <section className="ix-sec ix-programs" id="buyer-programs"><div className="ix-container ix-pathways"><div><span className="ix-eyebrow">BUYING CAN TAKE MORE THAN ONE PATH</span><h2 className="ix-h2">Not quite ready?<br /><em>Let’s find a way.</em></h2><p>Explore sample buyer program layouts. These are design examples, not live offers.</p></div><div className="ix-pathway-list"><details open><summary><span>01</span>Zero Down Program <b>+</b></summary><div><p>Placeholder information for a sample buying program. Final program details will be added later.</p><DemoAction>Explore this path ↗</DemoAction></div></details><details><summary><span>02</span>Rent-to-Own <b>+</b></summary><div><p>Sample rent-to-own information to demonstrate this expandable section.</p><DemoAction>Explore this path ↗</DemoAction></div></details></div></div></section>
}

export function SoldListings() {
  return <section className="ix-sec ix-sold" id="sold"><div className="ix-container">
    <div className="ix-head-row"><div><span className="ix-eyebrow">SOLD COLLECTION / DESIGN PREVIEW</span><h2 className="ix-h2">A look at<br /><em>recent moves.</em></h2></div></div>
    <div className="ix-sold-grid">{SOLD.map((item, i) => <article className="ix-sold-card" key={item.slug}><div className="ix-sold-top"><span>SAMPLE PROPERTY</span><b>0{i+1}</b></div><p className="ix-sold-city">{item.city}</p><h3>{item.address}</h3><div className="ix-sold-facts"><span><BedIcon />{item.beds} bed</span><span><BathIcon />{item.baths} bath</span></div><span className="ix-sold-demo">Sample · Sold</span></article>)}</div>
    <p className="ix-note tw:mt-5">Fictional properties and specifications for layout preview only.</p>
  </div></section>
}

export function BuyerSellerTools() {
  const [mode, setMode] = useState('buy')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [valuation, setValuation] = useState(false)
  return <section className="ix-sec ix-move-tools" id="move-tools"><div className="ix-container ix-concierge"><div className="ix-concierge-visual"><DriftImage src={home} alt="A welcoming home interior" loading="lazy" /><div><span>THE MOVE STUDIO</span><h2>New keys.<br />New beginnings.</h2><p>A little direction for your next big decision.</p></div></div><div className="ix-concierge-content"><span className="ix-eyebrow">MAKE YOUR NEXT STEP A CLEAR ONE</span><div className="ix-intent-switch" role="group" aria-label="Plan your move">{['buy','sell','rent'].map(item=><button key={item} aria-pressed={mode===item} onClick={()=>setMode(item)}>{item==='buy'?'I’m buying':item==='sell'?'I’m selling':'I’m renting'}</button>)}</div><div className="ix-intent-panel" key={mode}>{mode==='sell'?<><h3>What could<br />your home be worth?</h3><p>Begin with your address. Continue with a local agent who knows the market.</p><form onSubmit={e=>{e.preventDefault();setValuation(true)}}><label htmlFor="valuation-address">Property address</label><input id="valuation-address" value={address} onChange={e=>{setAddress(e.target.value);setValuation(false)}} placeholder="Street address, city" autoComplete="street-address" required /><button className="ix-btn" type="submit">Plan my sale ↗</button></form>{valuation && <p className="ix-form-message" role="status">Demo valuation request for {address}. Nothing is sent and no real price is calculated.</p>}<DemoAction>Request a home valuation ↗</DemoAction></>:mode==='buy'?<><h3>Somewhere new.<br />Somewhere yours.</h3><p>Try the search layout and explore our sample property collection.</p><form onSubmit={e=>{e.preventDefault();scrollToId('listings')}}><label htmlFor="dream-city">Preferred city or location</label><input id="dream-city" name="place" value={city} onChange={e=>setCity(e.target.value)} placeholder="Where would you like to live?" required /><button className="ix-btn" type="submit">Find my next address ↗</button></form><DemoAction>Buying with Index ↗</DemoAction></>:<><h3>A fresh start.<br />Room to settle in.</h3><p>From a first apartment to more space for your family, talk to our team about renting and leasing in the GTA.</p><button className="ix-btn" onClick={()=>scrollToId('contact')}>Find a rental with us ↗</button></>}</div></div></div></section>
}

export function Team() {
  const [active, setActive] = useState(0)
  const person = TEAM[active]
  return <section className="ix-sec ix-team" id="team"><div className="ix-container ix-people-layout"><div className="ix-people-heading"><span className="ix-eyebrow">MEET THE PEOPLE BEHIND INDEX</span><h2 className="ix-h2">An address is local.<br /><em>So are we.</em></h2><p>Meet our fictional preview team. Select a profile to explore the team section design.</p><DemoAction>Meet the full team ↗</DemoAction></div><div className="ix-person-portrait"><span className="ix-person-monogram" aria-hidden="true">{person.name.split(' ').map(n=>n[0]).join('')}</span><img key={person.slug} src={person.img} alt={`Illustrative portrait for ${person.name}, a fictional sample profile`} loading="lazy" onError={e => { e.currentTarget.hidden = true }} /><span className="ix-person-label">SAMPLE TEAM MEMBER / 0{active+1}</span></div><div className="ix-people-list"><div role="group" aria-label="Choose your agent">{TEAM.map((member,i)=><button key={member.slug} aria-pressed={active===i} onClick={()=>setActive(i)}><span>0{i+1}</span><span><strong>{member.name}</strong><small>{member.role}</small></span><b aria-hidden="true">↗</b></button>)}</div><div className="ix-person-contact" aria-live="polite"><span>{person.phone} · Sample number</span><DemoAction>View {person.name.split(' ')[0]}’s profile ↗</DemoAction></div></div></div></section>
}

export function JoinUs() {
  const benefits = ['A map to success','Leadership training','Practical guidance & support','Growth opportunities','Mentorship by industry experts','Quality training & tools']
  return <section className="ix-sec ix-join" id="join"><div className="ix-container ix-join-grid"><div><span className="ix-eyebrow">Why join us</span><h2 className="ix-h2">Build your career.<br /><em>Grow with Index.</em></h2><p>Bring your ambition. Find the people, guidance and tools to support your next chapter in real estate.</p><button className="ix-btn" onClick={()=>scrollToId('contact')}>Let’s talk about your future ↗</button></div><ol>{benefits.map((benefit,i)=><li key={benefit}><span>0{i+1}</span>{benefit}</li>)}</ol></div></section>
}

export function Reports() {
  const [prepared, setPrepared] = useState(null)
  const submit = e => { e.preventDefault(); setPrepared(true) }
  return <section className="ix-sec ix-reports" id="reports"><div className="ix-container ix-report-grid"><div className="ix-report-image"><DriftImage src={home} alt="Bright home interior" loading="lazy" /><span><small>THE INDEX READING ROOM</small><strong>The informed<br />move.</strong><b>BUY / SELL / INVEST</b><i>01 — FIELD NOTES</i></span></div><div><span className="ix-eyebrow">Free real estate reports</span><h2 className="ix-h2">A little insight.<br /><em>A clearer next step.</em></h2><p>Explore the sample report request form. Report content will be added later.</p><form onSubmit={submit} onChange={()=>setPrepared(null)} className="ix-report-form"><label htmlFor="report-name">Full name</label><input id="report-name" name="name" autoComplete="name" required placeholder="Your full name" /><div className="ix-report-fields"><div><label htmlFor="report-phone">Phone</label><input id="report-phone" name="phone" type="tel" autoComplete="tel" required placeholder="Your phone number" /></div><div><label htmlFor="report-email">Email</label><input id="report-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></div></div><button className="ix-btn" type="submit">Preview report request ↗</button></form><p className="ix-note">Design preview only. No details are saved or sent.</p>{prepared && <div className="ix-form-message" role="status"><p>Sample request complete. This is a local preview; nothing has been sent.</p></div>}</div></div></section>
}
