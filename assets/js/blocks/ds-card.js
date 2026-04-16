/**
 * DS Card — Block Editor registration.
 *
 * Bootstrap card with optional image, title, InnerBlocks body, and CTA button.
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
    var SelectControl = components.SelectControl;
    var Button = components.Button;

    var TEMPLATE = [['core/paragraph', { placeholder: 'Card content…' }]];

    var BTN_VARIANTS = [
        { label: 'Primary',   value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success',   value: 'success' },
        { label: 'Danger',    value: 'danger' },
        { label: 'Warning',   value: 'warning' },
        { label: 'Info',      value: 'info' },
        { label: 'Light',     value: 'light' },
        { label: 'Dark',      value: 'dark' },
        { label: 'Link',      value: 'link' },
    ];

    blocks.registerBlockType('developer-starter/ds-card', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'card' });

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
                                        a.imageUrl ? 'Replace image' : 'Upload image'
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
                            'Remove image'
                        )
                    ),
                    el(
                        PanelBody,
                        { title: 'Header & Footer', initialOpen: false },
                        el(TextControl, {
                            label: 'Header text',
                            value: a.headerText || '',
                            onChange: function (v) { props.setAttributes({ headerText: v }); },
                        }),
                        el(TextControl, {
                            label: 'Footer text',
                            value: a.footerText || '',
                            onChange: function (v) { props.setAttributes({ footerText: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Button', initialOpen: false },
                        el(TextControl, {
                            label: 'Button URL',
                            value: a.buttonUrl || '',
                            onChange: function (v) { props.setAttributes({ buttonUrl: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Button variant',
                            value: a.buttonVariant || 'primary',
                            options: BTN_VARIANTS,
                            onChange: function (v) { props.setAttributes({ buttonVariant: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.headerText
                        ? el('div', { className: 'card-header' }, a.headerText)
                        : null,
                    a.imageUrl
                        ? el('img', { src: a.imageUrl, alt: '', className: 'card-img-top' })
                        : null,
                    el(
                        'div',
                        { className: 'card-body' },
                        el(RichText, {
                            tagName: 'h5',
                            className: 'card-title',
                            value: a.title,
                            onChange: function (v) { props.setAttributes({ title: v }); },
                            placeholder: 'Card title',
                        }),
                        el('div', { className: 'card-text' }, el(InnerBlocks, { template: TEMPLATE })),
                        a.buttonText || a.buttonUrl
                            ? el('div', { style: { marginTop: '12px' } },
                                el(RichText, {
                                    tagName: 'span',
                                    className: 'btn btn-' + (a.buttonVariant || 'primary'),
                                    value: a.buttonText,
                                    onChange: function (v) { props.setAttributes({ buttonText: v }); },
                                    placeholder: 'Button text',
                                })
                            )
                            : el(RichText, {
                                tagName: 'span',
                                className: 'btn btn-' + (a.buttonVariant || 'primary'),
                                value: a.buttonText,
                                onChange: function (v) { props.setAttributes({ buttonText: v }); },
                                placeholder: 'Button text',
                            })
                    ),
                    a.footerText
                        ? el('div', { className: 'card-footer text-body-secondary' }, a.footerText)
                        : null
                )
            );
        },

        save: function () {
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
