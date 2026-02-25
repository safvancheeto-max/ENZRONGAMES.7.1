(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const words = ["JAVASCRIPT", "GAMING", "NEON", "CYBERPUNK", "PIXEL", "BROWSER", "ULTRA", "RETRO"];
        let currentWord, scrambled;
        let userInput = "";
        let score = 0;
        let gameActive = true;
        let timeLeft = 60;

        function nextWord() {
            currentWord = words[Math.floor(Math.random() * words.length)];
            scrambled = currentWord.split('').sort(() => Math.random() - 0.5).join('');
            userInput = "";
        }

        document.addEventListener('keydown', (e) => {
            if (!gameActive) return;
            if (e.key === 'Enter') {
                if (userInput === currentWord) {
                    score += 100;
                    updateScore(score);
                    nextWord();
                } else {
                    userInput = "";
                }
            } else if (e.key === 'Backspace') {
                userInput = userInput.slice(0, -1);
            } else if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
                userInput += e.key.toUpperCase();
            }
            draw();
        });

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = "center";

            ctx.fillStyle = "#00f2ff"; ctx.font = "bold 40px Orbitron";
            ctx.fillText(scrambled, canvas.width / 2, 200);

            ctx.fillStyle = "#fff"; ctx.font = "30px Inter";
            ctx.fillText(userInput + "_", canvas.width / 2, 300);

            ctx.fillStyle = "#7000ff"; ctx.font = "16px Orbitron";
            ctx.fillText(`TIME: ${timeLeft}s`, canvas.width / 2, 100);
            ctx.fillText("TYPE AND PRESS ENTER", canvas.width / 2, 400);
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

        nextWord();
        draw();
    };
})();
