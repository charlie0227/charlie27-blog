/* Charlie's Field Notes — site.js */
(function () {
  var html = document.documentElement;

  /* ── Dark mode: apply before paint to avoid flash ─────────────── */
  var saved = localStorage.getItem('cfn-theme');
  var prefersDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
  html.setAttribute('data-theme', saved || (prefersDark ? 'dark' : 'light'));

  document.addEventListener('DOMContentLoaded', function () {

    /* ── Theme toggle ─────────────────────────────────────────── */
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.addEventListener('click', function () {
        var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        localStorage.setItem('cfn-theme', next);
      });
    }

    /* ── Reading progress bar ─────────────────────────────────── */
    var bar = document.getElementById('reading-bar');
    function updateBar() {
      if (!bar) return;
      var h = document.documentElement;
      var pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      bar.style.width = Math.min(100, pct || 0) + '%';
    }
    window.addEventListener('scroll', updateBar, { passive: true });

    /* ── Scroll-to-top ────────────────────────────────────────── */
    var top = document.getElementById('to-top');
    if (top) {
      window.addEventListener('scroll', function () {
        top.classList.toggle('visible', window.scrollY > 500);
      }, { passive: true });
      top.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ── TOC active highlight (IntersectionObserver) ──────────── */
    var tocLinks = document.querySelectorAll('.post-toc a');
    if (tocLinks.length) {
      var headings = Array.from(document.querySelectorAll('.post-body h2[id]'));
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            var id = e.target.getAttribute('id');
            tocLinks.forEach(function (a) {
              a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { rootMargin: '-15% 0px -70% 0px' });
      headings.forEach(function (h) { observer.observe(h); });
    }

    /* ── ⌘K / Ctrl+K → focus search ──────────────────────────── */
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        var s = document.querySelector('input[type="search"]');
        if (s) s.focus();
        else window.location.href = '/?s=';
      }
    });

    /* ── Copy-link share button ───────────────────────────────── */
    document.querySelectorAll('[data-share="copy"]').forEach(function (el) {
      el.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          var orig = el.textContent;
          el.textContent = '✓ Copied';
          setTimeout(function () { el.textContent = orig; }, 2000);
        });
      });
    });
  });
})();
