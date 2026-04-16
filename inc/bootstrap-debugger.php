<?php
/**
 * Bootstrap Debugger
 *
 * Admin-only tool that scans the page DOM for Bootstrap component usage.
 * Adds a button to the WP Admin Bar that opens a slide-out debug panel.
 */

if (! defined('ABSPATH')) {
    exit;
}

function ds_bootstrap_debugger_init(): void {
    if (! is_user_logged_in() || ! current_user_can('manage_options')) {
        return;
    }
    if (is_admin()) {
        return;
    }
    if (! ds_setting('bootstrap_debugger')) {
        return;
    }

    add_action('admin_bar_menu', 'ds_bootstrap_debugger_admin_bar', 999);
    add_action('wp_footer', 'ds_bootstrap_debugger_panel', 999);
    add_action('wp_enqueue_scripts', 'ds_bootstrap_debugger_assets', 100);
}
add_action('init', 'ds_bootstrap_debugger_init');

function ds_bootstrap_debugger_admin_bar(\WP_Admin_Bar $admin_bar): void {
    $admin_bar->add_node([
        'id'    => 'ds-bs-debugger',
        'title' => '<span class="ab-icon dashicons dashicons-code-standards" style="font-family:dashicons;font-size:20px;line-height:1.6;margin-right:4px;"></span>'
                   . esc_html__('BS Debug', 'developer-starter'),
        'href'  => '#',
        'meta'  => [
            'class' => 'ds-bs-debugger-trigger',
            'title' => __('Bootstrap Component Debugger', 'developer-starter'),
        ],
    ]);
}

function ds_bootstrap_debugger_assets(): void {
    $dir = get_template_directory();
    $uri = get_template_directory_uri();

    wp_enqueue_script(
        'ds-bs-debugger',
        $uri . '/assets/js/bootstrap-debugger.js',
        [],
        filemtime($dir . '/assets/js/bootstrap-debugger.js'),
        true
    );

    $disabled  = (array) ds_setting('bootstrap_disabled', []);
    $all_slugs = DS_Admin_Settings::all_component_slugs();
    $enabled   = array_values(array_diff($all_slugs, $disabled));

    wp_localize_script('ds-bs-debugger', 'dsBootstrapDebugger', [
        'enabled'     => $enabled,
        'disabled'    => array_values($disabled),
        'cssLoaded'   => (bool) ds_setting('bootstrap_css'),
        'jsLoaded'    => (bool) ds_setting('bootstrap_js'),
        'version'     => ds_setting('bootstrap_version', '5.3.3'),
        'settingsUrl' => admin_url('admin.php?page=ds-parent-theme&tab=bootstrap'),
    ]);
}

