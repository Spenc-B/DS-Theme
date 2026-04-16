<?php
/**
 * DS Mailchimp — Server-side render.
 *
 * Newsletter signup form with Bootstrap styling.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$form_action = $attributes['formAction'] ?? '';
$placeholder = $attributes['placeholder'] ?? 'Enter your email';
$button_text = $attributes['buttonText'] ?? 'Subscribe';
$layout      = ( $attributes['layout'] ?? 'inline' ) === 'stacked' ? 'stacked' : 'inline';

$wrapper_attrs = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attrs; ?>>
	<form
		<?php echo $form_action ? 'action="' . esc_url( $form_action ) . '"' : ''; ?>
		method="post"
		class="<?php echo 'inline' === $layout ? 'd-flex gap-2' : ''; ?>"
		novalidate
	>
		<input
			type="email"
			name="EMAIL"
			class="form-control<?php echo 'stacked' === $layout ? ' mb-2' : ''; ?>"
			placeholder="<?php echo esc_attr( $placeholder ); ?>"
			required
			aria-label="<?php echo esc_attr( $placeholder ); ?>"
		/>
		<button type="submit" class="btn btn-primary">
			<?php echo esc_html( $button_text ); ?>
		</button>
	</form>
</div>
