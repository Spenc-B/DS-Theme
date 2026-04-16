<?php
/**
 * DS Video — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$url          = $attributes['url'] ?? '';
$aspect_ratio = $attributes['aspectRatio'] ?? '16by9';
$autoplay     = ! empty( $attributes['autoplay'] );
$lightbox     = ! empty( $attributes['lightbox'] );
$poster_url   = $attributes['posterUrl'] ?? '';

$allowed_ratios = [ '16by9', '21by9', '4by3', '1by1' ];
if ( ! in_array( $aspect_ratio, $allowed_ratios, true ) ) {
	$aspect_ratio = '16by9';
}

if ( empty( $url ) ) {
	return;
}

// Determine embed URL.
$embed_url = '';
if ( preg_match( '/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $m ) ) {
	$embed_url = 'https://www.youtube-nocookie.com/embed/' . $m[1];
	if ( $autoplay ) {
		$embed_url .= '?autoplay=1&mute=1';
	}
} elseif ( preg_match( '/vimeo\.com\/(\d+)/', $url, $m ) ) {
	$embed_url = 'https://player.vimeo.com/video/' . $m[1];
	if ( $autoplay ) {
		$embed_url .= '?autoplay=1&muted=1';
	}
} else {
	// Direct video file.
	$embed_url = '';
}

$wrapper_attrs = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attrs; ?>>
	<div class="ratio ratio-<?php echo esc_attr( $aspect_ratio ); ?>">
		<?php if ( $embed_url ) : ?>
			<iframe
				src="<?php echo esc_url( $embed_url ); ?>"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				loading="lazy"
			></iframe>
		<?php elseif ( $url ) : ?>
			<video
				src="<?php echo esc_url( $url ); ?>"
				<?php echo $autoplay ? 'autoplay muted' : ''; ?>
				<?php echo $poster_url ? 'poster="' . esc_url( $poster_url ) . '"' : ''; ?>
				controls
				playsinline
			></video>
		<?php endif; ?>
	</div>
</div>
