(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let boxes = [];
        let speed = 4;
        let gameActive = true;
        let currentBox = { x: 0, y: canvas.height - 50, w: 200, h: 30, dir: 1 };
        let score = 0;

        // Base box
        boxes.push({ x: (canvas.width - 200) / 2, y: canvas.height - 30, w: 200, h: 30 });

        canvas.addEventListener('mousedown', () => {
            if (!gameActive) return;

            const lastBox = boxes[boxes.length - 1];

            // Calculate overlap
            const overlapStart = Math.max(currentBox.x, lastBox.x);
            const overlapEnd = Math.min(currentBox.x + currentBox.w, lastBox.x + lastBox.w);
            const overlapWidth = overlapEnd - overlapStart;

            if (overlapWidth > 0) {
                // Success
                boxes.push({ x: overlapStart, y: currentBox.y, w: overlapWidth, h: 30 });
                score += 100;
                updateScore(score);

                // Move camera effect
                if (boxes.length > 5) {
                    boxes.forEach(b => b.y += 30);
                }

                // New moving box
                currentBox = {
                    x: currentBox.dir === 1 ? 0 : canvas.width - overlapWidth,
                    y: currentBox.y - (boxes.length > 5 ? 0 : 30),
                    w: overlapWidth,
                    h: 30,
                    dir: Math.random() > 0.5 ? 1 : -1
                };
                speed += 0.2;
            } else {
                gameActive = false;
                gameOver(score);
            }
        });

        function draw() {
            if (!gameActive) return;
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw stack
            boxes.forEach((b, i) => {
                ctx.fillStyle = i === 0 ? "#333" : `hsl(${180 + i * 10}, 100%, 50%)`;
                ctx.shadowBlur = 10; ctx.shadowColor = ctx.fillStyle;
                ctx.fillRect(b.x, b.y, b.w, b.h);
            });

            // Draw moving box
            ctx.fillStyle = "#fff";
            currentBox.x += speed * currentBox.dir;
            if (currentBox.x + currentBox.w > canvas.width || currentBox.x < 0) currentBox.dir *= -1;
            ctx.fillRect(currentBox.x, currentBox.y, currentBox.w, currentBox.h);

            requestAnimationFrame(draw);
        }
        draw();
    };
})();
