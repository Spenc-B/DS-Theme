/**
 * DS Tab Item — Block Editor registration.
 *
 * Individual tab panel for use inside DS Tabs.
 * The tab label is set from the sidebar; content is InnerBlocks.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;

    var TEMPLATE = [['core/paragraph', { placeholder: 'Tab content\u2026' }]];

    blocks.registerBlockType('developer-starter/ds-tab-item', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-tab-item' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Tab Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Tab label',
                            help: 'Text shown on the tab button.',
                            value: a.label,
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-tab-item__label-preview' },
                        '\uD83D\uDCC4 ',
                        a.label || 'Tab'
                    ),
                    el(InnerBlocks, { template: TEMPLATE, templateLock: false })
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({
                className: 'ds-tab-item',
                'data-label': a.label || 'Tab',
                role: 'tabpanel',
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
