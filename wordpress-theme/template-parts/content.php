<?php /* template-parts/content.php — post card (used in loops) */
$cats = get_the_category();
$cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
?>
<article class="post-card">
  <div class="post-card__meta">
    <?php if ($cats): ?>
      <a href="<?php echo esc_url(get_category_link($cats[0])); ?>"
         class="tag <?php echo esc_attr($cls); ?>">
        <?php echo esc_html($cats[0]->name); ?>
      </a>
    <?php endif; ?>
    <time class="post-card__date"><?php echo get_the_date('M j'); ?></time>
  </div>
  <h3 class="post-card__title">
    <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
  </h3>
  <?php if (get_the_excerpt()): ?>
    <p class="post-card__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
  <?php endif; ?>
  <div class="post-card__foot">
    <span><?php echo cfn_reading_time(); ?> min</span>
    <a href="<?php the_permalink(); ?>">Read →</a>
  </div>
</article>
