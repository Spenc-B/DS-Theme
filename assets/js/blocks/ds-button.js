/**
 * DS Button — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-button', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-button' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Button Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Text',
                            value: attrs.text,
                            onChange: function (v) { props.setAttributes({ text: v }); },
                        }),
                        el(TextControl, {
                            label: 'Url',
                            value: attrs.url,
                            onChange: function (v) { props.setAttributes({ url: v }); },
                        }),
                        el(TextControl, {
                            label: 'Variant',
                            value: attrs.variant,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(TextControl, {
                            label: 'Size',
                            value: attrs.size,
                            onChange: function (v) { props.setAttributes({ size: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Openinnewtab',
                            checked: attrs.openInNewTab,
                            onChange: function (v) { props.setAttributes({ openInNewTab: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Fullwidth',
                            checked: attrs.fullWidth,
                            onChange: function (v) { props.setAttributes({ fullWidth: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Button'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-button' });
            return el('div', blockProps, el('span', null, attrs.text));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
