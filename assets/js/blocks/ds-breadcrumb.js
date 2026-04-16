/**
 * DS Breadcrumb — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var TextareaControl = components.TextareaControl;
    var ToggleControl = components.ToggleControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-breadcrumb', {
        edit: function (props) {
            var attrs = props.attributes;

            // Parse manual items for preview.
            var items;
            try {
                items = JSON.parse(attrs.itemsJson || '[]');
            } catch (e) {
                items = [];
            }

            // Preview items.
            var previewItems = attrs.mode === 'manual' && items.length
                ? items
                : [{ label: 'Home', url: '/' }, { label: 'Category', url: '#' }, { label: 'Current page', url: '' }];

            var blockProps = useBlockProps({ className: 'ds-breadcrumb-preview' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Breadcrumb Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Mode',
                            value: attrs.mode || 'auto',
                            options: [
                                { label: 'Auto (page hierarchy)', value: 'auto' },
                                { label: 'Manual (JSON items)', value: 'manual' },
                            ],
                            onChange: function (v) { props.setAttributes({ mode: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show Home link',
                            checked: attrs.showHome !== false,
                            onChange: function (v) { props.setAttributes({ showHome: v }); },
                        }),
                        el(TextControl, {
                            label: 'Separator',
                            value: attrs.separator || '/',
                            onChange: function (v) { props.setAttributes({ separator: v }); },
                        }),
                        attrs.mode === 'manual'
                            ? el(TextareaControl, {
                                label: 'Items JSON',
                                help: '[{"label":"Home","url":"/"},{"label":"Page","url":""}]',
                                value: attrs.itemsJson || '',
                                onChange: function (v) { props.setAttributes({ itemsJson: v }); },
                            })
                            : null
                    )
                ),
                el('div', blockProps,
                    el('nav', { 'aria-label': 'Breadcrumb' },
                        el('ol', { className: 'breadcrumb mb-0' },
                            previewItems.map(function (item, i) {
                                var isLast = i === previewItems.length - 1;
                                return el('li', {
                                    key: i,
                                    className: 'breadcrumb-item' + (isLast ? ' active' : ''),
                                }, item.label || 'Item');
                            })
                        )
                    )
                )
            );
        },

        save: function () {
            return null;
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
