<?php
/**
 * DS Chart — Server-side render.
 *
 * Renders a Chart.js canvas with configuration passed via data attributes.
 * Requires Chart.js to be enqueued or loaded via CDN.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$chart_type  = $attributes['chartType'] ?? 'bar';
$labels      = $attributes['labels'] ?? [ 'Item 1', 'Item 2', 'Item 3' ];
$datasets    = $attributes['datasets'] ?? [];
$height      = max( 100, min( 800, (int) ( $attributes['height'] ?? 300 ) ) );
$show_legend = $attributes['showLegend'] ?? true;

$allowed_types = [ 'bar', 'line', 'pie', 'doughnut' ];
if ( ! in_array( $chart_type, $allowed_types, true ) ) {
	$chart_type = 'bar';
}

// If no datasets provided, create a default one.
if ( empty( $datasets ) ) {
	$datasets = [
		[
			'label'           => 'Dataset',
			'data'            => array_fill( 0, count( $labels ), 0 ),
			'backgroundColor' => [ '#E17055', '#FDCB6E', '#00b894', '#0984e3', '#6c5ce7' ],
		],
	];
}

$chart_config = wp_json_encode( [
	'type'    => $chart_type,
	'data'    => [
		'labels'   => $labels,
		'datasets' => $datasets,
	],
	'options' => [
		'responsive'          => true,
		'maintainAspectRatio' => false,
		'plugins'             => [
			'legend' => [ 'display' => $show_legend ],
		],
	],
] );

$uid = wp_unique_id( 'ds-chart-' );
$wrapper_attrs = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attrs; ?>>
	<div style="height:<?php echo (int) $height; ?>px;">
		<canvas id="<?php echo esc_attr( $uid ); ?>"></canvas>
	</div>
	<script>
	(function(){
		function init() {
			if (typeof Chart === 'undefined') {
				var s = document.createElement('script');
				s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js';
				s.onload = render;
				document.head.appendChild(s);
			} else {
				render();
			}
		}
		function render() {
			var ctx = document.getElementById(<?php echo wp_json_encode( $uid ); ?>);
			if (ctx) new Chart(ctx, <?php echo $chart_config; ?>);
		}
		if (document.readyState === 'loading') {
			document.addEventListener('DOMContentLoaded', init);
		} else {
			init();
		}
	})();
	</script>
</div>
