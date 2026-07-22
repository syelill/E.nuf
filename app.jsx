// === Main App ===

function App() {
  const [page, setPage] = React.useState('home');
  const [showArtist, setShowArtist] = React.useState(false);
  const [openArt, setOpenArt] = React.useState(null);
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS);

  // Close modals on Esc
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setShowArtist(false);
        setOpenArt(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Apply paper tone + accent + title scale as CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--paper', t.paperTone);
    root.style.setProperty('--gold', t.accentColor);
    root.style.setProperty('--accent', t.accentColor);
    root.style.setProperty('--title-scale', t.titleScale);
  }, [t.paperTone, t.accentColor, t.titleScale]);

  return (
    <React.Fragment>
      <div data-screen-label={`page-${page}`}>
        {page === 'home' && (
          <HomeCanvas
            onOpenArtwork={(a) => setOpenArt(a)}
            onOpenArtist={() => setShowArtist(true)}
            tweaks={t}
          />
        )}
        {page === 'works' && <WorksPage onOpenArtwork={(a) => setOpenArt(a)} />}
        {page === 'cv' && <CVPage />}
        {page === 'blog' && <BlogPage tweaks={t} />}
        {page === 'contact' && <ContactPage />}
      </div>

      <BottomNav active={page} onChange={setPage} />

      {showArtist && (
        <ArtistPopup
          onClose={() => setShowArtist(false)}
          onContact={() => { setShowArtist(false); setPage('contact'); }}
          onViewWorks={() => { setShowArtist(false); setPage('works'); }}
        />
      )}
      {openArt && <ArtworkPopup artwork={openArt} onClose={() => setOpenArt(null)} />}

      <TweaksPanel title="Tweaks">
        <TweakSection label="Studio wall" />
        <TweakSlider
          label="Notes pushed from title"
          value={t.noteRepel} min={0} max={1} step={0.05}
          onChange={(v) => setTweak('noteRepel', v)}
          format={(v) => `${Math.round(v * 100)}%`}
        />
        <TweakToggle
          label="Show canvas grid"
          value={t.showGrid}
          onChange={(v) => setTweak('showGrid', v)}
        />
        <TweakSlider
          label="Title size"
          value={t.titleScale} min={0.6} max={1.4} step={0.05}
          onChange={(v) => setTweak('titleScale', v)}
          format={(v) => `${Math.round(v * 100)}%`}
        />

        <TweakSection label="Paper & ink" />
        <TweakColor
          label="Paper tone"
          value={t.paperTone}
          options={['#f4ecdc', '#f7f1e3', '#ecdfbf', '#ebe8db', '#f1e3c8']}
          onChange={(v) => setTweak('paperTone', v)}
        />
        <TweakColor
          label="Accent"
          value={t.accentColor}
          options={['#b58a3a', '#a14d2a', '#6e6a3a', '#7b5a8a', '#3e5a6b']}
          onChange={(v) => setTweak('accentColor', v)}
        />

        <TweakSection label="Sketchbook" />
        <TweakToggle
          label="Auto-flip pages"
          value={t.blogAutoplay}
          onChange={(v) => setTweak('blogAutoplay', v)}
        />
        <TweakSlider
          label="Flip every"
          value={t.blogIntervalSec} min={2} max={15} step={1} unit="s"
          onChange={(v) => setTweak('blogIntervalSec', v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
