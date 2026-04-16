/**
 * DS Contact Links - Block Editor registration.
 *
 * Contact information display with phone, email, and address.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;
    var ToggleControl = components.ToggleControl;

    blocks.registerBlockType('developer-starter/ds-contact-links', {
        edit: function (props) {
            var a = props.attributes;
            var blockProps = useBlockProps({ className: 'list-group' });

            var items = [];
            if (a.phone) items.push({ icon: '\u260E', label: a.phone });
            if (a.email) items.push({ icon: '\u2709', label: a.email });
            if (a.address) items.push({ icon: '\uD83D\uDCCD', label: a.address });

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Contact Info', initialOpen: true },
                        el(TextControl, {
                            label: 'Phone',
                            value: a.phone,
                            onChange: function (v) { props.setAttributes({ phone: v }); },
                        }),
                        el(TextControl, {
                            label: 'Email',
                            value: a.email,
                            onChange: function (v) { props.setAttributes({ email: v }); },
                        }),
                        el(TextControl, {
                            label: 'Address',
                            value: a.address,
                            onChange: function (v) { props.setAttributes({ address: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Layout',
                            value: a.layout || 'vertical',
                            options: [
                                { label: 'Vertical', value: 'vertical' },
                                { label: 'Horizontal', value: 'horizontal' },
                            ],
                            onChange: function (v) { props.setAttributes({ layout: v }); },
                        }),
                        el(ToggleControl, {
                            label: 'Show icons',
                            checked: a.showIcons !== false,
                            onChange: function (v) { props.setAttributes({ showIcons: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    items.length
                        ? items.map(function (item, i) {
                            return el('div', {
                                key: i,
                                className: 'list-group-item',
                            }, a.showIcons !== false ? (item.icon + ' ') : '', item.label);
                        })
                        : el('div', { className: 'list-group-item text-muted' }, 'Add contact info in sidebar')
                )
            );
        },

        save: function () {
            return null;
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element
);
