<?php
/**
 * DS Cards — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content (ds-card blocks).
 * @var WP_Block $block      Block instance.
 */

$columns = max( 1, min( 6, (int) ( $attributes['columns'] ?? 3 ) ) );
$gap     = $attributes['gap'] ?? '1.5rem';

$col_class = 'col-md-' . (int) floor( 12 / $columns );

$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'row',
	'style' => 'gap:' . esc_attr( $gap ) . ';',
] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<?php
	foreach ( $block->inner_blocks as $inner_block ) {
		echo '<div class="' . esc_attr( $col_class ) . '">';
		echo ( new WP_Block( $inner_block->parsed_block ) )->render();
		echo '</div>';
	}
	?>
</div>
