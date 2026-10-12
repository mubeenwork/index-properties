const line = {
  fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
}

export const BedIcon = () => (
  <svg viewBox="0 0 24 24" {...line}><path d="M3 19V6M3 15h18v4M21 15v-2.5A2.5 2.5 0 0 0 18.5 10H11v5" /><circle cx="7" cy="11.5" r="1.6" /></svg>
)
export const BathIcon = () => (
  <svg viewBox="0 0 24 24" {...line}><path d="M3 12h18v2a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-2zM5 12V6.5A2.5 2.5 0 0 1 9.2 4.7M7 18l-1 2M17 18l1 2" /></svg>
)
export const AreaIcon = () => (
  <svg viewBox="0 0 24 24" {...line}><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></svg>
)
export const PinIcon = () => (
  <svg viewBox="0 0 24 24" {...line} strokeWidth={2}><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
)
export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" {...line}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
)
export const HeartIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4 7.2 4c2 0 3.6 1.1 4.8 2.8C13.2 5.1 14.8 4 16.8 4c3.6 0 5.8 3.6 4.5 7.1-1.8 4.8-9.3 9.4-9.3 9.4z" /></svg>
)
export const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z" /></svg>
)
export const ChevronIcon = () => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2 4l4 4 4-4" /></svg>
)
export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" /></svg>
)
export const SunIcon = () => (
  <svg className="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M4.6 19.4l2.1-2.1M17.3 6.7l2.1-2.1" /></svg>
)
export const MoonIcon = () => (
  <svg className="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></svg>
)
export const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h12" /></svg>
)
export const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
)

/** Index logo mark. `currentColor` is the frame and roof, the bars are brand red. */
export const LogoMark = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect x="6" y="6" width="108" height="108" fill="none" stroke="currentColor" strokeWidth="8" />
    <polyline points="28,58 60,30 92,58" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="square" />
    <rect x="40" y="58" width="14" height="38" className="ix-red" />
    <rect x="60" y="62" width="26" height="7" className="ix-red" />
    <rect x="60" y="75" width="21" height="7" className="ix-red" />
    <rect x="60" y="88" width="16" height="7" className="ix-red" />
  </svg>
)
