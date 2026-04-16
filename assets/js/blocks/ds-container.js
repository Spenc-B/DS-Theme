/**
 * DS Container — Block Editor registration.
 *
 * Uses wp.blocks, wp.blockEditor, wp.components globals (no build step).
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;

    var CONTAINER_OPTIONS = [
        { label: 'Container', value: 'container' },
        { label: 'Container Fluid', value: 'container-fluid' },
        { label: 'Container SM', value: 'container-sm' },
        { label: 'Container MD', value: 'container-md' },
        { label: 'Container LG', value: 'container-lg' },
        { label: 'Container XL', value: 'container-xl' },
        { label: 'Container XXL', value: 'container-xxl' },
    ];

    var TAG_OPTIONS = [
        { label: 'div', value: 'div' },
        { label: 'section', value: 'section' },
        { label: 'article', value: 'article' },
        { label: 'main', value: 'main' },
        { label: 'aside', value: 'aside' },
        { label: 'header', value: 'header' },
        { label: 'footer', value: 'footer' },
    ];

    var TEMPLATE = [
        ['developer-starter/ds-row', {}, [
            ['developer-starter/ds-column'],
            ['developer-starter/ds-column'],
        ]],
    ];

    blocks.registerBlockType('developer-starter/ds-container', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: attrs.containerType });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Container Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Container Type',
                            value: attrs.containerType,
                            options: CONTAINER_OPTIONS,
                            onChange: function (val) { props.setAttributes({ containerType: val }); },
                        }),
                        el(SelectControl, {
                            label: 'HTML Tag',
                            value: attrs.tagName,
                            options: TAG_OPTIONS,
                            onChange: function (val) { props.setAttributes({ tagName: val }); },
                        })
                    )
                ),
                el(attrs.tagName || 'div', blockProps, el(InnerBlocks, { template: TEMPLATE }))
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
