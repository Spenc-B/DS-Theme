<?php
/**
 * Unified Media Tools
 *
 * Media menu:
 * - Media > Unified Media Tools
 *
 * Tabs:
 * - Safe Media Optimizer
 * - Template Image Checker
 * - Content Image DB Fixer
 *
 * Features:
 * - Fills safe missing alt text for WP attachment images
 * - Adds missing width/height on front-end attachment output
 * - Adds loading="lazy" safely to non-priority attachment images
 * - Safe optimizer with very small batch processing
 * - Theme template checker for child + parent theme
 * - Content DB scanner/fixer for raw <img> tags in post_content
 *
 * Notes:
 * - Keep optimizer batch size low if EWWW or similar optimizer is active
 * - Recommended optimizer batch size: 1 to 3
 * - This code should replace earlier versions to avoid duplicate functions
 */

/* =======================================================
 * Shared helpers
 * ======================================================= */

if (!function_exists('umt_normalize_text')) {
	function umt_normalize_text($text) {
		$text = wp_strip_all_tags((string) $text);
		$text = html_entity_decode($text, ENT_QUOTES, 'UTF-8');
		$text = preg_replace('/\s+/', ' ', $text);
		return trim($text);
	}
}

if (!function_exists('umt_is_empty_value')) {
	function umt_is_empty_value($value) {
		$value = umt_normalize_text($value);
		return ($value === '' || $value === '/');
	}
}

if (!function_exists('umt_is_hash_like')) {
	function umt_is_hash_like($text) {
		$text = strtolower(umt_normalize_text($text));

		if ($text === '') {
			return false;
		}

		if (preg_match('/^[a-f0-9]{16,}$/', $text)) {
			return true;
		}

		if (preg_match('/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/', $text)) {
			return true;
		}

		if (preg_match('/^[0-9\-_]{8,}$/', $text)) {
			return true;
		}

		return false;
	}
}

if (!function_exists('umt_clean_candidate_text')) {
	function umt_clean_candidate_text($text) {
		$text = umt_normalize_text($text);

		if ($text === '') {
			return '';
		}

		$text = preg_replace('/^img[\-_ ]+/i', '', $text);
		$text = preg_replace('/^image[\-_ ]+/i', '', $text);
		$text = preg_replace('/-\d+x\d+$/', '', $text);
		$text = preg_replace('/[_\-]+/', ' ', $text);
		$text = preg_replace('/\s+/', ' ', $text);

		return trim($text);
	}
}

if (!function_exists('umt_is_meaningful_text')) {
	function umt_is_meaningful_text($text) {
		$text = umt_clean_candidate_text($text);

		if ($text === '' || $text === '/') {
			return false;
		}

		$bad = array(
			'image',
			'img',
			'photo',
			'picture',
			'graphic',
			'screenshot',
			'untitled',
			'attachment',
			'thumbnail',
			'medium',
			'large',
			'full size',
		);

		if (in_array(strtolower($text), $bad, true)) {
			return false;
		}

		if (umt_is_hash_like($text)) {
			return false;
		}

		return true;
	}
}

if (!function_exists('umt_attachment_file_basename')) {
	function umt_attachment_file_basename($attachment_id) {
		$file = get_attached_file($attachment_id);

		if (!$file) {
			return '';
		}

		$basename = wp_basename($file);
		$basename = preg_replace('/\.(jpe?g|png|gif|svg|webp|avif)$/i', '', $basename);
		$basename = preg_replace('/\.(jpe?g|png|gif|svg|webp|avif)$/i', '', $basename);

		return $basename;
	}
}

if (!function_exists('umt_filename_to_text')) {
	function umt_filename_to_text($attachment_id) {
		$filename = umt_attachment_file_basename($attachment_id);

		if ($filename === '') {
			return '';
		}

		$filename = preg_replace('/-\d+x\d+$/', '', $filename);
		$filename = preg_replace('/\b\d+\b/', ' ', $filename);
		$filename = preg_replace('/[_\-]+/', ' ', $filename);
		$filename = preg_replace('/\s+/', ' ', $filename);
		$filename = trim($filename);

		if ($filename === '') {
			return '';
		}

		$condensed = str_replace(' ', '', strtolower($filename));
		if (umt_is_hash_like($condensed)) {
			return '';
		}

		return $filename;
	}
}

if (!function_exists('umt_is_logo_like')) {
	function umt_is_logo_like($attachment_id) {
		$file = strtolower(umt_attachment_file_basename($attachment_id));
		return (strpos($file, 'logo') !== false);
	}
}

if (!function_exists('umt_is_decorative_like')) {
	function umt_is_decorative_like($attachment_id) {
		$file = strtolower(umt_attachment_file_basename($attachment_id));

		$keywords = array(
			'divider',
			'pattern',
			'background',
			'bg',
			'spacer',
			'placeholder',
			'decorative',
			'decoration',
			'shape',
			'arrow',
			'bullet',
			'separator',
			'icon',
		);

		foreach ($keywords as $keyword) {
			if (strpos($file, $keyword) !== false) {
				return true;
			}
		}

		return false;
	}
}

