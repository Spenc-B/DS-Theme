/**
 * DS CTA Card - Block Editor registration.
 *
 * Call-to-action card with heading, text, and button.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-cta-card', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'card text-center' });

            var btnClass = 'btn btn-' + (a.variant === 'coral' ? 'primary' : (a.variant || 'primary'));

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'CTA Card Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Button URL',
                            value: a.buttonUrl,
                            onChange: function (v) { props.setAttributes({ buttonUrl: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Button Variant',
                            value: a.variant || 'coral',
                            options: [
                                { label: 'Primary', value: 'primary' },
                                { label: 'Secondary', value: 'secondary' },
                                { label: 'Success', value: 'success' },
                                { label: 'Danger', value: 'danger' },
                                { label: 'Warning', value: 'warning' },
                                { label: 'Info', value: 'info' },
                                { label: 'Light', value: 'light' },
                                { label: 'Dark', value: 'dark' },
                            ],
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'card-body p-4' },
                        el(RichText, {
                            tagName: 'h3',
                            className: 'card-title',
                            value: a.heading,
                            onChange: function (v) { props.setAttributes({ heading: v }); },
                            placeholder: 'Ready to start?',
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'card-text',
                            value: a.text,
                            onChange: function (v) { props.setAttributes({ text: v }); },
                            placeholder: 'Description text...',
                        }),
                        el(RichText, {
                            tagName: 'span',
                            className: btnClass,
                            value: a.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                            placeholder: 'Get Started',
                        })
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
