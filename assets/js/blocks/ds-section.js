/**
 * DS Section — Block Editor registration.
 *
 * Semantic section wrapper. Choose the HTML tag (section, div, article,
 * aside, main) from the sidebar. Content is InnerBlocks.
 * Server-side rendered via render.php.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;

    var TAG_OPTIONS = [
        { label: '<section>', value: 'section' },
        { label: '<div>', value: 'div' },
        { label: '<article>', value: 'article' },
        { label: '<aside>', value: 'aside' },
        { label: '<main>', value: 'main' },
    ];

    blocks.registerBlockType('developer-starter/ds-section', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-section' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Section Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'HTML tag',
                            value: a.tagName,
                            options: TAG_OPTIONS,
                            onChange: function (v) { props.setAttributes({ tagName: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-section__tag-hint' },
                        '\u2039' + a.tagName + '\u203A'
                    ),
                    el(InnerBlocks, { templateLock: false })
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
