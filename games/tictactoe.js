(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const box = canvas.height / 3;
        let board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        let currentPlayer = 'X';
        let gameActive = true;

        canvas.addEventListener('click', handleClick);

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 5;

            // Lines
            ctx.beginPath(); ctx.moveTo(box, 0); ctx.lineTo(box, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(box * 2, 0); ctx.lineTo(box * 2, canvas.height); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, box); ctx.lineTo(canvas.width, box); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(0, box * 2); ctx.lineTo(canvas.width, box * 2); ctx.stroke();

            // Marks
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[i][j] === 'X') drawX(j * box, i * box);
                    if (board[i][j] === 'O') drawO(j * box, i * box);
                }
            }
        }

        function drawX(x, y) {
            ctx.strokeStyle = '#00f2ff';
            ctx.shadowBlur = 10; ctx.shadowColor = '#00f2ff';
            ctx.beginPath(); ctx.moveTo(x + 20, y + 20); ctx.lineTo(x + box - 20, y + box - 20); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(x + box - 20, y + 20); ctx.lineTo(x + 20, y + box - 20); ctx.stroke();
            ctx.shadowBlur = 0;
        }

        function drawO(x, y) {
            ctx.strokeStyle = '#ff00c8';
            ctx.shadowBlur = 10; ctx.shadowColor = '#ff00c8';
            ctx.beginPath(); ctx.arc(x + box / 2, y + box / 2, box / 2 - 20, 0, Math.PI * 2); ctx.stroke();
            ctx.shadowBlur = 0;
        }

        function handleClick(e) {
            if (!gameActive) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const i = Math.floor(y / box);
            const j = Math.floor(x / box);

            if (board[i][j] === '') {
                board[i][j] = 'X';
                if (checkWin('X')) {
                    finish(100);
                } else if (isDraw()) {
                    finish(50);
                } else {
                    gameActive = false; // "AI" Turn
                    setTimeout(aiMove, 500);
                }
                draw();
            }
        }

        function aiMove() {
            let available = [];
            for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (board[i][j] === '') available.push({ i, j });
            if (available.length > 0) {
                let move = available[Math.floor(Math.random() * available.length)];
                board[move.i][move.j] = 'O';
                if (checkWin('O')) {
                    finish(0);
                } else if (isDraw()) {
                    finish(50);
                }
                gameActive = true;
                draw();
            }
        }

        function checkWin(p) {
            for (let i = 0; i < 3; i++) if (board[i][0] == p && board[i][1] == p && board[i][2] == p) return true;
            for (let i = 0; i < 3; i++) if (board[0][i] == p && board[1][i] == p && board[2][i] == p) return true;
            if (board[0][0] == p && board[1][1] == p && board[2][2] == p) return true;
            if (board[0][2] == p && board[1][1] == p && board[2][0] == p) return true;
            return false;
        }

        function isDraw() {
            return board.flat().every(cell => cell !== '');
        }

        function finish(score) {
            gameActive = false;
            canvas.removeEventListener('click', handleClick);
            gameOver(score);
        }

        draw();
    };
})();
