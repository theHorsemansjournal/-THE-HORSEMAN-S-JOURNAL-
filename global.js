// The Horseman's Journal - Global JavaScript
// Canvas animation, lantern navigation, and interactive elements

(function() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const canvas = document.getElementById('worldCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let W, H, mx = 0.5, my = 0.5, t = 0;
        
        // Resize handler
        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => {
            mx = e.clientX / W;
            my = e.clientY / H;
        });
        
        // Generate stars
        const stars = Array.from({length: 350}, () => ({
            x: Math.random(), y: Math.random() * 0.55,
            r: Math.random() * 1.6 + 0.2, sp: Math.random() * 0.018 + 0.004,
            off: Math.random() * Math.PI * 2, ba: Math.random() * 0.65 + 0.2
        }));
        
        // Generate grass
        const grass = Array.from({length: 600}, () => ({
            x: Math.random(), by: 0.68 + Math.random() * 0.32,
            h: Math.random() * 35 + 10, sp: Math.random() * 0.018 + 0.004,
            off: Math.random() * Math.PI * 2
        }));
        
        // Generate fireflies
        const flies = Array.from({length: 45}, () => ({
            x: Math.random(), y: 0.68 + Math.random() * 0.28,
            r: Math.random() * 1.4 + 0.4, sp: Math.random() * 0.25 + 0.08,
            ph: Math.random() * Math.PI * 2, dx: (Math.random() - 0.5) * 0.4, dy: (Math.random() - 0.5) * 0.25
        }));
        
        // Horse drawing function
        function horse(hx, hy, sc, coat, mane, pose, flip) {
            ctx.save();
            ctx.translate(hx, hy);
            if (flip) ctx.scale(-sc, sc);
            else ctx.scale(sc, sc);
            
            const br = Math.sin(t * 0.018 + hx * 0.01) * 1.5;
            
            if (pose === 'sentinel') {
                ctx.fillStyle = coat;
                [-15, -3, 7, 17].forEach((lx, i) => ctx.fillRect(lx, 14, 4, 24));
                ctx.beginPath();
                ctx.ellipse(0, 4, 28, 13, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(18, 0);
                ctx.quadraticCurveTo(28, -28, 24, -40);
                ctx.quadraticCurveTo(18, -28, 8, -2);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(24, -42, 8, 5, -0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(24, -46);
                ctx.lineTo(22, -54);
                ctx.lineTo(20, -46);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(26, -46);
                ctx.lineTo(28, -54);
                ctx.lineTo(26, -46);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(18, -4);
                ctx.quadraticCurveTo(22, -18, 26, -32);
                ctx.stroke();
                const ts = Math.sin(t * 0.025) * 2;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(-26, 2);
                ctx.quadraticCurveTo(-34, -5, -32 + ts, -14);
                ctx.stroke();
            } else if (pose === 'foreground') {
                ctx.fillStyle = coat;
                [-18, -4, 8, 20].forEach((lx, i) => ctx.fillRect(lx, 12, 5, 28));
                ctx.beginPath();
                ctx.ellipse(0, 3, 34, 16, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(22, -1);
                ctx.quadraticCurveTo(34, -32, 28, -46);
                ctx.quadraticCurveTo(20, -32, 10, -4);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(28, -48, 10, 6, -0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(28, -53);
                ctx.lineTo(25, -62);
                ctx.lineTo(22, -53);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(30, -53);
                ctx.lineTo(33, -62);
                ctx.lineTo(30, -53);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(22, -5);
                ctx.quadraticCurveTo(28, -22, 32, -38);
                ctx.stroke();
                const ts = Math.sin(t * 0.022) * 2.5;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-32, 1);
                ctx.quadraticCurveTo(-42, -6, -38 + ts, -16);
                ctx.stroke();
            } else if (pose === 'nuzzle') {
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach((lx, i) => ctx.fillRect(lx, 16 + (i % 2 ? br : -br), 4, 20));
                ctx.beginPath();
                ctx.ellipse(0, 5, 26, 12, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(16, 1);
                ctx.quadraticCurveTo(28, -14, 26, -24);
                ctx.quadraticCurveTo(18, -18, 6, 3);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(26, -26, 7, 5, -0.15, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(26, -30);
                ctx.lineTo(25, -37);
                ctx.lineTo(23, -30);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(16, -2);
                ctx.quadraticCurveTo(20, -10, 24, -20);
                ctx.stroke();
                const ts = Math.sin(t * 0.02) * 2;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(-24, 3);
                ctx.quadraticCurveTo(-30, -4, -28 + ts, -12);
                ctx.stroke();
            } else {
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach((lx, i) => ctx.fillRect(lx, 16 + (i % 2 ? br : -br), 4, 20));
                ctx.beginPath();
                ctx.ellipse(0, 5, 28, 13, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(18, 1);
                ctx.quadraticCurveTo(32, 12, 26, 26);
                ctx.quadraticCurveTo(18, 20, 7, 3);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(28, 30, 8, 5, 0.25, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(30, 25);
                ctx.lineTo(32, 19);
                ctx.lineTo(27, 24);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(27, 26);
                ctx.lineTo(25, 20);
                ctx.lineTo(24, 26);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(18, -3);
                ctx.quadraticCurveTo(24, 6, 28, 18);
                ctx.stroke();
                const ts = Math.sin(t * 0.025 + hx * 0.03) * 3;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(-26, 3);
                ctx.quadraticCurveTo(-34, -3, -32 + ts, -12);
                ctx.stroke();
            }
            ctx.restore();
        }
        
        // Herd configuration
        const herd = [
            { x: 0.06, y: 0.83, s: 0.88, coat: '#0d0a0e', mane: '#1a1418', pose: 'sentinel', flip: false },
            { x: 0.18, y: 0.85, s: 0.70, coat: '#2a1a12', mane: '#3a2818', pose: 'graze', flip: false },
            { x: 0.30, y: 0.82, s: 0.78, coat: '#1a1618', mane: '#2a2428', pose: 'graze', flip: true },
            { x: 0.42, y: 0.84, s: 0.55, coat: '#3a2818', mane: '#4a3020', pose: 'graze', flip: false },
            { x: 0.50, y: 0.83, s: 0.72, coat: '#4a3222', mane: '#5a3e2a', pose: 'nuzzle', flip: false },
            { x: 0.56, y: 0.84, s: 0.68, coat: '#3a3035', mane: '#4a4045', pose: 'nuzzle', flip: true },
            { x: 0.68, y: 0.83, s: 0.85, coat: '#5a4828', mane: '#6a5530', pose: 'graze', flip: false },
            { x: 0.82, y: 0.85, s: 0.75, coat: '#141018', mane: '#221e26', pose: 'graze', flip: false },
            { x: 0.90, y: 0.78, s: 1.50, coat: '#080608', mane: '#141018', pose: 'foreground', flip: true },
            { x: 0.10, y: 0.79, s: 1.40, coat: '#1a0e08', mane: '#2a1a10', pose: 'foreground', flip: false },
        ];
        
        // Sections for lanterns
        const sections = [
            { name: 'Genesis', color: '#c8922a', lx: 0.16, ly: 0.44, depth: 0.6 },
            { name: 'Awakening', color: '#c97a8a', lx: 0.34, ly: 0.38, depth: 0.7 },
            { name: 'Chronicles', color: '#b8860b', lx: 0.52, ly: 0.34, depth: 0.8 },
            { name: 'Companions', color: '#8b7a3a', lx: 0.68, ly: 0.38, depth: 0.65 },
            { name: 'Verses', color: '#a080d0', lx: 0.82, ly: 0.42, depth: 0.55 },
            { name: 'Questions', color: '#c8963a', lx: 0.90, ly: 0.48, depth: 0.5 },
        ];
        
        const pageMap = ['genesis.html', 'awakening.html', 'chronicles.html', 'companions.html', 'essays.html', 'questions.html'];
        
        // Create lantern elements
        const lanternsDiv = document.getElementById('lanterns');
        const lanternEls = [];
        
        if (lanternsDiv) {
            sections.forEach((s, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:absolute;z-index:8;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);`;
                el.innerHTML = `<div class="lantern-glow" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:20px;height:28px;border-radius:12px 12px 6px 6px;background:radial-gradient(circle at 50% 40%,rgba(255,240,200,0.5),${s.color} 70%,rgba(0,0,0,0.6) 100%);box-shadow:0 0 18px ${s.color},0 0 40px ${s.color}44;animation:lanternBob ${3 + i * 0.4}s ease-in-out infinite;transition:box-shadow .4s,filter .4s;"></div><div style="position:absolute;top:26px;left:50%;transform:translateX(-50%);width:2px;height:10px;background:rgba(200,180,150,0.4);"></div><div style="position:absolute;top:34px;left:50%;transform:translateX(-50%);width:1px;height:16px;background:rgba(200,180,150,0.2);"></div><div class="lantern-label" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .35s;white-space:nowrap;"><span style="font-family:'Cinzel',serif;font-size:.58rem;font-weight:600;letter-spacing:2px;color:#E8C84A;display:block;">${s.name}</span></div>`;
                
                const glowEl = el.querySelector('.lantern-glow');
                const labelEl = el.querySelector('.lantern-label');
                
                el.addEventListener('mouseenter', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 35px ${s.color},0 0 70px ${s.color},0 0 100px ${s.color}66`;
                        glowEl.style.filter = 'brightness(1.5)';
                    }
                    if (labelEl) labelEl.style.opacity = '1';
                });
                
                el.addEventListener('mouseleave', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 18px ${s.color},0 0 40px ${s.color}44`;
                        glowEl.style.filter = 'brightness(1)';
                    }
                    if (labelEl) labelEl.style.opacity = '0';
                });
                
                el.addEventListener('click', () => {
                    location.href = pageMap[i];
                });
                
                lanternsDiv.appendChild(el);
                lanternEls.push({ el, s });
            });
        }
        
        // Main render function
        function render() {
            ctx.clearRect(0, 0, W, H);
            
            // Sky gradient
            const sg = ctx.createLinearGradient(0, 0, 0, H);
            sg.addColorStop(0, '#020108');
            sg.addColorStop(0.3, '#04031a');
            sg.addColorStop(0.55, '#070522');
            sg.addColorStop(0.72, '#0a0824');
            sg.addColorStop(1, '#0c0a1c');
            ctx.fillStyle = sg;
            ctx.fillRect(0, 0, W, H);
            
            // Atmospheric bands
            const ax = W * 0.45, ay = H * 0.2;
            for (let b = 0; b < 5; b++) {
                const bandY = ay + b * 35, bandAlpha = 0.04 - b * 0.006;
                const bandGrad = ctx.createLinearGradient(0, bandY, 0, bandY + 60);
                bandGrad.addColorStop(0, 'rgba(100,180,160,' + bandAlpha + ')');
                bandGrad.addColorStop(0.3, 'rgba(160,120,200,' + bandAlpha + ')');
                bandGrad.addColorStop(0.6, 'rgba(80,140,180,' + bandAlpha + ')');
                bandGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = bandGrad;
                ctx.beginPath();
                ctx.moveTo(0, bandY - 20);
                for (let i = 0; i <= 80; i++) {
                    const nx = i / 80;
                    ctx.lineTo(nx * W, bandY + Math.sin(nx * 4 + t * 0.008 + b * 1.5) * 25 + Math.sin(nx * 7 + t * 0.012) * 15);
                }
                ctx.lineTo(W, bandY + 60);
                ctx.lineTo(0, bandY + 60);
                ctx.closePath();
                ctx.fill();
            }
            
            // Moon
            const moonX = W * 0.78, moonY = H * 0.16;
            const moonGrad = ctx.createRadialGradient(moonX, moonY, 20, moonX, moonY, 120);
            moonGrad.addColorStop(0, 'rgba(255,252,240,0.6)');
            moonGrad.addColorStop(0.25, 'rgba(255,252,240,0.25)');
            moonGrad.addColorStop(0.5, 'rgba(220,210,180,0.06)');
            moonGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = moonGrad;
            ctx.beginPath();
            ctx.arc(moonX, moonY, 120, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = 'rgba(255,252,240,0.85)';
            ctx.shadowColor = 'rgba(255,252,240,0.5)';
            ctx.shadowBlur = 40;
            ctx.beginPath();
            ctx.arc(moonX, moonY, 32, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            
            // Stars
            stars.forEach(s => {
                const tw = Math.sin(t * s.sp + s.off) * 0.3 + 0.7;
                ctx.fillStyle = 'rgba(255,255,255,' + (s.ba * tw) + ')';
                ctx.shadowColor = 'rgba(255,255,255,' + (s.ba * tw * 0.3) + ')';
                ctx.shadowBlur = s.r;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.r * tw, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });
            
            // Distant ground
            ctx.fillStyle = 'rgba(6,4,16,0.8)';
            ctx.beginPath();
            ctx.moveTo(0, H * 0.66);
            for (let i = 0; i <= 60; i++) {
                const nx = i / 60;
                ctx.lineTo(nx * W, H * 0.62 - Math.sin(nx * 3.5) * H * 0.018 - Math.sin(nx * 7.2) * H * 0.012);
            }
            ctx.lineTo(W, H * 0.66);
            ctx.closePath();
            ctx.fill();
            
            // Ground layers
            ['#0a0718', '#0c0920', '#0e0b22'].forEach((col, i) => {
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(0, H);
                for (let j = 0; j <= 80; j++) {
                    const nx = j / 80;
                    ctx.lineTo(nx * W, H * (0.72 + i * 0.06 - Math.sin(nx * (2 + i * 1.2) + i) * 0.04 - Math.sin(nx * (5 + i * 2)) * 0.02));
                }
                ctx.lineTo(W, H);
                ctx.closePath();
                ctx.fill();
            });
            
            // Lake reflection
            const lakeY = H * 0.74;
            const lakeGrad = ctx.createLinearGradient(0, lakeY, 0, lakeY + H * 0.04);
            lakeGrad.addColorStop(0, 'rgba(15,20,40,0.5)');
            lakeGrad.addColorStop(0.5, 'rgba(12,15,30,0.3)');
            lakeGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = lakeGrad;
            ctx.fillRect(0, lakeY, W, H * 0.04);
            
            for (let i = 0; i < 50; i++) {
                ctx.fillStyle = 'rgba(255,255,255,' + (0.06 * (0.5 + 0.5 * Math.sin(t * 0.025 + i))) + ')';
                ctx.beginPath();
                ctx.arc((Math.sin(i * 127.3) * 0.5 + 0.5) * W, lakeY + 2 + Math.random() * H * 0.02, 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Mist
            const mistGrad = ctx.createLinearGradient(0, H * 0.76, 0, H);
            mistGrad.addColorStop(0, 'rgba(20,18,35,0)');
            mistGrad.addColorStop(0.5, 'rgba(20,18,35,0.15)');
            mistGrad.addColorStop(1, 'rgba(20,18,35,0.35)');
            ctx.fillStyle = mistGrad;
            ctx.fillRect(0, H * 0.76, W, H * 0.24);
            
            // Grass
            grass.forEach(g => {
                const sw = Math.sin(t * g.sp + g.off) * 7;
                const gr = 16 + Math.floor(Math.sin(g.x * 0.3) * 8);
                ctx.strokeStyle = 'rgba(' + (10 + Math.floor(Math.random() * 5)) + ',' + gr + ',8,' + (0.2 + Math.sin(t * 0.012 + g.off) * 0.1) + ')';
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(g.x * W, g.by * H);
                ctx.quadraticCurveTo(g.x * W + sw * 0.4, g.by * H - g.h * 0.5, g.x * W + sw, g.by * H - g.h);
                ctx.stroke();
            });
            
            // Background herd
            herd.filter(h => h.pose !== 'foreground').forEach(h => {
                horse(h.x * W + (mx - 0.5) * 35 * h.s, h.y * H + (my - 0.5) * 12 * h.s, h.s, h.coat, h.mane, h.pose, h.flip);
            });
            
            // Fireflies
            flies.forEach(f => {
                f.x += Math.sin(t * 0.02 + f.ph) * f.dx;
                f.y += Math.cos(t * 0.022 + f.ph) * f.dy;
                f.x = ((f.x % 1) + 1) % 1;
                f.y = Math.max(0.66, Math.min(0.98, f.y));
                const a = Math.abs(Math.sin(t * f.sp + f.ph)) * 0.5;
                ctx.fillStyle = 'rgba(220,255,180,' + a + ')';
                ctx.shadowColor = 'rgba(180,255,120,' + (a * 0.5) + ')';
                ctx.shadowBlur = 5;
                ctx.beginPath();
                ctx.arc(f.x * W, f.y * H, f.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            });
            
            // Light pools under lanterns
            sections.forEach(s => {
                const lx = s.lx * W + (mx - 0.5) * 20 * s.depth;
                const ly = s.ly * H + (my - 0.5) * 10 * s.depth;
                const poolGrad = ctx.createRadialGradient(lx, ly + 30, 5, lx, ly + 30, 80);
                poolGrad.addColorStop(0, s.color + '22');
                poolGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = poolGrad;
                ctx.beginPath();
                ctx.arc(lx, ly + 30, 80, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Foreground horses
            herd.filter(h => h.pose === 'foreground').forEach(h => {
                horse(h.x * W + (mx - 0.5) * 50, h.y * H + (my - 0.5) * 18, h.s, h.coat, h.mane, h.pose, h.flip);
            });
        }
        
        // Update lantern positions
        function updateLanterns() {
            lanternEls.forEach(({ el, s }) => {
                const px = (mx - 0.5) * 25 * s.depth;
                const py = (my - 0.5) * 14 * s.depth;
                el.style.left = (s.lx * 100) + '%';
                el.style.top = (s.ly * 100) + '%';
                el.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`;
            });
        }
        
        // Create hall particles
        const hallParticles = document.getElementById('hallParticles');
        if (hallParticles) {
            for (let i = 0; i < 30; i++) {
                const p = document.createElement('div');
                p.className = 'hall-bg-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDuration = (Math.random() * 10 + 8) + 's';
                p.style.animationDelay = Math.random() * 10 + 's';
                hallParticles.appendChild(p);
            }
        }
        
        // Title/hint fade based on mouse activity
        const titleOverlay = document.getElementById('titleOverlay');
        const hintOverlay = document.getElementById('hintOverlay');
        let lastMove = 0;
        
        window.addEventListener('mousemove', () => {
            lastMove = t;
        });
        
        // Animation loop
        function animate() {
            t++;
            render();
            updateLanterns();
            
            const idle = t - lastMove > 200;
            if (titleOverlay) titleOverlay.style.opacity = idle ? '0.3' : '0.9';
            if (hintOverlay) hintOverlay.style.opacity = idle ? '0' : '0.7';
            
            requestAnimationFrame(animate);
        }
        
        animate();
        window.addEventListener('resize', () => {
            resize();
        });
    }
})();
// ============================================================
// ARTICLE 6 — How to Build Trust (Step by Step)
// ============================================================
{
  label: 'Practical Article VI',
  title: 'How to Build Trust with a Horse (Step by Step Guide)',
  tagline: 'Trust is not a feeling. It is a thousand small promises kept.',
  keywords: ['how to build trust with a horse', 'bonding with a horse', 'gain horse trust'],
  category: 'practical',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">T</span>rust between a human and a horse is not a feeling. It is a behavior. And like all behavior, it is built through repetition — through a thousand small moments where you did what you said you would, where you did not punish what you could not understand, where you stayed when it would have been easier to leave.</p>
      <p>The first step is deceptively simple: stop trying to earn trust and start being trustworthy. Those are not the same thing. Trying to earn trust often looks like pressure — pushing the horse to respond, to come closer, to accept what it is not yet ready to accept, because you want to see the evidence of the relationship today. Being trustworthy requires only one thing: consistency. The horse that sees the same person every single time, no matter how the session is going, learns that this person is safe. And safety is the only foundation on which anything else can be built.</p>
      <p>Trust is built in layers. The first layer is physical safety — the horse learning that you will not hurt it. The second is emotional safety — the horse learning that you will not overwhelm it. The third is relational safety — the horse learning that what happens between you is fair, and that its communication will be heard. Each layer takes time. Each layer must be genuinely established before the next one is possible. You cannot rush this. The horse knows when you are trying to shortcut it. And every shortcut costs more time than it saves.</p>
    `},
    { type: 'section', heading: 'Step One: Be Worth Approaching', sub: 'Before the horse will come to you, you must become a place worth coming to.' },
    { type: 'text', section: 'Step One: Be Worth Approaching', html: `
      <p><span class="rd-dropcap">T</span>he first concrete step is learning to stand in a way that is genuinely inviting rather than merely nonthreatening. These are different. A human standing perfectly still can still radiate intensity, urgency, or desire — all of which a horse reads as pressure. The horse you are trying to connect with feels your wanting it as a form of demand. It is not wrong to feel that. It simply is not helping.</p>
      <p>Stand sideways rather than facing the horse directly. Drop your eyes slightly — not all the way to the ground, but breaking the forward-focused gaze that predators use. Breathe slowly. Deliberately. Let your weight settle into your feet. Exhale, and let your shoulders drop with the exhale. You are not performing relaxation. You are practising it, genuinely, in your own body first.</p>
      <p>Do nothing. Ask for nothing. Want nothing for this moment. Simply be a quiet presence in the horse's space. Wait. The horse will eventually turn to look at you properly, will consider you, will — if you have been consistent enough over enough sessions — decide to walk toward you. When it does, let it come. Do not lean forward to meet it. Let it close the last distance itself. The horse that walks across the field to you has made a choice. That choice is the first real brick in the wall of trust.</p>
    `},
    { type: 'quote', text: 'The horse that comes to you because you stopped demanding that it should — that first step is worth a hundred training sessions.' },
    { type: 'section', heading: 'Step Two: Make Every Interaction Honest', sub: 'Horses cannot be deceived. The only thing that works is the real thing.' },
    { type: 'text', section: 'Step Two: Make Every Interaction Honest', html: `
      <p><span class="rd-dropcap">O</span>nce the horse is approaching willingly, the work becomes about the quality of what happens when it is near you. Every interaction either adds to the trust account or withdraws from it. The goal is to make the vast majority of interactions deposits — moments where the horse discovers that being with you leads to comfort, to release, to genuine ease.</p>
      <p>When you handle the horse, be clear in what you are doing. Do not fumble with equipment in ways that create sudden unpredictable movements. Do not grab. Move slowly through sensitive areas — ears, legs, belly — and watch for the horse's response. If it braces, pause. Wait for it to release before continuing. You are teaching it that it does not need to brace against you, because you will always wait for the release. This takes longer than just pushing through. It also teaches the horse something that no amount of forcing will ever teach: that its communication changes what happens.</p>
      <p>End every session well. Not every session will go perfectly — some days the horse is unsettled, some days you are not at your best. But make the effort to end on a note of softness. A moment of stillness. A breath together. The last thing that happens in a session is what the horse carries into the next one. If the last thing is pressure and frustration, that is what greets you at the gate the next morning. If the last thing is release and quiet, that is what the horse remembers you by.</p>
    `},
    { type: 'quote', text: 'The horse does not remember what you trained today. It remembers how it felt when you left. Make that worth remembering.' },
    { type: 'section', heading: 'Step Three: Be the Same Person Every Time', sub: 'Predictability is not boring to a horse. It is the most reassuring thing in the world.' },
    { type: 'text', section: 'Step Three: Be the Same Person Every Time', html: `
      <p><span class="rd-dropcap">T</span>he deepest trust is built not through any single technique but through the accumulated experience of being the same — reliably, consistently, without exception. The horse that knows who it is dealing with every time you approach can relax into the relationship. The horse that never quite knows which version of you is coming cannot relax, no matter how kind you generally are. Unpredictability is, to a prey animal, one of the most threatening qualities a creature can have.</p>
      <p>This does not mean being mechanical or without feeling. It means that your fundamental quality — your patience, your honesty, your willingness to listen — is stable regardless of the circumstances. You can have bad days. The horse understands that your energy changes. What it needs to know is that your core intent toward it never wavers. You are always safe. You are always fair. You will always listen. That stability, sustained over time, is what transforms a working relationship into genuine partnership.</p>
      <p>Trust, once built this way, is extraordinarily durable. A horse that has been given real trust over real time will carry it through hard days, through mistakes, through the inevitable moments when you ask for too much too soon and have to go back. It will give you benefit of the doubt because you have earned it in the thousands of moments when you gave it benefit of the doubt. This is the compound interest of patience. It accrues slowly, invisibly. And then one day you realise that the horse is with you — really with you — in a way that no shortcut could ever have produced.</p>
    `},
    { type: 'quote', text: 'Be the same person every time. In the end, that is the whole of it. Consistent, honest, patient. The horse will do the rest.' }
  ]
},

// ============================================================
// ARTICLE 7 — Why Your Horse Does Not Listen
// ============================================================
{
  label: 'Practical Article VII',
  title: 'Why Your Horse Does Not Listen to You (Real Reasons Explained)',
  tagline: 'A horse that will not listen is not defying you. It is talking to you.',
  keywords: ['horse not listening', 'why horse ignores commands', 'horse training problems'],
  category: 'practical',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">W</span>hen a horse stops listening, the natural human response is to push harder, ask louder, repeat with more force. This is the most natural thing in the world to do. And it is almost always wrong.</p>
      <p>A horse that is not listening is not defying you. It is telling you something. It is saying: I do not understand. Or: I am not ready. Or: I am in pain. Or, most often: I do not trust that what happens next will be safe for me. These are not acts of stubbornness. They are honest messages from an animal that cannot use words.</p>
      <p>In eleven years with horses, I have found three real reasons why horses stop responding. The first is clarity — the horse does not understand what is being asked. The second is physical — there is pain or discomfort. The third is relational — there is not enough trust to try something uncertain. When you stop asking how do I make the horse listen, and start asking which of these three things is happening right now, you stop fighting and start solving. And when you solve the real problem, the listening always returns.</p>
    `},
    { type: 'section', heading: 'The Clarity Problem', sub: 'You cannot hear words in a language you do not speak. Make sure you are actually communicating.' },
    { type: 'text', section: 'The Clarity Problem', html: `
      <p><span class="rd-dropcap">T</span>he most common reason a horse does not respond is simply that it does not understand what is being asked. This seems obvious. Yet most people, when their horse does not respond to a signal, repeat the exact same signal with more force. They have not asked themselves the honest question: have I actually taught this clearly?</p>
      <p>Horses learn through the release of pressure, not through the application of it. When you apply a signal and the horse offers any movement — any step, any shift, any softening — toward the answer you want, releasing the pressure in that moment teaches the horse that the movement was correct. If you continue the pressure through the movement, the horse learns nothing except that pressure is continuous. It does not understand what made the pressure stop because the pressure did not stop at the right moment.</p>
      <p>Before deciding a horse is being unresponsive, ask yourself: have I broken this request down into small enough steps? Have I released clearly at exactly the right moment? Have I repeated this enough times, with enough consistency, for the horse to have learned the pattern? Often the answer to at least one of these questions is no. Go back to the beginning. Ask smaller. Release clearer. Be more consistent. The horse that seemed to be ignoring you will often surprise you with its attention and effort when the ask becomes genuinely understandable.</p>
    `},
    { type: 'quote', text: 'If the horse is not responding, the first suspect is never the horse. It is the clarity of what you are asking.' },
    { type: 'section', heading: 'The Pain Problem', sub: 'A horse in pain that cannot comply is not being difficult. It is being honest.' },
    { type: 'text', section: 'The Pain Problem', html: `
      <p><span class="rd-dropcap">P</span>ain is a far more common reason for unresponsiveness in horses than most riders want to accept. Because horses are stoic animals — prey animals that have evolved to conceal weakness — they often carry significant discomfort before it becomes visible in the obvious ways. By the time a horse is displaying behavioral resistance, it may have been communicating pain in subtler ways for weeks or months that went unnoticed.</p>
      <p>The horse that was previously responsive and suddenly becomes resistant, the horse that flinches when girthed, the horse that is stiff on one rein but not the other, the horse whose work becomes tight and labored rather than free and swinging — these are horses that may be telling you about a physical problem rather than a training problem. Before escalating training pressure, before labeling a horse as difficult or lazy, it is worth asking: has something changed physically? When was this horse last properly assessed for pain?</p>
      <p>The back, the hocks, the teeth, the feet, the saddle fit — all of these are common sources of discomfort that translate directly into apparent training problems. A horse that will not accept contact was often a horse in jaw or neck pain. A horse that rushes downhill was often a horse with uncomfortable hocks. A horse that bucks under saddle is almost always a horse telling you something hurts. The behavior is not the problem. It is the message. And the message, if you are willing to hear it, will point you directly to what needs to be addressed.</p>
    `},
    { type: 'quote', text: 'Before you train the resistance out, make sure the resistance is not the horse asking for help.' },
    { type: 'section', heading: 'The Trust Problem', sub: 'A horse that does not have enough trust to try is a horse that has learned caution from experience.' },
    { type: 'text', section: 'The Trust Problem', html: `
      <p><span class="rd-dropcap">T</span>he third reason horses stop listening is the one that requires the most honest self-reflection: there is not enough trust in the relationship for the horse to try something uncertain. This horse knows what happens when it tries and gets it wrong. It has learned, through experience, that mistakes bring pressure, confusion, or punishment. It is not being stubborn. It is being careful with the only body it has.</p>
      <p>This horse needs less training and more relationship. It needs sessions that are not about asking for new things, but about confirming old ones — things it already knows how to do well, asked in a way that produces ease and reward rather than pressure and correction. It needs to rebuild its confidence in the act of trying, to rediscover that effort is safe, that mistakes do not cost much, that the human beside it is genuinely on its side.</p>
      <p>This takes time, and it takes a willingness to set aside the training agenda for as long as the relationship needs. Some horses need weeks. Some need months. But the investment is always returned. The horse that rebuilds its trust in you does not just begin listening again — it begins listening in a way it never has before. With genuine willingness. With something in its eye that was not there before. That is not just a better-trained horse. That is a different kind of partnership entirely.</p>
    `},
    { type: 'quote', text: 'A horse that stops trusting enough to try is not a problem to be fixed. It is an invitation to become a person worthy of being trusted.' }
  ]
},

