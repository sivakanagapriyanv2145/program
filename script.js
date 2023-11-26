document.addEventListener('DOMContentLoaded', () => {
    createBoard();
});

let playerPosition = 1;

function createBoard() {
    const board = document.getElementById('board');

    let cellCount = 100;

    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = cellCount;

            if (row % 2 === 0) {
                cell.textContent = cellCount;
            } else {
                cell.textContent = cellCount - 9;
            }

            board.appendChild(cell);
            cellCount--;
        }
    }

    // Add snakes and ladders
    addSnakeOrLadder(16, 6, 'snake');
    addSnakeOrLadder(47, 26, 'snake');
    addSnakeOrLadder(49, 11, 'ladder');
    addSnakeOrLadder(56, 53, 'snake');
    addSnakeOrLadder(62, 19, 'ladder');
    addSnakeOrLadder(64, 60, 'ladder');
    addSnakeOrLadder(87, 24, 'snake');
    addSnakeOrLadder(93, 73, 'snake');
    addSnakeOrLadder(95, 75, 'ladder');
    addSnakeOrLadder(98, 78, 'ladder');
}

function addSnakeOrLadder(start, end, type) {
    const startCell = document.getElementById(start);
    const endCell = document.getElementById(end);

    if (type === 'snake') {
        startCell.classList.add('snake');
        endCell.classList.add('snake');
    } else if (type === 'ladder') {
        startCell.classList.add('ladder');
        endCell.classList.add('ladder');
    }
}

function rollDice() {
    const diceResult = Math.floor(Math.random() * 6) + 1;

    playerPosition += diceResult;

    if (playerPosition > 100) {
        playerPosition = 100 - (playerPosition - 100);
    }

    updatePlayerPosition();
}

function updatePlayerPosition() {
    const currentPlayerCell = document.getElementById(playerPosition);
    const messageElement = document.getElementById('message');

    // Check for snakes and ladders
    if (currentPlayerCell.classList.contains('snake')) {
        playerPosition -= 5;
    } else if (currentPlayerCell.classList.contains('ladder')) {
        playerPosition += 10;
    }

    messageElement.textContent = `You rolled a ${diceResult}. You are now at position ${playerPosition}.`;

    // Check for win
    if (playerPosition === 100) {
        messageElement.textContent = 'Congratulations! You reached the end!';
        document.getElementById('rollBtn').disabled = true;
    }
}
