/**
 * DS Alert — Block Editor registration.
 *
 * Bootstrap alert with type variants and dismissible option.
 * Renders via render.php (SSR).
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;
    var ToggleControl = components.ToggleControl;

    var TYPE_OPTIONS = [
        { label: 'Info (blue)', value: 'info' },
        { label: 'Success (green)', value: 'success' },
        { label: 'Warning (yellow)', value: 'warning' },
        { label: 'Danger (red)', value: 'danger' },
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Light', value: 'light' },
        { label: 'Dark', value: 'dark' },
    ];

    var ICONS = {
        info: '\u2139\uFE0F',
        success: '\u2705',
        warning: '\u26A0\uFE0F',
        danger: '\u274C',
        primary: '\u25C6',
        secondary: '\u25C7',
        light: '\u25CB',
        dark: '\u25CF',
    };

    var TEMPLATE = [['core/paragraph', { placeholder: 'Alert message\u2026' }]];

    blocks.registerBlockType('developer-starter/ds-alert', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'alert alert-' + (a.type || 'info');
            if (a.dismissible) cls += ' alert-dismissible';
            var blockProps = useBlockProps({ className: cls, role: 'alert' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Alert Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Type',
                            value: a.type || 'info',
                            options: TYPE_OPTIONS,
                            onChange: function (v) { props.setAttributes({ type: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Dismissible',
                            checked: !!a.dismissible,
                            onChange: function (v) { props.setAttributes({ dismissible: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('span', { className: 'me-2' }, ICONS[a.type] || ICONS.info),
                    el(InnerBlocks, { template: TEMPLATE })
                )
            );
        },

        save: function () {
            var el = window.wp.element.createElement;
            return el(window.wp.blockEditor.InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