// ============================================================
// ARTICLE 8 — How to Calm a Nervous Horse
// ============================================================
{
  label: 'Practical Article VIII',
  title: 'How to Calm a Nervous or Anxious Horse',
  tagline: 'You cannot fight a nervous system. You can only offer it something steadier.',
  keywords: ['how to calm a horse', 'anxious horse behavior', 'nervous horse training'],
  category: 'practical',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">Y</span>ou cannot calm a horse by fighting its nervous system. The moment you escalate — raising your voice, tightening your grip, moving faster — you confirm what the horse already feared. Something dangerous is happening. The proof is right there in the person standing beside it.</p>
      <p>To calm an anxious horse, you must first calm yourself. In practice, with a five hundred kilogram animal on the edge of panic, this is one of the hardest things a human being can do. But it is the only thing that works. Horses do not respond to reassuring words. They respond to calm bodies. Your breath rate, your muscle tension, the quality of your stillness — these are the real messages you are sending. The words are just noise.</p>
      <p>I have stood beside horses on the verge of complete panic. I have felt the electric charge of a nervous system at its limit. In those moments, there is only one thing I know to do: breathe out. Actively, deliberately, with full awareness. When you exhale, your muscles soften, your heart rate drops, your body chemistry changes. The horse feels this. Not through a conscious decision on its part, but through the same co-regulation that allowed prey animals to calibrate their fear responses using the calm of the herd. One genuine breath from a genuinely calm body communicates more than an hour of gentle talk.</p>
    `},
    { type: 'section', heading: 'Understanding Anxiety in Horses', sub: 'Anxiety is not a behavior. It is a state. And states must be addressed before behavior can change.' },
    { type: 'text', section: 'Understanding Anxiety in Horses', html: `
      <p><span class="rd-dropcap">H</span>orse anxiety comes in two forms, and they require different responses. The first is situational anxiety — triggered by something specific in the environment. A new place. An unusual object. A change in routine. The second is chronic anxiety — a baseline state of tension that the horse carries into every situation, a nervous system that has been living in a state of low-level alert for so long that it has become the default setting.</p>
      <p>Situational anxiety is easier to address. The horse has a clear trigger, and if you can work with the horse and that trigger patiently and consistently — allowing the horse to approach and retreat, never forcing, always acknowledging the fear — you can help the horse build a new memory around that thing. A new association. Over time, with enough repetitions, the horse learns that the thing is safe. The anxiety diminishes. It may never completely disappear — a very strong fear memory can always be retriggered — but it becomes manageable.</p>
      <p>Chronic anxiety is the harder conversation. It usually has roots in the horse's history — in isolation, in training methods that used too much pressure and too little acknowledgment, in environments that never allowed genuine rest. The horse that carries chronic anxiety needs long, slow, patient work that has nothing to do with training in the conventional sense. It needs consistent routine. It needs a living situation that meets its social and behavioral needs. It needs sessions that are entirely about building a sense of safety rather than acquiring new skills. These horses often have the most profound transformations when given the right conditions. They were not born nervous. They learned it. And a horse that learned anxiety can, with the right support, unlearn it.</p>
    `},
    { type: 'quote', text: 'Chronic anxiety in a horse is not a personality trait. It is a history. Change the history, and you begin to change the horse.' },
    { type: 'section', heading: 'The Practical Techniques', sub: 'Simple tools that work — not to suppress fear, but to give the nervous system something steady to attach to.' },
    { type: 'text', section: 'The Practical Techniques', html: `
      <p><span class="rd-dropcap">T</span>he most powerful tool available to calm an anxious horse is also the most underused: stillness. Not a frozen, tense stillness, but genuine, warm, grounded stillness. The kind that says: I am not going anywhere. Nothing is required right now. This is simply a moment of being.</p>
      <p>When a horse is escalating, move less, not more. Reduce the stimulation in the environment if possible. Soften your body from the inside out — deliberately releasing tension in your jaw, your shoulders, your hands. Breathe in a rhythm that is slower than the horse's current rhythm. Do not demand anything. Simply occupy the space beside the horse with a quality of presence that is genuinely relaxed. Over time — sometimes very quickly, sometimes after many minutes — the horse's nervous system will begin to match yours. This is not training. It is co-regulation. It is the same mechanism that allows a frightened foal to calm when it presses against its mother's side.</p>
      <p>Movement can also calm an anxious horse if used correctly. Not the frantic movement of a horse forced through its anxiety, but deliberate, rhythmic, low-demand movement — walking on a loose lead, being given the chance to move its feet and release some of the accumulated nervous energy without being pushed toward the thing it fears. A horse that can move is a horse that does not need to explode. Movement is the nervous system doing what it was built to do: responding to perceived threat by running. Give it a safe, directed outlet and it often resolves naturally.</p>
      <p>Learn the points where touch calms this particular horse. For many horses, slow, firm strokes along the neck — particularly at the crest — activate the parasympathetic nervous system. For others, touch in anxiety escalates. Know your horse. Know what it finds grounding and what it finds stimulating. Respond to what is true for this horse today, not to a general rule about what should work.</p>
    `},
    { type: 'quote', text: 'Give the anxious horse something steadier than its own fear to attach to. That is all it is looking for. Become that thing.' }
  ]
},

// ============================================================
// ARTICLE 9 — First Time Handling a Horse
// ============================================================
{
  label: 'Practical Article IX',
  title: 'First Time Handling a Horse: What You Must Know',
  tagline: 'There is no second first meeting. What you bring to that moment, the horse will remember.',
  keywords: ['how to handle a horse for beginners', 'first time horse tips', 'horse safety basics'],
  category: 'practical',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">T</span>he first impression you make on a horse is written in its memory with a permanence no later session can fully erase. There is no second first meeting. Everything you bring — your speed, your energy, the tension in your hands, the quality of your breath — the horse will carry forward into every interaction that follows.</p>
      <p>This is not meant to frighten you. It is meant to give you the most useful gift I know: the understanding that the quality of the first meeting matters enormously, and that getting it right is not about having skill or experience. It is about slowing down, being genuinely present, and bringing a quality of respect to the encounter that the horse can feel.</p>
      <p>I have watched people with thirty years of experience make terrible first introductions, and I have watched complete beginners, properly prepared and genuinely quiet in themselves, have extraordinary first meetings with horses. The difference was never about experience. It was always about presence. About the person leaving their hurry and their plans outside the gate, and walking in as simply a human being, curious and calm, with nothing to prove.</p>
    `},
    { type: 'section', heading: 'How to Approach', sub: 'The approach is everything. A horse decides what you are before you are ten feet away.' },
    { type: 'text', section: 'How to Approach', html: `
      <p><span class="rd-dropcap">A</span>pproach is the single most important skill in working with horses, and it is the one most beginners are never taught. The way you walk toward a horse communicates your intent, your emotional state, and your understanding of what the horse is — long before your hands ever reach it.</p>
      <p>Never walk straight at a horse from the front with direct eye contact. This is predator behavior. It is the movement pattern of something that is hunting — direct, purposeful, focused. Every cell in the horse's body reads this signal. Walk at an angle. Let your approach be curved, not straight. Soften your gaze — not to the ground, but without the intensity of a locked focus. Move at a pace that is slower than your habitual pace. Not creeping slowly, which creates its own tension. Simply — slower. Deliberate. As if you have nowhere more important to be than exactly where you are right now.</p>
      <p>Give the horse time to see you coming. Horses have poor depth perception directly in front of them — approach from the side, toward the shoulder, which allows the horse to see you with one eye and assess you properly. Speak softly as you approach. Not necessarily words of any kind, but the quality of a voice that is unhurried. Let the horse turn toward you and acknowledge you before you close the final distance. And when you are close enough, pause. Let the horse come the last step — even if it is just a nose-stretch in your direction. That small offering of choice matters.</p>
    `},
    { type: 'quote', text: 'Walk toward a horse the way you would approach a sleeping child — with the understanding that how you arrive is already a conversation.' },
    { type: 'section', heading: 'Safety Fundamentals', sub: 'Safety around horses is not about rules. It is about understanding how horses think and move.' },
    { type: 'text', section: 'Safety Fundamentals', html: `
      <p><span class="rd-dropcap">S</span>afety around horses is not a list of rules to memorize. It is a way of moving and thinking that comes from understanding the horse's nature. When you understand why horses react the way they do, the "rules" become intuitive rather than imposed.</p>
      <p>Stay out of the blind spots. Directly in front of the nose and directly behind the hindquarters are areas the horse cannot see. A touch arriving from a blind spot is, to the horse's nervous system, a touch arriving from nowhere — and the body responds with the violence of a startled prey animal before the mind has any say in the matter. Always let the horse know where you are. Touch starts on the neck or shoulder, where the horse can see you, and moves from there. If you must move behind the horse, stay very close to the body — within arm's reach of the hindquarters — so that any kick loses most of its force before it reaches you. Or stay far enough back that you are out of range entirely.</p>
      <p>Move predictably. Do not make sudden movements. Do not raise your arms quickly. Do not drop things near the horse without warning. The horse's fear response fires faster than thought — give it no reason to fire. When you need to do something that might startle, narrate it first with your energy — slow down even more, breathe deliberately, let your body tell the horse before your hands do that something is about to happen.</p>
      <p>Never wrap a lead rope around your hand or wrist. If the horse spooks and moves sharply, a rope around your hand can break bones or drag you off your feet. Hold the rope in loose coils. Learn to let go before the horse pulls you. The horse will not go far. Your hand and your relationship are more important than a brief chase around the yard.</p>
    `},
    { type: 'quote', text: 'Safety with horses is not a set of rules imposed from outside. It is the natural result of understanding the animal you are with.' },
    { type: 'section', heading: 'The First Touch', sub: 'Your hands are the first language you speak with a horse. Make sure they say something worth hearing.' },
    { type: 'text', section: 'The First Touch', html: `
      <p><span class="rd-dropcap">T</span>he first time your hand touches a horse, it is a statement about everything that will follow. A hand that is tense communicates tension. A hand that grabs communicates urgency. A hand that is heavy and unresponsive communicates that it is not listening. A hand that is soft, warm, and genuinely alive — that is curious and present and responsive to what it finds — communicates something the horse has not felt from every human. It communicates that this person is paying attention.</p>
      <p>Touch the neck first. The neck and shoulder are the areas where horses make physical contact with each other — mutual grooming, comfort, connection. They are the areas most associated with safety in the horse's experience. Begin there. A slow, confident stroke along the neck — not patting, which horses find less comfortable than humans imagine. A long, slow stroke, following the direction of the hair, with a pressure that is firm enough to be clear but not heavy enough to be a demand.</p>
      <p>Watch the response. Does the horse soften toward the touch? Does the head lower slightly? Does a sigh escape? These are invitations to continue. Does the horse brace, move away, or tighten? These are communications that the touch is in the wrong place, at the wrong time, with the wrong quality. Listen to the response and adjust. The hand that listens to the horse's response is the hand the horse will learn to trust. And a horse that trusts your hands will eventually trust your direction. That is not a small thing. That is everything.</p>
    `},
    { type: 'quote', text: 'The first touch you give a horse is not about training. It is about introduction. And a good introduction, in any language, is offered rather than imposed.' }
  ]
},

