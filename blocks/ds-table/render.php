<?php
/**
 * DS Table — Server-side render.
 *
 * Wraps a core/table block with Bootstrap table classes.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content (core/table).
 * @var WP_Block $block      Block instance.
 */

$striped    = ! empty( $attributes['striped'] );
$bordered   = ! empty( $attributes['bordered'] );
$hover      = ! empty( $attributes['hover'] );
$responsive = ! empty( $attributes['responsive'] );

// Build Bootstrap classes to inject into the inner table.
$table_classes = 'table';
if ( $striped )  $table_classes .= ' table-striped';
if ( $bordered ) $table_classes .= ' table-bordered';
if ( $hover )    $table_classes .= ' table-hover';

// Replace the core table's class with Bootstrap classes.
$output = $content;
$output = preg_replace(
	'/class="wp-block-table[^"]*"/',
	'class="' . esc_attr( $table_classes ) . '"',
	$output,
	1
);

$wrapper_attrs = get_block_wrapper_attributes();

if ( $responsive ) {
	echo '<div ' . $wrapper_attrs . '><div class="table-responsive">' . $output . '</div></div>';
} else {
	echo '<div ' . $wrapper_attrs . '>' . $output . '</div>';
}