if (!function_exists('umt_readable_brand_from_logo')) {
	function umt_readable_brand_from_logo($attachment_id) {
		$text = umt_filename_to_text($attachment_id);

		if ($text === '') {
			$site_name = umt_normalize_text(get_bloginfo('name'));
			return $site_name ? $site_name . ' logo' : 'Site logo';
		}

		$text = preg_replace('/\blogo\b/i', '', $text);
		$text = preg_replace('/\bregistered\b/i', '', $text);
		$text = preg_replace('/\bwhite\b/i', '', $text);
		$text = preg_replace('/\bdark\b/i', '', $text);
		$text = preg_replace('/\s+/', ' ', $text);
		$text = trim($text);

		if ($text === '') {
			$site_name = umt_normalize_text(get_bloginfo('name'));
			return $site_name ? $site_name . ' logo' : 'Site logo';
		}

		return ucwords($text) . ' logo';
	}
}

if (!function_exists('umt_build_fallback_alt')) {
	function umt_build_fallback_alt($attachment_id) {
		$saved_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', true);
		$saved_alt = umt_clean_candidate_text($saved_alt);

		if (umt_is_meaningful_text($saved_alt)) {
			return $saved_alt;
		}

		$title = get_the_title($attachment_id);
		$title = umt_clean_candidate_text($title);

		if (umt_is_meaningful_text($title)) {
			return $title;
		}

		if (umt_is_logo_like($attachment_id)) {
			return umt_readable_brand_from_logo($attachment_id);
		}

		$filename_text = umt_filename_to_text($attachment_id);
		$filename_text = umt_clean_candidate_text($filename_text);

		if (umt_is_meaningful_text($filename_text)) {
			return ucwords($filename_text);
		}

		return '';
	}
}

/* =======================================================
 * Front-end attachment output hardening
 * ======================================================= */

if (!function_exists('umt_fill_dimensions')) {
	function umt_fill_dimensions($attr, $attachment_id, $size) {
		$missing_width  = empty($attr['width']);
		$missing_height = empty($attr['height']);

		if (!$missing_width && !$missing_height) {
			return $attr;
		}

		$image = wp_get_attachment_image_src($attachment_id, $size);

		if (is_array($image) && !empty($image[1]) && !empty($image[2])) {
			if ($missing_width) {
				$attr['width'] = (int) $image[1];
			}
			if ($missing_height) {
				$attr['height'] = (int) $image[2];
			}
			return $attr;
		}

		$meta = wp_get_attachment_metadata($attachment_id);
		if (is_array($meta)) {
			if ($missing_width && !empty($meta['width'])) {
				$attr['width'] = (int) $meta['width'];
			}
			if ($missing_height && !empty($meta['height'])) {
				$attr['height'] = (int) $meta['height'];
			}
		}

		return $attr;
	}
}

add_filter('wp_get_attachment_image_attributes', function ($attr, $attachment, $size) {
	if (!is_object($attachment) || empty($attachment->ID)) {
		return $attr;
	}

	$attachment_id = (int) $attachment->ID;
	$attr = umt_fill_dimensions($attr, $attachment_id, $size);

	if (empty($attr['loading'])) {
		$class = isset($attr['class']) ? strtolower((string) $attr['class']) : '';
		$is_priority = !empty($attr['fetchpriority']) && strtolower((string) $attr['fetchpriority']) === 'high';
		$is_logo     = umt_is_logo_like($attachment_id);
		$is_heroish  = preg_match('/\b(hero|banner|above-the-fold|custom-logo)\b/i', $class);

		if (!$is_priority && !$is_logo && !$is_heroish) {
			$attr['loading'] = 'lazy';
		}
	}

	$current_alt = isset($attr['alt']) ? umt_normalize_text($attr['alt']) : '';

	if (!umt_is_empty_value($current_alt) && umt_is_meaningful_text($current_alt)) {
		$attr['alt'] = umt_clean_candidate_text($current_alt);
		return $attr;
	}

	if (umt_is_decorative_like($attachment_id) && !umt_is_logo_like($attachment_id)) {
		$attr['alt'] = '';
		return $attr;
	}

	$fallback_alt = umt_build_fallback_alt($attachment_id);
	$attr['alt'] = $fallback_alt !== '' ? $fallback_alt : '';

	return $attr;
}, 20, 3);

/* =======================================================
 * Safe media optimizer
 * ======================================================= */

