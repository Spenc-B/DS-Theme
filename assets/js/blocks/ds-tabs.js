/**
 * DS Tabs — Block Editor registration.
 *
 * Tabbed content container. Tabs are managed in the sidebar;
 * each tab's content panel is an InnerBlocks area shown/hidden by index.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var Button = components.Button;

    blocks.registerBlockType('developer-starter/ds-tabs', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-tabs' });

            function setTabLabel(index, value) {
                var updated = a.tabs.map(function (t, i) {
                    return i === index ? { label: value } : t;
                });
                props.setAttributes({ tabs: updated });
            }

            function addTab() {
                var updated = a.tabs.concat([{ label: 'Tab ' + (a.tabs.length + 1) }]);
                props.setAttributes({ tabs: updated });
            }

            function removeTab(index) {
                if (a.tabs.length <= 1) return;
                var updated = a.tabs.filter(function (_, i) { return i !== index; });
                var active = a.activeTab >= updated.length ? updated.length - 1 : a.activeTab;
                props.setAttributes({ tabs: updated, activeTab: active });
            }

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Tab Labels', initialOpen: true },
                        a.tabs.map(function (t, i) {
                            return el(
                                'div',
                                { key: i, style: { display: 'flex', gap: '4px', marginBottom: '6px' } },
                                el(TextControl, {
                                    value: t.label,
                                    onChange: function (v) { setTabLabel(i, v); },
                                    __nextHasNoMarginBottom: true,
                                }),
                                a.tabs.length > 1. ? el(
                                    Button,
                                    {
                                        icon: 'trash',
                                        isDestructive: true,
                                        size: 'small',
                                        onClick: function () { removeTab(i); },
                                        label: 'Remove tab',
                                    }
                                ) : null
                            );
                        }),
                        el(
                            Button,
                            { variant: 'secondary', onClick: addTab, style: { marginTop: '8px' } },
                            '+ Add Tab'
                        )
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-tabs__nav', role: 'tablist' },
                        a.tabs.map(function (t, i) {
                            return el(
                                'button',
                                {
                                    key: i,
                                    type: 'button',
                                    className: 'ds-tabs__btn' + (i === a.activeTab ? ' is-active' : ''),
                                    onClick: function () { props.setAttributes({ activeTab: i }); },
                                    role: 'tab',
                                    'aria-selected': i === a.activeTab,
                                },
                                t.label
                            );
                        })
                    ),
                    el(
                        'div',
                        { className: 'ds-tabs__panels' },
                        el(
                            'div',
                            { className: 'ds-tabs__panel is-active', role: 'tabpanel' },
                            el(InnerBlocks, {
                                template: [['core/paragraph', { placeholder: 'Tab content\u2026' }]],
                                templateLock: false,
                            })
                        )
                    )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-tabs' });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'ds-tabs__nav', role: 'tablist' },
                    a.tabs.map(function (t, i) {
                        return el(
                            'button',
                            {
                                key: i,
                                type: 'button',
                                className: 'ds-tabs__btn' + (i === 0 ? ' is-active' : ''),
                                role: 'tab',
                                'aria-selected': i === 0,
                                'data-tab': i,
                            },
                            t.label
                        );
                    })
                ),
                el(
                    'div',
                    { className: 'ds-tabs__panels' },
                    el(
                        'div',
                        { className: 'ds-tabs__panel is-active', role: 'tabpanel' },
                        el(InnerBlocks.Content)
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
