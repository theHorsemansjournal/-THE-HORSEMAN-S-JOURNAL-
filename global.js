// The Horseman's Journal - Global JavaScript
// OPTIMIZED for smooth performance | Small horses MOVE | Guardian horses STAND STILL

(function() {
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
        let animationId = null;
        
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
        
        // Optimized particle counts for smooth performance
        const stars = Array.from({length: 200}, () => ({
            x: Math.random(), y: Math.random() * 0.55,
            r: Math.random() * 1.5 + 0.3,
            sp: Math.random() * 0.015 + 0.003,
            off: Math.random() * Math.PI * 2,
            ba: Math.random() * 0.6 + 0.2,
            color: `hsl(${Math.random() * 60 + 20}, ${Math.random() * 50 + 40}%, ${Math.random() * 40 + 55}%)`
        }));
        
        const grass = Array.from({length: 350}, () => ({
            x: Math.random(), by: 0.68 + Math.random() * 0.32,
            h: Math.random() * 30 + 12,
            sp: Math.random() * 0.02 + 0.005,
            off: Math.random() * Math.PI * 2,
            color: Math.random() > 0.7 ? '#4a3a2a' : '#2a3a1a'
        }));
        
        const flies = Array.from({length: 35}, () => ({
            x: Math.random(), y: 0.68 + Math.random() * 0.28,
            r: Math.random() * 1.5 + 0.5,
            sp: Math.random() * 0.3 + 0.1,
            ph: Math.random() * Math.PI * 2,
            dx: (Math.random() - 0.5) * 0.3,
            dy: (Math.random() - 0.5) * 0.15,
            color: `hsl(${Math.random() * 40 + 40}, 75%, ${Math.random() * 30 + 50}%)`
        }));
        
        function drawRealisticMoon(x, y, radius) {
            const pulse = Math.sin(t * 0.02) * 0.08 + 0.92;
            
            const glowGrad = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 2);
            glowGrad.addColorStop(0, `rgba(255,220,120,${0.2 * pulse})`);
            glowGrad.addColorStop(0.4, `rgba(255,180,80,${0.1 * pulse})`);
            glowGrad.addColorStop(0.7, `rgba(200,120,40,0.04)`);
            glowGrad.addColorStop(1, 'rgba(100,50,20,0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
            ctx.fill();
            
            const moonGrad = ctx.createRadialGradient(x - radius * 0.25, y - radius * 0.25, radius * 0.2, x, y, radius);
            moonGrad.addColorStop(0, `rgba(255,235,180,0.96)`);
            moonGrad.addColorStop(0.4, `rgba(245,210,140,0.88)`);
            moonGrad.addColorStop(0.7, `rgba(220,170,100,0.82)`);
            moonGrad.addColorStop(1, `rgba(180,130,70,0.78)`);
            ctx.fillStyle = moonGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
        }
        
        // Horse drawing function - with movement for small horses
        function drawHorse(hx, hy, sc, coat, mane, pose, flip, isGuardian = false, customPhase = 0) {
            ctx.save();
            ctx.translate(hx, hy);
            const actualScale = isGuardian ? sc * 2.2 : sc;
            if (flip) ctx.scale(-actualScale, actualScale);
            else ctx.scale(actualScale, actualScale);
            
            // MOVEMENT: Only small horses (isGuardian = false) have movement
            // Guardian horses (isGuardian = true) have NO movement
            const hasMovement = !isGuardian;
            const breath = hasMovement ? Math.sin(t * 0.02 + customPhase) * 1.2 : 0;
            const legSway = hasMovement ? Math.sin(t * 0.03 + customPhase) * 2.5 : 0;
            const tailSway = hasMovement ? Math.sin(t * 0.025 + customPhase) * 2 : 0;
            const headBob = hasMovement ? Math.sin(t * 0.028 + customPhase) * 1.2 : 0;
            
            if (isGuardian) {
                ctx.shadowColor = 'rgba(212,175,55,0.15)';
                ctx.shadowBlur = 8;
            }
            
            if (pose === 'guardian') {
                ctx.fillStyle = coat;
                [-18, -4, 8, 22].forEach((lx, i) => ctx.fillRect(lx, 12, 5, 28));
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
                if (hasMovement) {
                    ctx.strokeStyle = mane;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-32, 1);
                    ctx.quadraticCurveTo(-42, -6, -38 + tailSway, -16);
                    ctx.stroke();
                } else {
                    ctx.strokeStyle = mane;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-32, 1);
                    ctx.quadraticCurveTo(-42, -6, -38, -16);
                    ctx.stroke();
                }
            } else if (pose === 'sentinel') {
                ctx.fillStyle = coat;
                [-15, -3, 7, 17].forEach((lx, i) => {
                    const legOffset = (hasMovement && i % 2) ? legSway : 0;
                    ctx.fillRect(lx, 14 + legOffset, 4, 24);
                });
                ctx.beginPath();
                ctx.ellipse(0, 4 + breath * 0.2, 28, 13, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(18 + headBob * 0.3, 0 + headBob * 0.2);
                ctx.quadraticCurveTo(28, -28, 24, -40 + headBob);
                ctx.quadraticCurveTo(18, -28, 8, -2);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(24 + headBob * 0.2, -42 + headBob, 8, 5, -0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(24, -46 + headBob);
                ctx.lineTo(22 + headBob * 0.2, -54 + headBob);
                ctx.lineTo(20, -46 + headBob);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(26, -46 + headBob);
                ctx.lineTo(28 + headBob * 0.2, -54 + headBob);
                ctx.lineTo(26, -46 + headBob);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(18, -4 + headBob * 0.2);
                ctx.quadraticCurveTo(22, -18, 26, -32);
                ctx.stroke();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-26, 2);
                ctx.quadraticCurveTo(-34, -5, -32 + tailSway, -14);
                ctx.stroke();
            } else if (pose === 'foreground') {
                ctx.fillStyle = coat;
                [-18, -4, 8, 20].forEach((lx, i) => {
                    const legOffset = (hasMovement && i % 2) ? legSway : 0;
                    ctx.fillRect(lx, 12 + legOffset, 5, 28);
                });
                ctx.beginPath();
                ctx.ellipse(0, 3 + breath * 0.15, 34, 16, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(22 + headBob * 0.3, -1 + headBob * 0.2);
                ctx.quadraticCurveTo(34, -32, 28, -46 + headBob);
                ctx.quadraticCurveTo(20, -32, 10, -4);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(28 + headBob * 0.2, -48 + headBob, 10, 6, -0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(28, -53 + headBob);
                ctx.lineTo(25, -62 + headBob);
                ctx.lineTo(22, -53 + headBob);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(30, -53 + headBob);
                ctx.lineTo(33, -62 + headBob);
                ctx.lineTo(30, -53 + headBob);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(22, -5 + headBob * 0.2);
                ctx.quadraticCurveTo(28, -22, 32, -38);
                ctx.stroke();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(-32, 1);
                ctx.quadraticCurveTo(-42, -6, -38 + tailSway, -16);
                ctx.stroke();
            } else if (pose === 'nuzzle') {
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach((lx, i) => {
                    const legOffset = (hasMovement && i % 2) ? legSway * 0.8 : 0;
                    ctx.fillRect(lx, 16 + legOffset, 4, 20);
                });
                ctx.beginPath();
                ctx.ellipse(0, 5 + breath * 0.2, 26, 12, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(16 + headBob * 0.3, 1 + headBob * 0.2);
                ctx.quadraticCurveTo(28, -14, 26, -24 + headBob);
                ctx.quadraticCurveTo(18, -18, 6, 3);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(26 + headBob * 0.2, -26 + headBob, 7, 5, -0.15, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(26, -30 + headBob);
                ctx.lineTo(25, -37 + headBob);
                ctx.lineTo(23, -30 + headBob);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(16, -2 + headBob * 0.2);
                ctx.quadraticCurveTo(20, -10, 24, -20);
                ctx.stroke();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.moveTo(-24, 3);
                ctx.quadraticCurveTo(-30, -4, -28 + tailSway, -12);
                ctx.stroke();
            } else {
                // graze pose
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach((lx, i) => {
                    const legOffset = (hasMovement && i % 2) ? legSway : 0;
                    ctx.fillRect(lx, 16 + legOffset, 4, 20);
                });
                ctx.beginPath();
                ctx.ellipse(0, 5 + breath * 0.2, 28, 13, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(18 + headBob * 0.3, 1 + headBob * 0.2);
                ctx.quadraticCurveTo(32, 12, 26, 26 + headBob);
                ctx.quadraticCurveTo(18, 20, 7, 3);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(28 + headBob * 0.2, 30 + headBob, 8, 5, 0.25, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(30, 25 + headBob);
                ctx.lineTo(32, 19 + headBob);
                ctx.lineTo(27, 24 + headBob);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(27, 26 + headBob);
                ctx.lineTo(25, 20 + headBob);
                ctx.lineTo(24, 26 + headBob);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(18, -3 + headBob * 0.2);
                ctx.quadraticCurveTo(24, 6, 28, 18);
                ctx.stroke();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-26, 3);
                ctx.quadraticCurveTo(-34, -3, -32 + tailSway, -12);
                ctx.stroke();
            }
            
            ctx.shadowBlur = 0;
            ctx.restore();
        }
        
        // HERD: Guardian horses (isGuardian: true) - NO movement
        // Small horses (isGuardian: false) - WILL move and graze
        const herd = [
            // GUARDIAN HORSES - STAND COMPLETELY STILL
            { x: 0.07, y: 0.74, s: 0.95, coat: '#1a0a0e', mane: '#2a1420', pose: 'guardian', flip: false, isGuardian: true, phase: 0 },
            { x: 0.93, y: 0.74, s: 0.95, coat: '#1a0a0e', mane: '#2a1420', pose: 'guardian', flip: true, isGuardian: true, phase: 0 },
            // SMALL HORSES - WILL MOVE AND GRAZE
            { x: 0.18, y: 0.85, s: 0.70, coat: '#2a1a12', mane: '#3a2818', pose: 'graze', flip: false, isGuardian: false, phase: 0.2 },
            { x: 0.30, y: 0.82, s: 0.78, coat: '#1a1618', mane: '#2a2428', pose: 'sentinel', flip: true, isGuardian: false, phase: 0.5 },
            { x: 0.42, y: 0.84, s: 0.55, coat: '#3a2818', mane: '#4a3020', pose: 'graze', flip: false, isGuardian: false, phase: 0.8 },
            { x: 0.50, y: 0.83, s: 0.72, coat: '#4a3222', mane: '#5a3e2a', pose: 'nuzzle', flip: false, isGuardian: false, phase: 1.1 },
            { x: 0.56, y: 0.84, s: 0.68, coat: '#3a3035', mane: '#4a4045', pose: 'nuzzle', flip: true, isGuardian: false, phase: 1.4 },
            { x: 0.68, y: 0.83, s: 0.85, coat: '#5a4828', mane: '#6a5530', pose: 'sentinel', flip: false, isGuardian: false, phase: 1.7 },
            { x: 0.82, y: 0.85, s: 0.75, coat: '#141018', mane: '#221e26', pose: 'graze', flip: false, isGuardian: false, phase: 2.0 },
            { x: 0.10, y: 0.79, s: 1.40, coat: '#1a0e08', mane: '#2a1a10', pose: 'foreground', flip: false, isGuardian: false, phase: 2.3 },
        ];
        
        const sectionColors = [
            { name: 'About', baseHue: 45, shiftSpeed: 0.3 },
            { name: 'Awakening', baseHue: 350, shiftSpeed: 0.4 },
            { name: 'Chronicles', baseHue: 30, shiftSpeed: 0.35 },
            { name: 'Companions', baseHue: 200, shiftSpeed: 0.25 },
            { name: 'Verses', baseHue: 280, shiftSpeed: 0.45 },
            { name: 'Questions', baseHue: 15, shiftSpeed: 0.3 }
        ];
        
        const sections = sectionColors.map((c, i) => ({
            name: c.name,
            color: `hsl(${c.baseHue}, 70%, 55%)`,
            lx: [0.16, 0.34, 0.52, 0.68, 0.82, 0.90][i],
            ly: [0.44, 0.38, 0.34, 0.38, 0.42, 0.48][i],
            depth: [0.6, 0.7, 0.8, 0.65, 0.55, 0.5][i],
            baseHue: c.baseHue,
            shiftSpeed: c.shiftSpeed
        }));
        
        const pageMap = ['about.html', 'awakening.html', 'chronicles.html', 'companions.html', 'essays.html', 'questions.html'];
        
        const lanternsDiv = document.getElementById('lanterns');
        const lanternEls = [];
        
        if (lanternsDiv) {
            sections.forEach((s, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:absolute;z-index:8;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);`;
                el.innerHTML = `<div class="lantern-glow" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:22px;height:30px;border-radius:12px 12px 8px 8px;background:radial-gradient(circle at 50% 30%, rgba(255,240,200,0.7), ${s.color} 60%, rgba(0,0,0,0.5) 100%);box-shadow:0 0 20px ${s.color},0 0 45px ${s.color}66;animation:lanternBob ${3 + i * 0.4}s ease-in-out infinite;transition:box-shadow .4s,filter .4s,background .2s;"></div><div style="position:absolute;top:28px;left:50%;transform:translateX(-50%);width:2px;height:12px;background:rgba(200,180,150,0.5);"></div><div style="position:absolute;top:36px;left:50%;transform:translateX(-50%);width:1px;height:18px;background:rgba(200,180,150,0.25);"></div><div class="lantern-label" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .35s;white-space:nowrap;"><span style="font-family:'Cinzel',serif;font-size:.6rem;font-weight:600;letter-spacing:2px;color:#D4AF37;display:block;text-shadow:0 0 8px rgba(0,0,0,0.5);">${s.name}</span></div>`;
                
                const glowEl = el.querySelector('.lantern-glow');
                const labelEl = el.querySelector('.lantern-label');
                
                el.addEventListener('mouseenter', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 40px ${s.color},0 0 80px ${s.color},0 0 120px ${s.color}88`;
                        glowEl.style.filter = 'brightness(1.5)';
                    }
                    if (labelEl) labelEl.style.opacity = '1';
                });
                
                el.addEventListener('mouseleave', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 20px ${s.color},0 0 45px ${s.color}66`;
                        glowEl.style.filter = 'brightness(1)';
                    }
                    if (labelEl) labelEl.style.opacity = '0';
                });
                
                el.addEventListener('click', () => {
                    location.href = pageMap[i];
                });
                
                lanternsDiv.appendChild(el);
                lanternEls.push({ el, glowEl, s });
            });
        }
        
        // OPTIMIZED RENDER FUNCTION
        function render() {
            ctx.clearRect(0, 0, W, H);
            
            // Sky gradient
            const sg = ctx.createLinearGradient(0, 0, 0, H);
            sg.addColorStop(0, `#0a0a2a`);
            sg.addColorStop(0.3, `#151540`);
            sg.addColorStop(0.6, `#2a1a3a`);
            sg.addColorStop(1, `#3a2a3a`);
            ctx.fillStyle = sg;
            ctx.fillRect(0, 0, W, H);
            
            // Simplified aurora for performance
            for (let b = 0; b < 3; b++) {
                const bandY = H * 0.15 + b * 50;
                ctx.fillStyle = `rgba(100,70,150,${0.04 - b * 0.01})`;
                ctx.fillRect(0, bandY - 15, W, 50);
            }
            
            // Draw moon
            const moonX = W * 0.78, moonY = H * 0.16;
            drawRealisticMoon(moonX, moonY, 40);
            ctx.shadowBlur = 0;
            
            // Stars
            stars.forEach(s => {
                const tw = Math.sin(t * s.sp + s.off) * 0.4 + 0.6;
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.ba * tw * 0.5;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.r * tw * 0.5, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            
            // Ground
            ctx.fillStyle = 'rgba(10,8,20,0.8)';
            ctx.fillRect(0, H * 0.68, W, H * 0.32);
            ctx.fillStyle = '#0c0a1c';
            ctx.fillRect(0, H * 0.73, W, H * 0.27);
            ctx.fillStyle = '#12102a';
            ctx.fillRect(0, H * 0.78, W, H * 0.22);
            
            // Grass
            grass.forEach(g => {
                const sw = Math.sin(t * g.sp + g.off) * 6;
                ctx.strokeStyle = g.color;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(g.x * W, g.by * H);
                ctx.quadraticCurveTo(g.x * W + sw * 0.4, g.by * H - g.h * 0.5, g.x * W + sw, g.by * H - g.h);
                ctx.stroke();
            });
            
            // Draw ALL horses - Guardians stand still, small horses move
            herd.forEach(h => {
                drawHorse(h.x * W + (mx - 0.5) * 25 * h.s, 
                         h.y * H + (my - 0.5) * 10 * h.s, 
                         h.s, h.coat, h.mane, h.pose, h.flip, h.isGuardian, h.phase);
            });
            
            // Fireflies
            flies.forEach(f => {
                f.x += Math.sin(t * 0.02 + f.ph) * f.dx;
                f.y += Math.cos(t * 0.022 + f.ph) * f.dy;
                f.x = ((f.x % 1) + 1) % 1;
                f.y = Math.max(0.68, Math.min(0.96, f.y));
                const a = Math.abs(Math.sin(t * f.sp + f.ph)) * 0.5;
                ctx.fillStyle = f.color;
                ctx.globalAlpha = a;
                ctx.beginPath();
                ctx.arc(f.x * W, f.y * H, f.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            
            // Light pools
            sections.forEach((s, idx) => {
                const lx = s.lx * W + (mx - 0.5) * 20 * s.depth;
                const ly = s.ly * H + (my - 0.5) * 10 * s.depth;
                const currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                const poolGrad = ctx.createRadialGradient(lx, ly + 35, 5, lx, ly + 35, 80);
                poolGrad.addColorStop(0, `hsla(${currentHue}, 70%, 55%, 0.08)`);
                poolGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = poolGrad;
                ctx.beginPath();
                ctx.arc(lx, ly + 35, 80, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Update lantern colors
            lanternEls.forEach(({ glowEl, s }, idx) => {
                if (glowEl) {
                    const currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                    glowEl.style.background = `radial-gradient(circle at 50% 30%, rgba(255,240,200,0.8), hsla(${currentHue}, 75%, 55%, 0.85) 60%, rgba(0,0,0,0.5) 100%)`;
                    glowEl.style.boxShadow = `0 0 20px hsla(${currentHue}, 75%, 55%, 0.6), 0 0 45px hsla(${currentHue}, 75%, 55%, 0.35)`;
                }
            });
        }
        
        function updateLanterns() {
            lanternEls.forEach(({ el, s }) => {
                const px = (mx - 0.5) * 25 * s.depth;
                const py = (my - 0.5) * 14 * s.depth;
                el.style.left = (s.lx * 100) + '%';
                el.style.top = (s.ly * 100) + '%';
                el.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`;
            });
        }
        
        const hallParticles = document.getElementById('hallParticles');
        if (hallParticles) {
            for (let i = 0; i < 20; i++) {
                const p = document.createElement('div');
                p.className = 'hall-bg-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDuration = (Math.random() * 12 + 8) + 's';
                p.style.animationDelay = Math.random() * 12 + 's';
                hallParticles.appendChild(p);
            }
        }
        
        const titleOverlay = document.getElementById('titleOverlay');
        const hintOverlay = document.getElementById('hintOverlay');
        let lastMove = 0;
        
        window.addEventListener('mousemove', () => {
            lastMove = t;
        });
        
        function animate() {
            t++;
            render();
            updateLanterns();
            
            const idle = t - lastMove > 200;
            if (titleOverlay) titleOverlay.style.opacity = idle ? '0.3' : '0.95';
            if (hintOverlay) hintOverlay.style.opacity = idle ? '0' : '0.7';
            
            animationId = requestAnimationFrame(animate);
        }
        
        animate();
        window.addEventListener('resize', () => {
            resize();
        });
    }
})();
