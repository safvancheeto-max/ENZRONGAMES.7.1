(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let taps = 0;
        let timeLeft = 10;
        let gameActive = false;

        canvas.addEventListener('mousedown', () => {
            if (!gameActive && timeLeft === 10) {
                gameActive = true;
                const timer = setInterval(() => {
                    timeLeft--;
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        gameActive = false;
                        gameOver(taps * 10);
                    }
                    draw();
                }, 1000);
            }
            if (gameActive) {
                taps++;
                updateScore(taps * 10);
                draw();
            }
        });

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = "center";
            ctx.font = "bold 60px Orbitron";
            ctx.fillStyle = "#00f2ff";
            ctx.shadowBlur = 20; ctx.shadowColor = "#00f2ff";
            ctx.fillText(taps, canvas.width / 2, canvas.height / 2 + 20);
            ctx.shadowBlur = 0;

            ctx.font = "bold 20px Orbitron";
            ctx.fillStyle = "#fff";
            ctx.fillText(`TIME LEFT: ${timeLeft}s`, canvas.width / 2, 80);

            if (!gameActive && timeLeft === 10) {
                ctx.font = "16px Inter";
                ctx.fillText("TAP REPEATEDLY TO START MISSION", canvas.width / 2, canvas.height - 100);
            }
        }
        draw();
    };
})();
