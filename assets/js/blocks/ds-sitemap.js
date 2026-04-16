/**
 * DS Sitemap — Block Editor registration.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var RangeControl = components.RangeControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-sitemap', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-sitemap' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Sitemap Settings', initialOpen: true },
                        el(ToggleControl, {
                            label: 'Showhierarchy',
                            checked: attrs.showHierarchy,
                            onChange: function (v) { props.setAttributes({ showHierarchy: v }); },
                        }),
                        el(TextControl, {
                            label: 'Excludeids',
                            value: attrs.excludeIds,
                            onChange: function (v) { props.setAttributes({ excludeIds: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Sitemap'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-sitemap' });
            return el('div', blockProps, el('span', null, attrs.postTypes));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
