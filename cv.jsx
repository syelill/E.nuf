// === CV — Global CV / World Archive ===
// Sections:
//   1. Header — eyebrow + "Global CV" title + bio + download button
//   2. Map  — flat hand-drawn field map + field notes side card
//   3. Selected Exhibitions Timeline — vertical, grouped by year
//   4. Archive — Print Press · Online Press · Commissions · Awards (accordion)

// Simplified hand-drawn continent silhouettes (viewBox 1000x500).
const CONTINENT_PATHS = [
// North America
"M 80 95 L 150 72 L 220 70 L 285 92 L 308 122 L 302 162 L 282 198 L 256 230 L 230 262 L 210 285 L 192 290 L 174 274 L 158 244 L 138 218 L 116 198 L 96 174 L 84 142 Z",
// Greenland
"M 348 58 L 388 54 L 402 78 L 390 105 L 360 102 L 346 82 Z",
// Central America
"M 200 286 L 230 292 L 258 318 L 244 338 L 218 326 L 202 308 Z",
// South America
"M 248 332 L 290 322 L 314 358 L 322 402 L 308 442 L 282 462 L 254 458 L 240 434 L 234 392 L 240 358 Z",
// Europe mainland
"M 470 132 L 502 120 L 540 120 L 568 130 L 580 152 L 562 178 L 532 192 L 502 198 L 480 188 L 466 168 L 460 148 Z",
// British Isles
"M 440 138 L 452 132 L 462 148 L 458 166 L 444 168 L 436 154 Z",
// Africa
"M 472 205 L 540 200 L 580 220 L 596 254 L 588 298 L 558 344 L 532 372 L 502 378 L 482 362 L 472 322 L 466 280 L 464 240 Z",
// Madagascar
"M 608 322 L 618 322 L 624 348 L 614 365 L 606 350 Z",
// Asia mainland
"M 568 130 L 622 110 L 700 102 L 780 108 L 840 124 L 880 148 L 888 178 L 868 202 L 832 216 L 790 222 L 745 228 L 705 228 L 670 226 L 640 220 L 612 206 L 588 188 L 572 164 Z",
// India peninsula
"M 670 226 L 712 228 L 720 268 L 702 296 L 682 290 L 672 262 Z",
// Arabian peninsula
"M 582 222 L 616 214 L 640 234 L 638 268 L 616 280 L 590 268 L 580 246 Z",
// SE Asia
"M 745 232 L 778 238 L 802 260 L 814 288 L 800 308 L 776 312 L 760 296 L 750 270 Z",
// Australia
"M 815 338 L 875 332 L 908 350 L 912 380 L 880 396 L 838 392 L 815 372 Z",
// Japan
"M 858 172 L 870 164 L 880 188 L 870 210 L 860 205 Z",
// New Zealand
"M 922 396 L 935 392 L 940 412 L 928 418 L 920 408 Z"];


function labelOffset(anchor) {
  switch (anchor) {
    case "left":return { dx: -10, dy: 4, anchor: "end" };
    case "right":return { dx: 12, dy: 4, anchor: "start" };
    case "below":return { dx: 0, dy: 22, anchor: "middle" };
    case "above":return { dx: 0, dy: -10, anchor: "middle" };
    default:return { dx: 12, dy: 4, anchor: "start" };
  }
}

