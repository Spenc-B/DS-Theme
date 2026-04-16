/**
 * DS Cards - Block Editor registration.
 *
 * Card grid container with responsive columns. Wraps ds-card blocks.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var TextControl = components.TextControl;

    var ALLOWED = ['developer-starter/ds-card'];
    var TEMPLATE = [
        ['developer-starter/ds-card'],
        ['developer-starter/ds-card'],
        ['developer-starter/ds-card'],
    ];

    blocks.registerBlockType('developer-starter/ds-cards', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({
                className: 'row',
                style: { gap: a.gap || '1.5rem' },
            });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Grid Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Columns',
                            value: a.columns,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                            min: 1,
                            max: 6,
                        }),
                        el(TextControl, {
                            label: 'Gap',
                            help: 'CSS gap value (e.g. 1.5rem)',
                            value: a.gap,
                            onChange: function (v) { props.setAttributes({ gap: v }); },
                        })
                    )
                ),
                el('div', blockProps,
                    el(InnerBlocks, {
                        allowedBlocks: ALLOWED,
                        template: TEMPLATE,
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
