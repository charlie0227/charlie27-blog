<?php /* search.php */
get_header(); ?>

<main class="wrap" style="padding:var(--s6) 0 var(--s8)">
  <div class="search-header">
    <span class="label">Search the field notes</span>
    <h1>
      <?php if (get_search_query()): ?>
        Results for <em>"<?php echo esc_html(get_search_query()); ?>"</em>
      <?php else: ?>
        Search
      <?php endif; ?>
    </h1>
  </div>

  <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="search-form">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
    <input type="search" name="s" value="<?php echo esc_attr(get_search_query()); ?>"
           placeholder="Type anything…" class="search-form__input" autofocus>
    <button type="submit" class="btn btn--sm">Search</button>
  </form>

  <?php if (have_posts()): ?>
    <div class="search-meta label" style="margin:var(--s5) 0 var(--s4)">
      <?php printf('%d results', (int) $wp_query->found_posts); ?>
    </div>

    <div class="search-results">
      <?php while (have_posts()): the_post();
        $cats = get_the_category();
        $cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
      ?>
        <a href="<?php the_permalink(); ?>" class="search-result">
          <div class="search-result__body">
            <div class="search-result__meta">
              <?php if ($cats): ?>
                <span class="tag <?php echo esc_attr($cls); ?>"><?php echo esc_html($cats[0]->name); ?></span>
              <?php endif; ?>
              <span class="label"><?php echo get_the_date('M j, Y'); ?></span>
            </div>
            <h3 class="search-result__title"><?php the_title(); ?></h3>
            <?php if (get_the_excerpt()): ?>
              <p class="search-result__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
            <?php endif; ?>
          </div>
        </a>
      <?php endwhile; ?>
    </div>

    <?php the_posts_pagination(['prev_text' => '← Newer', 'next_text' => 'Older →']); ?>

  <?php elseif (get_search_query()): ?>
    <div class="search-empty">
      <div class="serif search-empty__title">Nothing matched.</div>
      <p class="muted">Try a shorter phrase, or browse topics below.</p>
      <div class="tag-cloud" style="margin-top:var(--s5); justify-content:center">
        <?php foreach (get_categories(['hide_empty'=>true]) as $c):
          $cls = cfn_category_tag_class($c->slug); ?>
          <a href="<?php echo esc_url(get_category_link($c)); ?>" class="tag <?php echo esc_attr($cls); ?>"><?php echo esc_html($c->name); ?></a>
        <?php endforeach; ?>
      </div>
    </div>
  <?php endif; ?>
</main>

<?php get_footer();
