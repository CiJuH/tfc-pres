let current = 0;
const total = 15;

function goTo(next, dir) {
  if (next < 0 || next >= total) return;
  const slides = document.querySelectorAll('.slide');
  slides[current].classList.remove('active');
  slides[current].classList.add(dir === 1 ? 'exit-left' : 'exit-right');
  setTimeout(() => slides[current].classList.remove('exit-left', 'exit-right'), 350);
  current = next;
  slides[current].classList.add('active');
  updateNav();
}

function updateNav() {
  document.getElementById('counter').textContent = `${current + 1} / ${total}`;
  document.getElementById('progressFill').style.width = `${((current + 1) / total) * 100}%`;
  document.getElementById('prevBtn').disabled = current === 0;
  document.getElementById('nextBtn').disabled = current === total - 1;
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.slide')[0].classList.add('active');
  updateNav();
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') { e.preventDefault(); goTo(current + 1, 1); }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); goTo(current - 1, -1); }
});

function checkFrame(iframe) {
  try {
    const doc = iframe.contentDocument || iframe.contentWindow.document;
    if (!doc || doc.URL === 'about:blank') showFallback();
  } catch(e) {
    showFallback();
  }
}

function showFallback() {
  document.getElementById('landing-frame').style.display = 'none';
  document.getElementById('landing-fallback').style.display = 'block';
}

setTimeout(() => {
  const f = document.getElementById('landing-frame');
  if (f) checkFrame(f);
}, 3000);
