<?php
/**
 * DS Gallery — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$images   = $attributes['images'] ?? [];
$columns  = max( 1, min( 6, (int) ( $attributes['columns'] ?? 3 ) ) );
$layout   = ( $attributes['layout'] ?? 'grid' ) === 'masonry' ? 'masonry' : 'grid';
$lightbox = ! empty( $attributes['lightbox'] );
$gap      = $attributes['gap'] ?? '0.5rem';

if ( empty( $images ) ) {
	return;
}

$wrapper_attrs = get_block_wrapper_attributes();

$grid_style = 'grid' === $layout
	? sprintf( 'display:grid;grid-template-columns:repeat(%d,1fr);gap:%s;', $columns, esc_attr( $gap ) )
	: sprintf( 'column-count:%d;column-gap:%s;', $columns, esc_attr( $gap ) );
?>
<div <?php echo $wrapper_attrs; ?>>
	<div style="<?php echo esc_attr( $grid_style ); ?>">
		<?php foreach ( $images as $img ) :
			$url = $img['url'] ?? '';
			$alt = $img['alt'] ?? '';
			if ( empty( $url ) ) continue;
		?>
			<?php if ( $lightbox ) : ?>
				<a href="<?php echo esc_url( $url ); ?>" data-bs-toggle="modal" style="<?php echo 'masonry' === $layout ? 'display:block;margin-bottom:' . esc_attr( $gap ) . ';' : ''; ?>">
					<img src="<?php echo esc_url( $url ); ?>" alt="<?php echo esc_attr( $alt ); ?>" class="img-fluid rounded" loading="lazy" />
				</a>
			<?php else : ?>
				<div style="<?php echo 'masonry' === $layout ? 'margin-bottom:' . esc_attr( $gap ) . ';' : ''; ?>">
					<img src="<?php echo esc_url( $url ); ?>" alt="<?php echo esc_attr( $alt ); ?>" class="img-fluid rounded" loading="lazy" />
				</div>
			<?php endif; ?>
		<?php endforeach; ?>
	</div>
</div>
