(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const rows = 6, cols = 7, tileSize = 70;
        let board = Array(rows).fill().map(() => Array(cols).fill(0));
        let currentPlayer = 1, gameActive = true;

        const offsetX = (canvas.width - cols * tileSize) / 2;
        const offsetY = (canvas.height - rows * tileSize) / 2;

        canvas.addEventListener('mousedown', (e) => {
            if (!gameActive) return;
            const rect = canvas.getBoundingClientRect();
            const c = Math.floor((e.clientX - rect.left - offsetX) / tileSize);
            if (c >= 0 && c < cols) drop(c);
        });

        function drop(c) {
            for (let r = rows - 1; r >= 0; r--) {
                if (board[r][c] === 0) {
                    board[r][c] = currentPlayer;
                    if (checkWin(r, c)) {
                        draw(); gameActive = false; gameOver(currentPlayer === 1 ? 1000 : 0);
                    } else {
                        currentPlayer = currentPlayer === 1 ? 2 : 1;
                        if (currentPlayer === 2) setTimeout(aiMove, 500);
                    }
                    draw();
                    return;
                }
            }
        }

        function aiMove() {
            if (!gameActive) return;
            let validCols = [];
            for (let c = 0; c < cols; c++) if (board[0][c] === 0) validCols.push(c);
            if (validCols.length > 0) drop(validCols[Math.floor(Math.random() * validCols.length)]);
        }

        function checkWin(r, c) {
            const p = board[r][c];
            const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
            for (let [dr, dc] of dirs) {
                let count = 1;
                for (let i = 1; i < 4; i++) {
                    let nr = r + dr * i, nc = c + dc * i;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === p) count++; else break;
                }
                for (let i = 1; i < 4; i++) {
                    let nr = r - dr * i, nc = c - dc * i;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === p) count++; else break;
                }
                if (count >= 4) return true;
            }
            return false;
        }

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#1a1a1a"; ctx.fillRect(offsetX, offsetY, cols * tileSize, rows * tileSize);
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const x = offsetX + c * tileSize + tileSize / 2;
                    const y = offsetY + r * tileSize + tileSize / 2;
                    ctx.fillStyle = board[r][c] === 0 ? "#050505" : (board[r][c] === 1 ? "#00f2ff" : "#ff00c8");
                    ctx.beginPath(); ctx.arc(x, y, tileSize / 2 - 5, 0, Math.PI * 2); ctx.fill();
                }
            }
        }
        draw();
    };
})();
