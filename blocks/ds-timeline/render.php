<?php
/**
 * DS Timeline — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content (InnerBlocks).
 * @var WP_Block $block      Block instance.
 */

$line_color = $attributes['lineColor'] ?? '#E17055';

$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'ds-timeline',
	'style' => 'border-left:3px solid ' . esc_attr( $line_color ) . ';padding-left:20px;',
] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<?php echo $content; ?>
</div>
