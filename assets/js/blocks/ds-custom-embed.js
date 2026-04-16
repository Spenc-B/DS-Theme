/**
 * DS Custom Embed — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-custom-embed', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-custom-embed' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Custom Embed Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Embedcode',
                            value: attrs.embedCode,
                            onChange: function (v) { props.setAttributes({ embedCode: v }); },
                        }),
                        el(TextControl, {
                            label: 'Aspectratio',
                            value: attrs.aspectRatio,
                            onChange: function (v) { props.setAttributes({ aspectRatio: v }); },
                        }),
                        el(TextControl, {
                            label: 'Maxwidth',
                            value: attrs.maxWidth,
                            onChange: function (v) { props.setAttributes({ maxWidth: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Custom Embed'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-custom-embed' });
            return el('div', blockProps, el('span', null, attrs.embedCode));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
