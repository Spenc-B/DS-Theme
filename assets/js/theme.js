/**
 * Developer Starter – theme.js
 * Lightweight utility scripts.
 */
(function () {
  'use strict';

  /* ── Sticky header scroll class ────────────────────── */
  const header = document.querySelector('.ds-site-header');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Dark mode toggle ──────────────────────────────── */
  document.addEventListener('click', function (e) {
    const toggle = e.target.closest('[data-ds-dark-toggle]');
    if (!toggle) return;

    const isDark = document.documentElement.classList.toggle('is-dark-theme');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

    try {
      localStorage.setItem('dsThemeMode', isDark ? 'dark' : 'light');
    } catch (err) { /* storage unavailable */ }
  });

  /* ── Smooth scroll for anchor links ────────────────── */
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var id = link.getAttribute('href');
    if (!id || id === '#') return;

    var target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
})();
