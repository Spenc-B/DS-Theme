<?php
/**
 * DS Countdown Timer — front-end render.
 *
 * Countdown to a target date/time. Uses inline JS for live countdown.
 *
 * @var array $attributes Block attributes.
 */

defined( 'ABSPATH' ) || exit;

$target_date     = $attributes['targetDate'] ?? '';
$show_days       = $attributes['showDays'] ?? true;
$show_hours      = $attributes['showHours'] ?? true;
$show_minutes    = $attributes['showMinutes'] ?? true;
$show_seconds    = $attributes['showSeconds'] ?? true;
$expired_message = $attributes['expiredMessage'] ?? 'Event has started!';

$uid = wp_unique_id( 'ds-countdown-' );

$wrapper_attributes = get_block_wrapper_attributes( array(
	'class'               => 'text-center p-4',
	'id'                  => $uid,
	'data-target-date'    => esc_attr( $target_date ),
	'data-expired-message' => esc_attr( $expired_message ),
) );
?>
<div <?php echo $wrapper_attributes; ?>>
	<div class="d-flex justify-content-center gap-3 ds-countdown__segments">
		<?php if ( $show_days ) : ?>
			<div class="text-center">
				<div class="display-6 fw-bold ds-countdown__days">00</div>
				<div class="small text-muted">Days</div>
			</div>
		<?php endif; ?>
		<?php if ( $show_hours ) : ?>
			<div class="text-center">
				<div class="display-6 fw-bold ds-countdown__hours">00</div>
				<div class="small text-muted">Hours</div>
			</div>
		<?php endif; ?>
		<?php if ( $show_minutes ) : ?>
			<div class="text-center">
				<div class="display-6 fw-bold ds-countdown__minutes">00</div>
				<div class="small text-muted">Minutes</div>
			</div>
		<?php endif; ?>
		<?php if ( $show_seconds ) : ?>
			<div class="text-center">
				<div class="display-6 fw-bold ds-countdown__seconds">00</div>
				<div class="small text-muted">Seconds</div>
			</div>
		<?php endif; ?>
	</div>
</div>
<?php if ( $target_date ) : ?>
<script>
(function(){
	var el = document.getElementById('<?php echo esc_js( $uid ); ?>');
	if (!el) return;
	var target = new Date(el.dataset.targetDate).getTime();
	var expired = el.dataset.expiredMessage;
	function update() {
		var now = Date.now();
		var diff = target - now;
		if (diff <= 0) {
			el.querySelector('.ds-countdown__segments').innerHTML = '<div class="display-6">' + expired + '</div>';
			return;
		}
		var d = Math.floor(diff / 86400000);
		var h = Math.floor((diff % 86400000) / 3600000);
		var m = Math.floor((diff % 3600000) / 60000);
		var s = Math.floor((diff % 60000) / 1000);
		var dEl = el.querySelector('.ds-countdown__days');
		var hEl = el.querySelector('.ds-countdown__hours');
		var mEl = el.querySelector('.ds-countdown__minutes');
		var sEl = el.querySelector('.ds-countdown__seconds');
		if (dEl) dEl.textContent = String(d).padStart(2, '0');
		if (hEl) hEl.textContent = String(h).padStart(2, '0');
		if (mEl) mEl.textContent = String(m).padStart(2, '0');
		if (sEl) sEl.textContent = String(s).padStart(2, '0');
		requestAnimationFrame(update);
	}
	update();
})();
</script>
<?php endif; ?>
