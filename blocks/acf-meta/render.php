<?php
/**
 * ACF Meta — Server-side render.
 *
 * Reads an ACF field (or raw post meta) from the current post/page and
 * renders it. Supports link wrapping with href, mailto, or tel modes.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (unused).
 * @var WP_Block $block      Block instance.
 */

if (! defined('ABSPATH')) {
    exit;
}

$field_key = $attributes['fieldKey'] ?? '';
if ($field_key === '') {
    return; // Nothing to render.
}

// Sanitise the field key — only allow word characters, hyphens, dots.
if (! preg_match('/^[\w\-\.]+$/', $field_key)) {
    return;
}

// Determine the post ID from block context or global.
$post_id = $block->context['postId'] ?? get_the_ID();
if (! $post_id) {
    return;
}

// Try ACF first, fall back to raw post meta.
$value = '';
if (function_exists('get_field')) {
    $raw = get_field($field_key, $post_id);
    if ($raw !== null && $raw !== false) {
        // ACF link field returns an array.
        if (is_array($raw) && isset($raw['url'])) {
            $value = $raw['url'];
        } elseif (is_scalar($raw)) {
            $value = (string) $raw;
        }
    }
}

// Fallback to get_post_meta if ACF didn't return a value.
if ($value === '') {
    $meta = get_post_meta($post_id, $field_key, true);
    if (is_scalar($meta)) {
        $value = (string) $meta;
    }
}

if ($value === '') {
    return; // No value found.
}

$tag       = $attributes['tagName'] ?? 'p';
$link_type = $attributes['linkType'] ?? 'none';
$target    = $attributes['linkTarget'] ?? '_self';
$custom    = $attributes['customText'] ?? '';
$prefix    = $attributes['prefix'] ?? '';
$suffix    = $attributes['suffix'] ?? '';

// Allowed HTML tags.
$allowed_tags = ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
if (! in_array($tag, $allowed_tags, true)) {
    $tag = 'p';
}

$allowed_targets = ['_self', '_blank'];
if (! in_array($target, $allowed_targets, true)) {
    $target = '_self';
}

// Build display text.
$display = $custom !== '' ? esc_html($custom) : esc_html($value);
$display = esc_html($prefix) . $display . esc_html($suffix);

// Build link if needed.
$inner = $display;
if ($link_type !== 'none' && $value !== '') {
    switch ($link_type) {
        case 'mailto':
            $href = 'mailto:' . sanitize_email($value);
            break;
        case 'tel':
            // Strip everything except digits, +, -, (, ), and spaces for the href.
            $href = 'tel:' . preg_replace('/[^\d\+\-\(\)\s]/', '', $value);
            break;
        case 'href':
        default:
            $href = esc_url($value);
            break;
    }

    $rel   = $target === '_blank' ? ' rel="noopener noreferrer"' : '';
    $inner = sprintf(
        '<a href="%s" target="%s"%s>%s</a>',
        $href,
        esc_attr($target),
        $rel,
        $display
    );
}

$wrapper_attributes = get_block_wrapper_attributes();

printf(
    '<%1$s %2$s>%3$s</%1$s>',
    $tag,
    $wrapper_attributes,
    $inner
);
