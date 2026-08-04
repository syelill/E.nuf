// === Home — draggable canvas gallery ===

function useDraggableCanvas(initial) {
  const [transform, setTransform] = React.useState(initial);
  const stateRef = React.useRef({ ...initial, vx: 0, vy: 0, dragging: false, last: null, raf: null });

  const onPointerDown = (e) => {
    // ignore clicks on canvas items
    if (e.target.closest('[data-canvas-item]') || e.target.closest('[data-no-drag]')) return;
    // stop the browser claiming the gesture as a page scroll (mobile URL-bar shift)
    if (e.cancelable) e.preventDefault();
    stateRef.current.dragging = true;
    stateRef.current.last = { x: e.clientX, y: e.clientY, t: performance.now() };
    stateRef.current.vx = 0;stateRef.current.vy = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.currentTarget.dataset.dragging = "1";
  };
  const onPointerMove = (e) => {
    const s = stateRef.current;
    if (!s.dragging || !s.last) return;
    const dx = e.clientX - s.last.x;
    const dy = e.clientY - s.last.y;
    const now = performance.now();
    const dt = Math.max(1, now - s.last.t);
    s.vx = dx / dt * 16;
    s.vy = dy / dt * 16;
    s.x += dx;s.y += dy;
    s.last = { x: e.clientX, y: e.clientY, t: now };
    setTransform({ x: s.x, y: s.y, scale: s.scale });
  };
  const onPointerUp = (e) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    s.dragging = false;
    e.currentTarget.dataset.dragging = "";
    // inertia
    const step = () => {
      s.vx *= 0.92;s.vy *= 0.92;
      if (Math.abs(s.vx) < 0.2 && Math.abs(s.vy) < 0.2) {s.raf = null;return;}
      s.x += s.vx;s.y += s.vy;
      setTransform({ x: s.x, y: s.y, scale: s.scale });
      s.raf = requestAnimationFrame(step);
    };
    if (s.raf) cancelAnimationFrame(s.raf);
    s.raf = requestAnimationFrame(step);
  };

  // Smoothly animate to a target transform (used for recenter)
  const animateTo = (target, duration = 600) => {
    const s = stateRef.current;
    if (s.raf) cancelAnimationFrame(s.raf);
    const from = { x: s.x, y: s.y, scale: s.scale };
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const k = ease(t);
      s.x = from.x + (target.x - from.x) * k;
      s.y = from.y + (target.y - from.y) * k;
      s.scale = from.scale + ((target.scale ?? from.scale) - from.scale) * k;
      setTransform({ x: s.x, y: s.y, scale: s.scale });
      if (t < 1) s.raf = requestAnimationFrame(tick);else
      s.raf = null;
    };
    s.raf = requestAnimationFrame(tick);
  };

  const setTransformImmediate = (next) => {
    Object.assign(stateRef.current, next);
    setTransform({ x: stateRef.current.x, y: stateRef.current.y, scale: stateRef.current.scale });
  };

  return { transform, onPointerDown, onPointerMove, onPointerUp, onPointerCancel: onPointerUp, animateTo, setTransformImmediate };
}

// Draggable wrapper for canvas items
function Draggable({ item, onChange, onClick, onPickUp, zIndex, children, style, extraHeight = 0 }) {
  const ref = React.useRef(null);
  const stateRef = React.useRef({ dragging: false, moved: 0, start: null, base: null });
  const [dragging, setDragging] = React.useState(false);

  const onPointerDown = (e) => {
    e.stopPropagation();
    if (e.button !== undefined && e.button !== 0) return;
    stateRef.current.dragging = true;
    stateRef.current.moved = 0;
    stateRef.current.start = { x: e.clientX, y: e.clientY };
    stateRef.current.base = { x: item.x, y: item.y };
    setDragging(true);
    if (onPickUp) onPickUp();
    try {ref.current.setPointerCapture(e.pointerId);} catch (_) {}
  };
  const onPointerMove = (e) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    e.stopPropagation();
    const dx = e.clientX - s.start.x;
    const dy = e.clientY - s.start.y;
    s.moved = Math.max(s.moved, Math.hypot(dx, dy));
    onChange({ x: s.base.x + dx, y: s.base.y + dy });
  };
  const onPointerUp = (e) => {
    const s = stateRef.current;
    if (!s.dragging) return;
    e.stopPropagation();
    s.dragging = false;
    setDragging(false);
    // treat short movement as click
    if (s.moved < 5 && onClick) onClick();
  };

  return (
    <div
      ref={ref}
      data-canvas-item
      className="canvas-item"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        left: item.x,
        top: item.y,
        width: item.w,
        height: (item.h || 0) + extraHeight,
        transform: `rotate(${item.rotation || 0}deg) ${dragging ? 'scale(1.04)' : ''}`,
        transition: dragging ? 'none' : undefined,
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: dragging ? 999 : zIndex,
        filter: dragging ? 'drop-shadow(0 24px 30px rgba(60,45,20,0.35))' : undefined,
        ...style
      }}>
      
      {children}
    </div>);

}

