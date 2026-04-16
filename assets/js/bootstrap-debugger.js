/**
 * Bootstrap Debugger
 *
 * Scans the current page DOM for Bootstrap class usage and renders
 * results in a slide-out panel triggered from the WP Admin Bar.
 */
(function () {
    'use strict';

    if (typeof dsBootstrapDebugger === 'undefined') return;

    var config = dsBootstrapDebugger;
    var panel  = null;

    /* ── Component → CSS class detection map ──────────── */

    var detectionMap = {
        grid:          { label: 'Grid System',      css: ['row', 'col'] },
        containers:    { label: 'Containers',        css: ['container'] },
        typography:    { label: 'Typography',         css: ['display-', 'lead', 'fs-', 'fw-', 'fst-', 'lh-', 'font-monospace'] },
        images:        { label: 'Images',             css: ['img-fluid', 'img-thumbnail'] },
        tables:        { label: 'Tables',             css: ['table'] },
        forms:         { label: 'Form Controls',      css: ['form-control', 'form-select', 'form-check', 'form-switch', 'form-range', 'form-floating', 'form-label', 'form-text'] },
        input_group:   { label: 'Input Groups',       css: ['input-group'] },
        accordion:     { label: 'Accordion',          css: ['accordion'] },
        alerts:        { label: 'Alerts',             css: ['alert'] },
        badge:         { label: 'Badge',              css: ['badge'] },
        breadcrumb:    { label: 'Breadcrumb',         css: ['breadcrumb'] },
        buttons:       { label: 'Buttons',            css: ['btn'] },
        button_group:  { label: 'Button Group',       css: ['btn-group', 'btn-toolbar'] },
        card:          { label: 'Cards',              css: ['card'] },
        carousel:      { label: 'Carousel',           css: ['carousel'], data: ['bs-ride'] },
        collapse:      { label: 'Collapse',           css: ['collapse', 'collapsing'], data: ['bs-toggle=collapse'] },
        dropdowns:     { label: 'Dropdowns',          css: ['dropdown', 'dropup', 'dropend', 'dropstart'], data: ['bs-toggle=dropdown'] },
        list_group:    { label: 'List Group',         css: ['list-group'] },
        modal:         { label: 'Modal',              css: ['modal'], data: ['bs-toggle=modal'] },
        navbar:        { label: 'Navbar',             css: ['navbar'] },
        navs_tabs:     { label: 'Navs & Tabs',       css: ['nav-tabs', 'nav-pills', 'tab-content', 'tab-pane'], data: ['bs-toggle=tab', 'bs-toggle=pill'] },
        offcanvas:     { label: 'Offcanvas',          css: ['offcanvas'], data: ['bs-toggle=offcanvas'] },
        pagination:    { label: 'Pagination',         css: ['pagination', 'page-item', 'page-link'] },
        placeholders:  { label: 'Placeholders',       css: ['placeholder'] },
        popovers:      { label: 'Popovers',           css: ['popover'], data: ['bs-toggle=popover'] },
        progress:      { label: 'Progress',            css: ['progress'] },
        scrollspy:     { label: 'Scrollspy',           css: [], data: ['bs-spy'] },
        spinners:      { label: 'Spinners',            css: ['spinner-border', 'spinner-grow'] },
        toasts:        { label: 'Toasts',              css: ['toast'] },
        tooltips:      { label: 'Tooltips',            css: ['tooltip'], data: ['bs-toggle=tooltip'] },
        utilities:     { label: 'Utility Classes',     css: ['d-', 'flex-', 'justify-content-', 'align-items-', 'align-self-', 'order-', 'gap-', 'p-', 'px-', 'py-', 'pt-', 'pb-', 'ps-', 'pe-', 'm-', 'mx-', 'my-', 'mt-', 'mb-', 'ms-', 'me-', 'w-', 'h-', 'mw-', 'mh-', 'bg-', 'text-bg-', 'border', 'rounded', 'shadow', 'position-', 'float-', 'overflow-', 'opacity-', 'z-', 'visible', 'invisible'] },
        helpers:       { label: 'Helpers',             css: ['clearfix', 'visually-hidden', 'stretched-link', 'text-truncate', 'vr', 'ratio', 'icon-link', 'focus-ring', 'hstack', 'vstack'] }
    };

    var categories = {
        'Layout':     ['grid', 'containers'],
        'Content':    ['typography', 'images', 'tables'],
        'Forms':      ['forms', 'input_group'],
        'Components': ['accordion', 'alerts', 'badge', 'breadcrumb', 'buttons', 'button_group', 'card', 'carousel', 'collapse', 'dropdowns', 'list_group', 'modal', 'navbar', 'navs_tabs', 'offcanvas', 'pagination', 'placeholders', 'popovers', 'progress', 'scrollspy', 'spinners', 'toasts', 'tooltips'],
        'Utilities':  ['utilities', 'helpers']
    };

    /* ── Helpers ──────────────────────────────────────── */

    function classMatchesPrefix(cls, prefix) {
        if (prefix.charAt(prefix.length - 1) === '-') {
            return cls.indexOf(prefix) === 0;
        }
        return cls === prefix || cls.indexOf(prefix + '-') === 0;
    }

    function escHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    /* ── DOM Scanner ─────────────────────────────────── */

    function scanPage() {
        var results  = {};
        var elements = document.querySelectorAll('body *');

        Object.keys(detectionMap).forEach(function (key) {
            results[key] = { count: 0, elements: [] };
        });

        elements.forEach(function (el) {
            if (el.closest('#ds-bs-debug-panel') || el.closest('#wpadminbar')) return;

            var classList = el.className && typeof el.className === 'string'
                ? el.className.split(/\s+/) : [];

            Object.keys(detectionMap).forEach(function (compKey) {
                var comp    = detectionMap[compKey];
                var matched = false;

                // CSS class check
                if (comp.css && comp.css.length) {
                    for (var i = 0; i < classList.length; i++) {
                        for (var j = 0; j < comp.css.length; j++) {
                            if (classMatchesPrefix(classList[i], comp.css[j])) {
                                matched = true;
                                break;
                            }
                        }
                        if (matched) break;
                    }
                }

                // data-bs-* attribute check
                if (!matched && comp.data) {
                    for (var d = 0; d < comp.data.length; d++) {
                        var attr = comp.data[d];
                        if (attr.indexOf('=') !== -1) {
                            var parts = attr.split('=');
                            if (el.getAttribute('data-' + parts[0]) === parts[1]) {
                                matched = true;
                                break;
                            }
                        } else {
                            if (el.hasAttribute('data-' + attr)) {
                                matched = true;
                                break;
                            }
                        }
                    }
                }

                if (matched) {
                    results[compKey].count++;
                    if (results[compKey].elements.length < 5) {
                        results[compKey].elements.push(el);
                    }
                }
            });
        });

        return results;
    }

    /* ── Render Results ───────────────────────────────── */

    function renderResults(results) {
        var body = panel.querySelector('.ds-bs-debug-panel__body');
        var meta = panel.querySelector('.ds-bs-debug-panel__meta');

        var cssStatus = config.cssLoaded ? '\u2713 CSS loaded' : '\u2717 CSS not loaded';
        var jsStatus  = config.jsLoaded  ? '\u2713 JS loaded'  : '\u2717 JS not loaded';
        meta.innerHTML = '<strong>Bootstrap ' + escHtml(config.version) + '</strong> &nbsp;|&nbsp; '
            + cssStatus + ' &nbsp;|&nbsp; ' + jsStatus;

        var html = '';
        var activeCount = 0, unusedCount = 0, disabledCount = 0, offCount = 0;

        Object.keys(detectionMap).forEach(function (key) {
            var found   = results[key].count > 0;
            var enabled = config.enabled.indexOf(key) !== -1;
            if (found && enabled)   activeCount++;
            if (!found && enabled)  unusedCount++;
            if (found && !enabled)  disabledCount++;
            if (!found && !enabled) offCount++;
        });

        html += '<div class="ds-bsd-summary">';
        html += '<div class="ds-bsd-summary__stat"><span class="ds-bsd-summary__num ds-bsd-summary__num--green">'  + activeCount   + '</span>In Use</div>';
        html += '<div class="ds-bsd-summary__stat"><span class="ds-bsd-summary__num ds-bsd-summary__num--yellow">' + unusedCount   + '</span>Unused</div>';
        html += '<div class="ds-bsd-summary__stat"><span class="ds-bsd-summary__num ds-bsd-summary__num--red">'    + disabledCount + '</span>Disabled<br>but found</div>';
        html += '<div class="ds-bsd-summary__stat"><span class="ds-bsd-summary__num ds-bsd-summary__num--gray">'   + offCount      + '</span>Off</div>';
        html += '</div>';

        html += '<div class="ds-bsd-legend">';
        html += '<span><span class="ds-bsd-dot ds-bsd-dot--active"></span> In use &amp; enabled</span>';
        html += '<span><span class="ds-bsd-dot ds-bsd-dot--unused"></span> Enabled, no usage</span>';
        html += '<span><span class="ds-bsd-dot ds-bsd-dot--disabled"></span> Disabled but detected</span>';
        html += '<span><span class="ds-bsd-dot ds-bsd-dot--off"></span> Off &amp; not used</span>';
        html += '</div>';

        Object.keys(categories).forEach(function (cat) {
            html += '<div class="ds-bsd-group">';
            html += '<h3 class="ds-bsd-group__title">' + escHtml(cat) + '</h3>';

            categories[cat].forEach(function (key) {
                if (!detectionMap[key]) return;
                var found   = results[key].count > 0;
                var enabled = config.enabled.indexOf(key) !== -1;
                var dotClass, status;

                if (found && enabled)       { dotClass = 'active';   status = results[key].count + ' found'; }
                else if (!found && enabled)  { dotClass = 'unused';   status = 'no usage'; }
                else if (found && !enabled)  { dotClass = 'disabled'; status = results[key].count + ' found (disabled!)'; }
                else                         { dotClass = 'off';      status = 'off'; }

                html += '<div class="ds-bsd-item" data-component="' + key + '">';
                html += '<span class="ds-bsd-dot ds-bsd-dot--' + dotClass + '"></span>';
                html += '<span>' + escHtml(detectionMap[key].label) + '</span>';
                html += '<span class="ds-bsd-count">' + status + '</span>';
                if (found) {
                    html += '<button type="button" class="ds-bsd-item__highlight-btn" data-highlight="' + key + '">Show</button>';
                }
                html += '</div>';
            });

            html += '</div>';
        });

        body.innerHTML = html;

        // Bind highlight buttons
        body.querySelectorAll('[data-highlight]').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var key = this.getAttribute('data-highlight');
                highlightElements(results[key].elements);
            });
        });
    }

    function highlightElements(els) {
        document.querySelectorAll('.ds-bsd-highlight').forEach(function (el) {
            el.classList.remove('ds-bsd-highlight');
        });
        els.forEach(function (el) {
            el.classList.add('ds-bsd-highlight');
        });
        if (els.length) {
            els[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(function () {
            document.querySelectorAll('.ds-bsd-highlight').forEach(function (el) {
                el.classList.remove('ds-bsd-highlight');
            });
        }, 3000);
    }

    /* ── Toggle Panel ─────────────────────────────────── */

    function togglePanel() {
        if (!panel) panel = document.getElementById('ds-bs-debug-panel');
        if (!panel) return;

        var isOpen = panel.classList.toggle('is-open');
        panel.setAttribute('aria-hidden', !isOpen);

        if (isOpen) {
            var results = scanPage();
            renderResults(results);
        }
    }

    /* ── Init ─────────────────────────────────────────── */

    function init() {
        var trigger = document.querySelector('#wp-admin-bar-ds-bs-debugger > a');
        if (trigger) {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                togglePanel();
            });
        }

        panel = document.getElementById('ds-bs-debug-panel');
        if (panel) {
            panel.querySelector('.ds-bs-debug-panel__close')
                .addEventListener('click', togglePanel);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panel && panel.classList.contains('is-open')) {
                togglePanel();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
