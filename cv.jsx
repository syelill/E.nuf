// === CV — Global CV / World Archive ===
// Sections:
//   1. Header — eyebrow + "Global CV" title + bio + download button
//   2. Selected Exhibitions Timeline — vertical, grouped by year
//   3. Archive — Print Press · Online Press · Commissions · Awards (accordion)

function ExhibitionsTimeline({ groups }) {
  return (
    <section id="cv-timeline" className="cv-section cv-timeline">
      <header className="cv-section__head">
        <span className="cv-section__eyebrow">Chronology</span>
        <h2 className="cv-section__title">Selected Exhibitions</h2>
        <p className="cv-section__sub">
          A trail of group and solo showings — grouped by year, oldest at the bottom.
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
            <li key={i} className="cv-tl__entry">
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
  return (
    <div className="page-wrap cv-page">
      {/* === Header === */}
      <header className="cv-head cv-head--split">
        <div className="cv-head__col">
          <div className="cv-head__top">
            <span className="cv-head__rule" />
            <span className="cv-head__eyebrow">ABOUT EUNICE</span>
          </div>
          <h1 className="cv-head__title">
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

      {/* === Selected Exhibitions Timeline === */}
      <ExhibitionsTimeline groups={CV_TIMELINE} />

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

      <div className="cv-foot">— a working archive, still being filed —</div>
    </div>);

}

Object.assign(window, { CVPage });