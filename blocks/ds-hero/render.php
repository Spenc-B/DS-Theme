<?php
/**
 * DS Hero — front-end render.
 *
 * Full-width hero section with background image, overlay, heading, subtitle, and inner CTA.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner block markup.
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$heading     = $attributes['heading'] ?? '';
$subtitle    = $attributes['subtitle'] ?? '';
$bg_url      = $attributes['backgroundImageUrl'] ?? '';
$overlay     = isset( $attributes['overlayOpacity'] ) ? (int) $attributes['overlayOpacity'] : 50;
$min_height  = $attributes['minHeight'] ?? '60vh';
$alignment   = in_array( $attributes['alignment'] ?? '', array( 'left', 'center', 'right' ), true ) ? $attributes['alignment'] : 'center';

$style  = 'min-height:' . esc_attr( $min_height ) . ';';
$style .= 'background-size:cover;background-position:center;';
$style .= 'display:flex;align-items:center;position:relative;';

if ( $bg_url ) {
	$style .= 'background-image:url(' . esc_url( $bg_url ) . ');';
}

$text_class = 'text-' . $alignment;

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'ds-hero',
	'style' => $style,
) );

$overlay_opacity = $overlay / 100;
?>
<section <?php echo $wrapper_attributes; ?>>
	<div style="position:absolute;inset:0;background:rgba(0,0,0,<?php echo esc_attr( $overlay_opacity ); ?>);pointer-events:none;"></div>
	<div class="container position-relative <?php echo esc_attr( $text_class ); ?>" style="z-index:1;color:#fff;">
		<?php if ( $heading ) : ?>
			<h1 class="display-4 fw-bold"><?php echo wp_kses_post( $heading ); ?></h1>
		<?php endif; ?>
		<?php if ( $subtitle ) : ?>
			<p class="lead"><?php echo wp_kses_post( $subtitle ); ?></p>
		<?php endif; ?>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</section>
