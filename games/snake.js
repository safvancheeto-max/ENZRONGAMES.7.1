(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const box = 20;
        let score = 0;
        let snake = [{ x: 10 * box, y: 10 * box }];
        let food = {
            x: Math.floor(Math.random() * (canvas.width / box)) * box,
            y: Math.floor(Math.random() * (canvas.height / box)) * box
        };
        let d = "RIGHT";
        let gameActive = true;

        document.addEventListener("keydown", direction);

        function direction(event) {
            let key = event.keyCode;
            if (key == 37 && d != "RIGHT") d = "LEFT";
            else if (key == 38 && d != "DOWN") d = "UP";
            else if (key == 39 && d != "LEFT") d = "RIGHT";
            else if (key == 40 && d != "UP") d = "DOWN";
        }

        function draw() {
            if (!gameActive) return;

            ctx.fillStyle = "#050505";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i == 0) ? "#00f2ff" : "#7000ff";
                ctx.shadowBlur = 10;
                ctx.shadowColor = (i == 0) ? "#00f2ff" : "#7000ff";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.shadowBlur = 0;
            }

            ctx.fillStyle = "#ff00c8";
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ff00c8";
            ctx.fillRect(food.x, food.y, box, box);
            ctx.shadowBlur = 0;

            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            if (d == "LEFT") snakeX -= box;
            if (d == "UP") snakeY -= box;
            if (d == "RIGHT") snakeX += box;
            if (d == "DOWN") snakeY += box;

            if (snakeX == food.x && snakeY == food.y) {
                score += 10;
                updateScore(score);
                food = {
                    x: Math.floor(Math.random() * (canvas.width / box)) * box,
                    y: Math.floor(Math.random() * (canvas.height / box)) * box
                };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || collision(newHead, snake)) {
                gameActive = false;
                document.removeEventListener("keydown", direction);
                gameOver(score);
                return;
            }

            snake.unshift(newHead);
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x == array[i].x && head.y == array[i].y) return true;
            }
            return false;
        }

        let game = setInterval(draw, 100);
    };
})();
