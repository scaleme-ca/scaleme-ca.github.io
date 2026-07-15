function initServiceHeroWave() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const planeGeo = new THREE.PlaneGeometry(36, 20, 70, 40);
  const planeMat = new THREE.MeshBasicMaterial({
    color: 0xd4a843,
    wireframe: true,
    transparent: true,
    opacity: 0.18
  });
  const plane = new THREE.Mesh(planeGeo, planeMat);
  plane.rotation.x = -Math.PI / 2.4;
  plane.position.y = -3.5;
  plane.position.z = -2;
  scene.add(plane);

  const originalPositions = planeGeo.attributes.position.array.slice();

  const glowGeo = new THREE.PlaneGeometry(20, 12);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xd4a843, transparent: true, opacity: 0.035 });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(2, 0, -8);
  scene.add(glow);

  camera.position.set(0, 1, 9);
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
      positions[i + 2] = Math.sin(x * 0.4 + t) * 0.5 +
        Math.sin(y * 0.5 + t * 1.3) * 0.4 +
        Math.sin((x + y) * 0.3 + t * 0.8) * 0.25;
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

function scheduleServiceHeroWave() {
  ScaleMe.whenIdle(() => {
    ScaleMe.loadThree().then(initServiceHeroWave).catch(() => {});
  });
}
