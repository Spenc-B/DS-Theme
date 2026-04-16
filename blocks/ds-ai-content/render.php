<?php
/**
 * DS AI Content — Server-side render.
 *
 * Displays AI-generated content placeholder. In production, this would
 * integrate with an AI API. Currently renders the prompt and any
 * previously generated content.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks content.
 * @var WP_Block $block      Block instance.
 */

$prompt            = $attributes['prompt'] ?? '';
$generated_content = $attributes['generatedContent'] ?? '';
$model             = $attributes['model'] ?? 'gpt-4';
$max_tokens        = max( 50, min( 4000, (int) ( $attributes['maxTokens'] ?? 500 ) ) );

$wrapper_attrs = get_block_wrapper_attributes();

if ( $generated_content ) {
	// Render previously generated content.
	?>
	<div <?php echo $wrapper_attrs; ?>>
		<div class="p-3">
			<?php echo wp_kses_post( $generated_content ); ?>
		</div>
	</div>
	<?php
} elseif ( $prompt ) {
	// Render placeholder with prompt info.
	?>
	<div <?php echo $wrapper_attrs; ?>>
		<div class="p-4 bg-light rounded text-center">
			<div style="font-size:24px;margin-bottom:8px;">&#129302;</div>
			<div class="fw-bold">AI Content Placeholder</div>
			<small class="text-muted">Prompt: <?php echo esc_html( mb_substr( $prompt, 0, 120 ) ); ?></small>
			<div class="mt-2"><small class="badge bg-secondary"><?php echo esc_html( $model ); ?></small></div>
		</div>
	</div>
	<?php
}
