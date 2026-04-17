/**
 * DS Progress Bar — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var RangeControl = components.RangeControl;
    var ToggleControl = components.ToggleControl;
    var SelectControl = components.SelectControl;
    var ColorPalette = components.ColorPalette;

    var COLORS = [
        { name: 'Coral', color: '#E17055' },
        { name: 'Yellow', color: '#FDCB6E' },
        { name: 'Blue', color: '#0d6efd' },
        { name: 'Green', color: '#198754' },
        { name: 'Red', color: '#dc3545' },
        { name: 'Dark', color: '#1a1a1a' },
    ];

    var VARIANT_OPTIONS = [
        { label: 'Default (theme)', value: '' },
        { label: 'Success', value: 'success' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
        { label: 'Danger', value: 'danger' },
    ];

    blocks.registerBlockType('developer-starter/ds-progress', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-progress-editor' });

            var barClass = 'progress-bar'
                + (a.variant ? ' bg-' + a.variant : '')
                + (a.striped ? ' progress-bar-striped' : '')
                + (a.animated ? ' progress-bar-animated' : '');

            var barStyle = {
                width: a.percentage + '%',
            };
            if ( a.barColor && !a.variant ) {
                barStyle.backgroundColor = a.barColor;
            }

            var trackStyle = {};
            if ( a.height ) {
                trackStyle.height = a.height;
            }

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    /* ── Content ──────────────────── */
                    el(
                        PanelBody,
                        { title: 'Content', initialOpen: true },
                        el(TextControl, {
                            label: 'Label',
                            value: a.label || '',
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Percentage',
                            value: a.percentage,
                            min: 0,
                            max: 100,
                            onChange: function (v) { props.setAttributes({ percentage: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show percentage text',
                            checked: a.showPercentage !== false,
                            onChange: function (v) { props.setAttributes({ showPercentage: v }); },
                        })
                    ),
                    /* ── Appearance ───────────────── */
                    el(
                        PanelBody,
                        { title: 'Appearance', initialOpen: false },
                        el(SelectControl, {
                            label: 'Colour variant',
                            value: a.variant || '',
                            options: VARIANT_OPTIONS,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(TextControl, {
                            label: 'Height',
                            value: a.height || '',
                            help: 'e.g. 25px, 2rem',
                            onChange: function (v) { props.setAttributes({ height: v }); },
                        }),
                        el('hr', { className: 'ds-sidebar-divider' }),
                        el('span', { className: 'ds-sidebar-heading' }, 'Effects'),
                        el('div', { className: 'ds-toggle-row' },
                            el(ToggleControl, {
                                label: 'Striped',
                                checked: !!a.striped,
                                onChange: function (v) { props.setAttributes({ striped: v }); },
                            }),
                            el(ToggleControl, {
                                label: 'Animated',
                                checked: !!a.animated,
                                onChange: function (v) { props.setAttributes({ animated: v }); },
                            })
                        )
                    ),
                    /* ── Custom Colour ────────────── */
                    el(
                        PanelBody,
                        { title: 'Custom Bar Colour', initialOpen: false },
                        el('div', { className: 'ds-sidebar-info' }, 'Overrides the variant when no variant is selected.'),
                        el(ColorPalette, {
                            colors: COLORS,
                            value: a.barColor || undefined,
                            onChange: function (v) { props.setAttributes({ barColor: v || '' }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.label
                        ? el('div', { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' } },
                            el('span', { style: { fontWeight: 600 } }, a.label),
                            a.showPercentage !== false ? el('span', null, a.percentage + '%') : null
                        )
                        : null,
                    el(
                        'div',
                        { className: 'progress', role: 'progressbar', 'aria-valuenow': a.percentage, 'aria-valuemin': '0', 'aria-valuemax': '100', style: trackStyle },
                        el('div', { className: barClass, style: barStyle },
                            !a.label && a.showPercentage !== false ? a.percentage + '%' : null
                        )
                    )
                )
            );
        },

        save: function () {
            return null;
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
