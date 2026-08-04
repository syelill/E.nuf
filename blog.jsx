// === Blog — sketchbook journal ===

function JournalSketch({ palette, seed, label }) {
  return (
    <div className="journal-sketch">
      <ArtPlaceholder palette={ARTWORK_PALETTES[palette]} seed={seed + 50} label={label} />
    </div>
  );
}

function JournalPhotos({ images, stacked }) {
  return (
    <div className={"journal-photos" + (stacked ? " journal-photos--stack" : "")} style={stacked ? undefined : { gridTemplateColumns: images.length === 1 ? '1fr' : '1fr 1fr' }}>
      {images.map((im, i) => (
        <figure className="journal-photo" key={im.src}>
          <img src={im.src} alt={im.alt || ''} draggable={false} loading="lazy" />
          {im.caption ? <figcaption className="journal-photo__cap">{im.caption}</figcaption> : null}
        </figure>
      ))}
    </div>
  );
}

function BlogPage({ tweaks }) {
  const [idx, setIdx] = React.useState(0);
  const [flipping, setFlipping] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const post = BLOG_POSTS[idx];
  // 2+ photos: stack them above/below and let them fill the left page.
  const stacked = !!(post.images && post.images.length > 1);

  const autoplay = tweaks?.blogAutoplay !== false;
  const intervalMs = (tweaks?.blogIntervalSec ?? 5) * 1000;

  const go = (next) => {
    if (next < 0 || next >= BLOG_POSTS.length || flipping) return;
    setFlipping(true);
    setTimeout(() => { setIdx(next); setFlipping(false); }, 380);
  };

  // Auto-flip
  React.useEffect(() => {
    if (paused || !autoplay) return;
    const id = setInterval(() => {
      setIdx(i => (i + 1) % BLOG_POSTS.length);
      setFlipping(true);
      setTimeout(() => setFlipping(false), 380);
    }, intervalMs);
    return () => clearInterval(id);
  }, [paused, autoplay, intervalMs]);

  return (
    <div className="journal-stage">
      {/* Header */}
      <div style={{ width: 'min(1180px, 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22, gap: 20, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <span style={{ width: 28, height: 1, background: 'var(--gold)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.30em', textTransform: 'uppercase', color: 'var(--gold)' }}>
              Artist Notebook · Journal Entries
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 900, fontSize: 'clamp(56px, 7vw, 88px)', margin: 0, letterSpacing: '-0.03em', lineHeight: 0.95 }}>
            Sketchbook<span style={{ color: 'var(--gold)' }}>.</span>
          </h1>
          <p style={{ marginTop: 14, fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', maxWidth: 520, textWrap: 'pretty' }}>
            Process notes, field observations, unfinished thoughts, and visual fragments.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, alignSelf: 'flex-end' }}>
          {BLOG_POSTS.map((p, i) => (
            <div key={p.id} className="page-tab" style={{
              transform: `translateY(${i === idx ? '0' : '4px'})`,
              background: i === idx ? 'var(--paper)' : 'var(--paper-2)',
              cursor: 'pointer',
              opacity: i === idx ? 1 : 0.55
            }} onClick={() => idx !== i && go(i)}>
              {p.pageNumber}
            </div>
          ))}
        </div>
      </div>

      {/* Spread */}
      <div className={"journal-spread" + (flipping ? " journal-spread--flipping" : "")} key={post.id}>
        {/* LEFT page — sketch + meta */}
        <div className={"journal-page journal-page--left" + (stacked ? " journal-page--left-fill" : "")}>
          <div className="journal-meta">
            <span>{post.date}</span>
            <span>Entry · {post.pageNumber}</span>
          </div>
          <span className="journal-cat">{post.category}</span>

          {stacked ? <div className="journal-side journal-side--inline">"{post.side}"</div> : null}

          <div className={"journal-photoslot" + (stacked ? " journal-photoslot--fill" : "")}>
            {post.images && post.images.length
              ? <JournalPhotos images={post.images} stacked={stacked} />
              : <JournalSketch palette={post.palette} seed={idx} label={`STUDY · ${post.pageNumber}`} />}
          </div>

          {/* side note — inline above the photos when they fill the page */}
          {stacked ? null : (
            <div className="journal-side" style={{ left: 80, top: 'auto', bottom: 90 }}>
              "{post.side}"
            </div>
          )}

          {/* doodle */}
          <svg style={{ position: 'absolute', right: 40, top: 40, opacity: .5 }} width="70" height="70" viewBox="0 0 70 70">
            <path d="M 10 35 Q 35 5 60 35 Q 35 65 10 35 Z" stroke="#1f1b15" strokeWidth="1" fill="none" />
            <circle cx="35" cy="35" r="3" fill="#1f1b15" />
          </svg>

          <div className="journal-pagenum journal-pagenum--left">Entry {String(idx + 1).padStart(2, '0')} of {String(BLOG_POSTS.length).padStart(2, '0')}</div>
        </div>

        {/* RIGHT page — text */}
        <div className="journal-page journal-page--right">
          <div className="journal-meta">
            <span>{post.category}</span>
            <span>{post.date}</span>
          </div>
          <h2 className="journal-title">{post.title}</h2>
          <p className="journal-excerpt">{post.excerpt}</p>
          {Array.isArray(post.body)
            ? post.body.map((para, i) => (
                <p key={i} className={"journal-body" + (post.body.length > 2 ? " journal-body--compact" : "")}>{para}</p>
              ))
            : <p className="journal-body">{post.body}</p>}

          {/* margin note — only on shorter entries, so it never sits over the text */}
          {Array.isArray(post.body) && post.body.length > 2 ? null : (
            <div className="journal-side" style={{ right: 30, top: 240, transform: 'rotate(4deg)', fontSize: 18 }}>
              ※ keep going
            </div>
          )}

          <div className="journal-tags">
            {post.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
          </div>

          <div className="journal-pagenum journal-pagenum--right">Page {String(idx + 1).padStart(2, '0')} of {String(BLOG_POSTS.length).padStart(2, '0')}</div>
        </div>
      </div>

      {/* Page nav */}
      <div className="journal-nav" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <button className="journal-nav__btn" disabled={idx === 0} onClick={() => { setPaused(true); go(idx - 1); }}>
          <ChevronIcon dir="left" /> &nbsp;Previous
        </button>
        <div className="journal-nav__dots">
          {BLOG_POSTS.map((_, i) => (
            <button key={i} className={"journal-nav__dot" + (i === idx ? " journal-nav__dot--active" : "")} onClick={() => { if (idx !== i) { setPaused(true); go(i); } }} aria-label={`Go to entry ${i + 1}`} />
          ))}
        </div>
        <button className="journal-nav__btn" disabled={idx === BLOG_POSTS.length - 1} onClick={() => { setPaused(true); go(idx + 1); }}>
          Next&nbsp; <ChevronIcon dir="right" />
        </button>
      </div>

      <div className="journal-autoplay" style={{ marginTop: 14, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--pencil)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: (paused || !autoplay) ? 'var(--pencil)' : 'var(--rust)', boxShadow: (paused || !autoplay) ? 'none' : '0 0 0 4px rgba(161,77,42,0.15)' }} />
        {!autoplay ? 'Autoplay off' : paused ? 'Autoplay paused' : `Auto-flipping every ${tweaks?.blogIntervalSec ?? 5}s`}
      </div>
    </div>
  );
}

Object.assign(window, { BlogPage });
