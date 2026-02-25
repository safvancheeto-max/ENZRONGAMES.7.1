(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const rows = 10, cols = 15, minesCount = 20, tileSize = 40;
        let board = [], gameActive = true, score = 0;

        const offsetX = (canvas.width - cols * tileSize) / 2;
        const offsetY = (canvas.height - rows * tileSize) / 2;

        function initData() {
            for (let r = 0; r < rows; r++) {
                board[r] = [];
                for (let c = 0; c < cols; c++) {
                    board[r][c] = { isMine: false, revealed: false, count: 0 };
                }
            }
            let placed = 0;
            while (placed < minesCount) {
                let r = Math.floor(Math.random() * rows), c = Math.floor(Math.random() * cols);
                if (!board[r][c].isMine) { board[r][c].isMine = true; placed++; }
            }
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    if (board[r][c].isMine) continue;
                    let count = 0;
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            let nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) count++;
                        }
                    }
                    board[r][c].count = count;
                }
            }
        }

        canvas.addEventListener('mousedown', (e) => {
            if (!gameActive) return;
            const rect = canvas.getBoundingClientRect();
            const r = Math.floor((e.clientY - rect.top - offsetY) / tileSize);
            const c = Math.floor((e.clientX - rect.left - offsetX) / tileSize);
            if (r >= 0 && r < rows && c >= 0 && c < cols) reveal(r, c);
        });

        function reveal(r, c) {
            if (board[r][c].revealed) return;
            board[r][c].revealed = true;
            if (board[r][c].isMine) {
                gameActive = false; draw(); gameOver(score);
            } else {
                score += 10; updateScore(score);
                if (board[r][c].count === 0) {
                    for (let dr = -1; dr <= 1; dr++) {
                        for (let dc = -1; dc <= 1; dc++) {
                            let nr = r + dr, nc = c + dc;
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) reveal(nr, nc);
                        }
                    }
                }
                if (board.flat().filter(t => !t.revealed).length === minesCount) {
                    gameActive = false; gameOver(score + 1000);
                }
                draw();
            }
        }

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = offsetX + c * tileSize, y = offsetY + r * tileSize;
                    ctx.fillStyle = board[r][c].revealed ? "#1a1a1a" : "#333";
                    ctx.strokeStyle = "#00f2ff"; ctx.lineWidth = 1;
                    ctx.fillRect(x, y, tileSize, tileSize); ctx.strokeRect(x, y, tileSize, tileSize);
                    if (board[r][c].revealed) {
                        if (board[r][c].isMine) {
                            ctx.fillStyle = "#ff00c8"; ctx.beginPath(); ctx.arc(x + 20, y + 20, 10, 0, Math.PI * 2); ctx.fill();
                        } else if (board[r][c].count > 0) {
                            ctx.fillStyle = "#fff"; ctx.font = "bold 16px Inter"; ctx.textAlign = "center";
                            ctx.fillText(board[r][c].count, x + 20, y + 25);
                        }
                    }
                }
            }
        }

        initData(); draw();
    };
})();
