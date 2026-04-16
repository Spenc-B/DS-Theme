/**
 * DS Team Member — Block Editor registration.
 *
 * Card with circular photo (MediaUpload), RichText name / role / bio.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var MediaUpload = blockEditor.MediaUpload;
    var MediaUploadCheck = blockEditor.MediaUploadCheck;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var Button = components.Button;

    blocks.registerBlockType('developer-starter/ds-team-member', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-team' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Photo', initialOpen: true },
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
                                        a.imageUrl ? 'Replace Photo' : 'Upload Photo'
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
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-team__photo-wrap' },
                        a.imageUrl
                            ? el('img', { className: 'ds-team__photo', src: a.imageUrl, alt: '' })
                            : el(
                                'div',
                                { className: 'ds-team__photo ds-team__photo--placeholder' },
                                el('span', null, '\uD83D\uDC64')
                            )
                    ),
                    el(RichText, {
                        tagName: 'h3',
                        className: 'ds-team__name',
                        value: a.name,
                        onChange: function (v) { props.setAttributes({ name: v }); },
                        placeholder: 'Full Name',
                    }),
                    el(RichText, {
                        tagName: 'p',
                        className: 'ds-team__role',
                        value: a.role,
                        onChange: function (v) { props.setAttributes({ role: v }); },
                        placeholder: 'Job Title',
                    }),
                    el(RichText, {
                        tagName: 'p',
                        className: 'ds-team__bio',
                        value: a.bio,
                        onChange: function (v) { props.setAttributes({ bio: v }); },
                        placeholder: 'Short bio\u2026',
                    })
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-team' });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'ds-team__photo-wrap' },
                    a.imageUrl
                        ? el('img', { className: 'ds-team__photo', src: a.imageUrl, alt: '' })
                        : null
                ),
                el(RichText.Content, { tagName: 'h3', className: 'ds-team__name', value: a.name }),
                el(RichText.Content, { tagName: 'p', className: 'ds-team__role', value: a.role }),
                el(RichText.Content, { tagName: 'p', className: 'ds-team__bio', value: a.bio })
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
