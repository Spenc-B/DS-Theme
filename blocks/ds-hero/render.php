<?php
/**
 * DS Hero — front-end render.
 *
 * Full-width hero section with <img> background (SEO-friendly), optional overlay div,
 * heading, subtitle, and inner CTA.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner block markup.
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$heading      = $attributes['heading'] ?? '';
$subtitle     = $attributes['subtitle'] ?? '';
$bg_url       = $attributes['backgroundImageUrl'] ?? '';
$bg_alt       = $attributes['backgroundImageAlt'] ?? '';
$show_overlay = $attributes['showOverlay'] ?? true;
$overlay      = isset( $attributes['overlayOpacity'] ) ? (int) $attributes['overlayOpacity'] : 50;
$overlay_color = $attributes['overlayColor'] ?? '#000000';
$min_height   = $attributes['minHeight'] ?? '60vh';
$alignment    = in_array( $attributes['alignment'] ?? '', array( 'left', 'center', 'right' ), true ) ? $attributes['alignment'] : 'center';

$style  = 'min-height:' . esc_attr( $min_height ) . ';';
$style .= 'display:flex;align-items:center;position:relative;overflow:hidden;';

$text_class = 'text-' . $alignment;

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'ds-hero',
	'style' => $style,
) );

$overlay_opacity = $overlay / 100;
?>
<section <?php echo $wrapper_attributes; ?>>
	<?php if ( $bg_url ) : ?>
		<img
			src="<?php echo esc_url( $bg_url ); ?>"
			alt="<?php echo esc_attr( $bg_alt ); ?>"
			loading="eager"
			fetchpriority="high"
			decoding="async"
			style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0;"
		/>
	<?php endif; ?>
	<?php if ( $show_overlay ) : ?>
		<div style="position:absolute;inset:0;background:<?php echo esc_attr( $overlay_color ); ?>;opacity:<?php echo esc_attr( $overlay_opacity ); ?>;z-index:1;pointer-events:none;" aria-hidden="true"></div>
	<?php endif; ?>
	<div class="container position-relative <?php echo esc_attr( $text_class ); ?>" style="z-index:2;color:#fff;">
		<?php if ( $heading ) : ?>
			<h1 class="display-4 fw-bold"><?php echo wp_kses_post( $heading ); ?></h1>
		<?php endif; ?>
		<?php if ( $subtitle ) : ?>
			<p class="lead"><?php echo wp_kses_post( $subtitle ); ?></p>
		<?php endif; ?>
		<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</section>
