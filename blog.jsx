// === Blog — sketchbook journal ===

function JournalSketch({ palette, seed, label }) {
  return (
    <div className="journal-sketch">
      <ArtPlaceholder palette={ARTWORK_PALETTES[palette]} seed={seed + 50} label={label} />
      <div className="tape" style={{ top: -10, left: 30, transform: 'rotate(-3deg)' }} />
      <div className="tape" style={{ top: -10, right: 24, transform: 'rotate(4deg)', width: 50 }} />
    </div>
  );
}

function BlogPage({ tweaks }) {
  const [idx, setIdx] = React.useState(0);
  const [flipping, setFlipping] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const post = BLOG_POSTS[idx];

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
        <div className="journal-page journal-page--left">
          <div className="journal-meta">
            <span>{post.date}</span>
            <span>Entry · {post.pageNumber}</span>
          </div>
          <span className="journal-cat">{post.category}</span>

          <div style={{ marginTop: 28, marginBottom: 18 }}>
            <JournalSketch palette={post.palette} seed={idx} label={`STUDY · ${post.pageNumber}`} />
          </div>

          {/* side note */}
          <div className="journal-side" style={{ left: 80, top: 'auto', bottom: 90 }}>
            "{post.side}"
          </div>

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
          <p className="journal-body">{post.body}</p>

          {/* margin note */}
          <div className="journal-side" style={{ right: 30, top: 240, transform: 'rotate(4deg)', fontSize: 18 }}>
            ※ keep going
          </div>

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