function WorldMap({ countries, activeId, hoverId, onSelect, onHover }) {
  return (
    <svg viewBox="0 0 1000 500" className="map-svg" preserveAspectRatio="xMidYMid meet">
      <defs>
        <pattern id="map-fill" patternUnits="userSpaceOnUse" width="5" height="5" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="rgba(31,27,21,0.10)" strokeWidth="0.5" />
        </pattern>
        <pattern id="map-dots" patternUnits="userSpaceOnUse" width="14" height="14">
          <circle cx="1" cy="1" r="0.7" fill="rgba(60,45,20,0.16)" />
        </pattern>
        <filter id="map-rough">
          <feTurbulence baseFrequency="0.022" numOctaves="2" seed="4" />
          <feDisplacementMap in="SourceGraphic" scale="0.9" />
        </filter>
      </defs>

      <rect x="20" y="20" width="960" height="460" fill="url(#map-dots)" opacity="0.55" />

      <g opacity="0.22" stroke="#1f1b15" strokeDasharray="1.5 3.5" strokeWidth="0.4" fill="none">
        <line x1="20" y1="180" x2="980" y2="180" />
        <line x1="20" y1="250" x2="980" y2="250" />
        <line x1="20" y1="330" x2="980" y2="330" />
        <line x1="240" y1="20" x2="240" y2="480" />
        <line x1="500" y1="20" x2="500" y2="480" />
        <line x1="760" y1="20" x2="760" y2="480" />
      </g>

      <text x="28" y="247" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6a6052" letterSpacing="2">EQUATOR</text>
      <text x="28" y="177" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6a6052" letterSpacing="2">+30°</text>
      <text x="28" y="327" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6a6052" letterSpacing="2">−30°</text>

      <g filter="url(#map-rough)">
        {CONTINENT_PATHS.map((d, i) =>
        <path key={i} d={d} fill="url(#map-fill)" stroke="#1f1b15" strokeWidth="0.9" strokeLinejoin="round" />
        )}
      </g>

      {/* compass rose */}
      <g transform="translate(932, 64)">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#1f1b15" strokeWidth="0.7" />
        <circle cx="0" cy="0" r="9" fill="none" stroke="#1f1b15" strokeWidth="0.4" strokeDasharray="1 2" />
        <path d="M 0 -16 L -2.5 -2 L 2.5 -2 Z" fill="#1f1b15" />
        <path d="M 0 16 L -2 2 L 2 2 Z" fill="none" stroke="#1f1b15" strokeWidth="0.6" />
        <path d="M -16 0 L -2 -2 L -2 2 Z M 16 0 L 2 -2 L 2 2 Z" fill="none" stroke="#1f1b15" strokeWidth="0.5" />
        <text y="-19" fontFamily="JetBrains Mono, monospace" fontSize="7" textAnchor="middle" fill="#1f1b15" letterSpacing="2">N</text>
      </g>

      {/* corner crop marks */}
      <g stroke="#1f1b15" strokeWidth="0.6" fill="none" opacity="0.55">
        <path d="M 24 24 L 44 24 M 24 24 L 24 44" />
        <path d="M 976 24 L 956 24 M 976 24 L 976 44" />
        <path d="M 24 476 L 44 476 M 24 476 L 24 456" />
        <path d="M 976 476 L 956 476 M 976 476 L 976 456" />
      </g>

      <g transform="translate(34, 460)" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6a6052">
        <line x1="0" y1="0" x2="60" y2="0" stroke="#1f1b15" strokeWidth="0.7" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="#1f1b15" strokeWidth="0.7" />
        <line x1="30" y1="-2" x2="30" y2="2" stroke="#1f1b15" strokeWidth="0.5" />
        <line x1="60" y1="-3" x2="60" y2="3" stroke="#1f1b15" strokeWidth="0.7" />
        <text x="0" y="12" letterSpacing="1.5">0    3000    6000 KM</text>
      </g>

      <text x="966" y="468" textAnchor="end" fontFamily="JetBrains Mono, monospace" fontSize="7" fill="#6a6052" letterSpacing="2">
        FIVE COUNTRIES · WORLD ARCHIVE
      </text>

      {/* country pins */}
      {countries.map((c) => {
        const active = activeId === c.id;
        const hovered = hoverId === c.id;
        const { dx, dy, anchor } = labelOffset(c.labelAnchor);
        const cx = c.coords.x,cy = c.coords.y;
        return (
          <g
            key={c.id}
            className={"pin-grp" + (active ? " is-active" : "") + (hovered ? " is-hover" : "")}
            onClick={() => onSelect(c.id)}
            onMouseEnter={() => onHover(c.id)}
            onMouseLeave={() => onHover(null)}
            style={{ cursor: "pointer" }}>
            
            {active &&
            <>
                <circle cx={cx} cy={cy} r="14" fill="none" stroke="var(--accent, #6e6a3a)" strokeWidth="1" opacity="0.5">
                  <animate attributeName="r" from="9" to="22" dur="1.8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.55" to="0" dur="1.8s" repeatCount="indefinite" />
                </circle>
                <circle cx={cx} cy={cy} r="10" fill="none" stroke="var(--accent, #6e6a3a)" strokeWidth="1.2" />
              </>
            }

            <line
              x1={cx} y1={cy}
              x2={cx + dx * 0.55} y2={cy + dy * 0.55}
              stroke="#1f1b15" strokeWidth="0.5" opacity="0.55" />
            

            <ellipse cx={cx + 0.8} cy={cy + 1.6} rx="4" ry="1.3" fill="#1f1b15" opacity="0.22" />
            <circle
              cx={cx} cy={cy}
              r={active ? 5.4 : hovered ? 5 : 4}
              fill={active ? "var(--accent, #6e6a3a)" : "#b58a3a"}
              stroke="#1f1b15" strokeWidth="1" />
            
            <circle cx={cx - 1.1} cy={cy - 1.1} r="0.9" fill="#fff" opacity="0.65" />

            <text
              x={cx + dx} y={cy + dy}
              textAnchor={anchor}
              className={"pin-label" + (active ? " is-active" : "")}>
              
              {c.country}
            </text>

            {active &&
            <path
              d={`M ${cx + dx - (anchor === "end" ? c.country.length * 5.2 : 0)} ${cy + dy + 3}
                    q ${c.country.length * 5.2 / 2} 2.6 ${c.country.length * 5.2} 0`}
              stroke="var(--accent, #6e6a3a)" strokeWidth="1" fill="none" />

            }

            {hovered && !active &&
            <g transform={`translate(${cx + (c.labelAnchor === 'left' ? -14 : 14)}, ${cy - 16})`}>
                <rect
                x={c.labelAnchor === 'left' ? -160 : 0}
                y="-13" width="160" height="18" rx="2"
                fill="#1f1b15" opacity="0.92" />
              
                <text
                x={c.labelAnchor === 'left' ? -80 : 80} y="-1"
                textAnchor="middle"
                fontFamily="var(--hand)" fontSize="13" fill="#f4ecdc">
                
                  open {c.country.toLowerCase()} archive
                </text>
              </g>
            }

            {/* 48×48 invisible hit target */}
            <rect x={cx - 24} y={cy - 24} width="48" height="48" fill="transparent" />
            <rect
              x={cx + dx - (anchor === "end" ? c.country.length * 7 : anchor === "middle" ? c.country.length * 3.5 : 0)}
              y={cy + dy - 14}
              width={c.country.length * 7.2} height="20"
              fill="transparent" />
            
          </g>);

      })}
    </svg>);

}

