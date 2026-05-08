/* =============================================
   CareVirt — Landing Page JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  /* ---- Hamburger / Mobile Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  /* ---- Back to Top ---- */
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Tabs ---- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + tab).classList.add('active');
    });
  });

  /* ---- AOS (Animate On Scroll) ---- */
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0);
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-aos]').forEach(el => aosObserver.observe(el));

  /* ---- Counter Animation ---- */
  const counters = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    const firstStat = counters[0];
    const rect = firstStat.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // check on load too

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 76; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate submission (replace with real endpoint)
      setTimeout(() => {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'flex';
        formSuccess.style.flexDirection = 'column';
        formSuccess.style.alignItems = 'center';
      }, 1200);
    });
  }

  /* ---- Active nav link highlighting ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'var(--teal-dark)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

});

/* ---- Bar chart tooltips ---- */
(function() {
  const tip = document.getElementById('bar-tooltip');
  document.querySelectorAll('.vi-bar-col[data-tip]').forEach(col => {
    col.addEventListener('mouseenter', e => {
      tip.textContent = col.dataset.tip;
      tip.classList.add('visible');
      position(e);
    });
    col.addEventListener('mousemove', position);
    col.addEventListener('mouseleave', () => tip.classList.remove('visible'));
  });
  function position(e) {
    tip.style.left = e.clientX + 'px';
    tip.style.top  = (e.clientY - 36) + 'px';
  }
})();

/* ---- Close mobile menu ---- */
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}
