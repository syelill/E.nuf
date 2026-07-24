// === Works — magazine / visual-archive layout ===

const MEDIUM_FILTERS = [
  "All",
  "Outdoor Mural",
  "Oil on Canvas",
  "Mixed Media on Paper",
  "Acrylic & Digital Print",
  "Watercolour & Gouache",
  "Illustration & Collage",
  "Painting",
  "Mixed Media",
  "Digital & Traditional",
];

// Matches a work against the active filter. Checks both `category` and `tags`
// so an artwork tagged "Outdoor Mural" surfaces under that filter even when
// its category field is still a placeholder.
function worksMatchFilter(a, filter) {
  if (filter === 'All') return true;
  if (a.category === filter) return true;
  if (Array.isArray(a.tags) && a.tags.includes(filter)) return true;
  return false;
}

function WorksPage({ onOpenArtwork }) {
  const [filter, setFilter] = React.useState('All');
  const [view, setView] = React.useState('magazine'); // 'magazine' | 'grid'

  const visible = ARTWORKS.filter((a) => worksMatchFilter(a, filter));

  return (
    <div className="page-wrap works-archive">
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <span style={{ width: 28, height: 1, background: 'var(--gold)' }} />
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Visual Archive · Issue 08
          </span>
        </div>
        <h1 style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 900,
          fontSize: 'clamp(70px, 11vw, 168px)', lineHeight: 0.88,
          letterSpacing: '-0.035em', margin: 0, color: 'var(--ink)'
        }}>
          All Works<span style={{ color: 'var(--gold)' }}>.</span>
        </h1>
        <div style={{
          marginTop: 14, fontFamily: 'var(--hand)', fontSize: 26,
          color: 'var(--ink-soft)', maxWidth: 560, lineHeight: 1.25
        }}>
          a catalogue of pieces from the studio — slowly assembled, periodically updated,
          best read on a quiet morning.
        </div>
      </div>

      {/* Filter strip + view toggle */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 18, flexWrap: 'wrap', marginBottom: 40,
        paddingBottom: 22, borderBottom: '1px dashed rgba(31,27,21,0.28)'
      }}>
        <div className="filter-pills" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, flex: '1 1 auto', minWidth: 0 }}>
          {MEDIUM_FILTERS.map(f => {
            const active = filter === f;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="filter-pill"
                style={{
                  fontFamily: 'var(--mono)', fontSize: 11,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  padding: '9px 14px', borderRadius: 999,
                  border: '1px solid ' + (active ? 'var(--ink)' : 'rgba(31,27,21,0.35)'),
                  background: active ? 'var(--gold)' : 'var(--paper)',
                  color: active ? 'var(--ink)' : 'var(--ink-soft)',
                  boxShadow: active ? '0 4px 0 var(--ink)' : 'none',
                  cursor: 'pointer',
                  transition: 'transform .15s ease, box-shadow .15s ease, background .15s ease',
                  transform: active ? 'translateY(-2px)' : 'translateY(0)',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                {f}
              </button>
            );
          })}
        </div>

        <div style={{
          display: 'inline-flex', border: '1px solid var(--ink)',
          borderRadius: 999, padding: 4, background: 'var(--paper)',
          flexShrink: 0
        }}>
          {['magazine', 'grid'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em',
                textTransform: 'uppercase',
                padding: '8px 16px', borderRadius: 999,
                border: 'none',
                background: view === v ? 'var(--ink)' : 'transparent',
                color: view === v ? 'var(--paper)' : 'var(--ink-soft)',
                cursor: 'pointer',
                transition: 'background .2s ease'
              }}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.25em',
        textTransform: 'uppercase', color: 'var(--pencil)', marginBottom: 24
      }}>
        <span>Showing {String(visible.length).padStart(2, '0')} of {String(ARTWORKS.length).padStart(2, '0')}</span>
        <span>{filter === 'All' ? '— complete archive —' : '— filed under ' + filter + ' —'}</span>
      </div>

      {view === 'magazine'
        ? <MagazineView works={visible} onOpenArtwork={onOpenArtwork} />
        : <GridView works={visible} onOpenArtwork={onOpenArtwork} />
      }

      {/* Footer */}
      <div style={{
        marginTop: 80, paddingTop: 40,
        borderTop: '1px dashed rgba(31,27,21,0.28)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        flexWrap: 'wrap', gap: 18
      }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--pencil)' }}>
          E.NUF · VISUAL ARCHIVE · {new Date().getFullYear()}
        </div>
        <div style={{ fontFamily: 'var(--hand)', fontSize: 22, color: 'var(--ink-soft)' }}>
          — end of issue · turn the page —
        </div>
      </div>
    </div>
  );
}

