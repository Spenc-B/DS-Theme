/**
 * DS Feature List - Block Editor registration.
 *
 * Icon feature list with customizable icon character and column count.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var RangeControl = components.RangeControl;

    var TEMPLATE = [
        ['core/paragraph', { placeholder: 'Feature item 1...' }],
        ['core/paragraph', { placeholder: 'Feature item 2...' }],
        ['core/paragraph', { placeholder: 'Feature item 3...' }],
    ];

    blocks.registerBlockType('developer-starter/ds-feature-list', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({
                className: 'ds-feature-list',
                style: { columnCount: a.columns || 1 },
            });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Feature List Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Icon / Symbol',
                            help: 'Character shown before each item',
                            value: a.icon,
                            onChange: function (v) { props.setAttributes({ icon: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Columns',
                            value: a.columns,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                            min: 1,
                            max: 4,
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.icon ? el('div', {
                        style: { marginBottom: '4px', fontSize: '12px', color: '#757575' },
                    }, 'Icon: ' + a.icon) : null,
                    el(InnerBlocks, { template: TEMPLATE })
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
