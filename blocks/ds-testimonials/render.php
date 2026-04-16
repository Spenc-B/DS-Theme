<?php
/**
 * DS Testimonials — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$quote       = $attributes['quote'] ?? '';
$author_name = $attributes['authorName'] ?? '';
$author_role = $attributes['authorRole'] ?? '';
$image_url   = $attributes['imageUrl'] ?? '';
$rating      = max( 0, min( 5, (int) ( $attributes['rating'] ?? 5 ) ) );

$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => 'card p-4' ] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<?php if ( $rating > 0 ) : ?>
		<div class="mb-3">
			<?php for ( $i = 0; $i < 5; $i++ ) : ?>
				<span style="color:<?php echo $i < $rating ? '#FDCB6E' : '#dee2e6'; ?>;font-size:20px;">&#9733;</span>
			<?php endfor; ?>
		</div>
	<?php endif; ?>

	<?php if ( $quote ) : ?>
		<blockquote class="blockquote mb-3"><?php echo wp_kses_post( $quote ); ?></blockquote>
	<?php endif; ?>

	<div class="d-flex align-items-center gap-3 mt-3">
		<?php if ( $image_url ) : ?>
			<img
				src="<?php echo esc_url( $image_url ); ?>"
				alt="<?php echo esc_attr( $author_name ); ?>"
				style="width:48px;height:48px;border-radius:50%;object-fit:cover;"
				loading="lazy"
			/>
		<?php endif; ?>
		<div>
			<?php if ( $author_name ) : ?>
				<div class="fw-bold"><?php echo esc_html( $author_name ); ?></div>
			<?php endif; ?>
			<?php if ( $author_role ) : ?>
				<div class="text-muted small"><?php echo esc_html( $author_role ); ?></div>
			<?php endif; ?>
		</div>
	</div>
</div>
