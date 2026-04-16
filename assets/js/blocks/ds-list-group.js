/**
 * DS List Group — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-list-group', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-list-group' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS List Group Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Flush',
                            checked: attrs.flush,
                            onChange: function (v) { props.setAttributes({ flush: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Horizontal',
                            checked: attrs.horizontal,
                            onChange: function (v) { props.setAttributes({ horizontal: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el(InnerBlocks))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-list-group' });
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
