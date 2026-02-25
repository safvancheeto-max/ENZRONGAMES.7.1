(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const size = 3;
        let board = [0, 1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
        let gameActive = true;
        let score = 0;
        const tileSize = 120;
        const offsetX = (canvas.width - size * tileSize) / 2;
        const offsetY = (canvas.height - size * tileSize) / 2;

        canvas.addEventListener('mousedown', (e) => {
            if (!gameActive) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left - offsetX;
            const y = e.clientY - rect.top - offsetY;
            const i = Math.floor(y / tileSize);
            const j = Math.floor(x / tileSize);
            const idx = i * size + j;

            if (idx >= 0 && idx < 9) {
                tryMove(idx);
            }
        });

        function tryMove(idx) {
            const emptyIdx = board.indexOf(0);
            const neighbors = [emptyIdx - 1, emptyIdx + 1, emptyIdx - size, emptyIdx + size];

            // Check if idx is a neighbor and not wrapping row
            const isNeighbor = neighbors.includes(idx);
            const sameRow = Math.floor(idx / size) === Math.floor(emptyIdx / size);
            const sameCol = idx % size === emptyIdx % size;

            if (isNeighbor && (sameRow || sameCol)) {
                [board[idx], board[emptyIdx]] = [board[emptyIdx], board[idx]];
                score += 10;
                updateScore(score);
                if (checkWin()) {
                    gameActive = false;
                    gameOver(score + 1000);
                }
                draw();
            }
        }

        function checkWin() {
            for (let i = 0; i < 8; i++) if (board[i] !== i + 1) return false;
            return true;
        }

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < 9; i++) {
                if (board[i] === 0) continue;
                const x = offsetX + (i % size) * tileSize;
                const y = offsetY + Math.floor(i / size) * tileSize;

                ctx.fillStyle = "#1a1a1a"; ctx.strokeStyle = "#00f2ff"; ctx.lineWidth = 2;
                ctx.beginPath(); ctx.roundRect(x + 5, y + 5, tileSize - 10, tileSize - 10, 8); ctx.fill(); ctx.stroke();

                ctx.fillStyle = "#fff"; ctx.font = "bold 30px Orbitron"; ctx.textAlign = "center";
                ctx.fillText(board[i], x + tileSize / 2, y + tileSize / 2 + 10);
            }
            if (!gameActive) {
                ctx.fillStyle = "rgba(0,0,0,0.7)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#00f2ff"; ctx.fillText("SOLVED!", canvas.width / 2, canvas.height / 2);
            }
        }
        draw();
    };
})();
