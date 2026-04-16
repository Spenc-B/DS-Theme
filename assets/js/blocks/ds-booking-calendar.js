/**
 * DS Booking Calendar — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-booking-calendar', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-booking-calendar' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Booking Calendar Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Calendarid',
                            value: attrs.calendarId,
                            onChange: function (v) { props.setAttributes({ calendarId: v }); },
                        }),
                        el(TextControl, {
                            label: 'View',
                            value: attrs.view,
                            onChange: function (v) { props.setAttributes({ view: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Firstday',
                            value: attrs.firstDay,
                            onChange: function (v) { props.setAttributes({ firstDay: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Bookingurl',
                            value: attrs.bookingUrl,
                            onChange: function (v) { props.setAttributes({ bookingUrl: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Booking Calendar'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-booking-calendar' });
            return el('div', blockProps, el('span', null, attrs.calendarId));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
