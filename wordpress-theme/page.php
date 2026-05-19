<?php /* page.php — generic page */
get_header();
while (have_posts()): the_post(); ?>

<main class="wrap" style="padding-bottom:var(--s8)">
  <header class="post-header">
    <h1 class="post-title"><?php the_title(); ?></h1>
  </header>
  <div class="page-body">
    <?php the_content(); ?>
  </div>
</main>

<?php endwhile; get_footer();
