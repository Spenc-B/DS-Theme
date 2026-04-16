<?php
/**
 * DS CTA Card — front-end render.
 *
 * Bootstrap card with heading, text, and CTA button.
 *
 * @var array $attributes Block attributes.
 */

defined( 'ABSPATH' ) || exit;

$heading     = $attributes['heading'] ?? '';
$text        = $attributes['text'] ?? '';
$button_text = $attributes['buttonText'] ?? '';
$button_url  = $attributes['buttonUrl'] ?? '#';
$variant     = $attributes['variant'] ?? 'primary';

$allowed_variants = array( 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'coral' );
if ( ! in_array( $variant, $allowed_variants, true ) ) {
	$variant = 'primary';
}
$btn_class = 'btn btn-' . ( 'coral' === $variant ? 'primary' : $variant );

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'card text-center' ) );
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="card-body p-4">
		<?php if ( $heading ) : ?>
			<h3 class="card-title"><?php echo wp_kses_post( $heading ); ?></h3>
		<?php endif; ?>
		<?php if ( $text ) : ?>
			<p class="card-text"><?php echo wp_kses_post( $text ); ?></p>
		<?php endif; ?>
		<?php if ( $button_text ) : ?>
			<a href="<?php echo esc_url( $button_url ); ?>" class="<?php echo esc_attr( $btn_class ); ?>">
				<?php echo esc_html( $button_text ); ?>
			</a>
		<?php endif; ?>
	</div>
</div>
