/**
 * DS Accordion Item - Block Editor registration.
 *
 * Bootstrap accordion-item with RichText title and InnerBlocks body.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;

    var TEMPLATE = [['core/paragraph', { placeholder: 'Accordion content...' }]];

    blocks.registerBlockType('developer-starter/ds-accordion-item', {
        edit: function (props) {
            var a = props.attributes;

            // Auto-generate unique ID.
            if ( !a.uniqueId ) {
                props.setAttributes({ uniqueId: 'acc-item-' + Math.random().toString(36).substring(2, 8) });
            }

            var blockProps = useBlockProps({ className: 'accordion-item' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Item Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Open by default',
                            checked: !!a.defaultOpen,
                            onChange: function (v) { props.setAttributes({ defaultOpen: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'h2',
                        { className: 'accordion-header' },
                        el(RichText, {
                            tagName: 'span',
                            className: 'accordion-button' + (a.defaultOpen ? '' : ' collapsed'),
                            value: a.title,
                            onChange: function (v) { props.setAttributes({ title: v }); },
                            placeholder: 'Accordion title...',
                        })
                    ),
                    el(
                        'div',
                        { className: 'accordion-collapse', style: a.defaultOpen ? {} : { opacity: 0.5 } },
                        el('div', { className: 'accordion-body' },
                            el(InnerBlocks, { template: TEMPLATE })
                        )
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
