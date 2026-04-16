/**
 * DS CTA Card — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-cta-card', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-cta-card' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS CTA Card Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Heading',
                            value: attrs.heading,
                            onChange: function (v) { props.setAttributes({ heading: v }); },
                        }),
                        el(TextControl, {
                            label: 'Text',
                            value: attrs.text,
                            onChange: function (v) { props.setAttributes({ text: v }); },
                        }),
                        el(TextControl, {
                            label: 'Buttontext',
                            value: attrs.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                        }),
                        el(TextControl, {
                            label: 'Buttonurl',
                            value: attrs.buttonUrl,
                            onChange: function (v) { props.setAttributes({ buttonUrl: v }); },
                        }),
                        el(TextControl, {
                            label: 'Variant',
                            value: attrs.variant,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS CTA Card'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-cta-card' });
            return el('div', blockProps, el('span', null, attrs.heading));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