// ============================================================
// ARTICLE 10 — Signs of Trust
// ============================================================
{
  label: 'Practical Article X',
  title: 'Signs Your Horse Trusts You (And Signs It Does Not)',
  tagline: 'Trust in a horse is not invisible. It is a behavior. And behavior can be read.',
  keywords: ['signs a horse trusts you', 'horse bonding signs', 'horse trust behavior'],
  category: 'practical',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">A</span> horse's trust is not invisible. It is not a feeling you guess at or evaluate in hindsight. Trust, in a horse, is a behavior. And behavior is visible, readable, and honest. When you know what to look for, you will never again wonder whether what you have with your horse is real connection or simply a working arrangement that is holding together for now.</p>
      <p>I want to be precise about this, because the equestrian world is full of people who believe they have their horse's trust when what they actually have is their horse's compliance. These are not the same thing. A horse that complies is a horse that has learned the cost of not complying. A horse that trusts is a horse that has chosen the relationship because it finds genuine safety, ease, and something like pleasure in it. The difference is visible in every session, if you know where to look.</p>
      <p>The signs of real trust are both subtle and unmistakable. Once you have seen them — truly seen them, in a horse that genuinely trusts the person with it — you will recognize their absence everywhere else. And you will not be able to mistake the absence for presence ever again.</p>
    `},
    { type: 'section', heading: 'The Clearest Signs of Real Trust', sub: 'These behaviors are not performed. They cannot be. They arise only from genuine safety.' },
    { type: 'text', section: 'The Clearest Signs of Real Trust', html: `
      <p><span class="rd-dropcap">T</span>he clearest sign of trust is voluntary approach. A horse that trusts you does not need to be caught. When you enter the field or the stable, it comes to you — not for food, but because your presence is comfortable and wanted. This is the horse saying clearly: I choose to be here with you when I could be anywhere else. Nothing I know of in the human-horse relationship is more unambiguous than this. It is the horse voting with its feet.</p>
      <p>The second sign is the quality of relaxation in your presence. A horse that trusts you will lower its head when you are near — a gesture of complete physical relaxation from an animal whose survival depends on keeping its head up. The lowered head is a deep exhale. It means: I am safe here. You are enough. A horse that keeps its head high in your presence is not comfortable in your presence, no matter how technically correct your handling may be.</p>
      <p>The third sign is the quality of the breathing. A horse that feels safe breathes slowly and deeply, sometimes with long, audible sighs. A horse under stress breathes quickly and shallowly. The breathing is not something the horse consciously controls. It is a direct readout of the state of the nervous system. Sit quietly beside a horse that trusts you and listen to its breath settle. It is one of the most peaceful sounds in the world.</p>
      <p>The fourth sign is physical softness. A horse that trusts you will lean into your touch rather than away from it. It will stand quietly without fidgeting when you work around it. It will allow you to handle its feet, its ears, its face without brace or resistance. This softness is not the stillness of a horse that has given up fighting. It is the softness of a horse that genuinely does not feel the need to protect itself from you.</p>
    `},
    { type: 'quote', text: 'The horse that lowers its head as you approach is not being polite. It is making itself vulnerable to you. Understand what that costs a prey animal, and you will understand what trust means.' },
    { type: 'section', heading: 'Signs That Trust Is Missing', sub: 'These are not bad horses. They are horses that have not yet been given enough reason to trust.' },
    { type: 'text', section: 'Signs That Trust Is Missing', html: `
      <p><span class="rd-dropcap">T</span>he absence of trust shows just as clearly as its presence. The horse that moves away when you enter the field — consistently, not just today when something spooked it — is a horse that has not found your approach to be something worth staying for. The horse that is difficult to catch is often described as naughty or cunning. It is neither. It is a horse that has learned that being caught leads to experiences it would rather avoid.</p>
      <p>The horse that is tense throughout a session — not because the work is difficult, but as a baseline state whenever you are present — is a horse whose nervous system has not found yours to be a source of regulation. It is still doing all the work of managing its own anxiety alone, without being able to use your calm as a reference point. This horse is not bad. It is isolated inside its own vigilance, doing its best to stay safe in a situation it does not feel genuinely safe in.</p>
      <p>The horse that is compliant but disconnected deserves particular attention. It does what is asked. It does not resist. But there is nothing in its eye — it is somewhere else entirely, going through the motions. This horse has learned that cooperation is the path of least resistance. It has not learned that cooperation leads to genuine ease and reward. This is not a trustworthy partnership. It is a managed arrangement. And while it may look successful from the outside, it is not what horses are capable of offering when they are truly safe.</p>
      <p>None of these signs are verdicts. They are information. They tell you where the relationship currently is, not where it has to stay. Every horse that shows these signs of missing trust has the capacity for real trust — it has simply not yet been given enough of the right experiences to build it. That is fixable. It requires patience, consistency, and honesty. But it is always fixable.</p>
    `},
    { type: 'quote', text: 'A horse that does not trust you yet is not a failure. It is a horse waiting for enough evidence to decide that you are worth trusting. Give it that evidence.' }
  ]
}
// ============================================================
// ARTICLE 11 — What Horses Teach Us About Human Behavior
// ============================================================
{
  label: 'Unique Edge Article XI',
  title: 'What Horses Teach Us About Human Behavior',
  tagline: 'Spend enough time with horses and you will learn more about yourself than any mirror can show.',
  keywords: ['what horses teach humans', 'horse psychology and humans', 'lessons from horses'],
  category: 'edge',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">A</span> horse has no ego. It has no agenda beyond what is real right now. It cannot pretend. It cannot perform. It can only respond to what is genuinely present. Spend enough time with horses and you will learn more about your real self — not the one you show the world — than any other method of self-understanding can offer.</p>
      <p>What horses teach us above all is that our inner state is not private. We walk through the world believing we can perform competence while feeling inadequate, project calm while being anxious, present patience while carrying resentment. Horses expose this belief as the comfortable fiction it has always been.</p>
      <p>The horse does not see the performance. It sees what is underneath. It reads the stress in your body, the tiny tensions in your muscles, the quality of your breath. Everything you have learned to hide from other humans, the horse has already read. And then it shows you — honestly, without cruelty, without judgment — exactly who walked in. This is a service of extraordinary value, if you have the courage to receive it.</p>
    `},
    { type: 'section', heading: 'The Mirror You Cannot Lie To', sub: 'The horse reflects back not who you think you are, but who you actually are in this moment.' },
    { type: 'text', section: 'The Mirror You Cannot Lie To', html: `
      <p><span class="rd-dropcap">I</span> have watched people have revelations beside horses that they had been avoiding for years in other contexts. The person who insists they are patient until the horse reveals, without any accusation, that they are not. The person who believes they are calm until the horse shows them exactly how much they are holding. The person who thinks they are present until the horse demonstrates, by its inability to settle, that they are anywhere but here.</p>
      <p>These revelations are not comfortable. They are not meant to be. But they are profoundly useful. The horse cannot be convinced to see what is not there. It cannot be charmed or reasoned with or persuaded to overlook what it is reading. It simply responds to what is actually present. And this makes it the most honest feedback mechanism most of us will ever encounter.</p>
      <p>The people who grow most from their time with horses are the ones who learn to ask: what is the horse showing me about myself right now? Not what is wrong with the horse. What is the horse revealing about what I am bringing. This shift — from judgment of the horse to curiosity about oneself — is the moment horsemanship becomes something larger than a skill. It becomes a genuine practice of self-knowledge.</p>
    `},
    { type: 'quote', text: 'The horse is the most honest teacher you will ever have. It cannot be lied to, bribed, or manipulated. It only responds to what is true.' },
    { type: 'section', heading: 'What Horses Teach About Presence', sub: 'The horse lives where most humans only visit. Fully inside the moment.' },
    { type: 'text', section: 'What Horses Teach About Presence', html: `
      <p><span class="rd-dropcap">H</span>orses exist in a quality of presence that most humans have lost contact with. Not the presence achieved through meditation or practice or effort, but the effortless, complete presence of an animal that has no capacity for being anywhere but here. The horse is not thinking about what happened yesterday. It is not planning tomorrow. It is this breath, this movement, this moment of connection. Fully and completely, without remainder.</p>
      <p>Working with horses requires a degree of presence that most people find genuinely difficult at first. The horse will not meet you in your thoughts. It cannot find you there. It can only find you in your body, in your breath, in the quality of your physical being in this moment. To reach a horse, you must come all the way into the present. And for most people, this is an extraordinary demand — to leave behind the constant background noise of memory and planning and worry and simply be, without agenda, in a field with an animal that is doing the same thing effortlessly.</p>
      <p>What horses give back, when you manage to arrive fully, is a quality of aliveness that is difficult to find anywhere else. The present moment, shared with a creature that is genuinely in it, becomes vivid in a way that the distracted life rarely is. Colors are brighter. Sound is clearer. Time moves differently. This is not sentimentality. This is what it feels like to be genuinely awake. Horses are simply very good at requiring it of you.</p>
    `},
    { type: 'quote', text: 'The horse does not ask you to be wise. It asks you to be here. And here, when you finally arrive, turns out to be enough.' },
    { type: 'section', heading: 'What Horses Teach About Relationship', sub: 'Every horse relationship is a practice in giving without demanding a return.' },
    { type: 'text', section: 'What Horses Teach About Relationship', html: `
      <p><span class="rd-dropcap">T</span>he deepest thing horses teach us is something about the nature of relationship itself. A relationship that is worth anything is not built on what one party can extract from the other. It is built on genuine attention, genuine care, and a willingness to be affected by the other's experience. Horses demand this not through words but through the simple fact of what they are: creatures of extraordinary sensitivity who respond with complete honesty to what they are given.</p>
      <p>If you approach a horse with the goal of getting something from it — a perfect session, an obedient horse, a result that proves your skill — the horse feels the agenda. It may comply. But it will not open. It will not offer the additional quality that genuine trust makes possible. The best horsemanship, in my experience, comes from people who have learned to enter the relationship without an agenda — to be curious about the horse, genuinely interested in its inner life, willing to be surprised and delighted and sometimes humbled by what they find.</p>
      <p>This is not a skill you can practise only with horses. It is a way of being in relationships. A quality of attention and generosity and genuine curiosity about the other's experience. Horses teach it to us because they make it impossible to fake. But what they are teaching is not horsemanship. It is something larger. It is how to be genuinely present with another living being. And that, practised with a horse for long enough, tends to change the way you are present with every living being in your life.</p>
    `},
    { type: 'quote', text: 'Spend enough time listening to horses and you will find yourself listening differently to everything else. They teach you to pay attention. And attention, given freely, is the most generous thing one being can offer another.' }
  ]
},

