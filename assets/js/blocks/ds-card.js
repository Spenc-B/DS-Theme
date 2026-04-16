/**
 * DS Card — Block Editor registration.
 *
 * Generic content card with optional image, title, InnerBlocks body, and CTA button.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InnerBlocks = blockEditor.InnerBlocks;
    var MediaUpload = blockEditor.MediaUpload;
    var MediaUploadCheck = blockEditor.MediaUploadCheck;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var Button = components.Button;

    var TEMPLATE = [['core/paragraph', { placeholder: 'Card content\u2026' }]];

    blocks.registerBlockType('developer-starter/ds-card', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-card' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Card Image', initialOpen: true },
                        el(
                            MediaUploadCheck,
                            null,
                            el(MediaUpload, {
                                allowedTypes: ['image'],
                                value: a.imageId,
                                onSelect: function (m) {
                                    props.setAttributes({ imageId: m.id, imageUrl: m.url });
                                },
                                render: function (obj) {
                                    return el(
                                        Button,
                                        { onClick: obj.open, variant: 'secondary' },
                                        a.imageUrl ? 'Replace Image' : 'Upload Image'
                                    );
                                },
                            })
                        ),
                        a.imageUrl && el(
                            Button,
                            {
                                onClick: function () { props.setAttributes({ imageId: undefined, imageUrl: '' }); },
                                variant: 'link',
                                isDestructive: true,
                            },
                            'Remove'
                        )
                    ),
                    el(
                        PanelBody,
                        { title: 'Button', initialOpen: false },
                        el(TextControl, {
                            label: 'Button URL',
                            value: a.buttonUrl,
                            onChange: function (v) { props.setAttributes({ buttonUrl: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.imageUrl
                        ? el('div', { className: 'ds-card__media' },
                            el('img', { src: a.imageUrl, alt: '', className: 'ds-card__img' })
                        )
                        : null,
                    el(
                        'div',
                        { className: 'ds-card__body' },
                        el(RichText, {
                            tagName: 'h3',
                            className: 'ds-card__title',
                            value: a.title,
                            onChange: function (v) { props.setAttributes({ title: v }); },
                            placeholder: 'Card Title',
                        }),
                        el('div', { className: 'ds-card__content' }, el(InnerBlocks, { template: TEMPLATE })),
                        el(
                            'div',
                            { className: 'ds-card__btn' },
                            el(RichText, {
                                tagName: 'span',
                                value: a.buttonText,
                                onChange: function (v) { props.setAttributes({ buttonText: v }); },
                                placeholder: 'Read More',
                            })
                        )
                    )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-card' });

            return el(
                'div',
                blockProps,
                a.imageUrl
                    ? el('div', { className: 'ds-card__media' },
                        el('img', { src: a.imageUrl, alt: '', className: 'ds-card__img' })
                    )
                    : null,
                el(
                    'div',
                    { className: 'ds-card__body' },
                    el(RichText.Content, { tagName: 'h3', className: 'ds-card__title', value: a.title }),
                    el('div', { className: 'ds-card__content' }, el(InnerBlocks.Content)),
                    a.buttonText
                        ? el(
                            'div',
                            { className: 'ds-card__btn' },
                            el('a', { href: a.buttonUrl || '#' },
                                el(RichText.Content, { tagName: 'span', value: a.buttonText })
                            )
                        )
                        : null
                )
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
