<?php /* sidebar.php */ ?>
<aside class="home-sidebar">
  <?php get_template_part('template-parts/newsletter-sidebar'); ?>

  <div class="sidebar-section">
    <div class="eyebrow">Sponsored</div>
    <?php cfn_ad_slot('300x250', 'Display'); ?>
  </div>

  <?php if (is_active_sidebar('sidebar-primary')): ?>
    <?php dynamic_sidebar('sidebar-primary'); ?>
  <?php else: ?>
    <div class="sidebar-section">
      <div class="eyebrow">Tags</div>
      <div class="tag-cloud" style="margin-top:14px">
        <?php
        $tags = get_tags(['number' => 12]);
        foreach ($tags as $t) {
            echo '<a href="' . esc_url(get_tag_link($t)) . '" class="tag">#' . esc_html($t->name) . '</a>';
        }
        ?>
      </div>
    </div>

    <div class="sidebar-section sidebar-archive">
      <div class="eyebrow">Archive</div>
      <ul>
        <?php wp_get_archives(['type' => 'monthly', 'limit' => 6, 'show_post_count' => true]); ?>
      </ul>
    </div>
  <?php endif; ?>

  <div class="sidebar-section">
    <div class="eyebrow">Sponsored</div>
    <?php cfn_ad_slot('300x600', 'Half-page'); ?>
  </div>
</aside>
