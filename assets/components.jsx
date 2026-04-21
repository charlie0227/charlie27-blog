/* Shared components for Charlie's Blog
   Used across Home / Post / Category / About
   ------------------------------------------------------------- */

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Category system ---------- */
const CAT_MAP = {
  'Linux':      'linux',
  'Docker':     'docker',
  'Backend':    'backend',
  'DevOps':     'devops',
  'Tools':      'tools',
  'Daily News': 'news',
  'Journal':    'journal',
};
const catClass  = (cat) => `tag--${CAT_MAP[cat] || 'accent'}`;
const catColor  = (cat) => `var(--cat-${CAT_MAP[cat] || 'linux'})`;
const catTone   = (cat) => CAT_MAP[cat] || 'forest';

/* ---------- Icons (line, thin) ---------- */
const Icon = {
  Search:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Moon:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>,
  Sun:      () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  Menu:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  Arrow:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  ArrowUp:  () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19V5M6 11l6-6 6 6"/></svg>,
  Bookmark: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  Share:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>,
  Clock:    () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Heart:    () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Eye:      () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Chat:     () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Rss:      () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>,
  Close:    () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Mail:     () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>,
  Terminal: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 10l4 4-4 4M13 18h3"/></svg>,
  Github:   () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>,
};

/* ---------- Header ---------- */
function SiteHeader({ active, onSearchClick, theme, onToggleTheme }) {
  const items = [
    { label: 'Linux',   href: 'category.html?c=linux',   cat: 'linux'   },
    { label: 'Docker',  href: 'category.html?c=docker',  cat: 'docker'  },
    { label: 'Backend', href: 'category.html?c=backend', cat: 'backend' },
    { label: 'Tools',   href: 'category.html?c=tools',   cat: 'tools'   },
    { label: 'About',   href: 'about.html',               cat: null      },
  ];
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__left">
          <a href="index.html" className="logo">
            <span className="logo__mark" />charlie<span style={{opacity:.4}}>/</span>dev
          </a>
        </div>
        <nav className="nav">
          {items.map(i => (
            <a key={i.label} href={i.href} className={active === i.label ? 'is-active' : ''}
               style={i.cat ? {'--dot-color': `var(--cat-${i.cat})`} : {}}>
              {i.cat && <span style={{
                display:'inline-block', width:6, height:6, borderRadius:'50%',
                background:`var(--cat-${i.cat})`, marginRight:6, verticalAlign:1,
                opacity: active === i.label ? 1 : 0.55,
              }} />}
              {i.label}
            </a>
          ))}
        </nav>
        <div className="site-header__right">
          <a href="search.html" className="search-box">
            <Icon.Search /> Search <kbd>⌘K</kbd>
          </a>
          <button className="icon-btn" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Icon.Sun /> : <Icon.Moon />}
          </button>
          <a href="#" className="icon-btn" aria-label="RSS"><Icon.Rss /></a>
        </div>
      </div>
    </header>
  );
}

