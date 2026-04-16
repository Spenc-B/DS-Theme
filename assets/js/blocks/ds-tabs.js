/**
 * DS Tabs - Block Editor registration.
 *
 * Bootstrap tabbed content container. Uses InnerBlocks with ds-tab-item children.
 * Nav preview built from child labels via useSelect. Clicking a tab shows that pane.
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
    var useState = element.useState;

    var ALLOWED = ['developer-starter/ds-tab-item'];
    var TEMPLATE = [
        ['developer-starter/ds-tab-item', { label: 'Tab 1' }],
        ['developer-starter/ds-tab-item', { label: 'Tab 2' }],
        ['developer-starter/ds-tab-item', { label: 'Tab 3' }],
    ];

    /* ── Inline styles that mimic Bootstrap tab nav ──── */
    var navStyles = {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 0,
        marginBottom: 0,
        listStyle: 'none',
        borderBottom: '2px solid #dee2e6',
    };

    function linkStyle(active) {
        return {
            display: 'block',
            padding: '8px 16px',
            cursor: 'pointer',
            textDecoration: 'none',
            color: active ? '#495057' : '#6c757d',
            fontWeight: active ? '600' : '400',
            background: active ? '#fff' : 'transparent',
            border: active ? '2px solid #dee2e6' : '2px solid transparent',
            borderBottom: active ? '2px solid #fff' : '2px solid transparent',
            marginBottom: '-2px',
            borderRadius: '4px 4px 0 0',
            fontSize: '14px',
            userSelect: 'none',
        };
    }

    function pillStyle(active) {
        return {
            display: 'block',
            padding: '6px 16px',
            cursor: 'pointer',
            textDecoration: 'none',
            color: active ? '#fff' : '#0d6efd',
            fontWeight: '500',
            background: active ? '#0d6efd' : 'transparent',
            border: 'none',
            borderRadius: '50rem',
            fontSize: '14px',
            userSelect: 'none',
        };
    }

    blocks.registerBlockType('developer-starter/ds-tabs', {
        edit: function (props) {
            var a = props.attributes;
            var activeTab = useState(0);
            var activeIndex = activeTab[0];
            var setActiveIndex = activeTab[1];

            if (!a.uniqueId) {
                props.setAttributes({ uniqueId: 'tabs-' + Math.random().toString(36).substring(2, 8) });
            }

            var innerBlocks = useSelect(function (select) {
                return select('core/block-editor').getBlocks(props.clientId);
            }, [props.clientId]);

            var blockProps = useBlockProps({});

            var isPills = (a.variant || 'tabs') === 'pills';
            var navBaseStyle = isPills
                ? Object.assign({}, navStyles, { borderBottom: 'none', gap: '4px' })
                : navStyles;

            if (a.fill || a.justified) {
                navBaseStyle = Object.assign({}, navBaseStyle, { width: '100%' });
            }

            /* Clamp activeIndex if tabs were removed */
            var safeIndex = Math.min(activeIndex, Math.max(0, innerBlocks.length - 1));

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
                    /* ── Tab navigation ──────────────── */
                    el(
                        'ul',
                        { className: 'ds-tabs-nav', style: navBaseStyle, role: 'tablist' },
                        innerBlocks.map(function (block, i) {
                            var isActive = i === safeIndex;
                            var itemStyle = (a.fill || a.justified)
                                ? { flex: a.justified ? '1 1 0' : '1 1 auto', textAlign: 'center' }
                                : {};
                            return el(
                                'li',
                                { key: block.clientId, style: itemStyle, role: 'presentation' },
                                el(
                                    'span',
                                    {
                                        style: isPills ? pillStyle(isActive) : linkStyle(isActive),
                                        onClick: function () { setActiveIndex(i); },
                                        role: 'tab',
                                        'aria-selected': isActive ? 'true' : 'false',
                                    },
                                    block.attributes.label || 'Tab'
                                )
                            );
                        })
                    ),
                    /* ── Tab content panes ───────────── */
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
