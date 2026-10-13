import { useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { POSTS } from '../data/blog'
import { scrollToId } from '../utils'
import { ArrowIcon, CloseIcon } from './icons'

function Post({ post, featured, onOpen }) {
  return (
    <article
      className={`ix-post ${featured ? 'feature' : ''}`}
      data-cursor="Read"
      role="button"
      tabIndex={0}
      aria-label={`Read: ${post.title}`}
      onClick={() => onOpen(post.id)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) { e.preventDefault(); onOpen(post.id) }
      }}
    >
      <div className="ix-post-ph">
        <img src={post.img} alt="" loading="lazy" style={{ objectPosition: post.pos }} />
        <span className="ix-post-cat">{post.cat}</span>
      </div>
      <div className="ix-post-body">
        <span className="ix-post-meta">{post.date} · {post.read}</span>
        <h3>{post.title}</h3>
        {featured && <p>{post.excerpt}</p>}
        <span className="ix-post-more">Read article <ArrowIcon /></span>
      </div>
    </article>
  )
}

/** Blog: one big featured article and two smaller ones. Clicking an article opens it in a modal. */
export default function Blog() {
  const [openId, setOpenId] = useState(null)
  const openPost = POSTS.find((p) => p.id === openId)
  // keep the last opened article so the text does not vanish while the modal fades out
  const last = useRef(null)
  if (openPost) last.current = openPost
  const shown = openPost || last.current

  const talk = () => {
    setOpenId(null)
    setTimeout(() => scrollToId('contact'), 300) // wait for the modal to close and release the page scroll
  }

  return (
    <section className="ix-sec ix-blog" id="blog">
      <div className="ix-container">
        <div className="ix-head-row">
          <div>
            <span className="ix-eyebrow">10 / From the blog</span>
            <h2 className="ix-h2">Advice for <em>buyers</em><br />and sellers</h2>
          </div>
          <button className="ix-pillbtn" type="button" onClick={() => setOpenId(POSTS[0].id)}>Read the latest <ArrowIcon /></button>
        </div>

        <div className="ix-bl-grid">
          <Post post={POSTS[0]} featured onOpen={setOpenId} />
          <div className="ix-bl-side">
            <Post post={POSTS[1]} onOpen={setOpenId} />
            <Post post={POSTS[2]} onOpen={setOpenId} />
          </div>
        </div>
      </div>

      <Modal show={!!openPost} onHide={() => setOpenId(null)} centered dialogClassName="ix-modal-dialog ix-article-dialog" contentClassName="ix-modal-content" aria-labelledby="article-title">
        <button className="ix-qv-close" type="button" aria-label="Close" onClick={() => setOpenId(null)}><CloseIcon /></button>
        {shown && (
          <div className="ix-article">
            <div className="ix-article-img"><img src={shown.img} alt="" style={{ objectPosition: shown.pos }} /></div>
            <div className="ix-article-body">
              <span className="ix-post-cat static">{shown.cat}</span>
              <h3 id="article-title">{shown.title}</h3>
              <span className="ix-post-meta">{shown.date} · {shown.read}</span>
              {shown.body.map((para) => <p key={para.slice(0, 24)}>{para}</p>)}
              <div className="ix-qv-actions">
                <button className="ix-btn" type="button" onClick={talk}>Talk to an agent <ArrowIcon /></button>
                <button className="ix-btn ix-ghost" type="button" onClick={() => setOpenId(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
