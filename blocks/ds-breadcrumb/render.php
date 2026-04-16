<?php
/**
 * DS Breadcrumb — Server-side render.
 *
 * Renders a Bootstrap breadcrumb from page hierarchy (auto) or manual JSON items.
 *
 * @var array    $attributes Block attributes.
 * @var string   $content    Inner blocks HTML.
 * @var WP_Block $block      Block instance.
 */

$mode      = $attributes['mode'] ?? 'auto';
$show_home = $attributes['showHome'] ?? true;
$separator = $attributes['separator'] ?? '/';

$items = [];

if ( 'manual' === $mode ) {
    $raw = $attributes['itemsJson'] ?? '';
    if ( $raw ) {
        $decoded = json_decode( $raw, true );
        if ( is_array( $decoded ) ) {
            foreach ( $decoded as $entry ) {
                $items[] = [
                    'label' => sanitize_text_field( $entry['label'] ?? '' ),
                    'url'   => esc_url( $entry['url'] ?? '' ),
                ];
            }
        }
    }
} else {
    // Auto mode: build from current page hierarchy.
    if ( $show_home ) {
        $items[] = [ 'label' => __( 'Home', 'developer-starter' ), 'url' => home_url( '/' ) ];
    }

    if ( is_singular() ) {
        $post = get_queried_object();
        if ( $post instanceof WP_Post ) {
            // Ancestors (pages).
            $ancestors = array_reverse( get_post_ancestors( $post ) );
            foreach ( $ancestors as $ancestor_id ) {
                $items[] = [
                    'label' => get_the_title( $ancestor_id ),
                    'url'   => get_permalink( $ancestor_id ),
                ];
            }
            // Category for posts.
            if ( 'post' === $post->post_type ) {
                $cats = get_the_category( $post->ID );
                if ( ! empty( $cats ) ) {
                    $items[] = [
                        'label' => $cats[0]->name,
                        'url'   => get_category_link( $cats[0]->term_id ),
                    ];
                }
            }
            // Current page (no link).
            $items[] = [ 'label' => get_the_title( $post ), 'url' => '' ];
        }
    } elseif ( is_archive() ) {
        $title = post_type_archive_title( '', false ) ?: get_the_archive_title();
        $items[] = [ 'label' => $title, 'url' => '' ];
    } elseif ( is_search() ) {
        $items[] = [
            'label' => sprintf( __( 'Search: %s', 'developer-starter' ), get_search_query() ),
            'url'   => '',
        ];
    } elseif ( is_404() ) {
        $items[] = [ 'label' => __( '404', 'developer-starter' ), 'url' => '' ];
    }
}

if ( empty( $items ) ) {
    return;
}

$wrapper_attributes = get_block_wrapper_attributes( [
    'class' => 'wp-block-developer-starter-ds-breadcrumb',
] );

$sep_css = $separator !== '/'
    ? ' style="--bs-breadcrumb-divider:\'' . esc_attr( $separator ) . '\';"'
    : '';

$last = count( $items ) - 1;

$li_html = '';
foreach ( $items as $i => $item ) {
    $is_last = ( $i === $last );
    $classes = 'breadcrumb-item' . ( $is_last ? ' active' : '' );
    $aria    = $is_last ? ' aria-current="page"' : '';

    if ( $is_last || empty( $item['url'] ) ) {
        $li_html .= sprintf( '<li class="%s"%s>%s</li>', esc_attr( $classes ), $aria, esc_html( $item['label'] ) );
    } else {
        $li_html .= sprintf(
            '<li class="%s"><a href="%s">%s</a></li>',
            esc_attr( $classes ),
            esc_url( $item['url'] ),
            esc_html( $item['label'] )
        );
    }
}

printf(
    '<div %1$s><nav aria-label="%2$s"%3$s><ol class="breadcrumb mb-0">%4$s</ol></nav></div>',
    $wrapper_attributes,
    esc_attr__( 'Breadcrumb', 'developer-starter' ),
    $sep_css,
    $li_html
);
