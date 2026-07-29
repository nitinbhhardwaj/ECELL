// Scroll-reveal: fades/slides sections in as they enter the viewport
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

// Header: hide on scroll down, reveal on scroll up
let lastY = window.scrollY;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > lastY && y > 200) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastY = y;
});

// Newsletter form: simple client-side confirmation (swap for real backend later)
const ctaForm = document.querySelector('.cta-form');
if (ctaForm) {
  ctaForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = ctaForm.querySelector('button');
    if (btn) {
      btn.textContent = 'Added ✓';
      btn.disabled = true;
    }
    ctaForm.reset();
  });
}

// Mobile menu button (placeholder — wire up to a real nav drawer if needed)
const menuBtn = document.querySelector('.menu-btn');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
}