/**
 * DS File - Block Editor registration.
 *
 * File download card with icon, name, size, and download button.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var MediaUpload = blockEditor.MediaUpload;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var Button = components.Button;

    blocks.registerBlockType('developer-starter/ds-file', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'card' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'File Settings', initialOpen: true },
                        el(MediaUpload, {
                            onSelect: function (media) {
                                props.setAttributes({
                                    fileId: media.id,
                                    fileUrl: media.url,
                                    fileName: media.filename || media.title,
                                    fileSize: media.filesizeHumanReadable || '',
                                });
                            },
                            value: a.fileId,
                            render: function (obj) {
                                return el(Button, { onClick: obj.open, variant: 'secondary' },
                                    a.fileUrl ? 'Replace File' : 'Select File'
                                );
                            },
                        }),
                        a.fileUrl ? el(TextControl, {
                            label: 'File Name',
                            value: a.fileName,
                            onChange: function (v) { props.setAttributes({ fileName: v }); },
                        }) : null,
                        el(TextControl, {
                            label: 'Button Text',
                            value: a.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show file icon',
                            checked: a.showIcon !== false,
                            onChange: function (v) { props.setAttributes({ showIcon: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', { className: 'card-body d-flex align-items-center gap-3' },
                        a.showIcon !== false ? el('span', { style: { fontSize: '24px' } }, '\uD83D\uDCC4') : null,
                        el('div', { className: 'flex-grow-1' },
                            el('div', { className: 'fw-bold' }, a.fileName || 'No file selected'),
                            a.fileSize ? el('small', { className: 'text-muted' }, a.fileSize) : null
                        ),
                        el('span', { className: 'btn btn-outline-primary btn-sm' }, a.buttonText || 'Download')
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
