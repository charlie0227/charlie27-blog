/* Category / Archive page */

const { useState } = React;

function CategoryPage() {
  const [theme, toggleTheme] = useTheme();
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Newest');

  const params = new URLSearchParams(window.location.search);
  const cat = params.get('c') || 'tech';

  const META = {
    tech: {
      name: 'Tech',
      hero: 'On software, small tools, and the slow craft of building things that last.',
      count: 28,
      since: 'March 2022',
      tone: 'forest',
    },
    travel: {
      name: 'Travel',
      hero: 'Field notes from slow journeys — written from wherever the wifi works.',
      count: 19,
      since: 'March 2022',
      tone: 'warm',
    },
    gear: {
      name: 'Gear',
      hero: 'Things I&rsquo;ve paid for, carried, and kept. No sponsored reviews.',
      count: 11,
      since: 'August 2023',
      tone: 'stone',
    },
    journal: {
      name: 'Journal',
      hero: 'Shorter posts. Private thoughts, said out loud.',
      count: 14,
      since: 'November 2022',
      tone: 'sky',
    },
  };
  const meta = META[cat] || META.tech;
  const filters = ['All', 'Essays', 'Deep dives', 'Notes', 'Guides'];

  // 12 posts to fill the grid
  const posts = [
    ...SAMPLE_POSTS,
    ...SAMPLE_POSTS.map(p => ({...p, id: p.id + 100, date: p.date.replace('Mar', 'Feb').replace('Apr', 'Jan')})),
  ].slice(0, 12);

  return (
    <>
      <ReadingChrome />
      <SiteHeader active={meta.name} theme={theme} onToggleTheme={toggleTheme} />

      <main className="container">
        <section className="category-hero">
          <div className="eyebrow">Section · {meta.count} articles · Since {meta.since}</div>
          <h1 className="category-title">{meta.name}<em className="serif-italic" style={{color:'var(--accent)', fontSize:'0.4em', verticalAlign:'0.9em'}}> / {cat}</em></h1>
          <p className="category-desc" dangerouslySetInnerHTML={{__html: meta.hero}} />
          <div className="category-stats">
            <div className="stat">
              <div className="eyebrow">Total articles</div>
              <div className="stat-num serif">{meta.count}</div>
            </div>
            <div className="stat">
              <div className="eyebrow">Avg read time</div>
              <div className="stat-num serif">9 min</div>
            </div>
            <div className="stat">
              <div className="eyebrow">Last updated</div>
              <div className="stat-num serif">Apr 18</div>
            </div>
            <div className="stat">
              <div className="eyebrow">Subscribers</div>
              <div className="stat-num serif">2,840</div>
            </div>
          </div>
        </section>

        <div className="category-toolbar">
          <div className="chip-row">
            {filters.map(f => (
              <button key={f} className={`chip ${filter === f ? 'is-active' : ''}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="eyebrow">Sort</span>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                border:'1px solid var(--border-strong)', background:'transparent',
                padding:'6px 10px', fontFamily:'var(--font-sans)', fontSize:13,
                color:'var(--text)', borderRadius:4, cursor:'pointer'
              }}>
              <option>Newest</option>
              <option>Most read</option>
              <option>Longest</option>
              <option>Alphabetical</option>
            </select>
          </div>
        </div>

        <div className="category-list">
          <div>
            {/* Feature row */}
            <PostCard post={posts[0]} variant="featured" />
            <hr className="rule" style={{margin:'56px 0'}} />

            {/* In-grid ad */}
            <div style={{margin:'0 0 48px'}}>
              <AdSlot size="728×90" label="In-feed ad" />
            </div>

            <div className="latest-grid" style={{marginBottom:56}}>
              {posts.slice(1,5).map(p => <PostCard key={p.id} post={p} />)}
            </div>

            <div style={{margin:'48px 0'}}>
              <AdSlot size="728×90" label="Mid-list ad" />
            </div>

            <div style={{marginTop:48}}>
              {posts.slice(5).map(p => <PostCard key={p.id} post={p} variant="horizontal" />)}
            </div>

            <div style={{display:'flex', justifyContent:'center', marginTop:72, gap:8}}>
              <button className="chip is-active">1</button>
              <button className="chip">2</button>
              <button className="chip">3</button>
              <span className="chip" style={{border:'none'}}>…</span>
              <button className="chip">6</button>
              <button className="chip">Next →</button>
            </div>
          </div>

          <aside className="home-sidebar">
            <NewsletterBlock variant="sidebar" />
            <div className="sidebar-section">
              <div className="eyebrow">Sponsored</div>
              <AdSlot size="300×250" label="Display" style={{marginTop:10}} />
            </div>
            <div className="sidebar-section">
              <div className="eyebrow">Other sections</div>
              <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:10, fontSize:14, marginTop:14}}>
                {Object.entries(META).filter(([k]) => k !== cat).map(([k, v]) => (
                  <li key={k}>
                    <a href={`category.html?c=${k}`} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)'}}>
                      <span>{v.name}</span>
                      <span className="subtle">{v.count} →</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sidebar-section">
              <div className="eyebrow">Tags in {meta.name.toLowerCase()}</div>
              <div className="tag-cloud" style={{marginTop:14}}>
                {['local-first','writing','tools','attention','slow-web','notebook','practice','craft','open-source'].map(t => (
                  <a href="#" key={t} className="tag">#{t}</a>
                ))}
              </div>
            </div>
            <div className="sidebar-section">
              <div className="eyebrow">Sponsored</div>
              <AdSlot size="300×600" label="Half-page" style={{marginTop:10}} />
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CategoryPage />);
