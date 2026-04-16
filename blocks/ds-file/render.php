<?php
/**
 * DS File — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$file_url    = $attributes['fileUrl'] ?? '';
$file_name   = $attributes['fileName'] ?? '';
$file_size   = $attributes['fileSize'] ?? '';
$button_text = $attributes['buttonText'] ?? 'Download';
$show_icon   = $attributes['showIcon'] ?? true;

if ( empty( $file_url ) ) {
	return;
}

if ( empty( $file_name ) ) {
	$file_name = basename( wp_parse_url( $file_url, PHP_URL_PATH ) );
}

$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => 'card' ] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<div class="card-body d-flex align-items-center gap-3">
		<?php if ( $show_icon ) : ?>
			<span style="font-size:24px;" aria-hidden="true">&#128196;</span>
		<?php endif; ?>
		<div class="flex-grow-1">
			<div class="fw-bold"><?php echo esc_html( $file_name ); ?></div>
			<?php if ( $file_size ) : ?>
				<small class="text-muted"><?php echo esc_html( $file_size ); ?></small>
			<?php endif; ?>
		</div>
		<a href="<?php echo esc_url( $file_url ); ?>" class="btn btn-outline-primary btn-sm" download>
			<?php echo esc_html( $button_text ); ?>
		</a>
	</div>
</div>
