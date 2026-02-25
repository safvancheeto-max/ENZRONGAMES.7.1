(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const words = ["NEON", "CYBER", "ROBOT", "SPACE", "PIXEL", "ENGINE", "GAMER", "BLOCK"];
        let word = words[Math.floor(Math.random() * words.length)];
        let guessed = [];
        let wrong = 0;
        let gameActive = true;

        document.addEventListener('keydown', (e) => {
            if (!gameActive) return;
            const char = e.key.toUpperCase();
            if (char.length === 1 && char >= 'A' && char <= 'Z') {
                if (!guessed.includes(char)) {
                    guessed.push(char);
                    if (!word.includes(char)) wrong++;
                    if (wrong >= 6) { gameActive = false; gameOver(0); }
                    if (word.split('').every(c => guessed.includes(c))) {
                        gameActive = false; gameOver(500);
                    }
                    draw();
                }
            }
        });

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = "#00f2ff"; ctx.lineWidth = 4;
            // Gallow
            ctx.beginPath(); ctx.moveTo(100, 400); ctx.lineTo(300, 400); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(200, 400); ctx.lineTo(200, 100); ctx.lineTo(300, 100); ctx.lineTo(300, 150); ctx.stroke();

            // Word
            ctx.fillStyle = "#fff"; ctx.font = "bold 40px Orbitron"; ctx.textAlign = "center";
            let display = word.split('').map(c => guessed.includes(c) ? c : "_").join(" ");
            ctx.fillText(display, 550, 250);

            // Hangman
            ctx.strokeStyle = "#ff00c8";
            if (wrong > 0) { ctx.beginPath(); ctx.arc(300, 180, 30, 0, Math.PI * 2); ctx.stroke(); } // Head
            if (wrong > 1) { ctx.beginPath(); ctx.moveTo(300, 210); ctx.lineTo(300, 300); ctx.stroke(); } // Body
            if (wrong > 2) { ctx.beginPath(); ctx.moveTo(300, 230); ctx.lineTo(260, 270); ctx.stroke(); } // Left Arm
            if (wrong > 3) { ctx.beginPath(); ctx.moveTo(300, 230); ctx.lineTo(340, 270); ctx.stroke(); } // Right Arm
            if (wrong > 4) { ctx.beginPath(); ctx.moveTo(300, 300); ctx.lineTo(260, 350); ctx.stroke(); } // Left Leg
            if (wrong > 5) { ctx.beginPath(); ctx.moveTo(300, 300); ctx.lineTo(340, 350); ctx.stroke(); } // Right Leg
        }
        draw();
    };
})();
