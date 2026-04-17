/**
 * DS Ajax Search — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-ajax-search', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-ajax-search' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Search Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Placeholder',
                            value: attrs.placeholder,
                            onChange: function (v) { props.setAttributes({ placeholder: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Maxresults',
                            value: attrs.maxResults,
                            onChange: function (v) { props.setAttributes({ maxResults: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(ToggleControl, {
                            label: 'Showthumbnail',
                            checked: attrs.showThumbnail,
                            onChange: function (v) { props.setAttributes({ showThumbnail: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Ajax Search'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-ajax-search' });
            return el('div', blockProps, el('span', null, attrs.placeholder));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
