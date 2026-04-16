<?php
/**
 * DS List Group — Server-side render.
 *
 * Wraps InnerBlocks content in a Bootstrap list-group.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML (list items).
 * @var WP_Block $block      Block instance.
 */

$flush      = ! empty( $attributes['flush'] );
$horizontal = ! empty( $attributes['horizontal'] );
$numbered   = ! empty( $attributes['numbered'] );

$list_classes = [ 'list-group' ];
if ( $flush ) {
    $list_classes[] = 'list-group-flush';
}
if ( $horizontal ) {
    $list_classes[] = 'list-group-horizontal';
}
if ( $numbered ) {
    $list_classes[] = 'list-group-numbered';
}

$tag = $numbered ? 'ol' : 'ul';

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wp-block-developer-starter-ds-list-group',
] );

printf(
    '<div %1$s><%2$s class="%3$s">%4$s</%2$s></div>',
    $wrapper_attributes,
    $tag,
    esc_attr( implode( ' ', $list_classes ) ),
    $content
);
