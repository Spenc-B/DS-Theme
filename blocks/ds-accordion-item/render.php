<?php
/**
 * DS Accordion Item — front-end render.
 *
 * Bootstrap 5 accordion-item with collapse behaviour.
 * Receives parent context: ds-accordion/uniqueId, ds-accordion/alwaysOpen.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner block markup.
 * @var WP_Block $block      Block instance (provides context).
 */

defined( 'ABSPATH' ) || exit;

$title       = ! empty( $attributes['title'] ) ? $attributes['title'] : 'Accordion Item';
$default_open = ! empty( $attributes['defaultOpen'] );
$item_id     = ! empty( $attributes['uniqueId'] ) ? $attributes['uniqueId'] : wp_unique_id( 'acc-item-' );
$parent_id   = $block->context['ds-accordion/uniqueId'] ?? '';
$always_open = ! empty( $block->context['ds-accordion/alwaysOpen'] );

$collapse_id  = 'collapse-' . esc_attr( $item_id );
$btn_class    = 'accordion-button' . ( $default_open ? '' : ' collapsed' );
$collapse_cls = 'accordion-collapse collapse' . ( $default_open ? ' show' : '' );

$parent_attr = '';
if ( ! $always_open && $parent_id ) {
	$parent_attr = ' data-bs-parent="#' . esc_attr( $parent_id ) . '"';
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'accordion-item' ) );
?>
<div <?php echo $wrapper_attributes; ?>>
	<h2 class="accordion-header">
		<button class="<?php echo esc_attr( $btn_class ); ?>"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#<?php echo esc_attr( $collapse_id ); ?>"
				aria-expanded="<?php echo $default_open ? 'true' : 'false'; ?>"
				aria-controls="<?php echo esc_attr( $collapse_id ); ?>">
			<?php echo wp_kses_post( $title ); ?>
		</button>
	</h2>
	<div id="<?php echo esc_attr( $collapse_id ); ?>"
		 class="<?php echo esc_attr( $collapse_cls ); ?>"
		 <?php echo $parent_attr; ?>>
		<div class="accordion-body">
			<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		</div>
	</div>
</div>
