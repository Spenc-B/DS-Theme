/**
 * DS Countdown Timer - Block Editor registration.
 *
 * Countdown to a target date/time with configurable segments.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;

    blocks.registerBlockType('developer-starter/ds-countdown-timer', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'text-center p-4' });

            var segments = [];
            if (a.showDays) segments.push('Days');
            if (a.showHours) segments.push('Hours');
            if (a.showMinutes) segments.push('Minutes');
            if (a.showSeconds) segments.push('Seconds');

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Timer Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Target Date',
                            help: 'Format: YYYY-MM-DDTHH:MM (e.g. 2025-12-31T00:00)',
                            value: a.targetDate,
                            onChange: function (v) { props.setAttributes({ targetDate: v }); },
                        }),
                        el(TextControl, {
                            label: 'Expired Message',
                            value: a.expiredMessage,
                            onChange: function (v) { props.setAttributes({ expiredMessage: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show Days',
                            checked: a.showDays,
                            onChange: function (v) { props.setAttributes({ showDays: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show Hours',
                            checked: a.showHours,
                            onChange: function (v) { props.setAttributes({ showHours: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show Minutes',
                            checked: a.showMinutes,
                            onChange: function (v) { props.setAttributes({ showMinutes: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show Seconds',
                            checked: a.showSeconds,
                            onChange: function (v) { props.setAttributes({ showSeconds: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', { style: { fontSize: '13px', color: '#757575', marginBottom: '8px' } },
                        'Target: ' + (a.targetDate || 'Not set')
                    ),
                    el(
                        'div',
                        { className: 'd-flex justify-content-center gap-3' },
                        segments.map(function (seg) {
                            return el('div', { key: seg, className: 'text-center' },
                                el('div', { className: 'display-6 fw-bold' }, '00'),
                                el('div', { className: 'small text-muted' }, seg)
                            );
                        })
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
