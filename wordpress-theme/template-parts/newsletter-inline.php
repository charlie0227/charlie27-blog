<?php /* template-parts/newsletter-inline.php */ ?>
<section class="newsletter-inline">
  <div class="newsletter-inline__grid">
    <div>
      <div class="eyebrow">Field Notes · Weekly newsletter</div>
      <h3 class="serif" style="font-size:40px; line-height:1.1; margin:14px 0 10px; letter-spacing:-0.02em; font-weight:400; max-width:480px">
        One quiet essay every Sunday morning.
      </h3>
      <p class="muted" style="font-size:15px; max-width:480px; line-height:1.6">
        Thoughtful writing on software, travel, and the slow craft of paying attention. No ads, no tracking — just words.
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