// individual canvas item renderers — receive `item` already-positioned
function CardArt({ a, mode }) {
  // mode: 'frame' | 'polaroid'
  // Renders the real uploaded image with object-fit: cover (gentle crop to
  // the card frame, never stretched/squashed). Falls back to the abstract
  // ArtPlaceholder SVG if no image path is provided.
  if (a.image) {
    return (
      <img
        src={a.image}
        alt={a.alt || a.title || 'Archive image'}
        draggable={false}
        loading="lazy"
        className={mode === 'polaroid' ? 'polaroid__image' : 'frame__image'} />);

  }
  const palette = ARTWORK_PALETTES[a.palette];
  return <ArtPlaceholder palette={palette} seed={(a.palette || 0) + (mode === 'frame' ? 10 : 20)} label={a.location ? `${a.location.toUpperCase()} · ${a.year}` : undefined} />;
}

function FrameInner({ a }) {
  const hasImage = !!a.image;
  return (
    <div className={`frame ${hasImage ? 'frame--image' : ''}`} style={{ height: '100%' }}>
      <div className="frame__image-wrap" style={{ width: '100%', height: a.h - 56, overflow: 'hidden', pointerEvents: 'none' }}>
        <CardArt a={a} mode="frame" />
      </div>
      <div className="frame__label">
        <span>{a.title}</span>
        <small>{a.ref || a.year}</small>
      </div>
    </div>);

}

function PolaroidInner({ a }) {
  const hasImage = !!a.image;
  return (
    <div className={`polaroid ${hasImage ? 'polaroid--image' : ''}`} style={{ height: '100%' }}>
      <div className="polaroid__image-wrap" style={{ width: '100%', height: a.h - 56, overflow: 'hidden', pointerEvents: 'none' }}>
        <CardArt a={a} mode="polaroid" />
      </div>
      <div className="polaroid__caption">
        <span className="polaroid__caption-title">{a.title}</span>
        {a.location && a.year &&
        <small className="polaroid__caption-sub">{a.location} · {a.year}</small>
        }
      </div>
      <div className="pin" />
    </div>);

}

function StickyInner({ n }) {
  return (
    <div className="sticky" style={{ height: '100%', whiteSpace: 'pre-line', lineHeight: 1.15 }}>
      {n.text}
    </div>);

}

function PaperNoteInner({ n }) {
  return (
    <div className="paper-note" style={{ height: '100%', whiteSpace: 'pre-line', lineHeight: 1.15 }}>
      {n.text}
    </div>);

}

function ArchiveTagInner({ n }) {
  return (
    <div style={{
      fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
      textTransform: 'uppercase', textAlign: 'center',
      background: 'var(--paper)', border: '1px solid var(--ink)',
      padding: '6px 10px', boxShadow: 'var(--shadow-soft)'
    }}>
      {n.text}
    </div>);

}

// hand-drawn arrow svg between two points
function HandArrow({ x1, y1, x2, y2, label }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - 30;
  return (
    <svg style={{ position: 'absolute', left: 0, top: 0, width: 4200, height: 3200, pointerEvents: 'none' }}>
      <path d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} stroke="#1f1b15" strokeWidth="1.2" fill="none" strokeDasharray="2 3" opacity=".55" />
      <path d={`M ${x2 - 10} ${y2 - 6} L ${x2} ${y2} L ${x2 - 8} ${y2 + 8}`} stroke="#1f1b15" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity=".7" />
      {label &&
      <text x={mx} y={my - 4} fontFamily="var(--hand)" fontSize="20" fill="#3d362a" textAnchor="middle" transform={`rotate(-4 ${mx} ${my})`}>{label}</text>
      }
    </svg>);

}

