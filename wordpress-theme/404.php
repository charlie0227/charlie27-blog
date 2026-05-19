<?php /* 404.php */
get_header(); ?>
<main class="wrap" style="padding:var(--s8) 0; text-align:center">
  <div class="serif" style="font-size:clamp(80px,12vw,140px); font-style:italic; line-height:1; color:var(--accent); margin-bottom:var(--s4)">404</div>
  <h1 class="serif" style="font-size:clamp(28px,4vw,40px); font-weight:600; margin-bottom:var(--s3); letter-spacing:-.02em">Not here.</h1>
  <p class="muted" style="max-width:440px; margin:0 auto var(--s5); padding:0 var(--s4); font-size:15px; line-height:1.6">
    Page is missing, moved, or quietly retired. Start from the home page.
  </p>
  <a href="<?php echo esc_url(home_url('/')); ?>" class="btn btn--accent">Back to the field notes →</a>
</main>
<?php get_footer();
