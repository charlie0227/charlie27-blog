<?php /* template-parts/newsletter-inline.php */ ?>
<section class="newsletter-inline">
  <div class="newsletter-inline__grid">
    <div>
      <span class="label">Field Notes · Dev newsletter</span>
      <h3>Short notes on real-world dev problems.</h3>
      <p>Practical tips on Linux, Docker, backend dev, and the tools that actually work. No fluff — just the stuff that saved me an hour.</p>
    </div>
    <form action="<?php echo esc_url(get_option('cfn_newsletter_action', '#')); ?>" method="post">
      <input type="email" name="email" required placeholder="you@example.com" class="input">
      <button type="submit" class="btn btn--accent">Subscribe →</button>
      <p style="font-family:var(--mono); font-size:10px; letter-spacing:.08em; color:var(--text-4); text-transform:uppercase">
        No spam · Unsubscribe anytime
      </p>
    </form>
  </div>
</section>