/* ---------- Field notes side card ---------- */

function FieldNotesCard({ onTry }) {
  return (
    <div className="fn-card">
      <div className="fn-card__tab">FIELD NOTES</div>
      <div className="fn-card__eyebrow">how to read this map</div>
      <h3 className="fn-card__title">Tap a pin.</h3>
      <p className="fn-card__body">
        Each pin opens a location archive — exhibitions, residencies, and projects connected to each place. The map is not a destination, only a trail.
      </p>
      <button className="fn-card__nudge" onClick={onTry}>
        <span>← try Singapore first</span>
      </button>
      <div className="fn-card__legend">
        <span><i className="lg-dot" /> archive pin</span>
        <span><i className="lg-dot lg-dot--active" /> selected</span>
        <span><i className="lg-line" /> latitude</span>
      </div>
    </div>);

}

function CountryPreviewCard({ country, onClear, relatedCount }) {
  return (
    <div className="fn-card fn-card--preview" key={country.id}>
      <div className="fn-card__tab fn-card__tab--accent">SELECTED · {country.activeYear}</div>
      <button className="fn-card__clear" onClick={onClear} aria-label="clear selection">×</button>
      <div className="fn-card__eyebrow">{country.type}</div>
      <h3 className="fn-card__title">{country.country}</h3>
      <p className="fn-card__body">{country.summary}</p>
      <div className="fn-card__legend" style={{ marginTop: 14 }}>
        {country.tags.slice(0, 4).map((t) =>
        <span key={t} className="tag-pill">{t}</span>
        )}
      </div>
      {relatedCount > 0 &&
      <a href="#cv-timeline" className="archive-open-btn" style={{ marginTop: 22 }}>
          <span>{relatedCount} related entr{relatedCount === 1 ? 'y' : 'ies'} below</span>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <path d="M2 6h13M11 2l4 4-4 4" />
          </svg>
        </a>
      }
    </div>);

}

