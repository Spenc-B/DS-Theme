/**
 * DS Divider — Block Editor registration.
 *
 * Decorative section divider with optional icon or text label.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;
    var TextControl = components.TextControl;
    var RangeControl = components.RangeControl;

    blocks.registerBlockType('developer-starter/ds-divider', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-divider ds-divider--' + a.style });
            var lineStyle = {
                width: a.width + '%',
                borderTopStyle: a.style,
            };
            if (a.color) lineStyle.borderColor = a.color;

            var hasCenter = a.label || a.icon;

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Divider Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Line Style',
                            value: a.style,
                            options: [
                                { label: 'Solid', value: 'solid' },
                                { label: 'Dashed', value: 'dashed' },
                                { label: 'Dotted', value: 'dotted' },
                                { label: 'Double', value: 'double' },
                            ],
                            onChange: function (v) { props.setAttributes({ style: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Width (%)',
                            value: parseInt(a.width, 10),
                            min: 10,
                            max: 100,
                            onChange: function (v) { props.setAttributes({ width: String(v) }); },
                        }),
                        el(TextControl, {
                            label: 'Center label',
                            help: 'Text shown in the middle of the divider',
                            value: a.label,
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        }),
                        el(TextControl, {
                            label: 'Center icon (emoji)',
                            help: 'Emoji shown instead of label',
                            value: a.icon,
                            onChange: function (v) { props.setAttributes({ icon: v }); },
                        }),
                        el(TextControl, {
                            label: 'Line colour',
                            help: 'CSS colour value, e.g. #E17055',
                            value: a.color,
                            onChange: function (v) { props.setAttributes({ color: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    hasCenter
                        ? el(
                            'div',
                            { className: 'ds-divider__wrap', style: { width: a.width + '%' } },
                            el('span', { className: 'ds-divider__line ds-divider__line--left', style: { borderTopStyle: a.style, borderColor: a.color || undefined } }),
                            el('span', { className: 'ds-divider__center' }, a.icon || a.label),
                            el('span', { className: 'ds-divider__line ds-divider__line--right', style: { borderTopStyle: a.style, borderColor: a.color || undefined } })
                        )
                        : el('hr', { className: 'ds-divider__hr', style: lineStyle })
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-divider ds-divider--' + a.style });
            var lineStyle = {
                width: a.width + '%',
                borderTopStyle: a.style,
            };
            if (a.color) lineStyle.borderColor = a.color;

            var hasCenter = a.label || a.icon;

            return el(
                'div',
                blockProps,
                hasCenter
                    ? el(
                        'div',
                        { className: 'ds-divider__wrap', style: { width: a.width + '%' } },
                        el('span', { className: 'ds-divider__line ds-divider__line--left', style: { borderTopStyle: a.style, borderColor: a.color || undefined } }),
                        el('span', { className: 'ds-divider__center', 'aria-hidden': 'true' }, a.icon || a.label),
                        el('span', { className: 'ds-divider__line ds-divider__line--right', style: { borderTopStyle: a.style, borderColor: a.color || undefined } })
                    )
                    : el('hr', { className: 'ds-divider__hr', style: lineStyle })
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
