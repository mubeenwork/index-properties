import { useState } from 'react'
export default function DemoAction({ children, className = 'ix-link' }) {
  const [open, setOpen] = useState(false)
  return <span className="ix-demo-action"><button type="button" className={className} onClick={() => setOpen(v => !v)} aria-expanded={open}>{children}</button>{open && <small role="status">Design preview only — no live service is connected.</small>}</span>
}
