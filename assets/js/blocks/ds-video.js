/**
 * DS Video — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-video', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-video' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Video Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Url',
                            value: attrs.url,
                            onChange: function (v) { props.setAttributes({ url: v }); },
                        }),
                        el(TextControl, {
                            label: 'Aspectratio',
                            value: attrs.aspectRatio,
                            onChange: function (v) { props.setAttributes({ aspectRatio: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Autoplay',
                            checked: attrs.autoplay,
                            onChange: function (v) { props.setAttributes({ autoplay: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Lightbox',
                            checked: attrs.lightbox,
                            onChange: function (v) { props.setAttributes({ lightbox: v }); },
                        }),
                        el(TextControl, {
                            label: 'Posterurl',
                            value: attrs.posterUrl,
                            onChange: function (v) { props.setAttributes({ posterUrl: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Posterid',
                            value: attrs.posterId,
                            onChange: function (v) { props.setAttributes({ posterId: v }); },
                            min: 0,
                            max: 100,
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Video'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-video' });
            return el('div', blockProps, el('span', null, attrs.url));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
