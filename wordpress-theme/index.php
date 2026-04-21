<?php /* index.php — Homepage */
get_header(); ?>

<?php if (get_option('cfn_ad_970_90')): ?>
<div class="wrap" style="padding-top:var(--s4); padding-bottom:var(--s3)">
  <?php cfn_ad_slot('970x90', 'Leaderboard'); ?>
</div>
<?php endif; ?>

<main class="wrap" style="padding-bottom:var(--s9)">

  <!-- ── Hero ──────────────────────────────────────────────────────── -->
  <section class="home-hero">
    <div class="home-hero__left">
      <span class="label">Charlie's Field Notes</span>
      <h1 class="home-hero__title">
        Dev notes on <em>Linux,</em><br>
        Docker &amp; backend.
      </h1>
      <p class="home-hero__desc"><?php bloginfo('description'); ?></p>
    </div>
    <div class="home-hero__right">
      <?php
      $total = wp_count_posts()->publish;
      $cats  = get_categories(['hide_empty' => true]);
      ?>
      <div class="home-stats">
        <div class="home-stat">
          <span class="home-stat__num"><?php echo $total; ?></span>
          <span class="home-stat__label">Articles</span>
        </div>
        <div class="home-stat">
          <span class="home-stat__num"><?php echo count($cats); ?></span>
          <span class="home-stat__label">Topics</span>
        </div>
      </div>
      <div class="home-cat-cloud">
        <?php foreach ($cats as $c):
          $cls = cfn_category_tag_class($c->slug); ?>
          <a href="<?php echo esc_url(get_category_link($c)); ?>" class="tag <?php echo esc_attr($cls); ?>">
            <?php echo esc_html($c->name); ?>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <hr class="rule" style="margin:var(--s6) 0 var(--s7)">

  <!-- ── Main + Sidebar ────────────────────────────────────────────── -->
  <div class="home-layout">
    <div class="home-main">

      <!-- Featured / latest post -->
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
          <span class="label" style="margin-left:auto"><?php echo get_the_date(); ?></span>
        </div>
        <h2 class="post-feature__title">
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h2>
        <?php if (get_the_excerpt()): ?>
          <p class="post-feature__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
        <?php endif; ?>
        <div class="post-feature__foot">
          <span><?php echo cfn_reading_time(); ?> min read</span>
          <a href="<?php the_permalink(); ?>" class="post-feature__cta">Read article →</a>
        </div>
      </article>
      <?php endif; wp_reset_postdata(); ?>

      <!-- Article list -->
      <div class="section-head" style="margin-top:var(--s7)">
        <h2>All articles</h2>
        <span class="label"><?php echo $total - 1; ?> more</span>
      </div>

      <div class="article-list">
        <?php
        $latest = new WP_Query(['posts_per_page' => 20, 'offset' => 1]);
        while ($latest->have_posts()): $latest->the_post();
          $cats = get_the_category();
          $cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
        ?>
        <article class="post-row">
          <div class="post-row__side">
            <?php if ($cats): ?>
              <a href="<?php echo esc_url(get_category_link($cats[0])); ?>"
                 class="tag <?php echo esc_attr($cls); ?>">
                <?php echo esc_html($cats[0]->name); ?>
              </a>
            <?php endif; ?>
            <span class="post-row__date"><?php echo get_the_date('M j, Y'); ?></span>
            <span class="post-row__time"><?php echo cfn_reading_time(); ?> min</span>
          </div>
          <div class="post-row__main">
            <h3 class="post-row__title">
              <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
            </h3>
            <?php if (get_the_excerpt()): ?>
              <p class="post-row__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
            <?php endif; ?>
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
          <?php foreach (get_tags(['number' => 15]) as $t): ?>
            <a href="<?php echo esc_url(get_tag_link($t)); ?>" class="tag">#<?php echo esc_html($t->name); ?></a>
          <?php endforeach; ?>
        </div>
      </div>

      <?php if (get_option('cfn_ad_300_250')): ?>
      <div class="sidebar-block">
        <span class="label">Sponsored</span>
        <?php cfn_ad_slot('300x250', 'Display'); ?>
      </div>
      <?php endif; ?>

    </aside>
  </div><!-- /.home-layout -->

  <?php if (get_option('cfn_ad_970_250')): ?>
  <div style="margin:var(--s8) 0">
    <?php cfn_ad_slot('970x250', 'Billboard'); ?>
  </div>
  <?php endif; ?>


</main>

<?php get_footer();
