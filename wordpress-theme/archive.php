<?php /* archive.php — category / tag / date */
get_header(); ?>

<main class="container">
  <section class="category-hero">
    <div class="eyebrow"><?php echo esc_html(get_the_archive_title()); ?></div>
    <h1 class="category-title"><?php single_cat_title(); ?></h1>
    <p class="category-desc"><?php echo wp_kses_post(get_the_archive_description()); ?></p>
  </section>

  <div class="category-list">
    <div>
      <?php if (have_posts()): ?>
        <div style="margin-bottom:48px">
          <?php cfn_ad_slot('728x90', 'In-feed ad'); ?>
        </div>
        <div class="latest-grid" style="margin-bottom:56px">
          <?php while (have_posts()): the_post();
              get_template_part('template-parts/content');
          endwhile; ?>
        </div>
        <div style="display:flex; justify-content:center; margin-top:72px; gap:8px">
          <?php the_posts_pagination(['prev_text' => '← Prev', 'next_text' => 'Next →']); ?>
        </div>
      <?php else: ?>
        <p>No articles yet.</p>
      <?php endif; ?>
    </div>
    <?php get_sidebar(); ?>
  </div>
</main>

<?php get_footer();
