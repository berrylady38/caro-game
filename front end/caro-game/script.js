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
    // console.log(`${currentPlayer} clicked: ${row}, ${col}`);

    // Prevent overwriting a move
    if (board[row][col]!== null) return; 

    // Update the board and display "X" or "O"
    board[row][col] = currentPlayer; 
    event.target.textContent = currentPlayer;

    // Add color class
    event.target.classList.remove("blue", "red");
    event.target.classList.add(currentPlayer === "X" ? "blue" : "red");
    // console.log(`Current player: ${currentPlayer}`);

    // Check if the player wins
    if (checkWin(row, col)) {
        Swal.fire({
            title: `${currentPlayer} Wins!`,
            imageUrl: "https://i.pinimg.com/564x/09/af/e5/09afe5bde61c010b03d4ae8a9089b34d.jpg",
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonText: "OK",
            customClass: {
                confirmButton: "custom-confirm-button" // Add custom class
            }
        }).then(() => {
            resetGame(); 
        });
        return;
    }
     
    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Update the turn display
    const playerSpan = document.getElementById("player");
    playerSpan.textContent = currentPlayer;
    playerSpan.classList.remove("blue", "red"); // Remove old class
    playerSpan.classList.add(currentPlayer === "X" ? "blue" : "red"); // Add new class
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