// ============================================================
// ARTICLE 12 — Presence and Intention
// ============================================================
{
  label: 'Unique Edge Article XII',
  title: 'To Feel What a Horse Feels: Understanding Presence and Intention',
  tagline: 'Horses live where most humans only visit — fully inside the present moment.',
  keywords: ['horse sensitivity to humans', 'horse energy and intention', 'connection with horses'],
  category: 'edge',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">P</span>resence is not a concept. It is not a state you can think your way into. It is a physical reality — the quality of being fully here, fully alive, fully available to what is happening in this exact moment. Horses live in presence permanently. It is not something they achieve. It is simply what they are.</p>
      <p>Most humans have lost the ability to do this. We are almost never fully here. We are partly in the meeting we just left, partly in the obligation ahead, partly in a conversation replaying itself on the inside of our skull. We bring all of this into the arena. The horse feels every bit of it. Not as metaphor. As real, physical, readable information.</p>
      <p>To understand what a horse feels in your presence, try this: stand still beside it, close your eyes, and feel your own body. Feel your breath, your heartbeat, the tensions in your face, your jaw, your hands. Feel where you are holding. Now ask yourself honestly — if your survival depended on reading energy accurately, what would you make of the creature standing beside you?</p>
    `},
    { type: 'section', heading: 'Intention as a Physical Force', sub: 'Your intention broadcasts before your action. The horse has already received the message.' },
    { type: 'text', section: 'Intention as a Physical Force', html: `
      <p><span class="rd-dropcap">I</span>ntention is not private. Every time you form a plan to move, to stop, to turn, to ask for something, your body begins preparing itself before the conscious action occurs. Muscles engage subtly. Weight shifts infinitesimally. Breath changes pattern. The gaze adjusts. To a creature of the horse's sensitivity, these micro-signals are as readable as speech.</p>
      <p>This is why skilled horsemen often appear to their horses to be almost telepathic — the horse responds before the visible signal has been given. What is actually happening is much simpler and much more profound: the horse is reading the intention in the body before the body has completed the action. The physical preparation is the signal. The rein, the leg, the weight — these are confirmations, not initiations.</p>
      <p>Once you understand this, the implications for how you train and how you handle horses become significant. Clarity of intention — knowing clearly in your own body what you want to happen next, without hesitation or doubt — communicates to the horse before any technical aid does. Confusion in your intention communicates confusion. Conflict between what you want and what you fear produces a horse that feels the conflict and does not know which message to answer.</p>
      <p>The experienced rider who achieves effortless connection with a horse is often someone who has, over years, developed extraordinary clarity of intention. Their inner picture of what they want to happen is so clear, so fully inhabited by the body, that the horse finds the signal before the signal has been consciously sent. This is not magic. It is the logical result of presence — of being so fully in the moment with the horse that the two bodies begin to speak the same language without translation.</p>
    `},
    { type: 'quote', text: 'Before your hand moves, your mind has already moved. The horse felt it first. Your job is to make sure that what it felt was worth feeling.' },
    { type: 'section', heading: 'Becoming a Place of Rest', sub: 'The greatest skill is not asking well. It is becoming someone the horse chooses to rest beside.' },
    { type: 'text', section: 'Becoming a Place of Rest', html: `
      <p><span class="rd-dropcap">T</span>here is a quality of presence that the very best horsemen and horsewomen develop over years that I can only describe as becoming a place of rest. The horse, in their presence, does not merely tolerate proximity. It actively seeks it. It turns toward them when something is frightening. It lowers its head and slows its breath simply because they have walked into the yard. This is presence used as a tool — not as manipulation, but as genuine offering.</p>
      <p>Becoming a place of rest is not about being passive or without direction. It is about having a quality of inner stillness that remains stable regardless of what the horse is doing. When the horse escalates, you do not escalate. When the horse fears, you do not fear. When the horse is confused, you do not become urgent. You remain — steadily, warmly, without demand — the most stable thing in the horse's environment. And over time, the horse learns to borrow your stability. To use your calm as evidence that the world is manageable.</p>
      <p>This quality cannot be performed. It must be real. You either have genuine stillness available to you in that moment or you do not. And if you do not, no technique will compensate. This is why so much of good horsemanship is actually inner work — the slow, difficult, deeply worthwhile work of learning to regulate your own nervous system. Not for abstract reasons. For the very practical reason that the horse will respond to your state before it responds to anything else, and everything you want to accomplish depends on that foundation being solid.</p>
    `},
    { type: 'quote', text: 'The horse does not ask you to be perfect. It asks you to be present. And presence, offered genuinely and consistently, is everything.' }
  ]
},

// ============================================================
// ARTICLE 13 — Horses React to Your Mind
// ============================================================
{
  label: 'Unique Edge Article XIII',
  title: 'Why Horses React to Your Mind and Not Just Your Actions',
  tagline: 'Before your hand moves, your mind has already moved. The horse felt it first.',
  keywords: ['do horses sense emotions', 'horse reaction to humans', 'horse awareness'],
  category: 'edge',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">B</span>efore your hand moves, your mind has already moved. Before your leg gives the signal, your intention has already broadcast itself through every muscle, every small shift of weight in your body. A horse does not wait for the action. It reads the intention. By the time you have done something, the horse has already felt it coming.</p>
      <p>This is not telepathy. This is the horse's extraordinary ability to read the tiny signals of a human body with a precision our conscious mind cannot match. When you think about stopping, your body prepares to stop — slightly, invisibly. The horse registers it. When you think about turning, your gaze shifts, your weight shifts. The horse is already turning.</p>
      <p>This means that the quality of your thoughts — the clarity of your intentions, the absence of doubt and inner conflict — is not a philosophical nicety but a real and practical factor in every session you have with a horse. The horse that seems to read your mind is simply reading your body with more accuracy than you are reading it yourself. And once you understand that, the question of how to work better with horses becomes a question of how to think and feel more clearly inside your own body.</p>
    `},
    { type: 'section', heading: 'The Science of Subtle Signals', sub: 'The horse reads what the body says before the body knows it is saying it.' },
    { type: 'text', section: 'The Science of Subtle Signals', html: `
      <p><span class="rd-dropcap">T</span>he phenomenon of horses responding to human intention has a long history in both horsemanship practice and scientific research. The most famous historical example is Clever Hans — a horse in early twentieth century Germany that appeared to perform complex arithmetic, tapping out answers with its hoof. Careful investigation revealed something more interesting than a calculating horse: Hans was reading infinitesimal postural signals from the people around him, responding to the almost imperceptible release of tension in their bodies when he reached the correct answer.</p>
      <p>What seemed like a trick was actually a profound demonstration of the horse's sensitivity to human body language at a level the humans themselves were completely unaware of. They did not know they were signalling. Hans did not know they were signalling. But the signal was there, real and readable, and the horse read it with extraordinary consistency. This is not a party trick. It is a description of how horses navigate their relationship with humans in every moment of every day.</p>
      <p>Your body does not keep secrets from a horse. The physiological changes that accompany mental states — muscle tension, breath pattern, heart rate, the direction of gaze and attention — are all changes the horse reads in real time. Fear in a human produces a tighter grip, shorter breath, harder eyes. Confidence produces softness, deep breathing, a quality of forward focus without urgency. The horse categorises you continuously. And the category it places you in determines how it responds to you, regardless of what you are trying to do technically.</p>
    `},
    { type: 'quote', text: 'The horse does not hear your doubts. It feels them. And it responds to what it feels, not to what you intended.' },
    { type: 'section', heading: 'Training Your Inner Life for Better Horsemanship', sub: 'The most important work happens before you pick up the rope.' },
    { type: 'text', section: 'Training Your Inner Life for Better Horsemanship', html: `
      <p><span class="rd-dropcap">I</span>f the horse responds to your inner state before it responds to your actions, then improving your inner state is improving your horsemanship. This is not a soft or vague idea. It is deeply practical. And it is where most formal equestrian training does not go, which is why many technically proficient riders never achieve the depth of connection they are looking for.</p>
      <p>The first practice is learning to feel yourself. Most people move through the day with almost no conscious awareness of the state of their own body. They do not notice that their jaw is clenched, that their shoulders are up around their ears, that they have been holding their breath since the car journey. They arrive at the horse carrying all of this, entirely unconscious of it, and then are mystified when the horse is tight and unresponsive. Before you can manage what you broadcast to the horse, you must be able to feel what you are broadcasting.</p>
      <p>The second practice is developing the ability to change your inner state deliberately. Not to pretend calm, but to generate it. Slow breathing. Deliberate release of held muscle tension. The conscious decision to drop the agenda and simply be present. These are not spiritual practices — though they may feel that way. They are practical tools that produce measurable changes in your body chemistry, changes that the horse reads and responds to with the same reliability as it reads any other signal.</p>
      <p>The third practice is developing clarity of intention. Before you ask the horse for anything, have a clear, fully embodied picture of what you are asking for. Not a vague wish. A clear, felt sense of the movement, the softness, the response you want. When that picture is clear in your body, you will find the horse responds to it before your aids are complete. When it is unclear — when you are half-asking and half-doubting — the horse will reflect that confusion back with the same precision it reflects everything else.</p>
    `},
    { type: 'quote', text: 'The horse you ride is a portrait of your inner life on that day. If you want a different portrait, change the painter.' }
  ]
},

