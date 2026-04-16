/**
 * DS Spinner — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-spinner', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-spinner' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Spinner Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Variant',
                            value: attrs.variant,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(TextControl, {
                            label: 'Color',
                            value: attrs.color,
                            onChange: function (v) { props.setAttributes({ color: v }); },
                        }),
                        el(TextControl, {
                            label: 'Size',
                            value: attrs.size,
                            onChange: function (v) { props.setAttributes({ size: v }); },
                        }),
                        el(TextControl, {
                            label: 'Label',
                            value: attrs.label,
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Spinner'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-spinner' });
            return el('div', blockProps, el('span', null, attrs.variant));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
