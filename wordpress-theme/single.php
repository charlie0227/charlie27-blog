<?php /* single.php — Single post */
get_header();
while (have_posts()): the_post(); ?>

<article>
  <div class="container">
    <header class="post-header">
      <div class="flex items-center gap-3" style="margin-bottom:8px">
        <?php
        $cats = get_the_category();
        if ($cats) {
            $cls = cfn_category_tag_class($cats[0]->slug);
            echo '<a href="' . esc_url(get_category_link($cats[0])) . '" class="tag ' . esc_attr($cls) . '">' . esc_html($cats[0]->name) . '</a>';
        }
        ?>
        <span class="eyebrow"><?php echo get_the_date(); ?></span>
      </div>
      <h1 class="post-title"><?php the_title(); ?></h1>
      <?php if (get_the_excerpt()): ?>
        <p style="font-size:20px; line-height:1.55; color:var(--text-muted); max-width:720px; font-family:var(--font-serif); font-style:italic">
          <?php echo esc_html(get_the_excerpt()); ?>
        </p>
      <?php endif; ?>
      <div class="post-header-meta">
        <div class="post-author">
          <div class="post-author__avatar"><?php echo esc_html(strtoupper(substr(get_the_author(), 0, 1))); ?></div>
          <div class="post-author__info">
            <span class="post-author__name"><?php the_author(); ?></span>
            <span class="post-author__role"><?php echo esc_html(get_the_author_meta('description')); ?></span>
          </div>
        </div>
        <span class="post-meta" style="margin-left:auto">
          <span><?php echo cfn_reading_time(); ?> min read</span>
        </span>
      </div>
    </header>

    <?php if (has_post_thumbnail()): ?>
    <div class="post-hero">
      <?php the_post_thumbnail('cfn-hero'); ?>
    </div>
    <?php endif; ?>

    <?php
    // Detect whether TOC will render (needs at least one <h2>)
    $raw = apply_filters('the_content', get_the_content());
    $has_toc = (bool) preg_match('/<h2/i', $raw);
    $layout_class = 'post-layout' . ($has_toc ? ' has-toc' : ' no-toc');
    ?>
    <div class="<?php echo esc_attr($layout_class); ?>">
      <?php if ($has_toc) cfn_the_toc(); ?>

      <div class="post-body">
        <?php the_content(); ?>

        <div class="post-end">
          <div class="eyebrow" style="margin-bottom:16px">End of article</div>
          <?php cfn_ad_slot('728x90', 'End of article ad'); ?>
        </div>
      </div>

      <aside class="post-aside">
        <?php if (is_active_sidebar('sidebar-post')) dynamic_sidebar('sidebar-post'); ?>
        <?php cfn_ad_slot('300x600', 'Half-page'); ?>
      </aside>
    </div>
  </div>

  <?php $related = cfn_related_posts(3); if ($related->have_posts()): ?>
  <section class="container related">
    <div class="section-head">
      <div>
        <div class="eyebrow">Keep reading</div>
        <h2 class="serif section-title">More on this topic</h2>
      </div>
    </div>
    <div class="related-grid">
      <?php while ($related->have_posts()): $related->the_post();
          get_template_part('template-parts/content');
      endwhile; wp_reset_postdata(); ?>
    </div>
  </section>
  <?php endif; ?>

  <div class="container" style="margin-top:80px">
    <?php get_template_part('template-parts/newsletter-inline'); ?>
  </div>
</article>

<?php endwhile; get_footer();
