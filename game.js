const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 15;
const cellSize = canvas.width / gridSize;
const board = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
let currentPlayer = 'black';
const directions = [
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: -1 }
];

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i <= gridSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

function drawPiece(x, y, color) {
    const radius = cellSize / 2 * 0.8;
    const centerX = x * cellSize + cellSize / 2;
    const centerY = y * cellSize + cellSize / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
}

function checkWin(x, y, color) {
    for (const { x: dx, y: dy } of directions) {
        let count = 1;
        for (let step = 1; step <= 4; step++) {
            const nx = x + dx * step;
            const ny = y + dy * step;
            if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize || board[nx][ny] !== color) break;
            count++;
        }
        for (let step = 1; step <= 4; step++) {
            const nx = x - dx * step;
            const ny = y - dy * step;
            if (nx < 0 || ny < 0 || nx >= gridSize || ny >= gridSize || board[nx][ny] !== color) break;
            count++;
        }
        if (count >= 5) return true;
    }
    return false;
}

function computerMove() {
    let x, y;
    do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
    } while (board[x][y]);
    board[x][y] = 'white';
    drawPiece(x, y, 'white');
    if (checkWin(x, y, 'white')) {
        alert('電腦（白棋）獲勝！');
        resetGame();
    }
}

function resetGame() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            board[i][j] = null;
        }
    }
    drawBoard();
}

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    if (board[x][y]) return;
    board[x][y] = currentPlayer;
    drawPiece(x, y, currentPlayer);
    if (checkWin(x, y, currentPlayer)) {
        alert('玩家（黑棋）獲勝！');
        resetGame();
    } else {
        computerMove();
    }
});

resetGame();
drawBoard();
