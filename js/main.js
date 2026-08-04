/* ============ Cavstruct Projects — interactions ============ */

// ---------- Scroll reveal ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealEls.forEach((el) => io.observe(el));

// ---------- Lottie icons ----------
// Each element with [data-lottie] loads its JSON and plays when it scrolls into view,
// then replays on hover of its parent card.
const lottieEls = document.querySelectorAll('[data-lottie]');
const lottieIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    lottieIO.unobserve(el);
    const anim = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: el.dataset.lottie,
    });
    const card = el.closest('.service-card, .trust-item, li') || el;
    card.addEventListener('mouseenter', () => anim.goToAndPlay(0, true));
  });
}, { threshold: 0.3 });
lottieEls.forEach((el) => lottieIO.observe(el));

// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mainNav.classList.remove('open')));

// ---------- Quote forms (Web3Forms) ----------
// TODO: replace with the real Web3Forms access key once created.
const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

document.querySelectorAll('[data-form]').forEach((form) => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = form.querySelector('[data-form-msg]');
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: 'New quote request — cavstructprojects.com.au', ...data }),
      });
      if (!res.ok) throw new Error('bad response');
      msg.className = 'form-msg ok';
      msg.textContent = 'Thanks, We will contact you soon';
      form.reset();
    } catch (err) {
      msg.className = 'form-msg err';
      msg.textContent = 'Something went wrong';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Submit';
    }
  });
});

// ---------- Wally reviews embed ----------
(() => {
  const target = document.querySelector('[data-wally-id]');
  if (!target) return;
  const id = target.dataset.wallyId;
  target.innerHTML = '<iframe src="https://widget.getwally.net/' + id + '?v=2" style="border:0;width:100%;min-height:150px;" loading="lazy" title="Customer reviews"></iframe>';
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://embed.getwally.net/embed.css';
  document.head.appendChild(css);
})();

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();
