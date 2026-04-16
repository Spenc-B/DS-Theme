/**
 * ACF Meta — Block Editor registration.
 *
 * Displays ACF / post-meta values with link-type controls (href, mailto, tel)
 * and optional custom display text. No build step required.
 */
(function (blocks, blockEditor, components, element, serverSideRender, data) {
    var el = element.createElement;
    var InspectorControls = blockEditor.InspectorControls;
    var useBlockProps = blockEditor.useBlockProps;
    var PanelBody = components.PanelBody;
    var SelectControl = components.SelectControl;
    var TextControl = components.TextControl;
    var ToggleControl = components.ToggleControl;
    var Placeholder = components.Placeholder;
    var Spinner = components.Spinner;
    var ServerSideRender = serverSideRender;
    var useSelect = data.useSelect;

    var TAG_OPTIONS = [
        { label: 'Paragraph (p)', value: 'p' },
        { label: 'Span', value: 'span' },
        { label: 'Div', value: 'div' },
        { label: 'H1', value: 'h1' },
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
    ];

    var LINK_TYPE_OPTIONS = [
        { label: 'None (plain text)', value: 'none' },
        { label: 'Link (href)', value: 'href' },
        { label: 'Email (mailto)', value: 'mailto' },
        { label: 'Phone (tel)', value: 'tel' },
    ];

    var TARGET_OPTIONS = [
        { label: 'Same window', value: '_self' },
        { label: 'New tab', value: '_blank' },
    ];

    blocks.registerBlockType('developer-starter/acf-meta', {
        edit: function (props) {
            var attrs = props.attributes;
            var blockProps = useBlockProps();

            // Grab meta keys from the current post for the field-key dropdown.
            var postId = wp.data.select('core/editor')
                ? wp.data.select('core/editor').getCurrentPostId()
                : null;

            var metaKeys = useSelect(function (select) {
                if (!postId) return [];
                var post = select('core').getEntityRecord('postType', select('core/editor').getCurrentPostType(), postId);
                if (!post || !post.meta) return [];
                return Object.keys(post.meta);
            }, [postId]);

            // Build field key options: user can also type a custom key.
            var fieldOptions = [{ label: '— Select field —', value: '' }];
            metaKeys.forEach(function (key) {
                // Skip internal WP keys starting with _.
                if (key.charAt(0) !== '_') {
                    fieldOptions.push({ label: key, value: key });
                }
            });

            var showLinkControls = attrs.linkType !== 'none';

            // Editor preview.
            var preview;
            if (!attrs.fieldKey) {
                preview = el(
                    Placeholder,
                    { icon: 'database', label: 'ACF Meta', instructions: 'Enter a field key in the sidebar to display its value.' }
                );
            } else {
                preview = el(ServerSideRender, {
                    block: 'developer-starter/acf-meta',
                    attributes: attrs,
                });
            }

            return el(
                element.Fragment,
                null,
                el(
                    InspectorControls,
                    null,
                    el(
                        PanelBody,
                        { title: 'Field', initialOpen: true },
                        el(TextControl, {
                            label: 'Field Key',
                            help: 'ACF field name or post meta key.',
                            value: attrs.fieldKey,
                            onChange: function (v) { props.setAttributes({ fieldKey: v }); },
                        }),
                        metaKeys.length > 0 && el(SelectControl, {
                            label: 'Or pick from post meta',
                            value: attrs.fieldKey,
                            options: fieldOptions,
                            onChange: function (v) { props.setAttributes({ fieldKey: v }); },
                        }),
                        el(SelectControl, {
                            label: 'HTML Tag',
                            value: attrs.tagName,
                            options: TAG_OPTIONS,
                            onChange: function (v) { props.setAttributes({ tagName: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Link Settings', initialOpen: false },
                        el(SelectControl, {
                            label: 'Link Type',
                            value: attrs.linkType,
                            options: LINK_TYPE_OPTIONS,
                            onChange: function (v) { props.setAttributes({ linkType: v }); },
                        }),
                        showLinkControls && el(SelectControl, {
                            label: 'Target',
                            value: attrs.linkTarget,
                            options: TARGET_OPTIONS,
                            onChange: function (v) { props.setAttributes({ linkTarget: v }); },
                        })
                    ),
                    el(
                        PanelBody,
                        { title: 'Display', initialOpen: false },
                        el(TextControl, {
                            label: 'Custom Display Text',
                            help: 'Override the field value as the visible text. Leave blank to show the raw value.',
                            value: attrs.customText,
                            onChange: function (v) { props.setAttributes({ customText: v }); },
                        }),
                        el(TextControl, {
                            label: 'Prefix',
                            value: attrs.prefix,
                            onChange: function (v) { props.setAttributes({ prefix: v }); },
                        }),
                        el(TextControl, {
                            label: 'Suffix',
                            value: attrs.suffix,
                            onChange: function (v) { props.setAttributes({ suffix: v }); },
                        })
                    )
                ),
                el('div', blockProps, preview)
            );
        },

        save: function () {
            // Dynamic block — rendered server-side.
            return null;
        },
    });
})(
    window.wp.blocks,
    window.wp.blockEditor,
    window.wp.components,
    window.wp.element,
    window.wp.serverSideRender,
    window.wp.data
);
