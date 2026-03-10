// FaithSchooling.com — Main JavaScript

// ---- Mobile Nav Toggle ----
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
  // Close nav on outside click
  document.addEventListener('click', (e) => {
    if (!mainNav.contains(e.target) && !navToggle.contains(e.target)) {
      mainNav.classList.remove('open');
    }
  });
}

// ---- Grade Tabs ----
const gradeTabs = document.querySelectorAll('.grade-tab');
const gradePanels = document.querySelectorAll('.grade-panel');
if (gradeTabs.length) {
  gradeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      gradeTabs.forEach(t => t.classList.remove('active'));
      gradePanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById(tab.dataset.target);
      if (target) target.classList.add('active');
    });
  });
}

// ---- Scroll-reveal animation ----
const revealEls = document.querySelectorAll('.curr-card, .why-item, .resource-item, .testimonial-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ---- Contact Form (Formspree) ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        contactForm.innerHTML = '<div class="form-success"><h3>Thank you!</h3><p>Your message has been sent. We will be in touch soon.</p></div>';
      } else {
        btn.textContent = 'Try Again';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Try Again';
      btn.disabled = false;
    }
  });
}

// ---- Active nav link on inner pages ----
(function() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.classList.add('active');
    }
  });
})();
