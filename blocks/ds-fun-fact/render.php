<?php
/**
 * DS Fun Fact — front-end render.
 *
 * Big statistic number with optional prefix/suffix and label.
 *
 * @var array $attributes Block attributes.
 */

defined( 'ABSPATH' ) || exit;

$number = $attributes['number'] ?? '';
$label  = $attributes['label'] ?? '';
$prefix = $attributes['prefix'] ?? '';
$suffix = $attributes['suffix'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'text-center p-4' ) );
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="display-3 fw-bold">
		<?php if ( $prefix ) : ?>
			<span class="ds-counter__prefix"><?php echo esc_html( $prefix ); ?></span>
		<?php endif; ?>
		<span class="ds-counter__number"><?php echo wp_kses_post( $number ); ?></span>
		<?php if ( $suffix ) : ?>
			<span class="ds-counter__suffix"><?php echo esc_html( $suffix ); ?></span>
		<?php endif; ?>
	</div>
	<?php if ( $label ) : ?>
		<div class="lead mt-2"><?php echo wp_kses_post( $label ); ?></div>
	<?php endif; ?>
</div>
