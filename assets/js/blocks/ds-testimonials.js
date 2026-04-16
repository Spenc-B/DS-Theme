/**
 * DS Testimonial — Block Editor registration.
 *
 * Fully visual: RichText for quote/name/role, MediaUpload for avatar,
 * star rating control in sidebar.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var MediaUpload = blockEditor.MediaUpload;
    var MediaUploadCheck = blockEditor.MediaUploadCheck;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var Button = components.Button;

    function Stars(count) {
        var out = [];
        for (var i = 0; i < 5; i++) {
            out.push(el('span', {
                key: i,
                className: 'ds-testimonial__star' + (i < count ? ' is-filled' : ''),
                'aria-hidden': 'true',
            }, '\u2605'));
        }
        return out;
    }

    blocks.registerBlockType('developer-starter/ds-testimonials', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-testimonial' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Rating', initialOpen: true },
                        el(RangeControl, {
                            label: 'Stars',
                            value: a.rating,
                            min: 0,
                            max: 5,
                            onChange: function (v) { props.setAttributes({ rating: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Avatar', initialOpen: true },
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
                                        a.imageUrl ? 'Replace Image' : 'Upload Avatar'
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
                    el('div', { className: 'ds-testimonial__stars' }, Stars(a.rating)),
                    el(RichText, {
                        tagName: 'blockquote',
                        className: 'ds-testimonial__quote',
                        value: a.quote,
                        onChange: function (v) { props.setAttributes({ quote: v }); },
                        placeholder: 'Write the testimonial\u2026',
                    }),
                    el(
                        'div',
                        { className: 'ds-testimonial__author' },
                        a.imageUrl
                            ? el('img', { className: 'ds-testimonial__avatar', src: a.imageUrl, alt: '' })
                            : el('div', { className: 'ds-testimonial__avatar ds-testimonial__avatar--placeholder' }, '\uD83D\uDC64'),
                        el(
                            'div',
                            { className: 'ds-testimonial__meta' },
                            el(RichText, {
                                tagName: 'span',
                                className: 'ds-testimonial__name',
                                value: a.authorName,
                                onChange: function (v) { props.setAttributes({ authorName: v }); },
                                placeholder: 'Name',
                            }),
                            el(RichText, {
                                tagName: 'span',
                                className: 'ds-testimonial__role',
                                value: a.authorRole,
                                onChange: function (v) { props.setAttributes({ authorRole: v }); },
                                placeholder: 'Role / Company',
                            })
                        )
                    )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-testimonial' });

            return el(
                'div',
                blockProps,
                el('div', { className: 'ds-testimonial__stars', 'aria-label': a.rating + ' out of 5 stars' }, Stars(a.rating)),
                el(RichText.Content, { tagName: 'blockquote', className: 'ds-testimonial__quote', value: a.quote }),
                el(
                    'div',
                    { className: 'ds-testimonial__author' },
                    a.imageUrl
                        ? el('img', { className: 'ds-testimonial__avatar', src: a.imageUrl, alt: '' })
                        : null,
                    el(
                        'div',
                        { className: 'ds-testimonial__meta' },
                        el(RichText.Content, { tagName: 'span', className: 'ds-testimonial__name', value: a.authorName }),
                        el(RichText.Content, { tagName: 'span', className: 'ds-testimonial__role', value: a.authorRole })
                    )
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
