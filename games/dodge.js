(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let player = { x: canvas.width / 2, y: canvas.height / 2, r: 15 };
        let obstacles = [];
        let score = 0;
        let gameActive = true;
        let frame = 0;

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            player.x = e.clientX - rect.left;
            player.y = e.clientY - rect.top;
        });

        function spawn() {
            if (frame % 10 === 0) {
                const side = Math.floor(Math.random() * 4);
                let x, y, dx, dy;
                if (side === 0) { x = 0; y = Math.random() * canvas.height; dx = 3; dy = (Math.random() - 0.5) * 2; }
                if (side === 1) { x = canvas.width; y = Math.random() * canvas.height; dx = -3; dy = (Math.random() - 0.5) * 2; }
                if (side === 2) { x = Math.random() * canvas.width; y = 0; dx = (Math.random() - 0.5) * 2; dy = 3; }
                if (side === 3) { x = Math.random() * canvas.width; y = canvas.height; dx = (Math.random() - 0.5) * 2; dy = -3; }
                obstacles.push({ x, y, dx, dy, r: 5 + Math.random() * 10 });
            }
        }

        function draw() {
            if (!gameActive) return;
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Player
            ctx.fillStyle = "#00f2ff"; ctx.shadowBlur = 15; ctx.shadowColor = "#00f2ff";
            ctx.beginPath(); ctx.arc(player.x, player.y, player.r, 0, Math.PI * 2); ctx.fill();

            // Obstacles
            spawn();
            obstacles.forEach((o, i) => {
                o.x += o.dx; o.y += o.dy;
                ctx.fillStyle = "#ff00c8"; ctx.shadowBlur = 5; ctx.shadowColor = "#ff00c8";
                ctx.beginPath(); ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2); ctx.fill();

                // Collision
                const dist = Math.sqrt((player.x - o.x) ** 2 + (player.y - o.y) ** 2);
                if (dist < player.r + o.r) {
                    gameActive = false;
                    gameOver(score);
                }

                if (o.x < -20 || o.x > canvas.width + 20 || o.y < -20 || o.y > canvas.height + 20) {
                    obstacles.splice(i, 1);
                    score += 10;
                    updateScore(score);
                }
            });

            frame++;
            requestAnimationFrame(draw);
        }
        draw();
    };
})();
