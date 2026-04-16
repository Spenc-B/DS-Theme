/**
 * DS Table — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-table', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-table' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Table Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Striped',
                            checked: attrs.striped,
                            onChange: function (v) { props.setAttributes({ striped: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Bordered',
                            checked: attrs.bordered,
                            onChange: function (v) { props.setAttributes({ bordered: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Hover',
                            checked: attrs.hover,
                            onChange: function (v) { props.setAttributes({ hover: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Responsive',
                            checked: attrs.responsive,
                            onChange: function (v) { props.setAttributes({ responsive: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Rows',
                            value: attrs.rows,
                            onChange: function (v) { props.setAttributes({ rows: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(RangeControl, {
                            label: 'Cols',
                            value: attrs.cols,
                            onChange: function (v) { props.setAttributes({ cols: v }); },
                            min: 0,
                            max: 100,
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Table'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-table' });
            return el('div', blockProps, el('span', null, attrs.striped));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
