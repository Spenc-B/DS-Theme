/**
 * DS Badge — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-badge', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-badge' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Badge Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Text',
                            value: attrs.text,
                            onChange: function (v) { props.setAttributes({ text: v }); },
                        }),
                        el(TextControl, {
                            label: 'Variant',
                            value: attrs.variant,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Pill',
                            checked: attrs.pill,
                            onChange: function (v) { props.setAttributes({ pill: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Badge'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-badge' });
            return el('div', blockProps, el('span', null, attrs.text));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
