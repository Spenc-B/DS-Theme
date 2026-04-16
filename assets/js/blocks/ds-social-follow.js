/**
 * DS Social Follow - Block Editor registration.
 *
 * Social media follow links with platform URLs.
 */
(function (blocks, blockEditor, components, element) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var TextControl = components.TextControl;
    var SelectControl = components.SelectControl;

    var PLATFORMS = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'github', 'tiktok'];

    blocks.registerBlockType('developer-starter/ds-social-follow', {
        edit: function (props) {
            var a = props.attributes;
            var platforms = a.platforms || [];
            var blockProps = useBlockProps({ className: 'd-flex gap-2 flex-wrap' });

            function updatePlatform(index, key, value) {
                var updated = platforms.map(function (p, i) {
                    if (i === index) {
                        var copy = Object.assign({}, p);
                        copy[key] = value;
                        return copy;
                    }
                    return p;
                });
                props.setAttributes({ platforms: updated });
            }

            function addPlatform() {
                props.setAttributes({ platforms: platforms.concat([{ name: 'facebook', url: '' }]) });
            }

            function removePlatform(index) {
                props.setAttributes({ platforms: platforms.filter(function (_, i) { return i !== index; }) });
            }

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Social Links', initialOpen: true },
                        platforms.map(function (p, i) {
                            return el('div', { key: i, style: { marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #e0e0e0' } },
                                el(SelectControl, {
                                    label: 'Platform',
                                    value: p.name,
                                    options: PLATFORMS.map(function (n) { return { label: n.charAt(0).toUpperCase() + n.slice(1), value: n }; }),
                                    onChange: function (v) { updatePlatform(i, 'name', v); },
                                }),
                                el(TextControl, {
                                    label: 'URL',
                                    value: p.url,
                                    onChange: function (v) { updatePlatform(i, 'url', v); },
                                }),
                                el('button', {
                                    type: 'button',
                                    className: 'components-button is-destructive is-small',
                                    onClick: function () { removePlatform(i); },
                                }, 'Remove')
                            );
                        }),
                        el('button', {
                            type: 'button',
                            className: 'components-button is-secondary',
                            onClick: addPlatform,
                            style: { marginTop: '8px' },
                        }, '+ Add Platform'),
                        el(SelectControl, {
                            label: 'Size',
                            value: a.size || 'md',
                            options: [
                                { label: 'Small', value: 'sm' },
                                { label: 'Medium', value: 'md' },
                                { label: 'Large', value: 'lg' },
                            ],
                            onChange: function (v) { props.setAttributes({ size: v }); },
                        }),
                        el(SelectControl, {
                            label: 'Shape',
                            value: a.shape || 'circle',
                            options: [
                                { label: 'Circle', value: 'circle' },
                                { label: 'Rounded', value: 'rounded' },
                                { label: 'Square', value: 'square' },
                            ],
                            onChange: function (v) { props.setAttributes({ shape: v }); },
                        })
                    )
                ),
                el(
                    'div',
                    blockProps,
                    platforms.length
                        ? platforms.map(function (p, i) {
                            return el('span', {
                                key: i,
                                className: 'btn btn-outline-dark btn-' + (a.size === 'lg' ? 'lg' : a.size === 'sm' ? 'sm' : '') + (a.shape === 'circle' ? ' rounded-circle' : ''),
                                style: { minWidth: '40px', textAlign: 'center' },
                            }, p.name.charAt(0).toUpperCase());
                        })
                        : el('span', { className: 'text-muted' }, 'Add social links in sidebar')
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
