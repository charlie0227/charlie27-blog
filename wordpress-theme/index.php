<?php /* index.php — Homepage */
get_header(); ?>

<div class="container" style="padding-top:20px; padding-bottom:16px">
  <?php cfn_ad_slot('970x90', 'Leaderboard · Above the fold'); ?>
</div>

<main class="container" style="padding-bottom:40px">

  <?php /* Hero — featured post */
  $hero_q = new WP_Query(['posts_per_page' => 1, 'meta_key' => '_cfn_featured', 'meta_value' => '1']);
  if (!$hero_q->have_posts()) $hero_q = new WP_Query(['posts_per_page' => 1]);
  if ($hero_q->have_posts()): $hero_q->the_post(); ?>
  <section class="hero hero--editorial">
    <div class="hero-grid">
      <div class="hero-text">
        <div class="eyebrow">
          <?php the_category(' · '); ?> · <?php echo get_the_date(); ?>
        </div>
        <h1 class="serif hero-title"><?php the_title(); ?></h1>
        <p class="hero-lede"><?php echo esc_html(get_the_excerpt()); ?></p>
        <div class="hero-meta">
          <span class="post-meta">
            <span><?php the_author(); ?></span>
            <span class="post-meta__dot"></span>
            <span><?php echo cfn_reading_time(); ?> min read</span>
          </span>
        </div>
        <a href="<?php the_permalink(); ?>" class="btn btn--accent">Read the essay →</a>
      </div>
      <div class="hero-image">
        <?php if (has_post_thumbnail()): ?>
          <?php the_post_thumbnail('cfn-hero', ['style' => 'aspect-ratio:4/5; object-fit:cover; border-radius:6px']); ?>
        <?php else: ?>
          <div class="img-placeholder img-placeholder--forest" style="aspect-ratio:4/5; border-radius:6px">Hero</div>
        <?php endif; ?>
      </div>
    </div>
  </section>
  <?php endif; wp_reset_postdata(); ?>

  <hr class="rule" style="margin:64px 0 48px">

  <div class="home-layout">
    <div>
      <section class="latest-grid-section">
        <div class="section-head">
          <div>
            <div class="eyebrow">Latest dispatches</div>
            <h2 class="serif section-title">Recently filed</h2>
          </div>
        </div>
        <div class="latest-grid">
          <?php
          $latest = new WP_Query(['posts_per_page' => 6, 'offset' => 1]);
          while ($latest->have_posts()): $latest->the_post();
              get_template_part('template-parts/content');
          endwhile;
          wp_reset_postdata();
          ?>
        </div>
      </section>
    </div>
    <?php get_sidebar(); ?>
  </div>

  <div style="margin:64px 0">
    <?php cfn_ad_slot('970x250', 'Billboard · Mid-page'); ?>
  </div>

  <hr class="rule" style="margin:72px 0">
  <?php get_template_part('template-parts/newsletter-inline'); ?>

</main>

<?php get_footer();
