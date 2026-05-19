<?php /* header.php */ ?>
<!doctype html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#F5EDDF" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#171716" media="(prefers-color-scheme: dark)">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<a class="skip-link" href="#main-content">Skip to content</a>
<div id="reading-bar"></div>

<header class="site-header">
  <div class="site-header__inner">

    <!-- Logo -->
    <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo">
      <span class="site-logo__dot" aria-hidden="true"></span>
      charlie<span style="opacity:.35;font-weight:400">/</span>dev
    </a>

    <!-- Category nav (desktop only) -->
    <nav class="site-nav" aria-label="Categories">
      <?php
      $nav_slugs = ['frontend', 'backend', 'devops', 'data', 'security', 'trivia', 'ai', 'industry', 'daily-news'];
      $nav_cats_raw = get_categories(['hide_empty' => false, 'slug' => $nav_slugs]);
      $by_slug = [];
      foreach ($nav_cats_raw as $c) { $by_slug[$c->slug] = $c; }
      $nav_cats = [];
      foreach ($nav_slugs as $s) { if (isset($by_slug[$s])) $nav_cats[] = $by_slug[$s]; }
      foreach ($nav_cats as $c):
        $active   = (is_category($c->term_id)) ? ' is-active' : '';
        $tag_key  = str_replace(['tag--', 'tech'], ['', 'accent'], cfn_category_tag_class($c->slug));
        $dot_color = "var(--cat-{$tag_key}, var(--accent))";
      ?>
        <a href="<?php echo esc_url(get_category_link($c)); ?>"
           class="site-nav__link<?php echo $active; ?>">
          <span class="site-nav__dot" style="background:<?php echo esc_attr($dot_color); ?>;
                       opacity:<?php echo $active ? '1' : '.55'; ?>"></span>
          <?php echo esc_html($c->name); ?>
        </a>
      <?php endforeach; ?>
    </nav>

    <!-- Actions -->
    <div class="site-header__actions">
      <button class="icon-btn" id="search-btn" aria-label="Search" title="Search (⌘K)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
      </button>
      <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>
        </svg>
      </button>
      <a href="<?php echo esc_url(get_feed_link()); ?>" class="icon-btn site-icon-rss" aria-label="RSS feed">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>
        </svg>
      </a>
    </div>

  </div>

  <!-- Mobile category strip (horizontally scrollable) -->
  <nav class="site-nav-mobile" aria-label="Categories">
    <div class="site-nav-mobile__inner">
      <?php foreach ($nav_cats as $c):
        $active   = is_category($c->term_id);
        $tag_key  = str_replace(['tag--','tech'], ['','accent'], cfn_category_tag_class($c->slug));
        $dot_color = "var(--cat-{$tag_key}, var(--accent))";
      ?>
        <a href="<?php echo esc_url(get_category_link($c)); ?>"
           class="site-nav-mobile__link<?php echo $active ? ' is-active' : ''; ?>">
          <span class="site-nav-mobile__dot" style="background:<?php echo esc_attr($dot_color); ?>"></span>
          <?php echo esc_html($c->name); ?>
        </a>
      <?php endforeach; ?>
    </div>
  </nav>

  <!-- Search bar (toggled by JS) -->
  <div class="site-search" id="site-search" hidden>
    <div class="site-search__inner">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color:var(--text-3);flex-shrink:0" aria-hidden="true">
        <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
      </svg>
      <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" style="flex:1;display:flex">
        <input type="search" name="s" class="site-search__input"
               placeholder="Search articles…"
               value="<?php echo esc_attr(get_search_query()); ?>"
               autocomplete="off" autofocus>
      </form>
      <button class="icon-btn" id="search-close" aria-label="Close search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</header>

<div id="main-content" tabindex="-1"></div>