// Title block anchor — used both for placement and for recentering.
const HOME_ANCHOR = { x: 1700, y: 700, w: 620, h: 220 };

// On phones the wall was authored at desktop spacing, so pull every piece
// closer to the anchor (positions only — sizes and rotations untouched) so the
// archive frames the fixed hero instead of sitting off-screen.
const MOBILE_SQUEEZE = 0.62;
// Desktop keeps the wall tight around the wordmark too — the data was authored
// at a wider spread than a laptop frame shows, so pieces drifted off-frame.
const DESKTOP_SQUEEZE = { x: 0.75, y: 0.68 };
// canvas-unit half-extents of the hero's safe zone. Phones squeeze the wall in,
// so the zone is tighter; desktop keeps the full 860px composition clear.
const MOBILE_SAFE = { w: 345, h: 230 };
const DESKTOP_SAFE = { w: 500, h: 235 };
function clearHeroZone(it, safe) {
  if (!safe) return it;
  const ax = HOME_ANCHOR.x + HOME_ANCHOR.w / 2;
  const ay = HOME_ANCHOR.y + HOME_ANCHOR.h / 2;
  const extra = it.kind === 'frame' ? 80 : it.kind === 'polaroid' ? 60 : 0;
  const iw = it.w || 200, ih = (it.h || 180) + extra;
  const dx = it.x + iw / 2 - ax, dy = it.y + ih / 2 - ay;
  const needX = safe.w + iw / 2, needY = safe.h + ih / 2;
  if (Math.abs(dx) >= needX || Math.abs(dy) >= needY) return it;
  const pushX = needX - Math.abs(dx), pushY = needY - Math.abs(dy);
  if (pushX <= pushY) return { ...it, x: Math.round(it.x + (dx < 0 ? -pushX : pushX)) };
  return { ...it, y: Math.round(it.y + (dy < 0 ? -pushY : pushY)) };
}
function squeezeToAnchor(it, k) {
  if (!k || k === 1) return it;
  const kx = typeof k === 'number' ? k : k.x;
  const ky = typeof k === 'number' ? k : k.y;
  const ax = HOME_ANCHOR.x + HOME_ANCHOR.w / 2;
  const ay = HOME_ANCHOR.y + HOME_ANCHOR.h / 2;
  return { ...it, x: Math.round(ax + (it.x - ax) * kx), y: Math.round(ay + (it.y - ay) * ky) };
}

// Push a sticky / paper-note item away from the title's center
// so it never crowds the wordmark. `amount` is 0..1.
function repelFromAnchor(it, amount) {
  if (!amount || amount <= 0) return { x: it.x, y: it.y };
  const ax = HOME_ANCHOR.x + HOME_ANCHOR.w / 2;
  const ay = HOME_ANCHOR.y + HOME_ANCHOR.h / 2;
  const cx = it.x + (it.w || 0) / 2;
  const cy = it.y + (it.h || 0) / 2;
  let dx = cx - ax;
  let dy = cy - ay;
  let dist = Math.hypot(dx, dy);
  if (dist < 1) {
    // degenerate — push toward upper-right by default
    dx = 1;dy = -0.5;dist = Math.hypot(dx, dy);
  }
  const minDist = 320 + amount * 520; // ~320 (gentle) → ~840 (far away)
  if (dist >= minDist) return { x: it.x, y: it.y };
  const k = minDist / dist;
  return {
    x: ax + dx * k - (it.w || 0) / 2,
    y: ay + dy * k - (it.h || 0) / 2
  };
}

