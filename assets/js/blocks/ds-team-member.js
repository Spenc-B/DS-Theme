/**
 * DS Team Member — Block Editor registration.
 *
 * Card with circular photo, name, role, and bio.
 * Photo is uploaded via MediaUpload; name/role/bio are RichText.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var MediaUpload = blockEditor.MediaUpload;
    var MediaUploadCheck = blockEditor.MediaUploadCheck;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;
    var Button = components.Button;

    var ALIGNMENT_OPTIONS = [
        { label: 'Centre', value: 'center' },
        { label: 'Left', value: 'left' },
    ];

    blocks.registerBlockType('developer-starter/ds-team-member', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'ds-team-member ds-team-member--' + a.alignment;
            var blockProps = useBlockProps({ className: cls });

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
                        a.imageUrl
                            ? el(
                                Button,
                                {
                                    onClick: function () {
                                        props.setAttributes({ imageId: undefined, imageUrl: '' });
                                    },
                                    variant: 'link',
                                    isDestructive: true,
                                },
                                'Remove'
                            )
                            : null
                    ),
                    el(
                        PanelBody,
                        { title: 'Layout', initialOpen: false },
                        el(SelectControl, {
                            label: 'Alignment',
                            value: a.alignment,
                            options: ALIGNMENT_OPTIONS,
                            onChange: function (v) { props.setAttributes({ alignment: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-team-member__photo-wrap' },
                        a.imageUrl
                            ? el('img', {
                                className: 'ds-team-member__photo',
                                src: a.imageUrl,
                                alt: '',
                            })
                            : el(
                                'div',
                                { className: 'ds-team-member__photo ds-team-member__photo--placeholder' },
                                '\uD83D\uDC64'
                            )
                    ),
                    el(
                        'div',
                        { className: 'ds-team-member__info' },
                        el(RichText, {
                            tagName: 'h3',
                            className: 'ds-team-member__name',
                            value: a.name,
                            onChange: function (v) { props.setAttributes({ name: v }); },
                            placeholder: 'Full Name',
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'ds-team-member__role',
                            value: a.role,
                            onChange: function (v) { props.setAttributes({ role: v }); },
                            placeholder: 'Job Title / Role',
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'ds-team-member__bio',
                            value: a.bio,
                            onChange: function (v) { props.setAttributes({ bio: v }); },
                            placeholder: 'Short bio\u2026',
                        })
                    )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var cls = 'ds-team-member ds-team-member--' + a.alignment;
            var blockProps = useBlockProps.save({ className: cls });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'ds-team-member__photo-wrap' },
                    a.imageUrl
                        ? el('img', {
                            className: 'ds-team-member__photo',
                            src: a.imageUrl,
                            alt: a.name || '',
                        })
                        : null
                ),
                el(
                    'div',
                    { className: 'ds-team-member__info' },
                    el(RichText.Content, {
                        tagName: 'h3',
                        className: 'ds-team-member__name',
                        value: a.name,
                    }),
                    el(RichText.Content, {
                        tagName: 'p',
                        className: 'ds-team-member__role',
                        value: a.role,
                    }),
                    el(RichText.Content, {
                        tagName: 'p',
                        className: 'ds-team-member__bio',
                        value: a.bio,
                    })
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
