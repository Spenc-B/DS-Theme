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

    var TEMPLATE = [['developer-starter/ds-button', { text: 'Get Started', variant: 'primary', size: 'lg' }]];

    blocks.registerBlockType('developer-starter/ds-hero', {
        edit: function (props) {
            var a = props.attributes;

            var wrapperStyle = {
                minHeight: a.minHeight || '60vh',
                backgroundImage: a.backgroundImageUrl ? 'url(' + a.backgroundImageUrl + ')' : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: a.alignment === 'left' ? 'flex-start' : a.alignment === 'right' ? 'flex-end' : 'center',
                textAlign: a.alignment || 'center',
                color: '#fff',
            };

            var overlayStyle = {
                position: 'absolute',
                inset: '0',
                backgroundColor: 'rgba(0,0,0,' + ((a.overlayOpacity || 50) / 100) + ')',
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
                                props.setAttributes({ backgroundImageUrl: media.url, backgroundImageId: media.id });
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
                            onClick: function () { props.setAttributes({ backgroundImageUrl: '', backgroundImageId: 0 }); },
                            isDestructive: true,
                            variant: 'link',
                            style: { marginBottom: '12px' },
                        }, 'Remove Image') : null,
                        el(RangeControl, {
                            label: 'Overlay Opacity',
                            value: a.overlayOpacity,
                            onChange: function (v) { props.setAttributes({ overlayOpacity: v }); },
                            min: 0,
                            max: 100,
                        }),
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
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', { style: overlayStyle }),
                    el(
                        'div',
                        { className: 'container', style: { position: 'relative', zIndex: 1, padding: '40px 20px' } },
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
