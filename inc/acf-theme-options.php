<?php
/**
 * ACF Theme Options
 *
 * Registers an options page and generates CSS custom properties from ACF fields.
 * Requires ACF Pro to be active.
 */

if (! defined('ABSPATH')) {
    exit;
}

/* ── Register ACF Options Page ─────────────────────────── */

function ds_acf_options_page(): void {
    if (! function_exists('acf_add_options_page')) {
        return;
    }

    acf_add_options_page([
        'page_title' => __('Theme Settings', 'developer-starter'),
        'menu_title' => __('Theme Settings', 'developer-starter'),
        'menu_slug'  => 'ds-theme-settings',
        'capability' => 'manage_options',
        'redirect'   => false,
        'icon_url'   => 'dashicons-admin-customizer',
        'position'   => 2,
    ]);

    acf_add_options_sub_page([
        'page_title'  => __('General', 'developer-starter'),
        'menu_title'  => __('General', 'developer-starter'),
        'parent_slug' => 'ds-theme-settings',
    ]);

    acf_add_options_sub_page([
        'page_title'  => __('Performance', 'developer-starter'),
        'menu_title'  => __('Performance', 'developer-starter'),
        'parent_slug' => 'ds-theme-settings',
    ]);
}
add_action('acf/init', 'ds_acf_options_page');

/* ── ACF Admin Notice ──────────────────────────────────── */

add_action('admin_notices', function (): void {
    if (function_exists('acf_add_options_page')) {
        return;
    }
    if (! current_user_can('manage_options')) {
        return;
    }
    echo '<div class="notice notice-warning"><p>'
        . esc_html__('Developer Starter: ACF Pro is recommended for Theme Settings.', 'developer-starter')
        . '</p></div>';
});

/* ── Generate CSS Custom Properties from ACF ───────────── */

function ds_generate_acf_css_vars(): void {
    if (! function_exists('get_field')) {
        return;
    }

    $vars = [];

    // Brand color
    $brand = get_field('ds_brand_color', 'option');
    if ($brand) {
        $vars['--ds-brand-color'] = sanitize_hex_color($brand);
    }

    // Accent color
    $accent = get_field('ds_accent_color', 'option');
    if ($accent) {
        $vars['--ds-accent-color'] = sanitize_hex_color($accent);
    }

    // Content width
    $content_width = get_field('ds_content_width', 'option');
    if ($content_width) {
        $vars['--ds-content-width'] = absint($content_width) . 'px';
    }

    // Container width
    $container_width = get_field('ds_container_width', 'option');
    if ($container_width) {
        $vars['--ds-container-width'] = absint($container_width) . 'px';
    }

    // Border radius
    $radius = get_field('ds_border_radius', 'option');
    if ($radius !== null && $radius !== '' && $radius !== false) {
        $vars['--ds-radius'] = absint($radius) . 'px';
    }

    if (empty($vars)) {
        return;
    }

    // Write to file for caching
    $css = ":root {\n";
    foreach ($vars as $prop => $value) {
        $css .= "  {$prop}: {$value};\n";
    }
    $css .= "}\n";

    $file = get_template_directory() . '/assets/css/acf-theme-vars.css';
    $dir  = dirname($file);

    if (! is_dir($dir)) {
        wp_mkdir_p($dir);
    }

    file_put_contents($file, $css);
}
add_action('acf/save_post', function ($post_id): void {
    if ($post_id !== 'options') {
        return;
    }
    ds_generate_acf_css_vars();
});

/* ── ACF Performance Controls ──────────────────────────── */

function ds_acf_performance_controls(): void {
    if (! function_exists('get_field')) {
        return;
    }

    if (is_admin()) {
        return;
    }

    // Disable block CSS on front page
    if (is_front_page() && ds_acf_get('ds_disable_block_css_home', 'option', false)) {
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
        wp_dequeue_style('classic-theme-styles');
    }

    // Disable global styles on front page
    if (is_front_page() && ds_acf_get('ds_disable_global_styles_home', 'option', false)) {
        wp_dequeue_style('global-styles');
    }
}
add_action('wp_enqueue_scripts', 'ds_acf_performance_controls', 998);

/* ── Custom Login Logo from ACF ────────────────────────── */

function ds_login_logo(): void {
    if (! function_exists('get_field')) {
        return;
    }

    $enabled = get_field('ds_login_logo_enabled', 'option');
    $logo    = get_field('ds_login_logo', 'option');

    if (empty($enabled) || empty($logo)) {
        return;
    }

    $logo_url = '';
    if (is_array($logo)) {
        $logo_url = $logo['url'] ?? '';
    } elseif (is_numeric($logo)) {
        $logo_url = wp_get_attachment_url((int) $logo);
    } elseif (is_string($logo)) {
        $logo_url = $logo;
    }

    if (empty($logo_url)) {
        return;
    }

    $width  = absint(ds_acf_get('ds_login_logo_width', 'option', 160));
    $height = absint(ds_acf_get('ds_login_logo_height', 'option', 80));

    echo '<style id="ds-login-logo">
        body.login { background: #f6f7fb; }
        .login #login { width: min(92vw, 380px); padding-top: 5vh; }
        .login #login h1 { margin-bottom: 18px; }
        .login h1 a {
            background: url(' . esc_url($logo_url) . ') no-repeat center center !important;
            background-size: contain !important;
            width: ' . $width . 'px !important;
            height: ' . $height . 'px !important;
            max-width: 100% !important;
            display: block !important;
            text-indent: -9999px !important;
            overflow: hidden !important;
        }
    </style>';
}
add_action('login_enqueue_scripts', 'ds_login_logo');

function ds_login_logo_url(): string {
    return home_url('/');
}
add_filter('login_headerurl', 'ds_login_logo_url');
