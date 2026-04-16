/**
 * DS Timeline - Block Editor registration.
 *
 * Vertical timeline container with alternating entries. Uses InnerBlocks.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ColorPicker = components.ColorPicker;

    blocks.registerBlockType('developer-starter/ds-timeline', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({
                className: 'ds-timeline',
                style: { borderLeft: '3px solid ' + (a.lineColor || '#E17055'), paddingLeft: '20px' },
            });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Timeline Settings', initialOpen: true },
                        el('label', { style: { display: 'block', marginBottom: '8px', fontWeight: 'bold' } }, 'Line Color'),
                        el(ColorPicker, {
                            color: a.lineColor || '#E17055',
                            onChangeComplete: function (c) { props.setAttributes({ lineColor: c.hex }); },
                        })
                    )
                ),
                el('div', blockProps,
                    el(InnerBlocks, {
                        template: [
                            ['core/group', {}, [['core/heading', { level: 4, placeholder: 'Timeline entry...' }], ['core/paragraph', { placeholder: 'Description...' }]]],
                            ['core/group', {}, [['core/heading', { level: 4, placeholder: 'Timeline entry...' }], ['core/paragraph', { placeholder: 'Description...' }]]],
                        ],
                    })
                )
            );
        },

        save: function () {
            var el = window.wp.element.createElement;
            return el(window.wp.blockEditor.InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
