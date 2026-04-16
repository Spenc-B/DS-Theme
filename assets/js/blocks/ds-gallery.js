/**
 * DS Gallery — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-gallery', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-gallery' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Gallery Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Columns',
                            value: attrs.columns,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Layout',
                            value: attrs.layout,
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Lightbox',
                            checked: attrs.lightbox,
                            onChange: function (v) { props.setAttributes({ lightbox: v }); },
                        }),
                        el(TextControl, {
                            label: 'Gap',
                            value: attrs.gap,
                            onChange: function (v) { props.setAttributes({ gap: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Gallery'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-gallery' });
            return el('div', blockProps, el('span', null, attrs.images));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
