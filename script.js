// =========================================
// ARKYNIQ — Interactions
// =========================================

// Nav scroll effect
const nav = document.querySelector('.nav');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  lastScroll = window.scrollY;
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal, .reveal-up');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Animated counters
const counters = document.querySelectorAll('.metric-num[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const duration = 1400;
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = target;
      };
      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });

counters.forEach(el => counterObserver.observe(el));

// Mobile nav toggle (basic)
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    if (navLinks.style.display === 'flex') {
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.right = '24px';
      navLinks.style.flexDirection = 'column';
      navLinks.style.background = '#FAFAF7';
      navLinks.style.padding = '20px';
      navLinks.style.borderRadius = '8px';
      navLinks.style.boxShadow = '0 20px 60px -20px rgba(0,0,0,0.15)';
      navLinks.style.gap = '16px';
    }
  });
}

// Form handler (basic — will need real backend)
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;

    // Build mailto fallback for now
    const data = new FormData(contactForm);
    const name = data.get('name') || '';
    const email = data.get('email') || '';
    const company = data.get('company') || '';
    const interest = data.get('interest') || '';
    const message = data.get('message') || '';

    const subject = encodeURIComponent(`New Project Inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nInterest: ${interest}\n\nMessage:\n${message}`
    );

    setTimeout(() => {
      window.location.href = `mailto:arkyniqai@gmail.com?subject=${subject}&body=${body}`;
      submitBtn.innerHTML = '<span>Opening email...</span>';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    }, 500);
  });
}
