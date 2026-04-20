<?php /* footer.php */ ?>
<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="logo" style="font-size:18px; margin-bottom:12px"><span class="logo__mark"></span><?php bloginfo('name'); ?></div>
      <p style="max-width:320px; line-height:1.6"><?php bloginfo('description'); ?></p>
    </div>
    <div class="footer-col">
      <h5>Sections</h5>
      <ul>
        <?php
        $cats = get_categories(['hide_empty' => false, 'number' => 6]);
        foreach ($cats as $c) {
            echo '<li><a href="' . esc_url(get_category_link($c)) . '">' . esc_html($c->name) . '</a></li>';
        }
        ?>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Site</h5>
      <ul>
        <?php
        wp_nav_menu([
            'theme_location' => 'footer',
            'container'      => false,
            'items_wrap'     => '%3$s',
            'fallback_cb'    => function() {
                $about = get_page_by_path('about');
                if ($about) echo '<li><a href="' . esc_url(get_permalink($about)) . '">About</a></li>';
                echo '<li><a href="' . esc_url(get_feed_link()) . '">RSS</a></li>';
            },
        ]);
        ?>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Elsewhere</h5>
      <ul>
        <li><a href="#">Email</a></li>
        <li><a href="<?php echo esc_url(get_feed_link()); ?>">RSS</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© <?php echo date('Y'); ?> <?php bloginfo('name'); ?> · All words original unless quoted</span>
    <span>Powered by WordPress + Charlie's Field Notes theme</span>
  </div>
</footer>

<button class="to-top" id="to-top" aria-label="Scroll to top">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
</button>

<?php wp_footer(); ?>
</body>
</html>
