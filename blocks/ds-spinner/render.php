<?php
/**
 * DS Spinner — Server-side render.
 *
 * Bootstrap spinner with variant (border/grow), colour, and size options.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$variant = $attributes['variant'] ?? 'border';
$color   = $attributes['color'] ?? 'primary';
$size    = $attributes['size'] ?? '';
$label   = $attributes['label'] ?? 'Loading...';

$allowed_variants = [ 'border', 'grow' ];
if ( ! in_array( $variant, $allowed_variants, true ) ) {
    $variant = 'border';
}

$allowed_colors = [ 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark' ];
if ( ! in_array( $color, $allowed_colors, true ) ) {
    $color = 'primary';
}

$spinner_classes = [ 'spinner-' . $variant, 'text-' . $color ];

if ( 'sm' === $size ) {
    $spinner_classes[] = 'spinner-' . $variant . '-sm';
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wp-block-developer-starter-ds-spinner',
] );

printf(
    '<div %1$s><div class="%2$s" role="status"><span class="visually-hidden">%3$s</span></div></div>',
    $wrapper_attributes,
    esc_attr( implode( ' ', $spinner_classes ) ),
    esc_html( $label )
);
