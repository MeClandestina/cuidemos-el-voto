/* ============================================================
   Cuidemos el Voto — interactions (rev)
   ============================================================ */
(function () {
  'use strict';

  var ELECTION = new Date(2026, 5, 21); // 21 jun 2026 (month 0-indexed)

  /* ---------- days countdown ---------- */
  function daysToElection() {
    var now = new Date();
    var diff = ELECTION - now;
    return Math.max(0, Math.ceil(diff / 86400000));
  }
  function setText(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  var d = daysToElection();
  setText('countdown', d);
  setText('daysLeft', d);

  /* ---------- live ticking countdown ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function tickClock() {
    var diff = ELECTION - new Date();
    if (diff < 0) diff = 0;
    var s = Math.floor(diff / 1000);
    var days = Math.floor(s / 86400);
    var hrs = Math.floor((s % 86400) / 3600);
    var mins = Math.floor((s % 3600) / 60);
    var secs = s % 60;
    setText('cdD', pad(days));
    setText('cdH', pad(hrs));
    setText('cdM', pad(mins));
    setText('cdS', pad(secs));
  }
  if (document.getElementById('cdClock')) {
    tickClock();
    setInterval(tickClock, 1000);
  }

  /* ---------- number formatting (Colombian: 1.000.000) ---------- */
  function formatCO(n) {
    return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  /* ---------- count-up animation ---------- */
  function animateCount(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var target = parseFloat(el.dataset.count || '0');
    var prefix = el.dataset.prefix || '';
    var suffix = el.dataset.suffix || '';
    var big = target >= 1000;             // format with thousands separators (Colombian dots)
    var dur = 1400, start = null;
    function ease(t) { return 1 - Math.pow(1 - t, 3); }
    function tick(ts) {
      if (start === null) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var val = target * ease(p);
      el.textContent = prefix + (big ? formatCO(val) : Math.round(val)) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + (big ? formatCO(target) : target) + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- intersection observer: reveals + counters ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target;
      if (el.classList.contains('reveal')) el.classList.add('in');
      if (el.hasAttribute('data-count')) animateCount(el);
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal, [data-count]').forEach(function (el) { io.observe(el); });

  /* fallback: if reduced motion, reveal immediately */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
    document.querySelectorAll('[data-count]').forEach(animateCount);
  }

  /* ---------- copy to clipboard ---------- */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var val = btn.getAttribute('data-copy') || '';
      var done = function () {
        var old = btn.textContent;
        btn.textContent = 'Copiado ✓';
        btn.classList.add('copied');
        setTimeout(function () { btn.textContent = old; btn.classList.remove('copied'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(done).catch(done);
      } else { done(); }
    });
  });

  /* ---------- mobile nav ---------- */
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  if (burger) {
    burger.addEventListener('click', function () { nav.classList.toggle('open'); });
    document.querySelectorAll('#navLinks a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  /* ---------- placeholder links: gentle notice ---------- */
  ['pdfBtn', 'sheetBtn', 'formBtn', 'igLink', 'waLink', 'igFoot', 'waFoot', 'igDonar', 'igForm', 'driveBtn'].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function (e) {
      if (el.getAttribute('href') === '#') {
        e.preventDefault();
        el.setAttribute('data-was', el.dataset.was || '');
      }
    });
  });
})();