/* ---------- Footer ---------- */
function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo" style={{fontSize:18, marginBottom:12}}>
            <span className="logo__mark" />charlie<span style={{opacity:.4}}>/</span>dev
          </div>
          <p style={{maxWidth:320, lineHeight:1.6}}>
            Dev notes on Linux, Docker, and backend systems.
            Practical guides written from real debugging sessions.
            Based in Taipei.
          </p>
          <div style={{marginTop:20, display:'flex', gap:12}}>
            <a href="#" className="icon-btn"><Icon.Github /></a>
            <a href="#" className="icon-btn"><Icon.Rss /></a>
            <a href="#" className="icon-btn"><Icon.Mail /></a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Categories</h5>
          <ul>
            {Object.entries(CAT_MAP).map(([label, key]) => (
              <li key={key}>
                <a href={`category.html?c=${key}`} style={{display:'flex', alignItems:'center', gap:8}}>
                  <span style={{width:6, height:6, borderRadius:'50%', background:`var(--cat-${key})`, display:'inline-block', flexShrink:0}} />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-col">
          <h5>Site</h5>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">RSS feed</a></li>
            <li><a href="#">Colophon</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Elsewhere</h5>
          <ul>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Mastodon</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Email</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Charlie Chen · All guides tested in production</span>
        <span>Built with <Icon.Terminal /> in 台北 · No cookies, just containers</span>
      </div>
    </footer>
  );
}

/* ---------- Ad Slot ---------- */
function AdSlot({ size = "728×90", label = "Sponsored", style }) {
  const [w, h] = size.split('×').map(Number);
  return (
    <div className="ad-slot" style={{aspectRatio: `${w}/${h}`, ...style}}>
      <div>
        <div className="ad-slot__label">{label}</div>
        <div className="ad-slot__size">{size}</div>
      </div>
    </div>
  );
}

/* ---------- Terminal-style code block ---------- */
function CodeBlock({ lang, filename, children }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    const text = typeof children === 'string' ? children : children?.props?.children || '';
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dots">
          <span className="code-dot code-dot--r" />
          <span className="code-dot code-dot--y" />
          <span className="code-dot code-dot--g" />
        </div>
        {filename && <span className="code-filename">{filename}</span>}
        <div style={{display:'flex', alignItems:'center', gap:10, marginLeft:'auto'}}>
          {lang && <span className="code-lang">{lang}</span>}
          <button
            onClick={copy}
            style={{background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-mono)',
                    fontSize:10, color: copied ? '#7ec8a0' : 'rgba(255,255,255,0.28)',
                    letterSpacing:'0.08em', padding:0, transition:'color 200ms'}}>
            {copied ? 'COPIED' : 'COPY'}
          </button>
        </div>
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

/* ---------- Post card variants ---------- */
function PostCard({ post, variant = "default" }) {
  const tagCls = catClass(post.cat);
  const tone   = catTone(post.cat);

  if (variant === "featured") {
    return (
      <a href="post.html" className="post-card post-card--featured">
        <div className={`img-placeholder img-placeholder--${tone}`}
             style={{aspectRatio:'16/10', borderRadius:6}}>
          {post.imgLabel || 'Hero image'}
        </div>
        <div style={{marginTop:20}}>
          <div className="flex items-center gap-3" style={{marginBottom:14}}>
            <span className={`tag ${tagCls}`}>{post.cat}</span>
            <span className="post-meta"><span><Icon.Clock /> {post.read} min</span></span>
          </div>
          <h2 className="serif" style={{fontSize:42, lineHeight:1.1, letterSpacing:'-0.02em', marginBottom:12, fontWeight:400}}>
            {post.title}
          </h2>
          <p className="muted" style={{fontSize:16, maxWidth:600, lineHeight:1.6}}>{post.excerpt}</p>
          <div className="post-meta" style={{marginTop:20}}>
            <span>{post.date}</span>
            <span className="post-meta__dot" />
            <span>{post.author}</span>
          </div>
        </div>
      </a>
    );
  }
  if (variant === "horizontal") {
    return (
      <a href="post.html" className="post-card post-card--horizontal">
        <div className={`img-placeholder img-placeholder--${tone}`}
             style={{aspectRatio:'4/3', borderRadius:4, flex:'0 0 180px'}}>
          {post.imgLabel || 'Thumbnail'}
        </div>
        <div style={{flex:1}}>
          <div className="flex items-center gap-3" style={{marginBottom:10}}>
            <span className={`tag ${tagCls}`}>{post.cat}</span>
          </div>
          <h3 style={{fontSize:18, lineHeight:1.3, marginBottom:8, fontWeight:600, letterSpacing:'-0.01em'}}>{post.title}</h3>
          <p className="muted" style={{fontSize:14, lineHeight:1.5, marginBottom:12}}>{post.excerpt}</p>
          <div className="post-meta">
            <span>{post.date}</span>
            <span className="post-meta__dot" />
            <span><Icon.Clock /> {post.read} min read</span>
          </div>
        </div>
      </a>
    );
  }
  if (variant === "minimal") {
    return (
      <a href="post.html" className="post-card post-card--minimal">
        <div className="flex items-center gap-3" style={{marginBottom:8}}>
          <span className="eyebrow" style={{color: catColor(post.cat)}}>{post.cat}</span>
          <span className="post-meta__dot" />
          <span className="eyebrow">{post.date}</span>
        </div>
        <h3 style={{fontSize:20, lineHeight:1.25, marginBottom:6, fontWeight:500, letterSpacing:'-0.01em'}}>{post.title}</h3>
        <p className="muted" style={{fontSize:14, lineHeight:1.55}}>{post.excerpt}</p>
      </a>
    );
  }
  // default = vertical card
  return (
    <a href="post.html" className="post-card"
       style={{borderTop:`3px solid ${catColor(post.cat)}`, paddingTop:16}}>
      <div className={`img-placeholder img-placeholder--${tone}`}
           style={{aspectRatio:'16/9', borderRadius:4, marginBottom:16}}>
        {post.imgLabel || 'Image'}
      </div>
      <div className="flex items-center gap-3" style={{marginBottom:10}}>
        <span className={`tag ${tagCls}`}>{post.cat}</span>
        <span className="eyebrow">{post.date}</span>
      </div>
      <h3 style={{fontSize:19, lineHeight:1.3, marginBottom:8, fontWeight:600, letterSpacing:'-0.01em'}}>{post.title}</h3>
      <p className="muted" style={{fontSize:14, lineHeight:1.55, marginBottom:12}}>{post.excerpt}</p>
      <div className="post-meta">
        <span><Icon.Clock /> {post.read} min</span>
        <span className="post-meta__dot" />
        <span>{post.author}</span>
      </div>
    </a>
  );
}

/* ---------- Newsletter Block ---------- */
function NewsletterBlock({ variant = "inline" }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email) setSent(true); };

  if (variant === "sidebar") {
    return (
      <aside className="newsletter-sidebar">
        <div className="eyebrow">Dev Notes · Weekly</div>
        <h4 className="serif" style={{fontSize:26, lineHeight:1.2, margin:'10px 0 8px', fontWeight:400}}>
          One guide every week.
        </h4>
        <p className="muted" style={{fontSize:13, lineHeight:1.55, marginBottom:16}}>
          Practical Linux, Docker, and backend tips. No noise, no hype. 3,200 engineers subscribed.
        </p>
        {sent ? (
          <div className="eyebrow" style={{color:'var(--accent)'}}>✓ Thank you — check your inbox</div>
        ) : (
          <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:8}}>
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="input-minimal"
            />
            <button className="btn btn--accent btn--sm" type="submit">
              Subscribe <Icon.Arrow />
            </button>
          </form>
        )}
      </aside>
    );
  }

  return (
    <section className="newsletter-inline">
      <div className="newsletter-inline__grid">
        <div>
          <div className="eyebrow">Dev Notes · Weekly digest</div>
          <h3 className="serif" style={{fontSize:40, lineHeight:1.1, margin:'14px 0 10px', letterSpacing:'-0.02em', fontWeight:400, maxWidth:480}}>
            One practical guide, every week.
          </h3>
          <p className="muted" style={{fontSize:15, maxWidth:480, lineHeight:1.6}}>
            Deep dives on Linux internals, Docker patterns, and backend architecture.
            Written by a practitioner, not a content farm. 3,200 engineers read it.
          </p>
        </div>
        {sent ? (
          <div style={{alignSelf:'center'}}>
            <div className="eyebrow" style={{color:'var(--accent)', marginBottom:6}}>✓ Subscribed</div>
            <p>Check your inbox to confirm. See you next week.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="newsletter-inline__form">
            <input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              className="input-minimal"
            />
            <button className="btn btn--accent" type="submit">
              Subscribe <Icon.Arrow />
            </button>
            <p className="subtle" style={{fontSize:11, fontFamily:'var(--font-mono)', letterSpacing:'0.08em'}}>
              NO SPAM · UNSUBSCRIBE ANYTIME
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------- Reading progress + to top ---------- */
function ReadingChrome() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollTop = h.scrollTop || document.body.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrollTop / height) * 100 : 0);
      setShowTop(scrollTop > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <div className="reading-progress" style={{width: `${progress}%`}} />
      <button className={`to-top ${showTop ? 'is-visible' : ''}`}
              onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
              aria-label="Scroll to top">
        <Icon.ArrowUp />
      </button>
    </>
  );
}

