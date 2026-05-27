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
        
        // Function to draw realistic moon with craters
        function drawRealisticMoon(x, y, radius) {
            // Outer glow
            const glowGrad = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 1.8);
            glowGrad.addColorStop(0, 'rgba(212,175,55,0.12)');
            glowGrad.addColorStop(0.5, 'rgba(200,150,50,0.06)');
            glowGrad.addColorStop(1, 'rgba(180,100,30,0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
            ctx.fill();
            
            // Moon base - warm golden/amber
            const moonGrad = ctx.createRadialGradient(x - radius * 0.2, y - radius * 0.2, radius * 0.2, x, y, radius);
            moonGrad.addColorStop(0, 'rgba(245,225,180,0.95)');
            moonGrad.addColorStop(0.5, 'rgba(235,205,150,0.85)');
            moonGrad.addColorStop(1, 'rgba(200,160,100,0.75)');
            ctx.fillStyle = moonGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Craters
            ctx.shadowBlur = 0;
            const craters = [
                { cx: -radius * 0.35, cy: -radius * 0.25, r: radius * 0.12 },
                { cx: radius * 0.4, cy: -radius * 0.15, r: radius * 0.1 },
                { cx: radius * 0.15, cy: radius * 0.3, r: radius * 0.08 },
                { cx: -radius * 0.2, cy: radius * 0.35, r: radius * 0.06 },
                { cx: -radius * 0.5, cy: radius * 0.1, r: radius * 0.07 },
                { cx: radius * 0.3, cy: radius * 0.1, r: radius * 0.05 },
                { cx: -radius * 0.1, cy: -radius * 0.45, r: radius * 0.05 },
                { cx: radius * 0.5, cy: -radius * 0.4, r: radius * 0.04 },
            ];
            
            craters.forEach(crater => {
                const craterX = x + crater.cx;
                const craterY = y + crater.cy;
                const craterR = crater.r;
                
                // Dark crater interior
                ctx.fillStyle = 'rgba(160,110,50,0.35)';
                ctx.beginPath();
                ctx.ellipse(craterX, craterY, craterR, craterR * 0.85, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Crater rim highlight
                ctx.fillStyle = 'rgba(245,225,180,0.25)';
                ctx.beginPath();
                ctx.ellipse(craterX - craterR * 0.2, craterY - craterR * 0.15, craterR * 0.4, craterR * 0.25, 0, 0, Math.PI * 2);
                ctx.fill();
                
                // Crater shadow
                ctx.fillStyle = 'rgba(100,70,30,0.2)';
                ctx.beginPath();
                ctx.ellipse(craterX + craterR * 0.15, craterY + craterR * 0.1, craterR * 0.3, craterR * 0.2, 0, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Subtle moon texture
            for (let i = 0; i < 60; i++) {
                const angle = Math.random() * Math.PI * 2;
                const rad = Math.random() * radius * 0.9;
                const dx = Math.cos(angle) * rad;
                const dy = Math.sin(angle) * rad;
                ctx.fillStyle = `rgba(180,130,70,${Math.random() * 0.15})`;
                ctx.beginPath();
                ctx.arc(x + dx, y + dy, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
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
        
        // Sections for lanterns - UPDATED with gold color
        const sections = [
            { name: 'About', color: '#D4AF37', lx: 0.16, ly: 0.44, depth: 0.6 },
            { name: 'Awakening', color: '#D4AF37', lx: 0.34, ly: 0.38, depth: 0.7 },
            { name: 'Chronicles', color: '#D4AF37', lx: 0.52, ly: 0.34, depth: 0.8 },
            { name: 'Companions', color: '#D4AF37', lx: 0.68, ly: 0.38, depth: 0.65 },
            { name: 'Verses', color: '#D4AF37', lx: 0.82, ly: 0.42, depth: 0.55 },
            { name: 'Questions', color: '#D4AF37', lx: 0.90, ly: 0.48, depth: 0.5 },
        ];
        
        // Page map
        const pageMap = ['about.html', 'awakening.html', 'chronicles.html', 'companions.html', 'essays.html', 'questions.html'];
        
        // Create lantern elements
        const lanternsDiv = document.getElementById('lanterns');
        const lanternEls = [];
        
        if (lanternsDiv) {
            sections.forEach((s, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:absolute;z-index:8;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);`;
                el.innerHTML = `<div class="lantern-glow" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:20px;height:28px;border-radius:12px 12px 6px 6px;background:radial-gradient(circle at 50% 40%,rgba(255,240,200,0.5),${s.color} 70%,rgba(0,0,0,0.6) 100%);box-shadow:0 0 18px ${s.color},0 0 40px ${s.color}44;animation:lanternBob ${3 + i * 0.4}s ease-in-out infinite;transition:box-shadow .4s,filter .4s;"></div><div style="position:absolute;top:26px;left:50%;transform:translateX(-50%);width:2px;height:10px;background:rgba(200,180,150,0.4);"></div><div style="position:absolute;top:34px;left:50%;transform:translateX(-50%);width:1px;height:16px;background:rgba(200,180,150,0.2);"></div><div class="lantern-label" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .35s;white-space:nowrap;"><span style="font-family:'Cinzel',serif;font-size:.58rem;font-weight:600;letter-spacing:2px;color:#D4AF37;display:block;">${s.name}</span></div>`;
                
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
            sg.addColorStop(0, '#1a1628');
            sg.addColorStop(0.3, '#201c30');
            sg.addColorStop(0.55, '#2a2540');
            sg.addColorStop(0.72, '#2f2a45');
            sg.addColorStop(1, '#201e30');
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
            
            // Draw realistic moon with craters
            const moonX = W * 0.78, moonY = H * 0.16;
            drawRealisticMoon(moonX, moonY, 38);
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
