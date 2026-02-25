(function () {
    window.initCurrentGame = function (canvasId, updateScore, gameOver) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        let state = 'WAITING'; // WAITING, READY, CLICKED
        let startTime, timer;

        canvas.addEventListener('mousedown', handleClick);

        function handleClick() {
            if (state === 'WAITING') {
                state = 'READY';
                draw();
                const delay = Math.random() * 3000 + 2000;
                timer = setTimeout(() => {
                    state = 'NOW';
                    startTime = Date.now();
                    draw();
                }, delay);
            } else if (state === 'READY') {
                clearTimeout(timer);
                alert("Too soon! Try again.");
                state = 'WAITING';
                draw();
            } else if (state === 'NOW') {
                const reactionTime = Date.now() - startTime;
                state = 'RESULT';
                const score = Math.max(0, 1000 - reactionTime);
                draw(reactionTime);
                setTimeout(() => {
                    gameOver(score);
                }, 2000);
            }
        }

        function draw(time) {
            ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.textAlign = "center";
            ctx.font = "bold 30px Orbitron";

            if (state === 'WAITING') {
                ctx.fillStyle = "#7000ff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#fff"; ctx.fillText("CLICK TO START", canvas.width / 2, canvas.height / 2);
            } else if (state === 'READY') {
                ctx.fillStyle = "#ff00c8"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#fff"; ctx.fillText("WAIT FOR CYAN...", canvas.width / 2, canvas.height / 2);
            } else if (state === 'NOW') {
                ctx.fillStyle = "#00f2ff"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#000"; ctx.fillText("CLICK NOW!!!", canvas.width / 2, canvas.height / 2);
            } else if (state === 'RESULT') {
                ctx.fillStyle = "#050505"; ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "#00f2ff"; ctx.fillText(`${time} MS`, canvas.width / 2, canvas.height / 2);
                ctx.font = "20px Inter"; ctx.fillText("Calculating score...", canvas.width / 2, canvas.height / 2 + 50);
            }
        }
        draw();
    };
})();
