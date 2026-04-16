/**
 * DS Tab Item - Block Editor registration.
 *
 * Single tab panel with label and InnerBlocks content.
 * Styled to look like a Bootstrap tab pane inside the tabbed container.
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
                style: {
                    border: '1px solid #dee2e6',
                    borderTop: '3px solid #0d6efd',
                    borderRadius: '0 0 4px 4px',
                    marginBottom: '12px',
                    background: '#fff',
                },
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
                            background: '#f8f9fa',
                            borderBottom: '1px solid #dee2e6',
                            fontSize: '11px',
                            fontWeight: '600',
                            color: '#0d6efd',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                        },
                    }, a.label || 'Tab'),
                    el('div', { style: { padding: '16px' } },
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
