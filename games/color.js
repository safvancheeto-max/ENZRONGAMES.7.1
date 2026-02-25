(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const colors = ["#00f2ff", "#7000ff", "#ff00c8", "#00ff00"];
        const names = ["CYAN", "PURPLE", "PINK", "GREEN"];
        let score = 0;
        let timeLeft = 30;
        let gameActive = true;
        let currentChallenge;

        function nextChallenge() {
            const nameIdx = Math.floor(Math.random() * colors.length);
            const colorIdx = Math.floor(Math.random() * colors.length);
            const isMatch = Math.random() > 0.5;

            // If we want a match or mismatch specifically
            currentChallenge = {
                text: names[nameIdx],
                color: isMatch ? colors[nameIdx] : colors[colorIdx],
                isMatch: (nameIdx === colorIdx) // This is the logic check
            };

            // Fix logic: is the WORD name same as the COLOR?
            currentChallenge.correct = (names.indexOf(currentChallenge.text) === colors.indexOf(currentChallenge.color));
        }

        canvas.addEventListener('mousedown', (e) => {
            if (!gameActive) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;

            const choice = mx < canvas.width / 2; // Left for YES, Right for NO
            if (choice === currentChallenge.correct) {
                score += 50;
                updateScore(score);
                nextChallenge();
            } else {
                timeLeft -= 5;
                nextChallenge();
            }
            draw();
        });

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = currentChallenge.color;
            ctx.font = "bold 60px Orbitron";
            ctx.textAlign = "center";
            ctx.fillText(currentChallenge.text, canvas.width / 2, 200);

            ctx.fillStyle = "#fff"; ctx.font = "20px Orbitron";
            ctx.fillText("DOES THE WORD MATCH THE COLOR?", canvas.width / 2, 120);

            // Buttons
            ctx.fillStyle = "#00f2ff"; ctx.fillRect(50, 300, 300, 100);
            ctx.fillStyle = "#ff00c8"; ctx.fillRect(450, 300, 300, 100);

            ctx.fillStyle = "#000"; ctx.font = "bold 30px Orbitron";
            ctx.fillText("YES", 200, 360);
            ctx.fillText("NO", 600, 360);

            ctx.fillStyle = "#fff"; ctx.font = "16px Orbitron";
            ctx.fillText(`TIME: ${timeLeft}s`, canvas.width / 2, 50);
        }

        nextChallenge();
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
