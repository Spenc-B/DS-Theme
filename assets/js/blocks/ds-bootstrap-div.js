/**
 * DS Bootstrap Div — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    var TAG_OPTIONS = [
        { label: 'div',     value: 'div' },
        { label: 'section', value: 'section' },
        { label: 'article', value: 'article' },
        { label: 'aside',   value: 'aside' },
        { label: 'header',  value: 'header' },
        { label: 'footer',  value: 'footer' },
        { label: 'main',    value: 'main' },
        { label: 'nav',     value: 'nav' },
        { label: 'span',    value: 'span' },
    ];

    blocks.registerBlockType('developer-starter/ds-bootstrap-div', {
        edit: function (props) {
            var attrs = props.attributes;
            var extraClass = (attrs.bsClasses || '').trim();
            var editorClass = 'ds-bootstrap-div-editor' + (extraClass ? ' ' + extraClass : '');
            var blockProps = useBlockProps({ className: editorClass });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Bootstrap Div Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Bootstrap classes',
                            help: 'Space-separated utility classes, e.g. d-flex p-3 bg-light',
                            value: attrs.bsClasses || '',
                            onChange: function (v) { props.setAttributes({ bsClasses: v }); },
                        }),
                        el(SelectControl, {
                            label: 'HTML tag',
                            value: attrs.tagName || 'div',
                            options: TAG_OPTIONS,
                            onChange: function (v) { props.setAttributes({ tagName: v }); },
                        })
                    )
                ),
                el('div', blockProps,
                    extraClass
                        ? el('span', { className: 'ds-editor-label', style: { fontSize: '11px', color: '#999', display: 'block', marginBottom: '4px' } },
                            '<' + (attrs.tagName || 'div') + '> . ' + extraClass)
                        : null,
                    el(InnerBlocks)
                )
            );
        },

        save: function () {
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
