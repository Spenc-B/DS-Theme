<?php
/**
 * DS Inline SVG — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => 'ds-inline-svg',
]);

printf(
    '<div %s>%s</div>',
    $wrapper_attributes,
    $content
);
