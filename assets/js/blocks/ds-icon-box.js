/**
 * DS Icon Box — Block Editor registration.
 *
 * Icon + heading + description card for services or features.
 * Emoji/text icon editable inline, alignment control in sidebar.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-icon-box', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-icon-box ds-icon-box--' + a.alignment });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Icon Box Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Icon (emoji or text)',
                            value: a.icon,
                            onChange: function (v) { props.setAttributes({ icon: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Alignment',
                            value: a.alignment,
                            options: [
                                { label: 'Center', value: 'center' },
                                { label: 'Left', value: 'left' },
                            ],
                            onChange: function (v) { props.setAttributes({ alignment: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el('div', { className: 'ds-icon-box__icon' }, a.icon),
                    el(RichText, {
                        tagName: 'h3',
                        className: 'ds-icon-box__heading',
                        value: a.heading,
                        onChange: function (v) { props.setAttributes({ heading: v }); },
                        placeholder: 'Heading',
                    }),
                    el(RichText, {
                        tagName: 'p',
                        className: 'ds-icon-box__desc',
                        value: a.description,
                        onChange: function (v) { props.setAttributes({ description: v }); },
                        placeholder: 'Short description\u2026',
                    })
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-icon-box ds-icon-box--' + a.alignment });

            return el(
                'div',
                blockProps,
                el('div', { className: 'ds-icon-box__icon', 'aria-hidden': 'true' }, a.icon),
                el(RichText.Content, { tagName: 'h3', className: 'ds-icon-box__heading', value: a.heading }),
                el(RichText.Content, { tagName: 'p', className: 'ds-icon-box__desc', value: a.description })
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
