<?php
/**
 * DS Bootstrap Div — Server-side render.
 *
 * Generic wrapper with custom Bootstrap utility classes and configurable HTML tag.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$bs_classes = $attributes['bsClasses'] ?? '';
$tag_name   = $attributes['tagName'] ?? 'div';

// Allowlist HTML tags.
$allowed_tags = [ 'div', 'section', 'article', 'aside', 'header', 'footer', 'main', 'nav', 'span' ];
if ( ! in_array( $tag_name, $allowed_tags, true ) ) {
    $tag_name = 'div';
}

$wrapper_class = 'wp-block-developer-starter-ds-bootstrap-div';
if ( $bs_classes ) {
    $wrapper_class .= ' ' . $bs_classes;
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => $wrapper_class,
] );

printf(
    '<%1$s %2$s>%3$s</%1$s>',
    $tag_name,
    $wrapper_attributes,
    $content
);
