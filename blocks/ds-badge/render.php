<?php
/**
 * DS Badge — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$text    = $attributes['text'] ?? 'New';
$variant = $attributes['variant'] ?? 'primary';
$pill    = $attributes['pill'] ?? true;

$allowed_variants = [
    'primary', 'secondary', 'success', 'warning', 'danger',
    'info', 'light', 'dark',
];

if ( ! in_array( $variant, $allowed_variants, true ) ) {
    $variant = 'primary';
}

$badge_classes = [ 'badge', 'text-bg-' . $variant ];
if ( $pill ) {
    $badge_classes[] = 'rounded-pill';
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wp-block-developer-starter-ds-badge',
] );

printf(
    '<div %1$s><span class="%2$s">%3$s</span></div>',
    $wrapper_attributes,
    esc_attr( implode( ' ', $badge_classes ) ),
    esc_html( $text )
);
