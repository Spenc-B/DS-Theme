/**
 * DS Social Follow — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-social-follow', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-social-follow' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Social Follow Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Style',
                            value: attrs.style,
                            onChange: function (v) { props.setAttributes({ style: v }); },
                        }),
                        el(TextControl, {
                            label: 'Size',
                            value: attrs.size,
                            onChange: function (v) { props.setAttributes({ size: v }); },
                        }),
                        el(TextControl, {
                            label: 'Shape',
                            value: attrs.shape,
                            onChange: function (v) { props.setAttributes({ shape: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Social Follow'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-social-follow' });
            return el('div', blockProps, el('span', null, attrs.platforms));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
