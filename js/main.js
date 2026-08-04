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
const WEB3FORMS_KEY = '9bb2bba2-0733-48ac-af91-88b7e3a45543';

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

// ---------- Google reviews marquee (native, self-hosted) ----------
const REVIEWS = [
  {
    name: 'Mary', avatar: 'assets/images/reviews/mary.jpg', date: 'Oct 20, 2025',
    text: "Ben from Cavstruct is an absolute gem. He recently built a new deck and laser lite roof for me, and I couldn't be happier with the result, it looks amazing and is built to last. I've had Ben do both small jobs and now this bigger project, over the time I've known him. He's been reliable, hardworking, and a total pleasure to deal with.",
    url: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25WNFkyaG1XRUkzZUc5RFIwbFBhQzAyTUhGdFpVRRAB!2m1!1s0x0:0x4af8e180431525e1!3m1!1s2@1:CAIQACodChtycF9oOnV4Y2hmWEI3eG9DR0lPaC02MHFtZUE%7C0',
  },
  {
    name: 'Rob K', avatar: 'assets/images/reviews/rob-k.jpg', date: 'Oct 5, 2025',
    text: 'Hired Ben to build us a new decking, the whole process was very pleasant and professional! Discussed options he also came up with some new ideas , deck was built beautifully very solid and neat ! Extremely happy with Ben',
    url: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT21aQ2IyWXRhbGQyTXpreU1HNUNZMmhhY0RKa2NHYxAB!2m1!1s0x0:0x4af8e180431525e1!3m1!1s2@1:CAIQACodChtycF9oOmZCb2Ytald2MzkyMG5CY2hacDJkcGc%7C0',
  },
  {
    name: 'Brendan', avatar: 'assets/images/reviews/brendan.jpg', date: 'Oct 5, 2025',
    text: '',
    url: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2tad2FWUTFPVkpXWVd4amNHUXpjREpJVm05U1ozYxAB!2m1!1s0x0:0x4af8e180431525e1!3m1!1s2@1:CAIQACodChtycF9oOkZwaVQ1OVJWYWxjcGQzcDJIVm9SZ3c%7C0',
  },
  {
    name: 'Modtech Joinery', avatar: 'assets/images/reviews/modtech-joinery.jpg', date: 'Oct 5, 2025',
    text: 'We have had Ben out on a few of our jobs to remove and replace windows, walls and other items to create the space we need to install new kitchens for our clients his quality craftsmanship is second to none',
    url: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25CNUxYTk5YM0p6UTFjM1gxRlBlSFJIVDBONFpGRRAB!2m1!1s0x0:0x4af8e180431525e1!3m1!1s2@1:CAIQACodChtycF9oOnB5LXNNX3JzQ1c3X1FPeHRHT0N4ZFE%7C0',
  },
  {
    name: 'Jake Paterson', avatar: 'assets/images/reviews/jake-paterson.jpg', date: 'Oct 5, 2025',
    text: 'Attention to detail was first class. Easy to deal with and finished ahead of schedule',
    url: 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2pFM05UVXlTa3htY1hwc2MxbEVkbUppWTJSeWQxRRAB!2m1!1s0x0:0x4af8e180431525e1!3m1!1s2@1:CAIQACodChtycF9oOjE3NTUySkxmcXpsc1lEdmJiY2Ryd1E%7C0',
  },
];

(() => {
  const host = document.querySelector('[data-reviews]');
  if (!host) return;
  const G_LOGO = '<svg viewBox="0 0 24 24" width="20" height="20" aria-label="Google"><path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.46a5.53 5.53 0 01-2.4 3.63v3h3.88c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.88-3c-1.08.72-2.45 1.15-4.06 1.15-3.13 0-5.78-2.11-6.72-4.96H1.29v3.09A12 12 0 0012 24z"/><path fill="#FBBC05" d="M5.28 14.28a7.2 7.2 0 010-4.56V6.63H1.29a12 12 0 000 10.74l3.99-3.09z"/><path fill="#EA4335" d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.44-3.44A11.97 11.97 0 0012 0 12 12 0 001.29 6.63l3.99 3.09C6.22 6.88 8.87 4.77 12 4.77z"/></svg>';
  const STAR = '<svg viewBox="0 0 24 24" width="17" height="17"><path fill="#FDBC00" d="M12 17.3l-6.2 3.7 1.7-7L2 9.3l7.2-.6L12 2l2.8 6.7 7.2.6-5.5 4.7 1.7 7z"/></svg>';
  const card = (r) => `
    <article class="review-card">
      <div class="review-head">
        <img src="${r.avatar}" alt="" loading="lazy"><span class="review-name">${r.name}</span>${G_LOGO}
      </div>
      <div class="review-stars">${STAR.repeat(5)}</div>
      ${r.text ? `<p class="review-text">${r.text}</p>` : ''}
      <div class="review-foot">
        <a href="${r.url}" target="_blank" rel="noopener">Learn more</a><span>${r.date}</span>
      </div>
    </article>`;
  const row = (list, cls) => `<div class="reviews-row ${cls}"><div class="reviews-track">${list.map(card).join('')}${list.map(card).join('')}</div></div>`;
  host.innerHTML = row(REVIEWS, 'row-a') + row([...REVIEWS].reverse(), 'row-b');
})();

