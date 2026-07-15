gsap.registerPlugin(ScrollTrigger);
scheduleServiceHeroWave();

function heroReveal() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.to('.word-inner', { y: 0, duration: 1, stagger: 0.07 })
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
    .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');
}

const preloader = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloaderFill');
gsap.timeline({
  onComplete: () => {
    gsap.to(preloader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: () => { preloader.style.display = 'none'; } });
    heroReveal();
  }
}).to(preloaderFill, { width: '100%', duration: 1.2, ease: 'power2.inOut' });

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', (e) => {
  gsap.to(dot, { x: e.clientX - 3, y: e.clientY - 3, duration: 0.1, ease: 'power2.out' });
  gsap.to(ring, { x: e.clientX - 18, y: e.clientY - 18, duration: 0.25, ease: 'power2.out' });
});
document.querySelectorAll('a, button, .scope-row, .problem-card, .audience-card, .pricing-card, .faq-item').forEach((el) => {
  el.addEventListener('mouseenter', () => ring.classList.add('expand'));
  el.addEventListener('mouseleave', () => ring.classList.remove('expand'));
});

document.querySelectorAll('.mag-btn, .nav-contact-btn').forEach((btn) => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  });
});

document.querySelectorAll('.faq-item').forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

function initSharedScrollReveals() {
  gsap.utils.toArray('.s-label, .section-number').forEach((el) => {
    gsap.from(el, { opacity: 0, x: -20, duration: 0.6, scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.problem-card').forEach((card, i) => {
    gsap.from(card, { opacity: 0, y: 30, duration: 0.7, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.scope-row').forEach((row, i) => {
    gsap.from(row, { opacity: 0, x: -30, duration: 0.6, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 92%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.audience-card').forEach((card, i) => {
    gsap.from(card, { opacity: 0, y: 30, duration: 0.7, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, { opacity: 0, x: -30, duration: 0.7, delay: i * 0.07, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 90%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.pricing-card').forEach((card, i) => {
    gsap.from(card, { opacity: 0, y: 30, duration: 0.7, delay: i * 0.1, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.faq-item').forEach((item, i) => {
    gsap.from(item, { opacity: 0, y: 20, duration: 0.5, delay: i * 0.04, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 92%', toggleActions: 'play none none reverse' } });
  });
}

const scrollByPage = {
  affiliate: () => {
    gsap.utils.toArray('.problem-header h2, .scope-header h2, .audience-header h2, .timeline-header h2, .case-header h2, .pricing-header h2, .faq-header h2, .cta-section h2').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
    });
    gsap.from('.case-card', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.case-card', start: 'top 85%', toggleActions: 'play none none reverse' } });
  },
  'web-design': () => {
    gsap.utils.toArray('.problem-header h2, .scope-header h2, .audience-header h2, .timeline-header h2, .standards-header h2, .pricing-header h2, .faq-header h2, .cta-section h2').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
    });
    gsap.from('.standards-card', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.standards-card', start: 'top 85%', toggleActions: 'play none none reverse' } });
    gsap.utils.toArray('.standards-item').forEach((item, i) => {
      gsap.from(item, { opacity: 0, y: 20, duration: 0.5, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 95%', toggleActions: 'play none none reverse' } });
    });
  },
  content: () => {
    gsap.utils.toArray('.problem-header h2, .scope-header h2, .audience-header h2, .timeline-header h2, .stack-header h2, .pricing-header h2, .faq-header h2, .cta-section h2').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
    });
    gsap.from('.stack-card', { opacity: 0, y: 40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.stack-card', start: 'top 85%', toggleActions: 'play none none reverse' } });
    gsap.utils.toArray('.stack-col').forEach((col, i) => {
      gsap.from(col, { opacity: 0, y: 20, duration: 0.5, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: col, start: 'top 95%', toggleActions: 'play none none reverse' } });
    });
  }
};

ScaleMe.whenIdle(() => {
  initSharedScrollReveals();
  const page = document.body.dataset.page;
  if (page && scrollByPage[page]) scrollByPage[page]();
});