// ============================================================
// ARTICLE 14 — Silence, Energy, Movement
// ============================================================
{
  label: 'Unique Edge Article XIV',
  title: 'Silence, Energy, and Movement: The Language Horses Understand',
  tagline: 'There is a language older than words. Horses speak it fluently. Most humans have forgotten it exists.',
  keywords: ['horse communication signals', 'how horses communicate', 'non verbal communication horses'],
  category: 'edge',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">T</span>here is a language older than any human tongue — older than the first word our ancestors ever spoke into the dark. It came before writing, before the moment our species decided everything important must be named. Horses speak it fluently. Most humans have forgotten it exists. Those who work well with horses have simply remembered how to listen.</p>
      <p>This language is made of silence — the quality of stillness, the difference between an animal at rest and a predator waiting to strike. It is made of energy — the felt sense of aliveness in a body, the direction of attention. It is made of movement — not just direction and speed, but the weight and intention behind every step. The confidence or hesitation in a footfall. The difference between movement that is going somewhere and movement that is merely happening.</p>
      <p>When I teach people to work with horses, I spend the first hour teaching them to be still. Not quiet — still. The quality of your stillness speaks more clearly to a horse than the quality of your voice. A still body with focused attention says: I am here. I am present. I am not going anywhere. This is one of the most reassuring things a human can offer a prey animal that spends its life scanning for threat.</p>
    `},
    { type: 'section', heading: 'The Language of Silence', sub: 'What you do not do speaks as loudly as what you do. Sometimes louder.' },
    { type: 'text', section: 'The Language of Silence', html: `
      <p><span class="rd-dropcap">S</span>ilence with horses is active. It is not the absence of communication — it is one of the most powerful forms of it. When you stand beside a horse and do nothing, you are saying: I have no demands right now. There is no pressure. This moment belongs to you. For an animal that lives under the constant weight of vigilance, this offering of unconditional stillness is profoundly meaningful.</p>
      <p>The silence that precedes a request is just as important as the request itself. When you rush directly from one ask to the next, the horse never gets to process what just happened. It never gets to feel the release, to integrate the experience, to understand that the answer it gave was correct. The pause — the deliberate, generous pause after a horse gives you something — is where the learning actually occurs. It is where the horse's nervous system returns to baseline and the new memory is consolidated. Take it away and you are training in a fog.</p>
      <p>Silence after a mistake is also valuable. When a horse gets something wrong — when it moves in the wrong direction, misreads your signal, becomes confused — the instinct is to immediately correct, to re-ask, to fix. Sometimes the most useful response is none at all. A pause. A breath. A moment of not asking, giving the horse's nervous system a chance to reset. Then begin again from somewhere simpler. The silence says: that did not cost anything. We are fine. Let us start again. This is a very different message from the continuous pressure of someone who corrects without pausing, who asks again immediately after a mistake, whose energy communicates that errors are expensive.</p>
    `},
    { type: 'quote', text: 'In the pause between asking and asking again is where the horse finds what it needs to try differently. Do not fill every silence. Some silences are doing the most important work.' },
    { type: 'section', heading: 'The Language of Energy', sub: 'Energy is felt before it is seen. The horse is reading you before you open the gate.' },
    { type: 'text', section: 'The Language of Energy', html: `
      <p><span class="rd-dropcap">E</span>nergy, in the context of horsemanship, is simply the quality of aliveness in a body. It is the difference between a body that is switched on — present, attentive, directed — and a body that is passive, unfocused, elsewhere. Both states communicate clearly to the horse. High, directed energy says: something is about to happen. Pay attention. Low, soft energy says: rest. Nothing is required. These are the two most basic messages in the horse's language, and every communication between horse and human is built from some combination of them.</p>
      <p>Learning to use your energy deliberately is one of the most transformative skills in horsemanship. The horseman who can raise their energy — not by moving faster, but by becoming more internally directed, more alive, more focused — and feel the horse respond to that inner shift before any external aid has been given, has understood something essential. And the horseman who can lower their energy, genuinely and completely, and use it to bring a tense horse down rather than continuing to escalate, has understood something even more essential.</p>
      <p>Energy is also the first thing horses read about your emotional state. Anxiety produces a particular quality of energy — scattered, high-frequency, alert. Calm produces a different quality — slow, deep, continuous. Horses categorise these patterns instantly, and they respond to them as information about whether the environment is safe. You cannot fake the energy of genuine calm. But you can practise it. And the more you practise it in the company of horses — who give you immediate, honest feedback — the more available it becomes in other areas of your life as well.</p>
    `},
    { type: 'quote', text: 'You cannot fake calm energy to a horse. But you can practise genuine calm until it becomes the default. The horse will notice the moment it does.' },
    { type: 'section', heading: 'The Language of Movement', sub: 'The way you move tells the horse what you are before you have spoken a word.' },
    { type: 'text', section: 'The Language of Movement', html: `
      <p><span class="rd-dropcap">H</span>orses read movement with a precision that makes their entire system of communication visible to anyone who knows how to watch. Every movement carries information: speed, direction, weight, intention. The quality of a footfall. Whether a step is placed or dropped. Whether the body is moving through space with purpose or simply occupying it randomly.</p>
      <p>In natural horsemanship and in horse-to-horse communication, movement is the primary tool. Horses use movement and the threat of movement to communicate hierarchy, to invite connection, to set boundaries. A horse that moves another horse's feet has, in the language of horses, established a degree of authority over it. A horse that follows another horse's movement is expressing trust and willingness to be led. These patterns translate directly into human-horse work: the human who can move the horse's feet confidently and then give them back — move them, then release, then allow stillness — is speaking the horse's social language fluently.</p>
      <p>Your own movement through space communicates constantly. The walk that arrives with clear direction and grounded weight says: I know where I am going and I am confident in it. The walk that is fast, light, and distracted says: I am not entirely sure what I am doing or where I am headed. The horse reads both. And the horse follows the first kind of movement more readily than the second — not because it has been trained to, but because clear, grounded, directed movement is the movement of a creature that knows what is happening. And a creature that knows what is happening is safer to be near than one that does not.</p>
    `},
    { type: 'quote', text: 'Move as if you know where you are going. Not fast. Not urgently. Simply with weight and direction and the quiet certainty of someone who has arrived. The horse will follow that.' }
  ]
},

// ============================================================
// ARTICLE 15 — Philosophy of Working With Horses
// ============================================================
{
  label: 'Unique Edge Article XV',
  title: 'The Philosophy of Working with Horses and Not Against Them',
  tagline: 'There are two ways to work with a horse. Only one of them is real.',
  keywords: ['natural horsemanship philosophy', 'working with horses not against', 'ethical horse training'],
  category: 'edge',
  pages: [
    { type: 'title' },
    { type: 'text', section: 'Opening', html: `
      <p><span class="rd-dropcap">T</span>here are two ways to work with a horse. They look similar from the outside — a horse and rider moving together with apparent ease and harmony. But from inside the horse, they feel completely different. And the horse always knows the difference, even when the audience does not.</p>
      <p>The first way is the way of control and management. It is not necessarily cruel. It can be technically correct, professionally delivered, and produce impressive results. But its foundation is the human's agenda, the human's timeline. The horse learns to manage its life within the edges of what is permitted. It may be content. But it is not free.</p>
      <p>The second way is the way of real partnership. It begins not with what you want the horse to do, but with understanding what the horse is. It asks for more curiosity than certainty, more listening than instruction. It produces a horse that is not performing for you — it is participating with you. Partnership requires two willing participants. Everything else, however graceful, is something less.</p>
    `},
    { type: 'section', heading: 'The Question Behind the Question', sub: 'Every decision in the arena is an expression of a deeper belief about what horses are and what we owe them.' },
    { type: 'text', section: 'The Question Behind the Question', html: `
      <p><span class="rd-dropcap">U</span>nderneath every training decision — every choice about how to respond to resistance, how much pressure to use, when to push and when to release — there is a deeper belief about the nature of the horse and its relationship to humans. Most people never examine this belief. They simply inherited a set of practices from the people who taught them, who inherited from the people who taught them, and they use those practices without questioning the assumptions beneath them.</p>
      <p>The assumption of much traditional horsemanship is that horses are animals to be managed — capable creatures with their own instincts and reactions, but fundamentally in need of human direction and control. In this view, the horse's resistance is a problem to be solved. Its fear is an obstacle. Its instincts are something to be trained over, reprogrammed, made compliant.</p>
      <p>A different assumption is possible. The horse is a creature of extraordinary intelligence, sensitivity, and social sophistication — a creature that has been shaped by millions of years to live in relationship, to read and respond to the inner states of those around it, to participate in a collaborative existence with its herd. In this view, the horse's resistance is information. Its fear is communication. Its instincts are not obstacles but raw material — the very stuff from which real partnership, built with patience and honesty and respect, becomes possible.</p>
      <p>The choice between these two assumptions is not merely philosophical. It produces different horses, different relationships, and different experiences of what it means to be with a horse at all. It is worth examining which one you hold — and whether it is one you have chosen deliberately or simply never thought to question.</p>
    `},
    { type: 'quote', text: 'The horse you have is not a reflection of your technique. It is a reflection of your philosophy. Change the philosophy, and the horse begins to change too.' },
    { type: 'section', heading: 'Working With Nature, Not Over It', sub: 'The horse was designed by millions of years of evolution. Horsemanship is the art of working with that design.' },
    { type: 'text', section: 'Working With Nature, Not Over It', html: `
      <p><span class="rd-dropcap">E</span>very successful horseman I have ever met or read or had the privilege of watching has one thing in common: they work with the horse's nature rather than against it. They do not try to suppress the prey animal's fear response — they use it as information and work to become the thing the horse trusts more than it fears. They do not try to eliminate the horse's sensitivity — they value it as the source of the horse's capacity for communication and refinement.</p>
      <p>Working with the horse's nature means accepting certain truths without resistance. Horses learn best when the pressure is clear, the release is immediate, and the sessions are short enough that the nervous system can integrate what has been offered. They learn through repetition, through consistency, through the building of new associations that over time become stronger than old fears. They do not learn through punishment, through force, through the removal of all choice until the only option is compliance.</p>
      <p>It also means accepting that there are days when the horse is not available for what you had planned — when it is too anxious, too sore, too distracted by something in its environment that you cannot change. On those days, the horse that is worked with rather than against will be met where it is, given something achievable, and left with its dignity and its trust intact. The horse that is worked against will be pushed through its resistance until something gives — either the resistance or the relationship. Usually, over time, it is the relationship.</p>
    `},
    { type: 'quote', text: 'Nature built the horse over sixty million years. Your job is not to overcome that design. Your job is to understand it well enough to work within it. That is where the art begins.' },
    { type: 'section', heading: 'The Life That Horses Offer', sub: 'This is not just about better horsemanship. It is about a better way of being in the world.' },
    { type: 'text', section: 'The Life That Horses Offer', html: `
      <p><span class="rd-dropcap">I</span> did not come to horses because I wanted to ride. I came to them because I was, at a point in my life, looking for something more honest than most of what the human world offered. I found it. Not in a dramatic way. Not in a single moment of revelation. I found it in ten thousand mornings in a field, with an animal that showed me, patiently and without judgment, exactly who I was that day and exactly how much distance there was between who I was and who I wanted to become.</p>
      <p>Horses have given me things that no other practice, no teacher, no book has given me. They have taught me to be still. They have taught me that my inner state is not private, and that learning to manage it is not weakness but one of the most important skills a person can develop. They have taught me that real communication requires real listening — not the polite performance of listening while you wait to speak, but genuine, open, willing attention to what another being is actually expressing. They have taught me that trust is built slowly, in the dark, through a thousand small acts of consistency, and that it is worth far more than anything that can be obtained quickly.</p>
      <p>Most of all, they have taught me that the quality of a relationship — any relationship — depends entirely on the quality of what each party brings to it. You cannot take more than you give and call it a partnership. You cannot demand without offering. You cannot manage from a distance and expect genuine connection. These are lessons from the arena. They are also, I have come to believe, lessons for everything. And that, in the end, is why horses are not just animals I work with. They are some of the best teachers I have ever had.</p>
    `},
    { type: 'quote', text: 'The horse does not know it is teaching you. It is simply being honest. But if you are paying attention, that honesty will change you. And a person changed by a horse is changed for the better, in ways that go far beyond the field.' }
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
  
  // Intersection Observer for reveal animation
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
      html += `<div class="article-section">
        ${page.html}
      </div>`;
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

console.log('Chronicles loaded: 15 articles with complete multi-page content');
