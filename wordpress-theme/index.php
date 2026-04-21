<?php /* index.php — Homepage (news-style) */
get_header();
$total = wp_count_posts()->publish;
$cats  = get_categories(['hide_empty' => true]);
?>

<?php if (get_option('cfn_ad_970_90')): ?>
<div class="wrap" style="padding-top:var(--s4); padding-bottom:var(--s3)">
  <?php cfn_ad_slot('970x90', 'Leaderboard'); ?>
</div>
<?php endif; ?>

<main style="padding-bottom:var(--s8)">

  <!-- ── Masthead ──────────────────────────────────────────────────── -->
  <div class="wrap">
    <div class="masthead">
      <div class="masthead__left">
        <h1 class="masthead__title">Dev notes on <em>Linux, Docker &amp; backend.</em></h1>
        <div class="masthead__tags">
          <?php foreach ($cats as $c):
            $cls = cfn_category_tag_class($c->slug); ?>
            <a href="<?php echo esc_url(get_category_link($c)); ?>" class="tag <?php echo esc_attr($cls); ?>">
              <?php echo esc_html($c->name); ?>
            </a>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="masthead__right">
        <span class="masthead__stat"><?php echo $total; ?> <em>articles</em></span>
        <span class="masthead__stat"><?php echo count($cats); ?> <em>topics</em></span>
      </div>
    </div>
  </div>

  <div class="wrap masthead-rule"><hr class="rule"></div>

  <!-- ── Main layout ───────────────────────────────────────────────── -->
  <div class="wrap home-layout">
    <div class="home-main">

      <!-- Latest / Featured -->
      <?php
      $hero_q = new WP_Query(['posts_per_page' => 1, 'meta_key' => '_cfn_featured', 'meta_value' => '1']);
      if (!$hero_q->have_posts()) $hero_q = new WP_Query(['posts_per_page' => 1]);
      if ($hero_q->have_posts()): $hero_q->the_post();
        $cats = get_the_category();
        $cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
      ?>
      <article class="post-feature">
        <div class="post-feature__label">
          <?php if ($cats): ?>
            <a href="<?php echo esc_url(get_category_link($cats[0])); ?>"
               class="tag <?php echo esc_attr($cls); ?>">
              <?php echo esc_html($cats[0]->name); ?>
            </a>
          <?php endif; ?>
          <span class="post-feature__pin">★ Latest</span>
          <time class="label" style="margin-left:auto"><?php echo get_the_date('M j, Y'); ?></time>
        </div>
        <h2 class="post-feature__title">
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h2>
        <?php if (get_the_excerpt()): ?>
          <p class="post-feature__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
        <?php endif; ?>
        <div class="post-feature__foot">
          <span><?php echo cfn_reading_time(); ?> min read</span>
          <a href="<?php the_permalink(); ?>" class="post-feature__cta">Read →</a>
        </div>
      </article>
      <?php endif; wp_reset_postdata(); ?>

      <!-- Article card grid -->
      <div class="section-head">
        <h2>All articles</h2>
        <span class="label"><?php echo $total; ?> total</span>
      </div>

      <div class="article-grid">
        <?php
        $latest = new WP_Query(['posts_per_page' => 24, 'offset' => 1]);
        while ($latest->have_posts()): $latest->the_post();
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
        <?php endwhile; wp_reset_postdata(); ?>
      </div>

      <?php the_posts_pagination(['prev_text' => '← Older', 'next_text' => 'Newer →']); ?>

    </div><!-- /.home-main -->

    <!-- Sidebar -->
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
          <?php foreach (get_tags(['number' => 20]) as $t): ?>
            <a href="<?php echo esc_url(get_tag_link($t)); ?>" class="tag">#<?php echo esc_html($t->name); ?></a>
          <?php endforeach; ?>
        </div>
      </div>

      <?php if (get_option('cfn_ad_300_250')): ?>
      <div class="sidebar-block">
        <?php cfn_ad_slot('300x250', 'Display'); ?>
      </div>
      <?php endif; ?>

    </aside>
  </div><!-- /.home-layout -->

</main>

<?php get_footer();
