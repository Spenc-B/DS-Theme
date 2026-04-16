/**
 * DS Pricing Card — Block Editor registration.
 *
 * Visual pricing tier with RichText for title/price/period/button,
 * InnerBlocks for feature list, and a "featured" toggle in the sidebar.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;
    var TextControl = components.TextControl;

    var TEMPLATE = [
        ['core/list', { className: 'ds-pricing__features' }, [
            ['core/list-item', { content: 'Feature one' }],
            ['core/list-item', { content: 'Feature two' }],
            ['core/list-item', { content: 'Feature three' }],
        ]],
    ];

    blocks.registerBlockType('developer-starter/ds-pricing', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'ds-pricing' + (a.featured ? ' ds-pricing--featured' : '');
            var blockProps = useBlockProps({ className: cls });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Card Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Featured / Highlighted',
                            checked: a.featured,
                            onChange: function (v) { props.setAttributes({ featured: v }); },
                        }),
                        el(TextControl, {
                            label: 'Button URL',
                            value: a.buttonUrl,
                            onChange: function (v) { props.setAttributes({ buttonUrl: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.featured ? el('div', { className: 'ds-pricing__badge' }, 'Popular') : null,
                    el(
                        'div',
                        { className: 'ds-pricing__header' },
                        el(RichText, {
                            tagName: 'h3',
                            className: 'ds-pricing__title',
                            value: a.title,
                            onChange: function (v) { props.setAttributes({ title: v }); },
                            placeholder: 'Plan Name',
                        }),
                        el(
                            'div',
                            { className: 'ds-pricing__price-wrap' },
                            el(RichText, {
                                tagName: 'span',
                                className: 'ds-pricing__price',
                                value: a.price,
                                onChange: function (v) { props.setAttributes({ price: v }); },
                                placeholder: '$29',
                            }),
                            el(RichText, {
                                tagName: 'span',
                                className: 'ds-pricing__period',
                                value: a.period,
                                onChange: function (v) { props.setAttributes({ period: v }); },
                                placeholder: '/ month',
                            })
                        )
                    ),
                    el('div', { className: 'ds-pricing__body' }, el(InnerBlocks, { template: TEMPLATE })),
                    el(
                        'div',
                        { className: 'ds-pricing__cta' },
                        el(RichText, {
                            tagName: 'span',
                            value: a.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                            placeholder: 'Get Started',
                        })
                    )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var cls = 'ds-pricing' + (a.featured ? ' ds-pricing--featured' : '');
            var blockProps = useBlockProps.save({ className: cls });

            return el(
                'div',
                blockProps,
                a.featured ? el('div', { className: 'ds-pricing__badge' }, 'Popular') : null,
                el(
                    'div',
                    { className: 'ds-pricing__header' },
                    el(RichText.Content, { tagName: 'h3', className: 'ds-pricing__title', value: a.title }),
                    el(
                        'div',
                        { className: 'ds-pricing__price-wrap' },
                        el(RichText.Content, { tagName: 'span', className: 'ds-pricing__price', value: a.price }),
                        el(RichText.Content, { tagName: 'span', className: 'ds-pricing__period', value: a.period })
                    )
                ),
                el('div', { className: 'ds-pricing__body' }, el(InnerBlocks.Content)),
                el(
                    'div',
                    { className: 'ds-pricing__cta' },
                    el('a', { href: a.buttonUrl || '#' },
                        el(RichText.Content, { tagName: 'span', value: a.buttonText })
                    )
                )
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
