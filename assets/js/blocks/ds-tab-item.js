/**
 * DS Tab Item - Block Editor registration.
 *
 * Single tab panel with label and InnerBlocks content.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;

    var TEMPLATE = [['core/paragraph', { placeholder: 'Tab content...' }]];

    blocks.registerBlockType('developer-starter/ds-tab-item', {
        edit: function (props) {
            var a = props.attributes;

            if (!a.uniqueId) {
                props.setAttributes({ uniqueId: 'tab-' + Math.random().toString(36).substring(2, 8) });
            }

            var blockProps = useBlockProps({
                style: { border: '1px solid #e0e0e0', borderRadius: '4px', marginBottom: '8px' },
            });

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
                            label: 'Tab Label',
                            value: a.label,
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', {
                        style: {
                            padding: '4px 12px',
                            background: '#f0f0f0',
                            borderBottom: '1px solid #e0e0e0',
                            fontSize: '12px',
                            fontWeight: 'bold',
                        },
                    }, a.label || 'Tab'),
                    el('div', { style: { padding: '12px' } },
                        el(InnerBlocks, { template: TEMPLATE })
                    )
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