/* ---------- Selected Exhibitions Timeline ---------- */

function ExhibitionsTimeline({ groups, activeCountry }) {
  // entry matches selected country if any of country.related substrings is in the entry text (case-insensitive)
  const matches = (entry) => {
    if (!activeCountry) return false;
    const t = entry.toLowerCase();
    return (activeCountry.related || []).some((k) => t.includes(k.toLowerCase()));
  };

  return (
    <section id="cv-timeline" className="cv-section cv-timeline">
      <header className="cv-section__head">
        <span className="cv-section__eyebrow">Chronology</span>
        <h2 className="cv-section__title">Selected Exhibitions</h2>
        <p className="cv-section__sub">
          A trail of group and solo showings — grouped by year, oldest at the bottom.
          {activeCountry &&
          <> Entries linked to <b style={{ color: 'var(--ink)' }}>{activeCountry.country}</b> are highlighted.</>
          }
        </p>
      </header>

      <ol className="cv-tl">
        {groups.map((g) =>
        <li key={g.year} className="cv-tl__year">
            <div className="cv-tl__year-mark">
              <span className="cv-tl__dot" aria-hidden="true" />
              <span className="cv-tl__year-num">{g.year}</span>
            </div>
            <ul className="cv-tl__entries">
              {g.entries.map((e, i) =>
            <li
              key={i}
              className={"cv-tl__entry" + (matches(e) ? " is-related" : "")}>
              
                  <span className="cv-tl__bullet" aria-hidden="true">·</span>
                  <span className="cv-tl__text">{e}</span>
                </li>
            )}
            </ul>
          </li>
        )}
      </ol>
    </section>);

}

/* ---------- Archive accordion sections ---------- */

function ArchiveSection({ id, title, count, defaultOpen, children }) {
  const [open, setOpen] = React.useState(!!defaultOpen);
  return (
    <section className={"cv-arc" + (open ? " is-open" : "")}>
      <button
        className="cv-arc__head"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`arc-${id}`}>
        
        <span className="cv-arc__title">{title}</span>
        <span className="cv-arc__count">{String(count).padStart(2, '0')}</span>
        <span className="cv-arc__chev" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      <div id={`arc-${id}`} className="cv-arc__body" hidden={!open}>
        {children}
      </div>
    </section>);

}

function FlatList({ items }) {
  return (
    <ul className="cv-list">
      {items.map((s, i) => <li key={i}>{s}</li>)}
    </ul>);

}

