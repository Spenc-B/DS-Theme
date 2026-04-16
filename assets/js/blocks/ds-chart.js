/**
 * DS Chart — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-chart', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-chart' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Chart Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Charttype',
                            value: attrs.chartType,
                            onChange: function (v) { props.setAttributes({ chartType: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Height',
                            value: attrs.height,
                            onChange: function (v) { props.setAttributes({ height: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(ToggleControl, {
                            label: 'Showlegend',
                            checked: attrs.showLegend,
                            onChange: function (v) { props.setAttributes({ showLegend: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Chart'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-chart' });
            return el('div', blockProps, el('span', null, attrs.chartType));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
