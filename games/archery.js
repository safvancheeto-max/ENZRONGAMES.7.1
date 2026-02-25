(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let arrows = [];
        let target = { y: 200, dy: 3, r: 40 };
        let gameActive = true;
        let score = 0;
        let shots = 10;

        canvas.addEventListener('mousedown', () => {
            if (!gameActive || shots <= 0) return;
            arrows.push({ x: 100, y: canvas.height / 2, active: true });
            shots--;
        });

        function draw() {
            if (!gameActive) return;
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Target
            target.y += target.dy;
            if (target.y > canvas.height - 50 || target.y < 50) target.dy *= -1;

            ctx.strokeStyle = "#fff"; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.arc(canvas.width - 100, target.y, target.r, 0, Math.PI * 2); ctx.stroke();
            ctx.strokeStyle = "#ff00c8"; ctx.beginPath(); ctx.arc(canvas.width - 100, target.y, target.r * 0.7, 0, Math.PI * 2); ctx.stroke();
            ctx.strokeStyle = "#00f2ff"; ctx.beginPath(); ctx.arc(canvas.width - 100, target.y, target.r * 0.4, 0, Math.PI * 2); ctx.stroke();

            // Arrows
            arrows.forEach((a, i) => {
                if (!a.active) {
                    // Draw stuck arrow relative to target
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(canvas.width - 140, target.y + a.relativeY, 40, 4);
                    return;
                }
                a.x += 15;
                ctx.fillStyle = "#00f2ff"; ctx.fillRect(a.x, a.y, 40, 4);

                // Collision
                if (a.x > canvas.width - 140) {
                    const dist = Math.abs(a.y - target.y);
                    if (dist < target.r) {
                        a.active = false;
                        a.relativeY = a.y - target.y;
                        score += Math.floor((target.r - dist) * 5);
                        updateScore(score);
                    } else if (a.x > canvas.width) {
                        arrows.splice(i, 1);
                    }
                }
            });

            ctx.fillStyle = "#fff"; ctx.font = "16px Orbitron";
            ctx.fillText(`SHOTS LEFT: ${shots}`, 50, 50);

            if (shots === 0 && arrows.every(a => !a.active)) {
                gameActive = false;
                setTimeout(() => gameOver(score), 1000);
            }

            requestAnimationFrame(draw);
        }
        draw();
    };
})();
