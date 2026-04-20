<?php /* single.php — Single post */
get_header();
while (have_posts()): the_post();

  // Detect TOC (needs ≥1 <h2>)
  $raw     = apply_filters('the_content', get_the_content());
  $has_toc = (bool) preg_match('/<h2/i', $raw);
  $cats    = get_the_category();
  $cls     = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
?>

<article>
  <div class="wrap">

    <!-- ── Post header ───────────────────────────────────────────── -->
    <header class="post-header">
      <div class="post-header__meta">
        <?php if ($cats): ?>
          <a href="<?php echo esc_url(get_category_link($cats[0])); ?>"
             class="tag <?php echo esc_attr($cls); ?>">
            <?php echo esc_html($cats[0]->name); ?>
          </a>
        <?php endif; ?>
        <span class="label"><?php echo get_the_date(); ?></span>
      </div>

      <h1 class="post-title"><?php the_title(); ?></h1>

      <?php if (get_the_excerpt()): ?>
        <p class="post-excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
      <?php endif; ?>

      <div class="post-byline">
        <span>Charlie</span>
        <span class="post-byline__sep">·</span>
        <a href="https://github.com/charlie0227" target="_blank" rel="noopener">github.com/charlie0227</a>
        <span class="post-byline__sep">·</span>
        <span><?php echo cfn_reading_time(); ?> min read</span>
      </div>
    </header>

    <!-- ── Post layout ───────────────────────────────────────────── -->
    <div class="post-layout <?php echo $has_toc ? 'has-toc' : 'no-toc'; ?>">

      <?php if ($has_toc): ?>
        <?php cfn_the_toc(); ?>
      <?php endif; ?>

      <!-- Body -->
      <div class="post-body">
        <?php the_content(); ?>

        <div class="post-end">
          <span class="label">End of article</span>
          <?php if (get_option('cfn_ad_728_90')): ?>
          <div style="margin-top:var(--s4)">
            <?php cfn_ad_slot('728x90', 'End of article ad'); ?>
          </div>
          <?php endif; ?>
        </div>
      </div>

      <!-- Aside (share, ad) — hidden on no-toc at <1100px -->
      <aside class="post-aside">
        <div class="post-share">
          <span class="label" style="display:block; margin-bottom:var(--s2)">Share</span>
          <button class="post-share-btn" data-share="copy">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Copy link
          </button>
          <button class="post-share-btn" data-share="twitter">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
            </svg>
            Share on X
          </button>
        </div>
        <?php cfn_ad_slot('300x600', 'Half-page'); ?>
      </aside>

    </div><!-- /.post-layout -->
  </div>

  <!-- ── Related posts ─────────────────────────────────────────── -->
  <?php $related = cfn_related_posts(3);
  if ($related->have_posts()): ?>
  <section class="wrap related">
    <hr class="rule" style="margin-bottom:var(--s7)">
    <div class="section-head">
      <h2>More on this topic</h2>
    </div>
    <div class="related-grid">
      <?php while ($related->have_posts()): $related->the_post();
        $rcats = get_the_category();
        $rcls  = $rcats ? cfn_category_tag_class($rcats[0]->slug) : 'tag--tech';
      ?>
      <a href="<?php the_permalink(); ?>" class="related-card">
        <div class="related-card__tag">
          <span class="tag <?php echo esc_attr($rcls); ?>"><?php echo esc_html($rcats ? $rcats[0]->name : ''); ?></span>
        </div>
        <div class="related-card__title"><?php the_title(); ?></div>
        <div class="related-card__meta">
          <?php echo get_the_date('M j, Y'); ?> · <?php echo cfn_reading_time(); ?> min read
        </div>
      </a>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </section>
  <?php endif; ?>

  <!-- ── Newsletter ────────────────────────────────────────────── -->
  <div class="wrap" style="margin-top:var(--s8)">
    <?php get_template_part('template-parts/newsletter-inline'); ?>
  </div>

</article>

<?php endwhile; get_footer();
