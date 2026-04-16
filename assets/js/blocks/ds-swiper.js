/**
 * DS Swiper — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-swiper', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-swiper' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Swiper Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Slidesperview',
                            value: attrs.slidesPerView,
                            onChange: function (v) { props.setAttributes({ slidesPerView: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(RangeControl, {
                            label: 'Spacebetween',
                            value: attrs.spaceBetween,
                            onChange: function (v) { props.setAttributes({ spaceBetween: v }); },
                            min: 0,
                            max: 100,
                        }),
                        el(ToggleControl, {
                            label: 'Loop',
                            checked: attrs.loop,
                            onChange: function (v) { props.setAttributes({ loop: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Autoplay',
                            checked: attrs.autoplay,
                            onChange: function (v) { props.setAttributes({ autoplay: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Navigation',
                            checked: attrs.navigation,
                            onChange: function (v) { props.setAttributes({ navigation: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Pagination',
                            checked: attrs.pagination,
                            onChange: function (v) { props.setAttributes({ pagination: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el(InnerBlocks))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-swiper' });
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
