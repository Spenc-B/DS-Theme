/**
 * DS Catalogue — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-catalogue', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-catalogue' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Catalogue Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Posttype',
                            value: attrs.postType,
                            onChange: function (v) { props.setAttributes({ postType: v }); },
                        }),
                        el(TextControl, {
                            label: 'Taxonomy',
                            value: attrs.taxonomy,
                            onChange: function (v) { props.setAttributes({ taxonomy: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Columns',
                            value: attrs.columns,
                            onChange: function (v) { props.setAttributes({ columns: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(RangeControl, {
                            label: 'Postsperpage',
                            value: attrs.postsPerPage,
                            onChange: function (v) { props.setAttributes({ postsPerPage: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(ToggleControl, {
                            label: 'Showfilter',
                            checked: attrs.showFilter,
                            onChange: function (v) { props.setAttributes({ showFilter: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Catalogue'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-catalogue' });
            return el('div', blockProps, el('span', null, attrs.postType));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
