/**
 * DS Icon Box — Block Editor registration.
 *
 * Icon character (emoji / dashicon text) + heading + description card.
 * Alignment (centre / left) and icon size are controlled from the sidebar.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var RichText = blockEditor.RichText;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    var ALIGNMENT_OPTIONS = [
        { label: 'Centre', value: 'center' },
        { label: 'Left', value: 'left' },
    ];

    var ICON_SIZE_OPTIONS = [
        { label: 'Small (1.5rem)', value: '1.5rem' },
        { label: 'Medium (2rem)', value: '2rem' },
        { label: 'Large (3rem)', value: '3rem' },
        { label: 'X-Large (4rem)', value: '4rem' },
    ];

    blocks.registerBlockType('developer-starter/ds-icon-box', {
        edit: function (props) {
            var a = props.attributes;
            var cls = 'ds-icon-box ds-icon-box--' + a.alignment;
            var blockProps = useBlockProps({ className: cls });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Icon', initialOpen: true },
                        el(TextControl, {
                            label: 'Icon character',
                            help: 'Paste an emoji or type any character.',
                            value: a.icon,
                            onChange: function (v) { props.setAttributes({ icon: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Icon size',
                            value: a.iconSize,
                            options: ICON_SIZE_OPTIONS,
                            onChange: function (v) { props.setAttributes({ iconSize: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Layout', initialOpen: false },
                        el(SelectControl, {
                            label: 'Alignment',
                            value: a.alignment,
                            options: ALIGNMENT_OPTIONS,
                            onChange: function (v) { props.setAttributes({ alignment: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    el(
                        'div',
                        { className: 'ds-icon-box__icon', style: { fontSize: a.iconSize }, 'aria-hidden': 'true' },
                        a.icon || '\u2B50'
                    ),
                    el(RichText, {
                        tagName: 'h3',
                        className: 'ds-icon-box__heading',
                        value: a.heading,
                        onChange: function (v) { props.setAttributes({ heading: v }); },
                        placeholder: 'Feature heading',
                    }),
                    el(RichText, {
                        tagName: 'p',
                        className: 'ds-icon-box__description',
                        value: a.description,
                        onChange: function (v) { props.setAttributes({ description: v }); },
                        placeholder: 'Describe this feature\u2026',
                    })
                )
            );
        },

        save: function (props) {
            var a = props.attributes;
            var cls = 'ds-icon-box ds-icon-box--' + a.alignment;
            var blockProps = useBlockProps.save({ className: cls });

            return el(
                'div',
                blockProps,
                el(
                    'div',
                    {
                        className: 'ds-icon-box__icon',
                        style: { fontSize: a.iconSize },
                        'aria-hidden': 'true',
                    },
                    a.icon || '\u2B50'
                ),
                el(RichText.Content, {
                    tagName: 'h3',
                    className: 'ds-icon-box__heading',
                    value: a.heading,
                }),
                el(RichText.Content, {
                    tagName: 'p',
                    className: 'ds-icon-box__description',
                    value: a.description,
                })
            );
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
