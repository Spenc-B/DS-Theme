<?php
/**
 * BS Row — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$classes = ['row'];

$gutter_map = [
    'gutter'    => ['g-0','g-1','g-2','g-3','g-4','g-5'],
    'gutterX'   => ['gx-0','gx-1','gx-2','gx-3','gx-4','gx-5'],
    'gutterY'   => ['gy-0','gy-1','gy-2','gy-3','gy-4','gy-5'],
];

foreach ($gutter_map as $attr => $allowed) {
    $val = $attributes[$attr] ?? '';
    if ($val && in_array($val, $allowed, true)) {
        $classes[] = $val;
    }
}

$justify_allowed = [
    'justify-content-start', 'justify-content-center', 'justify-content-end',
    'justify-content-around', 'justify-content-between', 'justify-content-evenly',
];
$justify = $attributes['justifyContent'] ?? '';
if ($justify && in_array($justify, $justify_allowed, true)) {
    $classes[] = $justify;
}

$align_allowed = [
    'align-items-start', 'align-items-center', 'align-items-end',
    'align-items-stretch', 'align-items-baseline',
];
$align = $attributes['alignItems'] ?? '';
if ($align && in_array($align, $align_allowed, true)) {
    $classes[] = $align;
}

// Row cols (responsive).
$row_cols_allowed = ['row-cols-1','row-cols-2','row-cols-3','row-cols-4','row-cols-5','row-cols-6','row-cols-auto'];
$row_cols_md_allowed = ['row-cols-md-1','row-cols-md-2','row-cols-md-3','row-cols-md-4','row-cols-md-5','row-cols-md-6','row-cols-md-auto'];
$row_cols_lg_allowed = ['row-cols-lg-1','row-cols-lg-2','row-cols-lg-3','row-cols-lg-4','row-cols-lg-5','row-cols-lg-6','row-cols-lg-auto'];

$rc = $attributes['rowCols'] ?? '';
if ($rc && in_array($rc, $row_cols_allowed, true)) {
    $classes[] = $rc;
}
$rcmd = $attributes['rowColsMd'] ?? '';
if ($rcmd && in_array($rcmd, $row_cols_md_allowed, true)) {
    $classes[] = $rcmd;
}
$rclg = $attributes['rowColsLg'] ?? '';
if ($rclg && in_array($rclg, $row_cols_lg_allowed, true)) {
    $classes[] = $rclg;
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $classes),
]);

printf('<div %s>%s</div>', $wrapper_attributes, $content);
