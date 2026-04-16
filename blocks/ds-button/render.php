<?php
/**
 * DS Button — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$text    = $attributes['text'] ?? 'Button';
$url     = $attributes['url'] ?? '#';
$variant = $attributes['variant'] ?? 'primary';
$size    = $attributes['size'] ?? '';
$full    = ! empty( $attributes['fullWidth'] );
$new_tab = ! empty( $attributes['openInNewTab'] );
$align   = $attributes['align'] ?? '';
$bg      = $attributes['backgroundColor'] ?? '';
$color   = $attributes['textColor'] ?? '';
$radius  = $attributes['borderRadius'] ?? '';

// Build Bootstrap button classes with allowlist.
$allowed_variants = [
    'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark',
    'outline-primary', 'outline-secondary', 'outline-success', 'outline-danger',
    'outline-warning', 'outline-info', 'outline-light', 'outline-dark',
];

if ( ! in_array( $variant, $allowed_variants, true ) ) {
    $variant = 'primary';
}

$btn_classes = [ 'btn', 'btn-' . $variant ];

$allowed_sizes = [ 'sm', 'lg' ];
if ( $size && in_array( $size, $allowed_sizes, true ) ) {
    $btn_classes[] = 'btn-' . $size;
}

if ( $full ) {
    $btn_classes[] = 'w-100';
}

// Inline styles for custom colours / radius.
$inline = '';
if ( $bg ) {
    $inline .= 'background:' . esc_attr( $bg ) . ';border-color:' . esc_attr( $bg ) . ';';
}
if ( $color ) {
    $inline .= 'color:' . esc_attr( $color ) . ';';
}
if ( $radius ) {
    $inline .= 'border-radius:' . esc_attr( $radius ) . ';';
}

// Wrapper alignment.
$wrapper_class = 'wp-block-developer-starter-ds-button';
if ( $align ) {
    $allowed_aligns = [ 'start', 'center', 'end' ];
    if ( in_array( $align, $allowed_aligns, true ) ) {
        $wrapper_class .= ' text-' . $align;
    }
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => $wrapper_class,
] );

$tag = 'a';
$href_attr = ' href="' . esc_url( $url ) . '"';
$rel_attr  = $new_tab ? ' target="_blank" rel="noopener noreferrer"' : '';
$role_attr = ( $url === '#' || $url === '' ) ? ' role="button"' : '';

printf(
    '<div %1$s><%2$s%3$s class="%4$s"%5$s%6$s%7$s>%8$s</%2$s></div>',
    $wrapper_attributes,
    $tag,
    $href_attr,
    esc_attr( implode( ' ', $btn_classes ) ),
    $inline ? ' style="' . $inline . '"' : '',
    $rel_attr,
    $role_attr,
    wp_kses_post( $text )
);
