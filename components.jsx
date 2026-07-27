// === Shared icons ===

function MouseClickIcon({ size = 18 }) {
  return (
    <svg width={size} height={size + 4} viewBox="0 0 18 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1.5c-4.1 0-7.5 3.4-7.5 7.5v4c0 4.1 3.4 7.5 7.5 7.5s7.5-3.4 7.5-7.5v-4C16.5 4.9 13.1 1.5 9 1.5z" />
      <line x1="9" y1="5" x2="9" y2="9" />
    </svg>);

}

function DragIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v8m0 0l-3-3m3 3l3-3" />
      <path d="M2 13c0 4 3 8 7 8s7-4 7-8c0-2-1-3-2-3s-2 1-2 3" />
      <path d="M9 13c0-1-1-2-2-2s-2 1-2 2" />
    </svg>);

}

function HandPointerIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12V4.5a1.5 1.5 0 013 0V11" />
      <path d="M12 11V3a1.5 1.5 0 013 0v8" />
      <path d="M15 11V5a1.5 1.5 0 013 0v8" />
      <path d="M18 9.5a1.5 1.5 0 013 0v6.5c0 4-3 7.5-7 7.5s-7-3-7-7v-3l-2.5-2a1.5 1.5 0 012-2L9 13" />
    </svg>);

}

function ChevronIcon({ dir = 'right', size = 14 }) {
  const rot = dir === 'left' ? 180 : dir === 'up' ? -90 : dir === 'down' ? 90 : 0;
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M5 3l4 4-4 4" />
    </svg>);

}

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>);

}
function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7" y1="10" x2="7" y2="17" />
      <circle cx="7" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11 17v-4a2.5 2.5 0 015 0v4M11 17v-7" />
    </svg>);

}
function MailIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>);

}
function GlobeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>);

}

function DownloadIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1.5V9M3.5 6L7 9.5 10.5 6" />
      <path d="M2 11.5h10" />
    </svg>);

}

function CalendarIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.5" y="2.5" width="11" height="10" rx="1" />
      <path d="M1.5 5.5h11M4.5 1.5v2M9.5 1.5v2" />
    </svg>);

}

// === Bottom Nav (desktop/tablet pill + mobile hamburger) ===
function BottomNav({ active, onChange }) {
  const items = ["Home", "Works", "CV", "Blog", "Contact"];
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const select = (label) => { onChange(label.toLowerCase()); setOpen(false); };

  return (
    <React.Fragment>
      <nav className="bottom-nav" aria-label="Primary">
        {items.map((label, i) =>
        <React.Fragment key={label}>
            <button
            className={"bottom-nav__item" + (active === label.toLowerCase() ? " bottom-nav__item--active" : "")}
            onClick={() => onChange(label.toLowerCase())}
            aria-current={active === label.toLowerCase() ? "page" : undefined}>
            
              <span className={active === label.toLowerCase() ? "" : "hand-underline"}>{label}</span>
            </button>
            {i < items.length - 1 && <div className="bottom-nav__sep" />}
          </React.Fragment>
        )}
      </nav>

      <button
        className={"nav-burger" + (open ? " nav-burger--open" : "")}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu">
        <span></span><span></span><span></span>
      </button>

      <div
        className={"nav-mobile-backdrop" + (open ? " is-open" : "")}
        onClick={() => setOpen(false)}
        aria-hidden={!open}>
        
        <nav id="mobile-menu" className="nav-mobile-panel" aria-label="Mobile navigation" onClick={(e) => e.stopPropagation()}>
          {items.map((label) =>
          <button
            key={label}
            className={"nav-mobile-item" + (active === label.toLowerCase() ? " is-active" : "")}
            onClick={() => select(label)}
            aria-current={active === label.toLowerCase() ? "page" : undefined}>
            
              {label}
            </button>
          )}
        </nav>
      </div>
    </React.Fragment>);

}

// === Artist avatar ===
function ArtistAvatar({ onClick }) {
  return (
    <button className="avatar wiggle" onClick={onClick} onPointerDown={(e) => e.stopPropagation()} data-no-drag type="button" aria-label="About the artist" style={{ backgroundImage: "initial", backgroundPosition: "initial", backgroundSize: "initial", backgroundRepeat: "initial", backgroundAttachment: "initial", backgroundOrigin: "initial", backgroundClip: "initial", borderWidth: "0px", width: "100px", background: "rgb(179, 37, 38)" }}>
      <img
        src="assets/enuf-stamp.png"
        alt="E.NUF artist stamp"
        style={{ width: '100%', height: '100%', display: 'block', objectFit: "fill" }}
        draggable={false} />
      
    </button>);

}

// === Artist Profile Popup ===
function ArtistPopup({ onClose, onContact, onViewWorks }) {
  return (
    <div className="modal-backdrop artist-modal-backdrop" onClick={onClose}>
      <div
        className="artist-sheet"
        role="dialog"
        aria-labelledby="artist-sheet-title"
        onClick={(e) => e.stopPropagation()}>
        <button
          className="artist-sheet__close"
          onClick={onClose}
          aria-label="Close" style={{ lineHeight: "0.4", fontWeight: "700", fontSize: "42px", width: "34px", padding: "0px 7px 8px 0px" }}>
          ×
        </button>

        <div className="artist-sheet__scroll">
          <div className="artist-sheet__inner">
            <div className="artist-sheet__label">Artist Profile</div>

            <h2 id="artist-sheet-title" className="artist-sheet__title">
              {ARTIST.name}
            </h2>

            <div className="artist-sheet__avatar" aria-hidden="true">
              <img
                src="assets/enuf-stamp.png"
                alt=""
                draggable={false} />
            </div>

            <div className="artist-sheet__bio">
              {ARTIST.bio.map((p, i) =>
              <p key={i}>{p}</p>
              )}
            </div>

            <div className="artist-sheet__meta">
              {ARTIST.metaRow.map((m, i) =>
              <React.Fragment key={m}>
                  <span>{m}</span>
                  {i < ARTIST.metaRow.length - 1 && <span className="artist-sheet__meta-sep" aria-hidden="true">·</span>}
                </React.Fragment>
              )}
            </div>

            {onViewWorks &&
            <div className="artist-sheet__cta">
                <button className="artist-sheet__btn" onClick={onViewWorks}>
                  <span>View Works</span>
                  <ChevronIcon dir="right" size={12} />
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>);

}

Object.assign(window, {
  BottomNav, ArtistAvatar, ArtistPopup,
  MouseClickIcon, DragIcon, HandPointerIcon, ChevronIcon,
  InstagramIcon, LinkedInIcon, MailIcon, GlobeIcon, DownloadIcon, CalendarIcon
});