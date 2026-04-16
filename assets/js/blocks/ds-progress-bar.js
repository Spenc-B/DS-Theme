/**
 * DS Progress Bar — Block Editor registration.
 *
 * Labelled progress / skill bar with percentage fill.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var ToggleControl = components.ToggleControl;
    var ColorPalette = components.ColorPalette;

    var COLORS = [
        { name: 'Coral', color: '#E17055' },
        { name: 'Yellow', color: '#FDCB6E' },
        { name: 'Blue', color: '#3498db' },
        { name: 'Green', color: '#27ae60' },
        { name: 'Dark', color: '#1a1a1a' },
    ];

    blocks.registerBlockType('developer-starter/ds-progress-bar', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-progress' });
            var fill = a.barColor || '#E17055';

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Progress Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Percentage',
                            value: a.percentage,
                            min: 0,
                            max: 100,
                            onChange: function (v) { props.setAttributes({ percentage: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show percentage text',
                            checked: a.showPercentage,
                            onChange: function (v) { props.setAttributes({ showPercentage: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Bar Colour', initialOpen: false },
                        el(ColorPalette, {
                            colors: COLORS,
                            value: a.barColor,
                            onChange: function (v) { props.setAttributes({ barColor: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-progress__header' },
                        el(RichText, {
                            tagName: 'span',
                            className: 'ds-progress__label',
                            value: a.label,
                            onChange: function (v) { props.setAttributes({ label: v }); },
                            placeholder: 'Skill name',
                        }),
                        a.showPercentage
                            ? el('span', { className: 'ds-progress__pct' }, a.percentage + '%')
                            : null
                    ),
                    el(
                        'div',
                        { className: 'ds-progress__track' },
                        el('div', {
                            className: 'ds-progress__fill',
                            style: { width: a.percentage + '%', background: fill },
                        })
                    )
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-progress' });
            var fill = a.barColor || '#E17055';

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'ds-progress__header' },
                    el(RichText.Content, { tagName: 'span', className: 'ds-progress__label', value: a.label }),
                    a.showPercentage
                        ? el('span', { className: 'ds-progress__pct' }, a.percentage + '%')
                        : null
                ),
                el(
                    'div',
                    { className: 'ds-progress__track', role: 'progressbar', 'aria-valuenow': a.percentage, 'aria-valuemin': '0', 'aria-valuemax': '100' },
                    el('div', {
                        className: 'ds-progress__fill',
                        style: { width: a.percentage + '%', backgroundColor: fill },
                    })
                )
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