/* ---------- Theme toggle hook ---------- */
function useTheme() {
  const [theme, setTheme] = useState(() => localStorage.getItem('charlie-theme') || 'light');
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('charlie-theme', theme);
  }, [theme]);
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  return [theme, toggle];
}

/* ---------- Sample data (dev-focused) ---------- */
const SAMPLE_POSTS = [
  {
    id: 1,
    title: "Docker multi-stage builds: cut your image size by 80%",
    excerpt: "Stop shipping compilers in production. A step-by-step guide to multi-stage Dockerfiles that actually makes sense.",
    cat: "Docker",
    date: "Apr 18, 2026",
    read: 10,
    author: "Charlie",
    imgLabel: "Docker · Deep dive"
  },
  {
    id: 2,
    title: "Nginx as a reverse proxy: the definitive config guide",
    excerpt: "SSL termination, upstream health checks, caching headers — every setting I've needed in five years of running Nginx in prod.",
    cat: "Backend",
    date: "Apr 14, 2026",
    read: 14,
    author: "Charlie",
    imgLabel: "Backend · Config"
  },
  {
    id: 3,
    title: "systemd hardening: lock down your services",
    excerpt: "PrivateTmp, NoNewPrivileges, CapabilityBoundingSet — the unit file options that actually matter for security.",
    cat: "Linux",
    date: "Apr 08, 2026",
    read: 12,
    author: "Charlie",
    imgLabel: "Linux · Security"
  },
  {
    id: 4,
    title: "PostgreSQL connection pooling with PgBouncer",
    excerpt: "Why your app is exhausting database connections at 500 req/s and how transaction-mode pooling fixes it for good.",
    cat: "Backend",
    date: "Apr 02, 2026",
    read: 9,
    author: "Charlie",
    imgLabel: "Backend · DB"
  },
  {
    id: 5,
    title: "Linux kernel tuning for high-throughput servers",
    excerpt: "sysctl knobs that actually move the needle: TCP buffer sizes, file descriptor limits, and the settings everyone copies without reading.",
    cat: "Linux",
    date: "Mar 26, 2026",
    read: 16,
    author: "Charlie",
    imgLabel: "Linux · Kernel"
  },
  {
    id: 6,
    title: "GitHub Actions: reusable workflows done right",
    excerpt: "Stop copy-pasting 200-line YAML. Build composable CI blocks and call them from any repo in your org.",
    cat: "DevOps",
    date: "Mar 19, 2026",
    read: 8,
    author: "Charlie",
    imgLabel: "DevOps · CI"
  },
  {
    id: 7,
    title: "My terminal setup in 2026: Zsh, Wezterm, tmux",
    excerpt: "The exact config, plugins, and keybindings I've settled on after years of tweaking. Everything is on GitHub.",
    cat: "Tools",
    date: "Mar 12, 2026",
    read: 7,
    author: "Charlie",
    imgLabel: "Tools · Setup"
  },
  {
    id: 8,
    title: "Redis as a queue: when SQS is overkill",
    excerpt: "BLPOP, RPUSH, and consumer groups — building a reliable background job system without leaving your existing stack.",
    cat: "Backend",
    date: "Mar 05, 2026",
    read: 11,
    author: "Charlie",
    imgLabel: "Backend · Redis"
  },
];

