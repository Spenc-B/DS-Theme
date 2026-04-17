/**
 * DS Social Feeds — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-social-feeds', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-social-feeds' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Social Feeds Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Platform',
                            value: attrs.platform,
                            onChange: function (v) { props.setAttributes({ platform: v }); },
                        }),
                        el(TextControl, {
                            label: 'Embedurl',
                            value: attrs.embedUrl,
                            onChange: function (v) { props.setAttributes({ embedUrl: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Postscount',
                            value: attrs.postsCount,
                            onChange: function (v) { props.setAttributes({ postsCount: v }); },
                            min: 0,
                            max: 100,
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
                el('div', blockProps, el('p', null, 'DS Social Feeds'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-social-feeds' });
            return el('div', blockProps, el('span', null, attrs.platform));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
