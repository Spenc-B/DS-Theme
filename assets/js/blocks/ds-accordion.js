/**
 * DS Accordion — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;

    var TEMPLATE = [
        ['developer-starter/ds-accordion-item', { title: 'Accordion Item 1' }],
        ['developer-starter/ds-accordion-item', { title: 'Accordion Item 2' }],
    ];

    blocks.registerBlockType('developer-starter/ds-accordion', {
        edit: function (props) {
            var attrs = props.attributes;

            // Auto-generate unique ID on first render.
            if ( !attrs.uniqueId ) {
                props.setAttributes({ uniqueId: 'acc-' + Math.random().toString(36).substring(2, 8) });
            }

            var accClass = 'accordion' + (attrs.flush ? ' accordion-flush' : '');
            var blockProps = useBlockProps({ className: accClass });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Accordion Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Always open (allow multiple)',
                            checked: !!attrs.alwaysOpen,
                            onChange: function (v) { props.setAttributes({ alwaysOpen: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Flush (no outer borders)',
                            checked: !!attrs.flush,
                            onChange: function (v) { props.setAttributes({ flush: v }); },
                        })
                    )
                ),
                el('div', blockProps,
                    el(InnerBlocks, {
                        allowedBlocks: ['developer-starter/ds-accordion-item'],
                        template: TEMPLATE,
                    })
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
