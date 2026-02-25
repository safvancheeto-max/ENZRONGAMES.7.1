(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let bird = { x: 50, y: 150, width: 20, height: 20, gravity: 0.6, lift: -12, velocity: 0 };
        let pipes = [];
        let score = 0;
        let frame = 0;
        let gameActive = true;

        document.addEventListener('keydown', flap);

        function flap(e) { if (e.code === 'Space' || e.code === 'ArrowUp') bird.velocity = bird.lift; }

        function pipeWorker() {
            if (frame % 90 === 0) {
                let gap = 120;
                let topHeight = Math.random() * (canvas.height / 2);
                pipes.push({ x: canvas.width, y: 0, w: 40, h: topHeight });
                pipes.push({ x: canvas.width, y: topHeight + gap, w: 40, h: canvas.height - topHeight - gap });
            }
        }

        function draw() {
            if (!gameActive) return;
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bird
            bird.velocity += bird.gravity;
            bird.y += bird.velocity;
            ctx.fillStyle = "#00f2ff"; ctx.shadowBlur = 10; ctx.shadowColor = "#00f2ff";
            ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

            // Pipes
            pipeWorker();
            for (let i = pipes.length - 1; i >= 0; i--) {
                pipes[i].x -= 3;
                ctx.fillStyle = "#7000ff"; ctx.fillRect(pipes[i].x, pipes[i].y, pipes[i].w, pipes[i].h);

                if (bird.x < pipes[i].x + pipes[i].w && bird.x + bird.width > pipes[i].x &&
                    bird.y < pipes[i].y + pipes[i].h && bird.y + bird.height > pipes[i].y) {
                    finish();
                }

                if (pipes[i].x + pipes[i].w < 0) pipes.splice(i, 1);
            }

            if (bird.y > canvas.height || bird.y < 0) finish();

            if (frame % 90 === 0 && frame > 0) { score++; updateScore(score); }
            frame++;
            requestAnimationFrame(draw);
        }

        function finish() {
            gameActive = false;
            document.removeEventListener('keydown', flap);
            gameOver(score);
        }

        draw();
    };
})();
