/**
 * DS Section — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-section', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-section' });
            return el('div', blockProps, el(InnerBlocks));
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-section' });
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
