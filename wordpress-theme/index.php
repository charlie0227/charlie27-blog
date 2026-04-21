<?php /* index.php — Homepage (news-style) */
get_header();
$total = wp_count_posts()->publish;
$cats  = get_categories(['hide_empty' => true]);
?>

<?php if (get_option('cfn_ad_970_90')): ?>
<div class="wrap" style="padding-top:var(--s4); padding-bottom:var(--s3)">
  <?php cfn_ad_slot('970x90', 'Leaderboard'); ?>
</div>
<?php endif; ?>

<main style="padding-bottom:var(--s8)">

  <!-- ── Dev hero ──────────────────────────────────────────────────── -->
  <div class="wrap">
    <div class="dev-hero">
      <div class="dev-hero__text">
        <div class="dev-hero__prompt">charlie@blog:~/posts $ cat README.md</div>
        <h1 class="dev-hero__title">
          Dev notes on<br>
          <em>Linux, Docker</em><br>
          &amp;&nbsp;backend.
        </h1>
        <p class="dev-hero__lede">
          Practical guides from real debugging sessions. No fluff — just the
          commands, configs, and architecture decisions that actually ship.
        </p>
        <div class="dev-hero__stats">
          <div>
            <div class="label">Posts</div>
            <div class="dev-hero__stat-num"><?php echo $total; ?></div>
          </div>
          <div>
            <div class="label">Topics</div>
            <div class="dev-hero__stat-num"><?php echo count($cats); ?></div>
          </div>
        </div>
        <div style="display:flex;gap:var(--s3);flex-wrap:wrap">
          <?php foreach ($cats as $c):
            $cls = cfn_category_tag_class($c->slug); ?>
            <a href="<?php echo esc_url(get_category_link($c)); ?>" class="tag <?php echo esc_attr($cls); ?>">
              <?php echo esc_html($c->name); ?>
            </a>
          <?php endforeach; ?>
        </div>
      </div>

      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="t-dot t-dot--red"></span>
            <span class="t-dot t-dot--yellow"></span>
            <span class="t-dot t-dot--green"></span>
          </div>
          <span class="terminal-title">zsh — charlie@arch — 82×24</span>
        </div>
        <div class="terminal-body">
          <div class="t-line">
            <span class="t-prompt">charlie@arch</span><span class="t-sep">:</span><span class="t-path">~/blog</span><span class="t-dollar">$</span> cat latest-posts.txt
          </div>
          <?php
          $preview = new WP_Query(['posts_per_page' => 4]);
          while ($preview->have_posts()): $preview->the_post(); ?>
            <div class="t-line t-out">» <?php echo esc_html(wp_trim_words(get_the_title(), 9, '')); ?></div>
          <?php endwhile; wp_reset_postdata(); ?>
          <span class="t-blank"></span>
          <div class="t-line">
            <span class="t-prompt">charlie@arch</span><span class="t-sep">:</span><span class="t-path">~/blog</span><span class="t-dollar">$</span> <span class="t-cursor"></span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="wrap" style="padding-bottom:var(--s5)"><hr class="rule"></div>

  <!-- ── Main layout ───────────────────────────────────────────────── -->
  <div class="wrap home-layout">
    <div class="home-main">

      <!-- Latest / Featured -->
      <?php
      $hero_q = new WP_Query(['posts_per_page' => 1, 'meta_key' => '_cfn_featured', 'meta_value' => '1']);
      if (!$hero_q->have_posts()) $hero_q = new WP_Query(['posts_per_page' => 1]);
      if ($hero_q->have_posts()): $hero_q->the_post();
        $cats = get_the_category();
        $cls  = $cats ? cfn_category_tag_class($cats[0]->slug) : 'tag--tech';
      ?>
      <article class="post-feature">
        <div class="post-feature__label">
          <?php if ($cats): ?>
            <a href="<?php echo esc_url(get_category_link($cats[0])); ?>"
               class="tag <?php echo esc_attr($cls); ?>">
              <?php echo esc_html($cats[0]->name); ?>
            </a>
          <?php endif; ?>
          <span class="post-feature__pin">★ Latest</span>
          <time class="label" style="margin-left:auto"><?php echo get_the_date('M j, Y'); ?></time>
        </div>
        <h2 class="post-feature__title">
          <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
        </h2>
        <?php if (get_the_excerpt()): ?>
          <p class="post-feature__excerpt"><?php echo esc_html(get_the_excerpt()); ?></p>
        <?php endif; ?>
        <div class="post-feature__foot">
          <span><?php echo cfn_reading_time(); ?> min read</span>
          <a href="<?php the_permalink(); ?>" class="post-feature__cta">Read →</a>
        </div>
      </article>
      <?php endif; wp_reset_postdata(); ?>

      <!-- Article card grid -->
      <div class="section-head">
        <h2>All articles</h2>
        <span class="label"><?php echo $total; ?> total</span>
      </div>

      <div class="article-grid">
        <?php
        $latest = new WP_Query(['posts_per_page' => 24, 'offset' => 1]);
        while ($latest->have_posts()): $latest->the_post();
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
        <?php endwhile; wp_reset_postdata(); ?>
      </div>

      <?php the_posts_pagination(['prev_text' => '← Older', 'next_text' => 'Newer →']); ?>

    </div><!-- /.home-main -->

    <!-- Sidebar -->
    <aside class="home-sidebar">

      <div class="sidebar-block">
        <span class="label">Topics</span>
        <ul class="sidebar-cats">
          <?php foreach (get_categories(['hide_empty' => true]) as $c):
            $tag_key = str_replace(['tag--','tech'], ['','accent'], cfn_category_tag_class($c->slug));
            $dot_css = "var(--cat-{$tag_key}, var(--accent))";
          ?>
            <li>
              <a href="<?php echo esc_url(get_category_link($c)); ?>" style="display:flex;align-items:center;gap:8px">
                <span class="sidebar-cat-dot" style="background:<?php echo esc_attr($dot_css); ?>"></span>
                <?php echo esc_html($c->name); ?>
              </a>
              <span class="count"><?php echo $c->count; ?></span>
            </li>
          <?php endforeach; ?>
        </ul>
      </div>

      <div class="sidebar-block">
        <span class="label">Tags</span>
        <div class="tag-cloud" style="margin-top:var(--s3)">
          <?php foreach (get_tags(['number' => 20]) as $t): ?>
            <a href="<?php echo esc_url(get_tag_link($t)); ?>" class="tag">#<?php echo esc_html($t->name); ?></a>
          <?php endforeach; ?>
        </div>
      </div>

      <?php if (get_option('cfn_ad_300_250')): ?>
      <div class="sidebar-block">
        <?php cfn_ad_slot('300x250', 'Display'); ?>
      </div>
      <?php endif; ?>

    </aside>
  </div><!-- /.home-layout -->

</main>

<?php get_footer();
