/* Homepage — info-rich grid with 3 Hero variants */

const { useState } = React;

function HeroEditorial({ post }) {
  return (
    <section className="hero hero--editorial">
      <div className="hero-grid">
        <div className="hero-text">
          <div className="eyebrow">Issue №047 · Apr 18, 2026 · Essay</div>
          <h1 className="serif hero-title">
            On building <em>quiet</em> software<br/>in an age of noise.
          </h1>
          <p className="hero-lede">
            A meditation on the tools we return to — why some endure and others burn bright,
            briefly. Notes from three years of writing less, and shipping more.
          </p>
          <div className="hero-meta">
            <span className="post-meta">
              <span>Charlie Chen</span>
              <span className="post-meta__dot" />
              <span><Icon.Clock /> 9 min read</span>
              <span className="post-meta__dot" />
              <span>Filed under Tech</span>
            </span>
          </div>
          <a href="post.html" className="btn btn--accent" style={{marginTop:28}}>
            Read the essay <Icon.Arrow />
          </a>
        </div>
        <div className="hero-image">
          <div className="img-placeholder img-placeholder--forest" style={{aspectRatio:'4/5', borderRadius:6}}>
            Hero · 4:5
          </div>
          <div className="hero-caption">
            <span className="eyebrow">Photograph</span> — Aomori, late winter 2026
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroIndex({ posts }) {
  return (
    <section className="hero hero--index">
      <div className="hero-index-top">
        <div>
          <div className="eyebrow">The Current Issue · 18 April 2026</div>
          <h1 className="serif hero-index-title">
            Field notes from a quiet corner of the internet — on software, slow travel, and
            the <em>practice</em> of paying attention.
          </h1>
        </div>
        <div className="hero-index-meta">
          <div><span className="eyebrow">Essays</span><div className="big-num">47</div></div>
          <div><span className="eyebrow">Countries</span><div className="big-num">19</div></div>
          <div><span className="eyebrow">Readers</span><div className="big-num">2.8k</div></div>
        </div>
      </div>
      <div className="hero-index-grid">
        {posts.slice(0,3).map((p, i) => (
          <a href="post.html" key={p.id} className="hero-index-card">
            <div className={`img-placeholder img-placeholder--${p.tone}`} style={{aspectRatio:'3/4', borderRadius:4}}>
              {p.imgLabel}
            </div>
            <div className="eyebrow" style={{marginTop:14}}>0{i+1} · {p.cat}</div>
            <h3 className="serif" style={{fontSize:22, lineHeight:1.2, margin:'8px 0 6px', fontWeight:400}}>{p.title}</h3>
            <div className="post-meta"><span>{p.date}</span><span className="post-meta__dot"/><span>{p.read} min</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}

function HeroSplit({ post }) {
  return (
    <section className="hero hero--split">
      <div className={`img-placeholder img-placeholder--${post.tone}`} style={{aspectRatio:'16/9', borderRadius:6}}>
        {post.imgLabel} · Full-bleed hero
      </div>
      <div className="hero-split-meta">
        <div>
          <div className="flex items-center gap-3" style={{marginBottom:18}}>
            <span className="tag tag--accent">Editor&rsquo;s pick</span>
            <span className="eyebrow">{post.cat}</span>
          </div>
          <h1 className="serif" style={{fontSize:58, lineHeight:1.05, letterSpacing:'-0.025em', fontWeight:400, maxWidth:820}}>
            {post.title}
          </h1>
        </div>
        <div className="hero-split-sidebar">
          <p className="muted" style={{fontSize:15, lineHeight:1.65, marginBottom:20}}>{post.excerpt}</p>
          <div className="post-meta" style={{marginBottom:20}}>
            <span>{post.date}</span><span className="post-meta__dot"/>
            <span>{post.read} min read</span><span className="post-meta__dot"/>
            <span>{post.author}</span>
          </div>
          <a href="post.html" className="btn btn--ghost">Read the full essay <Icon.Arrow /></a>
        </div>
      </div>
    </section>
  );
}

/* Popular rail */
function PopularRail() {
  return (
    <section className="popular-rail">
      <div className="section-head">
        <div>
          <div className="eyebrow">This fortnight</div>
          <h2 className="serif section-title">What others are reading</h2>
        </div>
        <a href="category.html" className="flex items-center gap-2 muted" style={{fontSize:13}}>
          View all <Icon.Arrow />
        </a>
      </div>
      <ol className="popular-list">
        {POPULAR_POSTS.map(p => (
          <li key={p.rank}>
            <a href="post.html" className="popular-item">
              <span className="popular-rank">{p.rank}</span>
              <div style={{flex:1}}>
                <h4 style={{fontSize:16, fontWeight:500, letterSpacing:'-0.005em', marginBottom:4}}>{p.title}</h4>
                <div className="post-meta">
                  <span className={`tag tag--${p.cat === 'Travel' ? 'travel' : 'tech'}`} style={{padding:'2px 6px'}}>{p.cat}</span>
                  <span><Icon.Clock /> {p.read} min</span>
                </div>
              </div>
              <Icon.Arrow />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* Latest grid */
function LatestGrid({ posts }) {
  return (
    <section className="latest-grid-section">
      <div className="section-head">
        <div>
          <div className="eyebrow">Latest dispatches</div>
          <h2 className="serif section-title">Recently filed</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="tag tag--accent">All</button>
          <button className="tag">Tech</button>
          <button className="tag">Travel</button>
          <button className="tag">Gear</button>
        </div>
      </div>
      <div className="latest-grid">
        {posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </section>
  );
}

/* Editor picks — horizontal list */
function EditorPicks({ posts }) {
  return (
    <section className="editor-picks">
      <div className="section-head">
        <div>
          <div className="eyebrow">From the desk</div>
          <h2 className="serif section-title">Editor&rsquo;s selections</h2>
        </div>
      </div>
      <div className="picks-grid">
        {posts.map(p => <PostCard key={p.id} post={p} variant="horizontal" />)}
      </div>
    </section>
  );
}

/* Affiliate — quiet, curated */
function AffiliateBlock() {
  return (
    <section className="affiliate-block">
      <div className="section-head">
        <div>
          <div className="eyebrow">In my bag · Things I&rsquo;ve paid for and kept</div>
          <h2 className="serif section-title">The carry, considered</h2>
        </div>
        <span className="subtle" style={{fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'0.1em', textTransform:'uppercase'}}>
          Disclosure · Affiliate links
        </span>
      </div>
      <div className="affiliate-grid">
        {AFFILIATE_ITEMS.map(item => (
          <a href="#" key={item.name} className="affiliate-card">
            <div className={`img-placeholder img-placeholder--${item.tone}`} style={{aspectRatio:'1/1', borderRadius:4, marginBottom:14}}>
              {item.type}
            </div>
            <div className="eyebrow" style={{color:'var(--accent)', marginBottom:6}}>{item.type}</div>
            <h4 style={{fontSize:15, fontWeight:500, letterSpacing:'-0.005em', marginBottom:6}}>{item.name}</h4>
            <p className="muted" style={{fontSize:13, lineHeight:1.5, marginBottom:12}}>&ldquo;{item.note}&rdquo;</p>
            <div className="flex items-center" style={{justifyContent:'space-between'}}>
              <span style={{fontFamily:'var(--font-mono)', fontSize:12, color:'var(--text)'}}>{item.price}</span>
              <Icon.Arrow />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* Sidebar */
function Sidebar() {
  return (
    <aside className="home-sidebar">
      <NewsletterBlock variant="sidebar" />

      <div className="sidebar-section">
        <div className="eyebrow">Sponsored</div>
        <AdSlot size="300×250" label="Display ad" style={{marginTop:10}} />
      </div>

      <div className="sidebar-section">
        <div className="eyebrow">Currently reading</div>
        <ul className="reading-list">
          <li>
            <em className="serif-italic">How to Do Nothing</em>
            <span className="muted"> — Jenny Odell</span>
          </li>
          <li>
            <em className="serif-italic">A Pattern Language</em>
            <span className="muted"> — Christopher Alexander</span>
          </li>
          <li>
            <em className="serif-italic">The Art of Travel</em>
            <span className="muted"> — Alain de Botton</span>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <div className="eyebrow">Tags · Most used</div>
        <div className="tag-cloud">
          {['slow-software','kyoto','taipei','writing','local-first','gear','one-bag','essays','tools','cafés','trains','notebooks'].map(t => (
            <a href="#" key={t} className="tag">#{t}</a>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="eyebrow">Sponsored</div>
        <AdSlot size="300×600" label="Half-page ad" style={{marginTop:10}} />
      </div>

      <div className="sidebar-section sidebar-archive">
        <div className="eyebrow">Archive</div>
        <ul>
          <li><a href="#">April 2026 <span className="subtle">· 4</span></a></li>
          <li><a href="#">March 2026 <span className="subtle">· 6</span></a></li>
          <li><a href="#">February 2026 <span className="subtle">· 5</span></a></li>
          <li><a href="#">January 2026 <span className="subtle">· 4</span></a></li>
          <li><a href="#" className="muted">View full archive →</a></li>
        </ul>
      </div>
    </aside>
  );
}

/* Tweaks panel */
function TweaksPanel({ hero, setHero, visible }) {
  if (!visible) return null;
  const heroes = [
    { id: 'editorial', label: 'Editorial split', desc: 'Text + portrait image' },
    { id: 'index', label: 'Index cover', desc: '3-up issue cover layout' },
    { id: 'split', label: 'Full-bleed split', desc: 'Big image + metadata' },
  ];
  return (
    <div className="tweaks-panel">
      <div className="tweaks-header">
        <div className="eyebrow">Tweaks</div>
        <div className="subtle" style={{fontSize:11, fontFamily:'var(--font-mono)'}}>Hero variant</div>
      </div>
      {heroes.map(h => (
        <button key={h.id}
                className={`tweak-option ${hero === h.id ? 'is-active' : ''}`}
                onClick={() => setHero(h.id)}>
          <div style={{fontWeight:500, fontSize:13}}>{h.label}</div>
          <div className="subtle" style={{fontSize:11}}>{h.desc}</div>
        </button>
      ))}
    </div>
  );
}

/* Main Home page */
function HomePage() {
  const [theme, toggleTheme] = useTheme();
  const [hero, setHero] = useState(() => {
    try { return JSON.parse(document.getElementById('tweak-defaults').textContent).hero; }
    catch { return 'editorial'; }
  });
  const [tweaksVisible, setTweaksVisible] = useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode') setTweaksVisible(true);
      if (e.data.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);

  const setHeroAndPersist = (h) => {
    setHero(h);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { hero: h } }, '*');
  };

  return (
    <>
      <ReadingChrome />
      <SiteHeader active="Tech" theme={theme} onToggleTheme={toggleTheme} />

      <div className="container" style={{paddingTop:20, paddingBottom:16}}>
        <AdSlot size="970×90" label="Leaderboard · Above the fold" />
      </div>

      <main className="container" style={{paddingBottom:40}}>
        {hero === 'editorial' && <HeroEditorial post={SAMPLE_POSTS[0]} />}
        {hero === 'index' && <HeroIndex posts={SAMPLE_POSTS} />}
        {hero === 'split' && <HeroSplit post={SAMPLE_POSTS[0]} />}

        <hr className="rule" style={{margin:'64px 0 48px'}} />

        <div className="home-layout">
          <div>
            <PopularRail />
            <hr className="rule" style={{margin:'56px 0'}} />
            <LatestGrid posts={SAMPLE_POSTS.slice(1,7)} />
          </div>
          <Sidebar />
        </div>

        <div style={{margin:'64px 0'}}>
          <AdSlot size="970×250" label="Billboard · Mid-page" />
        </div>

        <EditorPicks posts={SAMPLE_POSTS.slice(2,5)} />

        <hr className="rule" style={{margin:'72px 0'}} />

        <NewsletterBlock />

        <hr className="rule" style={{margin:'72px 0'}} />

        <AffiliateBlock />
      </main>

      <SiteFooter />
      <TweaksPanel hero={hero} setHero={setHeroAndPersist} visible={tweaksVisible} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomePage />);
