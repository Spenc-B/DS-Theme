/**
 * DS Google Map — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-google-map', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-google-map' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    /* ── Location ─────────────────── */
                    el(
                        PanelBody,
                        { title: 'Location', initialOpen: true },
                        el(TextControl, {
                            label: 'Address',
                            value: attrs.address,
                            onChange: function (v) { props.setAttributes({ address: v }); },
                        }),
                        el(TextControl, {
                            label: 'Latitude',
                            value: attrs.lat,
                            onChange: function (v) { props.setAttributes({ lat: v }); },
                        }),
                        el(TextControl, {
                            label: 'Longitude',
                            value: attrs.lng,
                            onChange: function (v) { props.setAttributes({ lng: v }); },
                        })
                    ),
                    /* ── Display ──────────────────── */
                    el(
                        PanelBody,
                        { title: 'Display', initialOpen: false },
                        el(RangeControl, {
                            label: 'Zoom',
                            value: attrs.zoom,
                            onChange: function (v) { props.setAttributes({ zoom: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Height',
                            value: attrs.height,
                            onChange: function (v) { props.setAttributes({ height: v }); },
                        }),
                        el(TextControl, {
                            label: 'Map Style',
                            value: attrs.mapStyle,
                            onChange: function (v) { props.setAttributes({ mapStyle: v }); },
                        })
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Google Map'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-google-map' });
            return el('div', blockProps, el('span', null, attrs.address));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