if (!function_exists('umt_optimize_attachment')) {
	function umt_optimize_attachment($attachment_id, $max_dimension = 1920) {
		$result = array(
			'attachment_id'    => (int) $attachment_id,
			'file'             => '',
			'alt_updated'      => false,
			'resized_original' => false,
			'metadata_updated' => false,
			'skipped'          => false,
			'errors'           => array(),
		);

		$mime = get_post_mime_type($attachment_id);
		if (strpos((string) $mime, 'image/') !== 0) {
			$result['skipped'] = true;
			return $result;
		}

		$file = get_attached_file($attachment_id);
		$result['file'] = $file;

		if (!$file || !file_exists($file)) {
			$result['errors'][] = 'Missing file';
			return $result;
		}

		$current_alt = get_post_meta($attachment_id, '_wp_attachment_image_alt', true);
		if (umt_is_empty_value($current_alt) && !umt_is_decorative_like($attachment_id)) {
			$fallback_alt = umt_build_fallback_alt($attachment_id);
			if ($fallback_alt !== '') {
				update_post_meta($attachment_id, '_wp_attachment_image_alt', $fallback_alt);
				$result['alt_updated'] = true;
			}
		}

		$info = pathinfo($file);
		$ext  = isset($info['extension']) ? strtolower($info['extension']) : '';

		if (!in_array($ext, array('jpg', 'jpeg', 'png', 'webp'), true)) {
			update_post_meta($attachment_id, '_mo_optimized_at', current_time('mysql'));
			return $result;
		}

		$size = @getimagesize($file);
		$needs_resize = false;

		if (is_array($size) && !empty($size[0]) && !empty($size[1])) {
			$width  = (int) $size[0];
			$height = (int) $size[1];
			if ($width > $max_dimension || $height > $max_dimension) {
				$needs_resize = true;
			}
		}

		if ($needs_resize) {
			$editor = wp_get_image_editor($file);

			if (is_wp_error($editor)) {
				$result['errors'][] = 'Image editor unavailable';
			} else {
				$editor->resize($max_dimension, $max_dimension, false);
				$saved = $editor->save($file);

				if (is_wp_error($saved)) {
					$result['errors'][] = 'Resize save failed';
				} else {
					$result['resized_original'] = true;
				}
			}
		}

		if (!function_exists('wp_generate_attachment_metadata')) {
			require_once ABSPATH . 'wp-admin/includes/image.php';
		}

		$new_metadata = wp_generate_attachment_metadata($attachment_id, $file);

		if (!is_wp_error($new_metadata) && is_array($new_metadata) && !empty($new_metadata)) {
			wp_update_attachment_metadata($attachment_id, $new_metadata);
			$result['metadata_updated'] = true;
		} else {
			$result['errors'][] = 'Metadata regeneration failed';
		}

		update_post_meta($attachment_id, '_mo_optimized_at', current_time('mysql'));

		return $result;
	}
}

if (!function_exists('umt_get_optimizer_candidates')) {
	function umt_get_optimizer_candidates($limit = 3, $only_unoptimized = true) {
		$args = array(
			'post_type'      => 'attachment',
			'post_status'    => 'inherit',
			'post_mime_type' => 'image',
			'posts_per_page' => max(1, (int) $limit),
			'orderby'        => 'ID',
			'order'          => 'DESC',
			'fields'         => 'ids',
		);

		if ($only_unoptimized) {
			$args['meta_query'] = array(
				array(
					'key'     => '_mo_optimized_at',
					'compare' => 'NOT EXISTS',
				),
			);
		}

		$query = new WP_Query($args);
		return !empty($query->posts) ? $query->posts : array();
	}
}

if (!function_exists('umt_run_media_optimization')) {
	function umt_run_media_optimization($limit = 3, $max_dimension = 1920, $only_unoptimized = true) {
		$summary = array(
			'processed'         => 0,
			'resized_originals' => 0,
			'alt_updated'       => 0,
			'metadata_updated'  => 0,
			'errors'            => 0,
			'items'             => array(),
		);

		$candidates = umt_get_optimizer_candidates($limit, $only_unoptimized);

		foreach ($candidates as $attachment_id) {
			$item = umt_optimize_attachment((int) $attachment_id, $max_dimension);
			$summary['items'][] = $item;
			$summary['processed']++;

			if (!empty($item['resized_original'])) {
				$summary['resized_originals']++;
			}
			if (!empty($item['alt_updated'])) {
				$summary['alt_updated']++;
			}
			if (!empty($item['metadata_updated'])) {
				$summary['metadata_updated']++;
			}
			if (!empty($item['errors'])) {
				$summary['errors'] += count($item['errors']);
			}
		}

		return $summary;
	}
}

/* =======================================================
 * Template image checker
 * ======================================================= */

if (!function_exists('umt_get_theme_directories')) {
	function umt_get_theme_directories() {
		$dirs = array();

		$child_dir  = wp_normalize_path(get_stylesheet_directory());
		$parent_dir = wp_normalize_path(get_template_directory());

		if ($child_dir && is_dir($child_dir)) {
			$dirs['child'] = $child_dir;
		}

		if ($parent_dir && is_dir($parent_dir)) {
			$dirs['parent'] = $parent_dir;
		}

		return $dirs;
	}
}

if (!function_exists('umt_get_theme_files')) {
	function umt_get_theme_files() {
		$theme_dirs = umt_get_theme_directories();
		$files = array();
		$seen  = array();

		foreach ($theme_dirs as $theme_type => $theme_dir) {
			$iterator = new RecursiveIteratorIterator(
				new RecursiveDirectoryIterator($theme_dir, RecursiveDirectoryIterator::SKIP_DOTS)
			);

			foreach ($iterator as $file) {
				if (!$file->isFile()) {
					continue;
				}

				$ext = strtolower($file->getExtension());

				if (!in_array($ext, array('php', 'html', 'htm'), true)) {
					continue;
				}

				$path = wp_normalize_path($file->getPathname());

				if (isset($seen[$path])) {
					continue;
				}

				$seen[$path] = true;

				$files[] = array(
					'theme_type' => $theme_type,
					'theme_dir'  => $theme_dir,
					'path'       => $path,
				);
			}
		}

		return $files;
	}
}

