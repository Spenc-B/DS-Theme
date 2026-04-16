/**
 * DS Inline SVG — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-inline-svg', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-inline-svg' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Inline SVG Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Svgcontent',
                            value: attrs.svgContent,
                            onChange: function (v) { props.setAttributes({ svgContent: v }); },
                        }),
                        el(TextControl, {
                            label: 'Svgurl',
                            value: attrs.svgUrl,
                            onChange: function (v) { props.setAttributes({ svgUrl: v }); },
                        }),
                        el(TextControl, {
                            label: 'Width',
                            value: attrs.width,
                            onChange: function (v) { props.setAttributes({ width: v }); },
                        }),
                        el(TextControl, {
                            label: 'Height',
                            value: attrs.height,
                            onChange: function (v) { props.setAttributes({ height: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Inline SVG'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-inline-svg' });
            return el('div', blockProps, el('span', null, attrs.svgContent));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
