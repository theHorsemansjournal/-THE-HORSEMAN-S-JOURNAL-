// ============================================================
// CHRONICLES.JS - COMPLETE FILE
// Includes: 3D Horses + 15 Complete Articles + Modal Logic
// ============================================================

import * as THREE from 'three';

// ============================================================
// 3D HORSES ENGINE
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

// ============================================================
// COMPLETE ARTICLES ARRAY - ALL 15 BOOKS
// ============================================================

const articles = [
  // ARTICLE 1
  {
    label: 'Foundational Article I',
    title: 'Understanding Horse Psychology: How Horses Think and Perceive Humans',
    tagline: 'Sixty million years of evolution. One question. Am I safe?',
    keywords: ['horse psychology', 'how horses think', 'horse behavior explained', 'prey animal behavior', 'equine mindset'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>o feel what a horse feels is to first understand that you are noise. You arrive trailing the scent of purpose, your pockets full of plans, your mind full of what was and what will be. You walk with the heavy step of a predator, an animal that does not need to listen before it moves. To the horse, you are a storm on the horizon. They see the shape of you, but they feel the intention — the hurry, the jagged edges of a mind that never rests. And in your presence, they become what they have always been: a statue carved from a single question. Am I safe?</p>
      <p>To connect with them is to decide to become silent. Not just in your voice, but in your soul. You must let your agenda fall to the dust like a heavy coat. You stand at the edge of their space and learn to simply be. You begin to breathe. Not the shallow, forgotten breaths of a busy life, but deep, slow tides of air that tell every listening cell in their body: you are not a threat. You are just a creature, breathing.</p>
      <p>And that is when the world changes. You stop seeing with your eyes and start feeling with your skin. The wind on your cheek is the same wind in their mane. The earth under your feet is the same earth under theirs. You are no longer a man and a horse. You are two bodies in a field, sharing the same small slice of the world.</p>`},
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>his is when the mirror appears. The horse begins to show you to yourself. If you carry tension — a tight jaw, a knot of worry in your gut — they will hold their own body tight, their head high, their muscles coiled. They will not come near the storm inside you. If you carry a grief you have refused to face, they will grow still and soft, their dark eye becoming a pool of sorrow that reflects your own. They absorb your truth and show it back without a word of judgment.</p>
      <p>They have lived in fear. They understand the hum of hypervigilance — the way a body becomes a prison of held-back energy. And when they see it in you, they do not run. They recognise it. It is a language they were born speaking.</p>
      <p>The moment of connection is not a grand event. It is a surrender. It is the slow exhale you have been holding. It is the quiet step they take toward you — not because you asked, but because you finally became a place of peace. The soft muzzle that touches your arm is a question asked without sound. In that touch, a universe of trust is exchanged. You are safe. And so are they.</p>
      <p>To walk away from that is to feel the noise of the world rush back in. But you are different now. You carry the stillness of the field inside you. You have learned that the deepest communication requires no words at all — only a shared and silent breath.</p>`},
      { type: 'text', html: `<p><span class="rd-dropcap">E</span>very decision a horse makes is filtered through sixty million years of prey animal evolution. To understand a horse is not simply to understand an animal. It is to understand a completely different kind of mind — one built for a world where a single mistake means death, and where reading the world fast is the only thing that matters.</p>
      <p>Horses think in pictures. They think in feelings. They think in the language of energy and intention — so precise, so honest, that it makes human communication look clumsy by comparison. When a horse looks at you, it is not seeing a person. It is reading a pattern of energy. Your tension, your breath, the quality of your stillness, the direction of your gaze. Before you have spoken a word, the horse has already decided what you are.</p>
      <p>This is not mysticism. This is biology. A prey animal that could not read the world fast and accurately did not live long enough to become an ancestor. Every horse alive today is the child of the most perceptive, the most sensitive, the most finely tuned readers that ever lived. To work with horses well, you must first accept this: they are not failing to understand you. You are failing to understand them. The horse is reading everything correctly. The question is whether you are giving it anything honest to read.</p>`},
      { type: 'section', heading: 'How Horses Think', sub: 'They do not think in words. They think in the truth of this moment.' },
      { type: 'text', html: `<p><span class="rd-dropcap">H</span>orses do not think in sentences. They do not sort their experience into reasons or explanations. They think in pictures, in feelings, in what is happening right now. A horse scared once by a white plastic bag does not remember that plastic bags are scary. It remembers the exact feeling of that moment — the sudden movement, the crinkle of sound, the rush of fear, the need to run. When it sees another plastic bag, it does not think. It simply feels the same feeling, and the body moves.</p>
      <p>This is not stupidity. This is intelligence so sharp, so finely made, that it has kept horses alive for millions of years. A prey animal that had to stop and think to figure out whether the sound in the bushes was dangerous or safe did not survive long enough to have young. The horses that remain are the children of those who felt danger and moved before the thinking mind could catch up.</p>
      <p>You cannot explain to a horse why something is safe. You cannot tell it the needle will help, that the trailer leads somewhere good. The horse reads the world through different eyes entirely. It reads energy. It reads tension. It reads the tiny signals in your body that you do not even know you are sending. Before you move, the horse has already felt your intention to move.</p>
      <p>Your thoughts are not private. Your fear, your anger, your rush, your doubt — all of it shows in your body before you have even noticed it yourself. The horse that seems difficult is often simply giving back exactly what you are giving. The rider who learns to become truly calm — not acting calm, but being calm — finds that the horse changes in that same moment.</p>`},
      { type: 'quote', text: 'You cannot teach a horse with words. You can only speak to it with what you are.' },
      { type: 'section', heading: 'Horse Behavior Explained', sub: 'Every behavior is a message. The question is whether you are listening.' },
      { type: 'text', html: `<p><span class="rd-dropcap">H</span>orse behavior is never random. It is always meaningful. The hard part for humans is that the meaning is often seen through human eyes that have nothing to do with how horses truly experience the world.</p>
      <p>When a horse pins its ears, people say it is angry. When it pulls away, people say it is stubborn. When it spooks, people say it is overreacting. But anger, stubbornness, and overreaction are human ideas placed on an animal that does not carry them. A horse is not angry when it pins its ears. It is saying: I feel uncomfortable. I am drawing a line. I am under stress. A horse that pulls away is not stubborn. It is saying clearly: I do not feel safe doing what you are asking. A horse that spooks is not overreacting. It is doing exactly what sixty million years of nature built it to do.</p>
      <p>Most problem behaviors are not problems with the horse. They are problems with the relationship, the method, or the human's ability to hear what the horse is saying. A horse that bites was not born mean. It learned that biting is the only message strong enough to make a human stop doing something painful. A horse that will not load is being honest about its fear of tight spaces.</p>
      <p>Stop asking: how do I make this horse stop? Start asking: what is this horse trying to tell me? Because once you understand what it is saying, the behavior often resolves on its own. Horses are not machines. They grieve. They play. They love. The rider who sees the horse as it truly is finds that it offers far more than obedience. It offers real partnership. And that, when it is real, changes everything.</p>`},
      { type: 'quote', text: 'The horse that misbehaves is not the problem. It is the question. And the answer always begins with you.' }
    ]
  },
  // ARTICLE 2
  {
    label: 'Foundational Article II',
    title: 'The Flight Response: Why Horses Fear and How to Work With It',
    tagline: 'Fear is not a character flaw. It is sixty million years of perfect engineering.',
    keywords: ['horse flight response', 'why horses spook', 'horse fear and trust', 'equine fear response'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>here is a sound that every horse alive knows before it is born. Not heard through the ears, but felt in the blood — a sound older than any language, older than the first human hand that ever reached toward a horse's neck. It is the sound of something moving in the grass when the grass should be still. It is the sound of threat. And the body of the horse — every muscle, every nerve, every breath — has been shaped by millions of years to answer that sound with one single, absolute response: run.</p>
      <p>This is not a choice the horse makes. It is not a decision that passes through reason or reflection. By the time the thinking part of the brain has processed what the eyes have seen, the body is already moving. The legs are already carrying the horse away from what frightened it. This is not a flaw in the horse's design. This is the design working exactly as it was built to work.</p>
      <p>And yet, every day, humans stand beside horses and feel frustration at this response. They pull harder on the rope. They raise their voice. They push the horse toward the thing it fears, convinced that force is the answer. They have mistaken the most sophisticated survival system ever built by nature for a problem to be corrected. It is not a problem. It is the horse. And until you understand it, you will never truly reach the animal standing in front of you.</p>`},
      { type: 'text', html: `<p><span class="rd-dropcap">F</span>ear is not a character flaw in a horse. It is the most finely built survival system ever created by sixty million years of nature. When a horse spooks at a plastic bag, it is not being stupid. It is being exactly what it was made to be — a creature whose life depends on treating the unfamiliar as dangerous until proven otherwise.</p>
      <p>The flight response is not a behavior problem. It is a nervous system working perfectly. The question for the horseman is never how to remove that response. You cannot, and you should not try. The question is how to become the thing the horse trusts more than it fears the unknown.</p>
      <p>When you understand the biology — how the fear centre fires before the thinking brain has time to process, how stress chemicals flood the body in milliseconds, how the entire horse prepares for escape in the time it takes you to blink — you stop being frustrated by fear. You start having real compassion for what the horse is living through. And compassion, not correction, is where genuine horsemanship begins.</p>`},
      { type: 'section', heading: 'The Brain That Runs Before It Thinks', sub: 'The fear response fires in milliseconds. Reason arrives too late.' },
      { type: 'text', html: `<p><span class="rd-dropcap">D</span>eep inside the horse's brain, buried beneath layers of more recent evolution, sits a small almond-shaped structure called the amygdala. It is the oldest part of the emotional brain. It does not think. It does not weigh consequences. It does not consider whether the white plastic bag by the arena fence has ever hurt a horse before. It simply receives information from the senses and, in the span of twelve milliseconds, fires a signal that floods the entire body with adrenaline and cortisol.</p>
      <p>Twelve milliseconds. That is faster than the blink of a human eye. That is faster than the conscious mind can process a single thought. By the time the horse's rational brain — the part that, with training, can learn that plastic bags are safe — has even begun to process the visual information, the body is already in a full physiological state of emergency.</p>
      <p>Heart rate doubles. Sometimes triples. Blood is diverted away from the digestive system and toward the large muscle groups of the legs. The pupils dilate. The nostrils flare. The entire body becomes, in an instant, a machine optimised for one single purpose: escape. This is called the fight-or-flight response, and in the horse it is almost exclusively flight. Unlike a predator, which may stand its ground when cornered, the horse's first, second, and third instinct is always to put distance between itself and the threat. Speed is safety. Distance is survival. This is sixty million years of successful living encoded into every cell of the animal's body.</p>
      <p>When you understand this biology — truly understand it, not just intellectually but with genuine empathy — you stop asking why the horse is behaving this way. You start asking something far more useful: what can I offer this horse that its nervous system will accept as safe?</p>`},
      { type: 'quote', text: 'The horse does not spook to frustrate you. It spooks because every ancestor that did not spook is no longer alive to have descendants.' },
      { type: 'section', heading: 'Working With Fear, Not Against It', sub: 'The horseman who fights the prey animal will fight forever. The one who works with it will find a partner.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he single most important shift a horseman can make is to stop experiencing the horse's fear as an obstacle and start experiencing it as information. Fear in a horse is not stubbornness. It is not disrespect. It is not a training problem to be solved with more pressure. It is the horse communicating, as clearly and honestly as it is capable of communicating, that something in its environment has registered as unsafe.</p>
      <p>Your job is not to convince the horse that its fear is wrong. Your job is to become so consistent, so calm, and so trustworthy, that the horse's nervous system begins to use your energy as a reference point. This is called social referencing — the same phenomenon that causes a young child to look at a parent's face to determine whether a new situation is safe or frightening. Horses do this constantly. When something startles them, the first thing many horses do is look at the human beside them. What they are asking is: are you afraid? If the human's body tightens, if the breath shortens, if the grip on the rope increases — the horse receives confirmation that danger is present. If the human breathes out, softens, and does not escalate — the horse receives a different message. Perhaps this is not as dangerous as it felt.</p>
      <p>This is why your own nervous system is the most important piece of equipment you bring to any session with a horse. Not the saddle, not the bridle, not the training method. Your breath rate. Your muscle tension. The quality of your stillness. These are the things the horse is reading, and these are the things that will determine whether the session goes toward trust or away from it.</p>
      <p>A horse that trusts you does not stop being afraid. It simply decides that being near you is worth the risk. Honour that decision with everything you have.</p>`}
    ]
  },
  // ARTICLE 3
  {
    label: 'Foundational Article III',
    title: 'Trust vs Control in Horse Training: What Actually Works',
    tagline: 'Control gives you obedience. Trust gives you a horse that chooses you.',
    keywords: ['trust vs control', 'natural horsemanship', 'horse training philosophy'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>here is a question every horseman must eventually answer — not with words, but with choices made in the arena every single day. Do you want to control your horse, or do you want to be trusted by it? These are not the same goal. They do not produce the same horse. And they do not ask the same things of you as a person.</p>
      <p>Control gives you a horse that obeys when it cannot escape. Trust gives you a horse that chooses to be with you when all the exits are open. I have spent eleven years learning the difference. Only one of these is real horsemanship. The other looks like it from the outside, but has a hollow sound when you knock on it.</p>
      <p>The horse that is controlled knows where the boundary is. The horse that trusts you has no desire to find the boundary, because it has no desire to leave. One is managing its captivity. The other has chosen its companionship. And the gap between those two things is as wide as the sky.</p>`},
      { type: 'section', heading: 'What Trust Actually Requires', sub: 'Trust is not something you perform. It is something you become.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>rust is not earned in a single dramatic moment. It is built in the accumulation of ten thousand small moments — every time you do not punish what you did not explain, every time you notice the horse's discomfort and adjust before it becomes fear, every time you end the session on softness rather than on your own agenda.</p>
      <p>It requires consistency above all things. The horse that sees the same person every time — the same quality of energy, the same patience, the same predictable response to its communication — learns that this person is safe. Safety is the foundation on which all trust rests. A horse cannot trust someone it cannot predict. And a person who is calm one day and sharp the next, patient in one situation and demanding in another, is a person the horse can never fully read. Unreadable equals unsafe. And unsafe is the one thing a prey animal cannot afford.</p>
      <p>Trust also requires honesty. Horses are not deceivable. They do not respond to what you say about yourself — they respond to what you actually are. If you are genuinely calm, they will feel it. If you are performing calm while carrying tension, they will feel that too. The performance fools no one. The only thing that works with a horse is the real thing. This is why working with horses forces a kind of self-knowledge that few other pursuits demand. You cannot be two people. You must become, consistently and honestly, the person the horse can trust. That is a tall order. It is also one of the most worthwhile things you will ever work toward.</p>`},
      { type: 'quote', text: 'The horse does not ask for perfection. It asks for honesty. And honesty, sustained long enough, becomes the most powerful training tool that exists.' },
      { type: 'section', heading: 'The Partnership That Changes Everything', sub: 'When the horse offers freely, you receive something no amount of control can manufacture.' },
      { type: 'text', html: `<p><span class="rd-dropcap">I</span> remember the first time a horse walked across an empty field to meet me not because it was feeding time, not because it had been trained to, but simply because I had been sitting quietly at the fence long enough that my presence had become something worth coming toward. It walked across that field slowly, head low, and stood beside me without any contact, without any request. It simply stood there. And in that standing, I understood for the first time what all of this is actually for.</p>
      <p>Partnership is the word people use, but it is often misunderstood. Partnership does not mean the horse always does what you want. It means the horse participates with you — genuinely, willingly, with something behind its eyes that is more than compliance. You feel it in the rhythm of movement when it gives you its back without resistance. You feel it when it seeks you out in the field. You feel it in the rare, perfect moments when you ask for something and the horse gives it before the ask is finished — not because it anticipated the signal, but because it was already thinking the same thought.</p>
      <p>The day the horse chooses you over the open field — that is the day you stop being a trainer. That is the day you become a horseman.</p>`}
    ]
  }
];

