/**
 * DS Events — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-events', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-events' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Events Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Layout',
                            value: attrs.layout,
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showpastevents',
                            checked: attrs.showPastEvents,
                            onChange: function (v) { props.setAttributes({ showPastEvents: v }); },
                        }),
                        el(RangeControl, {
                            label: 'Postsperpage',
                            value: attrs.postsPerPage,
                            onChange: function (v) { props.setAttributes({ postsPerPage: v }); },
                            min: 0,
                            max: 100,
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Events'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-events' });
            return el('div', blockProps, el('span', null, attrs.layout));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
