import useInView from '../hooks/useInView'

/** Fades an element up once it scrolls into view. `delay` staggers siblings (1 = 100ms). */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      className={`ix-rv ${inView ? 'in' : ''} ${className}`}
      style={{ '--d': delay, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
