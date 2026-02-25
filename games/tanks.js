(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let angle = -45;
        let power = 10;
        let bullet = null;
        let target = { x: 600, y: 400, w: 50, h: 20 };
        let score = 0;
        let gameActive = true;
        let tries = 5;

        canvas.addEventListener('mousemove', (e) => {
            if (bullet) return;
            const rect = canvas.getBoundingClientRect();
            const dx = (e.clientX - rect.left) - 50;
            const dy = (e.clientY - rect.top) - 400;
            angle = Math.atan2(dy, dx);
        });

        canvas.addEventListener('mousedown', () => {
            if (bullet || tries <= 0 || !gameActive) return;
            bullet = {
                x: 50 + Math.cos(angle) * 40,
                y: 400 + Math.sin(angle) * 40,
                vx: Math.cos(angle) * 15,
                vy: Math.sin(angle) * 15
            };
            tries--;
        });

        function draw() {
            if (!gameActive) return;
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Ground
            ctx.fillStyle = "#1a1a1a"; ctx.fillRect(0, 420, canvas.width, canvas.height - 420);

            // Tank
            ctx.fillStyle = "#00f2ff"; ctx.fillRect(30, 400, 40, 20);
            ctx.strokeStyle = "#00f2ff"; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.moveTo(50, 400);
            ctx.lineTo(50 + Math.cos(angle) * 40, 400 + Math.sin(angle) * 40); ctx.stroke();

            // Target
            ctx.fillStyle = "#ff00c8"; ctx.fillRect(target.x, target.y, target.w, target.h);

            // Bullet
            if (bullet) {
                bullet.x += bullet.vx;
                bullet.vy += 0.2; // Gravity
                bullet.y += bullet.vy;
                ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2); ctx.fill();

                if (bullet.x > target.x && bullet.x < target.x + target.w && bullet.y > target.y && bullet.y < target.y + target.h) {
                    score += 500; updateScore(score); bullet = null;
                    target.x = 200 + Math.random() * 500;
                } else if (bullet.y > 420 || bullet.x > canvas.width || bullet.x < 0) {
                    bullet = null;
                }
            }

            ctx.fillStyle = "#fff"; ctx.font = "16px Orbitron";
            ctx.fillText(`TRIES: ${tries}`, 50, 50);

            if (tries === 0 && !bullet) { gameActive = false; setTimeout(() => gameOver(score), 1000); }

            requestAnimationFrame(draw);
        }
        draw();
    };
})();
