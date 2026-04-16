<?php
/**
 * BS Column — Server-side render.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$classes = [];

// Column spans — each breakpoint.
$col_map = [
    'colDefault' => 'col',
    'colSm'      => 'col-sm',
    'colMd'      => 'col-md',
    'colLg'      => 'col-lg',
    'colXl'      => 'col-xl',
    'colXxl'     => 'col-xxl',
];

foreach ($col_map as $attr => $prefix) {
    $val = $attributes[$attr] ?? '';
    if ($val === '') {
        continue;
    }
    if ($val === 'auto') {
        $classes[] = $prefix . '-auto';
    } elseif ($val === 'equal') {
        $classes[] = $prefix;
    } elseif (is_numeric($val) && (int) $val >= 1 && (int) $val <= 12) {
        $classes[] = $prefix . '-' . (int) $val;
    }
}

// Fallback if nothing set.
if (empty($classes)) {
    $classes[] = 'col';
}

// Offsets.
$offset_map = [
    'offsetDefault' => 'offset',
    'offsetMd'      => 'offset-md',
    'offsetLg'      => 'offset-lg',
];

foreach ($offset_map as $attr => $prefix) {
    $val = $attributes[$attr] ?? '';
    if ($val !== '' && is_numeric($val) && (int) $val >= 0 && (int) $val <= 11) {
        $classes[] = $prefix . '-' . (int) $val;
    }
}

// Order.
$order_map = [
    'orderDefault' => 'order',
    'orderMd'      => 'order-md',
    'orderLg'      => 'order-lg',
];

$order_specials = ['first', 'last'];

foreach ($order_map as $attr => $prefix) {
    $val = $attributes[$attr] ?? '';
    if ($val === '') {
        continue;
    }
    if (in_array($val, $order_specials, true)) {
        $classes[] = $prefix . '-' . $val;
    } elseif (is_numeric($val) && (int) $val >= 0 && (int) $val <= 5) {
        $classes[] = $prefix . '-' . (int) $val;
    }
}

// Align-self.
$align_self_allowed = [
    'align-self-start', 'align-self-center', 'align-self-end',
    'align-self-stretch', 'align-self-baseline',
];
$align_self = $attributes['alignSelf'] ?? '';
if ($align_self && in_array($align_self, $align_self_allowed, true)) {
    $classes[] = $align_self;
}

$wrapper_attributes = get_block_wrapper_attributes([
    'class' => implode(' ', $classes),
]);

printf('<div %s>%s</div>', $wrapper_attributes, $content);
