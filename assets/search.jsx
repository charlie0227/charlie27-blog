/* Search page with live filter */

const { useState, useMemo, useEffect, useRef } = React;

const ALL_POSTS = [
  ...SAMPLE_POSTS,
  ...POPULAR_POSTS.map((p, i) => ({
    id: 200 + i,
    title: p.title,
    excerpt: "An earlier dispatch from the archive — still one of the most-read pieces on the site.",
    cat: p.cat,
    date: "Feb 14, 2026",
    read: p.read,
    author: "Charlie",
    tone: ['cream','stone','sand','forest'][i % 4],
    imgLabel: p.cat,
  })),
];

const SUGGESTED = ['local-first', 'kyoto', 'quiet software', 'one-bag', 'trains', 'writing practice', 'cafés'];

function SearchPage() {
  const [theme, toggleTheme] = useTheme();
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const inputRef = useRef(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_POSTS.filter(p => {
      if (cat !== 'All' && p.cat !== cat) return false;
      if (!needle) return true;
      return (p.title + ' ' + p.excerpt + ' ' + p.cat).toLowerCase().includes(needle);
    });
  }, [q, cat]);

  const highlight = (text) => {
    if (!q.trim()) return text;
    const parts = text.split(new RegExp(`(${q.trim()})`, 'ig'));
    return parts.map((p, i) =>
      p.toLowerCase() === q.trim().toLowerCase()
        ? <mark key={i} style={{background:'var(--accent-soft)', color:'var(--accent)', padding:'0 2px', borderRadius:2}}>{p}</mark>
        : p
    );
  };

  return (
    <>
      <ReadingChrome />
      <SiteHeader theme={theme} onToggleTheme={toggleTheme} />

      <main className="container" style={{paddingTop:40}}>
        <div style={{maxWidth:900, margin:'0 auto 48px'}}>
          <div className="eyebrow" style={{marginBottom:12}}>Search the field notes</div>
          <div style={{
            display:'flex', alignItems:'center', gap:16,
            padding:'24px 28px',
            border:'1px solid var(--border-strong)',
            borderRadius: 8,
            background: 'var(--bg-elevated)'
          }}>
            <Icon.Search />
            <input
              ref={inputRef}
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Type anything — title, tag, half a phrase you remember…"
              style={{
                flex: 1, background: 'transparent', border: 'none', outline: 'none',
                fontFamily: 'var(--font-serif)', fontSize: 28, fontStyle: q ? 'normal' : 'italic',
                color: 'var(--text)', letterSpacing: '-0.01em'
              }}
            />
            {q && (
              <button className="icon-btn" onClick={() => setQ('')} aria-label="Clear"><Icon.Close /></button>
            )}
          </div>
          <div style={{display:'flex', gap:8, marginTop:14, flexWrap:'wrap', alignItems:'center'}}>
            <span className="eyebrow">Try</span>
            {SUGGESTED.map(s => (
              <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>
            ))}
          </div>
        </div>

        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          paddingBottom:20, borderBottom:'1px solid var(--border)', marginBottom:32,
          maxWidth:900, margin:'0 auto 32px'
        }}>
          <div className="eyebrow">
            {q ? `${results.length} results for "${q}"` : `${ALL_POSTS.length} articles in archive`}
          </div>
          <div className="chip-row">
            {['All','Tech','Travel','Gear'].map(c => (
              <button key={c} className={`chip ${cat === c ? 'is-active' : ''}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div style={{maxWidth:900, margin:'0 auto'}}>
          {results.length === 0 ? (
            <div style={{padding:'80px 0', textAlign:'center'}}>
              <div className="serif" style={{fontSize:42, fontStyle:'italic', fontWeight:400, letterSpacing:'-0.02em', marginBottom:16}}>
                Nothing matched.
              </div>
              <p className="muted" style={{maxWidth:440, margin:'0 auto'}}>
                Try a shorter phrase, or browse by <a href="category.html?c=tech" style={{color:'var(--accent)', borderBottom:'1px solid'}}>category</a>.
              </p>
            </div>
          ) : (
            <div>
              {results.map(p => (
                <a href="post.html" key={p.id} className="search-result">
                  <div className={`img-placeholder img-placeholder--${p.tone}`}
                       style={{aspectRatio:'4/3', borderRadius:4, flex:'0 0 160px'}}>
                    {p.imgLabel || p.cat}
                  </div>
                  <div style={{flex:1}}>
                    <div className="flex items-center gap-3" style={{marginBottom:8}}>
                      <span className={`tag tag--${p.cat === 'Travel' ? 'travel' : 'tech'}`}>{p.cat}</span>
                      <span className="eyebrow">{p.date}</span>
                      <span className="post-meta__dot" />
                      <span className="eyebrow"><Icon.Clock /> {p.read} min</span>
                    </div>
                    <h3 className="serif" style={{fontSize:26, lineHeight:1.2, fontWeight:400, letterSpacing:'-0.01em', marginBottom:6}}>
                      {highlight(p.title)}
                    </h3>
                    <p className="muted" style={{fontSize:14, lineHeight:1.55}}>
                      {highlight(p.excerpt)}
                    </p>
                  </div>
                  <Icon.Arrow />
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<SearchPage />);
