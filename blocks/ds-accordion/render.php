<?php
/**
 * DS Accordion — Server-side render.
 *
 * Bootstrap accordion wrapper. Items rendered by ds-accordion-item.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (accordion items).
 * @var WP_Block $block      Block instance.
 */

$uid   = $attributes['uniqueId'] ?? '';
$flush = ! empty( $attributes['flush'] );

if ( ! $uid ) {
    $uid = wp_unique_id( 'acc-' );
}

$acc_classes = [ 'accordion' ];
if ( $flush ) {
    $acc_classes[] = 'accordion-flush';
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wp-block-developer-starter-ds-accordion ' . implode( ' ', $acc_classes ),
    'id'    => esc_attr( $uid ),
] );

printf(
    '<div %1$s>%2$s</div>',
    $wrapper_attributes,
    $content
);
