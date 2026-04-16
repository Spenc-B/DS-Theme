/**
 * DS Editor Extensions — Global Bootstrap responsive controls.
 *
 * Adds a "Bootstrap Responsive" panel to EVERY block's inspector with:
 *  - Responsive margin / padding selectors (per breakpoint)
 *  - Bootstrap column class selectors (per breakpoint)
 *
 * Classes are written directly to the block's `className` attribute,
 * so they work with both SSR (render.php) and client-side save() blocks.
 */
(function () {
    var addFilter = wp.hooks.addFilter;
    var createHigherOrderComponent = wp.compose.createHigherOrderComponent;
    var Fragment = wp.element.Fragment;
    var el = wp.element.createElement;
    var InspectorControls = wp.blockEditor.InspectorControls;
    var PanelBody = wp.components.PanelBody;
    var SelectControl = wp.components.SelectControl;

    /* ── Bootstrap breakpoints ────────────────────────── */
    var BREAKPOINTS = [
        { label: 'All',  value: '' },
        { label: 'SM',   value: 'sm' },
        { label: 'MD',   value: 'md' },
        { label: 'LG',   value: 'lg' },
        { label: 'XL',   value: 'xl' },
        { label: 'XXL',  value: 'xxl' },
    ];

    /* ── Size options (0–5 + auto) ────────────────────── */
    var SIZE_OPTIONS = [
        { label: '—', value: '' },
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: 'Auto', value: 'auto' },
    ];

    /* ── Column options ───────────────────────────────── */
    var COL_OPTIONS = [{ label: '—', value: '' }, { label: 'auto', value: 'auto' }];
    for (var c = 1; c <= 12; c++) COL_OPTIONS.push({ label: String(c), value: String(c) });

    /* ── Spacing sides ────────────────────────────────── */
    var SIDES = [
        { label: 'All',    prefix: '' },
        { label: 'Top',    prefix: 't' },
        { label: 'Bottom', prefix: 'b' },
        { label: 'Start',  prefix: 's' },
        { label: 'End',    prefix: 'e' },
        { label: 'X',      prefix: 'x' },
        { label: 'Y',      prefix: 'y' },
    ];

    /* ── Helper: build a Bootstrap class from parts ───── */
    function bsClass(type, side, bp, size) {
        // e.g. mt-md-3, p-0, col-lg-6
        var parts = [type + side];
        if (bp) parts.push(bp);
        parts.push(size);
        return parts.join('-');
    }

    /* ── Regex patterns to match managed classes ──────── */
    var SPACING_REGEX = /\b[mp][tbsexy]?-(sm-|md-|lg-|xl-|xxl-)?(0|1|2|3|4|5|auto)\b/g;
    var COL_REGEX     = /\bcol-(sm-|md-|lg-|xl-|xxl-)?(auto|[1-9]|1[0-2])\b|\bcol\b/g;

    /* ── Parse current className to extract managed values ── */
    function parseSpacing(className, type) {
        var result = {};
        if (!className) return result;
        var regex = new RegExp('\\b' + type + '([tbsexy]?)-((?:sm|md|lg|xl|xxl)-)?(0|1|2|3|4|5|auto)\\b', 'g');
        var m;
        while ((m = regex.exec(className)) !== null) {
            var side = m[1] || '';
            var bp = m[2] ? m[2].replace('-', '') : '';
            var size = m[3];
            result[side + '|' + bp] = size;
        }
        return result;
    }

    function parseColumns(className) {
        var result = {};
        if (!className) return result;
        var regex = /\bcol(?:-(sm|md|lg|xl|xxl))?-(auto|[1-9]|1[0-2])\b/g;
        var m;
        while ((m = regex.exec(className)) !== null) {
            var bp = m[1] || '';
            result[bp] = m[2];
        }
        return result;
    }

    /* ── Remove managed classes, then add new ones ────── */
    function updateClassName(currentClass, type, side, bp, newSize) {
        // Remove the specific old class for this type+side+bp
        var escapedSide = side || '';
        var bpPart = bp ? bp + '-' : '';
        var removeRegex = new RegExp('\\b' + type + escapedSide + '-' + bpPart + '(0|1|2|3|4|5|auto)\\b', 'g');

        var cls = (currentClass || '').replace(removeRegex, '').replace(/\s+/g, ' ').trim();

        if (newSize) {
            cls = cls + ' ' + bsClass(type, side, bp, newSize);
        }
        return cls.trim();
    }

    function updateColClassName(currentClass, bp, newSize) {
        var bpPart = bp ? bp + '-' : '';
        var removeRegex;
        if (bp) {
            removeRegex = new RegExp('\\bcol-' + bp + '-(auto|[1-9]|1[0-2])\\b', 'g');
        } else {
            removeRegex = new RegExp('\\bcol-(auto|[1-9]|1[0-2])\\b', 'g');
        }

        var cls = (currentClass || '').replace(removeRegex, '').replace(/\s+/g, ' ').trim();

        if (newSize) {
            var newClass = bp ? 'col-' + bp + '-' + newSize : 'col-' + newSize;
            cls = cls + ' ' + newClass;
        }
        return cls.trim();
    }

    /* ── The HOC that wraps every block edit ──────────── */
    var withBootstrapPanel = createHigherOrderComponent(function (BlockEdit) {
        return function (props) {
            if (!props.attributes || typeof props.setAttributes !== 'function') {
                return el(BlockEdit, props);
            }

            var className = props.attributes.className || '';

            /* Build spacing controls */
            function spacingSection(type, label) {
                var parsed = parseSpacing(className, type);
                var controls = [];

                BREAKPOINTS.forEach(function (bp) {
                    SIDES.forEach(function (side) {
                        var key = side.prefix + '|' + bp.value;
                        var current = parsed[key] || '';
                        var controlLabel = (bp.value ? bp.label + ' ' : '') + side.label;

                        controls.push(
                            el(SelectControl, {
                                key: type + '-' + side.prefix + '-' + bp.value,
                                label: controlLabel,
                                value: current,
                                options: SIZE_OPTIONS,
                                onChange: function (v) {
                                    var updated = updateClassName(className, type, side.prefix, bp.value, v);
                                    props.setAttributes({ className: updated });
                                },
                                __nextHasNoMarginBottom: true,
                            })
                        );
                    });
                });

                return el(
                    PanelBody,
                    { title: label, initialOpen: false },
                    el('div', {
                        style: {
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '4px 12px',
                        },
                    }, controls)
                );
            }

            /* Build column controls */
            function columnSection() {
                var parsed = parseColumns(className);
                var controls = [];

                BREAKPOINTS.forEach(function (bp) {
                    var current = parsed[bp.value] || '';
                    controls.push(
                        el(SelectControl, {
                            key: 'col-' + bp.value,
                            label: bp.value ? 'Col ' + bp.label : 'Col (default)',
                            value: current,
                            options: COL_OPTIONS,
                            onChange: function (v) {
                                var updated = updateColClassName(className, bp.value, v);
                                props.setAttributes({ className: updated });
                            },
                            __nextHasNoMarginBottom: true,
                        })
                    );
                });

                return el(
                    PanelBody,
                    { title: 'Bootstrap Columns', initialOpen: false },
                    controls
                );
            }

            return el(
                Fragment,
                null,
                el(BlockEdit, props),
                el(
                    InspectorControls,
                    null,
                    spacingSection('m', 'Bootstrap Margin'),
                    spacingSection('p', 'Bootstrap Padding'),
                    columnSection()
                )
            );
        };
    }, 'withBootstrapPanel');

    addFilter('editor.BlockEdit', 'developer-starter/bootstrap-panel', withBootstrapPanel);
})();
