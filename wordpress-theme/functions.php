<?php
/**
 * Charlie's Field Notes — theme setup
 */

if (!defined('ABSPATH')) exit;

/* -------------------------------------------------------------------------
 * 1. Theme supports
 * ------------------------------------------------------------------------- */
function cfn_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form','comment-form','comment-list','gallery','caption']);
    add_theme_support('automatic-feed-links');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_theme_support('wp-block-styles');

    register_nav_menus([
        'primary' => __('Primary navigation', 'cfn'),
        'footer'  => __('Footer links', 'cfn'),
    ]);

    // Custom image sizes matching the mockup
    add_image_size('cfn-hero', 1200, 750, true);       // 16:10
    add_image_size('cfn-card', 640, 480, true);        // 4:3
    add_image_size('cfn-thumb', 360, 270, true);
    add_image_size('cfn-square', 400, 400, true);
}
add_action('after_setup_theme', 'cfn_setup');

/* -------------------------------------------------------------------------
 * 2. Enqueue styles & scripts
 * ------------------------------------------------------------------------- */
function cfn_enqueue() {
    $v = wp_get_theme()->get('Version');

    // Google fonts
    wp_enqueue_style('cfn-fonts',
        'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,300;0,6..12,400;0,6..12,500;0,6..12,600;0,6..12,700;1,6..12,400&family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+TC:wght@300;400;500;600&display=swap',
        [], null);

    wp_enqueue_style('cfn-design-system',
        get_template_directory_uri() . '/assets/design-system.css', [], $v);
    wp_enqueue_style('cfn-pages',
        get_template_directory_uri() . '/assets/pages.css', ['cfn-design-system'], $v);
    wp_enqueue_style('cfn-style',
        get_stylesheet_uri(), ['cfn-pages'], $v);

    wp_enqueue_script('cfn-site',
        get_template_directory_uri() . '/assets/site.js',
        [], $v, true);
}
add_action('wp_enqueue_scripts', 'cfn_enqueue');

/* -------------------------------------------------------------------------
 * 3. Sidebars & widget areas
 * ------------------------------------------------------------------------- */
function cfn_sidebars() {
    register_sidebar([
        'name'          => __('Primary sidebar', 'cfn'),
        'id'            => 'sidebar-primary',
        'description'   => 'Shown on homepage and archives',
        'before_widget' => '<div class="sidebar-section">',
        'after_widget'  => '</div>',
        'before_title'  => '<div class="eyebrow">',
        'after_title'   => '</div>',
    ]);
    register_sidebar([
        'name'          => __('Post sidebar', 'cfn'),
        'id'            => 'sidebar-post',
        'description'   => 'Shown alongside single posts',
        'before_widget' => '<div class="sidebar-section">',
        'after_widget'  => '</div>',
        'before_title'  => '<div class="eyebrow">',
        'after_title'   => '</div>',
    ]);
}
add_action('widgets_init', 'cfn_sidebars');

/* -------------------------------------------------------------------------
 * 4. Reading time helper
 * ------------------------------------------------------------------------- */
function cfn_reading_time($post_id = null) {
    $content = get_post_field('post_content', $post_id ?? get_the_ID());
    $words = str_word_count(wp_strip_all_tags($content));
    return max(1, (int) ceil($words / 220));
}

/* -------------------------------------------------------------------------
 * 5. Ad slots — reads from options, falls back to placeholder
 *    Use in templates:  cfn_ad_slot('970x90');
 * ------------------------------------------------------------------------- */
function cfn_ad_slot($size = '728x90', $label = 'Sponsored') {
    $code = get_option('cfn_ad_' . str_replace('x', '_', $size), '');
    if (!$code) return;
    echo '<div class="ad-slot" style="aspect-ratio:' . esc_attr(str_replace('x', '/', $size)) . '">';
    echo $code;
    echo '</div>';
}

/* -------------------------------------------------------------------------
 * 6. Customizer — ad code fields
 * ------------------------------------------------------------------------- */
