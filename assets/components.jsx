/* Shared components for Charlie's Blog
   Used across Home / Post / Category / About
   ------------------------------------------------------------- */

const { useState, useEffect, useRef, useMemo } = React;

/* ---------- Icons (line, thin, nordic) ---------- */
const Icon = {
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  Moon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>,
  Sun: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  Menu: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 6h18M3 12h18M3 18h18"/></svg>,
  Arrow: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  ArrowUp: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19V5M6 11l6-6 6 6"/></svg>,
  Bookmark: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  Share: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>,
  Clock: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Heart: () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Eye: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  Chat: () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  Rss: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>,
  Close: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6 6 18M6 6l12 12"/></svg>,
  Mail: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>,
};

/* ---------- Header ---------- */
function SiteHeader({ active, onSearchClick, theme, onToggleTheme }) {
  const items = [
    { label: 'Tech', href: 'category.html?c=tech' },
    { label: 'Travel', href: 'category.html?c=travel' },
    { label: 'Gear', href: 'category.html?c=gear' },
    { label: 'Journal', href: 'category.html?c=journal' },
    { label: 'About', href: 'about.html' },
  ];
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__left">
          <a href="index.html" className="logo"><span className="logo__mark" />Charlie&rsquo;s&nbsp;Field&nbsp;Notes</a>
        </div>
        <nav className="nav">
          {items.map(i => (
            <a key={i.label} href={i.href} className={active === i.label ? 'is-active' : ''}>{i.label}</a>
          ))}
        </nav>
        <div className="site-header__right">
          <a href="search.html" className="search-box">
            <Icon.Search /> Search articles <kbd>⌘K</kbd>
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
          <div className="logo" style={{fontSize:18, marginBottom:12}}><span className="logo__mark" />Charlie&rsquo;s Field Notes</div>
          <p style={{maxWidth:320, lineHeight:1.6}}>
            A quiet place for slow writing on software, travel, and the things in between.
            Written from wherever the wifi works.
          </p>
          <div style={{marginTop:20, display:'flex', gap:12}}>
            <a href="#" className="icon-btn"><Icon.Rss /></a>
            <a href="#" className="icon-btn"><Icon.Mail /></a>
          </div>
        </div>
        <div className="footer-col">
          <h5>Sections</h5>
          <ul>
            <li><a href="category.html?c=tech">Tech</a></li>
            <li><a href="category.html?c=travel">Travel</a></li>
            <li><a href="category.html?c=gear">Gear</a></li>
            <li><a href="category.html?c=journal">Journal</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Site</h5>
          <ul>
            <li><a href="about.html">About</a></li>
            <li><a href="#">Archive</a></li>
            <li><a href="#">Colophon</a></li>
            <li><a href="#">RSS</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Elsewhere</h5>
          <ul>
            <li><a href="#">Mastodon</a></li>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">Are.na</a></li>
            <li><a href="#">Email</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Charlie Chen · All words original unless quoted</span>
        <span>Built quietly in 台北 · No cookies, just biscuits</span>
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

/* ---------- Post card variants ---------- */
function PostCard({ post, variant = "default" }) {
  if (variant === "featured") {
    return (
      <a href="post.html" className="post-card post-card--featured">
        <div className={`img-placeholder img-placeholder--${post.tone || 'forest'}`}
             style={{aspectRatio:'16/10', borderRadius:6}}>
          {post.imgLabel || 'Hero image'}
        </div>
        <div style={{marginTop:20}}>
          <div className="flex items-center gap-3" style={{marginBottom:14}}>
            <span className={`tag tag--${post.cat === 'Travel' ? 'travel' : 'tech'}`}>{post.cat}</span>
            <span className="post-meta">
              <span><Icon.Clock /> {post.read} min</span>
            </span>
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
        <div className={`img-placeholder img-placeholder--${post.tone || 'cream'}`}
             style={{aspectRatio:'4/3', borderRadius:4, flex:'0 0 180px'}}>
          {post.imgLabel || 'Thumbnail'}
        </div>
        <div style={{flex:1}}>
          <div className="flex items-center gap-3" style={{marginBottom:10}}>
            <span className={`tag tag--${post.cat === 'Travel' ? 'travel' : 'tech'}`}>{post.cat}</span>
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
          <span className="eyebrow" style={{color:'var(--accent)'}}>{post.cat}</span>
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
    <a href="post.html" className="post-card">
      <div className={`img-placeholder img-placeholder--${post.tone || 'cream'}`}
           style={{aspectRatio:'4/3', borderRadius:4, marginBottom:16}}>
        {post.imgLabel || 'Image'}
      </div>
      <div className="flex items-center gap-3" style={{marginBottom:10}}>
        <span className={`tag tag--${post.cat === 'Travel' ? 'travel' : 'tech'}`}>{post.cat}</span>
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
        <div className="eyebrow">Field Notes · Weekly</div>
        <h4 className="serif" style={{fontSize:26, lineHeight:1.2, margin:'10px 0 8px', fontWeight:400}}>
          A letter every Sunday.
        </h4>
        <p className="muted" style={{fontSize:13, lineHeight:1.55, marginBottom:16}}>
          One essay, three links, zero noise. Read by 2,840 quiet people.
        </p>
        {sent ? (
          <div className="eyebrow" style={{color:'var(--accent)'}}>✓ Thank you — check your inbox</div>
        ) : (
          <form onSubmit={submit} style={{display:'flex', flexDirection:'column', gap:8}}>
            <input
              type="email"
              placeholder="you@domain.com"
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
          <div className="eyebrow">Field Notes · Weekly newsletter</div>
          <h3 className="serif" style={{fontSize:40, lineHeight:1.1, margin:'14px 0 10px', letterSpacing:'-0.02em', fontWeight:400, maxWidth:480}}>
            One quiet essay every Sunday morning.
          </h3>
          <p className="muted" style={{fontSize:15, maxWidth:480, lineHeight:1.6}}>
            Thoughtful writing on software, travel, and the slow craft of paying attention.
            No ads, no tracking — just words. Read by 2,840 people.
          </p>
        </div>
        {sent ? (
          <div style={{alignSelf:'center'}}>
            <div className="eyebrow" style={{color:'var(--accent)', marginBottom:6}}>✓ Subscribed</div>
            <p>Check your inbox to confirm. See you on Sunday.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="newsletter-inline__form">
            <input
              type="email"
              placeholder="you@domain.com"
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

/* ---------- Sample data ---------- */
const SAMPLE_POSTS = [
  {
    id: 1,
    title: "On building quiet software in an age of noise",
    excerpt: "A meditation on the tools we return to — why some endure and others burn bright, briefly. Notes from three years of writing less, shipping more.",
    cat: "Tech",
    date: "Apr 18, 2026",
    read: 9,
    author: "Charlie",
    tone: "forest",
    imgLabel: "Essay · Tech"
  },
  {
    id: 2,
    title: "Kyoto in the rain: a week of small observations",
    excerpt: "Notebook pages from seven wet mornings in Arashiyama, where the bamboo sounds like rain even when it isn't.",
    cat: "Travel",
    date: "Apr 12, 2026",
    read: 14,
    author: "Charlie",
    tone: "warm",
    imgLabel: "Field notes · Kyoto"
  },
  {
    id: 3,
    title: "The case for writing your own tools",
    excerpt: "Small personal software is having a moment. Here's what I've learned after a decade of building things only I use.",
    cat: "Tech",
    date: "Apr 05, 2026",
    read: 11,
    author: "Charlie",
    tone: "stone",
    imgLabel: "Essay"
  },
  {
    id: 4,
    title: "What the train window taught me about attention",
    excerpt: "Twelve hours from Taipei to Kaohsiung and back, phone off. An experiment in deliberate boredom.",
    cat: "Travel",
    date: "Mar 28, 2026",
    read: 7,
    author: "Charlie",
    tone: "sky",
    imgLabel: "Journal · Taiwan"
  },
  {
    id: 5,
    title: "A gentle introduction to local-first software",
    excerpt: "Why the next wave of apps will sync, not save — and how to start thinking about data that lives with the user.",
    cat: "Tech",
    date: "Mar 20, 2026",
    read: 16,
    author: "Charlie",
    tone: "forest",
    imgLabel: "Deep dive"
  },
  {
    id: 6,
    title: "Three cafés in Lisbon that let you stay all day",
    excerpt: "The quiet politics of the laptop-friendly café, and why Portugal still gets it right.",
    cat: "Travel",
    date: "Mar 14, 2026",
    read: 8,
    author: "Charlie",
    tone: "warm",
    imgLabel: "Guide · Lisboa"
  },
  {
    id: 7,
    title: "My 2026 carry: one bag, one year",
    excerpt: "The gear that survived — and the things I finally stopped packing.",
    cat: "Gear",
    date: "Mar 07, 2026",
    read: 12,
    author: "Charlie",
    tone: "stone",
    imgLabel: "Gear review"
  },
  {
    id: 8,
    title: "Notes on moving slowly through fast cities",
    excerpt: "Tokyo, Taipei, Seoul — a walking pace theory of urban attention.",
    cat: "Travel",
    date: "Feb 28, 2026",
    read: 10,
    author: "Charlie",
    tone: "cream",
    imgLabel: "Essay · Cities"
  },
];

const POPULAR_POSTS = [
  { rank: '01', title: "The programmer's notebook: a case for longform thinking", read: 6, cat: "Tech" },
  { rank: '02', title: "Ten days in Hokkaido, off-season", read: 11, cat: "Travel" },
  { rank: '03', title: "Against the productivity-industrial complex", read: 8, cat: "Tech" },
  { rank: '04', title: "A quiet guide to flying economy across the Pacific", read: 9, cat: "Travel" },
  { rank: '05', title: "Why I still write in plain text in 2026", read: 5, cat: "Tech" },
];

const AFFILIATE_ITEMS = [
  { name: "Bellroy Classic Backpack", type: "Carry", price: "NT$4,200", note: "Daily driver for 2 years", tone: "cream" },
  { name: "reMarkable Paper Pro", type: "Writing", price: "NT$18,900", note: "Where first drafts begin", tone: "stone" },
  { name: "Peak Design Travel Tripod", type: "Photo", price: "NT$12,500", note: "Packs smaller than a water bottle", tone: "forest" },
  { name: "Muji MUJI-0.5 Gel Pen", type: "Writing", price: "NT$45", note: "The only pen I re-buy", tone: "cream" },
];

/* Make available globally */
Object.assign(window, {
  Icon, SiteHeader, SiteFooter, AdSlot,
  PostCard, NewsletterBlock, ReadingChrome,
  useTheme, SAMPLE_POSTS, POPULAR_POSTS, AFFILIATE_ITEMS
});