const POPULAR_POSTS = [
  { rank: '01', title: "Docker Compose for local dev: the setup I wish I had five years ago", read: 8,  cat: "Docker"  },
  { rank: '02', title: "Understanding Linux load average (it's not what you think)", read: 6,  cat: "Linux"   },
  { rank: '03', title: "Building a zero-downtime deploy pipeline with GitHub Actions", read: 12, cat: "DevOps"  },
  { rank: '04', title: "Postgres query optimization: EXPLAIN ANALYZE, finally explained", read: 10, cat: "Backend" },
  { rank: '05', title: "The tools I use every day as a backend developer", read: 5,  cat: "Tools"   },
];

const AFFILIATE_ITEMS = [
  { name: "Zed Editor",       type: "Editor",   note: "The fastest editor I've used. Rust-native, multiplayer.", tone: "backend" },
  { name: "TablePlus",        type: "DB GUI",   note: "Finally a DB client that doesn't feel like 2008.",        tone: "linux"   },
  { name: "Warp Terminal",    type: "Terminal", note: "AI autocomplete that knows your shell context.",           tone: "docker"  },
  { name: "Proxmox VE",       type: "Infra",    note: "My entire homelab runs on this. Free, powerful.",         tone: "devops"  },
];

/* Make available globally */
Object.assign(window, {
  Icon, SiteHeader, SiteFooter, AdSlot, CodeBlock,
  PostCard, NewsletterBlock, ReadingChrome,
  useTheme, SAMPLE_POSTS, POPULAR_POSTS, AFFILIATE_ITEMS,
  catClass, catColor, catTone, CAT_MAP,
});
