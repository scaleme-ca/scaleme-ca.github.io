gsap.registerPlugin(ScrollTrigger);

function initHomeHeroWave() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const planeGeo = new THREE.PlaneGeometry(40, 24, 80, 48);
  const planeMat = new THREE.MeshBasicMaterial({
    color: 0xd4a843,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI / 2.6;
  plane.position.y = -4;
  plane.position.z = -2;
  scene.add(plane);

  const originalPositions = planeGeo.attributes.position.array.slice();

  const glowGeo = new THREE.PlaneGeometry(20, 12);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xd4a843, transparent: true, opacity: 0.04 });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(2, 0, -8);
  scene.add(glow);

  camera.position.set(0, 1, 10);
  camera.lookAt(0, -2, 0);

  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.4;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.2;
  });

  const startTime = Date.now();
  function animate() {
    requestAnimationFrame(animate);
    const t = (Date.now() - startTime) * 0.0008;
    const positions = planeGeo.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i];
      const y = originalPositions[i + 1];
      positions[i + 2] = Math.sin(x * 0.4 + t) * 0.6 +
        Math.sin(y * 0.5 + t * 1.3) * 0.5 +
        Math.sin((x + y) * 0.3 + t * 0.8) * 0.3;
    }
    planeGeo.attributes.position.needsUpdate = true;

    camera.position.x += (mouseX - camera.position.x) * 0.02;
    camera.position.y += (1 - mouseY - camera.position.y) * 0.02;
    camera.lookAt(0, -2, 0);
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function heroReveal() {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  tl.to('.word-inner', { y: 0, duration: 1, stagger: 0.07 })
    .to('.hero-eyebrow span', { y: 0, opacity: 1, duration: 0.6 }, '-=0.5')
    .to('.hero-sub', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
    .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .to('.hero-scroll-cue', { opacity: 1, duration: 0.5 }, '-=0.1');
}

function initScrollReveals() {
  gsap.utils.toArray('.m-label, .s-label').forEach((el) => {
    gsap.from(el, { opacity: 0, x: -20, duration: 0.6, scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.m-heading, .services-header h2, .process-list-section h2, .fit-header h2, .cta-section h2').forEach((el) => {
    gsap.from(el, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.from(el, { opacity: 0, x: -40, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('[data-svc]').forEach((r, i) => {
    gsap.from(r, { opacity: 0, x: -30, duration: 0.6, delay: i * 0.05, ease: 'power3.out', scrollTrigger: { trigger: r, start: 'top 92%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.process-item-row').forEach((c, i) => {
    gsap.from(c, { opacity: 0, x: -30, duration: 0.7, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: c, start: 'top 90%', toggleActions: 'play none none reverse' } });
  });
  gsap.utils.toArray('.fit-card').forEach((card, i) => {
    gsap.from(card, { opacity: 0, y: 30, duration: 0.7, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' } });
  });
}

const preloader = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloaderFill');
gsap.timeline({
  onComplete: () => {
    gsap.to(preloader, { yPercent: -100, duration: 0.8, ease: 'power4.inOut', onComplete: () => { preloader.style.display = 'none'; } });
    heroReveal();
  }
}).to(preloaderFill, { width: '100%', duration: 1.4, ease: 'power2.inOut' });

const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', (e) => {
  gsap.to(dot, { x: e.clientX - 3, y: e.clientY - 3, duration: 0.1, ease: 'power2.out' });
  gsap.to(ring, { x: e.clientX - 18, y: e.clientY - 18, duration: 0.25, ease: 'power2.out' });
});
document.querySelectorAll('a, button, .svc-row, .process-item-row').forEach((el) => {
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

document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

ScaleMe.whenIdle(() => {
  ScaleMe.loadThree().then(initHomeHeroWave).catch(() => {});
  initScrollReveals();
});
