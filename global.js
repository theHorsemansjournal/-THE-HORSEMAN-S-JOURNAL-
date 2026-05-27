// The Horseman's Journal - Global JavaScript
// DREAMLIME FLOATING PARADISE with Guardian Horses

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
        
        // DREAMLIKE COLOR PALETTE - Ethereal, mystical
        const skyColors = {
            top: '#0a0a2a',
            mid: '#1a1a4a',
            bottom: '#2a1a3a',
            horizon: '#3a2a4a'
        };
        
        // Floating clouds particles
        const clouds = Array.from({length: 35}, () => ({
            x: Math.random(), y: Math.random() * 0.5,
            size: Math.random() * 80 + 40,
            opacity: Math.random() * 0.3 + 0.1,
            speed: Math.random() * 0.002 + 0.001,
            phase: Math.random() * Math.PI * 2
        }));
        
        // Floating islands/ground fragments
        const floatingIslands = [
            { x: 0.15, y: 0.72, width: 0.28, height: 0.08, texture: '#2a1a2a' },
            { x: 0.55, y: 0.74, width: 0.32, height: 0.09, texture: '#1a152a' },
            { x: 0.82, y: 0.70, width: 0.22, height: 0.07, texture: '#251a30' },
            { x: 0.35, y: 0.78, width: 0.20, height: 0.06, texture: '#1f1a2a' },
            { x: 0.70, y: 0.79, width: 0.18, height: 0.06, texture: '#2a1f35' }
        ];
        
        // DREAMLIKE STARS with pastel colors
        const stars = Array.from({length: 500}, () => ({
            x: Math.random(), y: Math.random() * 0.6,
            r: Math.random() * 2.5 + 0.3,
            sp: Math.random() * 0.015 + 0.003,
            off: Math.random() * Math.PI * 2,
            ba: Math.random() * 0.6 + 0.3,
            color: `hsl(${Math.random() * 60 + 200}, ${Math.random() * 50 + 40}%, ${Math.random() * 30 + 60}%)`
        }));
        
        // Ethereal grass
        const grass = Array.from({length: 600}, () => ({
            x: Math.random(), by: 0.68 + Math.random() * 0.32,
            h: Math.random() * 35 + 12,
            sp: Math.random() * 0.02 + 0.005,
            off: Math.random() * Math.PI * 2,
            color: `hsl(${Math.random() * 40 + 260}, ${Math.random() * 30 + 40}%, ${Math.random() * 20 + 35}%)`
        }));
        
        // Mystical floating particles
        const mysticalParticles = Array.from({length: 150}, () => ({
            x: Math.random(), y: Math.random(),
            r: Math.random() * 2 + 0.5,
            sp: Math.random() * 0.02 + 0.005,
            ph: Math.random() * Math.PI * 2,
            dx: (Math.random() - 0.5) * 0.2,
            dy: (Math.random() - 0.5) * 0.15,
            color: `hsl(${Math.random() * 60 + 220}, ${Math.random() * 40 + 50}%, ${Math.random() * 30 + 55}%)`
        }));
        
        // Dreamlike drifting sparkles
        const sparkles = Array.from({length: 200}, () => ({
            x: Math.random(), y: Math.random(),
            size: Math.random() * 1.5 + 0.3,
            life: Math.random(),
            speed: 0.003 + Math.random() * 0.007,
            color: `hsl(${Math.random() * 40 + 260}, 70%, 65%)`
        }));
        
        // Floating waterfall mist
        const mistParticles = Array.from({length: 80}, () => ({
            x: Math.random(), y: Math.random() * 0.5 + 0.4,
            size: Math.random() * 3 + 1,
            alpha: Math.random() * 0.2,
            driftX: (Math.random() - 0.5) * 0.01,
            driftY: Math.random() * 0.01 + 0.005
        }));
        
        // DREAMLIT MOON - larger, more magical
        function drawDreamMoon(x, y, radius) {
            const pulse = Math.sin(t * 0.015) * 0.08 + 0.92;
            
            // Outer ethereal glow
            const glowGrad = ctx.createRadialGradient(x, y, radius * 0.2, x, y, radius * 2.8);
            glowGrad.addColorStop(0, `rgba(180,150,220,${0.2 * pulse})`);
            glowGrad.addColorStop(0.3, `rgba(140,110,200,${0.1 * pulse})`);
            glowGrad.addColorStop(0.6, `rgba(100,70,160,0.04)`);
            glowGrad.addColorStop(1, 'rgba(60,40,100,0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.5, 0, Math.PI * 2);
            ctx.fill();
            
            // Moon base - lavender/purple dream hue
            const moonGrad = ctx.createRadialGradient(x - radius * 0.3, y - radius * 0.3, radius * 0.15, x, y, radius);
            moonGrad.addColorStop(0, `rgba(220,200,255,0.95)`);
            moonGrad.addColorStop(0.4, `rgba(190,160,230,0.9)`);
            moonGrad.addColorStop(0.7, `rgba(150,120,200,0.85)`);
            moonGrad.addColorStop(1, `rgba(110,80,170,0.8)`);
            ctx.fillStyle = moonGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Ethereal craters
            ctx.shadowBlur = 0;
            const craters = [
                { cx: -radius * 0.35, cy: -radius * 0.3, r: radius * 0.12 },
                { cx: radius * 0.4, cy: -radius * 0.2, r: radius * 0.1 },
                { cx: radius * 0.2, cy: radius * 0.3, r: radius * 0.08 },
                { cx: -radius * 0.25, cy: radius * 0.35, r: radius * 0.07 },
                { cx: -radius * 0.5, cy: radius * 0.1, r: radius * 0.09 },
                { cx: radius * 0.35, cy: radius * 0.1, r: radius * 0.06 }
            ];
            
            craters.forEach(crater => {
                ctx.fillStyle = 'rgba(80,60,120,0.35)';
                ctx.beginPath();
                ctx.ellipse(x + crater.cx, y + crater.cy, crater.r, crater.r * 0.85, 0, 0, Math.PI * 2);
                ctx.fill();
                
                ctx.fillStyle = 'rgba(220,200,255,0.15)';
                ctx.beginPath();
                ctx.ellipse(x + crater.cx - crater.r * 0.2, y + crater.cy - crater.r * 0.15, crater.r * 0.3, crater.r * 0.2, 0, 0, Math.PI * 2);
                ctx.fill();
            });
        }
        
        // ENHANCED HORSE DRAWING with guardian size option
        function drawHorse(hx, hy, sc, coat, mane, pose, flip, isGuardian = false) {
            ctx.save();
            ctx.translate(hx, hy);
            const actualScale = isGuardian ? sc * 2.2 : sc;
            if (flip) ctx.scale(-actualScale, actualScale);
            else ctx.scale(actualScale, actualScale);
            
            const br = Math.sin(t * 0.018 + hx * 0.01) * 1.5;
            
            // Guardian horses have ethereal glow
            if (isGuardian) {
                ctx.shadowColor = 'rgba(155,89,182,0.5)';
                ctx.shadowBlur = 15;
            }
            
            if (pose === 'sentinel') {
                ctx.fillStyle = coat;
                [-15, -3, 7, 17].forEach((lx, i) => ctx.fillRect(lx, 14, 4, 24));
                ctx.beginPath();
                ctx.ellipse(0, 4, 32, 15, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(20, 0);
                ctx.quadraticCurveTo(30, -30, 26, -44);
                ctx.quadraticCurveTo(20, -30, 10, -2);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(26, -46, 9, 6, -0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(26, -50);
                ctx.lineTo(24, -58);
                ctx.lineTo(22, -50);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(28, -50);
                ctx.lineTo(30, -58);
                ctx.lineTo(28, -50);
                ctx.fill();
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(20, -4);
                ctx.quadraticCurveTo(24, -20, 28, -35);
                ctx.stroke();
                const ts = Math.sin(t * 0.025) * 2.5;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(-28, 2);
                ctx.quadraticCurveTo(-36, -6, -34 + ts, -16);
                ctx.stroke();
            } else if (pose === 'guardian') {
                // Guardian pose - majestic standing tall
                ctx.fillStyle = coat;
                [-18, -4, 8, 22].forEach((lx, i) => ctx.fillRect(lx, 12, 5, 30));
                ctx.beginPath();
                ctx.ellipse(0, 3, 36, 17, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(24, -1);
                ctx.quadraticCurveTo(36, -34, 30, -50);
                ctx.quadraticCurveTo(22, -34, 12, -4);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(30, -52, 10, 7, -0.1, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(30, -57);
                ctx.lineTo(27, -66);
                ctx.lineTo(24, -57);
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(32, -57);
                ctx.lineTo(35, -66);
                ctx.lineTo(32, -57);
                ctx.fill();
                // Majestic mane flowing
                ctx.strokeStyle = mane;
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                ctx.moveTo(24, -5);
                ctx.quadraticCurveTo(30, -24, 34, -42);
                ctx.stroke();
                const ts = Math.sin(t * 0.02) * 3;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(-34, 1);
                ctx.quadraticCurveTo(-44, -8, -40 + ts, -20);
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
            
            ctx.shadowBlur = 0;
            ctx.restore();
        }
        
        // THE HERD - with 2 GUARDIAN HORSES on left and right (large)
        const herd = [
            // Left Guardian (large, majestic)
            { x: 0.08, y: 0.75, s: 0.95, coat: '#1a0a0e', mane: '#2a1420', pose: 'guardian', flip: false, isGuardian: true },
            // Right Guardian (large, majestic)
            { x: 0.92, y: 0.75, s: 0.95, coat: '#1a0a0e', mane: '#2a1420', pose: 'guardian', flip: true, isGuardian: true },
            // Inner horses (normal size)
            { x: 0.18, y: 0.82, s: 0.70, coat: '#2a1a12', mane: '#3a2818', pose: 'graze', flip: false, isGuardian: false },
            { x: 0.30, y: 0.80, s: 0.78, coat: '#1a1618', mane: '#2a2428', pose: 'sentinel', flip: true, isGuardian: false },
            { x: 0.42, y: 0.83, s: 0.55, coat: '#3a2818', mane: '#4a3020', pose: 'graze', flip: false, isGuardian: false },
            { x: 0.52, y: 0.81, s: 0.72, coat: '#4a3222', mane: '#5a3e2a', pose: 'nuzzle', flip: false, isGuardian: false },
            { x: 0.60, y: 0.83, s: 0.68, coat: '#3a3035', mane: '#4a4045', pose: 'nuzzle', flip: true, isGuardian: false },
            { x: 0.72, y: 0.81, s: 0.85, coat: '#5a4828', mane: '#6a5530', pose: 'sentinel', flip: false, isGuardian: false },
            { x: 0.84, y: 0.82, s: 0.75, coat: '#141018', mane: '#221e26', pose: 'graze', flip: false, isGuardian: false },
            // Foreground horse
            { x: 0.50, y: 0.92, s: 1.50, coat: '#080608', mane: '#141018', pose: 'foreground', flip: false, isGuardian: false },
        ];
        
        // LANTERNS with mystical colors
        const sectionColors = [
            { name: 'About', baseHue: 280, shiftSpeed: 0.25 },
            { name: 'Awakening', baseHue: 260, shiftSpeed: 0.3 },
            { name: 'Chronicles', baseHue: 290, shiftSpeed: 0.28 },
            { name: 'Companions', baseHue: 270, shiftSpeed: 0.22 },
            { name: 'Verses', baseHue: 300, shiftSpeed: 0.32 },
            { name: 'Questions', baseHue: 285, shiftSpeed: 0.25 }
        ];
        
        const sections = sectionColors.map((c, i) => ({
            name: c.name,
            color: `hsl(${c.baseHue}, 45%, 50%)`,
            lx: [0.16, 0.34, 0.52, 0.68, 0.82, 0.90][i],
            ly: [0.38, 0.34, 0.30, 0.34, 0.38, 0.42][i],
            depth: [0.6, 0.7, 0.8, 0.65, 0.55, 0.5][i],
            baseHue: c.baseHue,
            shiftSpeed: c.shiftSpeed
        }));
        
        const pageMap = ['about.html', 'awakening.html', 'chronicles.html', 'companions.html', 'essays.html', 'questions.html'];
        
        // Create lantern elements
        const lanternsDiv = document.getElementById('lanterns');
        const lanternEls = [];
        
        if (lanternsDiv) {
            sections.forEach((s, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:absolute;z-index:8;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);`;
                el.innerHTML = `<div class="lantern-glow" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:22px;height:30px;border-radius:12px 12px 8px 8px;background:radial-gradient(circle at 50% 30%, rgba(200,180,220,0.5), hsla(${s.baseHue}, 45%, 40%, 0.7) 60%, rgba(0,0,0,0.6) 100%);box-shadow:0 0 15px hsla(${s.baseHue}, 50%, 35%, 0.5),0 0 30px hsla(${s.baseHue}, 45%, 30%, 0.3);animation:lanternBob ${3 + i * 0.4}s ease-in-out infinite;transition:box-shadow .4s,filter .4s,background .2s;"></div><div style="position:absolute;top:28px;left:50%;transform:translateX(-50%);width:2px;height:12px;background:rgba(180,160,200,0.4);"></div><div style="position:absolute;top:36px;left:50%;transform:translateX(-50%);width:1px;height:18px;background:rgba(180,160,200,0.2);"></div><div class="lantern-label" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .35s;white-space:nowrap;"><span style="font-family:'Cinzel',serif;font-size:.6rem;font-weight:600;letter-spacing:2px;color:#A569BD;display:block;text-shadow:0 0 5px rgba(0,0,0,0.5);">${s.name}</span></div>`;
                
                const glowEl = el.querySelector('.lantern-glow');
                const labelEl = el.querySelector('.lantern-label');
                
                el.addEventListener('mouseenter', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 25px hsla(${s.baseHue}, 50%, 45%, 0.6),0 0 45px hsla(${s.baseHue}, 45%, 40%, 0.4)`;
                        glowEl.style.filter = 'brightness(1.2)';
                    }
                    if (labelEl) labelEl.style.opacity = '1';
                });
                
                el.addEventListener('mouseleave', () => {
                    if (glowEl) {
                        glowEl.style.boxShadow = `0 0 15px hsla(${s.baseHue}, 45%, 35%, 0.5),0 0 30px hsla(${s.baseHue}, 40%, 30%, 0.3)`;
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
        
        // Draw floating ground/clouds beneath
        function drawFloatingGround() {
            // Floating islands
            floatingIslands.forEach(island => {
                const islandX = island.x * W;
                const islandY = island.y * H;
                const islandW = island.width * W;
                const islandH = island.height * H;
                
                // Island base
                ctx.fillStyle = island.texture;
                ctx.beginPath();
                ctx.ellipse(islandX + islandW/2, islandY + islandH/2, islandW/2, islandH/2, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Island edge glow
                ctx.fillStyle = 'rgba(100,70,140,0.15)';
                ctx.beginPath();
                ctx.ellipse(islandX + islandW/2, islandY + islandH/2 - 3, islandW/2 - 5, islandH/2 - 3, 0, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Dream clouds beneath the floating islands
            clouds.forEach(cloud => {
                const cloudX = cloud.x * W;
                const cloudY = cloud.y * H + H * 0.65;
                const drift = Math.sin(t * cloud.speed + cloud.phase) * 5;
                
                ctx.fillStyle = `rgba(180,160,210,${cloud.opacity * 0.4})`;
                ctx.beginPath();
                ctx.ellipse(cloudX + drift, cloudY, cloud.size, cloud.size * 0.4, 0, 0, Math.PI * 2);
                ctx.ellipse(cloudX + drift - cloud.size * 0.4, cloudY - 5, cloud.size * 0.7, cloud.size * 0.35, 0, 0, Math.PI * 2);
                ctx.ellipse(cloudX + drift + cloud.size * 0.4, cloudY - 5, cloud.size * 0.7, cloud.size * 0.35, 0, 0, Math.PI * 2);
                ctx.fill();
            });
        }
        
        function render() {
            ctx.clearRect(0, 0, W, H);
            
            // Dreamy sky gradient
            const sg = ctx.createLinearGradient(0, 0, 0, H);
            sg.addColorStop(0, `#0a0a2a`);
            sg.addColorStop(0.25, `#151540`);
            sg.addColorStop(0.5, `#1a1545`);
            sg.addColorStop(0.75, `#251a45`);
            sg.addColorStop(1, `#2a1a4a`);
            ctx.fillStyle = sg;
            ctx.fillRect(0, 0, W, H);
            
            // Distant nebula/aurora effect
            for (let b = 0; b < 5; b++) {
                const bandY = H * 0.1 + b * 50;
                const bandGrad = ctx.createLinearGradient(0, bandY, 0, bandY + 80);
                bandGrad.addColorStop(0, `rgba(100,70,150,${0.03 - b * 0.005})`);
                bandGrad.addColorStop(0.5, `rgba(140,100,180,${0.05 - b * 0.008})`);
                bandGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = bandGrad;
                ctx.fillRect(0, bandY - 20, W, 100);
            }
            
            // Draw moon
            const moonX = W * 0.82, moonY = H * 0.12;
            drawDreamMoon(moonX, moonY, 48);
            ctx.shadowBlur = 0;
            
            // Stars
            stars.forEach(s => {
                const tw = Math.sin(t * s.sp + s.off) * 0.4 + 0.6;
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.ba * tw * 0.7;
                ctx.shadowColor = `rgba(200,180,255,${0.2 * tw})`;
                ctx.shadowBlur = s.r * 1.5;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.r * tw * 0.5, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            
            // Draw floating ground (the paradise ground)
            drawFloatingGround();
            
            // Draw mist particles
            mistParticles.forEach(m => {
                m.x += m.driftX;
                m.y += m.driftY;
                if (m.x < 0) m.x = 1;
                if (m.x > 1) m.x = 0;
                if (m.y > 0.7) m.y = 0.4;
                
                ctx.fillStyle = `rgba(180,160,220,${m.alpha * 0.3})`;
                ctx.beginPath();
                ctx.arc(m.x * W, m.y * H, m.size, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Ethereal grass on floating islands
            grass.forEach(g => {
                const sw = Math.sin(t * g.sp + g.off) * 7;
                ctx.strokeStyle = g.color;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(g.x * W, g.by * H - 15);
                ctx.quadraticCurveTo(g.x * W + sw * 0.4, g.by * H - 25 - g.h * 0.4, g.x * W + sw, g.by * H - 25 - g.h);
                ctx.stroke();
            });
            
            // Draw all horses (including guardians)
            herd.forEach(h => {
                drawHorse(h.x * W + (mx - 0.5) * 25 * h.s, 
                         h.y * H + (my - 0.5) * 10 * h.s, 
                         h.s, h.coat, h.mane, h.pose, h.flip, h.isGuardian);
            });
            
            // Sparkles
            sparkles.forEach(s => {
                s.life += s.speed;
                if (s.life > 1) {
                    s.life = 0;
                    s.x = Math.random();
                    s.y = Math.random() * 0.5 + 0.3;
                }
                ctx.fillStyle = s.color;
                ctx.globalAlpha = (1 - s.life) * 0.5;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.size * (1 - s.life), 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            
            // Mystical floating particles
            mysticalParticles.forEach(p => {
                p.x += p.dx * 0.005;
                p.y += p.dy * 0.005;
                if (p.x < 0) p.x = 1;
                if (p.x > 1) p.x = 0;
                if (p.y < 0) p.y = 1;
                if (p.y > 1) p.y = 0;
                
                const pulse = 0.5 + Math.sin(t * p.sp + p.ph) * 0.3;
                ctx.fillStyle = p.color;
                ctx.globalAlpha = 0.3 * pulse;
                ctx.beginPath();
                ctx.arc(p.x * W, p.y * H, p.r * pulse, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            
            // Light pools under lanterns
            sections.forEach((s, idx) => {
                const lx = s.lx * W + (mx - 0.5) * 20 * s.depth;
                const ly = s.ly * H + (my - 0.5) * 10 * s.depth;
                const poolGrad = ctx.createRadialGradient(lx, ly + 25, 5, lx, ly + 25, 70);
                poolGrad.addColorStop(0, `hsla(${s.baseHue}, 40%, 40%, 0.08)`);
                poolGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = poolGrad;
                ctx.beginPath();
                ctx.arc(lx, ly + 25, 70, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Update lantern colors
            lanternEls.forEach(({ glowEl, s }, idx) => {
                if (glowEl) {
                    const currentHue = (s.baseHue + t * 0.4 * s.shiftSpeed) % 360;
                    glowEl.style.background = `radial-gradient(circle at 50% 30%, rgba(200,180,220,0.5), hsla(${currentHue}, 45%, 38%, 0.7) 60%, rgba(0,0,0,0.65) 100%)`;
                    glowEl.style.boxShadow = `0 0 15px hsla(${currentHue}, 45%, 35%, 0.5), 0 0 30px hsla(${currentHue}, 40%, 30%, 0.35)`;
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
        
        // Create hall particles
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
            if (hintOverlay) hintOverlay.style.opacity = idle ? '0' : '0.6';
            
            requestAnimationFrame(animate);
        }
        
        animate();
        window.addEventListener('resize', () => {
            resize();
        });
    }
})();
