/**
 * DS Hero - Block Editor registration.
 *
 * Full-width hero section with background image, overlay, heading, subtitle, and CTA.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var MediaUpload = blockEditor.MediaUpload;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;
    var Button = components.Button;

    var ToggleControl = components.ToggleControl;
    var ColorPicker = components.ColorPicker;

    var TEMPLATE = [['developer-starter/ds-button', { text: 'Get Started', variant: 'primary', size: 'lg' }]];

    blocks.registerBlockType('developer-starter/ds-hero', {
        edit: function (props) {
            var a = props.attributes;
            var showOverlay = a.showOverlay !== false;

            var wrapperStyle = {
                minHeight: a.minHeight || '60vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: a.alignment === 'left' ? 'flex-start' : a.alignment === 'right' ? 'flex-end' : 'center',
                textAlign: a.alignment || 'center',
                color: '#fff',
                overflow: 'hidden',
            };

            var imgStyle = {
                position: 'absolute',
                inset: '0',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
            };

            var overlayColor = a.overlayColor || '#000000';
            var overlayStyle = {
                position: 'absolute',
                inset: '0',
                backgroundColor: overlayColor,
                opacity: (a.overlayOpacity || 50) / 100,
                zIndex: 1,
                pointerEvents: 'none',
            };

            var blockProps = useBlockProps({ style: wrapperStyle });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Hero Settings', initialOpen: true },
                        el(MediaUpload, {
                            onSelect: function (media) {
                                props.setAttributes({
                                    backgroundImageUrl: media.url,
                                    backgroundImageId: media.id,
                                    backgroundImageAlt: media.alt || '',
                                });
                            },
                            allowedTypes: ['image'],
                            value: a.backgroundImageId,
                            render: function (obj) {
                                return el(
                                    Button,
                                    { onClick: obj.open, variant: 'secondary', style: { marginBottom: '12px' } },
                                    a.backgroundImageUrl ? 'Replace Image' : 'Select Background Image'
                                );
                            },
                        }),
                        a.backgroundImageUrl ? el(Button, {
                            onClick: function () { props.setAttributes({ backgroundImageUrl: '', backgroundImageId: 0, backgroundImageAlt: '' }); },
                            isDestructive: true,
                            variant: 'link',
                            style: { marginBottom: '12px' },
                        }, 'Remove Image') : null,
                        a.backgroundImageUrl ? el(TextControl, {
                            label: 'Image Alt Text (SEO)',
                            value: a.backgroundImageAlt || '',
                            onChange: function (v) { props.setAttributes({ backgroundImageAlt: v }); },
                        }) : null,
                        el(TextControl, {
                            label: 'Min Height',
                            help: 'CSS value, e.g. 60vh or 500px',
                            value: a.minHeight,
                            onChange: function (v) { props.setAttributes({ minHeight: v }); },
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
                    ),
                    el(
                        PanelBody,
                        { title: 'Overlay', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Show overlay',
                            checked: showOverlay,
                            onChange: function (v) { props.setAttributes({ showOverlay: v }); },
                        }),
                        showOverlay ? el(RangeControl, {
                            label: 'Overlay Opacity',
                            value: a.overlayOpacity,
                            onChange: function (v) { props.setAttributes({ overlayOpacity: v }); },
                            min: 0,
                            max: 100,
                        }) : null,
                        showOverlay ? el('div', { style: { marginTop: '8px' } },
                            el('label', { style: { display: 'block', fontWeight: '600', marginBottom: '6px' } }, 'Overlay Colour'),
                            el(ColorPicker, {
                                color: overlayColor,
                                onChangeComplete: function (next) {
                                    props.setAttributes({ overlayColor: next.hex || overlayColor });
                                },
                            })
                        ) : null
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.backgroundImageUrl
                        ? el('img', { src: a.backgroundImageUrl, alt: a.backgroundImageAlt || '', style: imgStyle })
                        : el('div', { style: Object.assign({}, imgStyle, { background: '#2c3e50' }) }),
                    showOverlay ? el('div', { style: overlayStyle }) : null,
                    el(
                        'div',
                        { className: 'container', style: { position: 'relative', zIndex: 2, padding: '40px 20px' } },
                        el(RichText, {
                            tagName: 'h1',
                            className: 'display-4 fw-bold',
                            value: a.heading,
                            onChange: function (v) { props.setAttributes({ heading: v }); },
                            placeholder: 'Hero Heading...',
                        }),
                        el(RichText, {
                            tagName: 'p',
                            className: 'lead',
                            value: a.subtitle,
                            onChange: function (v) { props.setAttributes({ subtitle: v }); },
                            placeholder: 'Subtitle text...',
                        }),
                        el(InnerBlocks, { template: TEMPLATE })
                    )
                )
            );
        },

        save: function () {
            var el = window.wp.element.createElement;
            return el(window.wp.blockEditor.InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
