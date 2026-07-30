// ===== Wait until the page is fully loaded =====
document.addEventListener("DOMContentLoaded", () => {

  // ===== Stat Counters =====
  const counters = document.querySelectorAll(".counter");
  const COUNTER_DURATION = 1200;

  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    if (Number.isNaN(target)) return;

    const duration = Number(counter.dataset.duration) || COUNTER_DURATION;
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOut(progress);
      const currentValue = Math.ceil(easedProgress * target);

      counter.textContent = progress < 1 ? `${currentValue}+` : `${target}+`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const startCounters = () => counters.forEach(animateCounter);

  if ("IntersectionObserver" in window) {
    const statsSection = document.querySelector(".stats");

    if (statsSection) {
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });

      statsObserver.observe(statsSection);
    }

    // ===== Scroll Reveal =====
    const revealElements = document.querySelectorAll(".reveal-up");

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    // No IntersectionObserver support: show everything immediately
    document.querySelectorAll(".reveal-up").forEach((el) => el.classList.add("in"));
  }

  // ===== Newsletter Form =====
  const ctaForm = document.querySelector(".cta-form");

  if (ctaForm) {
    ctaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const button = ctaForm.querySelector("button");
      const originalText = button ? button.textContent : "Notify Me";

      if (button) {
        button.textContent = "Added ✓";
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
        }, 2000);
      }

      ctaForm.reset();
    });
  }

  // ===== Smooth Scrolling =====
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

});