/**
 * DS Code Display - Block Editor registration.
 *
 * Code block with language selection, line numbers, and copy button.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextareaControl = components.TextareaControl;
    var SelectControl = components.SelectControl;
    var ToggleControl = components.ToggleControl;

    var LANGUAGES = [
        { label: 'JavaScript', value: 'javascript' },
        { label: 'HTML', value: 'html' },
        { label: 'CSS', value: 'css' },
        { label: 'PHP', value: 'php' },
        { label: 'Python', value: 'python' },
        { label: 'JSON', value: 'json' },
        { label: 'Bash', value: 'bash' },
        { label: 'SQL', value: 'sql' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'Plain Text', value: 'plaintext' },
    ];

    blocks.registerBlockType('developer-starter/ds-code-display', {
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
                        { title: 'Code Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Language',
                            value: a.language,
                            options: LANGUAGES,
                            onChange: function (v) { props.setAttributes({ language: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show line numbers',
                            checked: a.showLineNumbers,
                            onChange: function (v) { props.setAttributes({ showLineNumbers: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show copy button',
                            checked: a.showCopyButton,
                            onChange: function (v) { props.setAttributes({ showCopyButton: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', {
                        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 12px', background: '#343a40', color: '#adb5bd', fontSize: '12px', borderRadius: '6px 6px 0 0' },
                    },
                        el('span', null, a.language || 'javascript'),
                        a.showCopyButton ? el('span', null, 'Copy') : null
                    ),
                    el(TextareaControl, {
                        value: a.code,
                        onChange: function (v) { props.setAttributes({ code: v }); },
                        rows: 10,
                        className: 'ds-code-editor',
                        __nextHasNoMarginBottom: true,
                    })
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
