/**
 * DS Chart - Block Editor registration.
 *
 * Interactive chart block. Configuration via sidebar, rendered via Chart.js on front-end.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var TextareaControl = components.TextareaControl;
    var SelectControl = components.SelectControl;
    var RangeControl = components.RangeControl;
    var ToggleControl = components.ToggleControl;

    blocks.registerBlockType('developer-starter/ds-chart', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({});

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Chart Settings', initialOpen: true },
                        el(SelectControl, {
                            label: 'Chart Type',
                            value: a.chartType,
                            options: [
                                { label: 'Bar', value: 'bar' },
                                { label: 'Line', value: 'line' },
                                { label: 'Pie', value: 'pie' },
                                { label: 'Doughnut', value: 'doughnut' },
                            ],
                            onChange: function (v) { props.setAttributes({ chartType: v }); },
                        }),
                        el(TextControl, {
                            label: 'Labels (comma-separated)',
                            value: (a.labels || []).join(', '),
                            onChange: function (v) {
                                props.setAttributes({ labels: v.split(',').map(function (s) { return s.trim(); }) });
                            },
                        }),
                        el(RangeControl, {
                            label: 'Height (px)',
                            value: a.height,
                            onChange: function (v) { props.setAttributes({ height: v }); },
                            min: 100,
                            max: 800,
                        }),
                        el(ToggleControl, {
                            label: 'Show legend',
                            checked: !!a.showLegend,
                            onChange: function (v) { props.setAttributes({ showLegend: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', {
                        style: {
                            height: (a.height || 300) + 'px',
                            background: '#f8f9fa',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #dee2e6',
                        },
                    },
                        el('div', { className: 'text-center text-muted' },
                            el('div', { style: { fontSize: '24px' } }, '\uD83D\uDCCA'),
                            el('div', null, (a.chartType || 'bar').charAt(0).toUpperCase() + (a.chartType || 'bar').slice(1) + ' Chart'),
                            el('small', null, (a.labels || []).join(', ') || 'No labels configured')
                        )
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