/* Return-to-top / recenter overlay — shared by desktop canvas and mobile flow */
function ReturnHomeButton({ onClick, compact }) {
  return (
    <button
      onClick={(e) => {e.stopPropagation();onClick();}}
      onPointerDown={(e) => e.stopPropagation()}
      data-no-drag
      className="recenter-btn"
      title="Return to E.NUF"
      style={{
        position: 'absolute',
        top: compact ? 20 : 22,
        left: compact ? 20 : 22,
        zIndex: 5,
        pointerEvents: 'auto',
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        borderRadius: 999,
        padding: compact ? '8px 13px 8px 10px' : '10px 16px 10px 12px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 8 : 10,
        fontFamily: 'var(--mono)',
        fontSize: compact ? 9 : 10,
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--ink)',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-card)',
        transition: 'transform .15s ease'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px) rotate(-1deg)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) rotate(0deg)'}>

      <span style={{
        width: compact ? 18 : 22, height: compact ? 18 : 22, borderRadius: '50%',
        background: 'var(--ink)', color: 'var(--paper)',
        display: 'grid', placeItems: 'center',
        fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 900,
        fontSize: compact ? 10 : 12, letterSpacing: 0, flex: '0 0 auto'
      }}>
        E
      </span>
      Return to E.NUF
    </button>);

}

