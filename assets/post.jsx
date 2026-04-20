/* Single Post page with TOC + reading progress + aside */

const { useState, useEffect, useRef } = React;

const SECTIONS = [
  { id: 'opening', label: 'The opening question' },
  { id: 'small-tools', label: 'On small tools' },
  { id: 'return', label: 'Why we return' },
  { id: 'quiet-software', label: 'The quiet software thesis' },
  { id: 'practice', label: 'A working practice' },
  { id: 'closing', label: 'Closing, a small one' },
];

function PostTOC() {
  const [active, setActive] = useState('opening');
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= y) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <aside className="post-toc">
      <h5>Contents</h5>
      <ol>
        {SECTIONS.map(s => (
          <li key={s.id}>
            <a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''}>{s.label}</a>
          </li>
        ))}
      </ol>
    </aside>
  );
}

function PostActions() {
  const [bookmarked, setBookmarked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const share = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true); setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="post-aside">
      <div className="post-actions">
        <button className={`post-action-btn ${bookmarked ? 'is-active' : ''}`} onClick={() => setBookmarked(!bookmarked)}>
          <Icon.Bookmark /> {bookmarked ? 'Saved to reading list' : 'Save for later'}
        </button>
        <button className={`post-action-btn ${liked ? 'is-active' : ''}`} onClick={() => setLiked(!liked)}>
          <Icon.Heart /> {liked ? 'Liked' : 'Appreciate this'}
        </button>
        <button className="post-action-btn" onClick={share}>
          <Icon.Share /> {copied ? 'Link copied' : 'Share'}
        </button>
      </div>
      <div style={{padding:14, border:'1px solid var(--border)', borderRadius:4, background:'var(--bg-elevated)'}}>
        <div className="eyebrow" style={{marginBottom:10}}>Stats</div>
        <div style={{display:'flex', flexDirection:'column', gap:8, fontSize:13, color:'var(--text-muted)'}}>
          <div className="flex items-center gap-2"><Icon.Eye /> 4,218 reads</div>
          <div className="flex items-center gap-2"><Icon.Heart /> 312 likes</div>
          <div className="flex items-center gap-2"><Icon.Chat /> 18 replies</div>
        </div>
      </div>
      <AdSlot size="300×600" label="Half-page ad" />
    </div>
  );
}

function PostPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <ReadingChrome />
      <SiteHeader active="Tech" theme={theme} onToggleTheme={toggleTheme} />

      <article>
        <div className="container">
          <header className="post-header">
            <div className="flex items-center gap-3" style={{marginBottom:8}}>
              <a href="category.html?c=tech" className="tag tag--accent">Tech</a>
              <span className="eyebrow">Essay № 047 · April 18, 2026</span>
            </div>
            <h1 className="post-title">
              On building <em>quiet</em> software in an age of noise.
            </h1>
            <p style={{fontSize:20, lineHeight:1.55, color:'var(--text-muted)', maxWidth:720, fontFamily:'var(--font-serif)', fontStyle:'italic'}}>
              A meditation on the tools we return to — why some endure and others burn bright, briefly.
              Notes from three years of writing less, and shipping more.
            </p>
            <div className="post-header-meta">
              <div className="post-author">
                <div className="post-author__avatar">C</div>
                <div className="post-author__info">
                  <span className="post-author__name">Charlie Chen</span>
                  <span className="post-author__role">Writer · based in Taipei</span>
                </div>
              </div>
              <span className="post-meta" style={{marginLeft:'auto'}}>
                <span><Icon.Clock /> 9 min read</span>
                <span className="post-meta__dot" />
                <span>4,218 reads</span>
              </span>
            </div>
          </header>

          <div className="post-hero">
            <div className="img-placeholder img-placeholder--forest">Hero photograph · 16:8</div>
            <div className="figure-caption" style={{textAlign:'left', marginLeft:4}}>
              A writing desk in Aomori, late winter 2026 — photograph by the author
            </div>
          </div>

          <div className="post-layout">
            <PostTOC />

            <div className="post-body">
              <p className="lede">
                There&rsquo;s a quality certain tools have that I&rsquo;ve stopped trying to describe and started
                trying to build: they feel <em>quiet</em>. They don&rsquo;t demand. They don&rsquo;t pulse or
                pop or ping. They sit, like good notebooks, waiting for you.
              </p>

              <h2 id="opening">The opening question</h2>
              <p>
                Somewhere around year eight of working in software, I started keeping a short list of
                tools I opened every day without thinking — and a much longer list of the ones I had
                tried and abandoned. The short list stayed surprisingly stable: a text editor, a terminal,
                a notebook app written by a stranger in Copenhagen, a mapping app I paid for once.
              </p>
              <p>
                The long list grew, monthly, with the velocity of the industry. Most of them were good
                software. Many of them were well-funded. A few were, in the technical sense, better than
                the tools on my short list. But they didn&rsquo;t last — <a href="#">not for me</a>, and
                not for most of the people I know who pay close attention to what they use.
              </p>

              <blockquote>
                The question that started haunting me: what is the <em>quality</em> that makes software
                durable in a life, and why do we so rarely build for it?
                <cite>— Notebook, February 2026</cite>
              </blockquote>

              <h2 id="small-tools">On small tools</h2>
              <p>
                The first instinct is to say: size. Small software is durable because small software
                respects you. But this isn&rsquo;t quite right. Some of my longest-used tools are not
                small. The text editor I&rsquo;m writing this in has a feature list that would fill a
                booklet. What it <em>has</em> is the opposite of aggression.
              </p>

              <div className="figure">
                <div className="img-placeholder img-placeholder--cream" style={{aspectRatio:'16/9'}}>
                  Diagram · The quiet software quadrant
                </div>
                <div className="figure-caption">
                  Fig. 1 — Mapping software on two axes: how much it asks of you, and how much it gives back.
                </div>
              </div>

              <p>
                Small software, done right, has a particular cadence. It opens in under half a second.
                It does the thing you came to do without asking you to pick a plan first. It doesn&rsquo;t
                show you other people&rsquo;s activity unless you ask. It doesn&rsquo;t try to teach you
                to use it — trusting, perhaps too generously, that you figured out a can opener without a
                tutorial.
              </p>

              <h3>A partial list of things quiet software doesn&rsquo;t do</h3>
              <ul>
                <li>Announce updates in the middle of your work.</li>
                <li>Show you a &ldquo;what&rsquo;s new&rdquo; modal on every second launch.</li>
                <li>Replace the word &ldquo;save&rdquo; with something cleverer.</li>
                <li>Gamify the act of using it.</li>
                <li>Treat the empty state as a sales opportunity.</li>
              </ul>

              <h2 id="return">Why we return</h2>
              <p>
                I&rsquo;ve started to think the durable tools share something like what Alexander called
                <em> the quality without a name</em> — a kind of fit between the thing and the life it
                lives inside. You don&rsquo;t choose these tools so much as stop noticing them. They stop
                being software and start being <em>habits</em>.
              </p>
              <p>
                Which is, I think, the highest compliment you can pay a piece of software, and one almost
                nobody ships toward.
              </p>

              <h2 id="quiet-software">The quiet software thesis</h2>
              <p>
                So here&rsquo;s the thesis, stated plainly: the next decade of genuinely useful software
                will look less like a product and more like an <em>instrument</em>. Instruments don&rsquo;t
                onboard you. They don&rsquo;t push notifications at you. They&rsquo;re patient, and
                durable, and — this is the important part — they get out of the way.
              </p>

              <pre><code>{`// What quiet software feels like, as a shape:
function openApp() {
  load();           // fast
  restoreState();   // exactly where you left off
  showWork();       // not a dashboard. the work.
  stopTalking();    // let them work.
}`}</code></pre>

              <h2 id="practice">A working practice</h2>
              <p>
                I&rsquo;ve been keeping two lists while designing my own small tools. One is of moments
                where the software should have said nothing, and said something anyway. The other is of
                moments where the software noticed something I would have missed, and quietly waited for me
                to catch up.
              </p>
              <p>
                The second list is much, much shorter. That&rsquo;s what we&rsquo;re working toward.
              </p>

              <hr />

              <h2 id="closing">Closing, a small one</h2>
              <p>
                A friend sent me a line once, from a book I still haven&rsquo;t read: <em>the things that
                last are the things that don&rsquo;t insist on themselves.</em> I think about this a lot,
                while working, and while traveling, and while trying to decide whether to ship a thing or
                let it sit for another week.
              </p>
              <p>
                The tools that last don&rsquo;t insist on themselves.<br/>
                We&rsquo;re allowed to build software that way.
              </p>

              <div className="post-end">
                <div className="eyebrow" style={{marginBottom:16}}>End of essay № 047</div>
                <div style={{display:'flex', gap:12, marginBottom:24}}>
                  <button className="btn btn--accent"><Icon.Heart /> Appreciate (312)</button>
                  <button className="btn btn--ghost"><Icon.Share /> Share</button>
                  <button className="btn btn--ghost"><Icon.Bookmark /> Save</button>
                </div>
                <AdSlot size="728×90" label="End of article ad" />
              </div>
            </div>

            <PostActions />
          </div>
        </div>

        <section className="container related">
          <div className="section-head">
            <div>
              <div className="eyebrow">Keep reading</div>
              <h2 className="serif section-title">If you liked this, try</h2>
            </div>
          </div>
          <div className="related-grid">
            {SAMPLE_POSTS.slice(2,5).map(p => <PostCard key={p.id} post={p} />)}
          </div>
        </section>

        <div className="container" style={{marginTop:80}}>
          <NewsletterBlock />
        </div>
      </article>

      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PostPage />);
