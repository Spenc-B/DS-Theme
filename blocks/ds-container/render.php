<?php
/**
 * BS Container — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$container_type = $attributes['containerType'] ?? 'container';
$tag            = $attributes['tagName'] ?? 'div';

$allowed_types = [
    'container', 'container-fluid',
    'container-sm', 'container-md', 'container-lg',
    'container-xl', 'container-xxl',
];
if (! in_array($container_type, $allowed_types, true)) {
    $container_type = 'container';
}

$allowed_tags = ['div', 'section', 'article', 'main', 'aside', 'header', 'footer'];
if (! in_array($tag, $allowed_tags, true)) {
    $tag = 'div';
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => $container_type,
]);

printf(
    '<%1$s %2$s>%3$s</%1$s>',
    $tag,
    $wrapper_attributes,
    $content
);
