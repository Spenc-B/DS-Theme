/**
 * DS Fun Fact - Block Editor registration.
 *
 * Big statistic number with optional prefix/suffix and label.
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
            var blockProps = useBlockProps({ className: 'text-center p-4' });

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
                        { className: 'display-3 fw-bold' },
                        a.prefix ? el('span', null, a.prefix) : null,
                        el(RichText, {
                            tagName: 'span',
                            value: a.number,
                            onChange: function (v) { props.setAttributes({ number: v }); },
                            placeholder: '100',
                        }),
                        a.suffix ? el('span', null, a.suffix) : null
                    ),
                    el(RichText, {
                        tagName: 'div',
                        className: 'lead mt-2',
                        value: a.label,
                        onChange: function (v) { props.setAttributes({ label: v }); },
                        placeholder: 'Happy Clients',
                    })
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
