/**
 * DS Blog Filter — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-blog-filter', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-blog-filter' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Blog Filter Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Taxonomy',
                            value: attrs.taxonomy,
                            onChange: function (v) { props.setAttributes({ taxonomy: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Postsperpage',
                            value: attrs.postsPerPage,
                            onChange: function (v) { props.setAttributes({ postsPerPage: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Layout',
                            value: attrs.layout,
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Columns',
                            value: attrs.columns,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(ToggleControl, {
                            label: 'Showall',
                            checked: attrs.showAll,
                            onChange: function (v) { props.setAttributes({ showAll: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Blog Filter'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-blog-filter' });
            return el('div', blockProps, el('span', null, attrs.taxonomy));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
