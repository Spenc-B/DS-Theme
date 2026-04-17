/**
 * DS Navbar — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-navbar', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-navbar' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Navbar Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Menulocation',
                            value: attrs.menuLocation,
                            onChange: function (v) { props.setAttributes({ menuLocation: v }); },
                        }),
                        el(TextControl, {
                            label: 'Variant',
                            value: attrs.variant,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(TextControl, {
                            label: 'Expand',
                            value: attrs.expand,
                            onChange: function (v) { props.setAttributes({ expand: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Sticky',
                            checked: attrs.sticky,
                            onChange: function (v) { props.setAttributes({ sticky: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Navbar'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-navbar' });
            return el('div', blockProps, el('span', null, attrs.menuLocation));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
