/**
 * DS Pricing Cards — Block Editor registration.
 *
 * Pricing tier card with price, feature list, and CTA button.
 * Renders via render.php (SSR).
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;

    var FEATURE_TEMPLATE = [
        ['core/list', {}, [
            ['core/list-item', { content: 'Feature one' }],
            ['core/list-item', { content: 'Feature two' }],
            ['core/list-item', { content: 'Feature three' }],
        ]]
    ];

    blocks.registerBlockType('developer-starter/ds-pricing-cards', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'card text-center' + (a.featured ? ' border-primary' : '');
            var blockProps = useBlockProps({ className: cls });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Pricing Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Featured / Highlighted',
                            checked: !!a.featured,
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
                    a.featured ? el('div', { className: 'card-header bg-primary text-white fw-bold' }, 'Popular') : null,
                    el('div', { className: 'card-body' },
                        el(RichText, {
                            tagName: 'h3',
                            className: 'card-title',
                            value: a.title,
                            onChange: function (v) { props.setAttributes({ title: v }); },
                            placeholder: 'Plan Name',
                        }),
                        el('div', { className: 'display-5 my-3' },
                            el(RichText, {
                                tagName: 'span',
                                value: a.price,
                                onChange: function (v) { props.setAttributes({ price: v }); },
                                placeholder: '$29',
                            }),
                            el(RichText, {
                                tagName: 'small',
                                className: 'text-muted fs-6',
                                value: a.period,
                                onChange: function (v) { props.setAttributes({ period: v }); },
                                placeholder: '/ month',
                            })
                        ),
                        el('div', { className: 'mb-3' }, el(InnerBlocks, { template: FEATURE_TEMPLATE })),
                        el(RichText, {
                            tagName: 'span',
                            className: 'btn ' + (a.featured ? 'btn-primary' : 'btn-outline-primary'),
                            value: a.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
                            placeholder: 'Get Started',
                        })
                    )
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
