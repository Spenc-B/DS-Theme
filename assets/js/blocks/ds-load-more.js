/**
 * DS Load More — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-load-more', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-load-more' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Load More Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Posttype',
                            value: attrs.postType,
                            onChange: function (v) { props.setAttributes({ postType: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Postsperload',
                            value: attrs.postsPerLoad,
                            onChange: function (v) { props.setAttributes({ postsPerLoad: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(TextControl, {
                            label: 'Buttontext',
                            value: attrs.buttonText,
                            onChange: function (v) { props.setAttributes({ buttonText: v }); },
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
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Load More'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-load-more' });
            return el('div', blockProps, el('span', null, attrs.postType));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
