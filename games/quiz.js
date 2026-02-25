(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let score = 0;
        let currentLevel = 0;
        let gameActive = true;

        const questions = [
            { q: "Which protocol is for secure web?", a: ["HTTP", "HTTPS", "FTP", "SSH"], correct: 1 },
            { q: "What is the brain of a computer?", a: ["RAM", "GPU", "CPU", "HDD"], correct: 2 },
            { q: "Which language runs in browser?", a: ["C++", "Python", "JavaScript", "Java"], correct: 2 },
            { q: "What does AI stand for?", a: ["Auto Info", "Asset Int", "Artificial Intelligence", "All In"], correct: 2 },
            { q: "Smallest unit of digital info?", a: ["Byte", "Bit", "Nibble", "Word"], correct: 1 },
            { q: "Who created Linux kernel?", a: ["Bill Gates", "Linus Torvalds", "Steve Jobs", "Mark Z."], correct: 1 },
            { q: "What is 1010 in decimal?", a: ["8", "10", "12", "14"], correct: 1 },
            { q: "Standard port for HTTP?", a: ["21", "22", "80", "443"], correct: 2 },
            { q: "First web browser?", a: ["Mosaic", "Netscape", "WorldWideWeb", "Chrome"], correct: 2 },
            { q: "Unit of frequency?", a: ["Watt", "Hertz", "Volt", "Ampere"], correct: 1 }
        ];

        canvas.addEventListener('click', handleClick);

        function handleClick(e) {
            if (!gameActive) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            for (let i = 0; i < 4; i++) {
                const y = 200 + i * 60;
                if (mx > 200 && mx < 600 && my > y && my < y + 50) {
                    if (i === questions[currentLevel].correct) {
                        score += 100;
                        updateScore(score);
                        nextLevel();
                    } else {
                        gameOver(score);
                        gameActive = false;
                    }
                    draw();
                    break;
                }
            }
        }

        function nextLevel() {
            currentLevel++;
            if (currentLevel >= questions.length) {
                gameActive = false;
                gameOver(score + 500); // Bonus for completion
            }
        }

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (!gameActive) return;

            const q = questions[currentLevel];
            ctx.fillStyle = "#fff"; ctx.font = "bold 24px Orbitron"; ctx.textAlign = "center";
            ctx.fillText(`Question ${currentLevel + 1}: ${q.q}`, canvas.width / 2, 100);

            for (let i = 0; i < 4; i++) {
                const y = 200 + i * 60;
                ctx.fillStyle = "#1a1a1a"; ctx.strokeStyle = "#00f2ff"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.roundRect(200, y, 400, 50, 10); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#fff"; ctx.font = "18px Inter";
                ctx.fillText(q.a[i], canvas.width / 2, y + 32);
            }
        }

        draw();
    };
})();
