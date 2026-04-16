/**
 * DS AI Content — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-ai-content', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-ai-content' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS AI Content Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Prompt',
                            value: attrs.prompt,
                            onChange: function (v) { props.setAttributes({ prompt: v }); },
                        }),
                        el(TextControl, {
                            label: 'Generatedcontent',
                            value: attrs.generatedContent,
                            onChange: function (v) { props.setAttributes({ generatedContent: v }); },
                        }),
                        el(TextControl, {
                            label: 'Model',
                            value: attrs.model,
                            onChange: function (v) { props.setAttributes({ model: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Maxtokens',
                            value: attrs.maxTokens,
                            onChange: function (v) { props.setAttributes({ maxTokens: v }); },
                            min: 0,
                            max: 100,
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS AI Content'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-ai-content' });
            return el('div', blockProps, el('span', null, attrs.prompt));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
