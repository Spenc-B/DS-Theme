/**
 * DS Accordion — Block Editor registration.
 *
 * Accordion container. Drop DS Accordion Item blocks inside.
 * Server-side rendered via render.php.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;

    blocks.registerBlockType('developer-starter/ds-accordion', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-accordion' });

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
                            label: 'Allow multiple open',
                            help: 'When enabled, multiple items can be expanded at once.',
                            checked: a.allowMultiple,
                            onChange: function (v) { props.setAttributes({ allowMultiple: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(InnerBlocks, {
                        allowedBlocks: ['developer-starter/ds-accordion-item'],
                        template: [['developer-starter/ds-accordion-item']],
                        templateLock: false,
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
