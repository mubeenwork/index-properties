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
              <span className="ix-eyebrow">ONE CONVERSATION CAN CHANGE EVERYTHING</span>
              <h2 className="ix-h2">Let’s talk<br /><em>possibilities.</em></h2>
              <p>Try the contact form design using sample details. This preview does not send a message or request a callback.</p>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <form className="ix-cform" onSubmit={onSubmit}>
              <div className="ix-contact-fields">
                <div>
                <label htmlFor="f-name">Name</label>
                <input id="f-name" type="text" placeholder="Your name" required autoComplete="name" />
                </div><div>
                <label htmlFor="f-contact">Phone or email</label>
                <input id="f-contact" type="text" placeholder="Phone or email" required autoComplete="email" />
                </div>
              </div>
              <button className="ix-btn" type="submit">Preview request <ArrowIcon /></button>
              {sent && (
                <p className="ix-ok" role="status">
                  Preview complete. No details have been saved or sent.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
