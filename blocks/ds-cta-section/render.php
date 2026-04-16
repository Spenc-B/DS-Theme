<?php
/**
 * DS CTA Section — front-end render.
 *
 * Full-width call-to-action banner with heading, subtitle, and button.
 *
 * @var array $attributes Block attributes.
 */

defined( 'ABSPATH' ) || exit;

$heading     = $attributes['heading'] ?? '';
$subtitle    = $attributes['subtitle'] ?? '';
$button_text = $attributes['buttonText'] ?? '';
$button_url  = $attributes['buttonUrl'] ?? '#';
$alignment   = in_array( $attributes['alignment'] ?? '', array( 'left', 'center', 'right' ), true ) ? $attributes['alignment'] : 'center';

$text_class = 'text-' . $alignment;

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'py-5' ) );
?>
<section <?php echo $wrapper_attributes; ?>>
	<div class="container <?php echo esc_attr( $text_class ); ?>">
		<?php if ( $heading ) : ?>
			<h2 class="display-5 fw-bold mb-3"><?php echo wp_kses_post( $heading ); ?></h2>
		<?php endif; ?>
		<?php if ( $subtitle ) : ?>
			<p class="lead mb-4"><?php echo wp_kses_post( $subtitle ); ?></p>
		<?php endif; ?>
		<?php if ( $button_text ) : ?>
			<a href="<?php echo esc_url( $button_url ); ?>" class="btn btn-primary btn-lg">
				<?php echo esc_html( $button_text ); ?>
			</a>
		<?php endif; ?>
	</div>
</section>
