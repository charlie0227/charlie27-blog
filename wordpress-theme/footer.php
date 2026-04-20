<?php /* footer.php */ ?>
<footer class="site-footer">
  <div class="footer-grid">

    <div class="footer-col">
      <div class="site-logo" style="font-size:18px; margin-bottom:var(--s3)">
        <span class="site-logo__dot"></span><?php bloginfo('name'); ?>
      </div>
      <p style="font-size:13px; line-height:1.65; color:var(--text-2); max-width:300px">
        <?php bloginfo('description'); ?>
      </p>
      <p style="margin-top:var(--s3); font-size:13px; color:var(--text-3); line-height:1.55">
        A self-motivated developer with high passion in coding technique and a great interest in Web Security.
      </p>
    </div>

    <div class="footer-col">
      <h5>Topics</h5>
      <ul>
        <?php $cats = get_categories(['hide_empty' => true, 'number' => 7]);
        foreach ($cats as $c):
          echo '<li><a href="' . esc_url(get_category_link($c)) . '">' . esc_html($c->name) . '</a></li>';
        endforeach; ?>
      </ul>
    </div>

    <div class="footer-col">
      <h5>Site</h5>
      <ul>
        <?php $about = get_page_by_path('about');
        if ($about): ?>
          <li><a href="<?php echo esc_url(get_permalink($about)); ?>">About</a></li>
        <?php endif; ?>
        <li><a href="<?php echo esc_url(get_feed_link()); ?>">RSS Feed</a></li>
        <li><a href="<?php echo esc_url(home_url('/sitemap.xml')); ?>">Sitemap</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h5>Connect</h5>
      <ul>
        <li><a href="https://github.com/charlie0227" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="mailto:charlie19950227@gmail.com">Email</a></li>
      </ul>
    </div>

  </div>

  <div class="footer-bottom">
    <span>© <?php echo date('Y'); ?> Charlie · charlie27.com</span>
    <span>Built with WordPress + Field Notes theme</span>
  </div>
</footer>

<button id="to-top" aria-label="Back to top">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M12 19V5M6 11l6-6 6 6"/>
  </svg>
</button>

<?php wp_footer(); ?>
</body>
</html>
