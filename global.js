// The Horseman's Journal - Global JavaScript (Static Book – Works on All Devices)

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        initHeroCanvas();
        // No 3D book – show static book instead
        showStaticBook();
        initLanternsAndParticles();
        initFormsAndFeatures();
        initFaviconParticles();
    }
    
    // ========== HERO CANVAS (your original, unchanged) ==========
    function initHeroCanvas() {
        const canvas = document.getElementById('heroCanvas');
        if (!canvas) { console.error('heroCanvas not found'); return; }
        const ctx = canvas.getContext('2d');
        let W, H, mx = 0.5, my = 0.5, t = 0;
        let logoOpacity = 0.95;
        let lastMove = 0;
        function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', e => { mx = e.clientX / W; my = e.clientY / H; lastMove = t; });
        
        function drawLogo(x, y, size, opacity) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(size, size);
            ctx.globalAlpha = opacity;
            ctx.fillStyle = '#D4AF37';
            ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
            ctx.shadowBlur = 15;
            ctx.beginPath();
            ctx.ellipse(0, 0, 28, 14, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(18, -6);
            ctx.quadraticCurveTo(28, -28, 24, -42);
            ctx.quadraticCurveTo(16, -28, 8, -8);
            ctx.closePath();
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(26, -46, 10, 7, -0.1, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(32, -44, 6, 5, 0, 0, Math.PI * 2);
            ctx.fill();
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
            ctx.fillStyle = '#B8860B';
            ctx.beginPath();
            ctx.ellipse(12, -28, 6, 10, -0.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(10, -42, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#8B6914';
            ctx.beginPath();
            ctx.ellipse(10, -47, 8, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(10, -45, 5, 4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#B8860B';
            ctx.beginPath();
            ctx.moveTo(16, -32);
            ctx.lineTo(28, -38);
            ctx.lineTo(24, -35);
            ctx.closePath();
            ctx.fill();
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
            ctx.fillStyle = '#D4AF37';
            ctx.fillRect(16, 8, 5, 18);
            ctx.fillRect(24, 6, 5, 18);
            ctx.fillRect(-18, 6, 5, 18);
            ctx.fillRect(-26, 8, 5, 18);
            ctx.fillStyle = '#8B6914';
            ctx.fillRect(16, 24, 5, 4);
            ctx.fillRect(24, 22, 5, 4);
            ctx.fillRect(-18, 22, 5, 4);
            ctx.fillRect(-26, 24, 5, 4);
            ctx.fillStyle = '#B8860B';
            ctx.beginPath();
            ctx.moveTo(-30, -4);
            ctx.quadraticCurveTo(-42, 0, -38, 16);
            ctx.quadraticCurveTo(-34, 8, -28, 2);
            ctx.fill();
            for (let i = 0; i < 6; i++) {
                ctx.fillRect(14 + i * 2, -18 - i * 2, 3, 6);
            }
            ctx.beginPath();
            ctx.moveTo(28, -40);
            ctx.lineTo(22, -36);
            ctx.lineTo(18, -32);
            ctx.strokeStyle = '#8B6914';
            ctx.lineWidth = 1.2;
            ctx.stroke();
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
        
        const stars = Array.from({length: 400}, () => ({
            x: Math.random(), y: Math.random() * 0.55,
            r: Math.random() * 2 + 0.3,
            sp: Math.random() * 0.015 + 0.003,
            off: Math.random() * Math.PI * 2,
            ba: Math.random() * 0.7 + 0.2,
            color: `hsl(${Math.random() * 60 + 20}, ${Math.random() * 50 + 50}%, ${Math.random() * 40 + 60}%)`
        }));
        
        const grass = Array.from({length: 700}, () => ({
            x: Math.random(), by: 0.68 + Math.random() * 0.32,
            h: Math.random() * 45 + 15,
            sp: Math.random() * 0.02 + 0.005,
            off: Math.random() * Math.PI * 2,
            color: Math.random() > 0.7 ? '#4a3a2a' : '#2a3a1a'
        }));
        
        const flies = Array.from({length: 60}, () => ({
            x: Math.random(), y: 0.68 + Math.random() * 0.28,
            r: Math.random() * 2 + 0.5,
            sp: Math.random() * 0.3 + 0.1,
            ph: Math.random() * Math.PI * 2,
            dx: (Math.random() - 0.5) * 0.35,
            dy: (Math.random() - 0.5) * 0.2,
            color: `hsl(${Math.random() * 40 + 40}, 80%, ${Math.random() * 30 + 50}%)`
        }));
        
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
        
        const sections = [
            { name: 'About', baseHue: 45, shiftSpeed: 0.3, screenX: 12, screenY: 28, depth: 0.6 },
            { name: 'Awakening', baseHue: 350, shiftSpeed: 0.4, screenX: 28, screenY: 24, depth: 0.7 },
            { name: 'Chronicles', baseHue: 30, shiftSpeed: 0.35, screenX: 44, screenY: 22, depth: 0.8 },
            { name: 'Companions', baseHue: 200, shiftSpeed: 0.25, screenX: 60, screenY: 24, depth: 0.65 },
            { name: 'Questions', baseHue: 15, shiftSpeed: 0.3, screenX: 88, screenY: 32, depth: 0.5 }
        ];
        
        function updateLanternColors() {
            const lanternEls = document.querySelectorAll('.lantern-glow');
            lanternEls.forEach((glowEl, idx) => {
                if (idx < sections.length) {
                    const s = sections[idx];
                    const currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                    glowEl.style.background = `radial-gradient(circle at 50% 30%, rgba(200,180,150,0.55), hsla(${currentHue}, 42%, 35%, 0.75) 60%, rgba(0,0,0,0.65) 100%)`;
                    glowEl.style.boxShadow = `0 0 15px hsla(${currentHue}, 40%, 28%, 0.5), 0 0 30px hsla(${currentHue}, 35%, 22%, 0.35)`;
                }
            });
        }
        
        function render() {
            ctx.clearRect(0, 0, W, H);
            const sg = ctx.createLinearGradient(0, 0, 0, H);
            sg.addColorStop(0, '#0a0a2a');
            sg.addColorStop(0.25, '#151540');
            sg.addColorStop(0.5, '#2a1a3a');
            sg.addColorStop(0.75, '#3a2a3a');
            sg.addColorStop(1, '#4a352a');
            ctx.fillStyle = sg;
            ctx.fillRect(0, 0, W, H);
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
            const horizonGrad = ctx.createLinearGradient(0, H * 0.55, 0, H * 0.75);
            horizonGrad.addColorStop(0, 'rgba(180,100,60,0)');
            horizonGrad.addColorStop(0.5, 'rgba(200,120,70,0.12)');
            horizonGrad.addColorStop(1, 'rgba(160,80,40,0.25)');
            ctx.fillStyle = horizonGrad;
            ctx.fillRect(0, H * 0.55, W, H * 0.25);
            drawRealisticMoon(W * 0.78, H * 0.16, 42);
            ctx.shadowBlur = 0;
            stars.forEach(s => {
                const tw = Math.sin(t * s.sp + s.off) * 0.4 + 0.6;
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.ba * tw * 0.8;
                ctx.beginPath();
                ctx.arc(s.x * W, s.y * H, s.r * tw * 0.6, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
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
            const mistGrad = ctx.createLinearGradient(0, H * 0.75, 0, H);
            mistGrad.addColorStop(0, 'rgba(20,18,35,0)');
            mistGrad.addColorStop(0.7, 'rgba(30,25,45,0.2)');
            mistGrad.addColorStop(1, 'rgba(20,15,35,0.35)');
            ctx.fillStyle = mistGrad;
            ctx.fillRect(0, H * 0.75, W, H * 0.25);
            grass.forEach(g => {
                const sw = Math.sin(t * g.sp + g.off) * 9;
                ctx.strokeStyle = g.color;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(g.x * W, g.by * H);
                ctx.quadraticCurveTo(g.x * W + sw * 0.45, g.by * H - g.h * 0.5, g.x * W + sw, g.by * H - g.h);
                ctx.stroke();
            });
            herd.forEach(h => {
                horse(h.x * W + (mx - 0.5) * 35 * h.s, h.y * H + (my - 0.5) * 12 * h.s, h.s, h.coat, h.mane, h.pose, h.flip, h.isGuardian);
            });
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
            const idle = t - lastMove > 200;
            logoOpacity = idle ? 0.95 : 0.15;
            drawLogo(W * 0.5, H * 0.35, 1.2, logoOpacity);
            updateLanternColors();
        }
        
        function animate() {
            t++;
            render();
            requestAnimationFrame(animate);
        }
        animate();
        window.addEventListener('resize', () => { resize(); });
    }
    
    // ========== SHOW STATIC BOOK (No Three.js – works everywhere) ==========
    function showStaticBook() {
        const container = document.querySelector('.book-hardcover-container');
        if (!container) return;
        // Ensure static book is visible
        const staticBook = container.querySelector('.book-hardcover');
        if (staticBook) {
            staticBook.style.display = 'block';
            staticBook.style.opacity = '1';
            staticBook.style.visibility = 'visible';
        }
        // Remove any Three.js canvas if present
        const canvas = container.querySelector('canvas');
        if (canvas) canvas.remove();
        // Also ensure the glow and particles container don't interfere
        const glow = container.querySelector('.book-glow');
        if (glow) glow.style.zIndex = '1';
        const particlesContainer = document.getElementById('bookParticles');
        if (particlesContainer) particlesContainer.style.zIndex = '3';
    }
    
    // ========== LANTERNS AND PARTICLES (unchanged) ==========
    function initLanternsAndParticles() {
        const sections = [
            { name: 'About', baseHue: 45, shiftSpeed: 0.3, screenX: 12, screenY: 28 },
            { name: 'Awakening', baseHue: 350, shiftSpeed: 0.4, screenX: 28, screenY: 24 },
            { name: 'Chronicles', baseHue: 30, shiftSpeed: 0.35, screenX: 44, screenY: 22 },
            { name: 'Companions', baseHue: 200, shiftSpeed: 0.25, screenX: 60, screenY: 24 },
            { name: 'Questions', baseHue: 15, shiftSpeed: 0.3, screenX: 88, screenY: 32 }
        ];
        const pageMap = ['about.html', 'awakening.html', 'chronicles.html', 'companions.html', 'questions.html'];
        const lanternsDiv = document.getElementById('lanterns');
        if (lanternsDiv) {
            sections.forEach((s, i) => {
                const el = document.createElement('div');
                el.style.cssText = `position:fixed;z-index:15;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);left:${s.screenX}%;top:${s.screenY}%;`;
                el.innerHTML = `<div class="lantern-glow" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:22px;height:30px;border-radius:12px 12px 8px 8px;background:radial-gradient(circle at 50% 30%, rgba(200,180,150,0.55), hsla(${s.baseHue}, 42%, 38%, 0.75) 60%, rgba(0,0,0,0.6) 100%);box-shadow:0 0 15px hsla(${s.baseHue}, 40%, 30%, 0.5);animation:lanternBob ${3 + i * 0.4}s ease-in-out infinite;"></div><div class="lantern-label" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .35s;white-space:nowrap;"><span style="font-family:'Cinzel',serif;font-size:.6rem;font-weight:600;letter-spacing:2px;color:#D4AF37;">${s.name}</span></div>`;
                const labelEl = el.querySelector('.lantern-label');
                el.addEventListener('mouseenter', () => { if (labelEl) labelEl.style.opacity = '1'; });
                el.addEventListener('mouseleave', () => { if (labelEl) labelEl.style.opacity = '0'; });
                el.addEventListener('click', () => { location.href = pageMap[i]; });
                lanternsDiv.appendChild(el);
            });
        }
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
        const bookParticlesContainer = document.getElementById('bookParticles');
        if (bookParticlesContainer) {
            for (let i = 0; i < 25; i++) {
                const particle = document.createElement('div');
                particle.className = 'book-particle';
                particle.style.left = (Math.random() * 80 + 10) + '%';
                particle.style.bottom = (Math.random() * 40 + 10) + '%';
                particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
                particle.style.animationDelay = Math.random() * 5 + 's';
                particle.style.width = (Math.random() * 3 + 1.5) + 'px';
                particle.style.height = particle.style.width;
                bookParticlesContainer.appendChild(particle);
            }
        }
    }
    
    // ========== FORMS AND FEATURES (unchanged) ==========
    function initFormsAndFeatures() {
        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        const portalBtn = document.getElementById('portalBtn');
        if (portalBtn) portalBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        const scrollHint = document.getElementById('scrollHint');
        if (scrollHint) scrollHint.addEventListener('click', () => { document.querySelector('.great-hall')?.scrollIntoView({ behavior: 'smooth' }); });
        const cookieConsent = document.getElementById('cookieConsent');
        const acceptCookies = document.getElementById('acceptCookies');
        const declineCookies = document.getElementById('declineCookies');
        function setCookieConsent(accepted) {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
            if (cookieConsent) cookieConsent.style.display = 'none';
        }
        if (cookieConsent && !localStorage.getItem('cookieConsent')) cookieConsent.style.display = 'flex';
        if (acceptCookies) acceptCookies.addEventListener('click', () => setCookieConsent(true));
        if (declineCookies) declineCookies.addEventListener('click', () => setCookieConsent(false));
        const newsletterForm = document.getElementById('newsletterForm');
        const contactForm = document.getElementById('contactForm');
        const formspreeEndpoint = 'https://formspree.io/f/xjgzzdlp';
        async function submitForm(form, statusDivId) {
            const statusDiv = document.getElementById(statusDivId);
            if (!statusDiv) return;
            const formData = new FormData(form);
            statusDiv.innerHTML = 'Sending...';
            statusDiv.style.color = '#D4AF37';
            statusDiv.classList.remove('error');
            try {
                const response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    statusDiv.innerHTML = '✓ Thank you! Your message has been sent.';
                    form.reset();
                    setTimeout(() => { statusDiv.innerHTML = ''; }, 5000);
                } else {
                    statusDiv.innerHTML = '❌ Something went wrong. Please try again.';
                    statusDiv.classList.add('error');
                }
            } catch (error) {
                statusDiv.innerHTML = '❌ Network error. Please check your connection.';
                statusDiv.classList.add('error');
            }
        }
        if (newsletterForm) newsletterForm.addEventListener('submit', async (e) => { e.preventDefault(); await submitForm(newsletterForm, 'newsletterStatus'); });
        if (contactForm) contactForm.addEventListener('submit', async (e) => { e.preventDefault(); await submitForm(contactForm, 'contactStatus'); });
    }
    
    // ========== FAVICON PARTICLES (unchanged) ==========
    function initFaviconParticles() {
        const faviconCanvas = document.createElement('canvas');
        faviconCanvas.id = 'faviconCanvas';
        faviconCanvas.style.position = 'fixed';
        faviconCanvas.style.top = '0';
        faviconCanvas.style.left = '0';
        faviconCanvas.style.width = '100%';
        faviconCanvas.style.height = '100%';
        faviconCanvas.style.pointerEvents = 'none';
        faviconCanvas.style.zIndex = '0';
        faviconCanvas.style.opacity = '0.2';
        document.body.appendChild(faviconCanvas);
        const favCtx = faviconCanvas.getContext('2d');
        let favW, favH;
        let favParticles = [];
        const faviconImg = new Image();
        faviconImg.src = 'favicon.png';
        function resizeFavCanvas() { favW = faviconCanvas.width = window.innerWidth; favH = faviconCanvas.height = window.innerHeight; }
        class FavParticle {
            constructor() {
                this.x = Math.random() * favW;
                this.y = Math.random() * favH;
                this.size = Math.random() * 20 + 10;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.2 + 0.1;
                this.alpha = Math.random() * 0.4 + 0.1;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.01;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.rotation += this.rotSpeed;
                if (this.x < -50) this.x = favW + 50;
                if (this.x > favW + 50) this.x = -50;
                if (this.y < -50) this.y = favH + 50;
                if (this.y > favH + 50) this.y = -50;
            }
            draw() {
                if (!faviconImg.complete) return;
                favCtx.save();
                favCtx.translate(this.x, this.y);
                favCtx.rotate(this.rotation);
                favCtx.globalAlpha = this.alpha;
                favCtx.drawImage(faviconImg, -this.size/2, -this.size/2, this.size, this.size);
                favCtx.restore();
            }
        }
        function initFavParticles() { favParticles = []; for (let i = 0; i < 40; i++) favParticles.push(new FavParticle()); }
        function animateFav() { if (!favCtx) return; favCtx.clearRect(0, 0, favW, favH); favParticles.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animateFav); }
        if (faviconImg.complete) { resizeFavCanvas(); initFavParticles(); animateFav(); } 
        else { faviconImg.onload = () => { resizeFavCanvas(); initFavParticles(); animateFav(); }; }
        window.addEventListener('resize', () => { resizeFavCanvas(); initFavParticles(); });
    }
})();

// ===== STUDENT REVIEWS: FETCH FROM GOOGLE SHEETS =====
async function loadStudentReviews() {
  const container = document.getElementById('studentReviewsGrid');
  if (!container) return;
  
  // Google Sheets Web App URL (you will create this)
  const SHEET_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  
  try {
    const response = await fetch(SHEET_URL);
    const reviews = await response.json();
    
    if (reviews.length === 0) {
      container.innerHTML = '<div class="loading-reviews">No reviews yet. Be the first to share your experience!</div>';
      return;
    }
    
    container.innerHTML = '';
    reviews.forEach(review => {
      const card = document.createElement('div');
      card.className = 'student-review-card';
      card.innerHTML = `
        <div class="student-review-stars">★★★★★</div>
        <p class="student-review-text">"${review.message}"</p>
        <div class="student-review-author">— ${review.name}</div>
        <div class="student-review-year">Learned to ride · ${review.year}</div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading reviews:', error);
    container.innerHTML = '<div class="loading-reviews">Unable to load reviews. Please check back later.</div>';
  }
}

// ===== STUDENT REVIEW FORM SUBMISSION =====
const studentReviewForm = document.getElementById('studentReviewForm');
if (studentReviewForm) {
  studentReviewForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusDiv = document.getElementById('studentReviewStatus');
    statusDiv.innerHTML = 'Submitting your review...';
    statusDiv.classList.remove('error');
    
    const formData = {
      name: studentReviewForm.querySelector('input[name="name"]').value,
      year: studentReviewForm.querySelector('input[name="year"]').value,
      message: studentReviewForm.querySelector('textarea[name="message"]').value,
      email: studentReviewForm.querySelector('input[name="email"]').value
    };
    
    // Send to Google Sheets Web App
    const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      statusDiv.innerHTML = '✓ Thank you! Your review has been submitted for approval.';
      studentReviewForm.reset();
      setTimeout(() => { statusDiv.innerHTML = ''; }, 5000);
    } catch (error) {
      statusDiv.innerHTML = '❌ Something went wrong. Please try again.';
      statusDiv.classList.add('error');
    }
  });
}

// Load reviews when page loads
document.addEventListener('DOMContentLoaded', loadStudentReviews);
