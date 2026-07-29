// ===== Stat counters =====
// Fixed from the original: uses requestAnimationFrame + elapsed time so all
// counters finish together, instead of Math.ceil(target/steps) which made
// small targets (25) finish almost instantly and large ones (1500) lag behind.
const counters = document.querySelectorAll('.counter');
const COUNTER_DURATION = 1200; // ms — same for every counter, so they finish in sync

const animateCounter = (counter) => {
  const target = parseInt(counter.getAttribute('data-target'), 10);
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / COUNTER_DURATION, 1);
    const current = Math.ceil(progress * target);
    counter.innerText = progress < 1 ? current : target + '+';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const startCounters = () => counters.forEach(animateCounter);

// Lowered from 0.7 to 0.3: at 0.7 the .stats section (which can be taller
// than the viewport) may never reach 70% visibility, so counters never fire.
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ===== Scroll-reveal for cards/sections below the fold =====
// Add class="reveal-up" to any element in the HTML to opt it into this.
const revealEls = document.querySelectorAll('.reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach((el) => revealObserver.observe(el));

// ===== Newsletter form =====
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
.hero-image {
    position: relative;
    animation: float 4s ease-in-out infinite;
}

@keyframes float {
    0% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
    100% {
        transform: translateY(0);
    }
}