/**
 * DS Gallery - Block Editor registration.
 *
 * Image gallery with grid layout, column control, and lightbox option.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var MediaUpload = blockEditor.MediaUpload;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;
    var ToggleControl = components.ToggleControl;
    var TextControl = components.TextControl;
    var Button = components.Button;

    blocks.registerBlockType('developer-starter/ds-gallery', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({});

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Gallery Settings', initialOpen: true },
                        el(MediaUpload, {
                            onSelect: function (media) {
                                var imgs = media.map(function (m) { return { id: m.id, url: m.url, alt: m.alt || '' }; });
                                props.setAttributes({ images: imgs });
                            },
                            allowedTypes: ['image'],
                            multiple: true,
                            gallery: true,
                            value: a.images.map(function (i) { return i.id; }),
                            render: function (obj) {
                                return el(Button, { onClick: obj.open, variant: 'secondary' },
                                    a.images.length ? 'Edit Gallery (' + a.images.length + ')' : 'Select Images'
                                );
                            },
                        }),
                        el(RangeControl, {
                            label: 'Columns',
                            value: a.columns,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                            min: 1,
                            max: 6,
                        }),
                        el(SelectControl, {
                            label: 'Layout',
                            value: a.layout,
                            options: [
                                { label: 'Grid', value: 'grid' },
                                { label: 'Masonry', value: 'masonry' },
                            ],
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Enable lightbox',
                            checked: !!a.lightbox,
                            onChange: function (v) { props.setAttributes({ lightbox: v }); },
                        }),
                        el(TextControl, {
                            label: 'Gap',
                            help: 'CSS gap value (e.g. 0.5rem)',
                            value: a.gap,
                            onChange: function (v) { props.setAttributes({ gap: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.images.length
                        ? el('div', {
                            style: { display: 'grid', gridTemplateColumns: 'repeat(' + a.columns + ', 1fr)', gap: a.gap || '0.5rem' },
                        },
                            a.images.map(function (img) {
                                return el('img', {
                                    key: img.id,
                                    src: img.url,
                                    alt: img.alt,
                                    style: { width: '100%', height: 'auto', borderRadius: '4px', objectFit: 'cover' },
                                });
                            })
                        )
                        : el('div', {
                            style: { padding: '40px', textAlign: 'center', background: '#f0f0f0', borderRadius: '8px', border: '2px dashed #ccc' },
                        }, 'Select images in the sidebar')
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
