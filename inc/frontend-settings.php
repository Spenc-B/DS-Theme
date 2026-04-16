<?php
/**
 * Frontend Settings Applier
 *
 * Applies performance, feature, and custom-code settings on the front end.
 * Reads values from the DS_Admin_Settings singleton.
 */

if (! defined('ABSPATH')) {
    exit;
}

/* ── Head Cleanup ──────────────────────────────────────── */

function ds_apply_head_cleanup(): void {
    if (ds_setting('disable_emoji')) {
        remove_action('wp_head', 'print_emoji_detection_script', 7);
        remove_action('wp_print_styles', 'print_emoji_styles');
        remove_action('admin_print_scripts', 'print_emoji_detection_script');
        remove_action('admin_print_styles', 'print_emoji_styles');
    }

    if (ds_setting('disable_rsd')) {
        remove_action('wp_head', 'rsd_link');
    }

    if (ds_setting('disable_wlw')) {
        remove_action('wp_head', 'wlwmanifest_link');
    }

    if (ds_setting('disable_shortlink')) {
        remove_action('wp_head', 'wp_shortlink_wp_head', 10);
        remove_action('template_redirect', 'wp_shortlink_header', 11);
    }

    if (ds_setting('disable_feed_links')) {
        remove_action('wp_head', 'feed_links', 2);
        remove_action('wp_head', 'feed_links_extra', 3);
    }

    if (ds_setting('disable_xmlrpc')) {
        add_filter('xmlrpc_enabled', '__return_false');
    }

    if (ds_setting('disable_rest_api_public')) {
        add_filter('rest_authentication_errors', function ($result) {
            if (true === $result || is_wp_error($result)) {
                return $result;
            }
            if (! is_user_logged_in()) {
                return new WP_Error(
                    'rest_not_logged_in',
                    __('REST API restricted to authenticated users.', 'developer-starter'),
                    ['status' => 401]
                );
            }
            return $result;
        });
    }
}
add_action('init', 'ds_apply_head_cleanup');

/* ── Asset Cleanup ─────────────────────────────────────── */

function ds_apply_asset_cleanup(): void {
    if (is_admin()) {
        return;
    }

    if (ds_setting('disable_dashicons') && ! is_user_logged_in()) {
        wp_dequeue_style('dashicons');
    }

    if (ds_setting('disable_embed')) {
        wp_dequeue_script('wp-embed');
    }

    if (ds_setting('disable_jquery_migrate')) {
        global $wp_scripts;
        if (isset($wp_scripts->registered['jquery'])) {
            $wp_scripts->registered['jquery']->deps = array_diff(
                $wp_scripts->registered['jquery']->deps,
                ['jquery-migrate']
            );
        }
    }

    if (ds_setting('disable_block_css')) {
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('wp-block-library-theme');
    }

    if (ds_setting('disable_global_styles')) {
        wp_dequeue_style('global-styles');
    }

    if (ds_setting('disable_classic_theme_styles')) {
        wp_dequeue_style('classic-theme-styles');
    }
}
add_action('wp_enqueue_scripts', 'ds_apply_asset_cleanup', 999);

/* ── Custom Scripts & CSS ──────────────────────────────── */

function ds_output_header_scripts(): void {
    $scripts = ds_setting('header_scripts');
    if (! empty($scripts)) {
        // Only administrators can save this value (manage_options + unfiltered_html).
        echo "\n", $scripts, "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }
}
add_action('wp_head', 'ds_output_header_scripts', 999);

function ds_output_footer_scripts(): void {
    $scripts = ds_setting('footer_scripts');
    if (! empty($scripts)) {
        echo "\n", $scripts, "\n"; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
    }
}
add_action('wp_footer', 'ds_output_footer_scripts', 999);

function ds_output_custom_css(): void {
    $css = ds_setting('custom_css');
    if (! empty($css)) {
        echo '<style id="ds-custom-css">' . "\n" . wp_strip_all_tags($css) . "\n</style>\n";
    }
}
add_action('wp_head', 'ds_output_custom_css', 100);

/* ── Maintenance Mode ──────────────────────────────────── */

function ds_maintenance_mode(): void {
    if (ds_setting('maintenance_mode') && ! is_user_logged_in() && ! is_admin()) {
        wp_die(
            '<h1>' . esc_html__('Under Maintenance', 'developer-starter') . '</h1>'
            . '<p>' . esc_html__('We are currently performing maintenance. Please check back soon.', 'developer-starter') . '</p>',
            esc_html__('Maintenance Mode', 'developer-starter'),
            ['response' => 503]
        );
    }
}
add_action('template_redirect', 'ds_maintenance_mode');
