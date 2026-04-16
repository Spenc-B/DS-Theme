/**
 * DS Countdown Timer — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-countdown-timer', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-countdown-timer' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Countdown Timer Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Targetdate',
                            value: attrs.targetDate,
                            onChange: function (v) { props.setAttributes({ targetDate: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showdays',
                            checked: attrs.showDays,
                            onChange: function (v) { props.setAttributes({ showDays: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showhours',
                            checked: attrs.showHours,
                            onChange: function (v) { props.setAttributes({ showHours: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showminutes',
                            checked: attrs.showMinutes,
                            onChange: function (v) { props.setAttributes({ showMinutes: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showseconds',
                            checked: attrs.showSeconds,
                            onChange: function (v) { props.setAttributes({ showSeconds: v }); },
                        }),
                        el(TextControl, {
                            label: 'Expiredmessage',
                            value: attrs.expiredMessage,
                            onChange: function (v) { props.setAttributes({ expiredMessage: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Countdown Timer'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-countdown-timer' });
            return el('div', blockProps, el('span', null, attrs.targetDate));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
