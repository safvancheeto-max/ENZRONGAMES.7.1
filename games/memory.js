(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const rows = 4, cols = 4;
        const total = rows * cols;
        let symbols = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
        symbols = symbols.sort(() => Math.random() - 0.5);

        let cards = [];
        let flipped = [];
        let matched = 0;
        let score = 0;

        const w = 100, h = 100, gap = 15;
        const offsetX = (canvas.width - (cols * (w + gap))) / 2;
        const offsetY = (canvas.height - (rows * (h + gap))) / 2;

        for (let i = 0; i < total; i++) {
            cards.push({
                symbol: symbols[i],
                revealed: false,
                x: offsetX + (i % cols) * (w + gap),
                y: offsetY + Math.floor(i / cols) * (h + gap)
            });
        }

        canvas.addEventListener('click', (e) => {
            if (flipped.length >= 2) return;
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            cards.forEach(card => {
                if (!card.revealed && mouseX > card.x && mouseX < card.x + w && mouseY > card.y && mouseY < card.y + h) {
                    card.revealed = true;
                    flipped.push(card);
                    if (flipped.length === 2) {
                        score += 10; updateScore(score);
                        if (flipped[0].symbol === flipped[1].symbol) {
                            matched += 2;
                            flipped = [];
                            if (matched === total) setTimeout(() => gameOver(score + 100), 500);
                        } else {
                            setTimeout(() => {
                                flipped[0].revealed = false;
                                flipped[1].revealed = false;
                                flipped = [];
                            }, 800);
                        }
                    }
                    draw();
                }
            });
        });

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            cards.forEach(card => {
                ctx.fillStyle = card.revealed ? "#7000ff" : "#1a1a1a";
                ctx.strokeStyle = card.revealed ? "#00f2ff" : "#333";
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.roundRect(card.x, card.y, w, h, 8);
                ctx.fill(); ctx.stroke();

                if (card.revealed) {
                    ctx.fillStyle = "#fff";
                    ctx.font = "bold 30px Orbitron";
                    ctx.textAlign = "center";
                    ctx.fillText(card.symbol, card.x + w / 2, card.y + h / 2 + 10);
                }
            });
        }
        draw();
    };
})();
