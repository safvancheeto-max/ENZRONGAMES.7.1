(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let score = 0;
        let timeLeft = 30;
        let currentProblem = generateProblem();
        let gameActive = true;

        canvas.addEventListener('click', handleClick);

        function generateProblem() {
            const a = Math.floor(Math.random() * 20) + 1;
            const b = Math.floor(Math.random() * 20) + 1;
            const isAdd = Math.random() > 0.5;
            const ans = isAdd ? a + b : a - b;
            const options = [ans, ans + (Math.floor(Math.random() * 5) + 1), ans - (Math.floor(Math.random() * 5) + 1)].sort(() => Math.random() - 0.5);
            return { text: `${a} ${isAdd ? '+' : '-'} ${b} = ?`, ans, options };
        }

        function handleClick(e) {
            if (!gameActive) return;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            currentProblem.options.forEach((opt, idx) => {
                const y = 250 + idx * 60;
                if (mouseX > 300 && mouseX < 500 && mouseY > y - 40 && mouseY < y + 10) {
                    if (opt === currentProblem.ans) {
                        score += 10;
                        updateScore(score);
                        currentProblem = generateProblem();
                    } else {
                        timeLeft -= 2;
                    }
                    draw();
                }
            });
        }

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff"; ctx.font = "bold 40px Orbitron"; ctx.textAlign = "center";
            ctx.fillText(currentProblem.text, canvas.width / 2, 180);

            ctx.font = "bold 20px Orbitron";
            ctx.fillText(`TIME: ${Math.max(0, timeLeft)}s`, canvas.width / 2, 50);

            currentProblem.options.forEach((opt, idx) => {
                const y = 250 + idx * 60;
                ctx.fillStyle = "#1a1a1a"; ctx.strokeStyle = "#00f2ff"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.roundRect(300, y - 40, 200, 50, 8); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#fff"; ctx.fillText(opt, 400, y - 5);
            });
        }

        const timer = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timer);
                gameActive = false;
                gameOver(score);
            }
            draw();
        }, 1000);

        draw();
    };
})();
