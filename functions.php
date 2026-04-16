<?php
/**
 * Developer Starter – functions.php
 *
 * Clean, lightweight Gutenberg parent theme with ACF Pro support.
 */

if (! defined('ABSPATH')) {
    exit;
}

/* ── ACF helper ────────────────────────────────────────── */

/**
 * Safe ACF get_field wrapper – returns $default when ACF is missing or value is empty.
 */
function ds_acf_get(string $key, $post_id = 'option', $default = '') {
    if (function_exists('get_field')) {
        $value = get_field($key, $post_id);
        return ($value !== null && $value !== false && $value !== '') ? $value : $default;
    }
    return $default;
}

/* ── Theme Setup ───────────────────────────────────────── */

function ds_setup(): void {
    load_theme_textdomain('developer-starter', get_template_directory() . '/languages');

    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('responsive-embeds');
    add_theme_support('automatic-feed-links');
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('editor-styles');
    add_theme_support('custom-logo');
    add_theme_support('html5', [
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
        'search-form',
    ]);

    register_nav_menus([
        'ds-header-menu' => __('Header Menu', 'developer-starter'),
        'ds-footer-menu' => __('Footer Menu', 'developer-starter'),
    ]);
}
add_action('after_setup_theme', 'ds_setup');

/* ── Enqueue Assets ────────────────────────────────────── */

function ds_enqueue_assets(): void {
    $theme   = wp_get_theme();
    $version = $theme->get('Version');

    wp_enqueue_style(
        'ds-style',
        get_stylesheet_uri(),
        [],
        $version
    );

    // Optional: compiled CSS from ACF theme vars
    $acf_vars = get_template_directory() . '/assets/css/acf-theme-vars.css';
    if (file_exists($acf_vars)) {
        wp_enqueue_style(
            'ds-acf-vars',
            get_template_directory_uri() . '/assets/css/acf-theme-vars.css',
            ['ds-style'],
            filemtime($acf_vars)
        );
    }

    // Lightweight theme JS
    $theme_js = get_template_directory() . '/assets/js/theme.js';
    if (file_exists($theme_js)) {
        wp_enqueue_script(
            'ds-theme-js',
            get_template_directory_uri() . '/assets/js/theme.js',
            [],
            filemtime($theme_js),
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'ds_enqueue_assets', 20);

/* ── Bloat removal and head cleanup now handled by inc/frontend-settings.php ── */

/* ── Body Classes ──────────────────────────────────────── */

function ds_body_classes(array $classes): array {
    if (is_singular()) {
        $post = get_queried_object();
        if ($post instanceof WP_Post) {
            $classes[] = 'ds-' . sanitize_html_class($post->post_type);
            $slug = $post->post_name;
            if ($slug) {
                $classes[] = 'ds-slug-' . sanitize_html_class($slug);
            }
        }
    }
    return $classes;
}
add_filter('body_class', 'ds_body_classes');

/* ── Skip Link ─────────────────────────────────────────── */

function ds_skip_link(): void {
    echo '<a class="skip-link screen-reader-text" href="#ds-main">'
        . esc_html__('Skip to content', 'developer-starter')
        . '</a>';
}
add_action('wp_body_open', 'ds_skip_link');

/* ── Block Pattern Categories ──────────────────────────── */

function ds_pattern_categories(): void {
    register_block_pattern_category('developer-starter', [
        'label' => __('Developer Starter', 'developer-starter'),
    ]);
}
add_action('init', 'ds_pattern_categories');

/* ── Bootstrap Blocks ──────────────────────────────────── */

function ds_register_bootstrap_blocks(): void {
    $blocks_dir = get_template_directory() . '/blocks/bootstrap';
    $block_dirs = ['bs-container', 'bs-row', 'bs-column'];

    foreach ($block_dirs as $block) {
        $path = $blocks_dir . '/' . $block;
        if (is_dir($path)) {
            register_block_type($path);
        }
    }

    // ACF Meta block.
    $acf_meta_path = get_template_directory() . '/blocks/acf-meta';
    if (is_dir($acf_meta_path)) {
        register_block_type($acf_meta_path);
    }
}
add_action('init', 'ds_register_bootstrap_blocks');

function ds_bootstrap_blocks_editor_assets(): void {
    $css_file = get_template_directory() . '/assets/css/bs-blocks-editor.css';
    if (file_exists($css_file)) {
        wp_enqueue_style(
            'ds-bs-blocks-editor',
            get_template_directory_uri() . '/assets/css/bs-blocks-editor.css',
            [],
            filemtime($css_file)
        );
    }
}
add_action('enqueue_block_editor_assets', 'ds_bootstrap_blocks_editor_assets');

/* ── Breadcrumbs Shortcode ─────────────────────────────── */

function ds_breadcrumbs_shortcode(): string {
    // Yoast
    if (function_exists('yoast_breadcrumb')) {
        return yoast_breadcrumb(
            '<nav class="ds-breadcrumbs" aria-label="Breadcrumbs">',
            '</nav>',
            false
        );
    }

    // Breadcrumb NavXT
    if (function_exists('bcn_display')) {
        ob_start();
        echo '<nav class="ds-breadcrumbs" aria-label="Breadcrumbs">';
        bcn_display();
        echo '</nav>';
        return ob_get_clean();
    }

    // Simple fallback
    $items = [
        '<a href="' . esc_url(home_url('/')) . '">' . esc_html__('Home', 'developer-starter') . '</a>',
    ];

    if (is_category() || is_singular('post')) {
        $items[] = esc_html__('Blog', 'developer-starter');
    }

    if (is_singular()) {
        $items[] = esc_html(get_the_title());
    } elseif (is_archive()) {
        $title = post_type_archive_title('', false) ?: get_the_archive_title();
        $items[] = esc_html($title);
    } elseif (is_search()) {
        $items[] = sprintf(
            esc_html__('Search: %s', 'developer-starter'),
            esc_html(get_search_query())
        );
    }

    return '<nav class="ds-breadcrumbs" aria-label="Breadcrumbs">'
        . implode(' &rsaquo; ', array_filter($items))
        . '</nav>';
}
add_shortcode('ds_breadcrumbs', 'ds_breadcrumbs_shortcode');

/* ── SVG Upload Support ────────────────────────────────── */

function ds_allow_svg(array $mimes): array {
    if (ds_setting('enable_svg_upload')) {
        $mimes['svg'] = 'image/svg+xml';
    }
    return $mimes;
}
add_filter('upload_mimes', 'ds_allow_svg');

/* ── Dark Mode Bootstrap (inline head script) ──────────── */

function ds_dark_mode_bootstrap(): void {
    if (! ds_setting('enable_dark_mode')) {
        return;
    }
    echo '<script>(function(){try{var m=localStorage.getItem("dsThemeMode");'
        . 'if(m==="dark"){document.documentElement.classList.add("is-dark-theme");'
        . 'document.documentElement.setAttribute("data-theme","dark");'
        . '}}catch(e){}})();</script>';
}
add_action('wp_head', 'ds_dark_mode_bootstrap', 1);

/* ── Include ACF Theme Options (if file exists) ────────── */

$ds_acf_options = get_template_directory() . '/inc/acf-theme-options.php';
if (file_exists($ds_acf_options)) {
    require_once $ds_acf_options;
}

/* ── Admin Settings, Bootstrap & Frontend Settings ─────── */

require_once get_template_directory() . '/inc/admin-settings.php';
require_once get_template_directory() . '/inc/bootstrap-loader.php';
require_once get_template_directory() . '/inc/bootstrap-debugger.php';
require_once get_template_directory() . '/inc/frontend-settings.php';