if (!function_exists('umt_scan_file_for_images')) {
	function umt_scan_file_for_images($file_path, $theme_type = '', $theme_dir = '') {
		$results = array();

		$content = @file_get_contents($file_path);
		if ($content === false || trim($content) === '') {
			return $results;
		}

		if (!preg_match_all('/<img\b[^>]*>/i', $content, $matches, PREG_OFFSET_CAPTURE)) {
			return $results;
		}

		foreach ($matches[0] as $match) {
			$img_tag = $match[0];
			$offset  = (int) $match[1];

			$before = substr($content, 0, $offset);
			$line   = substr_count($before, "\n") + 1;

			$has_alt    = preg_match('/\balt\s*=\s*("|\')[^"\']*\1/i', $img_tag);
			$has_width  = preg_match('/\bwidth\s*=\s*("|\')?\d+("|\')?/i', $img_tag);
			$has_height = preg_match('/\bheight\s*=\s*("|\')?\d+("|\')?/i', $img_tag);

			$missing = array();

			if (!$has_alt) {
				$missing[] = 'alt';
			}
			if (!$has_width) {
				$missing[] = 'width';
			}
			if (!$has_height) {
				$missing[] = 'height';
			}

			if (!empty($missing)) {
				$relative = $file_path;

				if ($theme_dir && strpos($file_path, $theme_dir) === 0) {
					$relative = ltrim(substr($file_path, strlen($theme_dir)), '/');
				}

				$results[] = array(
					'theme_type' => $theme_type,
					'file'       => $file_path,
					'relative'   => $relative,
					'line'       => $line,
					'missing'    => $missing,
					'tag'        => $img_tag,
				);
			}
		}

		return $results;
	}
}

if (!function_exists('umt_run_template_scan')) {
	function umt_run_template_scan() {
		$summary = array(
			'total_files'          => 0,
			'total_img_tags'       => 0,
			'issues_found'         => 0,
			'child_files_scanned'  => 0,
			'parent_files_scanned' => 0,
			'items'                => array(),
		);

		$files = umt_get_theme_files();
		$summary['total_files'] = count($files);

		foreach ($files as $file_info) {
			$file_path  = $file_info['path'];
			$theme_type = $file_info['theme_type'];
			$theme_dir  = $file_info['theme_dir'];

			$content = @file_get_contents($file_path);
			if ($content === false) {
				continue;
			}

			if ($theme_type === 'child') {
				$summary['child_files_scanned']++;
			} elseif ($theme_type === 'parent') {
				$summary['parent_files_scanned']++;
			}

			if (preg_match_all('/<img\b[^>]*>/i', $content, $all_imgs)) {
				$summary['total_img_tags'] += count($all_imgs[0]);
			}

			$file_results = umt_scan_file_for_images($file_path, $theme_type, $theme_dir);

			if (!empty($file_results)) {
				$summary['issues_found'] += count($file_results);
				$summary['items'] = array_merge($summary['items'], $file_results);
			}
		}

		return $summary;
	}
}

/* =======================================================
 * Content image DB fixer
 * ======================================================= */

if (!function_exists('umt_cif_supported_post_types')) {
	function umt_cif_supported_post_types() {
		$types = array('post', 'page', 'product');
		return apply_filters('umt_cif_supported_post_types', $types);
	}
}

if (!function_exists('umt_cif_get_attachment_id_from_img_tag')) {
	function umt_cif_get_attachment_id_from_img_tag($img_tag) {
		$attachment_id = 0;

		if (preg_match('/\bwp-image-(\d+)\b/i', $img_tag, $m)) {
			$attachment_id = (int) $m[1];
			if ($attachment_id > 0) {
				return $attachment_id;
			}
		}

		if (preg_match('/\bsrc\s*=\s*("|\')([^"\']+)\1/i', $img_tag, $m)) {
			$src = html_entity_decode($m[2], ENT_QUOTES, 'UTF-8');
			$attachment_id = attachment_url_to_postid($src);

			if ($attachment_id > 0) {
				return $attachment_id;
			}
		}

		return 0;
	}
}

if (!function_exists('umt_cif_get_src_from_img_tag')) {
	function umt_cif_get_src_from_img_tag($img_tag) {
		if (preg_match('/\bsrc\s*=\s*("|\')([^"\']+)\1/i', $img_tag, $m)) {
			return html_entity_decode($m[2], ENT_QUOTES, 'UTF-8');
		}
		return '';
	}
}

if (!function_exists('umt_cif_src_filename_fallback_alt')) {
	function umt_cif_src_filename_fallback_alt($src) {
		if (!$src) {
			return '';
		}

		$path = parse_url($src, PHP_URL_PATH);
		if (!$path) {
			$path = $src;
		}

		$file = wp_basename($path);
		$file = preg_replace('/\.(jpe?g|png|gif|svg|webp|avif)$/i', '', $file);
		$file = preg_replace('/\.(jpe?g|png|gif|svg|webp|avif)$/i', '', $file);
		$file = preg_replace('/-\d+x\d+$/', '', $file);
		$file = preg_replace('/\b\d+\b/', ' ', $file);
		$file = preg_replace('/[_\-]+/', ' ', $file);
		$file = preg_replace('/\s+/', ' ', $file);
		$file = trim($file);

		if ($file === '' || umt_is_hash_like(str_replace(' ', '', strtolower($file)))) {
			return '';
		}

		return ucwords($file);
	}
}

