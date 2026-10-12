import { useCallback, useState } from 'react'
import { prefersReducedMotion } from '../utils'

/**
 * Light / dark theme. The initial value is set by the small script in index.html
 * (saved choice, otherwise the system setting), so there is no flash on load.
 */
export default function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  )

  const apply = useCallback((next) => {
    const root = document.documentElement
    root.dataset.theme = next
    root.dataset.bsTheme = next // Bootstrap 5.3 colour mode
    try { localStorage.setItem('idx-theme', next) } catch { /* private mode */ }
    setTheme(next)
  }, [])

  const toggle = useCallback(
    (event) => {
      const next = theme === 'dark' ? 'light' : 'dark'
      const root = document.documentElement
      const btn = event?.currentTarget
      if (btn) {
        const r = btn.getBoundingClientRect()
        root.style.setProperty('--vx', `${r.left + r.width / 2}px`)
        root.style.setProperty('--vy', `${r.top + r.height / 2}px`)
      }
      if (document.startViewTransition && !prefersReducedMotion()) {
        document.startViewTransition(() => apply(next))
      } else {
        apply(next)
      }
    },
    [theme, apply],
  )

  return { theme, toggle }
}