function cfn_customize($wp_customize) {
    $wp_customize->add_section('cfn_ads', [
        'title'    => 'Ad slots',
        'priority' => 110,
    ]);
    foreach (['970_90', '728_90', '300_250', '300_600', '970_250'] as $slot) {
        $wp_customize->add_setting("cfn_ad_{$slot}", [
            'default'           => '',
            'sanitize_callback' => 'wp_kses_post',
        ]);
        $wp_customize->add_control("cfn_ad_{$slot}", [
            'label'    => str_replace('_', '×', $slot) . ' ad code (HTML)',
            'section'  => 'cfn_ads',
            'type'     => 'textarea',
        ]);
    }
}
add_action('customize_register', 'cfn_customize');

/* -------------------------------------------------------------------------
 * 7. Related posts (same category, 3 latest, exclude current)
 * ------------------------------------------------------------------------- */
function cfn_related_posts($count = 3) {
    $cats = wp_get_post_categories(get_the_ID());
    if (!$cats) return new WP_Query();
    return new WP_Query([
        'category__in'        => $cats,
        'post__not_in'        => [get_the_ID()],
        'posts_per_page'      => $count,
        'ignore_sticky_posts' => 1,
    ]);
}

/* -------------------------------------------------------------------------
 * 8. Auto-generated TOC from <h2> tags in content
 *    Call cfn_the_toc() inside single.php
 * ------------------------------------------------------------------------- */
function cfn_the_toc() {
    $content = apply_filters('the_content', get_the_content());
    preg_match_all('/<h2[^>]*>(.*?)<\/h2>/i', $content, $m);
    if (empty($m[1])) return;
    echo '<aside class="post-toc"><h5>Contents</h5><ol>';
    foreach ($m[1] as $i => $heading) {
        $text = wp_strip_all_tags($heading);
        $id   = sanitize_title($text);
        echo '<li><a href="#' . esc_attr($id) . '">' . esc_html($text) . '</a></li>';
    }
    echo '</ol></aside>';
}

// Add IDs to all h2 in post content
function cfn_add_heading_ids($content) {
    if (!is_singular('post')) return $content;
    return preg_replace_callback('/<h2(.*?)>(.*?)<\/h2>/i', function($m) {
        $id = sanitize_title(wp_strip_all_tags($m[2]));
        return '<h2 id="' . $id . '"' . $m[1] . '>' . $m[2] . '</h2>';
    }, $content);
}
add_filter('the_content', 'cfn_add_heading_ids', 20);

/* -------------------------------------------------------------------------
 * 9. Excerpt niceties
 * ------------------------------------------------------------------------- */
function cfn_excerpt_length() { return 30; }
add_filter('excerpt_length', 'cfn_excerpt_length');

function cfn_excerpt_more() { return '…'; }
add_filter('excerpt_more', 'cfn_excerpt_more');

/* -------------------------------------------------------------------------
 * 10. Category → tag CSS class mapping
 * ------------------------------------------------------------------------- */
function cfn_category_tag_class($slug) {
    $map = [
        'linux'        => 'tag--linux',
        'bash'         => 'tag--linux',
        'containerize' => 'tag--docker',
        'docker'       => 'tag--docker',
        'javascript'   => 'tag--js',
        'python'       => 'tag--python',
        'c'            => 'tag--cpp',
        'cpp'          => 'tag--cpp',
        'c-2'          => 'tag--cpp',
        'databases'    => 'tag--db',
        'git'          => 'tag--ops',
        'windows'      => 'tag--ops',
        'wordpress'    => 'tag--ops',
    ];
    return $map[$slug] ?? 'tag--tech';
}

/* -------------------------------------------------------------------------
 * 11. Body class helpers
 * ------------------------------------------------------------------------- */
function cfn_body_class($classes) {
    if (is_singular('post')) $classes[] = 'is-post';
    if (is_front_page())    $classes[] = 'is-home';
    return $classes;
}
add_filter('body_class', 'cfn_body_class');
