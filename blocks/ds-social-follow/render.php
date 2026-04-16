<?php
/**
 * DS Social Follow — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$platforms = $attributes['platforms'] ?? [];
$size      = $attributes['size'] ?? 'md';
$shape     = $attributes['shape'] ?? 'circle';

if ( empty( $platforms ) ) {
	return;
}

$allowed_sizes  = [ 'sm', 'md', 'lg' ];
$allowed_shapes = [ 'circle', 'rounded', 'square' ];
if ( ! in_array( $size, $allowed_sizes, true ) )   $size  = 'md';
if ( ! in_array( $shape, $allowed_shapes, true ) )  $shape = 'circle';

$platform_colors = [
	'facebook'  => '#1877F2',
	'twitter'   => '#1DA1F2',
	'instagram' => '#E4405F',
	'linkedin'  => '#0A66C2',
	'youtube'   => '#FF0000',
	'github'    => '#333',
	'tiktok'    => '#000',
];

$btn_size_class = '';
if ( 'sm' === $size ) $btn_size_class = ' btn-sm';
if ( 'lg' === $size ) $btn_size_class = ' btn-lg';

$shape_class = '';
if ( 'circle' === $shape )  $shape_class = ' rounded-circle';
if ( 'rounded' === $shape ) $shape_class = ' rounded-3';

$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => 'd-flex gap-2 flex-wrap' ] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<?php foreach ( $platforms as $p ) :
		$name  = $p['name'] ?? 'link';
		$url   = $p['url'] ?? '#';
		$color = $platform_colors[ $name ] ?? '#6c757d';
		$label = ucfirst( $name );
	?>
		<a
			href="<?php echo esc_url( $url ); ?>"
			class="btn<?php echo esc_attr( $btn_size_class . $shape_class ); ?>"
			style="background:<?php echo esc_attr( $color ); ?>;color:#fff;min-width:40px;text-align:center;"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="<?php echo esc_attr( 'Follow on ' . $label ); ?>"
		>
			<?php echo esc_html( mb_strtoupper( mb_substr( $name, 0, 1 ) ) ); ?>
		</a>
	<?php endforeach; ?>
</div>
