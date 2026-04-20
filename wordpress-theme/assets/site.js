/* assets/site.js — progress bar, to-top, theme toggle */
(function () {
  var progress = document.getElementById('reading-progress');
  var toTop = document.getElementById('to-top');
  var toggle = document.getElementById('theme-toggle');

  function onScroll() {
    var h = document.documentElement;
    var top = h.scrollTop || document.body.scrollTop;
    var height = h.scrollHeight - h.clientHeight;
    var pct = height > 0 ? (top / height) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
    if (toTop) toTop.classList.toggle('is-visible', top > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Theme toggle (persists to localStorage)
  var stored = localStorage.getItem('cfn-theme');
  if (stored) document.documentElement.dataset.theme = stored;
  if (toggle) toggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('cfn-theme', next);
  });
})();
