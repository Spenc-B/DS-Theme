/**
 * DS Logo Grid — Block Editor registration.
 *
 * Client / partner logos displayed in a responsive CSS grid.
 * Upload multiple images via gallery MediaUpload; control columns and
 * greyscale from the sidebar.
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
            var blockProps = useBlockProps({
                className: cls,
                style: { '--ds-logo-cols': a.columns },
            });

            function handleSelect(images) {
                var logos = images.map(function (img) {
                    return { id: img.id, url: img.url, alt: img.alt || '' };
                });
                props.setAttributes({ logos: logos });
            }

            function removeLogo(index) {
                var updated = a.logos.filter(function (_, i) { return i !== index; });
                props.setAttributes({ logos: updated });
            }

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
                            max: 8,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Greyscale logos',
                            help: 'Applies a CSS greyscale filter to all logos.',
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
                                multiple: 'add',
                                gallery: true,
                                value: a.logos.map(function (l) { return l.id; }),
                                onSelect: handleSelect,
                                render: function (obj) {
                                    return el(
                                        Button,
                                        { onClick: obj.open, variant: 'secondary' },
                                        a.logos.length ? 'Edit Logo Gallery' : 'Add Logos'
                                    );
                                },
                            })
                        )
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.logos.length
                        ? a.logos.map(function (logo, i) {
                            return el(
                                'div',
                                { key: logo.id || i, className: 'ds-logo-grid__item' },
                                el('img', {
                                    src: logo.url,
                                    alt: logo.alt || '',
                                    className: 'ds-logo-grid__img',
                                    loading: 'lazy',
                                }),
                                el(
                                    Button,
                                    {
                                        className: 'ds-logo-grid__remove',
                                        onClick: function () { removeLogo(i); },
                                        variant: 'link',
                                        isDestructive: true,
                                        icon: 'no',
                                        label: 'Remove logo',
                                    }
                                )
                            );
                        })
                        : el(
                            'p',
                            { className: 'ds-logo-grid__placeholder' },
                            'Add logos using the sidebar.'
                        )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var cls = 'ds-logo-grid' + (a.grayscale ? ' ds-logo-grid--grayscale' : '');
            var blockProps = useBlockProps.save({
                className: cls,
                style: { '--ds-logo-cols': a.columns },
            });

            return el(
                'div',
                blockProps,
                a.logos.map(function (logo, i) {
                    return el(
                        'div',
                        { key: logo.id || i, className: 'ds-logo-grid__item' },
                        el('img', {
                            src: logo.url,
                            alt: logo.alt || '',
                            className: 'ds-logo-grid__img',
                            loading: 'lazy',
                            width: '',
                            height: '',
                        })
                    );
                })
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