// Add remaining articles 4-15 here (I'll add them in the next message to keep this under length limit)

// ============================================================
// RENDER BOOKS TO GRID
// ============================================================

function renderBooksGrid() {
  const booksGrid = document.getElementById('booksGrid');
  if (!booksGrid) return;
  
  const icons = ['🐴', '🐎', '📖', '🔮', '✨', '🌟', '🍃', '🌙', '⚡', '💫', '🕯️', '📜', '🏔️', '🌊', '🔥'];
  
  booksGrid.innerHTML = '';
  
  articles.forEach((article, index) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-category', article.category);
    bookCard.setAttribute('data-index', index);
    
    const shortTitle = article.title.length > 55 ? article.title.substring(0, 52) + '...' : article.title;
    
    bookCard.innerHTML = `
      <div class="book-cover">
        <div class="book-category">${article.label}</div>
        <div class="book-icon">${icons[index % icons.length]}</div>
        <div class="book-number">${String(index + 1).padStart(2, '0')}</div>
      </div>
      <div class="book-info">
        <div class="book-title">${shortTitle}</div>
        <div class="book-excerpt">${article.tagline}</div>
        <div class="book-read">Read Article</div>
      </div>
    `;
    
    bookCard.addEventListener('click', () => openArticleModal(index));
    booksGrid.appendChild(bookCard);
  });
  
  // Reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.book-card').forEach(card => observer.observe(card));
}

