// The Horseman's Journal - Global JavaScript
// Canvas animation, lantern navigation, and interactive elements
// FIXED: Correct canvas ID 'heroCanvas' - horses will now appear!

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // FIXED: Changed from 'worldCanvas' to 'heroCanvas' to match your HTML
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) {
            console.error('heroCanvas not found!');
            return;
        }
        
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
        
        // ENHANCED COLOR PALETTE
        const skyColors = {
            top: '#0a0a2a',
            mid: '#1a1a4a',
            bottom: '#3a2a3a',
            horizon: '#5a3a2a'
        };
        
        // Generate stars with colors
        const stars = Array.from({length: 400}, () => ({
            x: Math.random(), y: Math.random() * 0.55,
            r: Math.random() * 2 + 0.3,
            sp: Math.random() * 0.015 + 0.003,
            off: Math.random() * Math.PI * 2,
            ba: Math.random() * 0.7 + 0.2,
            color: `hsl(${Math.random() * 60 + 20}, ${Math.random() * 50 + 50}%, ${Math.random() * 40 + 60}%)`
        }));
        
        // Enhanced grass with more color variation
        const grass = Array.from({length: 700}, () => ({
            x: Math.random(), by: 0.68 + Math.random() * 0.32,
            h: Math.random() * 45 + 15,
            sp: Math.random() * 0.02 + 0.005,
            off: Math.random() * Math.PI * 2,
            color: Math.random() > 0.7 ? '#4a3a2a' : '#2a3a1a'
        }));
        
        // Fireflies with warm glow
        const flies = Array.from({length: 60}, () => ({
            x: Math.random(), y: 0.68 + Math.random() * 0.28,
            r: Math.random() * 2 + 0.5,
            sp: Math.random() * 0.3 + 0.1,
            ph: Math.random() * Math.PI * 2,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.2,
            color: `hsl(${Math.random() * 40 + 40}, 80%, ${Math.random() * 30 + 50}%)`
        }));
        
        // Aurora borealis bands
        const auroraColors = ['#2a5a4a', '#4a2a6a', '#3a4a7a', '#5a3a4a'];
        
        // ENHANCED MOON with pulsating glow
        function drawRealisticMoon(x, y, radius) {
            const pulse = Math.sin(t * 0.02) * 0.1 + 0.9;
            
            // Outer glow - warm golden
            const glowGrad = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 2.2);
            glowGrad.addColorStop(0, `rgba(255,220,120,${0.25 * pulse})`);
            glowGrad.addColorStop(0.4, `rgba(255,180,80,${0.12 * pulse})`);
            glowGrad.addColorStop(0.7, `rgba(200,120,40,0.05)`);
            glowGrad.addColorStop(1, 'rgba(100,50,20,0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2);
            ctx.fill();
            
            // Moon base - warm amber/gold
            const moonGrad = ctx.createRadialGradient(x - radius * 0.25, y - radius * 0.25, radius * 0.2, x, y, radius);
            moonGrad.addColorStop(0, `rgba(255,235,180,0.98)`);
            moonGrad.addColorStop(0.4, `rgba(245,210,140,0.9)`);
            moonGrad.addColorStop(0.7, `rgba(220,170,100,0.85)`);
            moonGrad.addColorStop(1, `rgba(180,130,70,0.8)`);
            ctx.fillStyle = moonGrad;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Craters
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
            
            // Moon texture
            for (let i = 0; i < 100; i++) {
                const angle = Math.random() * Math.PI * 2;
                const rad = Math.random() * radius * 0.9;
                const dx = Math.cos(angle) * rad;
                const dy = Math.sin(angle) * rad;
                ctx.fillStyle = `rgba(160,110,50,${Math.random() * 0.2})`;
                ctx.beginPath();
                ctx.arc(x + dx, y + dy, Math.random() * 2 + 0.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Horse drawing function - SUPPORTS GUARDIAN HORSES
        function horse(hx, hy, sc, coat, mane, pose, flip, isGuardian = false) {
            ctx.save();
            ctx.translate(hx, hy);
            const actualScale = isGuardian ? sc * 2.2 : sc;
            if (flip) ctx.scale(-actualScale, actualScale);
            else ctx.scale(actualScale, actualScale);
            
            // Guardian horses have NO movement (breath, leg, tail all static)
            const useMovement = !isGuardian;
            const br = useMovement ? Math.sin(t * 0.018 + hx * 0.01) * 1.5 : 0;
            
            // Guardian horses have a subtle golden glow
            if (isGuardian) {
                ctx.shadowColor = 'rgba(212,175,55,0.2)';
                ctx.shadowBlur = 10;
            }
            
            if (pose === 'guardian') {
                // Special majestic pose for guardian horses
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
                const ts = useMovement ? Math.sin(t * 0.022) * 2.8 : 0;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(-32, 1);
                ctx.quadraticCurveTo(-42, -6, -38 + ts, -16);
                ctx.stroke();
                if (useMovement) {
                    ctx.strokeStyle = mane;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(-28, 5);
                    ctx.quadraticCurveTo(-38, 10, -36 + ts * 0.5, 22);
                    ctx.stroke();
                }
            } else if (pose === 'sentinel') {
                ctx.fillStyle = coat;
                [-15, -3, 7, 17].forEach((lx, i) => {
                    const offset = useMovement ? (i % 2 ? br : -br) : 0;
                    ctx.fillRect(lx, 14 + offset, 4, 24);
                });
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
                const ts = useMovement ? Math.sin(t * 0.025) * 2 : 0;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.moveTo(-26, 2);
                ctx.quadraticCurveTo(-34, -5, -32 + ts, -14);
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
                const ts = useMovement ? Math.sin(t * 0.022) * 2.5 : 0;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-32, 1);
                ctx.quadraticCurveTo(-42, -6, -38 + ts, -16);
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
                const ts = useMovement ? Math.sin(t * 0.02) * 2 : 0;
                ctx.strokeStyle = mane;
                ctx.lineWidth = 1.4;
                ctx.beginPath();
                ctx.moveTo(-24, 3);
                ctx.quadraticCurveTo(-30, -4, -28 + ts, -12);
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
                const ts = useMovement ? Math.sin(t * 0.025 + hx * 0.03) * 3 : 0;
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
        
        // THE HERD - WITH 2 NEW GUARDIAN HORSES (left and right) + original small horses
        const herd = [
            // NEW GUARDIAN HORSE - LEFT SIDE (large, stands still)
            { x: 0.05, y: 0.76, s: 0.95, coat: '#0d0a0e', mane: '#1a1418', pose: 'guardian', flip: false, isGuardian: true },
            // NEW GUARDIAN HORSE - RIGHT SIDE (large, stands still)
            { x: 0.95, y: 0.76, s: 0.95, coat: '#0d0a0e', mane: '#1a1418', pose: 'guardian', flip: true, isGuardian: true },
            // Original small horses (will move)
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
        
        // LANTERNS WITH COLOR SHIFT - MUTED/LESS BRIGHT
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
            color: `hsl(${c.baseHue}, 45%, 45%)`, // MUTED
            lx: [0.16, 0.34, 0.52, 0.68, 0.82, 0.90][i],
            ly: [0.44, 0.38, 0.34, 0.38, 0.42, 0.48][i],
            depth: [0.6, 0.7, 0.8, 0.65, 0.55, 0.5][i],
            baseHue: c.baseHue,
            shiftSpeed: c.shiftSpeed
        }));
        
        const pageMap = ['about.html', 'awakening.html', 'chronicles.html', 'companions.html', 'essays.html', 'questions.html'];
        
        // Create lantern elements with MUTED colors
        const lanternsDiv = document.getElementById('lanterns');
        const lanternEls = [];
        
        if (lanternsDiv) {
            sections.forEach((s, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:absolute;z-index:8;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);`;
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
        
        // Main render function
        function render() {
            ctx.clearRect(0, 0, W, H);
            
            // DYNAMIC SKY GRADIENT
            const skyPulse = Math.sin(t * 0.01) * 0.05;
            const sg = ctx.createLinearGradient(0, 0, 0, H);
            sg.addColorStop(0, `#0a0a2a`);
            sg.addColorStop(0.25, `#151540`);
            sg.addColorStop(0.5, `#2a1a3a`);
            sg.addColorStop(0.75, `#3a2a3a`);
            sg.addColorStop(1, `#4a352a`);
            ctx.fillStyle = sg;
            ctx.fillRect(0, 0, W, H);
            
            // AURORA BOREALIS
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
            
            // WARM SUNSET GLOW at horizon
            const horizonGrad = ctx.createLinearGradient(0, H * 0.55, 0, H * 0.75);
            horizonGrad.addColorStop(0, 'rgba(180,100,60,0)');
            horizonGrad.addColorStop(0.5, 'rgba(200,120,70,0.12)');
            horizonGrad.addColorStop(1, 'rgba(160,80,40,0.25)');
            ctx.fillStyle = horizonGrad;
            ctx.fillRect(0, H * 0.55, W, H * 0.25);
            
            // Draw realistic moon
            const moonX = W * 0.78, moonY = H * 0.16;
            drawRealisticMoon(moonX, moonY, 42);
            ctx.shadowBlur = 0;
            
            // COLORED TWINKLING STARS
            stars.forEach(s => {
                const tw = Math.sin(t * s.sp + s.off) * 0.4 + 0.6;
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.ba * tw * 0.8;
                ctx.shadowColor = `rgba(255,200,100,${0.3 * tw})`;
                ctx.shadowBlur = s.r * 1.5;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.r * tw * 0.6, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            
            // Distant ground with warm undertone
            ctx.fillStyle = 'rgba(10,8,20,0.75)';
            ctx.beginPath();
            ctx.moveTo(0, H * 0.66);
            for (let i = 0; i <= 70; i++) {
                const nx = i / 70;
                ctx.lineTo(nx * W, H * 0.62 - Math.sin(nx * 3.8) * H * 0.022 - Math.sin(nx * 8) * H * 0.015);
            }
            ctx.lineTo(W, H * 0.66);
            ctx.closePath();
            ctx.fill();
            
            // Ground layers with richer colors
            const groundColors = ['#0c0a1c', '#12102a', '#1a1535', '#221d3a'];
            groundColors.forEach((col, i) => {
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(0, H);
                for (let j = 0; j <= 90; j++) {
                    const nx = j / 90;
                    const h = H * (0.72 + i * 0.055 - Math.sin(nx * (2.5 + i * 1.3) + i) * 0.045 - Math.sin(nx * (6 + i * 2.5)) * 0.025);
                    ctx.lineTo(nx * W, h);
                }
                ctx.lineTo(W, H);
                ctx.closePath();
                ctx.fill();
            });
            
            // Lake with warm reflection
            const lakeY = H * 0.73;
            const lakeGrad = ctx.createLinearGradient(0, lakeY, 0, lakeY + H * 0.05);
            lakeGrad.addColorStop(0, 'rgba(30,25,50,0.45)');
            lakeGrad.addColorStop(0.5, 'rgba(25,20,45,0.25)');
            lakeGrad.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = lakeGrad;
            ctx.fillRect(0, lakeY, W, H * 0.05);
            
            for (let i = 0; i < 60; i++) {
                ctx.fillStyle = `rgba(255,220,150,${0.05 * (0.5 + 0.5 * Math.sin(t * 0.03 + i))})`;
                ctx.beginPath();
                ctx.arc((Math.sin(i * 131.7) * 0.5 + 0.5) * W, lakeY + 3 + Math.random() * H * 0.025, 0.6, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // Mist and atmosphere
            const mistGrad = ctx.createLinearGradient(0, H * 0.75, 0, H);
            mistGrad.addColorStop(0, 'rgba(20,18,35,0)');
            mistGrad.addColorStop(0.4, 'rgba(20,18,35,0.1)');
            mistGrad.addColorStop(0.7, 'rgba(30,25,45,0.2)');
            mistGrad.addColorStop(1, 'rgba(20,15,35,0.35)');
            ctx.fillStyle = mistGrad;
            ctx.fillRect(0, H * 0.75, W, H * 0.25);
            
            // Grass with autumn/warm colors
            grass.forEach(g => {
                const sw = Math.sin(t * g.sp + g.off) * 9;
                ctx.strokeStyle = g.color;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(g.x * W, g.by * H);
                ctx.quadraticCurveTo(g.x * W + sw * 0.45, g.by * H - g.h * 0.5, g.x * W + sw, g.by * H - g.h);
                ctx.stroke();
            });
            
            // Draw ALL horses (guardians + small moving horses)
            herd.forEach(h => {
                horse(h.x * W + (mx - 0.5) * 35 * h.s, 
                      h.y * H + (my - 0.5) * 12 * h.s, 
                      h.s, h.coat, h.mane, h.pose, h.flip, h.isGuardian);
            });
            
            // Fireflies with warm glow
            flies.forEach(f => {
                f.x += Math.sin(t * 0.02 + f.ph) * f.dx;
                f.y += Math.cos(t * 0.022 + f.ph) * f.dy;
                f.x = ((f.x % 1) + 1) % 1;
                f.y = Math.max(0.66, Math.min(0.96, f.y));
                const a = Math.abs(Math.sin(t * f.sp + f.ph)) * 0.6;
                ctx.fillStyle = f.color;
                ctx.globalAlpha = a;
                ctx.shadowColor = 'rgba(255,200,100,0.6)';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(f.x * W, f.y * H, f.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            
            // Light pools under lanterns with MUTED colors
            sections.forEach((s, idx) => {
                const lx = s.lx * W + (mx - 0.5) * 20 * s.depth;
                const ly = s.ly * H + (my - 0.5) * 10 * s.depth;
                const currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                const poolColor = `hsla(${currentHue}, 40%, 35%, 0.08)`;
                const poolGrad = ctx.createRadialGradient(lx, ly + 35, 5, lx, ly + 35, 95);
                poolGrad.addColorStop(0, poolColor);
                poolGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = poolGrad;
                ctx.beginPath();
                ctx.arc(lx, ly + 35, 95, 0, Math.PI * 2);
                ctx.fill();
            });
            
            // Update lantern colors dynamically - MUTED
            lanternEls.forEach(({ glowEl, s }, idx) => {
                if (glowEl) {
                    const currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                    glowEl.style.background = `radial-gradient(circle at 50% 30%, rgba(200,180,150,0.55), hsla(${currentHue}, 42%, 35%, 0.75) 60%, rgba(0,0,0,0.65) 100%)`;
                    glowEl.style.boxShadow = `0 0 15px hsla(${currentHue}, 40%, 28%, 0.5), 0 0 30px hsla(${currentHue}, 35%, 22%, 0.35)`;
                }
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
            if (hintOverlay) hintOverlay.style.opacity = idle ? '0' : '0.7';
            
            requestAnimationFrame(animate);
        }
        
        animate();
        window.addEventListener('resize', () => {
            resize();
        });
    }
})();
