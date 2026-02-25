(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const size = 9, subSize = 3, tileSize = 45;
        let board = Array(size).fill().map(() => Array(size).fill(0));
        let fixed = Array(size).fill().map(() => Array(size).fill(false));
        let selected = { r: 0, c: 0 }, gameActive = true, score = 0;

        const offsetX = (canvas.width - size * tileSize) / 2;
        const offsetY = (canvas.height - size * tileSize) / 2;

        function initData() {
            // Simplified Sudoku generator (just a few numbers for demo)
            for (let i = 0; i < 15; i++) {
                let r = Math.floor(Math.random() * 9), c = Math.floor(Math.random() * 9), v = Math.floor(Math.random() * 9) + 1;
                board[r][c] = v; fixed[r][c] = true;
            }
        }

        document.addEventListener('keydown', (e) => {
            if (!gameActive) return;
            if (e.key >= '1' && e.key <= '9') {
                if (!fixed[selected.r][selected.c]) {
                    board[selected.r][selected.c] = parseInt(e.key);
                    score += 10; updateScore(score); draw();
                }
            }
            if (e.key === 'ArrowUp') selected.r = Math.max(0, selected.r - 1);
            if (e.key === 'ArrowDown') selected.r = Math.min(8, selected.r + 1);
            if (e.key === 'ArrowLeft') selected.c = Math.max(0, selected.c - 1);
            if (e.key === 'ArrowRight') selected.c = Math.min(8, selected.c + 1);
            if (e.key === 'Enter') { gameActive = false; gameOver(score); }
            draw();
        });

        function draw() {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            for (let r = 0; r < size; r++) {
                for (let c = 0; c < size; c++) {
                    const x = offsetX + c * tileSize, y = offsetY + r * tileSize;
                    ctx.strokeStyle = "#444"; ctx.lineWidth = 1;
                    if (r % 3 === 0) ctx.lineWidth = 3;
                    ctx.strokeRect(x, y, tileSize, tileSize);
                    if (selected.r === r && selected.c === c) {
                        ctx.fillStyle = "rgba(0, 242, 255, 0.2)"; ctx.fillRect(x, y, tileSize, tileSize);
                    }
                    if (board[r][c] !== 0) {
                        ctx.fillStyle = fixed[r][c] ? "#7000ff" : "#00f2ff";
                        ctx.font = "bold 20px Orbitron"; ctx.textAlign = "center";
                        ctx.fillText(board[r][c], x + 22, y + 32);
                    }
                }
            }
        }
        initData(); draw();
    };
})();
