/**
 * DS Hero — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-hero', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-hero' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Hero Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Heading',
                            value: attrs.heading,
                            onChange: function (v) { props.setAttributes({ heading: v }); },
                        }),
                        el(TextControl, {
                            label: 'Subtitle',
                            value: attrs.subtitle,
                            onChange: function (v) { props.setAttributes({ subtitle: v }); },
                        }),
                        el(TextControl, {
                            label: 'Backgroundimageurl',
                            value: attrs.backgroundImageUrl,
                            onChange: function (v) { props.setAttributes({ backgroundImageUrl: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Backgroundimageid',
                            value: attrs.backgroundImageId,
                            onChange: function (v) { props.setAttributes({ backgroundImageId: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(RangeControl, {
                            label: 'Overlayopacity',
                            value: attrs.overlayOpacity,
                            onChange: function (v) { props.setAttributes({ overlayOpacity: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Minheight',
                            value: attrs.minHeight,
                            onChange: function (v) { props.setAttributes({ minHeight: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el(InnerBlocks))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-hero' });
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
