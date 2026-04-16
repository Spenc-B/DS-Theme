/**
 * DS Tabs - Block Editor registration.
 *
 * Bootstrap tabbed content container. Uses InnerBlocks with ds-tab-item children.
 * Nav preview built from child labels via useSelect.
 */
(function (blocks, blockEditor, components, element, data) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;
    var ToggleControl = components.ToggleControl;
    var useSelect = data.useSelect;

    var ALLOWED = ['developer-starter/ds-tab-item'];
    var TEMPLATE = [
        ['developer-starter/ds-tab-item', { label: 'Tab 1' }],
        ['developer-starter/ds-tab-item', { label: 'Tab 2' }],
        ['developer-starter/ds-tab-item', { label: 'Tab 3' }],
    ];

    blocks.registerBlockType('developer-starter/ds-tabs', {
        edit: function (props) {
            var a = props.attributes;

            if (!a.uniqueId) {
                props.setAttributes({ uniqueId: 'tabs-' + Math.random().toString(36).substring(2, 8) });
            }

            var innerBlocks = useSelect(function (select) {
                return select('core/block-editor').getBlocks(props.clientId);
            }, [props.clientId]);

            var blockProps = useBlockProps({});

            var navClass = 'nav nav-' + (a.variant || 'tabs');
            if (a.fill) navClass += ' nav-fill';
            if (a.justified) navClass += ' nav-justified';

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Tab Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Style',
                            value: a.variant || 'tabs',
                            options: [
                                { label: 'Tabs', value: 'tabs' },
                                { label: 'Pills', value: 'pills' },
                            ],
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Fill width',
                            checked: !!a.fill,
                            onChange: function (v) { props.setAttributes({ fill: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Justified',
                            checked: !!a.justified,
                            onChange: function (v) { props.setAttributes({ justified: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'ul',
                        { className: navClass, role: 'tablist' },
                        innerBlocks.map(function (block, i) {
                            return el(
                                'li',
                                { key: block.clientId, className: 'nav-item', role: 'presentation' },
                                el(
                                    'span',
                                    { className: 'nav-link' + (i === 0 ? ' active' : ''), style: { cursor: 'default' } },
                                    block.attributes.label || 'Tab'
                                )
                            );
                        })
                    ),
                    el(
                        'div',
                        { className: 'tab-content', style: { padding: '16px 0' } },
                        el(InnerBlocks, {
                            allowedBlocks: ALLOWED,
                            template: TEMPLATE,
                        })
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
    window.wp.element,
    window.wp.data
);
