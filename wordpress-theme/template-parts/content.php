<?php /* template-parts/content.php — post card in a loop */ ?>
<a href="<?php the_permalink(); ?>" class="post-card">
  <?php if (has_post_thumbnail()): ?>
    <div style="aspect-ratio:4/3; border-radius:4px; overflow:hidden; margin-bottom:16px">
      <?php the_post_thumbnail('cfn-card', ['style' => 'width:100%; height:100%; object-fit:cover']); ?>
    </div>
  <?php else: ?>
    <div class="img-placeholder img-placeholder--cream" style="aspect-ratio:4/3; border-radius:4px; margin-bottom:16px">Image</div>
  <?php endif; ?>
  <div class="flex items-center gap-3" style="margin-bottom:10px">
    <?php $cats = get_the_category(); if ($cats): ?>
      <span class="tag tag--accent"><?php echo esc_html($cats[0]->name); ?></span>
    <?php endif; ?>
    <span class="eyebrow"><?php echo get_the_date(); ?></span>
  </div>
  <h3 style="font-size:19px; line-height:1.3; margin-bottom:8px; font-weight:600; letter-spacing:-0.01em"><?php the_title(); ?></h3>
  <p class="muted" style="font-size:14px; line-height:1.55; margin-bottom:12px"><?php echo esc_html(get_the_excerpt()); ?></p>
  <div class="post-meta">
    <span><?php echo cfn_reading_time(); ?> min</span>
    <span class="post-meta__dot"></span>
    <span><?php the_author(); ?></span>
  </div>
</a>
