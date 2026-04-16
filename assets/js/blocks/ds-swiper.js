/**
 * DS Swiper — Block Editor registration.
 *
 * Swiper.js carousel container. Each inner block becomes a slide on the front end.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var InnerBlocks = blockEditor.InnerBlocks;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var RangeControl = components.RangeControl;
    var ToggleControl = components.ToggleControl;
    var SelectControl = components.SelectControl;

    blocks.registerBlockType('developer-starter/ds-swiper', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-swiper-editor' });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Swiper Settings', initialOpen: true },
                        el(RangeControl, {
                            label: 'Slides per view',
                            value: attrs.slidesPerView,
                            onChange: function (v) { props.setAttributes({ slidesPerView: v }); },
                            min: 1,
                            max: 10,
                        }),
                        el(RangeControl, {
                            label: 'Space between (px)',
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
                            label: 'Navigation arrows',
                            checked: attrs.navigation,
                            onChange: function (v) { props.setAttributes({ navigation: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Pagination dots',
                            checked: attrs.pagination,
                            onChange: function (v) { props.setAttributes({ pagination: v }); },
                        })
                    )
                ),
                el('div', blockProps,
                    el('div', {
                        style: {
                            padding: '6px 10px',
                            background: '#f8f9fa',
                            borderBottom: '1px solid #dee2e6',
                            fontSize: '11px',
                            fontWeight: '600',
                            color: '#6c757d',
                            display: 'flex',
                            gap: '12px',
                            flexWrap: 'wrap',
                        },
                    },
                        el('span', null, 'Swiper'),
                        el('span', null, attrs.slidesPerView + ' per view'),
                        attrs.loop ? el('span', null, 'Loop') : null,
                        attrs.autoplay ? el('span', null, 'Autoplay') : null,
                        attrs.navigation ? el('span', null, 'Nav') : null,
                        attrs.pagination ? el('span', null, 'Dots') : null
                    ),
                    el('div', { style: { padding: '12px' } },
                        el(InnerBlocks, {
                            orientation: 'horizontal',
                        })
                    )
                )
            );
        },

        save: function () {
            return el(InnerBlocks.Content);
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
