/**
 * DS CTA Section - Block Editor registration.
 *
 * Full-width call-to-action banner with heading, subtitle, and button.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-cta-section', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({
                className: 'py-5',
                style: { textAlign: a.alignment || 'center' },
            });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'CTA Section Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Button URL',
                            value: a.buttonUrl,
                            onChange: function (v) { props.setAttributes({ buttonUrl: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Alignment',
                            value: a.alignment || 'center',
                            options: [
                                { label: 'Left', value: 'left' },
                                { label: 'Center', value: 'center' },
                                { label: 'Right', value: 'right' },
                            ],
                            onChange: function (v) { props.setAttributes({ alignment: v }); },
                        })
                    )
                ),
                el(
                    'section',
                    blockProps,
                    el(
                        'div',
                        { className: 'container' },
                        el(RichText, {
                            tagName: 'h2',
                            className: 'display-5 fw-bold mb-3',
                            value: a.heading,
                            onChange: function (v) { props.setAttributes({ heading: v }); },
                            placeholder: 'Call to Action Heading...',
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'lead mb-4',
                            value: a.subtitle,
                            onChange: function (v) { props.setAttributes({ subtitle: v }); },
                            placeholder: 'Subtitle text...',
                        }),
                        el(RichText, {
                            tagName: 'span',
                            className: 'btn btn-primary btn-lg',
                            value: a.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                            placeholder: 'Learn More',
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
