<?php /* search.php */
get_header(); ?>

<main class="container" style="padding-top:40px">
  <div style="max-width:900px; margin:0 auto 48px">
    <div class="eyebrow" style="margin-bottom:12px">Search the field notes</div>
    <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>"
          style="display:flex; align-items:center; gap:16px; padding:24px 28px;
                 border:1px solid var(--border-strong); border-radius:8px; background:var(--bg-elevated)">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input type="search" name="s" value="<?php echo get_search_query(); ?>"
             placeholder="Type anything…"
             style="flex:1; background:transparent; border:none; outline:none;
                    font-family:var(--font-serif); font-size:28px; color:var(--text)">
    </form>
  </div>

  <div style="max-width:900px; margin:0 auto">
    <div class="eyebrow" style="margin-bottom:32px">
      <?php printf('%d results for "%s"', (int) $wp_query->found_posts, esc_html(get_search_query())); ?>
    </div>

    <?php if (have_posts()): while (have_posts()): the_post(); ?>
      <a href="<?php the_permalink(); ?>" class="search-result" style="display:flex; gap:24px; align-items:center; padding:24px 0; border-bottom:1px solid var(--border)">
        <?php if (has_post_thumbnail()): ?>
          <div style="flex:0 0 160px; aspect-ratio:4/3; border-radius:4px; overflow:hidden"><?php the_post_thumbnail('cfn-thumb'); ?></div>
        <?php endif; ?>
        <div style="flex:1">
          <div class="flex items-center gap-3" style="margin-bottom:8px">
            <?php $cats = get_the_category(); if ($cats): ?>
              <span class="tag tag--accent"><?php echo esc_html($cats[0]->name); ?></span>
            <?php endif; ?>
            <span class="eyebrow"><?php echo get_the_date(); ?></span>
          </div>
          <h3 class="serif" style="font-size:26px; line-height:1.2; font-weight:400; letter-spacing:-0.01em; margin-bottom:6px"><?php the_title(); ?></h3>
          <p class="muted" style="font-size:14px; line-height:1.55"><?php echo esc_html(get_the_excerpt()); ?></p>
        </div>
      </a>
    <?php endwhile; else: ?>
      <div style="padding:80px 0; text-align:center">
        <div class="serif" style="font-size:42px; font-style:italic; margin-bottom:16px">Nothing matched.</div>
        <p class="muted">Try a shorter phrase.</p>
      </div>
    <?php endif; ?>
  </div>
</main>

<?php get_footer();
