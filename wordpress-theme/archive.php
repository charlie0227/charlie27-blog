<?php /* archive.php — category / tag / date archive */
get_header(); ?>

<main style="padding-bottom:var(--s8)">
  <div class="wrap">

    <!-- Archive header -->
    <div class="archive-header">
      <span class="label">
        <?php
        if (is_category()) echo 'Category';
        elseif (is_tag()) echo 'Tag';
        elseif (is_date()) echo 'Archive';
        else echo 'Browse';
        ?>
      </span>
      <h1 class="archive-title"><?php echo esc_html(get_queried_object()->name ?? get_the_archive_title()); ?></h1>
      <?php if (get_the_archive_description()): ?>
        <p style="font-size:15px; color:var(--text-2); line-height:1.6; margin-top:var(--s2); max-width:600px">
          <?php echo wp_kses_post(get_the_archive_description()); ?>
        </p>
      <?php endif; ?>
    </div>

    <!-- Layout: articles + sidebar -->
    <div class="home-layout" style="margin-top:var(--s5)">
      <div>

        <?php if (have_posts()): ?>
        <div class="article-grid">
          <?php while (have_posts()): the_post();
            $cats = get_the_category();
            $cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
          ?>
          <article class="post-card">
            <div class="post-card__meta">
              <?php if ($cats): ?>
                <a href="<?php echo esc_url(get_category_link($cats[0])); ?>"
                   class="tag <?php echo esc_attr($cls); ?>">
                  <?php echo esc_html($cats[0]->name); ?>
                </a>
              <?php endif; ?>
              <time class="post-card__date"><?php echo get_the_date('M j'); ?></time>
            </div>
            <h3 class="post-card__title">
              <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h3>
            <?php if (get_the_excerpt()): ?>
              <p class="post-card__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
            <?php endif; ?>
            <div class="post-card__foot">
              <span><?php echo cfn_reading_time(); ?> min</span>
              <a href="<?php the_permalink(); ?>">Read →</a>
            </div>
          </article>
          <?php endwhile; ?>
        </div>

        <?php the_posts_pagination(['prev_text' => '← Older', 'next_text' => 'Newer →']); ?>

        <?php else: ?>
          <p style="color:var(--text-2); padding:var(--s6) 0">No articles found.</p>
        <?php endif; ?>

      </div>

      <!-- Sidebar -->
      <aside class="home-sidebar">
        <div class="sidebar-block">
          <span class="label">Topics</span>
          <ul class="sidebar-cats">
            <?php foreach (get_categories(['hide_empty' => true]) as $c): ?>
              <li>
                <a href="<?php echo esc_url(get_category_link($c)); ?>"
                   class="<?php echo is_category($c->term_id) ? 'sidebar-active' : ''; ?>">
                  <?php echo esc_html($c->name); ?>
                </a>
                <span class="count"><?php echo $c->count; ?></span>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <div class="sidebar-block">
          <span class="label">Tags</span>
          <div class="tag-cloud" style="margin-top:var(--s3)">
            <?php foreach (get_tags(['number' => 20]) as $t): ?>
              <a href="<?php echo esc_url(get_tag_link($t)); ?>" class="tag">#<?php echo esc_html($t->name); ?></a>
            <?php endforeach; ?>
          </div>
        </div>
      </aside>

    </div>
  </div>
</main>

<?php get_footer();
