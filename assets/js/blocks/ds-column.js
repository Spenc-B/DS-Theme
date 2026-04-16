/**
 * DS Column — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;

    var NONE = { label: '— None —', value: '' };

    function spanOptions(prefix) {
        var opts = [
            NONE,
            { label: 'Equal width', value: 'equal' },
            { label: 'Auto', value: 'auto' },
        ];
        for (var i = 1; i <= 12; i++) {
            opts.push({ label: prefix + i + ' (' + Math.round(i / 12 * 100) + '%)', value: String(i) });
        }
        return opts;
    }

    function offsetOptions() {
        var opts = [NONE];
        for (var i = 0; i <= 11; i++) {
            opts.push({ label: 'Offset ' + i, value: String(i) });
        }
        return opts;
    }

    function orderOptions() {
        var opts = [
            NONE,
            { label: 'First', value: 'first' },
            { label: 'Last', value: 'last' },
        ];
        for (var i = 0; i <= 5; i++) {
            opts.push({ label: 'Order ' + i, value: String(i) });
        }
        return opts;
    }

    var ALIGN_SELF_OPTIONS = [NONE,
        { label: 'Start', value: 'align-self-start' },
        { label: 'Center', value: 'align-self-center' },
        { label: 'End', value: 'align-self-end' },
        { label: 'Stretch', value: 'align-self-stretch' },
        { label: 'Baseline', value: 'align-self-baseline' },
    ];

    function buildClassName(attrs) {
        var parts = [];
        var colMap = {
            colDefault: 'col',
            colSm: 'col-sm',
            colMd: 'col-md',
            colLg: 'col-lg',
            colXl: 'col-xl',
            colXxl: 'col-xxl',
        };
        Object.keys(colMap).forEach(function (key) {
            var v = attrs[key];
            if (!v) return;
            var prefix = colMap[key];
            if (v === 'equal') parts.push(prefix);
            else if (v === 'auto') parts.push(prefix + '-auto');
            else parts.push(prefix + '-' + v);
        });
        if (parts.length === 0) parts.push('col');

        var offsetMap = { offsetDefault: 'offset', offsetMd: 'offset-md', offsetLg: 'offset-lg' };
        Object.keys(offsetMap).forEach(function (key) {
            var v = attrs[key];
            if (v !== '' && v !== undefined) parts.push(offsetMap[key] + '-' + v);
        });

        var orderMap = { orderDefault: 'order', orderMd: 'order-md', orderLg: 'order-lg' };
        Object.keys(orderMap).forEach(function (key) {
            var v = attrs[key];
            if (v) parts.push(orderMap[key] + '-' + v);
        });

        if (attrs.alignSelf) parts.push(attrs.alignSelf);

        return parts.join(' ');
    }

    blocks.registerBlockType('developer-starter/ds-column', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: buildClassName(attrs) });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Column Span', initialOpen: true },
                        el(SelectControl, {
                            label: 'Default (xs)',
                            value: attrs.colDefault,
                            options: spanOptions('col-'),
                            onChange: function (v) { props.setAttributes({ colDefault: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Small (sm)',
                            value: attrs.colSm,
                            options: spanOptions('col-sm-'),
                            onChange: function (v) { props.setAttributes({ colSm: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Medium (md)',
                            value: attrs.colMd,
                            options: spanOptions('col-md-'),
                            onChange: function (v) { props.setAttributes({ colMd: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Large (lg)',
                            value: attrs.colLg,
                            options: spanOptions('col-lg-'),
                            onChange: function (v) { props.setAttributes({ colLg: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Extra Large (xl)',
                            value: attrs.colXl,
                            options: spanOptions('col-xl-'),
                            onChange: function (v) { props.setAttributes({ colXl: v }); },
                        }),
                        el(SelectControl, {
                            label: 'XXL (xxl)',
                            value: attrs.colXxl,
                            options: spanOptions('col-xxl-'),
                            onChange: function (v) { props.setAttributes({ colXxl: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Offset', initialOpen: false },
                        el(SelectControl, {
                            label: 'Default',
                            value: attrs.offsetDefault,
                            options: offsetOptions(),
                            onChange: function (v) { props.setAttributes({ offsetDefault: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Medium (md)',
                            value: attrs.offsetMd,
                            options: offsetOptions(),
                            onChange: function (v) { props.setAttributes({ offsetMd: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Large (lg)',
                            value: attrs.offsetLg,
                            options: offsetOptions(),
                            onChange: function (v) { props.setAttributes({ offsetLg: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Order', initialOpen: false },
                        el(SelectControl, {
                            label: 'Default',
                            value: attrs.orderDefault,
                            options: orderOptions(),
                            onChange: function (v) { props.setAttributes({ orderDefault: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Medium (md)',
                            value: attrs.orderMd,
                            options: orderOptions(),
                            onChange: function (v) { props.setAttributes({ orderMd: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Large (lg)',
                            value: attrs.orderLg,
                            options: orderOptions(),
                            onChange: function (v) { props.setAttributes({ orderLg: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Self Alignment', initialOpen: false },
                        el(SelectControl, {
                            label: 'Align Self',
                            value: attrs.alignSelf,
                            options: ALIGN_SELF_OPTIONS,
                            onChange: function (v) { props.setAttributes({ alignSelf: v }); },
                        })
                    )
                ),
                el('div', blockProps, el(InnerBlocks))
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
