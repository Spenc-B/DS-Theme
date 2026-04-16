/**
 * DS Logo Grid — Block Editor registration.
 *
 * Client / partner logo showcase grid with optional grayscale toggle.
 * Uses MediaUpload (gallery mode) to pick multiple logos at once.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var MediaUpload = blockEditor.MediaUpload;
    var MediaUploadCheck = blockEditor.MediaUploadCheck;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var ToggleControl = components.ToggleControl;
    var Button = components.Button;

    blocks.registerBlockType('developer-starter/ds-logo-grid', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'ds-logo-grid' + (a.grayscale ? ' ds-logo-grid--grayscale' : '');
            var blockProps = useBlockProps({ className: cls });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Grid Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Columns',
                            value: a.columns,
                            min: 2,
                            max: 6,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Grayscale logos',
                            help: 'Logos appear grey and gain colour on hover',
                            checked: a.grayscale,
                            onChange: function (v) { props.setAttributes({ grayscale: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Logos', initialOpen: true },
                        el(
                            MediaUploadCheck,
                            null,
                            el(MediaUpload, {
                                allowedTypes: ['image'],
                                multiple: true,
                                gallery: true,
                                value: a.images.map(function (img) { return img.id; }),
                                onSelect: function (media) {
                                    var imgs = media.map(function (m) {
                                        return { id: m.id, url: m.url, alt: m.alt || '' };
                                    });
                                    props.setAttributes({ images: imgs });
                                },
                                render: function (obj) {
                                    return el(
                                        Button,
                                        { onClick: obj.open, variant: 'secondary' },
                                        a.images.length ? 'Edit Logos (' + a.images.length + ')' : 'Add Logos'
                                    );
                                },
                            })
                        ),
                        a.images.length > 0 && el(
                            Button,
                            {
                                onClick: function () { props.setAttributes({ images: [] }); },
                                variant: 'link',
                                isDestructive: true,
                                style: { marginTop: '8px' },
                            },
                            'Remove all'
                        )
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.images.length === 0
                        ? el(
                            'div',
                            { className: 'ds-logo-grid__placeholder' },
                            el(
                                MediaUploadCheck,
                                null,
                                el(MediaUpload, {
                                    allowedTypes: ['image'],
                                    multiple: true,
                                    gallery: true,
                                    onSelect: function (media) {
                                        var imgs = media.map(function (m) {
                                            return { id: m.id, url: m.url, alt: m.alt || '' };
                                        });
                                        props.setAttributes({ images: imgs });
                                    },
                                    render: function (obj) {
                                        return el(
                                            Button,
                                            { onClick: obj.open, variant: 'primary', icon: 'plus-alt' },
                                            ' Add logos'
                                        );
                                    },
                                })
                            )
                        )
                        : el(
                            'div',
                            {
                                className: 'ds-logo-grid__grid',
                                style: { gridTemplateColumns: 'repeat(' + a.columns + ', 1fr)' },
                            },
                            a.images.map(function (img) {
                                return el(
                                    'div',
                                    { key: img.id, className: 'ds-logo-grid__item' },
                                    el('img', { src: img.url, alt: img.alt })
                                );
                            })
                        )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var cls = 'ds-logo-grid' + (a.grayscale ? ' ds-logo-grid--grayscale' : '');
            var blockProps = useBlockProps.save({ className: cls });

            if (!a.images.length) return null;

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    {
                        className: 'ds-logo-grid__grid',
                        style: { gridTemplateColumns: 'repeat(' + a.columns + ', 1fr)' },
                    },
                    a.images.map(function (img) {
                        return el(
                            'div',
                            { key: img.id, className: 'ds-logo-grid__item' },
                            el('img', { src: img.url, alt: img.alt, loading: 'lazy' })
                        );
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
