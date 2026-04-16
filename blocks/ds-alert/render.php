<?php
/**
 * DS Alert — Server-side render.
 *
 * Bootstrap alert with type variants and dismiss button.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$type        = $attributes['type'] ?? 'info';
$dismissible = ! empty( $attributes['dismissible'] );

$allowed_types = [ 'info', 'success', 'warning', 'danger', 'primary', 'secondary', 'light', 'dark' ];
if ( ! in_array( $type, $allowed_types, true ) ) {
	$type = 'info';
}

$cls = 'alert alert-' . $type;
if ( $dismissible ) {
	$cls .= ' alert-dismissible fade show';
}

$icons = [
	'info'      => '&#8505;&#65039;',
	'success'   => '&#9989;',
	'warning'   => '&#9888;&#65039;',
	'danger'    => '&#10060;',
	'primary'   => '&#9670;',
	'secondary' => '&#9671;',
	'light'     => '&#9675;',
	'dark'      => '&#9679;',
];

$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => $cls,
	'role'  => 'alert',
] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<span class="me-2" aria-hidden="true"><?php echo $icons[ $type ] ?? $icons['info']; ?></span>
	<?php echo $content; ?>
	<?php if ( $dismissible ) : ?>
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
	<?php endif; ?>
</div>
