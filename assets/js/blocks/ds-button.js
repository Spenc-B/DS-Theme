/**
 * DS Button — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var RichText = blockEditor.RichText;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var SelectControl = components.SelectControl;
    var ColorPicker = components.ColorPicker;

    var VARIANT_OPTIONS = [
        { label: 'Primary',   value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
        { label: 'Success',   value: 'success' },
        { label: 'Danger',    value: 'danger' },
        { label: 'Warning',   value: 'warning' },
        { label: 'Info',      value: 'info' },
        { label: 'Light',     value: 'light' },
        { label: 'Dark',      value: 'dark' },
        { label: 'Outline Primary',   value: 'outline-primary' },
        { label: 'Outline Secondary', value: 'outline-secondary' },
    ];

    var SIZE_OPTIONS = [
        { label: 'Default', value: '' },
        { label: 'Small',   value: 'sm' },
        { label: 'Large',   value: 'lg' },
    ];

    var ALIGN_OPTIONS = [
        { label: 'Default', value: '' },
        { label: 'Left',    value: 'start' },
        { label: 'Center',  value: 'center' },
        { label: 'Right',   value: 'end' },
    ];

    function colorField(label, value, onChange, key) {
        return el('div', { key: key, style: { marginBottom: '12px' } },
            el('label', { style: { display: 'block', fontWeight: '600', marginBottom: '6px' } }, label),
            el(ColorPicker, {
                color: value || '#000000',
                enableAlpha: true,
                onChangeComplete: function (next) {
                    var out = next && next.rgb
                        ? 'rgba(' + next.rgb.r + ',' + next.rgb.g + ',' + next.rgb.b + ',' + next.rgb.a + ')'
                        : (next.hex || value || '');
                    onChange(out);
                },
            })
        );
    }

    blocks.registerBlockType('developer-starter/ds-button', {
        edit: function (props) {
            var attrs = props.attributes;

            var btnClass = 'btn btn-' + (attrs.variant || 'primary')
                + (attrs.size ? ' btn-' + attrs.size : '')
                + (attrs.fullWidth ? ' w-100' : '');

            var btnStyle = {
                background: attrs.backgroundColor || undefined,
                color: attrs.textColor || undefined,
                borderColor: attrs.backgroundColor || undefined,
                borderRadius: attrs.borderRadius || undefined,
                display: 'inline-block',
                padding: '10px 14px',
            };

            var blockProps = useBlockProps({
                className: 'ds-button-editor',
                style: { textAlign: attrs.align || undefined },
            });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Button Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'URL',
                            value: attrs.url,
                            onChange: function (v) { props.setAttributes({ url: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Variant',
                            value: attrs.variant,
                            options: VARIANT_OPTIONS,
                            onChange: function (v) { props.setAttributes({ variant: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Size',
                            value: attrs.size,
                            options: SIZE_OPTIONS,
                            onChange: function (v) { props.setAttributes({ size: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Full width',
                            checked: !!attrs.fullWidth,
                            onChange: function (v) { props.setAttributes({ fullWidth: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Open in new tab',
                            checked: !!attrs.openInNewTab,
                            onChange: function (v) { props.setAttributes({ openInNewTab: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Alignment',
                            value: attrs.align || '',
                            options: ALIGN_OPTIONS,
                            onChange: function (v) { props.setAttributes({ align: v }); },
                        }),
                        el(TextControl, {
                            label: 'Border radius',
                            value: attrs.borderRadius || '',
                            help: 'e.g. 12px, 0.5rem, 50%',
                            onChange: function (v) { props.setAttributes({ borderRadius: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Custom Colours', initialOpen: false },
                        colorField('Background colour', attrs.backgroundColor, function (v) {
                            props.setAttributes({ backgroundColor: v });
                        }, 'btn-bg'),
                        colorField('Text colour', attrs.textColor, function (v) {
                            props.setAttributes({ textColor: v });
                        }, 'btn-text')
                    )
                ),
                el('div', blockProps,
                    el('div', { className: btnClass, style: btnStyle },
                        el(RichText, {
                            tagName: 'span',
                            value: attrs.text,
                            onChange: function (v) { props.setAttributes({ text: v }); },
                            placeholder: 'Button text…',
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
