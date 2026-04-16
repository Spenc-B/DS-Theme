/**
 * DS Mailchimp - Block Editor registration.
 *
 * Newsletter signup form with Bootstrap styling.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-mailchimp', {
        edit: function (props) {
            var a = props.attributes;
            var isInline = (a.layout || 'inline') === 'inline';
            var blockProps = useBlockProps({});

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
                            label: 'Form Action URL',
                            help: 'Mailchimp form action URL',
                            value: a.formAction,
                            onChange: function (v) { props.setAttributes({ formAction: v }); },
                        }),
                        el(TextControl, {
                            label: 'Placeholder',
                            value: a.placeholder,
                            onChange: function (v) { props.setAttributes({ placeholder: v }); },
                        }),
                        el(TextControl, {
                            label: 'Button Text',
                            value: a.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Layout',
                            value: a.layout || 'inline',
                            options: [
                                { label: 'Inline', value: 'inline' },
                                { label: 'Stacked', value: 'stacked' },
                            ],
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: isInline ? 'd-flex gap-2' : '' },
                        el('input', {
                            type: 'email',
                            className: 'form-control' + (isInline ? '' : ' mb-2'),
                            placeholder: a.placeholder || 'Enter your email',
                            disabled: true,
                        }),
                        el('button', {
                            type: 'button',
                            className: 'btn btn-primary',
                            disabled: true,
                        }, a.buttonText || 'Subscribe')
                    )
                )
            );
        },

        save: function () {
            return null;
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
