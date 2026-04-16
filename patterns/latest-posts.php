<?php
/**
 * Title: Latest Posts Grid
 * Slug: developer-starter/latest-posts
 * Categories: developer-starter
 * Keywords: blog, posts, grid, cards
 */
?>
<!-- wp:group {"className":"ds-section","layout":{"type":"constrained"}} -->
<div class="wp-block-group ds-section">

<!-- wp:heading {"textAlign":"center"} -->
<h2 class="wp-block-heading has-text-align-center">Latest Posts</h2>
<!-- /wp:heading -->

<!-- wp:query {"query":{"perPage":3,"pages":0,"offset":0,"postType":"post","order":"desc","orderBy":"date"},"align":"wide","displayLayout":{"type":"grid","columns":3}} -->
<div class="wp-block-query alignwide">
<!-- wp:post-template -->
<!-- wp:group {"className":"ds-card","layout":{"type":"constrained"}} -->
<div class="wp-block-group ds-card">
<!-- wp:post-featured-image {"isLink":true,"aspectRatio":"16/10"} /-->
<!-- wp:group {"className":"ds-card__body","layout":{"type":"constrained"}} -->
<div class="wp-block-group ds-card__body">
<!-- wp:post-title {"isLink":true,"level":3,"fontSize":"large"} /-->
<!-- wp:post-date {"fontSize":"small","textColor":"muted"} /-->
<!-- wp:post-excerpt {"moreText":"Read more"} /-->
</div>
<!-- /wp:group -->
</div>
<!-- /wp:group -->
<!-- /wp:post-template -->
<!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"center"}} -->
<!-- wp:query-pagination-previous /-->
<!-- wp:query-pagination-next /-->
<!-- /wp:query-pagination -->
</div>
<!-- /wp:query -->

</div>
<!-- /wp:group -->
