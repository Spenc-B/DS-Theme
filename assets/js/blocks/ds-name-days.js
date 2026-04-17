/**
 * DS Name Days — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-name-days', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-name-days' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Name Days Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Country',
                            value: attrs.country,
                            onChange: function (v) { props.setAttributes({ country: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showdate',
                            checked: attrs.showDate,
                            onChange: function (v) { props.setAttributes({ showDate: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Name Days'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-name-days' });
            return el('div', blockProps, el('span', null, attrs.country));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
