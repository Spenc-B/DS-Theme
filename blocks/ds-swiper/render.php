<?php
/**
 * DS Swiper — Server-side render.
 *
 * Outputs a Swiper.js carousel. Each inner block becomes a swiper-slide.
 * Swiper CSS/JS loaded once from CDN via wp_enqueue.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

/* ── Enqueue Swiper assets (once per page) ──────────── */
$swiper_version = '11.2.6';
$swiper_cdn     = 'https://cdn.jsdelivr.net/npm/swiper@' . $swiper_version;

if ( ! wp_style_is( 'swiper-css', 'enqueued' ) ) {
    wp_enqueue_style( 'swiper-css', $swiper_cdn . '/swiper-bundle.min.css', [], $swiper_version );
}
if ( ! wp_script_is( 'swiper-js', 'enqueued' ) ) {
    wp_enqueue_script( 'swiper-js', $swiper_cdn . '/swiper-bundle.min.js', [], $swiper_version, true );
}

/* ── Build configuration ────────────────────────────── */
$slides_per_view = (int) ( $attributes['slidesPerView'] ?? 1 );
$space_between   = (int) ( $attributes['spaceBetween']  ?? 30 );
$loop            = ! empty( $attributes['loop'] );
$autoplay        = ! empty( $attributes['autoplay'] );
$navigation      = ! empty( $attributes['navigation'] );
$pagination      = ! empty( $attributes['pagination'] );

$uid = 'swiper-' . wp_unique_id();

$config = [
    'slidesPerView' => $slides_per_view,
    'spaceBetween'  => $space_between,
];

if ( $loop )      $config['loop'] = true;
if ( $autoplay )  $config['autoplay'] = [ 'delay' => 5000, 'disableOnInteraction' => false ];
if ( $navigation ) $config['navigation'] = [ 'nextEl' => '#' . $uid . ' .swiper-button-next', 'prevEl' => '#' . $uid . ' .swiper-button-prev' ];
if ( $pagination ) $config['pagination'] = [ 'el' => '#' . $uid . ' .swiper-pagination', 'clickable' => true ];

/* ── Wrap each inner block in a swiper-slide ────────── */
$slides_html = '';
if ( ! empty( $block->inner_blocks ) ) {
    foreach ( $block->inner_blocks as $inner_block ) {
        $slides_html .= '<div class="swiper-slide">' . ( new WP_Block( $inner_block->parsed_block ) )->render() . '</div>';
    }
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'ds-swiper',
    'id'    => $uid,
] );
?>
<div <?php echo $wrapper_attributes; ?>>
    <div class="swiper">
        <div class="swiper-wrapper">
            <?php echo $slides_html; ?>
        </div>
        <?php if ( $pagination ) : ?>
            <div class="swiper-pagination"></div>
        <?php endif; ?>
        <?php if ( $navigation ) : ?>
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        <?php endif; ?>
    </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', function () {
    if (typeof Swiper === 'undefined') return;
    new Swiper('#<?php echo esc_js( $uid ); ?> .swiper', <?php echo wp_json_encode( $config ); ?>);
});
</script>