function ds_bootstrap_debugger_panel(): void {
    ?>
    <div id="ds-bs-debug-panel" class="ds-bs-debug-panel" aria-hidden="true" role="dialog"
         aria-label="<?php esc_attr_e('Bootstrap Debugger', 'developer-starter'); ?>">
        <div class="ds-bs-debug-panel__header">
            <h2><?php esc_html_e('Bootstrap Debugger', 'developer-starter'); ?></h2>
            <button type="button" class="ds-bs-debug-panel__close"
                    aria-label="<?php esc_attr_e('Close', 'developer-starter'); ?>">&times;</button>
        </div>
        <div class="ds-bs-debug-panel__meta"></div>
        <div class="ds-bs-debug-panel__body">
            <div class="ds-bs-debug-panel__loading">
                <?php esc_html_e('Scanning page…', 'developer-starter'); ?>
            </div>
        </div>
        <div class="ds-bs-debug-panel__footer">
            <a href="<?php echo esc_url(admin_url('admin.php?page=ds-parent-theme&tab=bootstrap')); ?>"
               class="ds-bs-debug-panel__link">
                <?php esc_html_e('Bootstrap Settings', 'developer-starter'); ?> &rarr;
            </a>
        </div>
    </div>

    <style id="ds-bs-debug-styles">
        .ds-bs-debug-panel {
            position: fixed;
            top: 32px;
            right: -420px;
            width: 400px;
            max-width: calc(100vw - 20px);
            height: calc(100vh - 32px);
            background: #1d2327;
            color: #f0f0f1;
            z-index: 99999;
            transition: right .3s ease;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            box-shadow: -4px 0 20px rgba(0,0,0,.3);
        }
        .ds-bs-debug-panel.is-open { right: 0; }

        .ds-bs-debug-panel__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 16px;
            border-bottom: 1px solid #3c434a;
            flex-shrink: 0;
        }
        .ds-bs-debug-panel__header h2 {
            margin: 0;
            font-size: 15px;
            font-weight: 600;
            color: #f0f0f1;
        }
        .ds-bs-debug-panel__close {
            background: none;
            border: none;
            color: #a7aaad;
            font-size: 22px;
            line-height: 1;
            cursor: pointer;
            padding: 4px;
        }
        .ds-bs-debug-panel__close:hover { color: #f0f0f1; }

        .ds-bs-debug-panel__meta {
            padding: 10px 16px;
            border-bottom: 1px solid #3c434a;
            font-size: 12px;
            color: #a7aaad;
            flex-shrink: 0;
        }

        .ds-bs-debug-panel__body {
            padding: 12px 16px;
            overflow-y: auto;
            flex: 1;
        }
        .ds-bs-debug-panel__loading {
            color: #a7aaad;
            font-style: italic;
        }

        .ds-bs-debug-panel__footer {
            padding: 10px 16px;
            border-top: 1px solid #3c434a;
            flex-shrink: 0;
        }
        .ds-bs-debug-panel__link {
            color: #E17055;
            text-decoration: none;
            font-size: 12px;
        }
        .ds-bs-debug-panel__link:hover { color: #fff; }

        /* Results */
        .ds-bsd-summary {
            display: flex;
            gap: 16px;
            margin-bottom: 12px;
        }
        .ds-bsd-summary__stat { text-align: center; }
        .ds-bsd-summary__num {
            display: block;
            font-size: 20px;
            font-weight: 600;
            line-height: 1.2;
        }
        .ds-bsd-summary__num--green  { color: #00a32a; }
        .ds-bsd-summary__num--yellow { color: #dba617; }
        .ds-bsd-summary__num--red    { color: #d63638; }
        .ds-bsd-summary__num--gray   { color: #646970; }

        .ds-bsd-legend {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-bottom: 14px;
            font-size: 11px;
            color: #a7aaad;
        }
        .ds-bsd-legend span {
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .ds-bsd-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .ds-bsd-dot--active   { background: #00a32a; }
        .ds-bsd-dot--unused   { background: #dba617; }
        .ds-bsd-dot--disabled { background: #d63638; }
        .ds-bsd-dot--off      { background: #646970; }

        .ds-bsd-group { margin-bottom: 16px; }
        .ds-bsd-group__title {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: .05em;
            color: #a7aaad;
            margin: 0 0 6px;
            padding-bottom: 4px;
            border-bottom: 1px solid #3c434a;
        }
        .ds-bsd-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 0;
            font-size: 13px;
        }
        .ds-bsd-count {
            margin-left: auto;
            font-size: 11px;
            color: #a7aaad;
        }
        .ds-bsd-item__highlight-btn {
            background: none;
            border: 1px solid #3c434a;
            color: #a7aaad;
            font-size: 10px;
            padding: 1px 6px;
            border-radius: 3px;
            cursor: pointer;
            margin-left: 4px;
        }
        .ds-bsd-item__highlight-btn:hover {
            border-color: #E17055;
            color: #E17055;
        }
        .ds-bsd-highlight {
            outline: 2px dashed #E17055 !important;
            outline-offset: 2px !important;
        }
    </style>
    <?php
}
