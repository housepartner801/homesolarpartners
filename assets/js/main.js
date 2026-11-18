/* Home Solar Partners — small progressive enhancements. Site works without JS. */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  // Mobile navigation
  function closeNav() {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
        toggle.focus();
      }
    });
    window.matchMedia('(min-width: 1181px)').addEventListener('change', function (mq) {
      if (mq.matches) closeNav();
    });
  }

  // Header shadow once scrolled
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Highlight the nav link for the section in view
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav ul a[href^="#"]'));
  if ('IntersectionObserver' in window && links.length) {
    var map = {};
    links.forEach(function (a) {
      var el = document.querySelector(a.getAttribute('href'));
      if (el) map[el.id] = a;
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && map[entry.target.id]) {
          links.forEach(function (l) { l.removeAttribute('aria-current'); });
          map[entry.target.id].setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  // "The Sunrun Solution" video: plays muted while in view; a click turns sound on and restarts it
  var video = document.querySelector('.sunrun-video');
  var soundBtn = document.querySelector('.video-sound');
  if (video && soundBtn) {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var withSound = false;
    var wantPlay = !reduceMotion;

    var enableSound = function () {
      if (withSound) return;
      withSound = true;
      soundBtn.hidden = true;
      video.muted = false;
      video.controls = true;
      video.loop = false;
      video.currentTime = 0;
      wantPlay = true;
      var p = video.play();
      if (p && p.catch) p.catch(function () {});
    };

    if (!reduceMotion) {
      video.controls = false;
      video.loop = true;
      soundBtn.hidden = false;
      video.addEventListener('click', function () { if (!withSound) enableSound(); });
    }
    soundBtn.addEventListener('click', enableSound);
    video.addEventListener('volumechange', function () { if (!video.muted && !withSound) enableSound(); });
    video.addEventListener('ended', function () { video.loop = false; });

    // Remember whether the viewer paused it themselves, so scrolling back doesn't override them
    video.addEventListener('pause', function () { if (video.dataset.autoPaused !== '1') wantPlay = false; video.dataset.autoPaused = ''; });
    video.addEventListener('play', function () { wantPlay = true; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && wantPlay && video.paused) {
            var p = video.play();
            if (p && p.catch) p.catch(function () {});
          } else if (!entry.isIntersecting && !video.paused) {
            video.dataset.autoPaused = '1';
            video.pause();
          }
        });
      }, { threshold: 0.35 }).observe(video);
    }
  }

  // Current year in footer
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
