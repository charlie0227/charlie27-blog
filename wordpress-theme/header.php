<?php /* header.php */ ?>
<!doctype html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width,initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<div id="reading-bar"></div>

<header class="site-header">
  <div class="site-header__inner">

    <!-- Logo -->
    <a href="<?php echo esc_url(home_url('/')); ?>" class="site-logo">
      charlie<span style="opacity:.35;font-weight:400">/</span>dev
    </a>

    <!-- Category nav -->
    <nav class="site-nav" aria-label="Categories">
      <?php
      $nav_cats = get_categories(['hide_empty' => true, 'orderby' => 'count', 'order' => 'DESC', 'number' => 6]);
      foreach ($nav_cats as $c):
        $active   = (is_category($c->term_id)) ? ' is-active' : '';
        $tag_key  = str_replace(['tag--', 'tech'], ['', 'accent'], cfn_category_tag_class($c->slug));
        $dot_color = "var(--cat-{$tag_key}, var(--accent))";
      ?>
        <a href="<?php echo esc_url(get_category_link($c)); ?>"
           class="site-nav__link<?php echo $active; ?>">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;
                       background:<?php echo esc_attr($dot_color); ?>;
                       margin-right:5px;vertical-align:1px;
                       opacity:<?php echo $active ? '1' : '.5'; ?>"></span>
          <?php echo esc_html($c->name); ?>
        </a>
      <?php endforeach; ?>
    </nav>

    <!-- Actions -->
    <div class="site-header__actions">
      <button class="icon-btn" id="search-btn" aria-label="Search" title="Search (⌘K)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
      </button>
      <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/>
        </svg>
      </button>
      <a href="<?php echo esc_url(get_feed_link()); ?>" class="icon-btn" aria-label="RSS feed">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/>
        </svg>
      </a>
    </div>

  </div>

  <!-- Search bar (hidden by default, toggled by JS) -->
  <div class="site-search" id="site-search" hidden>
    <div class="site-search__inner">
      <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>">
        <input type="search" name="s" class="site-search__input"
               placeholder="Search articles…"
               value="<?php echo esc_attr(get_search_query()); ?>"
               autocomplete="off" autofocus>
      </form>
      <button class="icon-btn" id="search-close" aria-label="Close search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  </div>
</header>
