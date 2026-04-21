/* Homepage — Dev blog with terminal hero + 7-category grid */

const { useState } = React;

/* ---- Hero: Dev terminal ---- */
function HeroDev() {
  return (
    <section className="hero hero--dev">
      <div className="hero-dev-grid">
        <div className="hero-dev-text">
          <div className="hero-dev-prompt">charlie@blog:~/posts $ cat README.md</div>
          <h1 className="hero-dev-title">
            Dev notes on<br />
            <em>Linux, Docker</em><br />
            &amp;&nbsp;backend.
          </h1>
          <p className="hero-dev-lede">
            Practical guides from real debugging sessions. No fluff — just the
            commands, configs, and architecture decisions that actually ship.
          </p>
          <div className="hero-dev-stats">
            <div className="hero-dev-stat">
              <div className="eyebrow">Posts</div>
              <div className="hero-stat-num">87</div>
            </div>
            <div className="hero-dev-stat">
              <div className="eyebrow">Categories</div>
              <div className="hero-stat-num">7</div>
            </div>
            <div className="hero-dev-stat">
              <div className="eyebrow">Readers</div>
              <div className="hero-stat-num">3.2k</div>
            </div>
          </div>
          <div style={{display:'flex', gap:12}}>
            <a href="category.html?c=linux" className="btn btn--accent">
              Browse Linux <Icon.Arrow />
            </a>
            <a href="category.html?c=docker" className="btn btn--ghost">
              Docker guides
            </a>
          </div>
        </div>

        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dots">
              <span className="t-dot t-dot--red" />
              <span className="t-dot t-dot--yellow" />
              <span className="t-dot t-dot--green" />
            </div>
            <span className="terminal-title">zsh — charlie@arch — 82×24</span>
          </div>
          <div className="terminal-body">
            <div className="t-line">
              <span className="t-prompt">charlie@arch</span>
              <span className="t-sep">:</span>
              <span className="t-path">~/blog</span>
              <span className="t-dollar">$</span>
              {' '}cat latest-posts.txt
            </div>
            <div className="t-line t-out">» Docker multi-stage builds — cut image size 80%</div>
            <div className="t-line t-out">» Nginx reverse proxy: the definitive config</div>
            <div className="t-line t-out">» systemd hardening: lock down your services</div>
            <span className="t-blank" />
            <div className="t-line">
              <span className="t-prompt">charlie@arch</span>
              <span className="t-sep">:</span>
              <span className="t-path">~/blog</span>
              <span className="t-dollar">$</span>
              {' '}git log --oneline -4
            </div>
            <div className="t-line t-out"><span className="t-sha">a4f2c1e</span>Add Docker multi-stage build guide</div>
            <div className="t-line t-out"><span className="t-sha">9b3e8d2</span>PgBouncer connection pooling deep dive</div>
            <div className="t-line t-out"><span className="t-sha">c7a1f90</span>Linux kernel tuning for high-throughput</div>
            <div className="t-line t-out"><span className="t-sha">f3d2a08</span>GitHub Actions reusable workflows guide</div>
            <span className="t-blank" />
            <div className="t-line">
              <span className="t-prompt">charlie@arch</span>
              <span className="t-sep">:</span>
              <span className="t-path">~/blog</span>
              <span className="t-dollar">$</span>
              {' '}<span className="t-cursor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Hero: Editorial (alt) ---- */
function HeroEditorial({ post }) {
  return (
    <section className="hero hero--editorial">
      <div className="hero-grid">
        <div className="hero-text">
          <div className="eyebrow">Latest · {post.date} · {post.cat}</div>
          <h1 className="serif hero-title">
            {post.title}
          </h1>
          <p className="hero-lede">{post.excerpt}</p>
          <div className="hero-meta">
            <span className="post-meta">
              <span>Charlie Chen</span>
              <span className="post-meta__dot" />
              <span><Icon.Clock /> {post.read} min read</span>
              <span className="post-meta__dot" />
              <span className={`tag ${catClass(post.cat)}`}>{post.cat}</span>
            </span>
          </div>
          <a href="post.html" className="btn btn--accent" style={{marginTop:28}}>
            Read the guide <Icon.Arrow />
          </a>
        </div>
        <div className="hero-image">
          <div className={`img-placeholder img-placeholder--${catTone(post.cat)}`} style={{aspectRatio:'4/5', borderRadius:6}}>
            {post.imgLabel}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---- Hero: Index cover ---- */
function HeroIndex({ posts }) {
  return (
    <section className="hero hero--index">
      <div className="hero-index-top">
        <div>
          <div className="eyebrow">charlie/dev · {new Date().toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'})}</div>
          <h1 className="serif hero-index-title">
            Dev notes on Linux, Docker, and backend systems —
            written from the <em>terminal</em>, not a CMS.
          </h1>
        </div>
        <div className="hero-index-meta">
          <div><span className="eyebrow">Posts</span><div className="big-num">87</div></div>
          <div><span className="eyebrow">Topics</span><div className="big-num">7</div></div>
          <div><span className="eyebrow">Readers</span><div className="big-num">3.2k</div></div>
        </div>
      </div>
      <div className="hero-index-grid">
        {posts.slice(0,3).map((p, i) => (
          <a href="post.html" key={p.id} className="hero-index-card">
            <div className={`img-placeholder img-placeholder--${catTone(p.cat)}`} style={{aspectRatio:'3/4', borderRadius:4}}>
              {p.imgLabel}
            </div>
            <div style={{marginTop:14}}>
              <span className={`tag ${catClass(p.cat)}`} style={{marginBottom:10, display:'inline-block'}}>{p.cat}</span>
            </div>
            <h3 className="serif" style={{fontSize:22, lineHeight:1.2, margin:'6px 0', fontWeight:400}}>{p.title}</h3>
            <div className="post-meta"><span>{p.date}</span><span className="post-meta__dot"/><span>{p.read} min</span></div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---- Popular rail ---- */
function PopularRail() {
  return (
    <section className="popular-rail">
      <div className="section-head">
        <div>
          <div className="eyebrow">Most read this month</div>
          <h2 className="serif section-title">Popular guides</h2>
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
                  <span className={`tag ${catClass(p.cat)}`} style={{padding:'2px 6px'}}>{p.cat}</span>
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

/* ---- Latest grid ---- */
function LatestGrid({ posts }) {
  const cats = ['All', ...Object.keys(CAT_MAP)];
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? posts : posts.filter(p => p.cat === active);

  return (
    <section className="latest-grid-section">
      <div className="section-head">
        <div>
          <div className="eyebrow">Recently published</div>
          <h2 className="serif section-title">Latest posts</h2>
        </div>
        <div className="flex items-center gap-2" style={{flexWrap:'wrap'}}>
          {cats.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`tag ${c === 'All' ? (active === 'All' ? 'tag--accent' : '') : catClass(c)}`}
              style={{
                cursor:'pointer',
                opacity: active === c ? 1 : 0.5,
                border: active === c ? undefined : '1px solid var(--border)',
                color: active === c ? undefined : 'var(--text-muted)',
                background: active === c ? undefined : 'transparent',
              }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div className="latest-grid">
        {filtered.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </section>
  );
}

/* ---- Editor picks ---- */
function EditorPicks({ posts }) {
  return (
    <section className="editor-picks">
      <div className="section-head">
        <div>
          <div className="eyebrow">Hand-picked</div>
          <h2 className="serif section-title">Deep dives</h2>
        </div>
      </div>
      <div className="picks-grid">
        {posts.map(p => <PostCard key={p.id} post={p} variant="horizontal" />)}
      </div>
    </section>
  );
}

/* ---- Dev tools block (replaces affiliate) ---- */
function DevToolsBlock() {
  return (
    <section className="affiliate-block">
      <div className="section-head">
        <div>
          <div className="eyebrow">What I actually use · Daily driver stack</div>
          <h2 className="serif section-title">The toolbox</h2>
        </div>
        <span className="subtle" style={{fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'0.1em', textTransform:'uppercase'}}>
          Some affiliate links
        </span>
      </div>
      <div className="affiliate-grid">
        {AFFILIATE_ITEMS.map(item => (
          <a href="#" key={item.name} className="affiliate-card">
            <div className={`img-placeholder img-placeholder--${item.tone}`} style={{aspectRatio:'1/1', borderRadius:4, marginBottom:14}}>
              {item.type}
            </div>
            <div className="eyebrow" style={{color: catColor(item.tone === 'linux' ? 'Linux' : item.tone === 'docker' ? 'Docker' : item.tone === 'backend' ? 'Backend' : 'DevOps'), marginBottom:6}}>
              {item.type}
            </div>
            <h4 style={{fontSize:15, fontWeight:500, letterSpacing:'-0.005em', marginBottom:6}}>{item.name}</h4>
            <p className="muted" style={{fontSize:13, lineHeight:1.5, marginBottom:12}}>&ldquo;{item.note}&rdquo;</p>
            <div className="flex items-center" style={{justifyContent:'flex-end'}}>
              <Icon.Arrow />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---- Sidebar ---- */
function Sidebar() {
  const devTags = ['docker-compose','nginx','systemd','postgres','redis','linux-kernel','github-actions','bash','vim','tmux','rust','go','k8s','monitoring'];
  return (
    <aside className="home-sidebar">
      <NewsletterBlock variant="sidebar" />

      <div className="sidebar-section">
        <div className="eyebrow">Sponsored</div>
        <AdSlot size="300×250" label="Display ad" style={{marginTop:10}} />
      </div>

      <div className="sidebar-section">
        <div className="eyebrow">Categories</div>
        <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:12}}>
          {Object.entries(CAT_MAP).map(([label, key]) => (
            <a key={key} href={`category.html?c=${key}`}
               style={{display:'flex', alignItems:'center', gap:10, fontSize:14, padding:'8px 0',
                       borderBottom:'1px solid var(--border)', color:'var(--text-muted)'}}>
              <span style={{width:8, height:8, borderRadius:'50%', background:`var(--cat-${key})`,
                            display:'inline-block', flexShrink:0}} />
              <span style={{flex:1}}>{label}</span>
              <Icon.Arrow />
            </a>
          ))}
        </div>
      </div>

      <div className="sidebar-section">
        <div className="eyebrow">Tags · Most used</div>
        <div className="tag-cloud" style={{marginTop:12}}>
          {devTags.map(t => (
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
          <li><a href="#">April 2026 <span className="subtle">· 6</span></a></li>
          <li><a href="#">March 2026 <span className="subtle">· 8</span></a></li>
          <li><a href="#">February 2026 <span className="subtle">· 7</span></a></li>
          <li><a href="#">January 2026 <span className="subtle">· 5</span></a></li>
          <li><a href="#" className="muted">View full archive →</a></li>
        </ul>
      </div>
    </aside>
  );
}

/* ---- Tweaks panel ---- */
function TweaksPanel({ hero, setHero, visible }) {
  if (!visible) return null;
  const heroes = [
    { id: 'dev',       label: 'Dev terminal',   desc: 'Terminal window + dev positioning' },
    { id: 'editorial', label: 'Editorial split', desc: 'Text + image, magazine style' },
    { id: 'index',     label: 'Index cover',     desc: '3-up issue cover layout' },
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

/* ---- Main Home page ---- */
function HomePage() {
  const [theme, toggleTheme] = useTheme();
  const [hero, setHero] = useState(() => {
    try { return JSON.parse(document.getElementById('tweak-defaults').textContent).hero || 'dev'; }
    catch { return 'dev'; }
  });
  const [tweaksVisible, setTweaksVisible] = useState(false);

  React.useEffect(() => {
    const handler = (e) => {
      if (!e.data) return;
      if (e.data.type === '__activate_edit_mode')   setTweaksVisible(true);
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
      <SiteHeader active="Linux" theme={theme} onToggleTheme={toggleTheme} />

      <div className="container" style={{paddingTop:20, paddingBottom:16}}>
        <AdSlot size="970×90" label="Leaderboard · Above the fold" />
      </div>

      <main className="container" style={{paddingBottom:40}}>
        {hero === 'dev'       && <HeroDev />}
        {hero === 'editorial' && <HeroEditorial post={SAMPLE_POSTS[0]} />}
        {hero === 'index'     && <HeroIndex posts={SAMPLE_POSTS} />}

        <hr className="rule" style={{margin:'64px 0 48px'}} />

        <div className="home-layout">
          <div>
            <PopularRail />
            <hr className="rule" style={{margin:'56px 0'}} />
            <LatestGrid posts={SAMPLE_POSTS} />
          </div>
          <Sidebar />
        </div>

        <div style={{margin:'64px 0'}}>
          <AdSlot size="970×250" label="Billboard · Mid-page" />
        </div>

        <EditorPicks posts={SAMPLE_POSTS.slice(1,4)} />

        <hr className="rule" style={{margin:'72px 0'}} />

        <NewsletterBlock />

        <hr className="rule" style={{margin:'72px 0'}} />

        <DevToolsBlock />
      </main>

      <SiteFooter />
      <TweaksPanel hero={hero} setHero={setHeroAndPersist} visible={tweaksVisible} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<HomePage />);
