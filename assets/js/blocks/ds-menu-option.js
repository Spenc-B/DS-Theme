/**
 * DS Menu Option — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-menu-option', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-menu-option' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Menu Option Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Menulocation',
                            value: attrs.menuLocation,
                            onChange: function (v) { props.setAttributes({ menuLocation: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Menuid',
                            value: attrs.menuId,
                            onChange: function (v) { props.setAttributes({ menuId: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(RangeControl, {
                            label: 'Depth',
                            value: attrs.depth,
                            onChange: function (v) { props.setAttributes({ depth: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Cssclass',
                            value: attrs.cssClass,
                            onChange: function (v) { props.setAttributes({ cssClass: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Menu Option'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-menu-option' });
            return el('div', blockProps, el('span', null, attrs.menuLocation));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
