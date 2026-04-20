<?php /* template-parts/newsletter-inline.php */ ?>
<section class="newsletter-inline">
  <div class="newsletter-inline__grid">
    <div>
      <div class="eyebrow">Field Notes · Dev newsletter</div>
      <h3 class="serif" style="font-size:40px; line-height:1.1; margin:14px 0 10px; letter-spacing:-0.02em; font-weight:400; max-width:480px">
        Short notes on real-world dev problems.
      </h3>
      <p class="muted" style="font-size:15px; max-width:480px; line-height:1.6">
        Practical tips on Linux, Docker, backend dev, and the tools that actually work. No fluff — just the stuff that saved me an hour.
      </p>
    </div>
    <form action="<?php echo esc_url(get_option('cfn_newsletter_action', '#')); ?>" method="post"
          class="newsletter-inline__form">
      <input type="email" name="email" required placeholder="you@domain.com" class="input-minimal" />
      <button type="submit" class="btn btn--accent">Subscribe →</button>
      <p class="subtle" style="font-size:11px; font-family:var(--font-mono); letter-spacing:0.08em">
        NO SPAM · UNSUBSCRIBE ANYTIME
      </p>
    </form>
  </div>
</section>
