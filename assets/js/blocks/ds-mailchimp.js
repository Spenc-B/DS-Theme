/**
 * DS Mailchimp — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-mailchimp', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-mailchimp' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Mailchimp Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Formaction',
                            value: attrs.formAction,
                            onChange: function (v) { props.setAttributes({ formAction: v }); },
                        }),
                        el(TextControl, {
                            label: 'Placeholder',
                            value: attrs.placeholder,
                            onChange: function (v) { props.setAttributes({ placeholder: v }); },
                        }),
                        el(TextControl, {
                            label: 'Buttontext',
                            value: attrs.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                        }),
                        el(TextControl, {
                            label: 'Layout',
                            value: attrs.layout,
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Mailchimp'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-mailchimp' });
            return el('div', blockProps, el('span', null, attrs.formAction));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
