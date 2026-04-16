/**
 * DS Timeline — Block Editor registration.
 *
 * Vertical timeline container. Drop DS Timeline Entry (InnerBlocks) inside.
 * The accent line colour is configurable from the sidebar.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;

    var TEMPLATE = [
        ['core/group', {}, [
            ['core/heading', { level: 4, placeholder: 'Event title' }],
            ['core/paragraph', { placeholder: 'Event description\u2026' }],
        ]],
    ];

    blocks.registerBlockType('developer-starter/ds-timeline', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({
                className: 'ds-timeline',
                style: { '--ds-timeline-color': a.lineColor || '#E17055' },
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
                        el(TextControl, {
                            label: 'Accent line colour',
                            help: 'Any valid CSS colour (e.g. #E17055).',
                            value: a.lineColor,
                            onChange: function (v) { props.setAttributes({ lineColor: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(InnerBlocks, {
                        template: TEMPLATE,
                        templateLock: false,
                    })
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({
                className: 'ds-timeline',
                style: { '--ds-timeline-color': a.lineColor || '#E17055' },
            });

            return el('div', blockProps, el(InnerBlocks.Content));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
