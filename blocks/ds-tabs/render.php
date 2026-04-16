<?php
/**
 * DS Tabs — front-end render.
 *
 * Builds Bootstrap 5 nav-tabs / nav-pills and tab-content panes
 * by iterating inner ds-tab-item blocks.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner block markup (unused — rendered manually).
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$unique_id = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : wp_unique_id( 'tabs-' );
$variant   = in_array( $attributes['variant'] ?? '', array( 'tabs', 'pills' ), true ) ? $attributes['variant'] : 'tabs';
$fill      = ! empty( $attributes['fill'] );
$justified = ! empty( $attributes['justified'] );

$nav_class = 'nav nav-' . $variant;
if ( $fill ) {
	$nav_class .= ' nav-fill';
}
if ( $justified ) {
	$nav_class .= ' nav-justified';
}

$nav   = '';
$panes = '';

foreach ( $block->inner_blocks as $i => $inner_block ) {
	$label   = ! empty( $inner_block->attributes['label'] ) ? $inner_block->attributes['label'] : 'Tab';
	$pane_id = ! empty( $inner_block->attributes['uniqueId'] ) ? $inner_block->attributes['uniqueId'] : wp_unique_id( 'tab-' );
	$active  = ( 0 === $i );

	// Nav item.
	$nav .= sprintf(
		'<li class="nav-item" role="presentation"><button class="nav-link%s" id="%s-btn" data-bs-toggle="tab" data-bs-target="#%s" type="button" role="tab" aria-controls="%s" aria-selected="%s">%s</button></li>',
		$active ? ' active' : '',
		esc_attr( $pane_id ),
		esc_attr( $pane_id ),
		esc_attr( $pane_id ),
		$active ? 'true' : 'false',
		esc_html( $label )
	);

	// Tab pane — render the tab-item's inner blocks.
	$inner_content = '';
	foreach ( $inner_block->inner_blocks as $child ) {
		$inner_content .= $child->render();
	}

	$panes .= sprintf(
		'<div class="tab-pane fade%s" id="%s" role="tabpanel" aria-labelledby="%s-btn">%s</div>',
		$active ? ' show active' : '',
		esc_attr( $pane_id ),
		esc_attr( $pane_id ),
		$inner_content
	);
}

$wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attributes; ?>>
	<ul class="<?php echo esc_attr( $nav_class ); ?>" id="<?php echo esc_attr( $unique_id ); ?>" role="tablist">
		<?php echo $nav; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped — escaped above. ?>
	</ul>
	<div class="tab-content">
		<?php echo $panes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</div>
