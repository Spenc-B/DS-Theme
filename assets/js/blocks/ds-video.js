/**
 * DS Video - Block Editor registration.
 *
 * Responsive video embed with aspect ratio and optional poster.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var MediaUpload = blockEditor.MediaUpload;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;
    var ToggleControl = components.ToggleControl;
    var Button = components.Button;

    blocks.registerBlockType('developer-starter/ds-video', {
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
                        { title: 'Video Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Video URL',
                            help: 'YouTube, Vimeo, or direct video URL',
                            value: a.url,
                            onChange: function (v) { props.setAttributes({ url: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Aspect Ratio',
                            value: a.aspectRatio,
                            options: [
                                { label: '16:9', value: '16by9' },
                                { label: '21:9', value: '21by9' },
                                { label: '4:3', value: '4by3' },
                                { label: '1:1', value: '1by1' },
                            ],
                            onChange: function (v) { props.setAttributes({ aspectRatio: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Autoplay',
                            checked: !!a.autoplay,
                            onChange: function (v) { props.setAttributes({ autoplay: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Lightbox mode',
                            checked: !!a.lightbox,
                            onChange: function (v) { props.setAttributes({ lightbox: v }); },
                        }),
                        el(MediaUpload, {
                            onSelect: function (media) {
                                props.setAttributes({ posterUrl: media.url, posterId: media.id });
                            },
                            allowedTypes: ['image'],
                            value: a.posterId,
                            render: function (obj) {
                                return el(Button, { onClick: obj.open, variant: 'secondary' },
                                    a.posterUrl ? 'Replace Poster' : 'Select Poster Image'
                                );
                            },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.url
                        ? el('div', {
                            className: 'ratio ratio-' + (a.aspectRatio || '16by9'),
                            style: { background: '#000', borderRadius: '8px', overflow: 'hidden' },
                        },
                            el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px' } },
                                '\u25B6 ' + a.url
                            )
                        )
                        : el('div', {
                            style: { padding: '40px', textAlign: 'center', background: '#f0f0f0', borderRadius: '8px', border: '2px dashed #ccc' },
                        }, 'Enter a video URL in the sidebar')
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
