<?php /* template-parts/newsletter-sidebar.php */ ?>
<div class="newsletter-box">
  <span class="label">Newsletter</span>
  <h4>Dev notes, when useful.</h4>
  <p>Fixes for Linux, Docker, and backend dev — no noise.</p>
  <form action="<?php echo esc_url(get_option('cfn_newsletter_action', '#')); ?>" method="post">
    <input type="email" name="email" required placeholder="you@example.com" class="input">
    <button type="submit" class="btn btn--accent btn--sm">Subscribe →</button>
  </form>
</div>
