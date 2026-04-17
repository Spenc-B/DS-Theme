/**
 * DS Weather — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-weather', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-weather' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Weather Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Location',
                            value: attrs.location,
                            onChange: function (v) { props.setAttributes({ location: v }); },
                        }),
                        el(TextControl, {
                            label: 'Units',
                            value: attrs.units,
                            onChange: function (v) { props.setAttributes({ units: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showforecast',
                            checked: attrs.showForecast,
                            onChange: function (v) { props.setAttributes({ showForecast: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Forecastdays',
                            value: attrs.forecastDays,
                            onChange: function (v) { props.setAttributes({ forecastDays: v }); },
                            min: 0,
                            max: 100,
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Weather'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-weather' });
            return el('div', blockProps, el('span', null, attrs.location));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
