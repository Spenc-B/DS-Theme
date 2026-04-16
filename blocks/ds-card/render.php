<?php
/**
 * DS Card — Server-side render.
 *
 * Bootstrap card with optional image, header, footer, title, body content, and CTA button.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (card body content).
 * @var WP_Block $block      Block instance.
 */

$title          = $attributes['title'] ?? '';
$image_url      = $attributes['imageUrl'] ?? '';
$button_text    = $attributes['buttonText'] ?? '';
$button_url     = $attributes['buttonUrl'] ?? '';
$button_variant = $attributes['buttonVariant'] ?? 'primary';
$header_text    = $attributes['headerText'] ?? '';
$footer_text    = $attributes['footerText'] ?? '';

$allowed_btn = [
    'primary', 'secondary', 'success', 'danger', 'warning',
    'info', 'light', 'dark', 'link',
];
if ( ! in_array( $button_variant, $allowed_btn, true ) ) {
    $button_variant = 'primary';
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wp-block-developer-starter-ds-card card',
] );

$html = '<div ' . $wrapper_attributes . '>';

// Header.
if ( $header_text ) {
    $html .= '<div class="card-header">' . esc_html( $header_text ) . '</div>';
}

// Image.
if ( $image_url ) {
    $html .= '<img src="' . esc_url( $image_url ) . '" class="card-img-top" alt="" loading="lazy">';
}

// Body.
$html .= '<div class="card-body">';

if ( $title ) {
    $html .= '<h5 class="card-title">' . wp_kses_post( $title ) . '</h5>';
}

if ( $content ) {
    $html .= '<div class="card-text">' . $content . '</div>';
}

if ( $button_text ) {
    $html .= '<a href="' . esc_url( $button_url ?: '#' ) . '" class="btn btn-' . esc_attr( $button_variant ) . '">'
        . wp_kses_post( $button_text ) . '</a>';
}

$html .= '</div>';

// Footer.
if ( $footer_text ) {
    $html .= '<div class="card-footer text-body-secondary">' . esc_html( $footer_text ) . '</div>';
}

$html .= '</div>';

echo $html;
