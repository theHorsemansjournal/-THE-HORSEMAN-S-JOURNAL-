// The Horseman's Journal - Global JavaScript
// Canvas animation, lantern navigation, and interactive elements

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) {
            console.error('heroCanvas not found!');
            return;
        }
        
        const ctx = canvas.getContext('2d');
        let W, H, mx = 0.5, my = 0.5, t = 0;
        let logoOpacity = 0.95;
        let lastMove = 0;
        
        function resize() {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => {
            mx = e.clientX / W;
            my = e.clientY / H;
            lastMove = t;
        });
        
        // ===== LOGO DRAWING FUNCTION - Horse and Rider Silhouette =====
        function drawLogo(x, y, size, opacity) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(size, size);
            ctx.globalAlpha = opacity;
            
            ctx.fillStyle = '#D4AF37';
            ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
            ctx.shadowBlur = 15;
            
            // Horse body
            ctx.beginPath();
            ctx.ellipse(0, 0, 28, 14, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Neck
            ctx.beginPath();
            ctx.moveTo(18, -6);
            ctx.quadraticCurveTo(28, -28, 24, -42);
            ctx.quadraticCurveTo(16, -28, 8, -8);
            ctx.closePath();
            ctx.fill();
            
            // Head
            ctx.beginPath();
            ctx.ellipse(26, -46, 10, 7, -0.1, 0, Math.PI * 2);
            ctx.fill();
            
            // Muzzle
            ctx.beginPath();
            ctx.ellipse(32, -44, 6, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Ears
            ctx.beginPath();
            ctx.moveTo(22, -54);
            ctx.lineTo(19, -64);
            ctx.lineTo(16, -54);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(28, -54);
            ctx.lineTo(30, -64);
            ctx.lineTo(26, -54);
            ctx.fill();
            
            // Rider
            ctx.fillStyle = '#B8860B';
            ctx.beginPath();
            ctx.ellipse(12, -28, 6, 10, -0.2, 0, Math.PI * 2);
            ctx.fill();
            
            // Rider head
            ctx.beginPath();
            ctx.arc(10, -42, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Hat
            ctx.fillStyle = '#8B6914';
            ctx.beginPath();
            ctx.ellipse(10, -47, 8, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(10, -45, 5, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Arm
            ctx.fillStyle = '#B8860B';
            ctx.beginPath();
            ctx.moveTo(16, -32);
            ctx.lineTo(28, -38);
            ctx.lineTo(24, -35);
            ctx.closePath();
            ctx.fill();
            
            // Legs
            ctx.beginPath();
            ctx.moveTo(10, -22);
            ctx.lineTo(14, -12);
            ctx.lineTo(8, -10);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(6, -24);
            ctx.lineTo(2, -14);
            ctx.lineTo(-2, -12);
            ctx.closePath();
            ctx.fill();
            
            // Horse legs
            ctx.fillStyle = '#D4AF37';
            ctx.fillRect(16, 8, 5, 18);
            ctx.fillRect(24, 6, 5, 18);
            ctx.fillRect(-18, 6, 5, 18);
            ctx.fillRect(-26, 8, 5, 18);
            
            // Hooves
            ctx.fillStyle = '#8B6914';
            ctx.fillRect(16, 24, 5, 4);
            ctx.fillRect(24, 22, 5, 4);
            ctx.fillRect(-18, 22, 5, 4);
            ctx.fillRect(-26, 24, 5, 4);
            
            // Tail
            ctx.fillStyle = '#B8860B';
            ctx.beginPath();
            ctx.moveTo(-30, -4);
            ctx.quadraticCurveTo(-42, 0, -38, 16);
            ctx.quadraticCurveTo(-34, 8, -28, 2);
            ctx.fill();
            
            // Mane
            for (let i = 0; i < 6; i++) {
                ctx.fillRect(14 + i * 2, -18 - i * 2, 3, 6);
            }
            
            // Reins
            ctx.beginPath();
            ctx.moveTo(28, -40);
            ctx.lineTo(22, -36);
            ctx.lineTo(18, -32);
            ctx.strokeStyle = '#8B6914';
            ctx.lineWidth = 1.2;
            ctx.stroke();
            
            // Sparkle effects
            ctx.shadowBlur = 8;
            for (let i = 0; i < 8; i++) {
                const angle = (t * 0.02 + i * Math.PI / 4) % (Math.PI * 2);
                const rad = 45;
                const sx = Math.cos(angle) * rad;
                const sy = Math.sin(angle) * rad;
                ctx.fillStyle = `rgba(212, 175, 55, ${0.3 + Math.sin(t * 0.05 + i) * 0.15})`;
                ctx.beginPath();
                ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            ctx.restore();
        }
        
        // Stars
        const stars = Array.from({length: 400}, () => ({
            x: Math.random(), y: Math.random() * 0.55,
            r: Math.random() * 2 + 0.3,
            sp: Math.random() * 0.015 + 0.003,
            off: Math.random() * Math.PI * 2,
            ba: Math.random() * 0.7 + 0.2,
            color: `hsl(${Math.random() * 60 + 20}, ${Math.random() * 50 + 50}%, ${Math.random() * 40 + 60}%)`
        }));
        
        // Grass
        const grass = Array.from({length: 700}, () => ({
            x: Math.random(), by: 0.68 + Math.random() * 0.32,
            h: Math.random() * 45 + 15,
            sp: Math.random() * 0.02 + 0.005,
            off: Math.random() * Math.PI * 2,
            color: Math.random() > 0.7 ? '#4a3a2a' : '#2a3a1a'
        }));
        
        // Fireflies
        const flies = Array.from({length: 60}, () => ({
            x: Math.random(), y: 0.68 + Math.random() * 0.28,
            r: Math.random() * 2 + 0.5,
            sp: Math.random() * 0.3 + 0.1,
            ph: Math.random() * Math.PI * 2,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.2,
            color: `hsl(${Math.random() * 40 + 40}, 80%, ${Math.random() * 30 + 50}%)`
        }));
        
        // Moon
        function drawRealisticMoon(x, y, radius) {
            const pulse = Math.sin(t * 0.02) * 0.1 + 0.9;
            
            const glowGrad = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 2.2);
            glowGrad.addColorStop(0, `rgba(255,220,120,${0.25 * pulse})`);
            glowGrad.addColorStop(0.4, `rgba(255,180,80,${0.12 * pulse})`);
            glowGrad.addColorStop(0.7, `rgba(200,120,40,0.05)`);
            glowGrad.addColorStop(1, 'rgba(100,50,20,0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
            ctx.fill();
            
            const moonGrad = ctx.createRadialGradient(x - radius * 0.25, y - radius * 0.25, radius * 0.2, x, y, radius);
            moonGrad.addColorStop(0, `rgba(255,235,180,0.98)`);
            moonGrad.addColorStop(0.4, `rgba(245,210,140,0.9)`);
            moonGrad.addColorStop(0.7, `rgba(220,170,100,0.85)`);
            moonGrad.addColorStop(1, `rgba(180,130,70,0.8)`);
            ctx.fillStyle = moonGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.shadowBlur = 0;
            const craters = [
                { cx: -radius * 0.38, cy: -radius * 0.28, r: radius * 0.13, highlight: true },
                { cx: radius * 0.42, cy: -radius * 0.18, r: radius * 0.11, highlight: false },
                { cx: radius * 0.18, cy: radius * 0.32, r: radius * 0.09, highlight: true },
                { cx: -radius * 0.22, cy: radius * 0.38, r: radius * 0.07, highlight: false },
                { cx: -radius * 0.52, cy: radius * 0.12, r: radius * 0.08, highlight: true },
                { cx: radius * 0.32, cy: radius * 0.12, r: radius * 0.06, highlight: false },
                { cx: -radius * 0.12, cy: -radius * 0.48, r: radius * 0.06, highlight: true },
                { cx: radius * 0.52, cy: -radius * 0.42, r: radius * 0.05, highlight: false },
            ];
            
            craters.forEach(crater => {
                const craterX = x + crater.cx;
                const craterY = y + crater.cy;
                const craterR = crater.r;
                
                ctx.fillStyle = 'rgba(140,90,40,0.45)';
                ctx.beginPath();
                ctx.ellipse(craterX, craterY, craterR, craterR * 0.85, 0, 0, Math.PI * 2);
                ctx.fill();
                
                if (crater.highlight) {
                    ctx.fillStyle = 'rgba(255,235,180,0.3)';
                    ctx.beginPath();
                    ctx.ellipse(craterX - craterR * 0.2, craterY - craterR * 0.15, craterR * 0.35, craterR * 0.22, 0, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.fillStyle = 'rgba(80,50,20,0.25)';
                ctx.beginPath();
                ctx.ellipse(craterX + craterR * 0.15, craterY + craterR * 0.1, craterR * 0.28, craterR * 0.18, 0, 0, Math.PI * 2);
                ctx.fill();
            });
        }
        
        // Horse drawing function
        function horse(hx, hy, sc, coat, mane, pose, flip, isGuardian = false) {
            ctx.save();
            ctx.translate(hx, hy);
            const actualScale = isGuardian ? sc * 2.2 : sc;
            if (flip) ctx.scale(-actualScale, actualScale);
            else ctx.scale(actualScale, actualScale);
            
            const useMovement = !isGuardian;
            const br = useMovement ? Math.sin(t * 0.018 + hx * 0.01) * 1.5 : 0;
            
            if (isGuardian) {
                ctx.shadowColor = 'rgba(212,175,55,0.2)';
                ctx.shadowBlur = 10;
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
                ctx.lineWidth = 3.2;
                ctx.beginPath();
                ctx.moveTo(22, -5);
                ctx.quadraticCurveTo(28, -22, 32, -38);
                ctx.stroke();
            } else if (pose === 'foreground') {
                ctx.fillStyle = coat;
                [-18, -4, 8, 20].forEach((lx, i) => {
                    const offset = useMovement ? (i % 2 ? br : -br) : 0;
                    ctx.fillRect(lx, 12 + offset, 5, 28);
                });
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
            } else if (pose === 'nuzzle') {
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach((lx, i) => {
                    const offset = useMovement ? (i % 2 ? br : -br) : 0;
                    ctx.fillRect(lx, 16 + offset, 4, 20);
                });
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
            } else {
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach((lx, i) => {
                    const offset = useMovement ? (i % 2 ? br : -br) : 0;
                    ctx.fillRect(lx, 16 + offset, 4, 20);
                });
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
            }
            
            ctx.shadowBlur = 0;
            ctx.restore();
        }
        
        // THE HERD
        const herd = [
            { x: 0.07, y: 0.76, s: 0.95, coat: '#0d0a0e', mane: '#1a1418', pose: 'guardian', flip: false, isGuardian: true },
            { x: 0.93, y: 0.76, s: 0.95, coat: '#0d0a0e', mane: '#1a1418', pose: 'guardian', flip: true, isGuardian: true },
            { x: 0.18, y: 0.85, s: 0.70, coat: '#2a1a12', mane: '#3a2818', pose: 'graze', flip: false, isGuardian: false },
            { x: 0.30, y: 0.82, s: 0.78, coat: '#1a1618', mane: '#2a2428', pose: 'graze', flip: true, isGuardian: false },
            { x: 0.42, y: 0.84, s: 0.55, coat: '#3a2818', mane: '#4a3020', pose: 'graze', flip: false, isGuardian: false },
            { x: 0.50, y: 0.83, s: 0.72, coat: '#4a3222', mane: '#5a3e2a', pose: 'nuzzle', flip: false, isGuardian: false },
            { x: 0.56, y: 0.84, s: 0.68, coat: '#3a3035', mane: '#4a4045', pose: 'nuzzle', flip: true, isGuardian: false },
            { x: 0.68, y: 0.83, s: 0.85, coat: '#5a4828', mane: '#6a5530', pose: 'graze', flip: false, isGuardian: false },
            { x: 0.82, y: 0.85, s: 0.75, coat: '#141018', mane: '#221e26', pose: 'graze', flip: false, isGuardian: false },
            { x: 0.90, y: 0.78, s: 1.50, coat: '#080608', mane: '#141018', pose: 'foreground', flip: true, isGuardian: false },
            { x: 0.10, y: 0.79, s: 1.40, coat: '#1a0e08', mane: '#2a1a10', pose: 'foreground', flip: false, isGuardian: false },
        ];
        
        // LANTERNS - FIXED POSITIONING ON SCREEN (no scrolling)
        const sections = [
            { name: 'About', baseHue: 45, shiftSpeed: 0.3, screenX: 12, screenY: 28, depth: 0.6 },
            { name: 'Awakening', baseHue: 350, shiftSpeed: 0.4, screenX: 28, screenY: 24, depth: 0.7 },
            { name: 'Chronicles', baseHue: 30, shiftSpeed: 0.35, screenX: 44, screenY: 22, depth: 0.8 },
            { name: 'Companions', baseHue: 200, shiftSpeed: 0.25, screenX: 60, screenY: 24, depth: 0.65 },
            { name: 'Verses', baseHue: 280, shiftSpeed: 0.45, screenX: 76, screenY: 28, depth: 0.55 },
            { name: 'Questions', baseHue: 15, shiftSpeed: 0.3, screenX: 88, screenY: 32, depth: 0.5 }
        ];
        
        const pageMap = ['about.html', 'awakening.html', 'chronicles.html', 'companions.html', 'essays.html', 'questions.html'];
        
        // Create lanterns with FIXED positioning
        const lanternsDiv = document.getElementById('lanterns');
        const lanternEls = [];
        
        if (lanternsDiv) {
            sections.forEach((s, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:fixed;z-index:15;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);left:${s.screenX}%;top:${s.screenY}%;`;
                el.innerHTML = `<div class="lantern-glow" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:22px;height:30px;border-radius:12px 12px 8px 8px;background:radial-gradient(circle at 50% 30%, rgba(200,180,150,0.55), hsla(${s.baseHue}, 42%, 38%, 0.75) 60%, rgba(0,0,0,0.6) 100%);box-shadow:0 0 15px hsla(${s.baseHue}, 40%, 30%, 0.5),0 0 30px hsla(${s.baseHue}, 35%, 25%, 0.3);animation:lanternBob ${3 + i * 0.4}s ease-in-out infinite;transition:box-shadow .4s,filter .4s,background .2s;"></div><div style="position:absolute;top:28px;left:50%;transform:translateX(-50%);width:2px;height:12px;background:rgba(160,140,110,0.4);"></div><div style="position:absolute;top:36px;left:50%;transform:translateX(-50%);width:1px;height:18px;background:rgba(160,140,110,0.2);"></div><div class="lantern-label" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .35s;white-space:nowrap;"><span style="font-family:'Cinzel',serif;font-size:.6rem;font-weight:600;letter-spacing:2px;color:#D4AF37;display:block;text-shadow:0 0 5px rgba(0,0,0,0.5);">${s.name}</span></div>`;
                
                const glowEl = el.querySelector('.lantern-glow');
                const labelEl = el.querySelector('.lantern-label');
                
                el.addEventListener('mouseenter', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 25px hsla(${s.baseHue}, 45%, 40%, 0.6),0 0 45px hsla(${s.baseHue}, 40%, 35%, 0.4)`;
                        glowEl.style.filter = 'brightness(1.2)';
                    }
                    if (labelEl) labelEl.style.opacity = '1';
                });
                
                el.addEventListener('mouseleave', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 15px hsla(${s.baseHue}, 40%, 30%, 0.5),0 0 30px hsla(${s.baseHue}, 35%, 25%, 0.3)`;
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
        
        // Update lantern colors only (positions are fixed)
        function updateLanternColors() {
            lanternEls.forEach(({ glowEl, s }) => {
                if (glowEl) {
                    const currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                    glowEl.style.background = `radial-gradient(circle at 50% 30%, rgba(200,180,150,0.55), hsla(${currentHue}, 42%, 35%, 0.75) 60%, rgba(0,0,0,0.65) 100%)`;
                    glowEl.style.boxShadow = `0 0 15px hsla(${currentHue}, 40%, 28%, 0.5), 0 0 30px hsla(${currentHue}, 35%, 22%, 0.35)`;
                }
            });
        }
        
        function render() {
            ctx.clearRect(0, 0, W, H);
            
            // Sky
            const sg = ctx.createLinearGradient(0, 0, 0, H);
            sg.addColorStop(0, '#0a0a2a');
            sg.addColorStop(0.25, '#151540');
            sg.addColorStop(0.5, '#2a1a3a');
            sg.addColorStop(0.75, '#3a2a3a');
            sg.addColorStop(1, '#4a352a');
            ctx.fillStyle = sg;
            ctx.fillRect(0, 0, W, H);
            
            // Aurora
            const auroraY = H * 0.15;
            for (let b = 0; b < 6; b++) {
                const bandY = auroraY + b * 38;
                const bandAlpha = 0.06 - b * 0.008;
                const bandGrad = ctx.createLinearGradient(0, bandY, 0, bandY + 70);
                bandGrad.addColorStop(0, `rgba(80,140,120,${bandAlpha * 0.5})`);
                bandGrad.addColorStop(0.3, `rgba(${b % 2 === 0 ? '140,100,180' : '100,140,180'},${bandAlpha})`);
                bandGrad.addColorStop(0.6, `rgba(180,120,160,${bandAlpha * 0.7})`);
                bandGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = bandGrad;
                ctx.beginPath();
                ctx.moveTo(0, bandY - 15);
                for (let i = 0; i <= 100; i++) {
                    const nx = i / 100;
                    const wave1 = Math.sin(nx * 3.5 + t * 0.008 + b * 1.2) * 28;
                    const wave2 = Math.sin(nx * 8 + t * 0.012 + b * 2) * 15;
                    ctx.lineTo(nx * W, bandY + wave1 + wave2);
                }
                ctx.lineTo(W, bandY + 70);
                ctx.lineTo(0, bandY + 70);
                ctx.closePath();
                ctx.fill();
            }
            
            // Horizon glow
            const horizonGrad = ctx.createLinearGradient(0, H * 0.55, 0, H * 0.75);
            horizonGrad.addColorStop(0, 'rgba(180,100,60,0)');
            horizonGrad.addColorStop(0.5, 'rgba(200,120,70,0.12)');
            horizonGrad.addColorStop(1, 'rgba(160,80,40,0.25)');
            ctx.fillStyle = horizonGrad;
            ctx.fillRect(0, H * 0.55, W, H * 0.25);
            
            // Moon
            drawRealisticMoon(W * 0.78, H * 0.16, 42);
            ctx.shadowBlur = 0;
            
            // Stars
            stars.forEach(s => {
                const tw = Math.sin(t * s.sp + s.off) * 0.4 + 0.6;
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.ba * tw * 0.8;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.r * tw * 0.6, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            
            // Distant ground
            ctx.fillStyle = 'rgba(10,8,20,0.75)';
            ctx.beginPath();
            ctx.moveTo(0, H * 0.66);
            for (let i = 0; i <= 70; i++) {
                const nx = i / 70;
                ctx.lineTo(nx * W, H * 0.62 - Math.sin(nx * 3.8) * H * 0.022);
            }
            ctx.lineTo(W, H * 0.66);
            ctx.closePath();
            ctx.fill();
            
            // Ground layers
            const groundColors = ['#0c0a1c', '#12102a', '#1a1535', '#221d3a'];
            groundColors.forEach((col, i) => {
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(0, H);
                for (let j = 0; j <= 90; j++) {
                    const nx = j / 90;
                    const h = H * (0.72 + i * 0.055 - Math.sin(nx * (2.5 + i * 1.3) + i) * 0.045);
                    ctx.lineTo(nx * W, h);
                }
                ctx.lineTo(W, H);
                ctx.closePath();
                ctx.fill();
            });
            
            // Mist
            const mistGrad = ctx.createLinearGradient(0, H * 0.75, 0, H);
            mistGrad.addColorStop(0, 'rgba(20,18,35,0)');
            mistGrad.addColorStop(0.7, 'rgba(30,25,45,0.2)');
            mistGrad.addColorStop(1, 'rgba(20,15,35,0.35)');
            ctx.fillStyle = mistGrad;
            ctx.fillRect(0, H * 0.75, W, H * 0.25);
            
            // Grass
            grass.forEach(g => {
                const sw = Math.sin(t * g.sp + g.off) * 9;
                ctx.strokeStyle = g.color;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(g.x * W, g.by * H);
                ctx.quadraticCurveTo(g.x * W + sw * 0.45, g.by * H - g.h * 0.5, g.x * W + sw, g.by * H - g.h);
                ctx.stroke();
            });
            
            // Horses
            herd.forEach(h => {
                horse(h.x * W + (mx - 0.5) * 35 * h.s, 
                      h.y * H + (my - 0.5) * 12 * h.s, 
                      h.s, h.coat, h.mane, h.pose, h.flip, h.isGuardian);
            });
            
            // Fireflies
            flies.forEach(f => {
                f.x += Math.sin(t * 0.02 + f.ph) * f.dx;
                f.y += Math.cos(t * 0.022 + f.ph) * f.dy;
                f.x = ((f.x % 1) + 1) % 1;
                f.y = Math.max(0.66, Math.min(0.96, f.y));
                const a = Math.abs(Math.sin(t * f.sp + f.ph)) * 0.6;
                ctx.fillStyle = f.color;
                ctx.globalAlpha = a;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(f.x * W, f.y * H, f.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            
            // Light pools (these move with mouse but lanterns are fixed)
            sections.forEach((s) => {
                const lx = s.screenX / 100 * W + (mx - 0.5) * 20 * s.depth;
                const ly = s.screenY / 100 * H + (my - 0.5) * 10 * s.depth;
                const currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                const poolGrad = ctx.createRadialGradient(lx, ly + 35, 5, lx, ly + 35, 95);
                poolGrad.addColorStop(0, `hsla(${currentHue}, 40%, 35%, 0.08)`);
                poolGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = poolGrad;
                ctx.beginPath();
                ctx.arc(lx, ly + 35, 95, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Draw the logo
            const idle = t - lastMove > 200;
            logoOpacity = idle ? 0.95 : 0.15;
            drawLogo(W * 0.5, H * 0.35, 1.2, logoOpacity);
            
            // Update lantern colors
            updateLanternColors();
        }
        
        // Hall particles
        const hallParticles = document.getElementById('hallParticles');
        if (hallParticles) {
            for (let i = 0; i < 35; i++) {
                const p = document.createElement('div');
                p.className = 'hall-bg-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDuration = (Math.random() * 12 + 8) + 's';
                p.style.animationDelay = Math.random() * 12 + 's';
                hallParticles.appendChild(p);
            }
        }
        
        // Additional functionality
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        const portalBtn = document.getElementById('portalBtn');
        if (portalBtn) portalBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        const scrollHint = document.getElementById('scrollHint');
        if (scrollHint) scrollHint.addEventListener('click', () => { document.querySelector('.great-hall')?.scrollIntoView({ behavior: 'smooth' }); });
        const previewBtn = document.getElementById('previewBookBtn');
        if (previewBtn) previewBtn.addEventListener('click', () => window.open('sample.pdf', '_blank'));
        const whatsappLink = document.getElementById('whatsappLink');
        if (whatsappLink) whatsappLink.addEventListener('click', (e) => { e.preventDefault(); alert('WhatsApp: [ADD YOUR NUMBER]'); });
        
        const cookieConsent = document.getElementById('cookieConsent');
        if (cookieConsent && !localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesDeclined')) cookieConsent.classList.add('show');
        const acceptCookies = document.getElementById('acceptCookies');
        if (acceptCookies) acceptCookies.addEventListener('click', () => { localStorage.setItem('cookiesAccepted', 'true'); cookieConsent.classList.remove('show'); });
        const declineCookies = document.getElementById('declineCookies');
        if (declineCookies) declineCookies.addEventListener('click', () => { localStorage.setItem('cookiesDeclined', 'true'); cookieConsent.classList.remove('show'); });
        
        function animate() {
            t++;
            render();
            requestAnimationFrame(animate);
        }
        
        animate();
        window.addEventListener('resize', () => { resize(); });
    }
})();
