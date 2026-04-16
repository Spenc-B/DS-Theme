<?php
/**
 * Developer Starter – Admin Settings
 *
 * Native WordPress Settings API admin page with tabbed interface.
 * Controls Bootstrap loading, performance, features, and custom code.
 */

if (! defined('ABSPATH')) {
    exit;
}

class DS_Admin_Settings {

    const OPTION = 'ds_theme_settings';
    const SLUG   = 'ds-parent-theme';
    const GROUP  = 'ds_settings_group';

    private array $tabs;
    private array $defaults;
    private static ?self $instance = null;

    public static function instance(): self {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct() {
        $this->defaults = [
            // Bootstrap
            'bootstrap_css'                => 1,
            'bootstrap_css_mode'           => 'full',
            'bootstrap_js'                 => 1,
            'bootstrap_js_mode'            => 'bundle',
            'bootstrap_version'            => '5.3.3',
            'bootstrap_disabled'           => [],
            'bootstrap_debugger'           => 1,
            // Performance
            'disable_emoji'                => 1,
            'disable_embed'                => 1,
            'disable_dashicons'            => 1,
            'disable_jquery_migrate'       => 0,
            'disable_block_css'            => 0,
            'disable_global_styles'        => 0,
            'disable_classic_theme_styles' => 0,
            'disable_xmlrpc'               => 0,
            'disable_rsd'                  => 1,
            'disable_wlw'                  => 1,
            'disable_shortlink'            => 1,
            'disable_feed_links'           => 0,
            'disable_rest_api_public'      => 0,
            // Features
            'enable_svg_upload'            => 1,
            'enable_dark_mode'             => 1,
            'enable_breadcrumbs'           => 1,
            'enable_custom_login'          => 0,
            'maintenance_mode'             => 0,
            // Custom Code
            'header_scripts'               => '',
            'footer_scripts'               => '',
            'custom_css'                   => '',
        ];

        $this->tabs = [
            'bootstrap'   => __('Bootstrap', 'developer-starter'),
            'performance' => __('Performance', 'developer-starter'),
            'features'    => __('Features', 'developer-starter'),
            'code'        => __('Custom Code', 'developer-starter'),
        ];

        add_action('admin_menu', [$this, 'register_menu']);
        add_action('admin_init', [$this, 'register_settings']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    /* ── Public API ────────────────────────────────────── */

    /**
     * Retrieve a single setting value.
     */
    public function get(string $key, $fallback = null) {
        $options = get_option(self::OPTION, []);
        $default = $fallback ?? ($this->defaults[$key] ?? '');
        return $options[$key] ?? $default;
    }

    /* ── Registration ──────────────────────────────────── */

    public function register_menu(): void {
        add_menu_page(
            __('Developer Starter', 'developer-starter'),
            __('Dev Starter', 'developer-starter'),
            'manage_options',
            self::SLUG,
            [$this, 'render_page'],
            'dashicons-admin-generic',
            61
        );
    }

    public function register_settings(): void {
        register_setting(self::GROUP, self::OPTION, [
            'sanitize_callback' => [$this, 'sanitize'],
            'default'           => $this->defaults,
        ]);
    }

    public function sanitize(array $input): array {
        $clean = [];

        $booleans = [
            'bootstrap_css', 'bootstrap_js', 'bootstrap_debugger',
            'disable_emoji', 'disable_embed', 'disable_dashicons',
            'disable_jquery_migrate', 'disable_block_css',
            'disable_global_styles', 'disable_classic_theme_styles',
            'disable_xmlrpc', 'disable_rsd', 'disable_wlw',
            'disable_shortlink', 'disable_feed_links', 'disable_rest_api_public',
            'enable_svg_upload', 'enable_dark_mode', 'enable_breadcrumbs',
            'enable_custom_login', 'maintenance_mode',
        ];

        foreach ($booleans as $key) {
            $clean[$key] = isset($input[$key]) && $input[$key] ? 1 : 0;
        }

        $css_modes = ['full', 'grid', 'reboot', 'utilities'];
        $clean['bootstrap_css_mode'] = in_array($input['bootstrap_css_mode'] ?? '', $css_modes, true)
            ? $input['bootstrap_css_mode'] : 'full';

        $js_modes = ['bundle', 'core'];
        $clean['bootstrap_js_mode'] = in_array($input['bootstrap_js_mode'] ?? '', $js_modes, true)
            ? $input['bootstrap_js_mode'] : 'bundle';

        $version = sanitize_text_field($input['bootstrap_version'] ?? '5.3.3');
        $clean['bootstrap_version'] = preg_match('/^\d+\.\d+\.\d+$/', $version) ? $version : '5.3.3';

        // Bootstrap components — compute disabled from enabled checkboxes or preserve hidden list
        $all_slugs = self::all_component_slugs();
        if (isset($input['bootstrap_components']) && is_array($input['bootstrap_components'])) {
            $enabled = array_intersect($input['bootstrap_components'], $all_slugs);
            $clean['bootstrap_disabled'] = array_values(array_diff($all_slugs, $enabled));
        } else {
            $disabled = isset($input['bootstrap_disabled']) && is_array($input['bootstrap_disabled'])
                ? $input['bootstrap_disabled'] : [];
            $clean['bootstrap_disabled'] = array_values(array_intersect($disabled, $all_slugs));
        }

        if (current_user_can('unfiltered_html')) {
            $clean['header_scripts'] = $input['header_scripts'] ?? '';
            $clean['footer_scripts'] = $input['footer_scripts'] ?? '';
        } else {
            $clean['header_scripts'] = wp_kses_post($input['header_scripts'] ?? '');
            $clean['footer_scripts'] = wp_kses_post($input['footer_scripts'] ?? '');
        }

        $clean['custom_css'] = wp_strip_all_tags($input['custom_css'] ?? '');

        return $clean;
    }

    /* ── Admin Assets ──────────────────────────────────── */

    public function enqueue_assets(string $hook): void {
        if ($hook !== 'toplevel_page_' . self::SLUG) {
            return;
        }

        $dir = get_template_directory();
        $uri = get_template_directory_uri();

        wp_enqueue_style(
            'ds-admin-settings',
            $uri . '/assets/css/admin-settings.css',
            [],
            filemtime($dir . '/assets/css/admin-settings.css')
        );

        wp_enqueue_script(
            'ds-admin-settings',
            $uri . '/assets/js/admin-settings.js',
            [],
            filemtime($dir . '/assets/js/admin-settings.js'),
            true
        );
    }

    /* ── Page Rendering ────────────────────────────────── */

    private function active_tab(): string {
        $tab = isset($_GET['tab']) ? sanitize_key(wp_unslash($_GET['tab'])) : 'bootstrap';
        return array_key_exists($tab, $this->tabs) ? $tab : 'bootstrap';
    }

    public function render_page(): void {
        if (! current_user_can('manage_options')) {
            return;
        }

        $active = $this->active_tab();
        ?>
        <div class="wrap ds-settings-wrap">
            <h1><?php esc_html_e('Developer Starter — Theme Settings', 'developer-starter'); ?></h1>

            <?php settings_errors(self::OPTION); ?>

            <nav class="nav-tab-wrapper ds-tabs">
                <?php foreach ($this->tabs as $slug => $label) : ?>
                    <a href="<?php echo esc_url(admin_url('admin.php?page=' . self::SLUG . '&tab=' . $slug)); ?>"
                       class="nav-tab <?php echo $active === $slug ? 'nav-tab-active' : ''; ?>">
                        <?php echo esc_html($label); ?>
                    </a>
                <?php endforeach; ?>
            </nav>

            <form method="post" action="options.php" class="ds-settings-form">
                <?php settings_fields(self::GROUP); ?>

                <?php $this->render_tab($active); ?>
                <?php $this->render_hidden_tabs($active); ?>

                <?php submit_button(__('Save Settings', 'developer-starter')); ?>
            </form>
        </div>
        <?php
    }

    private function render_tab(string $tab): void {
        match ($tab) {
            'bootstrap'   => $this->render_bootstrap_tab(),
            'performance' => $this->render_performance_tab(),
            'features'    => $this->render_features_tab(),
            'code'        => $this->render_code_tab(),
        };
    }

    /**
     * Preserve settings from non-visible tabs as hidden inputs so
     * they aren't wiped when the user saves from a single tab.
     */
    private function render_hidden_tabs(string $active_tab): void {
        $options = wp_parse_args(get_option(self::OPTION, []), $this->defaults);

        $tab_keys = [
            'bootstrap'   => ['bootstrap_css', 'bootstrap_css_mode', 'bootstrap_js', 'bootstrap_js_mode', 'bootstrap_version', 'bootstrap_debugger'],
            'performance' => ['disable_emoji', 'disable_embed', 'disable_dashicons', 'disable_jquery_migrate', 'disable_block_css', 'disable_global_styles', 'disable_classic_theme_styles', 'disable_xmlrpc', 'disable_rsd', 'disable_wlw', 'disable_shortlink', 'disable_feed_links', 'disable_rest_api_public'],
            'features'    => ['enable_svg_upload', 'enable_dark_mode', 'enable_breadcrumbs', 'enable_custom_login', 'maintenance_mode'],
            'code'        => ['header_scripts', 'footer_scripts', 'custom_css'],
        ];

        foreach ($tab_keys as $tab => $keys) {
            if ($tab === $active_tab) {
                continue;
            }
            foreach ($keys as $key) {
                $value = $options[$key] ?? '';
                printf(
                    '<input type="hidden" name="%s" value="%s" />',
                    esc_attr(self::OPTION . '[' . $key . ']'),
                    esc_attr($value)
                );
            }
        }

        // Preserve bootstrap_disabled array when not on bootstrap tab
        if ($active_tab !== 'bootstrap') {
            $disabled = (array) ($options['bootstrap_disabled'] ?? []);
            foreach ($disabled as $slug) {
                printf(
                    '<input type="hidden" name="%s" value="%s" />',
                    esc_attr(self::OPTION . '[bootstrap_disabled][]'),
                    esc_attr($slug)
                );
            }
        }
    }

    /* ── Tab: Bootstrap ────────────────────────────────── */

    private function render_bootstrap_tab(): void {
        $disabled = (array) $this->get('bootstrap_disabled', []);
        $map = self::bootstrap_component_map();
        ?>
        <div class="ds-settings-section">
            <h2><?php esc_html_e('Bootstrap CSS', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Load Bootstrap CSS from the jsDelivr CDN on the front end.', 'developer-starter'); ?></p>

            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Enable CSS', 'developer-starter'); ?></th>
                    <td>
                        <label class="ds-toggle">
                            <input type="checkbox"
                                   name="<?php echo esc_attr(self::OPTION); ?>[bootstrap_css]"
                                   value="1"
                                   <?php checked($this->get('bootstrap_css'), 1); ?>>
                            <span class="ds-toggle__slider"></span>
                            <span class="ds-toggle__label"><?php esc_html_e('Load Bootstrap stylesheet', 'developer-starter'); ?></span>
                        </label>
                    </td>
                </tr>
                <tr class="ds-conditional" data-depends="bootstrap_css">
                    <th scope="row"><?php esc_html_e('CSS Variant', 'developer-starter'); ?></th>
                    <td>
                        <select name="<?php echo esc_attr(self::OPTION); ?>[bootstrap_css_mode]">
                            <option value="full" <?php selected($this->get('bootstrap_css_mode'), 'full'); ?>>
                                <?php esc_html_e('Full (all components)', 'developer-starter'); ?>
                            </option>
                            <option value="grid" <?php selected($this->get('bootstrap_css_mode'), 'grid'); ?>>
                                <?php esc_html_e('Grid only', 'developer-starter'); ?>
                            </option>
                            <option value="reboot" <?php selected($this->get('bootstrap_css_mode'), 'reboot'); ?>>
                                <?php esc_html_e('Reboot only (CSS reset)', 'developer-starter'); ?>
                            </option>
                            <option value="utilities" <?php selected($this->get('bootstrap_css_mode'), 'utilities'); ?>>
                                <?php esc_html_e('Utilities only', 'developer-starter'); ?>
                            </option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>

        <div class="ds-settings-section">
            <h2><?php esc_html_e('Bootstrap JavaScript', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Load Bootstrap JS from the jsDelivr CDN on the front end.', 'developer-starter'); ?></p>

            <table class="form-table">
                <tr>
                    <th scope="row"><?php esc_html_e('Enable JS', 'developer-starter'); ?></th>
                    <td>
                        <label class="ds-toggle">
                            <input type="checkbox"
                                   name="<?php echo esc_attr(self::OPTION); ?>[bootstrap_js]"
                                   value="1"
                                   <?php checked($this->get('bootstrap_js'), 1); ?>>
                            <span class="ds-toggle__slider"></span>
                            <span class="ds-toggle__label"><?php esc_html_e('Load Bootstrap scripts', 'developer-starter'); ?></span>
                        </label>
                    </td>
                </tr>
                <tr class="ds-conditional" data-depends="bootstrap_js">
                    <th scope="row"><?php esc_html_e('JS Variant', 'developer-starter'); ?></th>
                    <td>
                        <select name="<?php echo esc_attr(self::OPTION); ?>[bootstrap_js_mode]">
                            <option value="bundle" <?php selected($this->get('bootstrap_js_mode'), 'bundle'); ?>>
                                <?php esc_html_e('Bundle (includes Popper.js)', 'developer-starter'); ?>
                            </option>
                            <option value="core" <?php selected($this->get('bootstrap_js_mode'), 'core'); ?>>
                                <?php esc_html_e('Core only (no Popper.js)', 'developer-starter'); ?>
                            </option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>

        <div class="ds-settings-section">
            <h2><?php esc_html_e('Component Tracking', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Select which Bootstrap components your theme uses. The admin bar debugger uses this list to flag unused or missing components on the front end.', 'developer-starter'); ?></p>

            <div class="ds-comp-actions">
                <button type="button" class="button button-small ds-comp-select-all"><?php esc_html_e('Select All', 'developer-starter'); ?></button>
                <button type="button" class="button button-small ds-comp-select-none"><?php esc_html_e('Deselect All', 'developer-starter'); ?></button>
            </div>

            <?php foreach ($map as $category => $components) : ?>
                <div class="ds-comp-group" data-group="<?php echo esc_attr(sanitize_title($category)); ?>">
                    <h3 class="ds-comp-group__title">
                        <?php echo esc_html($category); ?>
                        <button type="button" class="ds-comp-group__toggle"><?php esc_html_e('all', 'developer-starter'); ?></button>
                        <button type="button" class="ds-comp-group__toggle ds-comp-group__toggle--none"><?php esc_html_e('none', 'developer-starter'); ?></button>
                    </h3>
                    <div class="ds-comp-grid">
                        <?php foreach ($components as $slug => $label) : ?>
                            <label class="ds-comp-item">
                                <input type="checkbox"
                                       name="<?php echo esc_attr(self::OPTION); ?>[bootstrap_components][]"
                                       value="<?php echo esc_attr($slug); ?>"
                                       <?php checked(! in_array($slug, $disabled, true)); ?>>
                                <span class="ds-comp-item__check"></span>
                                <span class="ds-comp-item__label"><?php echo esc_html($label); ?></span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="ds-settings-section">
            <h2><?php esc_html_e('Settings', 'developer-starter'); ?></h2>
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="ds-bs-version"><?php esc_html_e('Bootstrap Version', 'developer-starter'); ?></label>
                    </th>
                    <td>
                        <input type="text"
                               id="ds-bs-version"
                               name="<?php echo esc_attr(self::OPTION); ?>[bootstrap_version]"
                               value="<?php echo esc_attr($this->get('bootstrap_version')); ?>"
                               class="regular-text"
                               placeholder="5.3.3"
                               pattern="\d+\.\d+\.\d+">
                        <p class="description">
                            <?php esc_html_e('Semantic version (e.g. 5.3.3). Files loaded from cdn.jsdelivr.net.', 'developer-starter'); ?>
                        </p>
                    </td>
                </tr>
                <?php $this->toggle_row('bootstrap_debugger', __('Admin bar Bootstrap Debugger', 'developer-starter')); ?>
            </table>
        </div>
        <?php
    }

    /* ── Tab: Performance ──────────────────────────────── */

    private function render_performance_tab(): void {
        ?>
        <div class="ds-settings-section">
            <h2><?php esc_html_e('Head Cleanup', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Remove unnecessary tags and scripts from wp_head output.', 'developer-starter'); ?></p>
            <table class="form-table">
                <?php
                $this->toggle_row('disable_emoji', __('Disable emoji scripts &amp; styles', 'developer-starter'));
                $this->toggle_row('disable_embed', __('Disable wp-embed script', 'developer-starter'));
                $this->toggle_row('disable_rsd', __('Remove RSD link', 'developer-starter'));
                $this->toggle_row('disable_wlw', __('Remove Windows Live Writer link', 'developer-starter'));
                $this->toggle_row('disable_shortlink', __('Remove shortlink', 'developer-starter'));
                $this->toggle_row('disable_feed_links', __('Remove RSS feed links', 'developer-starter'));
                ?>
            </table>
        </div>

        <div class="ds-settings-section">
            <h2><?php esc_html_e('Assets', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Control which default WordPress assets load on the front end.', 'developer-starter'); ?></p>
            <table class="form-table">
                <?php
                $this->toggle_row('disable_dashicons', __('Remove Dashicons (logged-out users)', 'developer-starter'));
                $this->toggle_row('disable_jquery_migrate', __('Disable jQuery Migrate', 'developer-starter'));
                $this->toggle_row('disable_block_css', __('Remove block library CSS', 'developer-starter'));
                $this->toggle_row('disable_global_styles', __('Remove global styles inline CSS', 'developer-starter'));
                $this->toggle_row('disable_classic_theme_styles', __('Remove classic theme styles', 'developer-starter'));
                ?>
            </table>
        </div>

        <div class="ds-settings-section">
            <h2><?php esc_html_e('Security', 'developer-starter'); ?></h2>
            <table class="form-table">
                <?php
                $this->toggle_row('disable_xmlrpc', __('Disable XML-RPC', 'developer-starter'));
                $this->toggle_row('disable_rest_api_public', __('Restrict REST API to logged-in users', 'developer-starter'));
                ?>
            </table>
        </div>
        <?php
    }

    /* ── Tab: Features ─────────────────────────────────── */

    private function render_features_tab(): void {
        ?>
        <div class="ds-settings-section">
            <h2><?php esc_html_e('Theme Features', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Toggle built-in theme features on or off.', 'developer-starter'); ?></p>
            <table class="form-table">
                <?php
                $this->toggle_row('enable_svg_upload', __('Allow SVG uploads', 'developer-starter'));
                $this->toggle_row('enable_dark_mode', __('Enable dark mode toggle', 'developer-starter'));
                $this->toggle_row('enable_breadcrumbs', __('Enable breadcrumbs shortcode', 'developer-starter'));
                $this->toggle_row('enable_custom_login', __('Custom login page (requires ACF)', 'developer-starter'));
                $this->toggle_row('maintenance_mode', __('Maintenance mode (logged-out users see a notice)', 'developer-starter'));
                ?>
            </table>
        </div>
        <?php
    }

    /* ── Tab: Custom Code ──────────────────────────────── */

    private function render_code_tab(): void {
        ?>
        <div class="ds-settings-section">
            <h2><?php esc_html_e('Header Scripts', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Output before the closing </head> tag. Use for analytics, meta tags, etc.', 'developer-starter'); ?></p>
            <textarea name="<?php echo esc_attr(self::OPTION); ?>[header_scripts]"
                      rows="8" class="large-text code"><?php echo esc_textarea($this->get('header_scripts')); ?></textarea>
        </div>

        <div class="ds-settings-section">
            <h2><?php esc_html_e('Footer Scripts', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Output before the closing </body> tag. Use for tracking pixels, chat widgets, etc.', 'developer-starter'); ?></p>
            <textarea name="<?php echo esc_attr(self::OPTION); ?>[footer_scripts]"
                      rows="8" class="large-text code"><?php echo esc_textarea($this->get('footer_scripts')); ?></textarea>
        </div>

        <div class="ds-settings-section">
            <h2><?php esc_html_e('Custom CSS', 'developer-starter'); ?></h2>
            <p class="description"><?php esc_html_e('Added inline on the front end. No <style> tags needed.', 'developer-starter'); ?></p>
            <textarea name="<?php echo esc_attr(self::OPTION); ?>[custom_css]"
                      rows="12" class="large-text code"><?php echo esc_textarea($this->get('custom_css')); ?></textarea>
        </div>
        <?php
    }

    /* ── Bootstrap Component Map ───────────────────────── */

    public static function bootstrap_component_map(): array {
        return [
            'Layout' => [
                'grid'       => 'Grid System',
                'containers' => 'Containers',
            ],
            'Content' => [
                'typography' => 'Typography',
                'images'     => 'Images',
                'tables'     => 'Tables',
            ],
            'Forms' => [
                'forms'       => 'Form Controls',
                'input_group' => 'Input Groups',
            ],
            'Components' => [
                'accordion'    => 'Accordion',
                'alerts'       => 'Alerts',
                'badge'        => 'Badge',
                'breadcrumb'   => 'Breadcrumb',
                'buttons'      => 'Buttons',
                'button_group' => 'Button Group',
                'card'         => 'Cards',
                'carousel'     => 'Carousel',
                'collapse'     => 'Collapse',
                'dropdowns'    => 'Dropdowns',
                'list_group'   => 'List Group',
                'modal'        => 'Modal',
                'navbar'       => 'Navbar',
                'navs_tabs'    => 'Navs & Tabs',
                'offcanvas'    => 'Offcanvas',
                'pagination'   => 'Pagination',
                'placeholders' => 'Placeholders',
                'popovers'     => 'Popovers',
                'progress'     => 'Progress',
                'scrollspy'    => 'Scrollspy',
                'spinners'     => 'Spinners',
                'toasts'       => 'Toasts',
                'tooltips'     => 'Tooltips',
            ],
            'Utilities' => [
                'utilities' => 'Utility Classes',
                'helpers'   => 'Helpers',
            ],
        ];
    }

    public static function all_component_slugs(): array {
        $slugs = [];
        foreach (self::bootstrap_component_map() as $components) {
            foreach ($components as $slug => $label) {
                $slugs[] = $slug;
            }
        }
        return $slugs;
    }

    /* ── Helpers ────────────────────────────────────────── */

    private function toggle_row(string $key, string $label): void {
        ?>
        <tr>
            <th scope="row"><?php echo wp_kses_post($label); ?></th>
            <td>
                <label class="ds-toggle">
                    <input type="checkbox"
                           name="<?php echo esc_attr(self::OPTION . '[' . $key . ']'); ?>"
                           value="1"
                           <?php checked($this->get($key), 1); ?>>
                    <span class="ds-toggle__slider"></span>
                </label>
            </td>
        </tr>
        <?php
    }
}

/* ── Boot ───────────────────────────────────────────────── */

DS_Admin_Settings::instance();

/**
 * Global helper — retrieve a theme setting from any file.
 *
 * Usage: ds_setting('bootstrap_css')
 */
function ds_setting(string $key, $default = null) {
    return DS_Admin_Settings::instance()->get($key, $default);
}
