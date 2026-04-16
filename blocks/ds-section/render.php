<?php
/**
 * DS Section — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$allowed_tags = [ 'section', 'div', 'article', 'aside', 'main' ];
$tag_name     = isset( $attributes['tagName'] ) && in_array( $attributes['tagName'], $allowed_tags, true )
    ? $attributes['tagName']
    : 'section';

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'ds-section',
] );

printf(
    '<%1$s %2$s>%3$s</%1$s>',
    $tag_name,
    $wrapper_attributes,
    $content
);