function HomeCanvas({ onOpenArtwork, onOpenArtist, tweaks }) {
  // Center viewport on the E.NUF title block on first paint.
  const computeCenter = React.useCallback(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    // Desktop scale tracks the frame so the SAME slice of wall always fits:
    // the squeeze was fitted to a 1580px-wide frame, so a fixed scale of 1 made
    // the visible wall shrink with the window and the page read as empty beige.
    const scale = w < 480 ? 0.92 : w < 768 ? 0.98 : Math.min(1, Math.max(0.62, w / 1580));
    const cx = HOME_ANCHOR.x + HOME_ANCHOR.w / 2;
    const cy = HOME_ANCHOR.y + HOME_ANCHOR.h / 2;
    return { x: w / 2 - cx * scale, y: h / 2 - cy * scale, scale };
  }, []);

  const initial = React.useMemo(() => computeCenter(), [computeCenter]);
  const { transform, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, animateTo, setTransformImmediate } = useDraggableCanvas(initial);

  const [isMobile, setIsMobile] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  // Keep the anchor centered on resize (only if user hasn't manually wandered far)
  React.useEffect(() => {
    const onResize = () => {
      setTransformImmediate(computeCenter());
      setIsMobile(window.innerWidth < 768);
    };
    // only run once on mount for clean recenter; window resize is best-effort
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [computeCenter]);

  const recenter = () => animateTo(computeCenter(), 700);

  // Lock the document while the canvas is mounted: a touch drag can then never
  // scroll the page, rubber-band, or collapse the mobile URL bar.
  React.useEffect(() => {
    const html = document.documentElement;
    html.classList.add('home-locked');
    document.body.classList.add('home-locked');
    // If the user has pinch-zoomed, panning moves the VISUAL viewport — which
    // slides any pinned element on screen no matter how it's structured. Re-anchor
    // the scene container to the visible area so the hero stays put. Offsets only,
    // no transforms, and never touched at scale 1.
    const vv = window.visualViewport;
    const pin = () => {
      const page = document.querySelector('.home-page');
      if (!page || !vv) return;
      if (vv.scale > 1.01) {
        page.style.left = vv.offsetLeft + 'px';
        page.style.top = vv.offsetTop + 'px';
        page.style.width = vv.width + 'px';
        page.style.height = vv.height + 'px';
      } else {
        page.style.left = page.style.top = page.style.width = page.style.height = '';
      }
    };
    pin();
    if (vv) {
      vv.addEventListener('resize', pin);
      vv.addEventListener('scroll', pin);
    }
    return () => {
      html.classList.remove('home-locked');
      document.body.classList.remove('home-locked');
      if (vv) {
        vv.removeEventListener('resize', pin);
        vv.removeEventListener('scroll', pin);
      }
    };
  }, []);

  // Live positions for artworks + extras, plus z-order
  const [items, setItems] = React.useState(() => {
    const phone = typeof window !== 'undefined' && window.innerWidth < 768;
    const k = phone ? MOBILE_SQUEEZE : DESKTOP_SQUEEZE;
    const safe = phone ? MOBILE_SAFE : DESKTOP_SAFE;
    const place = (it) => clearHeroZone(squeezeToAnchor(it, k), safe);
    return [
    ...ARTWORKS.filter((a) => a.x !== undefined).map((a) => place({ ...a, kind: a.type === 'polaroid' ? 'polaroid' : 'frame' })),
    ...CANVAS_EXTRAS.map((n) => place({ ...n, kind: n.type }))];
  });
  const [order, setOrder] = React.useState(() => items.map((i) => i.id));

  // When the "notes pushed from title" tweak changes, snap sticky/paper-note items
  // outward so they don't crowd the E.NUF wordmark.
  const lastRepel = React.useRef(tweaks?.noteRepel ?? 0);
  React.useEffect(() => {
    if (!tweaks) return;
    const r = tweaks.noteRepel;
    setItems((prev) => prev.map((it) => {
      if (it.kind !== 'sticky' && it.kind !== 'paper-note') return it;
      const p = repelFromAnchor(it, r);
      return { ...it, ...p };
    }));
    lastRepel.current = r;
  }, [tweaks?.noteRepel]);

  const updateItem = (id, patch) => {
    setItems((prev) => prev.map((it) => it.id === id ? { ...it, ...patch } : it));
  };

  const bringToFront = (id) => {
    setOrder((prev) => [...prev.filter((x) => x !== id), id]);
  };

  return (
    <div className="home-page">
      <div
        className="canvas-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}>

      <style>{`
        .canvas-stage[data-dragging="1"] { cursor: grabbing !important; }
      `}</style>
      <div
        className="canvas-world"
        style={{ transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})` }}>
        
        {tweaks?.showGrid !== false && <div className="canvas-grid" />}


        {/* Section markers — sit outside the title's safe zone */}
        <div style={{ position: 'absolute', left: 880, top: 1180, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--pencil)' }}>
          — WORKS · 2022—2024 —
        </div>

        {/* Items, rendered in z-order */}
        {order.map((id, idx) => {
          const it = items.find((x) => x.id === id);
          if (!it) return null;
          const common = {
            key: id,
            item: it,
            zIndex: idx + 1,
            onChange: (patch) => updateItem(id, patch),
            onPickUp: () => bringToFront(id)
          };
          if (it.kind === 'frame') return <Draggable {...common} extraHeight={80} onClick={() => onOpenArtwork(it)}><FrameInner a={it} /></Draggable>;
          if (it.kind === 'polaroid') return <Draggable {...common} extraHeight={60} onClick={() => onOpenArtwork(it)}><PolaroidInner a={it} /></Draggable>;
          if (it.kind === 'sticky') return <Draggable {...common}><StickyInner n={it} /></Draggable>;
          if (it.kind === 'paper-note') return <Draggable {...common}><PaperNoteInner n={it} /></Draggable>;
          if (it.kind === 'tag') return <Draggable {...common}><ArchiveTagInner n={it} /></Draggable>;
          return null;
        })}

        {/* E.NUF composition — pinned to the WALL at HOME_ANCHOR, so it pans and
            scales with the archive like any other piece. Internal markup unchanged.
            "Return to E.NUF" re-centres the view on this anchor. */}
        <div className="home-hero home-hero--on-wall" style={{ left: HOME_ANCHOR.x + HOME_ANCHOR.w / 2, top: HOME_ANCHOR.y + HOME_ANCHOR.h / 2 }}>
          <div className="home-hero__main" style={{ transform: `scale(${tweaks?.titleScale ?? 1})` }}>
            <h1 className="title-block__main">E.NUF</h1>
            <div className="home-about-group">
              <ArtistAvatar onClick={onOpenArtist} />
              <button className="home-about-link" onClick={onOpenArtist} data-no-drag type="button">
                <MouseClickIcon size={14} />
                <span className="hand-underline">About me</span>
              </button>
            </div>
          </div>
          <div className="drag-hint home-hero__instruction">
            <HandPointerIcon size={28} />
            <span style={{ margin: 0, padding: 0, lineHeight: 1.45 }}>drag around to explore the archive — pieces are loose, rearrange the wall</span>
          </div>
        </div>

        {/* edge of canvas indicator */}
        <div style={{
          position: 'absolute', left: 200, top: 600, transform: 'rotate(-90deg)',
          transformOrigin: 'left top',
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--warm-grey)'
        }}>
          — STUDIO WALL · 01 —
        </div>
      </div>

      {/* Stationary UI layer — holds only the Return control, which must stay
          reachable no matter how far the wall has been dragged. */}
      <div className="canvas-ui-layer">
        <ReturnHomeButton onClick={recenter} compact={isMobile} />
      </div>

      </div>
    </div>);

}

// === Artwork popup ===
// Single, reusable archive sheet that handles ANY artwork regardless of
// image orientation, title length, description length, or tag count.
// • Image column: object-fit: contain — never crops or stretches
// • Details column: scrolls independently, never pushes past the close button
// • ESC + backdrop click both close
// • Empty metadata fields (year/location/medium) are skipped, not rendered as dots
function ArtworkPopup({ artwork, onClose }) {
  // ESC to close
  React.useEffect(() => {
    if (!artwork) return;
    const onKey = (e) => {if (e.key === 'Escape') onClose();};
    document.addEventListener('keydown', onKey);
    // lock body scroll while open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [artwork, onClose]);

  if (!artwork) return null;
  const palette = ARTWORK_PALETTES[artwork.palette];
  const plateNo = String(ARTWORKS.findIndex((x) => x.id === artwork.id) + 1).padStart(2, '0');
  // Build metadata row from only the non-empty fields so we never render
  // trailing dots like "2025 · Joo Chiat ·"
  const metaParts = [artwork.year, artwork.location, artwork.medium].
  map((v) => v == null ? '' : String(v).trim()).
  filter(Boolean);

  return (
    <div className="modal-backdrop artwork-modal-backdrop" onClick={onClose}>
      <div
        className="artwork-popup"
        role="dialog"
        aria-labelledby={`art-${artwork.id}-title`}
        onClick={(e) => e.stopPropagation()}>

        <button className="artwork-popup__close" onClick={onClose} aria-label="Close">×</button>

        <div className="artwork-popup__art">
          {artwork.image ?
          <img
            src={artwork.image}
            alt={artwork.alt || artwork.title || 'Archive image'}
            className="artwork-popup__img"
            draggable={false} /> :


          <ArtPlaceholder
            palette={palette}
            seed={(artwork.palette || 0) + 30}
            label={artwork.location ? `${artwork.location.toUpperCase()} · ${artwork.year}` : undefined} />

          }
        </div>

        <div className="artwork-popup__details">
          <div className="artwork-popup__details-inner">
            <div className="artwork-popup__plate">
              Plate · {plateNo}
              {artwork.ref && <span className="artwork-popup__ref"> &nbsp;/&nbsp; {artwork.ref}</span>}
            </div>

            <h2 id={`art-${artwork.id}-title`} className="artwork-popup__title">
              {artwork.title}
            </h2>

            {metaParts.length > 0 &&
            <div className="artwork-popup__meta">
                {metaParts.map((part, i) =>
              <React.Fragment key={i}>
                    <span>{part}</span>
                    {i < metaParts.length - 1 &&
                <span className="artwork-popup__meta-sep" aria-hidden="true">·</span>
                }
                  </React.Fragment>
              )}
              </div>
            }

            {artwork.description &&
            <div className="artwork-popup__desc">
                {String(artwork.description).split(/\n\s*\n/).map((para, i) =>
              <p key={i}>{para}</p>
              )}
              </div>
            }

            {Array.isArray(artwork.tags) && artwork.tags.length > 0 &&
            <div className="artwork-popup__tags-block">
                <span className="artwork-popup__tags-label">Tags</span>
                <div className="artwork-popup__tags">
                  {artwork.tags.map((t) => <span key={t} className="tag-pill">{t}</span>)}
                </div>
              </div>
            }

            {artwork.exhibition &&
            <div className="artwork-popup__exhibition">
                <span className="artwork-popup__minor-label">Exhibition</span>
                <b>{artwork.exhibition}</b>
              </div>
            }

            {artwork.process &&
            <div className="artwork-popup__process">
                <span className="artwork-popup__minor-label">Process Note</span>
                <p>{artwork.process}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, { HomeCanvas, ArtworkPopup });