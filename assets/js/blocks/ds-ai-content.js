/**
 * DS AI Content - Block Editor registration.
 *
 * AI-generated content placeholder with prompt configuration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextareaControl = components.TextareaControl;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;
    var RangeControl = components.RangeControl;

    blocks.registerBlockType('developer-starter/ds-ai-content', {
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
                        { title: 'AI Settings', initialOpen: true },
                        el(TextareaControl, {
                            label: 'Prompt',
                            help: 'Describe the content you want generated',
                            value: a.prompt,
                            onChange: function (v) { props.setAttributes({ prompt: v }); },
                            rows: 4,
                        }),
                        el(SelectControl, {
                            label: 'Model',
                            value: a.model,
                            options: [
                                { label: 'GPT-4', value: 'gpt-4' },
                                { label: 'GPT-3.5 Turbo', value: 'gpt-3.5-turbo' },
                            ],
                            onChange: function (v) { props.setAttributes({ model: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Max Tokens',
                            value: a.maxTokens,
                            onChange: function (v) { props.setAttributes({ maxTokens: v }); },
                            min: 50,
                            max: 4000,
                            step: 50,
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.generatedContent
                        ? el('div', {
                            className: 'p-3',
                            dangerouslySetInnerHTML: { __html: a.generatedContent },
                        })
                        : el('div', {
                            style: { padding: '24px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center', border: '1px dashed #dee2e6' },
                        },
                            el('div', { style: { fontSize: '24px', marginBottom: '8px' } }, '\uD83E\uDD16'),
                            el('div', { className: 'fw-bold' }, 'AI Content Block'),
                            a.prompt
                                ? el('small', { className: 'text-muted' }, 'Prompt: ' + a.prompt.substring(0, 80) + (a.prompt.length > 80 ? '...' : ''))
                                : el('small', { className: 'text-muted' }, 'Configure prompt in sidebar')
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
