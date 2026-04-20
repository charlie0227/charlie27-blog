/* About page */

function AboutPage() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <ReadingChrome />
      <SiteHeader active="About" theme={theme} onToggleTheme={toggleTheme} />

      <main className="container">
        <section className="about-hero">
          <div>
            <div className="eyebrow">About · Colophon · Hello</div>
            <h1 className="about-intro-title">
              I write <em>quietly</em> about software, travel, and the practice of paying attention.
            </h1>
            <p style={{fontSize:18, lineHeight:1.65, color:'var(--text-muted)', maxWidth:520}}>
              I&rsquo;m Charlie — a writer and software person based in Taipei, currently somewhere between
              a train and a café. This is my personal corner of the internet, updated slowly and with care.
            </p>
            <div style={{display:'flex', gap:12, marginTop:32}}>
              <a href="#" className="btn btn--accent">Subscribe to the newsletter <Icon.Arrow /></a>
              <a href="#" className="btn btn--ghost">Email me</a>
            </div>
          </div>
          <div>
            <div className="img-placeholder img-placeholder--forest about-portrait">Author portrait · 4:5</div>
            <div className="figure-caption" style={{textAlign:'left', marginLeft:4}}>
              Sōgenji temple, Kyoto — spring 2025
            </div>
          </div>
        </section>

        <div className="about-facts">
          <div className="about-fact">
            <h4>47</h4>
            <p>Essays filed since March 2022. Roughly one every two weeks, when the weather is right.</p>
          </div>
          <div className="about-fact">
            <h4>19</h4>
            <p>Countries these words have been written from. Most often from a small café in Daan.</p>
          </div>
          <div className="about-fact">
            <h4>2,840</h4>
            <p>Quiet subscribers who let me into their Sunday mornings. I try to be worth the time.</p>
          </div>
        </div>

        <section className="about-body">
          <div className="eyebrow">The long version</div>
          <h2 className="serif" style={{fontSize:40, lineHeight:1.15, margin:'18px 0 24px', fontWeight:400, letterSpacing:'-0.02em'}}>
            A slow-made blog, on purpose.
          </h2>
          <p className="serif-italic" style={{fontSize:22, lineHeight:1.55, color:'var(--text)'}}>
            I started this blog on a rainy evening in March 2022, after closing a tab for the forty-third
            time without finding anything I actually wanted to read.
          </p>
          <p>
            I wanted a place to think out loud — about the software I build and use, about the cities I
            return to, and about the slow craft of paying attention in an economy designed to sell yours.
            There&rsquo;s no editorial calendar and no analytics dashboard. There are a few small banner ads
            that help pay for the hosting, an occasional affiliate link for gear I actually own, and a
            Sunday newsletter for people who&rsquo;d like one letter a week instead of many.
          </p>
          <p>
            I write in a small <code>.md</code> file, on a seven-year-old laptop, almost always in the
            morning before the city is loud. I publish when a thing is ready and not before. Sometimes
            that&rsquo;s every week. Sometimes that&rsquo;s a month of silence.
          </p>
          <h3 style={{fontSize:22, margin:'40px 0 14px', fontWeight:600, letterSpacing:'-0.01em'}}>What you&rsquo;ll find here</h3>
          <p>
            The writing falls, loosely, into four folders — <strong>Tech</strong> (software, tools,
            craft), <strong>Travel</strong> (slow journeys, often to the same few places),
            <strong> Gear</strong> (things I&rsquo;ve paid for and kept), and <strong>Journal</strong>
            (short, quieter entries — the kind you&rsquo;d find in a shared notebook).
          </p>
          <p>
            You can read by section, subscribe to the RSS feed, or let the Sunday letter drop a single
            essay into your inbox. There&rsquo;s no algorithm to please here; the only metric I track is
            whether a thing was worth writing.
          </p>
        </section>

        <section style={{maxWidth:1000, margin:'40px auto 0'}}>
          <div className="eyebrow" style={{marginBottom:14}}>/now</div>
          <h2 className="serif" style={{fontSize:40, lineHeight:1.15, margin:'0 0 32px', fontWeight:400, letterSpacing:'-0.02em'}}>
            What I&rsquo;m currently up to.
          </h2>
          <div className="now-list">
            <div className="now-item"><div className="now-item__label">Reading</div><div className="now-item__val"><em className="serif-italic">A Pattern Language</em>, Christopher Alexander</div></div>
            <div className="now-item"><div className="now-item__label">Writing</div><div className="now-item__val">An essay on local-first software, third draft</div></div>
            <div className="now-item"><div className="now-item__label">Building</div><div className="now-item__val">A quiet note-taking app, just for me</div></div>
            <div className="now-item"><div className="now-item__label">Listening</div><div className="now-item__val">Nils Frahm, on repeat, as always</div></div>
            <div className="now-item"><div className="now-item__label">Traveling</div><div className="now-item__val">Taipei → Seoul, late May 2026</div></div>
            <div className="now-item"><div className="now-item__label">Avoiding</div><div className="now-item__val">Group chats, open-plan cafés, rushed writing</div></div>
          </div>
          <div className="subtle" style={{marginTop:20, fontSize:12, fontFamily:'var(--font-mono)', letterSpacing:'0.08em'}}>
            LAST UPDATED · APRIL 18, 2026 · INSPIRED BY /NOW PAGE MOVEMENT
          </div>
        </section>

        <section style={{maxWidth:800, margin:'80px auto 0'}}>
          <div className="eyebrow" style={{marginBottom:14}}>Colophon</div>
          <h2 className="serif" style={{fontSize:32, lineHeight:1.2, margin:'0 0 28px', fontWeight:400, letterSpacing:'-0.02em'}}>
            How this site is made.
          </h2>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, fontSize:14, lineHeight:1.7}}>
            <div>
              <h5 style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:12}}>Typography</h5>
              <p><em className="serif-italic">Instrument Serif</em> for titles. Inter for text. JetBrains Mono where it counts.</p>
            </div>
            <div>
              <h5 style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:12}}>Platform</h5>
              <p>WordPress with a custom theme, hosted on a small server in Osaka. Written in a plain text editor.</p>
            </div>
            <div>
              <h5 style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:12}}>Analytics</h5>
              <p>None. I don&rsquo;t want to know. This site does not set cookies.</p>
            </div>
            <div>
              <h5 style={{fontFamily:'var(--font-mono)', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:12}}>Support</h5>
              <p>A few banner ads. Curated affiliate links for gear. Paid newsletter coming, slowly.</p>
            </div>
          </div>
        </section>

        <div style={{margin:'80px 0 0'}}>
          <NewsletterBlock />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