function YearedList({ groups }) {
  return (
    <div className="cv-yeared">
      {groups.map((g) =>
      <div key={g.year} className="cv-yeared__group">
          <div className="cv-yeared__year">{g.year}</div>
          <ul>
            {g.entries.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}
    </div>);

}

/* ---------- Page ---------- */

function CVPage() {
  const [activeId, setActiveId] = React.useState(null);
  const [hoverId, setHoverId] = React.useState(null);

  const active = COUNTRIES.find((c) => c.id === activeId) || null;

  // count of timeline entries that match the selected country
  const relatedCount = React.useMemo(() => {
    if (!active) return 0;
    const keys = (active.related || []).map((k) => k.toLowerCase());
    return CV_TIMELINE.reduce((acc, g) =>
    acc + g.entries.filter((e) => {
      const t = e.toLowerCase();
      return keys.some((k) => t.includes(k));
    }).length, 0);
  }, [active]);

  return (
    <div className="page-wrap cv-page">
      {/* === Header === */}
      <header className="cv-head cv-head--split">
        <div className="cv-head__col">
          <div className="cv-head__top">
            <span className="cv-head__rule" />
            <span className="cv-head__eyebrow">ABOUT EUNICE</span>
          </div>
          <h1 className="cv-head__title" style={{ width: "723px", fontSize: "141px", padding: "0px", margin: "0px" }}>
            Biography<span style={{ color: 'var(--gold)' }}>.</span>
          </h1>

          <div className="cv-head__bio">
            {CV_BIO.paragraphs.map((p, i) =>
            <p key={i} style={{ margin: "5px 0px 18px" }}>{p}</p>
            )}
          </div>

          <div className="cv-head__actions">
            <a
              href={CV_BIO.cvFile}
              download
              className="cv-btn cv-btn--primary">
              <DownloadIcon />
              <span>Download CV</span>
            </a>
            <a href="#cv-timeline" className="cv-btn cv-btn--ghost">
              <span>View Timeline</span>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                <path d="M1 5h11M8 1l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right column — artist portrait card */}
        <aside className="cv-portrait" aria-label="Eunice Hannah Lim portrait">
          <div className="cv-portrait__tape cv-portrait__tape--l" aria-hidden="true" />
          <div className="cv-portrait__tape cv-portrait__tape--r" aria-hidden="true" />
          <div className="cv-portrait__frame">
            <img
              src="assets/EuniceImage.png"
              alt="Eunice Hannah Lim, holding a paintbrush"
              draggable={false}
              loading="lazy"
              className="cv-portrait__img" style={{ objectFit: "cover" }} />
            
          </div>
          <div className="cv-portrait__caption">
            <span className="cv-portrait__caption-title">Eunice Hannah Lim</span>
            <span className="cv-portrait__caption-sub">Artist Archive</span>
          </div>
        </aside>
      </header>

      {/* === Map === */}
      <div className="cv-layout">
        <div className="map-wrap">
          <div className="map-wrap__tab">WORLD ARCHIVE · FIELD MAP</div>
          <div className="map-wrap__coord">{COUNTRIES.length} sites</div>
          <WorldMap
            countries={COUNTRIES}
            activeId={activeId}
            hoverId={hoverId}
            onSelect={(id) => setActiveId(id)}
            onHover={setHoverId} />
          
          <div className="map-wrap__caption">
            <span>FIG. 01 · field locations, plotted from studio notebooks</span>
            <span>scale: indicative · not to projection</span>
          </div>
        </div>

        <div className="cv-side">
          {active ?
          <CountryPreviewCard
            country={active}
            onClear={() => setActiveId(null)}
            relatedCount={relatedCount} /> :


          <FieldNotesCard onTry={() => setActiveId('singapore')} />
          }

          <div className="loc-list">
            <div className="loc-list__head">all locations</div>
            <ul>
              {COUNTRIES.map((c) =>
              <li key={c.id}>
                  <button
                  className={"loc-list__btn" + (c.id === activeId ? " is-active" : "")}
                  onClick={() => setActiveId(c.id)}>
                  
                    <span className="loc-list__dot" />
                    <span className="loc-list__name">{c.country}</span>
                    <span className="loc-list__year">{c.activeYear}</span>
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* === Selected Exhibitions Timeline === */}
      <ExhibitionsTimeline groups={CV_TIMELINE} activeCountry={active} />

      {/* === Archive sections === */}
      <section className="cv-section cv-archives">
        <header className="cv-section__head">
          <span className="cv-section__eyebrow">Career Archive</span>
          <h2 className="cv-section__title">Press · Commissions · Awards</h2>
          <p className="cv-section__sub">
            Filed entries from across the practice. Tap a folder to expand.
          </p>
        </header>

        <div className="cv-arc-stack">
          <ArchiveSection
            id="print"
            title="Print Press & Publications"
            count={CV_PRESS_PRINT.length}
            defaultOpen>
            
            <FlatList items={CV_PRESS_PRINT} />
          </ArchiveSection>

          <ArchiveSection
            id="online"
            title="Online Press & Media"
            count={CV_PRESS_ONLINE.length}>
            
            <FlatList items={CV_PRESS_ONLINE} />
          </ArchiveSection>

          <ArchiveSection
            id="commissions"
            title="Commissioned By"
            count={CV_COMMISSIONS.length}>
            
            <ul className="cv-list cv-list--cols">
              {CV_COMMISSIONS.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </ArchiveSection>

          <ArchiveSection
            id="awards"
            title="Awards"
            count={CV_AWARDS.reduce((a, g) => a + g.entries.length, 0)}>
            
            <YearedList groups={CV_AWARDS} />
          </ArchiveSection>
        </div>
      </section>

      <div className="cv-foot">— the map is not the territory, only a trail of where the work has lived —</div>
    </div>);

}

Object.assign(window, { CVPage });