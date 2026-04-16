<?php
/**
 * Bootstrap Conditional Loader
 *
 * Enqueues Bootstrap CSS/JS from jsDelivr CDN based on admin settings.
 */

if (! defined('ABSPATH')) {
    exit;
}

/* ── Enqueue Bootstrap on the front end ────────────────── */

function ds_enqueue_bootstrap(): void {
    if (is_admin()) {
        return;
    }

    $version  = ds_setting('bootstrap_version', '5.3.3');
    $base_url = 'https://cdn.jsdelivr.net/npm/bootstrap@' . rawurlencode($version) . '/dist/';

    // CSS
    if (ds_setting('bootstrap_css')) {
        $css_files = [
            'full'      => 'css/bootstrap.min.css',
            'grid'      => 'css/bootstrap-grid.min.css',
            'reboot'    => 'css/bootstrap-reboot.min.css',
            'utilities' => 'css/bootstrap-utilities.min.css',
        ];

        $mode = ds_setting('bootstrap_css_mode', 'full');
        $file = $css_files[$mode] ?? $css_files['full'];

        wp_enqueue_style('bootstrap', $base_url . $file, [], $version);
    }

    // JS
    if (ds_setting('bootstrap_js')) {
        $js_files = [
            'bundle' => 'js/bootstrap.bundle.min.js',
            'core'   => 'js/bootstrap.min.js',
        ];

        $mode = ds_setting('bootstrap_js_mode', 'bundle');
        $file = $js_files[$mode] ?? $js_files['bundle'];

        wp_enqueue_script('bootstrap', $base_url . $file, [], $version, true);
    }
}
add_action('wp_enqueue_scripts', 'ds_enqueue_bootstrap', 5);

/* ── Add crossorigin attribute to CDN resources ────────── */

function ds_bootstrap_tag_attributes(string $tag, string $handle): string {
    if ($handle === 'bootstrap' && strpos($tag, 'cdn.jsdelivr.net') !== false) {
        // Only add if not already present
        if (strpos($tag, 'crossorigin') === false) {
            $tag = str_replace(' href=', ' crossorigin="anonymous" href=', $tag);
            $tag = str_replace(' src=', ' crossorigin="anonymous" src=', $tag);
        }
    }
    return $tag;
}
add_filter('style_loader_tag', 'ds_bootstrap_tag_attributes', 10, 2);
add_filter('script_loader_tag', 'ds_bootstrap_tag_attributes', 10, 2);
