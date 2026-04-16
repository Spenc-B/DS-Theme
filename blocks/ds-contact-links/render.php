<?php
/**
 * DS Contact Links — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$phone      = $attributes['phone'] ?? '';
$email      = $attributes['email'] ?? '';
$address    = $attributes['address'] ?? '';
$layout     = ( $attributes['layout'] ?? 'vertical' ) === 'horizontal' ? 'horizontal' : 'vertical';
$show_icons = $attributes['showIcons'] ?? true;

$items = [];
if ( $phone ) {
	$items[] = [
		'icon'  => '&#9742;',
		'label' => $phone,
		'href'  => 'tel:' . preg_replace( '/[^0-9+]/', '', $phone ),
	];
}
if ( $email ) {
	$items[] = [
		'icon'  => '&#9993;',
		'label' => $email,
		'href'  => 'mailto:' . sanitize_email( $email ),
	];
}
if ( $address ) {
	$items[] = [
		'icon'  => '&#128205;',
		'label' => $address,
		'href'  => 'https://maps.google.com/?q=' . rawurlencode( $address ),
	];
}

if ( empty( $items ) ) {
	return;
}

$list_class = 'list-group';
if ( 'horizontal' === $layout ) {
	$list_class .= ' list-group-horizontal-md';
}

$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => $list_class ] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<?php foreach ( $items as $item ) : ?>
		<a href="<?php echo esc_url( $item['href'] ); ?>" class="list-group-item list-group-item-action d-flex align-items-center gap-2">
			<?php if ( $show_icons ) : ?>
				<span aria-hidden="true"><?php echo $item['icon']; ?></span>
			<?php endif; ?>
			<span><?php echo esc_html( $item['label'] ); ?></span>
		</a>
	<?php endforeach; ?>
</div>
