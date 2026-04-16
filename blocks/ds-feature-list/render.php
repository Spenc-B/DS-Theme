<?php
/**
 * DS Feature List — front-end render.
 *
 * Icon feature list with configurable icon and column layout.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner block markup.
 * @var WP_Block $block      Block instance.
 */

defined( 'ABSPATH' ) || exit;

$icon    = $attributes['icon'] ?? '✓';
$columns = max( 1, min( 4, (int) ( $attributes['columns'] ?? 1 ) ) );

$style = '';
if ( $columns > 1 ) {
	$style = 'column-count:' . $columns . ';column-gap:2rem;';
}

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class' => 'ds-feature-list',
	'style' => $style,
	'data-icon' => $icon,
) );
?>
<div <?php echo $wrapper_attributes; ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
</div>
<style>
.ds-feature-list p::before {
	content: attr(data-icon) " ";
	display: inline;
}
.ds-feature-list[data-icon] p::before {
	content: "<?php echo esc_attr( $icon ); ?> ";
}
</style>