// === Magazine view: large alternating feature rows ===
function MagazineView({ works, onOpenArtwork }) {
  if (works.length === 0) return <EmptyState />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      {works.map((a, i) => (
        <FeatureRow
          key={a.id}
          work={a}
          number={i + 1}
          reversed={i % 2 === 1}
          onClick={() => onOpenArtwork(a)}
        />
      ))}
    </div>
  );
}

function FeatureRow({ work, number, reversed, onClick }) {
  const [hover, setHover] = React.useState(false);
  const palette = ARTWORK_PALETTES[work.palette];

  const accent = work.accent || '#b58a3a';

  return (
    <article
      className="feature-row"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: reversed ? '1fr 1.05fr' : '1.05fr 1fr',
        gap: 0,
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow-card)',
        cursor: 'pointer',
        minHeight: 420,
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform .35s cubic-bezier(.2,.7,.3,1), box-shadow .35s ease',
        position: 'relative',
      }}
    >
      {/* tape detail */}
      <div className="tape feature-row__tape" style={{ top: -10, left: '50%', transform: 'translateX(-50%) rotate(-2deg)', zIndex: 4 }} />

      {/* Image side */}
      <div style={{
        gridColumn: reversed ? 2 : 1,
        gridRow: 1,
        position: 'relative',
        background: work.image ? '#efe7d2' : `linear-gradient(135deg, ${accent}22, ${accent}66)`,
        borderRight: reversed ? 'none' : '1px dashed rgba(31,27,21,0.25)',
        borderLeft:  reversed ? '1px dashed rgba(31,27,21,0.25)' : 'none',
        overflow: 'hidden',
        minHeight: 420
      }}>
        <div style={{
          position: 'absolute', inset: 24,
          borderRadius: 14,
          overflow: 'hidden',
          border: '1px solid rgba(31,27,21,0.5)',
          boxShadow: '0 12px 28px -16px rgba(60,45,20,0.55)',
          transform: hover ? 'scale(1.02)' : 'scale(1)',
          transition: 'transform .5s cubic-bezier(.2,.7,.3,1)',
          background: '#efe7d2'
        }}>
          {work.image ? (
            <img
              src={work.image}
              alt={work.alt || work.title}
              draggable={false}
              loading="lazy"
              style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover', objectPosition: 'center' }}
            />
          ) : (
            <>
              <ArtPlaceholder palette={palette} seed={work.palette + 60 + number} label={`${work.location.toUpperCase()} · ${work.year}`} />
              {/* title overlay (only for placeholder art) */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'grid', placeItems: 'center',
                padding: 40,
                background: 'linear-gradient(180deg, rgba(31,27,21,0) 30%, rgba(31,27,21,0.45) 100%)'
              }}>
                <div style={{
                  fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 900,
                  fontSize: 'clamp(28px, 3.4vw, 52px)', lineHeight: 0.95,
                  letterSpacing: '-0.02em', color: '#fbf6e8',
                  textShadow: '0 2px 16px rgba(31,27,21,0.4)',
                  textAlign: 'center', textWrap: 'pretty', maxWidth: '90%'
                }}>
                  {work.title}
                </div>
              </div>
            </>
          )}
        </div>

        {/* plate stamp */}
        <div style={{
          position: 'absolute', bottom: 18, left: 24,
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(31,27,21,0.6)',
          background: 'rgba(244,236,220,0.85)', padding: '4px 10px',
          border: '1px solid rgba(31,27,21,0.35)'
        }}>
          Plate · {String(number).padStart(2, '0')}
        </div>
      </div>

      {/* Details side */}
      <div style={{
        gridColumn: reversed ? 1 : 2,
        gridRow: 1,
        padding: 'clamp(28px, 4vw, 56px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 24,
        position: 'relative'
      }}>
        {/* Top meta */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22,
            fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.25em',
            textTransform: 'uppercase', color: 'var(--pencil)'
          }}>
            <span>No. {String(number).padStart(2, '0')}</span>
            <span style={{ flex: 1, height: 1, background: 'rgba(31,27,21,0.25)' }} />
            <span style={{ color: accent, fontWeight: 600 }}>{work.year} · {work.location}</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 900,
            fontSize: 'clamp(32px, 3.4vw, 54px)', lineHeight: 0.98,
            letterSpacing: '-0.025em', margin: '0 0 18px', color: 'var(--ink)',
            textWrap: 'pretty'
          }}>
            {work.title}
          </h2>

          <div style={{
            display: 'inline-block', padding: '4px 10px',
            border: '1px solid rgba(31,27,21,0.35)',
            fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'var(--ink-soft)',
            marginBottom: 22
          }}>
            {work.medium}
          </div>

          <p style={{
            fontFamily: 'var(--serif)', fontSize: 17, lineHeight: 1.6,
            color: 'var(--ink-soft)', margin: 0, textWrap: 'pretty',
            maxWidth: 540,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
            overflow: 'hidden'
          }}>
            {work.preview || work.description}
          </p>
        </div>

        {/* Bottom: tags + view link */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 14, flexWrap: 'wrap',
          paddingTop: 22, borderTop: '1px dashed rgba(31,27,21,0.25)'
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--pencil)', marginRight: 4 }}>Tags</span>
            {work.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
          </div>
          <span style={{
            fontFamily: 'var(--hand)', fontSize: 22, color: accent,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            transform: hover ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform .25s ease'
          }}>
            open archive sheet →
          </span>
        </div>

        {/* corner tab */}
        <div style={{
          position: 'absolute', top: 24, right: 24,
          width: 36, height: 36, borderRadius: '50%',
          border: '1px solid var(--ink)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em',
          color: 'var(--ink)',
          background: 'var(--paper)'
        }}>
          ↗
        </div>
      </div>
    </article>
  );
}