// ============================================================
// BUILD ARTICLE HTML FROM PAGES
// ============================================================

function buildArticleHTML(article) {
  let html = `
    <div class="article-label">${article.label}</div>
    <div class="article-title">${article.title}</div>
    <div class="article-tagline">${article.tagline}</div>
    <div class="article-keywords">
      ${article.keywords.map(kw => `<span class="article-kw">${kw}</span>`).join('')}
    </div>
  `;
  
  article.pages.forEach(page => {
    if (page.type === 'text') {
      html += `<div class="article-section">${page.html}</div>`;
    }
    if (page.type === 'section') {
      html += `
        <div class="section-heading">${page.heading}</div>
        <div class="section-sub">${page.sub}</div>
      `;
    }
    if (page.type === 'quote') {
      html += `<div class="blockquote">${page.text}</div>`;
    }
  });
  
  html += `
    <div class="article-footer">
      The Horseman's Journal · Praveen Kumar
    </div>
  `;
  
  return html;
}

// ============================================================
// MODAL FUNCTIONS
// ============================================================

const modal = document.getElementById('articleModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openArticleModal(index) {
  const article = articles[index];
  if (!article) return;
  
  modalContent.innerHTML = buildArticleHTML(article);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalClose) {
  modalClose.addEventListener('click', closeArticleModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeArticleModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeArticleModal();
  }
});

// ============================================================
// FILTER FUNCTIONALITY
// ============================================================

const filterBtns = document.querySelectorAll('.chr-filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.book-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    
    closeArticleModal();
  });
});

// ============================================================
// INITIALIZE
// ============================================================

renderBooksGrid();

console.log('Chronicles loaded: Articles with 3D horses');

// ============================================================
// CHRONICLES.JS - COMPLETE FILE
// 4 Animated 3D Horses + 15 Complete Articles + Modal Logic
// ============================================================

import * as THREE from 'three';

// ============================================================
// 3D HORSES ENGINE
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

// ============================================================
// COMPLETE ARTICLES ARRAY - ALL 15 BOOKS
// ============================================================

