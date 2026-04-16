/**
 * DS Spinner — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    var VARIANT_OPTIONS = [
        { label: 'Border (ring)', value: 'border' },
        { label: 'Grow (pulse)',  value: 'grow' },
    ];

    var COLOR_OPTIONS = [
        { label: 'Primary',   value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success',   value: 'success' },
        { label: 'Danger',    value: 'danger' },
        { label: 'Warning',   value: 'warning' },
        { label: 'Info',      value: 'info' },
        { label: 'Light',     value: 'light' },
        { label: 'Dark',      value: 'dark' },
    ];

    var SIZE_OPTIONS = [
        { label: 'Default', value: '' },
        { label: 'Small',   value: 'sm' },
    ];

    blocks.registerBlockType('developer-starter/ds-spinner', {
        edit: function (props) {
            var attrs = props.attributes;

            var spinnerClass = 'spinner-' + (attrs.variant || 'border')
                + (attrs.size === 'sm' ? ' spinner-' + (attrs.variant || 'border') + '-sm' : '')
                + ' text-' + (attrs.color || 'primary');

            var blockProps = useBlockProps({ className: 'ds-spinner-editor' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Spinner Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Variant',
                            value: attrs.variant || 'border',
                            options: VARIANT_OPTIONS,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Colour',
                            value: attrs.color || 'primary',
                            options: COLOR_OPTIONS,
                            onChange: function (v) { props.setAttributes({ color: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Size',
                            value: attrs.size || '',
                            options: SIZE_OPTIONS,
                            onChange: function (v) { props.setAttributes({ size: v }); },
                        }),
                        el(TextControl, {
                            label: 'Accessible label',
                            value: attrs.label || '',
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        })
                    )
                ),
                el('div', blockProps,
                    el('div', { className: spinnerClass, role: 'status' },
                        el('span', { className: 'visually-hidden' }, attrs.label || 'Loading...')
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
