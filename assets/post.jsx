/* Single Post page with TOC + reading progress + aside */

const { useState, useEffect, useRef } = React;

const SECTIONS = [
  { id: 'why',       label: 'Why image size matters'         },
  { id: 'anatomy',   label: 'Anatomy of a multi-stage build' },
  { id: 'node',      label: 'Example: Node.js service'       },
  { id: 'go',        label: 'Example: Go binary'             },
  { id: 'patterns',  label: 'Patterns & gotchas'             },
  { id: 'results',   label: 'Real numbers from prod'         },
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
              <a href="category.html?c=docker" className="tag tag--docker">Docker</a>
              <span className="eyebrow">Guide № 047 · April 18, 2026</span>
            </div>
            <h1 className="post-title">
              Docker multi-stage builds: cut your image size by <em>80%</em>
            </h1>
            <p style={{fontSize:20, lineHeight:1.55, color:'var(--text-muted)', maxWidth:720, fontFamily:'var(--font-serif)', fontStyle:'italic'}}>
              Stop shipping your compiler to production. A step-by-step guide to multi-stage
              Dockerfiles with real numbers from three production services.
            </p>
            <div className="post-header-meta">
              <div className="post-author">
                <div className="post-author__avatar">C</div>
                <div className="post-author__info">
                  <span className="post-author__name">Charlie Chen</span>
                  <span className="post-author__role">Backend engineer · Taipei</span>
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
            <div className="img-placeholder img-placeholder--docker">Docker · Multi-stage build diagram · 16:8</div>
            <div className="figure-caption" style={{textAlign:'left', marginLeft:4}}>
              Before and after: a 1.2 GB Node image collapsed to 94 MB using multi-stage builds
            </div>
          </div>

          <div className="post-layout">
            <PostTOC />

            <div className="post-body">
              <p className="lede">
                A 1.2 GB Node image. A 94 MB Node image. Same app, same dependencies,
                same behaviour in production. The difference is one Dockerfile pattern
                that almost nobody uses — until they see the CI push times.
              </p>

              <h2 id="why">Why image size matters</h2>
              <p>
                Large images cost you in three places: push/pull time on every deploy,
                cold-start latency on container schedulers, and attack surface for CVEs
                in packages you never actually run. Build tools, compilers, and dev
                dependencies have no business being in a production image.
              </p>
              <p>
                The naive fix is a long <code>.dockerignore</code> and some manual
                <code>RUN rm -rf</code> calls. Multi-stage builds are the real answer — they
                let Docker&rsquo;s own layer mechanism do the work.
              </p>

              <blockquote>
                The rule: build in one stage, copy only the artifact into the next.
                The compiler never touches prod.
                <cite>— Docker best practices, 2026</cite>
              </blockquote>

              <h2 id="anatomy">Anatomy of a multi-stage build</h2>
              <p>
                Each <code>FROM</code> instruction starts a new stage. You name stages with
                <code>AS</code>, and copy files between them with <code>COPY --from</code>.
                Only the final stage becomes the image you ship.
              </p>

              <CodeBlock lang="dockerfile" filename="Dockerfile">
{`# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: production runtime
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/server.js"]`}
              </CodeBlock>

              <p>
                The <code>builder</code> stage includes the full npm dependency tree, TypeScript
                compiler, and source files. None of that lands in <code>runtime</code> — only
                the compiled output and production <code>node_modules</code>.
              </p>

              <h2 id="node">Example: Node.js service</h2>
              <p>
                Here&rsquo;s the pattern I use for a typical Express + TypeScript API. The key
                insight is separating <code>devDependencies</code> from production deps before
                the copy step:
              </p>

              <CodeBlock lang="dockerfile" filename="Dockerfile.prod">
{`FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY tsconfig.json .
COPY src ./src
RUN npx tsc --outDir dist

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps    /app/node_modules ./node_modules
COPY --from=builder /app/dist         ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/index.js"]`}
              </CodeBlock>

              <div className="figure">
                <div className="img-placeholder img-placeholder--docker" style={{aspectRatio:'16/9'}}>
                  Diagram · Three-stage build pipeline
                </div>
                <div className="figure-caption">
                  Fig. 1 — The <code>deps</code> and <code>builder</code> stages run in parallel on BuildKit. Only <code>runner</code> ships.
                </div>
              </div>

              <h2 id="go">Example: Go binary</h2>
              <p>
                Go is the dream case for multi-stage builds. The final image can be
                <code>scratch</code> — literally nothing but your statically compiled binary:
              </p>

              <CodeBlock lang="dockerfile" filename="Dockerfile">
{`FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o server .

FROM scratch
COPY --from=builder /app/server /server
EXPOSE 8080
ENTRYPOINT ["/server"]`}
              </CodeBlock>

              <p>
                Result: a 12 MB image from a 700 MB build environment. <code>-ldflags="-s -w"</code>
                strips debug symbols and DWARF info — safe for production, saves another 30%.
              </p>

              <h2 id="patterns">Patterns &amp; gotchas</h2>

              <h3>Use BuildKit cache mounts for package managers</h3>
              <CodeBlock lang="dockerfile">
{`# Cache npm downloads across builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --prefer-offline`}
              </CodeBlock>

              <h3>Things that catch people out</h3>
              <ul>
                <li>Copying <code>.env</code> files into the builder stage — they get baked into layers.</li>
                <li>Forgetting <code>--chown</code> on COPY when running as non-root in the final stage.</li>
                <li>Using <code>COPY . .</code> before <code>RUN npm ci</code> — busts the cache on every code change.</li>
                <li>Not setting <code>NODE_ENV=production</code> — skips some runtime optimisations.</li>
              </ul>

              <h2 id="results">Real numbers from prod</h2>
              <p>
                After migrating three services at my last job:
              </p>
              <ul>
                <li><strong>API service (Node/TS):</strong> 1.24 GB → 148 MB (88% reduction)</li>
                <li><strong>Worker service (Go):</strong> 712 MB → 14 MB (98% reduction)</li>
                <li><strong>Next.js frontend:</strong> 2.1 GB → 310 MB (85% reduction)</li>
              </ul>
              <p>
                Deployment push times dropped from ~4 minutes to under 40 seconds on a
                standard CI runner. Cold starts on the scheduler went from 8s to under 2s.
              </p>

              <hr />

              <p>
                The pattern is worth the extra 10 lines of Dockerfile every time.
                Once you see a 94 MB image where a 1.2 GB one used to live, you
                don&rsquo;t go back.
              </p>

              <div className="post-end">
                <div className="eyebrow" style={{marginBottom:16}}>End of guide № 047</div>
                <div style={{display:'flex', gap:12, marginBottom:24}}>
                  <button className="btn btn--accent"><Icon.Heart /> Helpful (312)</button>
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
