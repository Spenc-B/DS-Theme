/**
 * DS Fun Fact / Stat — Block Editor registration.
 *
 * Large number display with label, prefix, and suffix.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;

    blocks.registerBlockType('developer-starter/ds-fun-fact', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-counter' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Display', initialOpen: true },
                        el(TextControl, {
                            label: 'Prefix',
                            help: 'Text before the number (e.g. $ or +)',
                            value: a.prefix,
                            onChange: function (v) { props.setAttributes({ prefix: v }); },
                        }),
                        el(TextControl, {
                            label: 'Suffix',
                            help: 'Text after the number (e.g. % or +)',
                            value: a.suffix,
                            onChange: function (v) { props.setAttributes({ suffix: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-counter__value' },
                        a.prefix ? el('span', { className: 'ds-counter__prefix' }, a.prefix) : null,
                        el(RichText, {
                            tagName: 'span',
                            className: 'ds-counter__number',
                            value: a.number,
                            onChange: function (v) { props.setAttributes({ number: v }); },
                            placeholder: '100',
                        }),
                        a.suffix ? el('span', { className: 'ds-counter__suffix' }, a.suffix) : null
                    ),
                    el(RichText, {
                        tagName: 'div',
                        className: 'ds-counter__label',
                        value: a.label,
                        onChange: function (v) { props.setAttributes({ label: v }); },
                        placeholder: 'Happy Clients',
                    })
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-counter' });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    { className: 'ds-counter__value' },
                    a.prefix ? el('span', { className: 'ds-counter__prefix' }, a.prefix) : null,
                    el(RichText.Content, { tagName: 'span', className: 'ds-counter__number', value: a.number }),
                    a.suffix ? el('span', { className: 'ds-counter__suffix' }, a.suffix) : null
                ),
                el(RichText.Content, { tagName: 'div', className: 'ds-counter__label', value: a.label })
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
