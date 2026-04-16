/**
 * DS List Group — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var ToggleControl = components.ToggleControl;

    blocks.registerBlockType('developer-starter/ds-list-group', {
        edit: function (props) {
            var attrs = props.attributes;

            var listClass = 'list-group'
                + (attrs.flush ? ' list-group-flush' : '')
                + (attrs.horizontal ? ' list-group-horizontal' : '')
                + (attrs.numbered ? ' list-group-numbered' : '');

            var tag = attrs.numbered ? 'ol' : 'ul';

            var blockProps = useBlockProps({ className: 'ds-list-group-editor' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'List Group Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Flush (no outer borders)',
                            checked: !!attrs.flush,
                            onChange: function (v) { props.setAttributes({ flush: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Horizontal layout',
                            checked: !!attrs.horizontal,
                            onChange: function (v) { props.setAttributes({ horizontal: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Numbered',
                            checked: !!attrs.numbered,
                            onChange: function (v) { props.setAttributes({ numbered: v }); },
                        })
                    )
                ),
                el('div', blockProps,
                    el(tag, { className: listClass },
                        el(InnerBlocks, {
                            allowedBlocks: true,
                            template: [
                                ['core/paragraph', { placeholder: 'List item…', className: 'list-group-item' }],
                            ],
                        })
                    )
                )
            );
        },

        save: function () {
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
