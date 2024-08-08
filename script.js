const puzzleContainer = document.getElementById('puzzle-container');
const puzzleSize = 4; // 4x4 puzzle
let pieces = [];
let positions = [];

// Create puzzle pieces
function createPuzzle() {
    const https://ibb.co/1r6S3TX = 'https://via.placeholder.com/400'; // Replace with your image URL
    let index = 0;
    for (let y = 0; y < puzzleSize; y++) {
        for (let x = 0; x < puzzleSize; x++) {
            const piece = document.createElement('div');
            piece.className = 'puzzle-piece';
            piece.style.backgroundImage = `url(${imageUrl})`;
            piece.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
            piece.style.backgroundPosition = `-${x * 100}px -${y * 100}px`;
            piece.draggable = true;
            piece.dataset.index = index;
            piece.dataset.x = x;
            piece.dataset.y = y;
            piece.addEventListener('dragstart', dragStart);
            piece.addEventListener('dragover', dragOver);
            piece.addEventListener('drop', drop);
            piece.addEventListener('dragend', dragEnd);
            pieces.push(piece);
            puzzleContainer.appendChild(piece);
            index++;
        }
    }
    // Shuffle pieces
    shufflePieces();
}

// Shuffle pieces
function shufflePieces() {
    for (let i = pieces.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pieces[i].dataset.x, pieces[j].dataset.x] = [pieces[j].dataset.x, pieces[i].dataset.x];
        [pieces[i].dataset.y, pieces[j].dataset.y] = [pieces[j].dataset.y, pieces[i].dataset.y];
        positions[i] = [pieces[i].dataset.x, pieces[i].dataset.y];
        positions[j] = [pieces[j].dataset.x, pieces[j].dataset.y];
        puzzleContainer.appendChild(pieces[i]);
    }
}

// Drag and drop handlers
function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData('text/plain');
    const targetIndex = event.target.dataset.index;
    const draggedPiece = pieces[draggedIndex];
    const targetPiece = pieces[targetIndex];
    puzzleContainer.appendChild(draggedPiece);
    puzzleContainer.appendChild(targetPiece);
    [draggedPiece.dataset.x, targetPiece.dataset.x] = [targetPiece.dataset.x, draggedPiece.dataset.x];
    [draggedPiece.dataset.y, targetPiece.dataset.y] = [targetPiece.dataset.y, draggedPiece.dataset.y];
}

function dragEnd(event) {
    event.preventDefault();
}

// Check if the puzzle is complete
function checkPuzzle() {
    let isComplete = true;
    for (let i = 0; i < pieces.length; i++) {
        const piece = pieces[i];
        if (piece.dataset.x != piece.style.backgroundPositionX || piece.dataset.y != piece.style.backgroundPositionY) {
            isComplete = false;
            break;
        }
    }
    if (isComplete) {
        alert('恭喜你完成了拼圖！祝爸爸父親節快樂！');
    } else {
        alert('拼圖尚未完成，請再試一次！');
    }
}

// Initialize puzzle
createPuzzle();
