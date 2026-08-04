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
// Each element with [data-lottie] loads its JSON when it first scrolls into view
// and loops continuously, like the original site.
const lottieEls = document.querySelectorAll('[data-lottie]');
const lottieIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    lottieIO.unobserve(el);
    lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: el.dataset.lottie,
    });
  });
}, { threshold: 0.3 });
lottieEls.forEach((el) => lottieIO.observe(el));

// ---------- Mobile nav ----------
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  navToggle.classList.toggle('active');
});
mainNav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  mainNav.classList.remove('open');
  navToggle.classList.remove('active');
}));

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
// Official embed: the div carries data-wally-widget="<id>"; embed.js creates the
// iframe and keeps its height synced to the widget content (same as the original site).
(() => {
  if (!document.querySelector('[data-wally-widget]')) return;
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'https://embed.getwally.net/embed.css';
  document.head.appendChild(css);
  const s = document.createElement('script');
  s.src = 'https://embed.getwally.net/embed.js';
  s.async = true;
  document.body.appendChild(s);
})();

