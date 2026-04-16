/**
 * DS File — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-file', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-file' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS File Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Fileid',
                            value: attrs.fileId,
                            onChange: function (v) { props.setAttributes({ fileId: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Fileurl',
                            value: attrs.fileUrl,
                            onChange: function (v) { props.setAttributes({ fileUrl: v }); },
                        }),
                        el(TextControl, {
                            label: 'Filename',
                            value: attrs.fileName,
                            onChange: function (v) { props.setAttributes({ fileName: v }); },
                        }),
                        el(TextControl, {
                            label: 'Filesize',
                            value: attrs.fileSize,
                            onChange: function (v) { props.setAttributes({ fileSize: v }); },
                        }),
                        el(TextControl, {
                            label: 'Buttontext',
                            value: attrs.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showicon',
                            checked: attrs.showIcon,
                            onChange: function (v) { props.setAttributes({ showIcon: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS File'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-file' });
            return el('div', blockProps, el('span', null, attrs.fileId));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