// === Grid view: secondary compact layout ===
function GridView({ works, onOpenArtwork }) {
  if (works.length === 0) return <EmptyState />;
  return (
    <div className="works-grid">
      {works.map((a, i) => (
        <GridCard key={a.id} work={a} number={i + 1} onClick={() => onOpenArtwork(a)} />
      ))}
    </div>
  );
}

function GridCard({ work, number, onClick }) {
  const [hover, setHover] = React.useState(false);
  const palette = ARTWORK_PALETTES[work.palette];
  const accent = work.accent || '#b58a3a';
  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--paper)',
        border: '1px solid var(--ink)',
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lift)' : 'var(--shadow-card)',
        cursor: 'pointer',
        transform: hover ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform .3s ease, box-shadow .3s ease',
        display: 'flex', flexDirection: 'column'
      }}
    >
      <div style={{
        aspectRatio: '4/5',
        background: `linear-gradient(135deg, ${accent}22, ${accent}66)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 14, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(31,27,21,0.4)', background: '#efe7d2' }}>
          {work.image ? (
            <img src={work.image} alt={work.alt || work.title} draggable={false} loading="lazy" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
          ) : (
            <ArtPlaceholder palette={palette} seed={work.palette + 80 + number} label={`${work.location.toUpperCase()} · ${work.year}`} />
          )}
        </div>
        <div style={{
          position: 'absolute', top: 10, left: 10,
          fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.25em',
          padding: '3px 8px', background: 'var(--paper)', border: '1px solid var(--ink)'
        }}>
          {String(number).padStart(2, '0')}
        </div>
      </div>
      <div style={{ padding: '18px 20px 22px' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase', color: accent, marginBottom: 6 }}>
          {work.year} · {work.location}
        </div>
        <h3 style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 900, fontSize: 24, lineHeight: 1, letterSpacing: '-0.02em', margin: '0 0 10px', color: 'var(--ink)' }}>
          {work.title}
        </h3>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-soft)' }}>
          {work.medium}
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div style={{
      padding: 60, textAlign: 'center',
      border: '1px dashed rgba(31,27,21,0.3)',
      borderRadius: 16,
      background: 'rgba(31,27,21,0.02)'
    }}>
      <div style={{ fontFamily: 'var(--hand)', fontSize: 32, color: 'var(--ink-soft)' }}>
        Nothing filed under this label — yet.
      </div>
      <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.22em', color: 'var(--pencil)', marginTop: 10 }}>
        Try another medium.
      </div>
    </div>
  );
}

Object.assign(window, { WorksPage });
