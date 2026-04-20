<?php /* page.php — generic page */
get_header();
while (have_posts()): the_post(); ?>

<main class="container">
  <header class="post-header">
    <h1 class="post-title"><?php the_title(); ?></h1>
  </header>
  <div class="post-layout">
    <div></div>
    <div class="post-body">
      <?php the_content(); ?>
    </div>
    <div></div>
  </div>
</main>

<?php endwhile; get_footer();
