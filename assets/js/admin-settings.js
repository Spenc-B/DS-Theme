/**
 * Developer Starter – Admin Settings
 *
 * Handles conditional field visibility and component toggle controls.
 */
(function () {
    'use strict';

    var OPTION = 'ds_theme_settings';

    function initConditionals() {
        document.querySelectorAll('.ds-conditional[data-depends]').forEach(function (row) {
            var key      = row.dataset.depends;
            var checkbox = document.querySelector(
                'input[name="' + OPTION + '[' + key + ']"]'
            );

            if (!checkbox) return;

            function toggle() {
                row.classList.toggle('is-hidden', !checkbox.checked);
            }

            toggle();
            checkbox.addEventListener('change', toggle);
        });
    }

    function initComponentToggles() {
        var selectAll  = document.querySelector('.ds-comp-select-all');
        var selectNone = document.querySelector('.ds-comp-select-none');

        if (selectAll) {
            selectAll.addEventListener('click', function () {
                document.querySelectorAll('.ds-comp-item input[type="checkbox"]').forEach(function (cb) {
                    cb.checked = true;
                });
            });
        }

        if (selectNone) {
            selectNone.addEventListener('click', function () {
                document.querySelectorAll('.ds-comp-item input[type="checkbox"]').forEach(function (cb) {
                    cb.checked = false;
                });
            });
        }

        document.querySelectorAll('.ds-comp-group__toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var group  = this.closest('.ds-comp-group');
                var isNone = this.classList.contains('ds-comp-group__toggle--none');
                group.querySelectorAll('.ds-comp-item input[type="checkbox"]').forEach(function (cb) {
                    cb.checked = !isNone;
                });
            });
        });
    }

    function init() {
        initConditionals();
        initComponentToggles();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
