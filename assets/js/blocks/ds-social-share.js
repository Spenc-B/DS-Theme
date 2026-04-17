/**
 * DS Social Share — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-social-share', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-social-share' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Social Share Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Style',
                            value: attrs.style,
                            onChange: function (v) { props.setAttributes({ style: v }); },
                        }),
                        el(TextControl, {
                            label: 'Label',
                            value: attrs.label,
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Social Share'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-social-share' });
            return el('div', blockProps, el('span', null, attrs.platforms));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
