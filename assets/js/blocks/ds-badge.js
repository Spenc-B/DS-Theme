/**
 * DS Badge — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var SelectControl = components.SelectControl;

    var VARIANT_OPTIONS = [
        { label: 'Primary',   value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success',   value: 'success' },
        { label: 'Warning',   value: 'warning' },
        { label: 'Danger',    value: 'danger' },
        { label: 'Info',      value: 'info' },
        { label: 'Light',     value: 'light' },
        { label: 'Dark',      value: 'dark' },
    ];

    blocks.registerBlockType('developer-starter/ds-badge', {
        edit: function (props) {
            var attrs = props.attributes;
            var badgeClass = 'badge text-bg-' + (attrs.variant || 'primary')
                + (attrs.pill !== false ? ' rounded-pill' : '');

            var blockProps = useBlockProps({ className: 'ds-badge-preview' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Badge Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Text',
                            value: attrs.text,
                            onChange: function (v) { props.setAttributes({ text: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Variant',
                            value: attrs.variant,
                            options: VARIANT_OPTIONS,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Rounded pill',
                            checked: attrs.pill !== false,
                            onChange: function (v) { props.setAttributes({ pill: v }); },
                        })
                    )
                ),
                el('div', blockProps,
                    el('span', { className: badgeClass }, attrs.text || 'New')
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
