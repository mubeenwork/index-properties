import { useState } from 'react'
import { ArrowIcon } from './icons'

/** Call-back form. It does not send anything yet: connect `onSubmit` to your CRM or email service. */
export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: send { name, contact } to the backend / CRM here.
    setSent(true)
  }

  return (
    <section className="ix-cta" id="contact">
      <div className="ix-container">
        <div className="row align-items-center gy-4 gx-lg-5">
          <div className="col-12 col-lg-6">
            <div className="tw:grid tw:gap-[18px]">
              <span className="ix-eyebrow">Get in touch</span>
              <h2 className="ix-h2">Ready for your <em>next</em> move?</h2>
              <p>Leave your details and an agent will call you within one business day. Free home valuations for sellers.</p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <form className="ix-cform" onSubmit={onSubmit}>
              <div className="row-in">
                <label className="ix-sr" htmlFor="f-name">Name</label>
                <input id="f-name" type="text" placeholder="Your name" required autoComplete="name" />
                <label className="ix-sr" htmlFor="f-contact">Phone or email</label>
                <input id="f-contact" type="text" placeholder="Phone or email" required autoComplete="email" />
              </div>
              <button className="ix-btn" type="submit">Request a call <ArrowIcon /></button>
              {sent && (
                <p className="ix-ok" role="status">
                  Thanks! On the live site an agent would now call you. This design prototype does not send anything.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