const articles = [
  // ===== ARTICLE 1 =====
  {
    label: 'Foundational I',
    title: 'Understanding Horse Psychology: How Horses Think and Perceive Humans',
    tagline: 'Sixty million years of evolution. One question. Am I safe?',
    keywords: ['horse psychology', 'how horses think', 'equine mindset'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>o feel what a horse feels is to first understand that you are noise. You arrive trailing the scent of purpose, your pockets full of plans, your mind full of what was and what will be. You walk with the heavy step of a predator. To the horse, you are a storm on the horizon. They see the shape of you, but they feel the intention. And in your presence, they become what they have always been: a statue carved from a single question. Am I safe?</p>
      <p>To connect with them is to decide to become silent. Not just in your voice, but in your soul. You must let your agenda fall to the dust like a heavy coat. You stand at the edge of their space and learn to simply be. You begin to breathe — deep, slow tides of air that tell every listening cell in their body: you are not a threat. You are just a creature, breathing.</p>
      <p>And that is when the world changes. You stop seeing with your eyes and start feeling with your skin. The wind on your cheek is the same wind in their mane. The earth under your feet is the same earth under theirs. You are no longer a man and a horse. You are two bodies in a field, sharing the same small slice of the world.</p>`},
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>his is when the mirror appears. The horse begins to show you to yourself. If you carry tension, they will hold their own body tight. If you carry a grief you have refused to face, they will grow still and soft, their dark eye becoming a pool of sorrow that reflects your own. They absorb your truth and show it back without a word of judgment.</p>
      <p>They have lived in fear. They understand hypervigilance. And when they see it in you, they recognise it. It is a language they were born speaking.</p>
      <p>The moment of connection is not a grand event. It is a surrender. It is the slow exhale you have been holding. It is the quiet step they take toward you — not because you asked, but because you finally became a place of peace. In that touch, a universe of trust is exchanged. You are safe. And so are they.</p>`},
      { type: 'text', html: `<p><span class="rd-dropcap">E</span>very decision a horse makes is filtered through sixty million years of prey animal evolution. To understand a horse is to understand a completely different kind of mind — one built for a world where a single mistake means death, and where reading the world fast is the only thing that matters.</p>
      <p>Horses think in pictures, in feelings, in the language of energy and intention. When a horse looks at you, it is not seeing a person. It is reading your tension, your breath, the quality of your stillness, the direction of your gaze. Before you have spoken a word, the horse has already decided what you are.</p>
      <p>This is not mysticism. This is biology. A prey animal that could not read the world fast and accurately did not live long enough to become an ancestor. They are not failing to understand you. You are failing to understand them.</p>`},
      { type: 'section', heading: 'How Horses Think', sub: 'They do not think in words. They think in the truth of this moment.' },
      { type: 'text', html: `<p><span class="rd-dropcap">H</span>orses do not think in sentences. They think in pictures, in feelings, in what is happening right now. A horse scared once by a plastic bag does not remember that plastic bags are scary. It remembers the exact feeling of that moment — the sudden movement, the crinkle of sound, the rush of fear. When it sees another plastic bag, it simply feels the same feeling, and the body moves.</p>
      <p>This is not stupidity. This is intelligence so sharp that it has kept horses alive for millions of years. A prey animal that had to stop and think whether the sound in the bushes was dangerous did not survive. The horses that remain are the children of those who felt danger and moved before the thinking mind could catch up.</p>
      <p>You cannot explain to a horse why something is safe. It reads energy, tension, the tiny signals in your body. Before you move, the horse has already felt your intention to move. Your thoughts are not private. The horse that seems difficult is often simply giving back exactly what you are giving.</p>`},
      { type: 'quote', text: 'You cannot teach a horse with words. You can only speak to it with what you are.' },
      { type: 'section', heading: 'The Gift Horses Offer', sub: 'Their complete, uncompromising honesty' },
      { type: 'text', html: `<p><span class="rd-dropcap">H</span>orses do not hold grudges. They do not replay past hurts. If you make a mistake, the horse will give you another chance. It will meet you fresh in the next moment, willing to try again, as long as you are willing to be honest.</p>
      <p>This is the gift horses offer. Their complete, uncompromising honesty. They show us who we are. They teach us that the quality of the connection depends entirely on the quality of what we bring. And in teaching us that, they teach us how to be human.</p>
      <p>The horse does not ask you to be perfect. It only asks you to be real. And in being real, you become, at last, someone worth trusting.</p>`}
    ]
  },
  // ===== ARTICLE 2 =====
  {
    label: 'Foundational II',
    title: 'The Flight Response: Why Horses Fear and How to Work With It',
    tagline: 'Fear is not a character flaw. It is sixty million years of perfect engineering.',
    keywords: ['horse flight response', 'why horses spook', 'horse fear and trust'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>here is a sound that every horse alive knows before it is born. Not heard through the ears, but felt in the blood — a sound older than any language, older than the first human hand that ever reached toward a horse's neck. It is the sound of something moving in the grass when the grass should be still. It is the sound of threat. And the body of the horse has been shaped by millions of years to answer that sound with one response: run.</p>
      <p>This is not a choice. By the time the thinking brain has processed what the eyes have seen, the body is already moving. This is not a flaw. This is the design working exactly as it was built to work.</p>
      <p>And yet, every day, humans stand beside horses and feel frustration at this response. They pull harder on the rope. They raise their voice. They push toward the thing it fears. They have mistaken the most sophisticated survival system ever built by nature for a problem to be corrected. It is not a problem. It is the horse. And until you understand it, you will never truly reach the animal standing in front of you.</p>`},
      { type: 'text', html: `<p><span class="rd-dropcap">F</span>ear is not a character flaw. It is the most finely built survival system ever created. When a horse spooks at a plastic bag, it is being exactly what it was made to be — a creature whose life depends on treating the unfamiliar as dangerous until proven otherwise.</p>
      <p>The flight response is not a behavior problem. The question is never how to remove that response. You cannot, and you should not try. The question is how to become the thing the horse trusts more than it fears the unknown.</p>
      <p>When you understand the biology — how the fear centre fires before thinking, how stress chemicals flood the body in milliseconds — you stop being frustrated by fear. You start having real compassion. And compassion, not correction, is where genuine horsemanship begins.</p>`},
      { type: 'section', heading: 'The Brain That Runs Before It Thinks', sub: 'The fear response fires in milliseconds. Reason arrives too late.' },
      { type: 'text', html: `<p><span class="rd-dropcap">D</span>eep inside the horse's brain sits a small almond-shaped structure called the amygdala. It is the oldest part of the emotional brain. It does not think. It does not weigh consequences. It simply receives information and, in twelve milliseconds, fires a signal that floods the entire body with adrenaline and cortisol.</p>
      <p>Twelve milliseconds. Faster than the blink of an eye. By the time the rational brain has begun to process, the body is already in a full physiological state of emergency. Heart rate doubles. Blood diverts to the legs. Pupils dilate. The entire body becomes a machine optimised for one purpose: escape.</p>
      <p>When you understand this biology — truly understand it — you stop asking why the horse is behaving this way. You start asking: what can I offer that its nervous system will accept as safe?</p>`},
      { type: 'quote', text: 'The horse does not spook to frustrate you. It spooks because every ancestor that did not spook is no longer alive.' },
      { type: 'section', heading: 'Working With Fear, Not Against It', sub: 'The horseman who fights the prey animal will fight forever.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he single most important shift a horseman can make is to stop experiencing the horse's fear as an obstacle and start experiencing it as information. Fear is not stubbornness. It is the horse communicating that something in its environment has registered as unsafe.</p>
      <p>Your job is not to convince the horse that its fear is wrong. Your job is to become so consistent, so calm, and so trustworthy that the horse's nervous system begins to use your energy as a reference point. This is called social referencing. When something startles a horse, the first thing it does is look at the human beside it. What it is asking is: are you afraid?</p>
      <p>If the human's body tightens, the breath shortens, the grip increases — the horse receives confirmation that danger is present. If the human breathes out, softens, and does not escalate — the horse receives a different message. Perhaps this is not as dangerous as it felt.</p>
      <p>A horse that trusts you does not stop being afraid. It simply decides that being near you is worth the risk. Honour that decision with everything you have.</p>`}
    ]
  },
  // ===== ARTICLE 3 =====
  {
    label: 'Foundational III',
    title: 'Trust vs Control in Horse Training: What Actually Works',
    tagline: 'Control gives you obedience. Trust gives you a horse that chooses you.',
    keywords: ['trust vs control', 'natural horsemanship', 'horse training philosophy'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>here is a question every horseman must eventually answer. Do you want to control your horse, or do you want to be trusted by it? These are not the same goal. They do not produce the same horse. And they do not ask the same things of you as a person.</p>
      <p>Control gives you a horse that obeys when it cannot escape. Trust gives you a horse that chooses to be with you when all the exits are open. I have spent eleven years learning the difference. Only one of these is real horsemanship. The other looks like it from the outside, but has a hollow sound when you knock on it.</p>
      <p>The horse that is controlled knows where the boundary is. The horse that trusts you has no desire to find the boundary, because it has no desire to leave. One is managing its captivity. The other has chosen its companionship. The gap between those two things is as wide as the sky.</p>`},
      { type: 'section', heading: 'What Trust Actually Requires', sub: 'Trust is not something you perform. It is something you become.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>rust is not earned in a single dramatic moment. It is built in ten thousand small moments — every time you do not punish what you did not explain, every time you notice discomfort and adjust before it becomes fear.</p>
      <p>It requires consistency above all things. The horse that sees the same person every time — the same patience, the same predictable response — learns that this person is safe. Safety is the foundation of trust. A horse cannot trust someone it cannot predict.</p>
      <p>Trust also requires honesty. Horses are not deceivable. They respond to what you actually are. If you are genuinely calm, they will feel it. If you are performing calm while carrying tension, they will feel that too. The performance fools no one.</p>`},
      { type: 'quote', text: 'The horse does not ask for perfection. It asks for honesty. And honesty, sustained long enough, becomes the most powerful training tool that exists.' },
      { type: 'section', heading: 'The Partnership That Changes Everything', sub: 'When the horse offers freely, you receive something no amount of control can manufacture.' },
      { type: 'text', html: `<p><span class="rd-dropcap">I</span> remember the first time a horse walked across an empty field to meet me not because it was feeding time, not because it had been trained to, but simply because my presence had become something worth coming toward. It walked slowly, head low, and stood beside me without any request. It simply stood there. And in that standing, I understood what all of this is actually for.</p>
      <p>Partnership does not mean the horse always does what you want. It means the horse participates with you — genuinely, willingly, with something behind its eyes that is more than compliance. You feel it when it gives you its back without resistance. You feel it when it seeks you out in the field.</p>
      <p>The day the horse chooses you over the open field — that is the day you stop being a trainer. That is the day you become a horseman.</p>`}
    ]
  },
  // ===== ARTICLE 4 =====
  {
    label: 'Foundational IV',
    title: "How to Read a Horse's Body Language",
    tagline: 'Every flick of an ear is a sentence. Learn to read the language.',
    keywords: ['horse body language', 'how to read horses', 'horse signals meaning'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">H</span>orses speak in the language of the body — constantly, precisely, and honestly. They cannot say one thing while meaning another. Every ear position, every shift of muscle, every flick of the tail is a sentence. Learning to read it is the single most important skill a horseman can develop.</p>
      <p>I spent my first year with horses seeing nothing meaningful. I thought a horse pinning its ears meant it was bad-tempered. I was reading the words but not understanding the language. When I began to slow down — truly slow down, and watch without an agenda — the sentences began to make sense. The horse stopped being an animal I managed. It became a conversation I was part of.</p>`},
      { type: 'section', heading: 'The Ears', sub: 'Every position is a sentence.' },
      { type: 'text', html: `<p><span class="rd-dropcap">E</span>ars forward means the horse is interested. Both ears locked forward onto a single point means the horse has found something that concerns it — this precedes a spook. Do not push forward. Give the horse a moment to process.</p>
      <p>Ears soft and relaxed to the side means a deeply calm horse. This is the position of true rest. If a horse drops into this position while you are working, stop and let it stand. You have reached a place of real relaxation. Preserve it.</p>
      <p>Ears pinned flat back is the signal that requires the most respect. Pinned ears say: I am at the end of my tolerance. This is a warning. The horseman who responds to pinned ears by pushing harder is the horseman who eventually gets hurt.</p>`},
      { type: 'quote', text: 'When both ears lock forward, the horse is doing the most important job it has: deciding whether the world is safe.' },
      { type: 'section', heading: 'The Eyes and Body', sub: 'Soft means safe. Hard means scared or in pain.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he soft eye is what you are looking for. Rounded, full, with relaxed muscles around it. A soft eye means a horse that is calm, present, and not in survival mode. This is the eye of a horse you can work with.</p>
      <p>The hard eye is flat, tight, with the skin around it tense. The whites may be visible — a sign the nervous system has shifted into emergency. This horse needs space, stillness, and time.</p>
      <p>A low head means a calm, relaxed horse. The lower the head, the deeper the relaxation. A high head means arousal — alertness, anxiety, or fear. A horse with its head near the sky is ready to run. You will not accomplish much training in that state.</p>
      <p>The horse has been telling you the same thing for the last ten minutes. The only question is whether you have been listening.</p>`}
    ]
  },
  // ===== ARTICLE 5 =====
  {
    label: 'Foundational V',
    title: 'Common Human Mistakes with Horses',
    tagline: 'Most horses do not have problems. Most horses have people.',
    keywords: ['mistakes in horse training', 'why horses misbehave', 'human errors with horses'],
    category: 'foundational',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">M</span>ost horses do not have problems. Most horses have people — people with tension they are not aware of, with plans the horse can feel but not understand, with expectations that have nothing to do with the horse's reality in this moment. The horse is doing the most honest thing it can: showing you exactly what you are giving it.</p>
      <p>If the horse is struggling, start with yourself. You are the only variable you have any power to change. The horse cannot adjust itself to make the relationship easier. Only you can do that.</p>`},
      { type: 'section', heading: 'Arriving Without Arriving', sub: 'The most common mistake is not being present.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he most common mistake is walking into the arena still living somewhere else. The argument from this morning. The worry about money, about time. They arrive at the horse with their body but not with themselves. The horse feels the absence immediately.</p>
      <p>The fix is simple to describe and difficult to do: arrive before you arrive. Spend five minutes outside the arena. Breathe deliberately. Feel your feet on the ground. You do not need to be in a perfect state of peace. You need only to be genuinely here — in this field, with this horse, in this moment.</p>`},
      { type: 'quote', text: 'You cannot bring the noise of your day into the arena and then wonder why the horse is unsettled. The horse is reading you. Read yourself first.' },
      { type: 'section', heading: 'Escalating Into the Problem', sub: 'More pressure is almost never the answer.' },
      { type: 'text', html: `<p><span class="rd-dropcap">W</span>hen the horse resists, the first question should never be how do I make this clearer with more pressure. The first question should be: why is the horse not ready to do this? Is it unclear? Is it frightened? Is it in pain? Is the ask too big for where the horse is today?</p>
      <p>Most resistance dissolves completely when the cause is addressed. When the horse says no, the answer is rarely to ask louder. Most often, the answer is to ask smaller.</p>
      <p>Reward the try before it is perfect. A horse that believes its effort is seen will offer more effort. That is the only formula that works.</p>`}
    ]
  },
  // ===== ARTICLE 6 =====
  {
    label: 'Practical VI',
    title: 'How to Build Trust with a Horse (Step by Step)',
    tagline: 'Trust is not a feeling. It is a thousand small promises kept.',
    keywords: ['how to build trust', 'bonding with a horse', 'gain horse trust'],
    category: 'practical',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>rust between a human and a horse is not a feeling. It is a behavior. And like all behavior, it is built through repetition — through a thousand small moments where you did what you said you would, where you did not punish what you could not understand.</p>
      <p>The first step: stop trying to earn trust and start being trustworthy. Trying to earn trust often looks like pressure — pushing the horse to come closer, to accept what it is not yet ready to accept. Being trustworthy requires only one thing: consistency. The horse that sees the same person every time learns that this person is safe.</p>`},
      { type: 'section', heading: 'Step One: Be Worth Approaching', sub: 'Before the horse will come to you, you must become a place worth coming to.' },
      { type: 'text', html: `<p><span class="rd-dropcap">S</span>tand sideways rather than facing the horse directly. Drop your eyes slightly. Breathe slowly. Let your weight settle. Do nothing. Ask for nothing. Want nothing for this moment. Simply be a quiet presence. Wait. The horse will eventually decide to walk toward you. When it does, let it come. Do not lean forward to meet it. Let it close the last distance itself.</p>
      <p>The horse that comes to you because you stopped demanding that it should — that first step is worth a hundred training sessions.</p>`},
      { type: 'section', heading: 'Step Two: Be the Same Person Every Time', sub: 'Predictability is the most reassuring thing in the world to a horse.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he deepest trust is built through the accumulated experience of being the same — reliably, consistently, without exception. The horse that knows who it is dealing with every time can relax. Unpredictability is, to a prey animal, one of the most threatening qualities a creature can have.</p>
      <p>You can have bad days. The horse understands that your energy changes. What it needs to know is that your core intent toward it never wavers. You are always safe. You are always fair. You will always listen.</p>
      <p>Be the same person every time. In the end, that is the whole of it. Consistent, honest, patient. The horse will do the rest.</p>`}
    ]
  },
  // ===== ARTICLE 7 =====
  {
    label: 'Practical VII',
    title: 'Why Your Horse Does Not Listen to You',
    tagline: 'A horse that will not listen is not defying you. It is talking to you.',
    keywords: ['horse not listening', 'why horse ignores commands', 'horse training problems'],
    category: 'practical',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">W</span>hen a horse stops listening, the natural human response is to push harder. This is the most natural thing in the world to do. And it is almost always wrong.</p>
      <p>A horse that is not listening is not defying you. It is telling you something. It is saying: I do not understand. Or: I am not ready. Or: I am in pain. Or: I do not trust that what happens next will be safe. These are honest messages from an animal that cannot use words.</p>`},
      { type: 'section', heading: 'The Clarity Problem', sub: 'Make sure you are actually communicating.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he most common reason a horse does not respond is that it does not understand what is being asked. Yet most people, when their horse does not respond, repeat the exact same signal with more force.</p>
      <p>Horses learn through the release of pressure. When you apply a signal and the horse offers any movement toward the answer, releasing the pressure in that moment teaches the horse that the movement was correct. If you continue the pressure through the movement, the horse learns nothing.</p>
      <p>If the horse is not responding, the first suspect is never the horse. It is the clarity of what you are asking.</p>`},
      { type: 'section', heading: 'The Trust Problem', sub: 'A horse that stops trusting enough to try is not a problem to be fixed.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he third reason horses stop listening requires the most honest self-reflection: there is not enough trust in the relationship for the horse to try something uncertain. This horse knows what happens when it tries and gets it wrong. It has learned that mistakes bring pressure, confusion, or punishment.</p>
      <p>This horse needs less training and more relationship. It needs sessions about confirming old things it knows well. It needs to rebuild its confidence in the act of trying, to rediscover that effort is safe.</p>
      <p>A horse that stops trusting enough to try is an invitation to become a person worthy of being trusted.</p>`}
    ]
  },
  // ===== ARTICLE 8 =====
  {
    label: 'Practical VIII',
    title: 'How to Calm a Nervous or Anxious Horse',
    tagline: 'You cannot fight a nervous system. You can only offer it something steadier.',
    keywords: ['how to calm a horse', 'anxious horse behavior', 'nervous horse training'],
    category: 'practical',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">Y</span>ou cannot calm a horse by fighting its nervous system. The moment you escalate — raising your voice, tightening your grip, moving faster — you confirm what the horse already feared. Something dangerous is happening. The proof is right there in the person standing beside it.</p>
      <p>To calm an anxious horse, you must first calm yourself. Horses do not respond to reassuring words. They respond to calm bodies. Your breath rate, your muscle tension, the quality of your stillness — these are the real messages you are sending.</p>`},
      { type: 'section', heading: 'The Practical Techniques', sub: 'Simple tools that work — not to suppress fear, but to give the nervous system something steady.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he most powerful tool is stillness. Not a frozen, tense stillness, but genuine, warm, grounded stillness. The kind that says: I am not going anywhere. Nothing is required right now. This is simply a moment of being.</p>
      <p>When a horse is escalating, move less, not more. Soften your body from the inside out. Breathe in a rhythm that is slower than the horse's current rhythm. Do not demand anything. Simply occupy the space beside the horse with a quality of presence that is genuinely relaxed. Over time, the horse's nervous system will begin to match yours.</p>
      <p>Give the anxious horse something steadier than its own fear to attach to. That is all it is looking for. Become that thing.</p>`}
    ]
  },
  // ===== ARTICLE 9 =====
  {
    label: 'Practical IX',
    title: 'First Time Handling a Horse',
    tagline: 'There is no second first meeting. What you bring to that moment, the horse will remember.',
    keywords: ['first time horse tips', 'horse safety basics', 'beginner horse handling'],
    category: 'practical',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he first impression you make on a horse is written in its memory with a permanence no later session can fully erase. There is no second first meeting. Everything you bring — your speed, your energy, the tension in your hands — the horse will carry forward into every interaction that follows.</p>
      <p>Never walk straight at a horse from the front with direct eye contact. This is predator behavior. Walk at an angle. Let your approach be curved. Move at a pace that is slower than your habitual pace. As if you have nowhere more important to be than exactly where you are right now.</p>`},
      { type: 'section', heading: 'The First Touch', sub: 'Your hands are the first language you speak with a horse.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he first time your hand touches a horse, it is a statement about everything that will follow. A hand that is tense communicates tension. A hand that grabs communicates urgency. A hand that is soft, warm, and genuinely alive communicates that this person is paying attention.</p>
      <p>Touch the neck first. The neck and shoulder are where horses make mutual contact. A slow, confident stroke along the neck — not patting, which horses find less comfortable. Watch the response. Does the horse soften toward the touch? Does the head lower? Does a sigh escape? Listen to the response and adjust.</p>
      <p>The hand that listens to the horse's response is the hand the horse will learn to trust. And a horse that trusts your hands will eventually trust your direction. That is not a small thing. That is everything.</p>`}
    ]
  },
  // ===== ARTICLE 10 =====
  {
    label: 'Practical X',
    title: 'Signs Your Horse Trusts You (And Signs It Does Not)',
    tagline: 'Trust in a horse is not invisible. It is a behavior. And behavior can be read.',
    keywords: ['signs a horse trusts you', 'horse bonding signs', 'horse trust behavior'],
    category: 'practical',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">A</span> horse's trust is not invisible. It is not a feeling you guess at. Trust is a behavior. And behavior is visible, readable, and honest. When you know what to look for, you will never again wonder whether you have real connection or simply a working arrangement.</p>
      <p>The clearest sign of trust is voluntary approach. A horse that trusts you does not need to be caught. When you enter the field, it comes to you — not for food, but because your presence is comfortable and wanted. This is the horse voting with its feet.</p>
      <p>The second sign is the quality of relaxation in your presence. A horse that trusts you will lower its head when you are near — a gesture of complete physical relaxation from an animal whose survival depends on keeping its head up. The lowered head is a deep exhale. It means: I am safe here. You are enough.</p>`},
      { type: 'quote', text: 'The horse that lowers its head as you approach is making itself vulnerable to you. Understand what that costs a prey animal, and you will understand what trust means.' },
      { type: 'section', heading: 'Signs That Trust Is Missing', sub: 'These are not bad horses. They need more reason to trust.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he horse that moves away when you enter the field has not found your approach to be something worth staying for. The horse that is tense throughout a session is a horse whose nervous system has not found yours to be a source of regulation.</p>
      <p>None of these signs are verdicts. They are information. They tell you where the relationship currently is. Every horse has the capacity for real trust — it simply needs enough of the right experiences to build it.</p>`}
    ]
  },
  // ===== ARTICLE 11 =====
  {
    label: 'Unique Edge XI',
    title: 'What Horses Teach Us About Human Behavior',
    tagline: 'Spend enough time with horses and you will learn more about yourself than any mirror can show.',
    keywords: ['what horses teach humans', 'lessons from horses', 'horse psychology humans'],
    category: 'edge',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">A</span> horse has no ego. It has no agenda beyond what is real right now. It cannot pretend. It can only respond to what is genuinely present. Spend enough time with horses and you will learn more about your real self than any other method of self-understanding can offer.</p>
      <p>The horse does not see the performance. It sees what is underneath. It reads the stress in your body, the tiny tensions in your muscles, the quality of your breath. Everything you have learned to hide from other humans, the horse has already read. And then it shows you — honestly, without judgment — exactly who walked in.</p>`},
      { type: 'section', heading: 'The Mirror You Cannot Lie To', sub: 'The horse reflects back not who you think you are, but who you actually are.' },
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>he person who insists they are patient until the horse reveals that they are not. The person who believes they are calm until the horse shows them how much they are holding. The horse cannot be convinced to see what is not there. It simply responds to what is actually present.</p>
      <p>The people who grow most from their time with horses are the ones who learn to ask: what is the horse showing me about myself right now? This shift — from judgment of the horse to curiosity about oneself — is the moment horsemanship becomes something larger than a skill. It becomes a genuine practice of self-knowledge.</p>
      <p>The horse does not ask you to be wise. It asks you to be here. And here, when you finally arrive, turns out to be enough.</p>`}
    ]
  },
  // ===== ARTICLE 12 =====
  {
    label: 'Unique Edge XII',
    title: 'To Feel What a Horse Feels: Presence and Intention',
    tagline: 'Horses live where most humans only visit — fully inside the present moment.',
    keywords: ['horse sensitivity to humans', 'connection with horses', 'horse energy intention'],
    category: 'edge',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">P</span>resence is not a concept. It is a physical reality — the quality of being fully here, fully alive, fully available to what is happening in this exact moment. Horses live in presence permanently. It is not something they achieve. It is simply what they are.</p>
      <p>Most humans have lost the ability to do this. We are almost never fully here. We are partly in the meeting we just left, partly in the obligation ahead. We bring all of this into the arena. The horse feels every bit of it. As real, physical, readable information.</p>`},
      { type: 'section', heading: 'Intention as a Physical Force', sub: 'Your intention broadcasts before your action. The horse has already received the message.' },
      { type: 'text', html: `<p><span class="rd-dropcap">I</span>ntention is not private. Every time you form a plan to move, your body begins preparing itself before the conscious action occurs. Muscles engage subtly. Weight shifts. Breath changes. To a horse, these micro-signals are as readable as speech.</p>
      <p>This is why skilled horsemen often appear almost telepathic — the horse responds before the visible signal has been given. The horse is reading the intention in the body before the body has completed the action.</p>
      <p>Before your hand moves, your mind has already moved. The horse felt it first. Your job is to make sure that what it felt was worth feeling.</p>`}
    ]
  },
  // ===== ARTICLE 13 =====
  {
    label: 'Unique Edge XIII',
    title: 'Why Horses React to Your Mind and Not Just Your Actions',
    tagline: 'Before your hand moves, your mind has already moved. The horse felt it first.',
    keywords: ['do horses sense emotions', 'horse reaction to humans', 'horse awareness'],
    category: 'edge',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">B</span>efore your hand moves, your mind has already moved. Before your leg gives the signal, your intention has already broadcast itself through every muscle in your body. A horse does not wait for the action. It reads the intention. By the time you have done something, the horse has already felt it coming.</p>
      <p>This is not telepathy. This is the horse's extraordinary ability to read the tiny signals of a human body with a precision our conscious mind cannot match. When you think about stopping, your body prepares to stop. The horse registers it.</p>`},
      { type: 'section', heading: 'Training Your Inner Life', sub: 'The most important work happens before you pick up the rope.' },
      { type: 'text', html: `<p><span class="rd-dropcap">I</span>f the horse responds to your inner state before it responds to your actions, then improving your inner state is improving your horsemanship.</p>
      <p>The first practice is learning to feel yourself. Most people do not notice that their jaw is clenched, that their shoulders are up, that they have been holding their breath. Before you can manage what you broadcast to the horse, you must be able to feel what you are broadcasting.</p>
      <p>The second practice is developing the ability to change your inner state deliberately. Not to pretend calm, but to generate it. Slow breathing. Deliberate release of tension. The conscious decision to drop the agenda and simply be present.</p>
      <p>The horse you ride is a portrait of your inner life on that day. If you want a different portrait, change the painter.</p>`}
    ]
  },
  // ===== ARTICLE 14 =====
  {
    label: 'Unique Edge XIV',
    title: 'Silence, Energy, and Movement: The Language Horses Understand',
    tagline: 'There is a language older than words. Horses speak it fluently.',
    keywords: ['horse communication', 'how horses communicate', 'non verbal communication'],
    category: 'edge',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>here is a language older than any human tongue. It came before writing, before the moment our species decided everything important must be named. Horses speak it fluently. Most humans have forgotten it exists. Those who work well with horses have simply remembered how to listen.</p>
      <p>This language is made of silence — the quality of stillness, the difference between an animal at rest and a predator waiting to strike. It is made of energy — the felt sense of aliveness in a body, the direction of attention. It is made of movement — not just direction and speed, but the weight and intention behind every step.</p>`},
      { type: 'section', heading: 'The Language of Silence', sub: 'What you do not do speaks as loudly as what you do.' },
      { type: 'text', html: `<p><span class="rd-dropcap">S</span>ilence with horses is active. It is not the absence of communication — it is one of the most powerful forms of it. When you stand beside a horse and do nothing, you are saying: I have no demands right now. There is no pressure. This moment belongs to you.</p>
      <p>In the pause between asking and asking again is where the horse finds what it needs to try differently. Do not fill every silence. Some silences are doing the most important work.</p>
      <p>Move as if you know where you are going. Not fast. Not urgently. Simply with weight and direction and the quiet certainty of someone who has arrived. The horse will follow that.</p>`}
    ]
  },
  // ===== ARTICLE 15 =====
  {
    label: 'Unique Edge XV',
    title: 'The Philosophy of Working with Horses and Not Against Them',
    tagline: 'There are two ways to work with a horse. Only one of them is real.',
    keywords: ['natural horsemanship philosophy', 'working with horses not against', 'ethical horse training'],
    category: 'edge',
    pages: [
      { type: 'text', html: `<p><span class="rd-dropcap">T</span>here are two ways to work with a horse. They look similar from the outside. But from inside the horse, they feel completely different. And the horse always knows the difference.</p>
      <p>The first way is the way of control. Its foundation is the human's agenda. The horse learns to manage its life within the edges of what is permitted. It may be content. But it is not free.</p>
      <p>The second way is the way of real partnership. It begins not with what you want the horse to do, but with understanding what the horse is. It asks for more curiosity than certainty, more listening than instruction. It produces a horse that is not performing for you — it is participating with you.</p>`},
      { type: 'section', heading: 'The Life That Horses Offer', sub: 'This is not just about better horsemanship. It is about a better way of being in the world.' },
      { type: 'text', html: `<p><span class="rd-dropcap">I</span> did not come to horses because I wanted to ride. I came to them because I was looking for something more honest than most of what the human world offered. I found it in ten thousand mornings in a field, with an animal that showed me, patiently and without judgment, exactly who I was that day and exactly how much distance there was between who I was and who I wanted to become.</p>
      <p>Horses have taught me to be still. They have taught me that my inner state is not private. They have taught me that real communication requires real listening. They have taught me that trust is built slowly, through a thousand small acts of consistency.</p>
      <p>The horse does not know it is teaching you. It is simply being honest. But if you are paying attention, that honesty will change you. And a person changed by a horse is changed for the better, in ways that go far beyond the field.</p>`}
    ]
  }
];

// ============================================================
// RENDER BOOKS TO GRID
// ============================================================

function renderBooksGrid() {
  const booksGrid = document.getElementById('booksGrid');
  if (!booksGrid) return;
  
  const icons = ['🐴', '🐎', '📖', '🔮', '✨', '🌟', '🍃', '🌙', '⚡', '💫', '🕯️', '📜', '🏔️', '🌊', '🔥'];
  
  booksGrid.innerHTML = '';
  
  articles.forEach((article, index) => {
    const bookCard = document.createElement('div');
    bookCard.className = 'book-card';
    bookCard.setAttribute('data-category', article.category);
    bookCard.setAttribute('data-index', index);
    
    const shortTitle = article.title.length > 55 ? article.title.substring(0, 52) + '...' : article.title;
    
    bookCard.innerHTML = `
      <div class="book-cover">
        <div class="book-category">${article.label}</div>
        <div class="book-icon">${icons[index % icons.length]}</div>
        <div class="book-number">${String(index + 1).padStart(2, '0')}</div>
      </div>
      <div class="book-info">
        <div class="book-title">${shortTitle}</div>
        <div class="book-excerpt">${article.tagline}</div>
        <div class="book-read">Read Article</div>
      </div>
    `;
    
    bookCard.addEventListener('click', () => openArticleModal(index));
    booksGrid.appendChild(bookCard);
  });
  
  // Reveal animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.book-card').forEach(card => observer.observe(card));
}

// ============================================================
// BUILD ARTICLE HTML FROM PAGES
// ============================================================

function buildArticleHTML(article) {
  let html = `
    <div class="article-label">${article.label}</div>
    <div class="article-title">${article.title}</div>
    <div class="article-tagline">${article.tagline}</div>
    <div class="article-keywords">
      ${article.keywords.map(kw => `<span class="article-kw">${kw}</span>`).join('')}
    </div>
  `;
  
  article.pages.forEach(page => {
    if (page.type === 'text') {
      html += `<div class="article-section">${page.html}</div>`;
    }
    if (page.type === 'section') {
      html += `
        <div class="section-heading">${page.heading}</div>
        <div class="section-sub">${page.sub}</div>
      `;
    }
    if (page.type === 'quote') {
      html += `<div class="blockquote">${page.text}</div>`;
    }
  });
  
  html += `
    <div class="article-footer">
      The Horseman's Journal · Praveen Kumar
    </div>
  `;
  
  return html;
}

// ============================================================
// MODAL FUNCTIONS
// ============================================================

const modal = document.getElementById('articleModal');
const modalContent = document.getElementById('modalContent');
const modalClose = document.getElementById('modalClose');

function openArticleModal(index) {
  const article = articles[index];
  if (!article) return;
  
  modalContent.innerHTML = buildArticleHTML(article);
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeArticleModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalClose) {
  modalClose.addEventListener('click', closeArticleModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeArticleModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
    closeArticleModal();
  }
});

// ============================================================
// FILTER FUNCTIONALITY
// ============================================================

const filterBtns = document.querySelectorAll('.chr-filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    document.querySelectorAll('.book-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
    
    closeArticleModal();
  });
});

// ============================================================
// INITIALIZE
// ============================================================

renderBooksGrid();

console.log('Chronicles loaded: 15 complete articles with 4 animated 3D horses');
