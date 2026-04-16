/**
 * DS Accordion Item Item Item — Block Editor registration.
 *
 * Expandable section using <details>/<summary>. RichText title,
 * InnerBlocks for body content.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;

    var TEMPLATE = [['core/paragraph', { placeholder: 'Accordion content\u2026' }]];

    blocks.registerBlockType('developer-starter/ds-accordion-item', {
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
                            label: 'Open by default',
                            checked: a.defaultOpen,
                            onChange: function (v) { props.setAttributes({ defaultOpen: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-accordion__header' },
                        el('span', { className: 'ds-accordion__indicator', 'aria-hidden': 'true' }, '\u25BC'),
                        el(RichText, {
                            tagName: 'span',
                            className: 'ds-accordion__title',
                            value: a.title,
                            onChange: function (v) { props.setAttributes({ title: v }); },
                            placeholder: 'Accordion title\u2026',
                        })
                    ),
                    el('div', { className: 'ds-accordion__body' }, el(InnerBlocks, { template: TEMPLATE }))
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-accordion' });
            var detailsAttrs = {};
            if (a.defaultOpen) detailsAttrs.open = true;

            return el(
                'details',
                Object.assign({}, blockProps, detailsAttrs),
                el(
                    'summary',
                    { className: 'ds-accordion__header' },
                    el('span', { className: 'ds-accordion__indicator', 'aria-hidden': 'true' }, '\u25BC'),
                    el(RichText.Content, { tagName: 'span', className: 'ds-accordion__title', value: a.title })
                ),
                el('div', { className: 'ds-accordion__body' }, el(InnerBlocks.Content))
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
