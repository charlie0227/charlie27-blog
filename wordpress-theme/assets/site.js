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

    /* ── Reading progress bar (only on single posts) ──────────── */
    var bar = document.getElementById('reading-bar');
    if (bar && document.body.classList.contains('is-post')) {
      var updateBar = function () {
        var h = document.documentElement;
        var pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
        bar.style.width = Math.min(100, Math.max(0, pct || 0)) + '%';
      };
      window.addEventListener('scroll', updateBar, { passive: true });
      updateBar();
    } else if (bar) {
      bar.style.display = 'none';
    }

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
      if (headings.length) {
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
    }

    /* ── Search toggle ────────────────────────────────────────── */
    var searchBar   = document.getElementById('site-search');
    var searchBtn   = document.getElementById('search-btn');
    var searchClose = document.getElementById('search-close');
    function openSearch() {
      if (!searchBar) return;
      searchBar.hidden = false;
      var inp = searchBar.querySelector('input');
      if (inp) setTimeout(function () { inp.focus(); }, 10);
    }
    function closeSearch() {
      if (searchBar) searchBar.hidden = true;
    }
    if (searchBtn)   searchBtn.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);

    /* ── Mobile nav: scroll active chip into view ─────────────── */
    var mobileActive = document.querySelector('.site-nav-mobile__link.is-active');
    if (mobileActive) {
      try {
        mobileActive.scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'center' });
      } catch (e) { mobileActive.scrollIntoView(); }
    }

    /* ── ⌘K / Ctrl+K → open search, Esc → close overlays ─────── */
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') closeSearch();
    });

    /* ── Copy-link share button ───────────────────────────────── */
    document.querySelectorAll('[data-share="copy"]').forEach(function (el) {
      el.addEventListener('click', function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(window.location.href).then(function () {
          var label = el.querySelector('span') || el;
          var orig = label.textContent;
          label.textContent = '✓ Copied';
          setTimeout(function () { label.textContent = orig; }, 2000);
        }).catch(function () {});
      });
    });
    /* Twitter share */
    document.querySelectorAll('[data-share="twitter"]').forEach(function (el) {
      el.addEventListener('click', function () {
        var url = encodeURIComponent(window.location.href);
        var title = encodeURIComponent(document.title);
        window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + title, '_blank', 'noopener,width=600,height=500');
      });
    });
  });
})();
