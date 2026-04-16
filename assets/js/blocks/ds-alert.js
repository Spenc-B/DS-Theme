/**
 * DS Alert — Block Editor registration.
 *
 * Styled alert box with type selector (info, success, warning, danger, brand).
 * Uses InnerBlocks for content so you can put anything inside.
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
        { label: 'Brand (coral)', value: 'brand' },
    ];

    var ICONS = {
        info: '\u2139\uFE0F',
        success: '\u2705',
        warning: '\u26A0\uFE0F',
        danger: '\u274C',
        brand: '\u25C6',
    };

    var TEMPLATE = [['core/paragraph', { placeholder: 'Alert message\u2026' }]];

    blocks.registerBlockType('developer-starter/ds-alert', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'ds-alert ds-alert--' + a.type;
            var blockProps = useBlockProps({ className: cls });

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
                            value: a.type,
                            options: TYPE_OPTIONS,
                            onChange: function (v) { props.setAttributes({ type: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Dismissible',
                            checked: a.dismissible,
                            onChange: function (v) { props.setAttributes({ dismissible: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('span', { className: 'ds-alert__icon', 'aria-hidden': 'true' }, ICONS[a.type] || ICONS.info),
                    el('div', { className: 'ds-alert__content' }, el(InnerBlocks, { template: TEMPLATE }))
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var cls = 'ds-alert ds-alert--' + a.type;
            if (a.dismissible) cls += ' ds-alert--dismissible';
            var blockProps = useBlockProps.save({ className: cls, role: 'alert' });

            var ICONS_SAVE = {
                info: '\u2139\uFE0F',
                success: '\u2705',
                warning: '\u26A0\uFE0F',
                danger: '\u274C',
                brand: '\u25C6',
            };

            return el(
                'div',
                blockProps,
                el('span', { className: 'ds-alert__icon', 'aria-hidden': 'true' }, ICONS_SAVE[a.type] || ICONS_SAVE.info),
                el('div', { className: 'ds-alert__content' }, el(InnerBlocks.Content)),
                a.dismissible
                    ? el('button', {
                        className: 'ds-alert__close',
                        type: 'button',
                        'aria-label': 'Dismiss',
                        onClick: null,
                    }, '\u00D7')
                    : null
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
