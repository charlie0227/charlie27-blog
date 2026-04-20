<?php /* header.php */ ?>
<!doctype html>
<html <?php language_attributes(); ?> data-theme="light">
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<div class="reading-progress" id="reading-progress"></div>

<header class="site-header">
  <div class="site-header__inner">
    <div class="site-header__left">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">
        <span class="logo__mark"></span><?php bloginfo('name'); ?>
      </a>
    </div>
    <nav class="nav">
      <?php
      wp_nav_menu([
          'theme_location' => 'primary',
          'container'      => false,
          'menu_class'     => '',
          'items_wrap'     => '%3$s',
          'fallback_cb'    => function() {
              $cats = get_categories(['hide_empty' => false]);
              foreach ($cats as $c) {
                  $active = (is_category($c->term_id)) ? 'is-active' : '';
                  echo '<a href="' . esc_url(get_category_link($c)) . '" class="' . $active . '">' . esc_html($c->name) . '</a>';
              }
              $about = get_page_by_path('about');
              if ($about) echo '<a href="' . esc_url(get_permalink($about)) . '">About</a>';
          },
      ]);
      ?>
    </nav>
    <div class="site-header__right">
      <a href="<?php echo esc_url(home_url('/?s=')); ?>" class="search-box">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
        Search articles <kbd>⌘K</kbd>
      </a>
      <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>
      </button>
      <a href="<?php echo esc_url(get_feed_link()); ?>" class="icon-btn" aria-label="RSS">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1"/></svg>
      </a>
    </div>
  </div>
</header>
