<?php /* template-parts/newsletter-sidebar.php */ ?>
<aside class="newsletter-sidebar">
  <div class="eyebrow">Field Notes · Dev tips</div>
  <h4 class="serif" style="font-size:26px; line-height:1.2; margin:10px 0 8px; font-weight:400">
    Dev notes, when useful.
  </h4>
  <p class="muted" style="font-size:13px; line-height:1.55; margin-bottom:16px">
    Practical fixes for Linux, Docker, and backend dev — no noise.
  </p>
  <form action="<?php echo esc_url(get_option('cfn_newsletter_action', '#')); ?>" method="post" style="display:flex; flex-direction:column; gap:8px">
    <input type="email" name="email" required placeholder="you@domain.com" class="input-minimal" />
    <button class="btn btn--accent btn--sm" type="submit">Subscribe →</button>
  </form>
</aside>
