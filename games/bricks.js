(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');

        let ball = { x: canvas.width / 2, y: canvas.height - 30, dx: 4, dy: -4, radius: 10 };
        let paddle = { h: 15, w: 100, x: (canvas.width - 100) / 2 };
        let bricks = [];
        let rows = 5, cols = 8, bWidth = 85, bHeight = 25, bPadding = 10, bOffsetTop = 50, bOffsetLeft = 35;

        for (let c = 0; c < cols; c++) {
            bricks[c] = [];
            for (let r = 0; r < rows; r++) { bricks[c][r] = { x: 0, y: 0, status: 1 }; }
        }

        document.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            let relativeX = e.clientX - rect.left;
            if (relativeX > 0 && relativeX < canvas.width) paddle.x = relativeX - paddle.w / 2;
        });

        function collisionDetection() {
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    let b = bricks[c][r];
                    if (b.status == 1) {
                        if (ball.x > b.x && ball.x < b.x + bWidth && ball.y > b.y && ball.y < b.y + bHeight) {
                            ball.dy = -ball.dy; b.status = 0;
                            updateScore(++score * 10);
                            if (score == rows * cols) gameOver(score * 10);
                        }
                    }
                }
            }
        }

        let score = 0;
        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Bricks
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    if (bricks[c][r].status == 1) {
                        let bx = (c * (bWidth + bPadding)) + bOffsetLeft;
                        let by = (r * (bHeight + bPadding)) + bOffsetTop;
                        bricks[c][r].x = bx; bricks[c][r].y = by;
                        ctx.fillStyle = "#7000ff"; ctx.beginPath();
                        ctx.roundRect(bx, by, bWidth, bHeight, 4); ctx.fill();
                    }
                }
            }

            // Ball
            ctx.fillStyle = "#00f2ff"; ctx.shadowBlur = 10; ctx.shadowColor = "#00f2ff";
            ctx.beginPath(); ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;

            // Paddle
            ctx.fillStyle = "#ff00c8"; ctx.fillRect(paddle.x, canvas.height - paddle.h - 10, paddle.w, paddle.h);

            collisionDetection();

            if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) ball.dx = -ball.dx;
            if (ball.y + ball.dy < ball.radius) ball.dy = -ball.dy;
            else if (ball.y + ball.dy > canvas.height - ball.radius - 20) {
                if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) ball.dy = -ball.dy;
                else gameOver(score * 10);
            }

            ball.x += ball.dx; ball.y += ball.dy;
            requestAnimationFrame(draw);
        }
        draw();
    };
})();
