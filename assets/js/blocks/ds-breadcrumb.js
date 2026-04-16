/**
 * DS Breadcrumb — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-breadcrumb', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-breadcrumb' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Breadcrumb Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Separator',
                            value: attrs.separator,
                            onChange: function (v) { props.setAttributes({ separator: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showhome',
                            checked: attrs.showHome,
                            onChange: function (v) { props.setAttributes({ showHome: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Breadcrumb'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-breadcrumb' });
            return el('div', blockProps, el('span', null, attrs.separator));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
