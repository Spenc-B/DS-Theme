<?php
/**
 * DS Divider — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (unused).
 * @var WP_Block $block      Block instance.
 */

$style      = isset( $attributes['style'] ) ? sanitize_text_field( $attributes['style'] ) : 'solid';
$label      = isset( $attributes['label'] ) ? esc_html( $attributes['label'] ) : '';
$line_color = isset( $attributes['lineColor'] ) ? sanitize_hex_color( $attributes['lineColor'] ) : '#e0e0e0';
$line_h     = isset( $attributes['lineHeight'] ) ? sanitize_text_field( $attributes['lineHeight'] ) : '1px';

$wrapper_attributes = get_block_wrapper_attributes( [
    'class'      => 'ds-divider ds-divider--' . $style,
    'aria-hidden' => 'true',
    'style'      => '--ds-divider-color:' . ( $line_color ?: '#e0e0e0' ) . ';--ds-divider-height:' . $line_h . ';',
] );

if ( $label ) {
    printf(
        '<div %s><span class="ds-divider__label">%s</span></div>',
        $wrapper_attributes,
        $label
    );
} else {
    printf( '<div %s></div>', $wrapper_attributes );
}
