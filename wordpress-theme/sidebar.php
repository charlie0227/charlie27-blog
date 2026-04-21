<?php /* sidebar.php */ ?>
<aside class="home-sidebar">
  <div class="sidebar-block">
    <span class="label">Topics</span>
    <ul class="sidebar-cats">
      <?php foreach (get_categories(['hide_empty' => true]) as $c): ?>
        <li>
          <a href="<?php echo esc_url(get_category_link($c)); ?>"><?php echo esc_html($c->name); ?></a>
          <span class="count"><?php echo $c->count; ?></span>
        </li>
      <?php endforeach; ?>
    </ul>
  </div>

  <div class="sidebar-block">
    <span class="label">Tags</span>
    <div class="tag-cloud" style="margin-top:var(--s3)">
      <?php foreach (get_tags(['number' => 15]) as $t): ?>
        <a href="<?php echo esc_url(get_tag_link($t)); ?>" class="tag">#<?php echo esc_html($t->name); ?></a>
      <?php endforeach; ?>
    </div>
  </div>
</aside>
