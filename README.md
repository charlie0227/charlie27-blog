# Charlie's Blog — WordPress theme + auto-deploy

WordPress theme for charlie27.com. Nordic-minimal, earth-tone, cream + terracotta.

## Folders

- `wordpress-theme/` — the actual WP theme (upload this folder to `/wp-content/themes/`)
- `.github/workflows/deploy.yml` — auto-deploy on push to main
- `*.html`, `assets/` — HTML mockups for design iteration (not deployed)

## Local setup

```bash
git clone https://github.com/charlie0227/charlie27-blog.git
cd charlie27-blog
```

## First deploy (manual, one time)

1. WP admin → Appearance → Themes → Add New → Upload `wordpress-theme/` as a zip
2. Activate
3. Customizer → Ad slots → paste ad codes
4. Build nav menu → assign to Primary / Footer

## Auto-deploy via GitHub Actions

### Pick your method, then set the repo variable

GitHub repo → **Settings → Secrets and variables → Actions → Variables → New variable**

| Name            | Value            |
|-----------------|------------------|
| `DEPLOY_METHOD` | `sftp` / `ftp` / `wp-api` |

### Set secrets based on method

**Option A — SFTP (recommended)**
```
SFTP_HOST        = your.server.com
SFTP_USER        = wpuser
SFTP_PASSWORD    = ••••  (or use SFTP_KEY for key auth)
SFTP_PORT        = 22
SFTP_PATH        = /home/you/public_html/wp-content/themes/charlie-field-notes
```

**Option B — FTP**
```
FTP_SERVER       = ftp.your.server.com
FTP_USERNAME     = wpuser
FTP_PASSWORD     = ••••
FTP_PATH         = /public_html/wp-content/themes/charlie-field-notes/
```

**Option C — WP REST API** (requires WP 6.5+ with theme upload endpoint)
```
WP_URL           = https://www.charlie27.com
WP_USER          = admin
WP_APP_PASSWORD  = ••••  (generate in WP Users → Profile → Application Passwords)
```

### Then push

```bash
git add .
git commit -m "Deploy"
git push origin main
```

Action runs automatically → theme updates on site within ~30s. Watch it at
`https://github.com/charlie0227/charlie27-blog/actions`.

## Writing posts via Claude

```bash
curl -X POST "https://www.charlie27.com/wp-json/wp/v2/posts" \
  -u "admin:$WP_APP_PASSWORD" \
  -H "Content-Type: application/json" \
  -d '{
    "title":   "Your post title",
    "content": "<p>Post body as HTML…</p>",
    "status":  "publish",
    "categories": [2]
  }'
```
