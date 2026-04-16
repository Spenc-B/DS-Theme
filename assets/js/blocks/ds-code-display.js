/**
 * DS Code Display — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-code-display', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-code-display' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Code Display Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Code',
                            value: attrs.code,
                            onChange: function (v) { props.setAttributes({ code: v }); },
                        }),
                        el(TextControl, {
                            label: 'Language',
                            value: attrs.language,
                            onChange: function (v) { props.setAttributes({ language: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showlinenumbers',
                            checked: attrs.showLineNumbers,
                            onChange: function (v) { props.setAttributes({ showLineNumbers: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showcopybutton',
                            checked: attrs.showCopyButton,
                            onChange: function (v) { props.setAttributes({ showCopyButton: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Code Display'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-code-display' });
            return el('div', blockProps, el('span', null, attrs.code));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
