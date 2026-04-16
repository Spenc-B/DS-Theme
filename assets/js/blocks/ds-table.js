/**
 * DS Table - Block Editor registration.
 *
 * Bootstrap-styled table with configurable rows/cols and style toggles.
 * Uses a core/table inside InnerBlocks for content editing.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InnerBlocks = blockEditor.InnerBlocks;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;

    blocks.registerBlockType('developer-starter/ds-table', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'table';
            if (a.striped) cls += ' table-striped';
            if (a.bordered) cls += ' table-bordered';
            if (a.hover) cls += ' table-hover';

            var blockProps = useBlockProps({});

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Table Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Striped rows',
                            checked: !!a.striped,
                            onChange: function (v) { props.setAttributes({ striped: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Bordered',
                            checked: !!a.bordered,
                            onChange: function (v) { props.setAttributes({ bordered: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Hover effect',
                            checked: !!a.hover,
                            onChange: function (v) { props.setAttributes({ hover: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Responsive wrapper',
                            checked: !!a.responsive,
                            onChange: function (v) { props.setAttributes({ responsive: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', {
                        style: { fontSize: '12px', color: '#757575', marginBottom: '4px' },
                    }, 'Table: ' + cls),
                    el(InnerBlocks, {
                        allowedBlocks: ['core/table'],
                        template: [['core/table']],
                        templateLock: 'all',
                    })
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
