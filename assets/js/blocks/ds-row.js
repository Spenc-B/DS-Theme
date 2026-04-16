/**
 * DS Row — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;

    var NONE = { label: '— None —', value: '' };

    var GUTTER_OPTIONS = [NONE,
        { label: 'g-0 (none)', value: 'g-0' },
        { label: 'g-1', value: 'g-1' },
        { label: 'g-2', value: 'g-2' },
        { label: 'g-3 (default)', value: 'g-3' },
        { label: 'g-4', value: 'g-4' },
        { label: 'g-5', value: 'g-5' },
    ];

    var GUTTER_X_OPTIONS = [NONE,
        { label: 'gx-0', value: 'gx-0' },
        { label: 'gx-1', value: 'gx-1' },
        { label: 'gx-2', value: 'gx-2' },
        { label: 'gx-3', value: 'gx-3' },
        { label: 'gx-4', value: 'gx-4' },
        { label: 'gx-5', value: 'gx-5' },
    ];

    var GUTTER_Y_OPTIONS = [NONE,
        { label: 'gy-0', value: 'gy-0' },
        { label: 'gy-1', value: 'gy-1' },
        { label: 'gy-2', value: 'gy-2' },
        { label: 'gy-3', value: 'gy-3' },
        { label: 'gy-4', value: 'gy-4' },
        { label: 'gy-5', value: 'gy-5' },
    ];

    var JUSTIFY_OPTIONS = [NONE,
        { label: 'Start', value: 'justify-content-start' },
        { label: 'Center', value: 'justify-content-center' },
        { label: 'End', value: 'justify-content-end' },
        { label: 'Around', value: 'justify-content-around' },
        { label: 'Between', value: 'justify-content-between' },
        { label: 'Evenly', value: 'justify-content-evenly' },
    ];

    var ALIGN_OPTIONS = [NONE,
        { label: 'Start', value: 'align-items-start' },
        { label: 'Center', value: 'align-items-center' },
        { label: 'End', value: 'align-items-end' },
        { label: 'Stretch', value: 'align-items-stretch' },
        { label: 'Baseline', value: 'align-items-baseline' },
    ];

    var ROW_COLS_OPTIONS = [NONE,
        { label: '1 col', value: 'row-cols-1' },
        { label: '2 cols', value: 'row-cols-2' },
        { label: '3 cols', value: 'row-cols-3' },
        { label: '4 cols', value: 'row-cols-4' },
        { label: '5 cols', value: 'row-cols-5' },
        { label: '6 cols', value: 'row-cols-6' },
        { label: 'Auto', value: 'row-cols-auto' },
    ];

    var ROW_COLS_MD_OPTIONS = [NONE,
        { label: '1 col', value: 'row-cols-md-1' },
        { label: '2 cols', value: 'row-cols-md-2' },
        { label: '3 cols', value: 'row-cols-md-3' },
        { label: '4 cols', value: 'row-cols-md-4' },
        { label: '5 cols', value: 'row-cols-md-5' },
        { label: '6 cols', value: 'row-cols-md-6' },
        { label: 'Auto', value: 'row-cols-md-auto' },
    ];

    var ROW_COLS_LG_OPTIONS = [NONE,
        { label: '1 col', value: 'row-cols-lg-1' },
        { label: '2 cols', value: 'row-cols-lg-2' },
        { label: '3 cols', value: 'row-cols-lg-3' },
        { label: '4 cols', value: 'row-cols-lg-4' },
        { label: '5 cols', value: 'row-cols-lg-5' },
        { label: '6 cols', value: 'row-cols-lg-6' },
        { label: 'Auto', value: 'row-cols-lg-auto' },
    ];

    function buildClassName(attrs) {
        var parts = ['row'];
        if (attrs.gutter) parts.push(attrs.gutter);
        if (attrs.gutterX) parts.push(attrs.gutterX);
        if (attrs.gutterY) parts.push(attrs.gutterY);
        if (attrs.justifyContent) parts.push(attrs.justifyContent);
        if (attrs.alignItems) parts.push(attrs.alignItems);
        if (attrs.rowCols) parts.push(attrs.rowCols);
        if (attrs.rowColsMd) parts.push(attrs.rowColsMd);
        if (attrs.rowColsLg) parts.push(attrs.rowColsLg);
        return parts.join(' ');
    }

    blocks.registerBlockType('developer-starter/ds-row', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: buildClassName(attrs) });

            var TEMPLATE = [['developer-starter/ds-column'], ['developer-starter/ds-column']];

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Gutters', initialOpen: true },
                        el(SelectControl, {
                            label: 'Gutter (all)',
                            value: attrs.gutter,
                            options: GUTTER_OPTIONS,
                            onChange: function (v) { props.setAttributes({ gutter: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Gutter X (horizontal)',
                            value: attrs.gutterX,
                            options: GUTTER_X_OPTIONS,
                            onChange: function (v) { props.setAttributes({ gutterX: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Gutter Y (vertical)',
                            value: attrs.gutterY,
                            options: GUTTER_Y_OPTIONS,
                            onChange: function (v) { props.setAttributes({ gutterY: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Alignment', initialOpen: false },
                        el(SelectControl, {
                            label: 'Horizontal (justify-content)',
                            value: attrs.justifyContent,
                            options: JUSTIFY_OPTIONS,
                            onChange: function (v) { props.setAttributes({ justifyContent: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Vertical (align-items)',
                            value: attrs.alignItems,
                            options: ALIGN_OPTIONS,
                            onChange: function (v) { props.setAttributes({ alignItems: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Row Columns', initialOpen: false },
                        el(SelectControl, {
                            label: 'Default',
                            value: attrs.rowCols,
                            options: ROW_COLS_OPTIONS,
                            onChange: function (v) { props.setAttributes({ rowCols: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Medium (md)',
                            value: attrs.rowColsMd,
                            options: ROW_COLS_MD_OPTIONS,
                            onChange: function (v) { props.setAttributes({ rowColsMd: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Large (lg)',
                            value: attrs.rowColsLg,
                            options: ROW_COLS_LG_OPTIONS,
                            onChange: function (v) { props.setAttributes({ rowColsLg: v }); },
                        })
                    )
                ),
                el('div', blockProps, el(InnerBlocks, { template: TEMPLATE }))
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
