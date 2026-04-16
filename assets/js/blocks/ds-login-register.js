/**
 * DS Login / Register — Block Editor registration.
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

    blocks.registerBlockType('developer-starter/ds-login-register', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps({ className: 'ds-login-register' });
            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'DS Login / Register Settings', initialOpen: true },
                        el(TextControl, {
                            label: 'Defaulttab',
                            value: attrs.defaultTab,
                            onChange: function (v) { props.setAttributes({ defaultTab: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Showregister',
                            checked: attrs.showRegister,
                            onChange: function (v) { props.setAttributes({ showRegister: v }); },
                        }),
                        el(TextControl, {
                            label: 'Redirecturl',
                            value: attrs.redirectUrl,
                            onChange: function (v) { props.setAttributes({ redirectUrl: v }); },
                        }),
                    )
                ),
                el('div', blockProps, el('p', null, 'DS Login / Register'))
            );
        },

        save: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps.save({ className: 'ds-login-register' });
            return el('div', blockProps, el('span', null, attrs.defaultTab));
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
