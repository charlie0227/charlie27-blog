<?php /* index.php — Homepage (text-first, no-image layout) */
get_header(); ?>

<div class="container" style="padding-top:20px; padding-bottom:16px">
  <?php cfn_ad_slot('970x90', 'Leaderboard · Above the fold'); ?>
</div>

<main class="container" style="padding-bottom:80px">

  <!-- ── Site hero (text-only) ─────────────────────────────────────── -->
  <section class="home-hero">
    <div class="home-hero__left">
      <div class="eyebrow" style="margin-bottom:14px">Charlie's Field Notes</div>
      <h1 class="home-hero__title">
        Dev notes on <em>Linux,</em><br>
        Docker &amp; backend.
      </h1>
      <p class="home-hero__desc"><?php bloginfo('description'); ?></p>
    </div>
    <div class="home-hero__right">
      <?php
      $cats = get_categories(['hide_empty' => true]);
      $total = wp_count_posts()->publish;
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
      <div class="home-cat-chips">
        <?php foreach ($cats as $c):
          $cls = cfn_category_tag_class($c->slug); ?>
          <a href="<?php echo esc_url(get_category_link($c)); ?>" class="tag <?php echo esc_attr($cls); ?>">
            <?php echo esc_html($c->name); ?>
          </a>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <hr class="rule" style="margin:48px 0 40px">

  <!-- ── Main: article list + sidebar ─────────────────────────────── -->
  <div class="home-layout">
    <div class="home-main">

      <!-- Featured / latest post callout -->
      <?php
      $hero_q = new WP_Query(['posts_per_page' => 1, 'meta_key' => '_cfn_featured', 'meta_value' => '1']);
      if (!$hero_q->have_posts()) $hero_q = new WP_Query(['posts_per_page' => 1]);
      if ($hero_q->have_posts()): $hero_q->the_post();
        $cats = get_the_category();
        $cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
      ?>
      <article class="post-row post-row--featured">
        <div class="post-row__meta">
          <?php if ($cats): ?>
            <a href="<?php echo esc_url(get_category_link($cats[0])); ?>" class="tag <?php echo esc_attr($cls); ?>">
              <?php echo esc_html($cats[0]->name); ?>
            </a>
          <?php endif; ?>
          <span class="eyebrow"><?php echo get_the_date(); ?></span>
          <span class="eyebrow post-row__pin">★ Latest</span>
        </div>
        <h2 class="post-row__title">
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h2>
        <?php if (get_the_excerpt()): ?>
          <p class="post-row__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
        <?php endif; ?>
        <div class="post-row__foot">
          <span><?php echo cfn_reading_time(); ?> min read</span>
          <a href="<?php the_permalink(); ?>" class="post-row__cta">Read →</a>
        </div>
      </article>
      <?php endif; wp_reset_postdata(); ?>

      <!-- Article list -->
      <div class="section-head" style="margin-top:48px">
        <div>
          <div class="eyebrow">Latest articles</div>
        </div>
      </div>

      <div class="article-list">
        <?php
        $latest = new WP_Query(['posts_per_page' => 12, 'offset' => 1]);
        while ($latest->have_posts()): $latest->the_post();
          $cats = get_the_category();
          $cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
        ?>
        <article class="post-row">
          <div class="post-row__meta">
            <?php if ($cats): ?>
              <a href="<?php echo esc_url(get_category_link($cats[0])); ?>" class="tag <?php echo esc_attr($cls); ?>">
                <?php echo esc_html($cats[0]->name); ?>
              </a>
            <?php endif; ?>
            <span class="eyebrow"><?php echo get_the_date(); ?></span>
          </div>
          <h3 class="post-row__title">
            <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
          </h3>
          <?php if (get_the_excerpt()): ?>
            <p class="post-row__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
          <?php endif; ?>
          <div class="post-row__foot">
            <span><?php echo cfn_reading_time(); ?> min read</span>
            <a href="<?php the_permalink(); ?>" class="post-row__cta">Read →</a>
          </div>
        </article>
        <?php endwhile; wp_reset_postdata(); ?>
      </div>

      <?php if (function_exists('the_posts_pagination')): ?>
      <div style="margin-top:48px">
        <?php the_posts_pagination(['prev_text' => '← Older', 'next_text' => 'Newer →']); ?>
      </div>
      <?php endif; ?>

    </div><!-- /.home-main -->
    <?php get_sidebar(); ?>
  </div>

  <div style="margin:64px 0">
    <?php cfn_ad_slot('970x250', 'Billboard · Mid-page'); ?>
  </div>

  <hr class="rule" style="margin:64px 0">
  <?php get_template_part('template-parts/newsletter-inline'); ?>

</main>

<?php get_footer();
