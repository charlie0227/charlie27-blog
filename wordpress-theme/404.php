<?php /* 404.php */
get_header(); ?>
<main class="container" style="padding:120px 0; text-align:center">
  <div class="serif" style="font-size:120px; font-style:italic; line-height:1; color:var(--accent); margin-bottom:16px">404</div>
  <h1 class="serif" style="font-size:40px; font-weight:400; margin-bottom:16px">Not here.</h1>
  <p class="muted" style="max-width:440px; margin:0 auto 32px">Page is missing, moved, or quietly retired. Start from the home page.</p>
  <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn--accent">Back to the field notes →</a>
</main>
<?php get_footer();