if (!function_exists('umt_cif_get_img_dimensions')) {
	function umt_cif_get_img_dimensions($attachment_id, $src = '') {
		if ($attachment_id > 0) {
			$meta = wp_get_attachment_metadata($attachment_id);

			if (!empty($meta['width']) && !empty($meta['height'])) {
				return array((int) $meta['width'], (int) $meta['height']);
			}

			$file = get_attached_file($attachment_id);
			if ($file && file_exists($file)) {
				$size = @getimagesize($file);
				if (is_array($size) && !empty($size[0]) && !empty($size[1])) {
					return array((int) $size[0], (int) $size[1]);
				}
			}
		}

		if ($src) {
			$uploads = wp_get_upload_dir();
			if (!empty($uploads['baseurl']) && !empty($uploads['basedir']) && strpos($src, $uploads['baseurl']) === 0) {
				$file = str_replace($uploads['baseurl'], $uploads['basedir'], $src);
				$file = wp_normalize_path($file);

				if (file_exists($file)) {
					$size = @getimagesize($file);
					if (is_array($size) && !empty($size[0]) && !empty($size[1])) {
						return array((int) $size[0], (int) $size[1]);
					}
				}
			}
		}

		return array(0, 0);
	}
}

if (!function_exists('umt_cif_get_alt_for_img')) {
	function umt_cif_get_alt_for_img($attachment_id, $src = '') {
		if ($attachment_id > 0) {
			if (umt_is_decorative_like($attachment_id) && !umt_is_logo_like($attachment_id)) {
				return '';
			}

			$alt = umt_build_fallback_alt($attachment_id);
			if ($alt !== '') {
				return $alt;
			}
		}

		return umt_cif_src_filename_fallback_alt($src);
	}
}

if (!function_exists('umt_cif_fix_single_img_tag')) {
	function umt_cif_fix_single_img_tag($img_tag) {
		$original = $img_tag;
		$changed  = false;

		$attachment_id = umt_cif_get_attachment_id_from_img_tag($img_tag);
		$src           = umt_cif_get_src_from_img_tag($img_tag);

		$has_alt    = preg_match('/\balt\s*=\s*("|\')[^"\']*\1/i', $img_tag);
		$has_width  = preg_match('/\bwidth\s*=\s*("|\')?\d+("|\')?/i', $img_tag);
		$has_height = preg_match('/\bheight\s*=\s*("|\')?\d+("|\')?/i', $img_tag);

		if (!$has_alt) {
			$alt = umt_cif_get_alt_for_img($attachment_id, $src);
			if ($alt !== '') {
				$img_tag = preg_replace('/<img\b/i', '<img alt="' . esc_attr($alt) . '"', $img_tag, 1);
				$changed = true;
			}
		}

		if (!$has_width || !$has_height) {
			list($width, $height) = umt_cif_get_img_dimensions($attachment_id, $src);

			if ($width > 0 && !$has_width) {
				$img_tag = preg_replace('/<img\b/i', '<img width="' . (int) $width . '"', $img_tag, 1);
				$changed = true;
			}

			if ($height > 0 && !$has_height) {
				$img_tag = preg_replace('/<img\b/i', '<img height="' . (int) $height . '"', $img_tag, 1);
				$changed = true;
			}
		}

		return array(
			'original'      => $original,
			'updated'       => $img_tag,
			'changed'       => $changed,
			'attachment_id' => $attachment_id,
			'src'           => $src,
		);
	}
}

if (!function_exists('umt_cif_scan_content_items')) {
	function umt_cif_scan_content_items($limit = 50) {
		$post_types = umt_cif_supported_post_types();

		$query = new WP_Query(array(
			'post_type'      => $post_types,
			'post_status'    => array('publish', 'draft', 'pending', 'future', 'private'),
			'posts_per_page' => max(1, min(500, (int) $limit)),
			'orderby'        => 'ID',
			'order'          => 'DESC',
			'fields'         => 'ids',
		));

		$results = array(
			'scanned_posts' => 0,
			'issues_found'  => 0,
			'items'         => array(),
		);

		foreach ($query->posts as $post_id) {
			$post = get_post($post_id);

			if (!$post || trim((string) $post->post_content) === '') {
				continue;
			}

			$results['scanned_posts']++;

			if (!preg_match_all('/<img\b[^>]*>/i', $post->post_content, $matches, PREG_OFFSET_CAPTURE)) {
				continue;
			}

			$post_items = array();

			foreach ($matches[0] as $match) {
				$img_tag = $match[0];
				$offset  = (int) $match[1];

				$has_alt    = preg_match('/\balt\s*=\s*("|\')[^"\']*\1/i', $img_tag);
				$has_width  = preg_match('/\bwidth\s*=\s*("|\')?\d+("|\')?/i', $img_tag);
				$has_height = preg_match('/\bheight\s*=\s*("|\')?\d+("|\')?/i', $img_tag);

				$missing = array();

				if (!$has_alt) {
					$missing[] = 'alt';
				}
				if (!$has_width) {
					$missing[] = 'width';
				}
				if (!$has_height) {
					$missing[] = 'height';
				}

				if (empty($missing)) {
					continue;
				}

				$fixed = umt_cif_fix_single_img_tag($img_tag);

				if (!empty($fixed['changed'])) {
					$post_items[] = array(
						'offset'        => $offset,
						'missing'       => $missing,
						'original'      => $img_tag,
						'updated'       => $fixed['updated'],
						'attachment_id' => $fixed['attachment_id'],
						'src'           => $fixed['src'],
					);
				}
			}

			if (!empty($post_items)) {
				$results['issues_found'] += count($post_items);
				$results['items'][] = array(
					'post_id'    => $post_id,
					'post_title' => get_the_title($post_id),
					'post_type'  => get_post_type($post_id),
					'items'      => $post_items,
				);
			}
		}

		update_option('umt_cif_last_scan_results', $results, false);

		return $results;
	}
}

