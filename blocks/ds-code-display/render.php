<?php
/**
 * DS Code Display — front-end render.
 *
 * Syntax-highlighted code block with optional line numbers and copy button.
 *
 * @var array $attributes Block attributes.
 */

defined( 'ABSPATH' ) || exit;

$code         = $attributes['code'] ?? '';
$language     = $attributes['language'] ?? 'javascript';
$line_numbers = $attributes['showLineNumbers'] ?? true;
$copy_button  = $attributes['showCopyButton'] ?? true;

// Allowlist of language classes for security.
$allowed_langs = array( 'javascript', 'html', 'css', 'php', 'python', 'json', 'bash', 'sql', 'typescript', 'plaintext' );
if ( ! in_array( $language, $allowed_langs, true ) ) {
	$language = 'plaintext';
}

$uid = wp_unique_id( 'ds-code-' );

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'ds-code-display' ) );
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="d-flex justify-content-between align-items-center px-3 py-1" style="background:#343a40;color:#adb5bd;font-size:12px;border-radius:6px 6px 0 0;">
		<span><?php echo esc_html( $language ); ?></span>
		<?php if ( $copy_button ) : ?>
			<button type="button"
					class="btn btn-sm btn-outline-light border-0"
					onclick="navigator.clipboard.writeText(document.getElementById('<?php echo esc_attr( $uid ); ?>').textContent).then(function(){this.textContent='Copied!'}.bind(this));"
					style="font-size:12px;">Copy</button>
		<?php endif; ?>
	</div>
	<pre class="mb-0" style="background:#212529;color:#f8f9fa;padding:16px;border-radius:0 0 6px 6px;overflow-x:auto;<?php echo $line_numbers ? 'counter-reset:line;' : ''; ?>"><code id="<?php echo esc_attr( $uid ); ?>" class="language-<?php echo esc_attr( $language ); ?>"><?php echo esc_html( $code ); ?></code></pre>
</div>
<?php if ( $line_numbers && $code ) : ?>
<style>
#<?php echo esc_attr( $uid ); ?> {
	counter-reset: line;
}
#<?php echo esc_attr( $uid ); ?>::before {
	content: none;
}
</style>
<?php endif; ?>
