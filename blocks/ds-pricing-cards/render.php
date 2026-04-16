<?php
/**
 * DS Pricing Cards — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content (feature list).
 * @var WP_Block $block      Block instance.
 */

$title       = $attributes['title'] ?? 'Plan Name';
$price       = $attributes['price'] ?? '$29';
$period      = $attributes['period'] ?? '/ month';
$featured    = ! empty( $attributes['featured'] );
$button_text = $attributes['buttonText'] ?? 'Get Started';
$button_url  = $attributes['buttonUrl'] ?? '#';

$card_class = 'card text-center';
if ( $featured ) {
	$card_class .= ' border-primary';
}

$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => $card_class ] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<?php if ( $featured ) : ?>
		<div class="card-header bg-primary text-white fw-bold">Popular</div>
	<?php endif; ?>
	<div class="card-body">
		<h3 class="card-title"><?php echo esc_html( $title ); ?></h3>
		<div class="display-5 my-3">
			<span><?php echo esc_html( $price ); ?></span>
			<small class="text-muted fs-6"><?php echo esc_html( $period ); ?></small>
		</div>
		<div class="mb-3">
			<?php echo $content; ?>
		</div>
		<a href="<?php echo esc_url( $button_url ); ?>" class="btn <?php echo $featured ? 'btn-primary' : 'btn-outline-primary'; ?>">
			<?php echo esc_html( $button_text ); ?>
		</a>
	</div>
</div>