if (!function_exists('umt_cif_apply_scan_results_to_db')) {
	function umt_cif_apply_scan_results_to_db() {
		$scan = get_option('umt_cif_last_scan_results');

		$summary = array(
			'posts_updated' => 0,
			'tags_replaced' => 0,
			'errors'        => 0,
			'items'         => array(),
		);

		if (empty($scan['items']) || !is_array($scan['items'])) {
			return $summary;
		}

		foreach ($scan['items'] as $post_item) {
			$post_id = (int) $post_item['post_id'];
			$post    = get_post($post_id);

			if (!$post) {
				$summary['errors']++;
				continue;
			}

			$content        = (string) $post->post_content;
			$replace_count  = 0;

			foreach ($post_item['items'] as $img_item) {
				$original = $img_item['original'];
				$updated  = $img_item['updated'];

				if ($original !== $updated && strpos($content, $original) !== false) {
					$content = preg_replace('/' . preg_quote($original, '/') . '/', str_replace('\\', '\\\\', $updated), $content, 1, $count);
					$replace_count += (int) $count;
				}
			}

			if ($replace_count > 0 && $content !== $post->post_content) {
				$updated = wp_update_post(array(
					'ID'           => $post_id,
					'post_content' => $content,
				), true);

				if (is_wp_error($updated)) {
					$summary['errors']++;
				} else {
					$summary['posts_updated']++;
					$summary['tags_replaced'] += $replace_count;
					$summary['items'][] = array(
						'post_id'    => $post_id,
						'post_title' => get_the_title($post_id),
						'replaced'   => $replace_count,
					);
				}
			}
		}

		return $summary;
	}
}

/* =======================================================
 * Admin page under Media
 * ======================================================= */

if (!function_exists('umt_register_admin_page')) {
	function umt_register_admin_page() {
		add_media_page(
			'Unified Media Tools',
			'Unified Media Tools',
			'upload_files',
			'umt-media-tools',
			'umt_render_admin_page'
		);
	}
}
add_action('admin_menu', 'umt_register_admin_page');

if (!function_exists('umt_get_active_tab')) {
	function umt_get_active_tab() {
		$tab = isset($_GET['tab']) ? sanitize_key($_GET['tab']) : 'optimizer';
		return in_array($tab, array('optimizer', 'checker', 'content-fixer'), true) ? $tab : 'optimizer';
	}
}

