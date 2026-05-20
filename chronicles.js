// chronicles.js - Complete Chronicles Page
import * as THREE from 'three';

// ============================================================
// 3D HORSES ENGINE - FULLY WORKING
// ============================================================
const canvas = document.getElementById('horseCanvas');
if (canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x060308, 0);
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2.8, 14);
  camera.lookAt(0, 1.2, 0);
  
  // Lighting
  const ambientLight = new THREE.AmbientLight(0x332a44);
  scene.add(ambientLight);
  const mainLight = new THREE.DirectionalLight(0xffdd99, 1.3);
  mainLight.position.set(6, 10, 5);
  mainLight.castShadow = true;
  scene.add(mainLight);
  const fillLight = new THREE.PointLight(0xaa8866, 0.5);
  fillLight.position.set(-3, 4, 4);
  scene.add(fillLight);
  const rimLight = new THREE.PointLight(0xffaa66, 0.4);
  rimLight.position.set(0, 3, -6);
  scene.add(rimLight);
  const backLight = new THREE.PointLight(0x8866aa, 0.3);
  backLight.position.set(0, 2, -4);
  scene.add(backLight);
  
  // Ground shadow catcher
  const groundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(24, 16),
    new THREE.ShadowMaterial({ opacity: 0.3, color: 0x000000, transparent: true })
  );
  groundPlane.rotation.x = -Math.PI / 2;
  groundPlane.position.y = -0.7;
  groundPlane.receiveShadow = true;
  scene.add(groundPlane);
  
  // Particle field
  const particleCount = 1200;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    particlePositions[i*3] = (Math.random() - 0.5) * 28;
    particlePositions[i*3+1] = Math.random() * 6;
    particlePositions[i*3+2] = (Math.random() - 0.5) * 22;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0xd4af37, size: 0.045, transparent: true, opacity: 0.2, blending: THREE.AdditiveBlending });
  const dustField = new THREE.Points(particleGeo, particleMat);
  scene.add(dustField);
  
  // Floating particles
  const floatCount = 400;
  const floatGeo = new THREE.BufferGeometry();
  const floatPositions = new Float32Array(floatCount * 3);
  for (let i = 0; i < floatCount; i++) {
    floatPositions[i*3] = (Math.random() - 0.5) * 20;
    floatPositions[i*3+1] = Math.random() * 8;
    floatPositions[i*3+2] = (Math.random() - 0.5) * 18;
  }
  floatGeo.setAttribute('position', new THREE.BufferAttribute(floatPositions, 3));
  const floatMat = new THREE.PointsMaterial({ color: 0xffaa66, size: 0.02, transparent: true, opacity: 0.15, blending: THREE.AdditiveBlending });
  const floatParticles = new THREE.Points(floatGeo, floatMat);
  scene.add(floatParticles);
  
  // Create horse function
  function createHorse(bodyColor, maneColor, posX, posZ, rotationY = 0) {
    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.4, metalness: 0.1 });
    const maneMat = new THREE.MeshStandardMaterial({ color: maneColor, roughness: 0.6 });
    
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.7, 1.9), bodyMat);
    body.position.set(0, 0, 0);
    body.castShadow = true;
    group.add(body);
    
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.48, 0.9, 8), bodyMat);
    neck.position.set(0.18, 0.48, -0.75);
    neck.castShadow = true;
    group.add(neck);
    
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.48, 0.6), bodyMat);
    head.position.set(0.22, 0.75, -1.12);
    head.castShadow = true;
    group.add(head);
    
    const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 8), bodyMat);
    muzzle.position.set(0.28, 0.58, -1.45);
    group.add(muzzle);
    
    const eyeMat = new THREE.MeshStandardMaterial({ color: 0x2a1a0a });
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), eyeMat);
    leftEye.position.set(0.12, 0.84, -1.25);
    group.add(leftEye);
    const rightEye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), eyeMat);
    rightEye.position.set(0.38, 0.84, -1.25);
    group.add(rightEye);
    
    const shineMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const leftShine = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), shineMat);
    leftShine.position.set(0.1, 0.86, -1.23);
    group.add(leftShine);
    const rightShine = new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 6), shineMat);
    rightShine.position.set(0.36, 0.86, -1.23);
    group.add(rightShine);
    
    const earMat = new THREE.MeshStandardMaterial({ color: bodyColor });
    const leftEar = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 6), earMat);
    leftEar.position.set(0.08, 1.02, -1.18);
    leftEar.castShadow = true;
    group.add(leftEar);
    const rightEar = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.28, 6), earMat);
    rightEar.position.set(0.42, 1.02, -1.18);
    rightEar.castShadow = true;
    group.add(rightEar);
    
    // Mane
    for (let i = 0; i < 7; i++) {
      const mane = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.12, 0.14, 4), maneMat);
      mane.position.set(-0.18, 0.58 + i * 0.11, -0.6 + i * 0.12);
      mane.castShadow = true;
      group.add(mane);
    }
    
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.06, 0.45, 5), maneMat);
    tail.position.set(-0.45, 0.18, 0.92);
    tail.castShadow = true;
    group.add(tail);
    
    const legMat2 = new THREE.MeshStandardMaterial({ color: bodyColor });
    const legPositions = [
      [-0.45, -0.4, -0.7], [0.28, -0.4, -0.7],
      [-0.45, -0.4, 0.7], [0.28, -0.4, 0.7]
    ];
    legPositions.forEach(pos => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.65, 0.3), legMat2);
      leg.position.set(pos[0], pos[1], pos[2]);
      leg.castShadow = true;
      group.add(leg);
    });
    
    group.position.set(posX, 0, posZ);
    group.rotation.y = rotationY;
    group.userData = { head, tail, ears: [leftEar, rightEar] };
    return group;
  }
  
  const horse1 = createHorse(0x8B5E3C, 0x5C3A1E, -4.2, -1.5, 0.2);
  const horse2 = createHorse(0x9B6E4A, 0x6C4828, -1.2, -1.8, -0.1);
  const horse3 = createHorse(0x7B4E2E, 0x4C2E18, 1.8, -1.6, 0.15);
  const horse4 = createHorse(0xA87B54, 0x7C5434, 4.5, -1.2, -0.2);
  
  scene.add(horse1, horse2, horse3, horse4);
  
  let time = 0;
  let mouseX = 0;
  let targetCameraX = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
  });
  
  function animateHorses() {
    time += 0.016;
    
    if (horse1.userData.head) {
      horse1.userData.head.rotation.x = Math.sin(time * 1.2) * 0.04;
      horse1.userData.tail.rotation.z = Math.sin(time * 2.5) * 0.1;
    }
    if (horse2.userData.head) {
      horse2.userData.head.rotation.x = 0.55 + Math.sin(time * 0.8) * 0.04;
      horse2.userData.tail.rotation.z = Math.sin(time * 2.2) * 0.08;
    }
    if (horse3.userData.head) {
      horse3.userData.head.rotation.y = Math.sin(time * 0.6) * 0.12;
      horse3.userData.tail.rotation.z = Math.sin(time * 2.8) * 0.12;
    }
    if (horse4.userData.tail) {
      horse4.userData.tail.rotation.z = Math.sin(time * 4) * 0.2;
      horse4.userData.head.rotation.x = Math.sin(time * 1.5) * 0.03;
    }
    
    if (horse1.userData.ears) {
      horse1.userData.ears.forEach(ear => { ear.rotation.x = Math.sin(time * 3) * 0.1; });
    }
    if (horse4.userData.ears) {
      horse4.userData.ears.forEach(ear => { ear.rotation.x = Math.sin(time * 2.5 + 1) * 0.08; });
    }
  }
  
  function animateCamera() {
    targetCameraX += (mouseX - targetCameraX) * 0.05;
    camera.position.x += (targetCameraX * 1.5 - camera.position.x) * 0.05;
    camera.lookAt(0, 1.2, 0);
  }
  
  function animateEnvironment() {
    dustField.rotation.y += 0.0005;
    floatParticles.rotation.y += 0.0003;
  }
  
  function animate() {
    requestAnimationFrame(animate);
    animateHorses();
    animateCamera();
    animateEnvironment();
    renderer.render(scene, camera);
  }
  animate();
  
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

// ============================================================
// PORTAL BUTTON
// ============================================================
const portalBtn = document.getElementById('portalBtn');
if (portalBtn) {
  portalBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}
