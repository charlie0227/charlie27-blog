# Charlie's Field Notes — WordPress Theme Skeleton

This folder contains a starter WordPress theme that mirrors the HTML mockup.
Drop it into `/wp-content/themes/` and activate. Copy `assets/design-system.css`
and `assets/pages.css` from the mockup into `/assets/`.

## File structure

```
charlie-field-notes/
├── style.css              Theme metadata + base styles
├── functions.php          Theme setup, enqueues, menus, sidebars
├── header.php             Site header + nav
├── footer.php             Site footer
├── index.html             Fallback home (not used; index.php is)
├── index.php              Homepage template (info-rich grid)
├── single.php             Single post template (with TOC, progress)
├── archive.php            Category / tag / date archive
├── page.php               Generic pages (About, etc.)
├── page-about.php         About page template
├── search.php             Search results
├── sidebar.php            Reusable sidebar
├── searchform.php         Search form partial
├── 404.php                Not-found page
├── template-parts/
│   ├── content.php           post card in a loop
│   ├── content-horizontal.php
│   ├── content-featured.php
│   ├── ad-slot.php           Ad placeholder / ad-code injector
│   ├── newsletter-inline.php
│   └── newsletter-sidebar.php
└── assets/
    ├── design-system.css   Copy from mockup
    ├── pages.css           Copy from mockup
    └── site.js             Reading progress + theme toggle
```

## Mapping mockup → WordPress

| Mockup file          | WordPress template |
|----------------------|--------------------|
| `index.html`         | `index.php`        |
| `post.html`          | `single.php`       |
| `category.html`      | `archive.php`      |
| `about.html`         | `page-about.php`   |
| `search.html`        | `search.php`       |

Ads are injected via `template-parts/ad-slot.php` — it reads ad code from Theme
Options (via `get_option('cfn_ad_970x90')` etc.) so you can paste AdSense /
Ezoic slots without touching template files.

## Claude auto-posting

The theme accepts standard WordPress REST API calls, so Claude can post via:

```
POST /wp-json/wp/v2/posts
Authorization: Bearer <app-password>
{ "title": "...", "content": "...", "status": "publish", "categories": [2] }
```

The included Gutenberg block styles are scoped to `.post-body` so Claude-generated
HTML renders cleanly through the custom post content filter.