if (!function_exists('umt_render_admin_page')) {
	function umt_render_admin_page() {
		if (!current_user_can('upload_files')) {
			wp_die('You do not have permission to access this page.');
		}

		$tab = umt_get_active_tab();
		$optimizer_results = null;
		$checker_results   = null;
		$content_scan      = null;
		$content_apply     = null;
		$theme_dirs        = umt_get_theme_directories();

		if (
			isset($_POST['umt_run_optimizer']) &&
			check_admin_referer('umt_run_optimizer_action', 'umt_run_optimizer_nonce')
		) {
			$limit            = isset($_POST['umt_limit']) ? (int) $_POST['umt_limit'] : 3;
			$max_dimension    = isset($_POST['umt_max_dimension']) ? (int) $_POST['umt_max_dimension'] : 1920;
			$only_unoptimized = !empty($_POST['umt_only_unoptimized']);

			$limit         = max(1, min(10, $limit));
			$max_dimension = max(320, min(4096, $max_dimension));

			$optimizer_results = umt_run_media_optimization($limit, $max_dimension, $only_unoptimized);
			$tab = 'optimizer';
		}

		if (
			isset($_POST['umt_run_checker']) &&
			check_admin_referer('umt_run_checker_action', 'umt_run_checker_nonce')
		) {
			$checker_results = umt_run_template_scan();
			$tab = 'checker';
		}

		if (
			isset($_POST['umt_scan_content_images']) &&
			check_admin_referer('umt_scan_content_images_action', 'umt_scan_content_images_nonce')
		) {
			$limit = isset($_POST['umt_content_limit']) ? (int) $_POST['umt_content_limit'] : 50;
			$limit = max(1, min(500, $limit));

			$content_scan = umt_cif_scan_content_items($limit);
			$tab = 'content-fixer';
		}

		if (
			isset($_POST['umt_apply_content_image_fixes']) &&
			check_admin_referer('umt_apply_content_image_fixes_action', 'umt_apply_content_image_fixes_nonce')
		) {
			$content_apply = umt_cif_apply_scan_results_to_db();
			$tab = 'content-fixer';
		}

		$last_scan = get_option('umt_cif_last_scan_results');
		$page_url = admin_url('upload.php?page=umt-media-tools');
		?>
		<div class="wrap">
			<h1>Unified Media Tools</h1>

			<h2 class="nav-tab-wrapper">
				<a href="<?php echo esc_url(add_query_arg('tab', 'optimizer', $page_url)); ?>" class="nav-tab <?php echo $tab === 'optimizer' ? 'nav-tab-active' : ''; ?>">Safe Media Optimizer</a>
				<a href="<?php echo esc_url(add_query_arg('tab', 'checker', $page_url)); ?>" class="nav-tab <?php echo $tab === 'checker' ? 'nav-tab-active' : ''; ?>">Template Image Checker</a>
				<a href="<?php echo esc_url(add_query_arg('tab', 'content-fixer', $page_url)); ?>" class="nav-tab <?php echo $tab === 'content-fixer' ? 'nav-tab-active' : ''; ?>">Content Image DB Fixer</a>
			</h2>

			<?php if ($tab === 'optimizer') : ?>

				<p>Use very small batches to avoid timeout issues. With EWWW active, start with <strong>1 to 3 images per click</strong>.</p>

				<form method="post">
					<?php wp_nonce_field('umt_run_optimizer_action', 'umt_run_optimizer_nonce'); ?>

					<table class="form-table" role="presentation">
						<tr>
							<th scope="row"><label for="umt_limit">Batch size</label></th>
							<td>
								<input name="umt_limit" id="umt_limit" type="number" value="3" min="1" max="10" class="small-text" />
								<p class="description">Recommended: 1 to 3 if image optimizer plugins are active.</p>
							</td>
						</tr>
						<tr>
							<th scope="row"><label for="umt_max_dimension">Max width / height</label></th>
							<td>
								<input name="umt_max_dimension" id="umt_max_dimension" type="number" value="1920" min="320" max="4096" class="small-text" />
							</td>
						</tr>
						<tr>
							<th scope="row">Processing mode</th>
							<td>
								<label>
									<input type="checkbox" name="umt_only_unoptimized" value="1" checked="checked" />
									Process only images not yet optimized by this tool
								</label>
							</td>
						</tr>
					</table>

					<p>
						<button type="submit" name="umt_run_optimizer" class="button button-primary">Run safe optimization batch</button>
					</p>
				</form>

				<?php if ($optimizer_results !== null) : ?>
					<hr />
					<h2>Optimizer results</h2>

					<table class="widefat striped" style="max-width: 900px;">
						<tbody>
							<tr><td><strong>Processed</strong></td><td><?php echo (int) $optimizer_results['processed']; ?></td></tr>
							<tr><td><strong>Resized originals</strong></td><td><?php echo (int) $optimizer_results['resized_originals']; ?></td></tr>
							<tr><td><strong>Alt text updated</strong></td><td><?php echo (int) $optimizer_results['alt_updated']; ?></td></tr>
							<tr><td><strong>Metadata updated</strong></td><td><?php echo (int) $optimizer_results['metadata_updated']; ?></td></tr>
							<tr><td><strong>Error count</strong></td><td><?php echo (int) $optimizer_results['errors']; ?></td></tr>
						</tbody>
					</table>

					<h3 style="margin-top:24px;">Processed items</h3>
					<div style="max-height:500px; overflow:auto; border:1px solid #ccd0d4; background:#fff;">
						<table class="widefat striped">
							<thead>
								<tr>
									<th>ID</th>
									<th>File</th>
									<th>Resized</th>
									<th>Alt updated</th>
									<th>Metadata</th>
									<th>Errors</th>
								</tr>
							</thead>
							<tbody>
								<?php foreach ($optimizer_results['items'] as $item) : ?>
									<tr>
										<td><?php echo (int) $item['attachment_id']; ?></td>
										<td style="word-break: break-all;"><?php echo esc_html(basename((string) $item['file'])); ?></td>
										<td><?php echo !empty($item['resized_original']) ? 'Yes' : 'No'; ?></td>
										<td><?php echo !empty($item['alt_updated']) ? 'Yes' : 'No'; ?></td>
										<td><?php echo !empty($item['metadata_updated']) ? 'Yes' : 'No'; ?></td>
										<td style="word-break: break-word;">
											<?php echo !empty($item['errors']) ? esc_html(implode('; ', $item['errors'])) : '—'; ?>
										</td>
									</tr>
								<?php endforeach; ?>
							</tbody>
						</table>
					</div>
				<?php endif; ?>

			<?php elseif ($tab === 'checker') : ?>

				<p>This scans raw <code>&lt;img&gt;</code> tags in both child and parent theme templates and reports missing <code>alt</code>, <code>width</code>, or <code>height</code>.</p>

				<ul style="list-style:disc; margin-left:20px;">
					<?php if (!empty($theme_dirs['child'])) : ?>
						<li><strong>Child theme:</strong> <code><?php echo esc_html($theme_dirs['child']); ?></code></li>
					<?php endif; ?>
					<?php if (!empty($theme_dirs['parent'])) : ?>
						<li><strong>Parent theme:</strong> <code><?php echo esc_html($theme_dirs['parent']); ?></code></li>
					<?php endif; ?>
				</ul>

				<form method="post">
					<?php wp_nonce_field('umt_run_checker_action', 'umt_run_checker_nonce'); ?>
					<p>
						<button type="submit" name="umt_run_checker" class="button button-primary">Scan child + parent theme templates</button>
					</p>
				</form>

				<?php if ($checker_results !== null) : ?>
					<hr />
					<h2>Checker results</h2>

					<table class="widefat striped" style="max-width:950px;">
						<tbody>
							<tr><td><strong>Total files scanned</strong></td><td><?php echo (int) $checker_results['total_files']; ?></td></tr>
							<tr><td><strong>Child theme files scanned</strong></td><td><?php echo (int) $checker_results['child_files_scanned']; ?></td></tr>
							<tr><td><strong>Parent theme files scanned</strong></td><td><?php echo (int) $checker_results['parent_files_scanned']; ?></td></tr>
							<tr><td><strong>Total &lt;img&gt; tags found</strong></td><td><?php echo (int) $checker_results['total_img_tags']; ?></td></tr>
							<tr><td><strong>Issues found</strong></td><td><?php echo (int) $checker_results['issues_found']; ?></td></tr>
						</tbody>
					</table>

					<?php if (!empty($checker_results['items'])) : ?>
						<h3 style="margin-top:24px;">Template image issues</h3>
						<div style="max-height:650px; overflow:auto; border:1px solid #ccd0d4; background:#fff;">
							<table class="widefat striped">
								<thead>
									<tr>
										<th>Theme</th>
										<th>File</th>
										<th>Line</th>
										<th>Missing</th>
										<th>Tag</th>
									</tr>
								</thead>
								<tbody>
									<?php foreach ($checker_results['items'] as $item) : ?>
										<tr>
											<td><?php echo esc_html(ucfirst($item['theme_type'])); ?></td>
											<td style="word-break: break-all;"><?php echo esc_html($item['relative']); ?></td>
											<td><?php echo (int) $item['line']; ?></td>
											<td><?php echo esc_html(implode(', ', $item['missing'])); ?></td>
											<td style="word-break: break-word;"><code><?php echo esc_html($item['tag']); ?></code></td>
										</tr>
									<?php endforeach; ?>
								</tbody>
							</table>
						</div>
					<?php else : ?>
						<p><strong>No missing alt/width/height found in child or parent theme template image tags.</strong></p>
					<?php endif; ?>
				<?php endif; ?>

			<?php else : ?>

				<p>Scan post/page/product content for raw image HTML, then apply missing <code>alt</code>, <code>width</code>, and <code>height</code> back into the database.</p>

				<form method="post" style="margin-bottom:16px;">
					<?php wp_nonce_field('umt_scan_content_images_action', 'umt_scan_content_images_nonce'); ?>
					<table class="form-table" role="presentation">
						<tr>
							<th scope="row"><label for="umt_content_limit">How many content items to scan</label></th>
							<td>
								<input name="umt_content_limit" id="umt_content_limit" type="number" value="50" min="1" max="500" class="small-text" />
								<p class="description">Scans newest items first across: <?php echo esc_html(implode(', ', umt_cif_supported_post_types())); ?></p>
							</td>
						</tr>
					</table>
					<p>
						<button type="submit" name="umt_scan_content_images" class="button button-primary">Scan content</button>
					</p>
				</form>

				<?php if ($content_scan !== null) : ?>
					<table class="widefat striped" style="max-width:950px; margin-bottom:16px;">
						<tbody>
							<tr><td><strong>Scanned posts</strong></td><td><?php echo (int) $content_scan['scanned_posts']; ?></td></tr>
							<tr><td><strong>Fixable image tags found</strong></td><td><?php echo (int) $content_scan['issues_found']; ?></td></tr>
						</tbody>
					</table>
				<?php endif; ?>

				<?php if (!empty($last_scan['items'])) : ?>
					<form method="post" style="margin-bottom:20px;">
						<?php wp_nonce_field('umt_apply_content_image_fixes_action', 'umt_apply_content_image_fixes_nonce'); ?>
						<p>
							<button type="submit" name="umt_apply_content_image_fixes" class="button button-secondary">Apply fixes to DB</button>
						</p>
					</form>

					<?php if ($content_apply !== null) : ?>
						<table class="widefat striped" style="max-width:950px; margin-bottom:20px;">
							<tbody>
								<tr><td><strong>Posts updated</strong></td><td><?php echo (int) $content_apply['posts_updated']; ?></td></tr>
								<tr><td><strong>Image tags replaced</strong></td><td><?php echo (int) $content_apply['tags_replaced']; ?></td></tr>
								<tr><td><strong>Errors</strong></td><td><?php echo (int) $content_apply['errors']; ?></td></tr>
							</tbody>
						</table>
					<?php endif; ?>

					<h2>Last scan results</h2>
					<div style="max-height:650px; overflow:auto; border:1px solid #ccd0d4; background:#fff;">
						<table class="widefat striped">
							<thead>
								<tr>
									<th>Post</th>
									<th>Type</th>
									<th>Missing</th>
									<th>Original</th>
									<th>Updated</th>
								</tr>
							</thead>
							<tbody>
								<?php foreach ($last_scan['items'] as $post_item) : ?>
									<?php foreach ($post_item['items'] as $img_item) : ?>
										<tr>
											<td>
												<strong><?php echo esc_html($post_item['post_title']); ?></strong><br>
												ID: <?php echo (int) $post_item['post_id']; ?>
											</td>
											<td><?php echo esc_html($post_item['post_type']); ?></td>
											<td><?php echo esc_html(implode(', ', $img_item['missing'])); ?></td>
											<td style="word-break: break-word;"><code><?php echo esc_html($img_item['original']); ?></code></td>
											<td style="word-break: break-word;"><code><?php echo esc_html($img_item['updated']); ?></code></td>
										</tr>
									<?php endforeach; ?>
								<?php endforeach; ?>
							</tbody>
						</table>
					</div>
				<?php else : ?>
					<p>No saved scan results yet. Run a scan first.</p>
				<?php endif; ?>

			<?php endif; ?>
		</div>
		<?php
	}
}