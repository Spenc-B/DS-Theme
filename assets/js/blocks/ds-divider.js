/**
 * DS Divider — Block Editor registration.
 *
 * Decorative section divider. Style (solid / dashed / dotted), optional
 * centre label/icon, line colour, and line thickness are all configurable
 * from the sidebar. Server-side rendered via render.php.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    var STYLE_OPTIONS = [
        { label: 'Solid', value: 'solid' },
        { label: 'Dashed', value: 'dashed' },
        { label: 'Dotted', value: 'dotted' },
        { label: 'Double', value: 'double' },
    ];

    var HEIGHT_OPTIONS = [
        { label: 'Thin (1px)', value: '1px' },
        { label: 'Medium (2px)', value: '2px' },
        { label: 'Thick (4px)', value: '4px' },
    ];

    blocks.registerBlockType('developer-starter/ds-divider', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'ds-divider ds-divider--' + a.style;
            var blockProps = useBlockProps({
                className: cls,
                style: {
                    '--ds-divider-color': a.lineColor || '#e0e0e0',
                    '--ds-divider-height': a.lineHeight || '1px',
                },
            });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Divider Style', initialOpen: true },
                        el(SelectControl, {
                            label: 'Line style',
                            value: a.style,
                            options: STYLE_OPTIONS,
                            onChange: function (v) { props.setAttributes({ style: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Thickness',
                            value: a.lineHeight,
                            options: HEIGHT_OPTIONS,
                            onChange: function (v) { props.setAttributes({ lineHeight: v }); },
                        }),
                        el(TextControl, {
                            label: 'Line colour',
                            help: 'Any valid CSS colour (e.g. #E17055 or rgba(0,0,0,0.15)).',
                            value: a.lineColor,
                            onChange: function (v) { props.setAttributes({ lineColor: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Centre Label', initialOpen: false },
                        el(TextControl, {
                            label: 'Label / icon',
                            help: 'Leave blank for a plain line. Paste an emoji or type a short label.',
                            value: a.label,
                            onChange: function (v) { props.setAttributes({ label: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    a.label
                        ? el('span', { className: 'ds-divider__label' }, a.label)
                        : null
                )
            );
        },

        // Server-side rendered — save returns null.
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
