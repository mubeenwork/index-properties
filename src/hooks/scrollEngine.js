/**
 * One shared scroll listener for all scroll-linked effects (hero scene, text fill, parallax ...).
 * Components `subscribe(fn)`; `fn(scrollY, viewportHeight)` runs once per animation frame while scrolling.
 * It returns an unsubscribe function, so it can be returned straight from a useEffect.
 */
const subscribers = new Set()
let ticking = false
let bound = false

function run() {
  ticking = false
  const y = window.scrollY
  const vh = window.innerHeight
  subscribers.forEach((fn) => fn(y, vh))
}

function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(run)
  }
}

export function subscribe(fn) {
  subscribers.add(fn)
  if (!bound) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    bound = true
  }
  fn(window.scrollY, window.innerHeight) // paint the right starting state straight away
  return () => {
    subscribers.delete(fn)
    if (!subscribers.size) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      bound = false
    }
  }
}
