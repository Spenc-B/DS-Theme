<?php
/**
 * DS Progress — Server-side render.
 *
 * Bootstrap progress bar with optional label, variant, stripes, and animation.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$label    = $attributes['label'] ?? '';
$pct      = (int) ( $attributes['percentage'] ?? 75 );
$pct      = max( 0, min( 100, $pct ) );
$show_pct = $attributes['showPercentage'] ?? true;
$variant  = $attributes['variant'] ?? '';
$striped  = ! empty( $attributes['striped'] );
$animated = ! empty( $attributes['animated'] );
$bar_bg   = $attributes['barColor'] ?? '';
$height   = $attributes['height'] ?? '';

// Bar classes.
$bar_classes = [ 'progress-bar' ];

$allowed_variants = [ 'success', 'info', 'warning', 'danger' ];
if ( $variant && in_array( $variant, $allowed_variants, true ) ) {
    $bar_classes[] = 'bg-' . $variant;
}
if ( $striped ) {
    $bar_classes[] = 'progress-bar-striped';
}
if ( $animated ) {
    $bar_classes[] = 'progress-bar-animated';
}

// Inline styles for bar.
$bar_style = 'width:' . $pct . '%;';
if ( $bar_bg && ! $variant ) {
    $bar_style .= 'background-color:' . esc_attr( $bar_bg ) . ';';
}

// Track style.
$track_style = '';
if ( $height ) {
    $track_style = ' style="height:' . esc_attr( $height ) . ';"';
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wp-block-developer-starter-ds-progress',
] );

// Label row.
$label_html = '';
if ( $label ) {
    $pct_span   = $show_pct ? '<span>' . esc_html( $pct ) . '%</span>' : '';
    $label_html = '<div style="display:flex;justify-content:space-between;margin-bottom:4px;">'
        . '<strong>' . esc_html( $label ) . '</strong>'
        . $pct_span
        . '</div>';
}

// Percentage inside bar (only when no external label).
$bar_text = '';
if ( ! $label && $show_pct ) {
    $bar_text = esc_html( $pct ) . '%';
}

printf(
    '<div %1$s>%2$s<div class="progress" role="progressbar" aria-valuenow="%3$d" aria-valuemin="0" aria-valuemax="100"%4$s><div class="%5$s" style="%6$s">%7$s</div></div></div>',
    $wrapper_attributes,
    $label_html,
    $pct,
    $track_style,
    esc_attr( implode( ' ', $bar_classes ) ),
    esc_attr( $bar_style ),
    $bar_text
);
