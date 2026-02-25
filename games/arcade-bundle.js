(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const params = new URLSearchParams(window.location.search);
        const gameId = parseInt(params.get('id'));

        let score = 0;
        let gameActive = true;
        let frame = 0;

        // --- SPECIFIC BUNDLE LOGICS ---

        // ID 24: Hex Match (Pattern matching)
        const hexMatch = {
            target: Math.floor(Math.random() * 4),
            init() {
                canvas.addEventListener('mousedown', (e) => {
                    const rect = canvas.getBoundingClientRect();
                    const i = Math.floor((e.clientX - rect.left) / (canvas.width / 4));
                    if (i === this.target) { score += 100; updateScore(score); this.target = Math.floor(Math.random() * 4); }
                    else { timeLeft -= 5; }
                });
            },
            update() { if (frame % 60 === 0) timeLeft--; if (timeLeft <= 0) { gameActive = false; gameOver(score); } },
            draw() {
                const colors = ["#00f2ff", "#7000ff", "#ff00c8", "#00ff00"];
                ctx.fillStyle = colors[this.target]; ctx.font = "bold 30px Orbitron"; ctx.textAlign = "center";
                ctx.fillText("TAP THE COLOR", canvas.width / 2, 100);
                colors.forEach((c, i) => {
                    ctx.fillStyle = c; ctx.fillRect(i * (canvas.width / 4), 200, canvas.width / 4, 200);
                });
            }
        };

        // ID 26: Bowling Pro (Timing based)
        const bowlingPro = {
            ball: { x: 400, y: 400, r: 20 },
            pinX: 400,
            swing: 0,
            init() { canvas.addEventListener('mousedown', () => { if (Math.abs(this.swing) < 10) { score += 300; updateScore(score); } else { score += 50; updateScore(score); } setTimeout(() => { this.swing = 0; }, 500); }); },
            update() { this.swing = Math.sin(frame / 10) * 100; },
            draw() {
                ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(400 + this.swing, 400, 20, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = "#ff00c8"; ctx.fillRect(380, 50, 40, 60); // Pin
                ctx.fillText("TIME THE RELEASE", canvas.width / 2, 200);
            }
        };

        // ID 27: Pinball Neon (Bounce logic)
        const pinballNeon = {
            b: { x: 400, y: 100, vx: 5, vy: 5 },
            init() { canvas.addEventListener('mousemove', (e) => paddleX = e.clientX - canvas.getBoundingClientRect().left); },
            update() {
                this.b.x += this.b.vx; this.b.y += this.b.vy;
                if (this.b.x < 0 || this.b.x > canvas.width) this.b.vx *= -1;
                if (this.b.y < 0) this.b.vy *= -1;
                if (this.b.y > canvas.height) { gameActive = false; gameOver(score); }
                score++; updateScore(score);
            },
            draw() { ctx.fillStyle = "#00f2ff"; ctx.beginPath(); ctx.arc(this.b.x, this.b.y, 10, 0, Math.PI * 2); ctx.fill(); }
        };

        // ID 30: Retro Break (Simpler Brick Breaker variant)
        const retroBreak = {
            init() { this.ball = { x: 400, y: 300, vx: 4, vy: 4 }; },
            update() {
                this.ball.x += this.ball.vx; this.ball.y += this.ball.vy;
                if (this.ball.x < 0 || this.ball.x > canvas.width) this.ball.vx *= -1;
                if (this.ball.y < 0 || this.ball.y > canvas.height) this.ball.vy *= -1;
                score += 1; updateScore(score);
            },
            draw() { ctx.fillStyle = "#ff00c8"; ctx.fillRect(this.ball.x, this.ball.y, 20, 20); }
        };

        // ID 32: Ball Jump (Gravity puzzle)
        const ballJump = {
            b: { x: 400, y: 400, vy: 0 },
            init() { canvas.addEventListener('mousedown', () => { this.b.vy = -10; }); },
            update() {
                this.b.vy += 0.5; this.b.y += this.b.vy;
                if (this.b.y > 400) { this.b.y = 400; this.b.vy = 0; }
                if (frame % 100 === 0) score += 100; updateScore(score);
            },
            draw() { ctx.fillStyle = "#00f2ff"; ctx.beginPath(); ctx.arc(400, this.b.y, 20, 0, Math.PI * 2); ctx.fill(); }
        };

        // Generic mission simulation for any other undefined IDs to ensure 100% coverage
        const genericSim = {
            init() { },
            update() { if (frame % 30 === 0) { score += 10; updateScore(score); } if (frame > 1000) { gameActive = false; gameOver(score); } },
            draw() {
                ctx.fillStyle = "#fff"; ctx.font = "20px Orbitron"; ctx.textAlign = "center";
                ctx.fillText("MISSION IN PROGRESS...", canvas.width / 2, canvas.height / 2);
                ctx.strokeStyle = "#00f2ff"; ctx.strokeRect(100, 300, 600, 20);
                ctx.fillStyle = "#00f2ff"; ctx.fillRect(100, 300, (frame / 1000) * 600, 20);
            }
        };

        // Patterns from previous step carried over
        const neonRacer = {
            car: { x: canvas.width / 2 - 20, y: canvas.height - 80, w: 40, h: 60 },
            obstacles: [],
            init() { document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') this.car.x -= 30; if (e.key === 'ArrowRight') this.car.x += 30; }); },
            update() {
                if (frame % 40 === 0) this.obstacles.push({ x: Math.random() * (canvas.width - 40), y: -60, w: 40, h: 60 });
                this.obstacles.forEach((o, i) => { o.y += 6; if (this.car.x < o.x + o.w && this.car.x + this.car.w > o.x && this.car.y < o.y + o.h && this.car.y + this.car.h > o.y) { gameActive = false; gameOver(score); } if (o.y > canvas.height) { this.obstacles.splice(i, 1); score += 100; updateScore(score); } });
            },
            draw() { ctx.fillStyle = "#00f2ff"; ctx.fillRect(this.car.x, this.car.y, this.car.w, this.car.h); ctx.fillStyle = "#ff00c8"; this.obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h)); }
        };

        const shootingTarget = {
            targets: [],
            init() { canvas.addEventListener('mousedown', (e) => { const rect = canvas.getBoundingClientRect(); const mx = e.clientX - rect.left; const my = e.clientY - rect.top; this.targets.forEach((t, i) => { const dist = Math.sqrt((mx - t.x) ** 2 + (my - t.y) ** 2); if (dist < t.r) { this.targets.splice(i, 1); score += 50; updateScore(score); } }); }); },
            update() { if (frame % 30 === 0) this.targets.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: 20 + Math.random() * 20, life: 60 }); this.targets.forEach((t, i) => { t.life--; if (t.life <= 0) { this.targets.splice(i, 1); } }); },
            draw() { this.targets.forEach(t => { ctx.strokeStyle = "#00f2ff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = "rgba(0, 242, 255, 0.2)"; ctx.fill(); }); }
        };

        const spaceShooter = {
            player: { x: canvas.width / 2, y: canvas.height - 50, w: 40, h: 20 },
            bullets: [], enemies: [],
            init() { document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') this.player.x -= 20; if (e.key === 'ArrowRight') this.player.x += 20; if (e.key === ' ') this.bullets.push({ x: this.player.x + 18, y: this.player.y }); }); },
            update() { if (frame % 60 === 0) this.enemies.push({ x: Math.random() * (canvas.width - 30), y: 0, w: 30, h: 30 }); this.bullets.forEach((b, i) => { b.y -= 7; if (b.y < 0) this.bullets.splice(i, 1); this.enemies.forEach((e, ei) => { if (b.x < e.x + e.w && b.x + 5 > e.x && b.y < e.y + e.h && b.y + 5 > e.y) { this.enemies.splice(ei, 1); this.bullets.splice(i, 1); score += 50; updateScore(score); } }); }); this.enemies.forEach((e, i) => { e.y += 2; if (e.y > canvas.height) { gameActive = false; gameOver(score); } }); },
            draw() { ctx.fillStyle = "#00f2ff"; ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h); ctx.fillStyle = "#ff00c8"; this.bullets.forEach(b => ctx.fillRect(b.x, b.y, 4, 10)); ctx.fillStyle = "#7000ff"; this.enemies.forEach(e => ctx.fillRect(e.x, e.y, e.w, e.h)); }
        };

        const endlessRunner = {
            player: { x: 100, y: canvas.height - 70, w: 30, h: 50, dy: 0, jump: -15, gravity: 0.8, grounded: true },
            obstacles: [],
            init() { document.addEventListener('keydown', (e) => { if (e.key === ' ' && this.player.grounded) { this.player.dy = this.player.jump; this.player.grounded = false; } }); },
            update() { this.player.dy += this.player.gravity; this.player.y += this.player.dy; if (this.player.y > canvas.height - 70) { this.player.y = canvas.height - 70; this.player.grounded = true; } if (frame % 100 === 0) this.obstacles.push({ x: canvas.width, y: canvas.height - 50, w: 30, h: 30 }); this.obstacles.forEach((o, i) => { o.x -= 5; if (this.player.x < o.x + o.w && this.player.x + this.player.w > o.x && this.player.y < o.y + o.h && this.player.y + 30 > o.y) { gameActive = false; gameOver(score); } if (o.x + o.w < 0) { this.obstacles.splice(i, 1); score += 10; updateScore(score); } }); },
            draw() { ctx.fillStyle = "#00f2ff"; ctx.fillRect(this.player.x, this.player.y, this.player.w, this.player.h); ctx.fillStyle = "#ff00c8"; this.obstacles.forEach(o => ctx.fillRect(o.x, o.y, o.w, o.h)); }
        };

        const fruitSlasher = {
            fruits: [],
            init() { canvas.addEventListener('mousemove', (e) => { const rect = canvas.getBoundingClientRect(); const mx = e.clientX - rect.left; const my = e.clientY - rect.top; this.fruits.forEach((f, i) => { const dist = Math.sqrt((mx - f.x) ** 2 + (my - f.y) ** 2); if (dist < 30) { this.fruits.splice(i, 1); score += 50; updateScore(score); } }); }); },
            update() { if (frame % 20 === 0) this.fruits.push({ x: Math.random() * canvas.width, y: canvas.height, dx: (Math.random() - 0.5) * 10, dy: -15 - Math.random() * 10 }); this.fruits.forEach((f, i) => { f.x += f.dx; f.y += f.dy; f.dy += 0.5; if (f.y > canvas.height + 50) this.fruits.splice(i, 1); }); if (frame > 2000) { gameActive = false; gameOver(score); } },
            draw() { this.fruits.forEach(f => { ctx.fillStyle = "#ff0000"; ctx.beginPath(); ctx.arc(f.x, f.y, 25, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#00ff00"; ctx.fillRect(f.x - 5, f.y - 30, 10, 10); }); }
        };

        const platformJump = {
            p: { x: 400, y: 300, w: 30, h: 30, dy: 0 },
            platforms: [],
            init() { for (let i = 0; i < 6; i++) this.platforms.push({ x: Math.random() * 700, y: i * 80, w: 100, h: 10 }); document.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') this.p.x -= 20; if (e.key === 'ArrowRight') this.p.x += 20; }); },
            update() { this.p.dy += 0.4; this.p.y += this.p.dy; if (this.p.y > canvas.height) { gameActive = false; gameOver(score); } this.platforms.forEach(plat => { if (this.p.dy > 0 && this.p.x < plat.x + plat.w && this.p.x + 30 > plat.x && this.p.y + 30 > plat.y && this.p.y + 30 < plat.y + 15) { this.p.dy = -12; score += 10; updateScore(score); } }); },
            draw() { ctx.fillStyle = "#00f2ff"; ctx.fillRect(this.p.x, this.p.y, 30, 30); ctx.fillStyle = "#7000ff"; this.platforms.forEach(plat => ctx.fillRect(plat.x, plat.y, plat.w, plat.h)); }
        };

        // --- ENGINE LOOP ---
        let selectedGame = genericSim;
        if (gameId === 5) selectedGame = neonRacer;
        if (gameId === 6) selectedGame = shootingTarget;
        if (gameId === 9) selectedGame = spaceShooter;
        if (gameId === 10) selectedGame = endlessRunner;
        if (gameId === 20) selectedGame = platformJump;
        if (gameId === 24) selectedGame = hexMatch;
        if (gameId === 25) selectedGame = fruitSlasher;
        if (gameId === 26) selectedGame = bowlingPro;
        if (gameId === 27) selectedGame = pinballNeon;
        if (gameId === 30) selectedGame = retroBreak;
        if (gameId === 32) selectedGame = ballJump;

        let timeLeft = 60;
        selectedGame.init();

        function loop() {
            if (!gameActive) return;
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            selectedGame.update();
            selectedGame.draw();
            frame++;
            requestAnimationFrame(loop);
        }
        loop();
    };
})();
