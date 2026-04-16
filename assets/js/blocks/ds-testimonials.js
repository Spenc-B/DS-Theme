/**
 * DS Testimonials — Block Editor registration.
 *
 * Testimonial card with quote, avatar, author, role, and star rating.
 * Renders via render.php (SSR).
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var MediaUpload = blockEditor.MediaUpload;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var Button = components.Button;

    blocks.registerBlockType('developer-starter/ds-testimonials', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'card p-4' });

            var stars = [];
            for (var i = 0; i < 5; i++) {
                stars.push(
                    el('span', {
                        key: i,
                        style: { color: i < (a.rating || 0) ? '#FDCB6E' : '#dee2e6', fontSize: '20px' },
                    }, '\u2605')
                );
            }

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Testimonial Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Star Rating',
                            value: a.rating || 5,
                            onChange: function (v) { props.setAttributes({ rating: v }); },
                            min: 0,
                            max: 5,
                        }),
                        el(MediaUpload, {
                            onSelect: function (media) {
                                props.setAttributes({ imageUrl: media.url, imageId: media.id });
                            },
                            allowedTypes: ['image'],
                            value: a.imageId,
                            render: function (obj) {
                                return el(Button, { onClick: obj.open, variant: 'secondary' },
                                    a.imageUrl ? 'Replace Avatar' : 'Select Avatar'
                                );
                            },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', { className: 'mb-3' }, stars),
                    el(RichText, {
                        tagName: 'blockquote',
                        className: 'blockquote mb-3',
                        value: a.quote,
                        onChange: function (v) { props.setAttributes({ quote: v }); },
                        placeholder: 'Write testimonial quote\u2026',
                    }),
                    el('div', { className: 'd-flex align-items-center gap-3 mt-3' },
                        a.imageUrl
                            ? el('img', {
                                src: a.imageUrl,
                                alt: '',
                                style: { width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' },
                            })
                            : el('div', {
                                style: {
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    background: '#E17055', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', color: '#fff', fontWeight: 'bold',
                                },
                            }, '?'),
                        el('div', null,
                            el(RichText, {
                                tagName: 'div',
                                className: 'fw-bold',
                                value: a.authorName,
                                onChange: function (v) { props.setAttributes({ authorName: v }); },
                                placeholder: 'Author Name',
                            }),
                            el(RichText, {
                                tagName: 'div',
                                className: 'text-muted small',
                                value: a.authorRole,
                                onChange: function (v) { props.setAttributes({ authorRole: v }); },
                                placeholder: 'Role / Company',
                            })
                        )
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
