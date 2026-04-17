/**
 * DS Dynamic Form — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-dynamic-form', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-dynamic-form' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Form Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Formid',
                            value: attrs.formId,
                            onChange: function (v) { props.setAttributes({ formId: v }); },
                        }),
                        el(TextControl, {
                            label: 'Submittext',
                            value: attrs.submitText,
                            onChange: function (v) { props.setAttributes({ submitText: v }); },
                        }),
                        el(TextControl, {
                            label: 'Successmessage',
                            value: attrs.successMessage,
                            onChange: function (v) { props.setAttributes({ successMessage: v }); },
                        }),
                        el(TextControl, {
                            label: 'Recipient',
                            value: attrs.recipient,
                            onChange: function (v) { props.setAttributes({ recipient: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Dynamic Form'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-dynamic-form' });
            return el('div', blockProps, el('span', null, attrs.formId));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
