// The Horseman's Journal - Global JavaScript (Optimized)

(function() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        if (document.getElementById('heroCanvas')) {
            initHeroCanvas();
        }
        if (document.getElementById('hallEmblemCanvas')) {
            drawHallEmblem();
        }
        if (document.querySelector('.book-hardcover-container')) {
            showStaticBook();
        }
        if (document.getElementById('lanterns')) {
            initLanternsAndParticles();
        }
        initFormsAndFeatures();
        initFaviconParticles();
    }
    
    // ========== HERO CANVAS (Original animation preserved with performance optimizations) ==========
    function initHeroCanvas() {
        var canvas = document.getElementById('heroCanvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d', { alpha: false });
        var W, H, mx = 0.5, my = 0.5, t = 0;
        var logoOpacity = 0.95;
        var lastMove = 0;
        var animationId = null;
        var isVisible = false;
        var lastFrameTime = 0;
        
        var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
        var isLowPower = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
        var FRAME_DELAY = isLowPower ? 50 : isMobile ? 33 : 16;
        var STAR_COUNT = isLowPower ? 100 : isMobile ? 200 : 400;
        var GRASS_COUNT = isLowPower ? 150 : isMobile ? 350 : 700;
        var FLY_COUNT = isLowPower ? 15 : isMobile ? 30 : 60;
        
        function resize() { 
            var dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
            var rect = canvas.getBoundingClientRect();
            W = canvas.width = rect.width * dpr; 
            H = canvas.height = rect.height * dpr;
            canvas.style.width = rect.width + 'px';
            canvas.style.height = rect.height + 'px';
            ctx.scale(dpr, dpr);
        }
        resize();
        window.addEventListener('resize', resize);
        
        function displayW() { return W / (isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)); }
        function displayH() { return H / (isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2)); }
        
        if (!isMobile) {
            window.addEventListener('mousemove', function(e) { 
                mx = e.clientX / W; 
                my = e.clientY / H; 
                lastMove = t; 
            });
        }
        
        // ===== ORIGINAL drawLogo FUNCTION - PRESERVED EXACTLY =====
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
            for (var i = 0; i < 6; i++) {
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
            for (var j = 0; j < 8; j++) {
                var angle = (t * 0.02 + j * Math.PI / 4) % (Math.PI * 2);
                var rad = 45;
                var sx = Math.cos(angle) * rad;
                var sy = Math.sin(angle) * rad;
                ctx.fillStyle = 'rgba(212, 175, 55, ' + (0.3 + Math.sin(t * 0.05 + j) * 0.15) + ')';
                ctx.beginPath();
                ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            ctx.restore();
        }
        
        var stars = Array.from({length: STAR_COUNT}, function() {
            return {
                x: Math.random(), y: Math.random() * 0.55,
                r: Math.random() * 2 + 0.3,
                sp: Math.random() * 0.015 + 0.003,
                off: Math.random() * Math.PI * 2,
                ba: Math.random() * 0.7 + 0.2,
                color: 'hsl(' + (Math.random() * 60 + 20) + ', ' + (Math.random() * 50 + 50) + '%, ' + (Math.random() * 40 + 60) + '%)'
            };
        });
        
        var grass = Array.from({length: GRASS_COUNT}, function() {
            return {
                x: Math.random(), by: 0.68 + Math.random() * 0.32,
                h: Math.random() * 45 + 15,
                sp: Math.random() * 0.02 + 0.005,
                off: Math.random() * Math.PI * 2,
                color: Math.random() > 0.7 ? '#4a3a2a' : '#2a3a1a'
            };
        });
        
        var flies = Array.from({length: FLY_COUNT}, function() {
            return {
                x: Math.random(), y: 0.68 + Math.random() * 0.28,
                r: Math.random() * 2 + 0.5,
                sp: Math.random() * 0.3 + 0.1,
                ph: Math.random() * Math.PI * 2,
                dx: (Math.random() - 0.5) * 0.35,
                dy: (Math.random() - 0.5) * 0.2,
                color: 'hsl(' + (Math.random() * 40 + 40) + ', 80%, ' + (Math.random() * 30 + 50) + '%)'
            };
        });
        
        function drawRealisticMoon(x, y, radius) {
            var pulse = Math.sin(t * 0.02) * 0.1 + 0.9;
            var glowGrad = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 2.2);
            glowGrad.addColorStop(0, 'rgba(255,220,120,' + (0.25 * pulse) + ')');
            glowGrad.addColorStop(0.4, 'rgba(255,180,80,' + (0.12 * pulse) + ')');
            glowGrad.addColorStop(0.7, 'rgba(200,120,40,0.05)');
            glowGrad.addColorStop(1, 'rgba(100,50,20,0)');
            ctx.fillStyle = glowGrad;
            ctx.beginPath(); ctx.arc(x, y, radius * 2.2, 0, Math.PI * 2); ctx.fill();
            var moonGrad = ctx.createRadialGradient(x - radius * 0.25, y - radius * 0.25, radius * 0.2, x, y, radius);
            moonGrad.addColorStop(0, 'rgba(255,235,180,0.98)');
            moonGrad.addColorStop(0.4, 'rgba(245,210,140,0.9)');
            moonGrad.addColorStop(0.7, 'rgba(220,170,100,0.85)');
            moonGrad.addColorStop(1, 'rgba(180,130,70,0.8)');
            ctx.fillStyle = moonGrad;
            ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
            var craters = [
                { cx: -radius*0.38, cy: -radius*0.28, r: radius*0.13, highlight: true },
                { cx: radius*0.42, cy: -radius*0.18, r: radius*0.11, highlight: false },
                { cx: radius*0.18, cy: radius*0.32, r: radius*0.09, highlight: true },
                { cx: -radius*0.22, cy: radius*0.38, r: radius*0.07, highlight: false },
                { cx: -radius*0.52, cy: radius*0.12, r: radius*0.08, highlight: true },
                { cx: radius*0.32, cy: radius*0.12, r: radius*0.06, highlight: false },
                { cx: -radius*0.12, cy: -radius*0.48, r: radius*0.06, highlight: true },
                { cx: radius*0.52, cy: -radius*0.42, r: radius*0.05, highlight: false }
            ];
            craters.forEach(function(crater) {
                var craterX = x + crater.cx;
                var craterY = y + crater.cy;
                var craterR = crater.r;
                ctx.fillStyle = 'rgba(140,90,40,0.45)';
                ctx.beginPath(); ctx.ellipse(craterX, craterY, craterR, craterR*0.85, 0, 0, Math.PI*2); ctx.fill();
                if (crater.highlight) {
                    ctx.fillStyle = 'rgba(255,235,180,0.3)';
                    ctx.beginPath(); ctx.ellipse(craterX - craterR*0.2, craterY - craterR*0.15, craterR*0.35, craterR*0.22, 0, 0, Math.PI*2); ctx.fill();
                }
                ctx.fillStyle = 'rgba(80,50,20,0.25)';
                ctx.beginPath(); ctx.ellipse(craterX + craterR*0.15, craterY + craterR*0.1, craterR*0.28, craterR*0.18, 0, 0, Math.PI*2); ctx.fill();
            });
        }
        
        function horse(hx, hy, sc, coat, mane, pose, flip, isGuardian) {
            ctx.save();
            ctx.translate(hx, hy);
            var actualScale = isGuardian ? sc * 2.2 : sc;
            if (flip) ctx.scale(-actualScale, actualScale);
            else ctx.scale(actualScale, actualScale);
            var useMovement = !isGuardian;
            var br = useMovement ? Math.sin(t * 0.018 + hx * 0.01) * 1.5 : 0;
            if (isGuardian) {
                ctx.shadowColor = 'rgba(212,175,55,0.2)';
                ctx.shadowBlur = 10;
            }
            if (pose === 'guardian') {
                ctx.fillStyle = coat;
                [-18, -4, 8, 22].forEach(function(lx, i) { ctx.fillRect(lx, 12, 5, 28); });
                ctx.beginPath(); ctx.ellipse(0, 3, 34, 16, 0, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(22, -1); ctx.quadraticCurveTo(34, -32, 28, -46); ctx.quadraticCurveTo(20, -32, 10, -4); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.ellipse(28, -48, 10, 6, -0.1, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(28, -53); ctx.lineTo(25, -62); ctx.lineTo(22, -53); ctx.fill();
                ctx.beginPath(); ctx.moveTo(30, -53); ctx.lineTo(33, -62); ctx.lineTo(30, -53); ctx.fill();
                ctx.strokeStyle = mane; ctx.lineWidth = 3.2;
                ctx.beginPath(); ctx.moveTo(22, -5); ctx.quadraticCurveTo(28, -22, 32, -38); ctx.stroke();
            } else if (pose === 'foreground') {
                ctx.fillStyle = coat;
                [-18, -4, 8, 20].forEach(function(lx, i) { var offset = useMovement ? (i%2?br:-br) : 0; ctx.fillRect(lx, 12 + offset, 5, 28); });
                ctx.beginPath(); ctx.ellipse(0, 3, 34, 16, 0, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(22, -1); ctx.quadraticCurveTo(34, -32, 28, -46); ctx.quadraticCurveTo(20, -32, 10, -4); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.ellipse(28, -48, 10, 6, -0.1, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(28, -53); ctx.lineTo(25, -62); ctx.lineTo(22, -53); ctx.fill();
                ctx.beginPath(); ctx.moveTo(30, -53); ctx.lineTo(33, -62); ctx.lineTo(30, -53); ctx.fill();
                ctx.strokeStyle = mane; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.moveTo(22, -5); ctx.quadraticCurveTo(28, -22, 32, -38); ctx.stroke();
            } else if (pose === 'nuzzle') {
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach(function(lx, i) { var offset = useMovement ? (i%2?br:-br) : 0; ctx.fillRect(lx, 16 + offset, 4, 20); });
                ctx.beginPath(); ctx.ellipse(0, 5, 26, 12, 0, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(16, 1); ctx.quadraticCurveTo(28, -14, 26, -24); ctx.quadraticCurveTo(18, -18, 6, 3); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.ellipse(26, -26, 7, 5, -0.15, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(26, -30); ctx.lineTo(25, -37); ctx.lineTo(23, -30); ctx.fill();
                ctx.strokeStyle = mane; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.moveTo(16, -2); ctx.quadraticCurveTo(20, -10, 24, -20); ctx.stroke();
            } else {
                ctx.fillStyle = coat;
                [-14, -2, 8, 18].forEach(function(lx, i) { var offset = useMovement ? (i%2?br:-br) : 0; ctx.fillRect(lx, 16 + offset, 4, 20); });
                ctx.beginPath(); ctx.ellipse(0, 5, 28, 13, 0, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(18, 1); ctx.quadraticCurveTo(32, 12, 26, 26); ctx.quadraticCurveTo(18, 20, 7, 3); ctx.closePath(); ctx.fill();
                ctx.beginPath(); ctx.ellipse(28, 30, 8, 5, 0.25, 0, Math.PI*2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(30, 25); ctx.lineTo(32, 19); ctx.lineTo(27, 24); ctx.fill();
                ctx.beginPath(); ctx.moveTo(27, 26); ctx.lineTo(25, 20); ctx.lineTo(24, 26); ctx.fill();
                ctx.strokeStyle = mane; ctx.lineWidth = 2.2;
                ctx.beginPath(); ctx.moveTo(18, -3); ctx.quadraticCurveTo(24, 6, 28, 18); ctx.stroke();
            }
            ctx.shadowBlur = 0;
            ctx.restore();
        }
        
        var herd = [
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
            { x: 0.10, y: 0.79, s: 1.40, coat: '#1a0e08', mane: '#2a1a10', pose: 'foreground', flip: false, isGuardian: false }
        ];
        
        var sections = [
            { name: 'About', baseHue: 45, shiftSpeed: 0.3, screenX: 12, screenY: 28, depth: 0.6 },
            { name: 'Awakening', baseHue: 350, shiftSpeed: 0.4, screenX: 28, screenY: 24, depth: 0.7 },
            { name: 'Chronicles', baseHue: 30, shiftSpeed: 0.35, screenX: 44, screenY: 22, depth: 0.8 },
            { name: 'Companions', baseHue: 200, shiftSpeed: 0.25, screenX: 60, screenY: 24, depth: 0.65 },
            { name: 'Questions', baseHue: 15, shiftSpeed: 0.3, screenX: 88, screenY: 32, depth: 0.5 }
        ];
        
        function updateLanternColors() {
            var lanternEls = document.querySelectorAll('.lantern-glow');
            lanternEls.forEach(function(glowEl, idx) {
                if (idx < sections.length) {
                    var s = sections[idx];
                    var currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                    glowEl.style.background = 'radial-gradient(circle at 50% 30%, rgba(200,180,150,0.55), hsla(' + currentHue + ', 42%, 35%, 0.75) 60%, rgba(0,0,0,0.65) 100%)';
                    glowEl.style.boxShadow = '0 0 15px hsla(' + currentHue + ', 40%, 28%, 0.5), 0 0 30px hsla(' + currentHue + ', 35%, 22%, 0.35)';
                }
            });
        }
        
        function render() {
            var dw = displayW();
            var dh = displayH();
            ctx.clearRect(0, 0, dw, dh);
            var sg = ctx.createLinearGradient(0, 0, 0, dh);
            sg.addColorStop(0, '#0a0a2a');
            sg.addColorStop(0.25, '#151540');
            sg.addColorStop(0.5, '#2a1a3a');
            sg.addColorStop(0.75, '#3a2a3a');
            sg.addColorStop(1, '#4a352a');
            ctx.fillStyle = sg;
            ctx.fillRect(0, 0, dw, dh);
            var auroraY = dh * 0.15;
            for (var b = 0; b < 6; b++) {
                var bandY = auroraY + b * 38;
                var bandAlpha = 0.06 - b * 0.008;
                var bandGrad = ctx.createLinearGradient(0, bandY, 0, bandY + 70);
                bandGrad.addColorStop(0, 'rgba(80,140,120,' + (bandAlpha * 0.5) + ')');
                bandGrad.addColorStop(0.3, 'rgba(' + (b % 2 === 0 ? '140,100,180' : '100,140,180') + ',' + bandAlpha + ')');
                bandGrad.addColorStop(0.6, 'rgba(180,120,160,' + (bandAlpha * 0.7) + ')');
                bandGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = bandGrad;
                ctx.beginPath();
                ctx.moveTo(0, bandY - 15);
                for (var i = 0; i <= 100; i++) {
                    var nx = i / 100;
                    var wave1 = Math.sin(nx * 3.5 + t * 0.008 + b * 1.2) * 28;
                    var wave2 = Math.sin(nx * 8 + t * 0.012 + b * 2) * 15;
                    ctx.lineTo(nx * dw, bandY + wave1 + wave2);
                }
                ctx.lineTo(dw, bandY + 70);
                ctx.lineTo(0, bandY + 70);
                ctx.closePath();
                ctx.fill();
            }
            var horizonGrad = ctx.createLinearGradient(0, dh * 0.55, 0, dh * 0.75);
            horizonGrad.addColorStop(0, 'rgba(180,100,60,0)');
            horizonGrad.addColorStop(0.5, 'rgba(200,120,70,0.12)');
            horizonGrad.addColorStop(1, 'rgba(160,80,40,0.25)');
            ctx.fillStyle = horizonGrad;
            ctx.fillRect(0, dh * 0.55, dw, dh * 0.25);
            drawRealisticMoon(dw * 0.78, dh * 0.16, 42);
            ctx.shadowBlur = 0;
            stars.forEach(function(s) {
                var tw = Math.sin(t * s.sp + s.off) * 0.4 + 0.6;
                ctx.fillStyle = s.color;
                ctx.globalAlpha = s.ba * tw * 0.8;
                ctx.beginPath();
                ctx.arc(s.x * dw, s.y * dh, s.r * tw * 0.6, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.fillStyle = 'rgba(10,8,20,0.75)';
            ctx.beginPath();
            ctx.moveTo(0, dh * 0.66);
            for (var j = 0; j <= 70; j++) {
                var nxj = j / 70;
                ctx.lineTo(nxj * dw, dh * 0.62 - Math.sin(nxj * 3.8) * dh * 0.022);
            }
            ctx.lineTo(dw, dh * 0.66);
            ctx.closePath();
            ctx.fill();
            var groundColors = ['#0c0a1c', '#12102a', '#1a1535', '#221d3a'];
            groundColors.forEach(function(col, i) {
                ctx.fillStyle = col;
                ctx.beginPath();
                ctx.moveTo(0, dh);
                for (var k = 0; k <= 90; k++) {
                    var nxk = k / 90;
                    var h = dh * (0.72 + i * 0.055 - Math.sin(nxk * (2.5 + i * 1.3) + i) * 0.045);
                    ctx.lineTo(nxk * dw, h);
                }
                ctx.lineTo(dw, dh);
                ctx.closePath();
                ctx.fill();
            });
            var mistGrad = ctx.createLinearGradient(0, dh * 0.75, 0, dh);
            mistGrad.addColorStop(0, 'rgba(20,18,35,0)');
            mistGrad.addColorStop(0.7, 'rgba(30,25,45,0.2)');
            mistGrad.addColorStop(1, 'rgba(20,15,35,0.35)');
            ctx.fillStyle = mistGrad;
            ctx.fillRect(0, dh * 0.75, dw, dh * 0.25);
            grass.forEach(function(g) {
                var sw = Math.sin(t * g.sp + g.off) * 9;
                ctx.strokeStyle = g.color;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(g.x * dw, g.by * dh);
                ctx.quadraticCurveTo(g.x * dw + sw * 0.45, g.by * dh - g.h * 0.5, g.x * dw + sw, g.by * dh - g.h);
                ctx.stroke();
            });
            herd.forEach(function(h) {
                horse(h.x * dw + (mx - 0.5) * 35 * h.s, h.y * dh + (my - 0.5) * 12 * h.s, h.s, h.coat, h.mane, h.pose, h.flip, h.isGuardian);
            });
            flies.forEach(function(f) {
                f.x += Math.sin(t * 0.02 + f.ph) * f.dx;
                f.y += Math.cos(t * 0.022 + f.ph) * f.dy;
                f.x = ((f.x % 1) + 1) % 1;
                f.y = Math.max(0.66, Math.min(0.96, f.y));
                var a = Math.abs(Math.sin(t * f.sp + f.ph)) * 0.6;
                ctx.fillStyle = f.color;
                ctx.globalAlpha = a;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(f.x * dw, f.y * dh, f.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            ctx.shadowBlur = 0;
            sections.forEach(function(s) {
                var lx = s.screenX / 100 * dw + (mx - 0.5) * 20 * s.depth;
                var ly = s.screenY / 100 * dh + (my - 0.5) * 10 * s.depth;
                var currentHue = (s.baseHue + t * 0.5 * s.shiftSpeed) % 360;
                var poolGrad = ctx.createRadialGradient(lx, ly + 35, 5, lx, ly + 35, 95);
                poolGrad.addColorStop(0, 'hsla(' + currentHue + ', 40%, 35%, 0.08)');
                poolGrad.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = poolGrad;
                ctx.beginPath();
                ctx.arc(lx, ly + 35, 95, 0, Math.PI * 2);
                ctx.fill();
            });
            var idle = t - lastMove > 200;
            logoOpacity = idle ? 0.95 : 0.15;
            updateLanternColors();
        }
        
        var heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                isVisible = entry.isIntersecting;
                if (isVisible && !animationId) { lastFrameTime = 0; animate(0); }
                else if (!isVisible && animationId) { cancelAnimationFrame(animationId); animationId = null; }
            });
        }, { threshold: 0.05 });
        heroObserver.observe(canvas);
        
        function animate(currentTime) {
            if (!isVisible) { animationId = null; return; }
            if (!lastFrameTime || (currentTime - lastFrameTime) >= FRAME_DELAY) {
                t++;
                render();
                lastFrameTime = currentTime;
            }
            animationId = requestAnimationFrame(animate);
        }
        animate(0);
        window.addEventListener('resize', function() { resize(); });
    }
    
    // ========== HALL EMBLEM (EXACT ORIGINAL drawLogo, independent animation) ==========
    function drawHallEmblem() {
        var canvas = document.getElementById('hallEmblemCanvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');
        var size = 140;
        canvas.width = size;
        canvas.height = size;
        
        var t = 0;
        
        function drawLogo(x, y, logoSize, opacity) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(logoSize, logoSize);
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
            for (var i = 0; i < 6; i++) {
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
            for (var j = 0; j < 8; j++) {
                var angle = (t * 0.02 + j * Math.PI / 4) % (Math.PI * 2);
                var rad = 45;
                var sx = Math.cos(angle) * rad;
                var sy = Math.sin(angle) * rad;
                ctx.fillStyle = 'rgba(212, 175, 55, ' + (0.3 + Math.sin(t * 0.05 + j) * 0.15) + ')';
                ctx.beginPath();
                ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
            ctx.restore();
        }
        
        function draw() {
            ctx.clearRect(0, 0, size, size);
            drawLogo(size/2, size/2, 1.1, 0.9);
            t++;
            requestAnimationFrame(draw);
        }
        draw();
    }
    
    // ========== SHOW STATIC BOOK ==========
    function showStaticBook() {
        var container = document.querySelector('.book-hardcover-container');
        if (!container) return;
        var staticBook = container.querySelector('.book-hardcover');
        if (staticBook) {
            staticBook.style.display = 'block';
            staticBook.style.opacity = '1';
            staticBook.style.visibility = 'visible';
        }
        var canvas = container.querySelector('canvas');
        if (canvas) canvas.remove();
        var glow = container.querySelector('.book-glow');
        if (glow) glow.style.zIndex = '1';
        var particlesContainer = document.getElementById('bookParticles');
        if (particlesContainer) particlesContainer.style.zIndex = '3';
    }
    
    // ========== LANTERNS AND PARTICLES ==========
    function initLanternsAndParticles() {
        var sections = [
            { name: 'About', baseHue: 45, shiftSpeed: 0.3, screenX: 12, screenY: 28 },
            { name: 'Awakening', baseHue: 350, shiftSpeed: 0.4, screenX: 28, screenY: 24 },
            { name: 'Chronicles', baseHue: 30, shiftSpeed: 0.35, screenX: 44, screenY: 22 },
            { name: 'Companions', baseHue: 200, shiftSpeed: 0.25, screenX: 60, screenY: 24 },
            { name: 'Questions', baseHue: 15, shiftSpeed: 0.3, screenX: 88, screenY: 32 }
        ];
        var pageMap = ['about.html', 'awakening.html', 'chronicles.html', 'companions.html', 'questions.html'];
        var lanternsDiv = document.getElementById('lanterns');
        if (lanternsDiv) {
            sections.forEach(function(s, i) {
                var el = document.createElement('div');
                el.style.cssText = 'position:fixed;z-index:15;pointer-events:auto;cursor:pointer;width:50px;height:70px;transform:translate(-50%,-50%);left:' + s.screenX + '%;top:' + s.screenY + '%;';
                el.innerHTML = '<div class="lantern-glow" style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:22px;height:30px;border-radius:12px 12px 8px 8px;background:radial-gradient(circle at 50% 30%, rgba(200,180,150,0.55), hsla(' + s.baseHue + ', 42%, 38%, 0.75) 60%, rgba(0,0,0,0.6) 100%);box-shadow:0 0 15px hsla(' + s.baseHue + ', 40%, 30%, 0.5);animation:lanternBob ' + (3 + i * 0.4) + 's ease-in-out infinite;"></div><div class="lantern-label" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);text-align:center;opacity:0;transition:opacity .35s;white-space:nowrap;"><span style="font-family:\'Cinzel\',serif;font-size:.6rem;font-weight:600;letter-spacing:2px;color:#D4AF37;">' + s.name + '</span></div>';
                var labelEl = el.querySelector('.lantern-label');
                el.addEventListener('mouseenter', function() { if (labelEl) labelEl.style.opacity = '1'; });
                el.addEventListener('mouseleave', function() { if (labelEl) labelEl.style.opacity = '0'; });
                el.addEventListener('click', function() { location.href = pageMap[i]; });
                lanternsDiv.appendChild(el);
            });
        }
        
        var hallParticles = document.getElementById('hallParticles');
        if (hallParticles) {
            for (var i = 0; i < 35; i++) {
                var p = document.createElement('div');
                p.className = 'hall-bg-particle';
                p.style.left = Math.random() * 100 + '%';
                p.style.top = Math.random() * 100 + '%';
                p.style.animationDuration = (Math.random() * 12 + 8) + 's';
                p.style.animationDelay = Math.random() * 12 + 's';
                hallParticles.appendChild(p);
            }
        }
        
        var bookParticlesContainer = document.getElementById('bookParticles');
        if (bookParticlesContainer) {
            for (var j = 0; j < 25; j++) {
                var particle = document.createElement('div');
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
    
    // ========== FORMS AND FEATURES ==========
    function initFormsAndFeatures() {
        var yearSpan = document.getElementById('currentYear');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
        
        var portalBtn = document.getElementById('portalBtn');
        if (portalBtn) portalBtn.addEventListener('click', function() { window.scrollTo({ top: 0, behavior: 'smooth' }); });
        
        var scrollHint = document.getElementById('scrollHint');
        if (scrollHint && document.querySelector('.great-hall')) {
            scrollHint.addEventListener('click', function() { document.querySelector('.great-hall').scrollIntoView({ behavior: 'smooth' }); });
        }
        
        // Cookie Consent
        var cookieConsent = document.getElementById('cookieConsent');
        var acceptCookies = document.getElementById('acceptCookies');
        var declineCookies = document.getElementById('declineCookies');
        
        function setCookieConsent(accepted) {
            localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'declined');
            if (cookieConsent) cookieConsent.classList.remove('show');
        }
        
        function showCookieConsent() {
            if (!cookieConsent) return;
            var consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                cookieConsent.classList.add('show');
            } else {
                cookieConsent.classList.remove('show');
            }
        }
        
        if (acceptCookies) acceptCookies.addEventListener('click', function() { setCookieConsent(true); });
        if (declineCookies) declineCookies.addEventListener('click', function() { setCookieConsent(false); });
        showCookieConsent();
        
        // Newsletter and Contact Forms - Using Formspree
        var formspreeEndpoint = 'https://formspree.io/f/xjgzzdlp';
        
        var newsletterForm = document.getElementById('newsletterForm');
        var contactForm = document.getElementById('contactForm');
        
        async function submitForm(form, statusDivId) {
            var statusDiv = document.getElementById(statusDivId);
            if (!statusDiv) return;
            var formData = new FormData(form);
            statusDiv.innerHTML = 'Sending...';
            statusDiv.style.color = '#D4AF37';
            statusDiv.classList.remove('error');
            try {
                var response = await fetch(formspreeEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    statusDiv.innerHTML = '✓ Thank you! Your message has been sent.';
                    form.reset();
                    setTimeout(function() { statusDiv.innerHTML = ''; }, 5000);
                } else {
                    statusDiv.innerHTML = '❌ Something went wrong. Please try again.';
                    statusDiv.classList.add('error');
                }
            } catch (error) {
                statusDiv.innerHTML = '❌ Network error. Please check your connection.';
                statusDiv.classList.add('error');
            }
        }
        
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async function(e) { 
                e.preventDefault(); 
                await submitForm(newsletterForm, 'newsletterStatus'); 
            });
        }
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) { 
                e.preventDefault(); 
                await submitForm(contactForm, 'contactStatus'); 
            });
        }
    }
    
    // ========== FAVICON PARTICLES ==========
    function initFaviconParticles() {
        var faviconCanvas = document.createElement('canvas');
        faviconCanvas.id = 'faviconCanvas';
        faviconCanvas.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; pointer-events:none; z-index:0; opacity:0.2;';
        document.body.appendChild(faviconCanvas);
        
        var favCtx = faviconCanvas.getContext('2d');
        var favW, favH;
        var favParticles = [];
        var faviconImg = new Image();
        faviconImg.src = 'favicon.png';
        
        function resizeFavCanvas() { 
            favW = faviconCanvas.width = window.innerWidth; 
            favH = faviconCanvas.height = window.innerHeight; 
        }
        
        function FavParticle() {
            this.x = Math.random() * favW;
            this.y = Math.random() * favH;
            this.size = Math.random() * 20 + 10;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.2 + 0.1;
            this.alpha = Math.random() * 0.4 + 0.1;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.01;
        }
        FavParticle.prototype.update = function() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotSpeed;
            if (this.x < -50) this.x = favW + 50;
            if (this.x > favW + 50) this.x = -50;
            if (this.y < -50) this.y = favH + 50;
            if (this.y > favH + 50) this.y = -50;
        };
        FavParticle.prototype.draw = function() {
            if (!faviconImg.complete) return;
            favCtx.save();
            favCtx.translate(this.x, this.y);
            favCtx.rotate(this.rotation);
            favCtx.globalAlpha = this.alpha;
            favCtx.drawImage(faviconImg, -this.size/2, -this.size/2, this.size, this.size);
            favCtx.restore();
        };
        
        function initFavParticles() { 
            favParticles = []; 
            for (var i = 0; i < 40; i++) { 
                favParticles.push(new FavParticle()); 
            } 
        }
        
        function animateFav() { 
            if (!favCtx) return;
            favCtx.clearRect(0, 0, favW, favH); 
            favParticles.forEach(function(p) { p.update(); p.draw(); }); 
            requestAnimationFrame(animateFav); 
        }
        
        if (faviconImg.complete) { 
            resizeFavCanvas(); 
            initFavParticles(); 
            animateFav(); 
        } else { 
            faviconImg.onload = function() { 
                resizeFavCanvas(); 
                initFavParticles(); 
                animateFav(); 
            }; 
        }
        window.addEventListener('resize', function() { 
            resizeFavCanvas(); 
            initFavParticles(); 
        });
    }
})();

// ===== STUDENT REVIEWS: FETCH FROM GOOGLE SHEETS =====
async function loadStudentReviews() {
  var container = document.getElementById('studentReviewsGrid');
  if (!container) return;
  
  var SHEET_URL = 'https://script.google.com/macros/s/AKfycbyJEgCH6-QiwXC1T8BGgvd-z_7iSfans2NKFAfHbUVWS0Zvn123fDtBFu-jkoWsoWe1/exec';
  
  try {
    var response = await fetch(SHEET_URL);
    var reviews = await response.json();
    
    if (!reviews || reviews.length === 0) {
      container.innerHTML = '<div class="loading-reviews">No reviews yet. Be the first to share your experience!</div>';
      return;
    }
    
    container.innerHTML = '';
    reviews.forEach(function(review) {
      var card = document.createElement('div');
      card.className = 'student-review-card';
      card.innerHTML = '<div class="student-review-stars">★★★★★</div><p class="student-review-text">"' + escapeHtml(review.message) + '"</p><div class="student-review-author">— ' + escapeHtml(review.name) + '</div><div class="student-review-year">Learned to ride · ' + escapeHtml(review.year) + '</div>';
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading reviews:', error);
    container.innerHTML = '<div class="loading-reviews">Unable to load reviews. Please check back later.</div>';
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===== STUDENT REVIEW FORM SUBMISSION =====
var studentReviewForm = document.getElementById('studentReviewForm');
if (studentReviewForm) {
  studentReviewForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    var statusDiv = document.getElementById('studentReviewStatus');
    if (!statusDiv) return;
    
    statusDiv.innerHTML = 'Submitting your review...';
    statusDiv.classList.remove('error');
    
    var formData = {
      name: studentReviewForm.querySelector('input[name="name"]').value || '',
      year: studentReviewForm.querySelector('input[name="year"]').value || '',
      message: studentReviewForm.querySelector('textarea[name="message"]').value || '',
      email: studentReviewForm.querySelector('input[name="email"]').value || ''
    };
    
    var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyJEgCH6-QiwXC1T8BGgvd-z_7iSfans2NKFAfHbUVWS0Zvn123fDtBFu-jkoWsoWe1/exec';
    
    try {
      var response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        statusDiv.innerHTML = '✓ Thank you! Your review has been submitted for approval.';
        studentReviewForm.reset();
        setTimeout(function() { statusDiv.innerHTML = ''; }, 5000);
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      statusDiv.innerHTML = '❌ Something went wrong. Please try again.';
      statusDiv.classList.add('error');
    }
  });
}

if (document.getElementById('studentReviewsGrid')) {
  document.addEventListener('DOMContentLoaded', loadStudentReviews);
}
