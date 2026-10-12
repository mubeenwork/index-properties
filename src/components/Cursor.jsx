import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)
  useEffect(() => {
    const media = matchMedia('(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)')
    const root = document.documentElement
    const dot = dotRef.current, ring = ringRef.current
    let frame = 0, x = 0, y = 0, rx = 0, ry = 0, visible = false
    const hide = () => {
      visible = false
      root.classList.remove('ix-cursor-on')
      dot.classList.remove('show')
      ring.classList.remove('show')
      cancelAnimationFrame(frame)
      frame = 0
    }
    const tick = () => {
      rx += (x - rx) * .24
      ry += (y - ry) * .24
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)'
      frame = Math.abs(x-rx) + Math.abs(y-ry) > .2 ? requestAnimationFrame(tick) : 0
    }
    const over = e => {
      if (!(e.target instanceof Element)) return
      const native = e.target.closest('input,select,textarea,option,[contenteditable="true"]')
      const target = e.target.closest('a,button,summary,[role="button"],[data-cursor]')
      const label = !native && target?.dataset.cursor
      const state = native ? 'native' : label ? 'view' : target ? 'link' : 'default'
      dot.dataset.state = ring.dataset.state = state
      labelRef.current.textContent = label || ''
    }
    const move = e => {
      if (!media.matches || e.pointerType !== 'mouse') return
      x=e.clientX; y=e.clientY
      if (!visible) { rx=x; ry=y; visible=true; root.classList.add('ix-cursor-on'); dot.classList.add('show'); ring.classList.add('show') }
      dot.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)'
      over(e)
      if (!frame) tick()
    }
    const down = () => ring.classList.add('down')
    const up = () => ring.classList.remove('down')
    window.addEventListener('pointermove',move,{passive:true})
    document.addEventListener('pointerover',over,{passive:true})
    document.addEventListener('pointerdown',down)
    document.addEventListener('pointerup',up)
    root.addEventListener('pointerleave',hide)
    window.addEventListener('blur',hide)
    media.addEventListener('change',hide)
    return () => {
      hide()
      window.removeEventListener('pointermove',move)
      document.removeEventListener('pointerover',over)
      document.removeEventListener('pointerdown',down)
      document.removeEventListener('pointerup',up)
      root.removeEventListener('pointerleave',hide)
      window.removeEventListener('blur',hide)
      media.removeEventListener('change',hide)
    }
  },[])
  return <><div className="ix-cursor" ref={ringRef} aria-hidden="true"><div className="ix-ring"><span className="label" ref={labelRef}/></div></div><div className="ix-dot" ref={dotRef} aria-hidden="true"/></>
}
