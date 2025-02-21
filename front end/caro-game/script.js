/* 
Create board
output: 15x15 grid
*/
const SIZE = 15;
let board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));

function createBoard() {
    // 1. Generate the board in HTML
    const boardElement = document.querySelector('#board');
    boardElement.innerHTML = ""; // clear the board

    // Loop through rows and columns to create cells
    for (let i = 0; i < SIZE; i++) { // loop through rows
        for (let j = 0; j < SIZE; j++) { // loop through columns
            let cell = document.createElement('div'); // create a div for each cell
            cell.classList.add('cell'); // add css class for styling
            cell.dataset.row = i; // store row index in data attribute
            cell.dataset.col = j; // store column index in data attribute
            cell.addEventListener("click", handleMove); // add click handler
            boardElement.appendChild(cell);
        }
        
    }
}

createBoard();

/* 
Hanlde player moves
output: player's movement, game board update, winner check, turns switches
*/
let currentPlayer = "X"; // X goes first

function handleMove(event) {
    let row = event.target.dataset.row; // get row index
    let col = event.target.dataset.col; // get column index
    console.log(`${currentPlayer} clicked: ${row}, ${col}`);

    // Prevent overwriting a move
    if (board[row][col]!== null) return; 

    // Update the board and display "X" or "O"
    board[row][col] = currentPlayer; 
    event.target.textContent = currentPlayer;

    // check if the player wins
    if (checkWin(row, col)) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        setTimeout(resetGame, 200);
        return;
    }   

    // switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

/* 
Check for a winner
*/

function checkWin(row, col) {
    // convert row and col (strings) from dataset to numbers for calculations
    row = parseInt(row);
    col = parseInt(col);

    // define the 4 possible winning directions (dx and dy)
    const directions = [
        [1, 0], [0, 1], [1, 1], [1, -1] // Vertical, Horizontal, Diagonal (\), Diagonal (/)
    ];

    for (let [dx, dy] of directions) { // check each direction
        let count = 1;

        // check forward in the current direction
        for (let i = 1; i < 5; i++) {
            let newRow = row + i * dx;
            let newCol = col + i * dy;
            if (board[newRow]?.[newCol] === currentPlayer) count++;
            else break;
        }

        // check backward in the same direction
        for (let i = 1; i < 5; i++) {
            let newRow = row - i * dx;
            let newCol = col - i * dy;
            if (board[newRow]?.[newCol] === currentPlayer) count++;
            else break;
        }

        if (count >= 5) return true; // Win condition met
    }

    return false;
}


/* 
Reset the game
*/
function resetGame() {
    board = Array.from({ length: SIZE}, () => Array(SIZE).fill(null));
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
}
