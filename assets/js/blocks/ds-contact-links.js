/**
 * DS Contact Links — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-contact-links', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-contact-links' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Contact Links Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Phone',
                            value: attrs.phone,
                            onChange: function (v) { props.setAttributes({ phone: v }); },
                        }),
                        el(TextControl, {
                            label: 'Email',
                            value: attrs.email,
                            onChange: function (v) { props.setAttributes({ email: v }); },
                        }),
                        el(TextControl, {
                            label: 'Address',
                            value: attrs.address,
                            onChange: function (v) { props.setAttributes({ address: v }); },
                        }),
                        el(TextControl, {
                            label: 'Layout',
                            value: attrs.layout,
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showicons',
                            checked: attrs.showIcons,
                            onChange: function (v) { props.setAttributes({ showIcons: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Contact Links'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-contact-links' });
            return el('div', blockProps, el('span', null, attrs.phone));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
