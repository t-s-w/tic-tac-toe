/*----- constants -----*/
// Number the cells from left-right, top-bottom as 0 to 8.
// hard code the winning lines to make checking for win conditions easier
const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
const gameBoard = document.querySelector('#gameBoard');

/*----- state variables -----*/
let gameState = {
    board: [[, , ,], [, , ,], [, , ,]],
    currentTurn: 0
}

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/

function render() {
    renderBoard();
}

function renderBoard() {
    let board = document.createElement('table');
    board.classList.add('gameBoard');
    for (let rowNo of [0, 1, 2]) {
        let row = document.createElement('tr');
        row.id = 'row' + rowNo;
        row.classList.add('row');
        for (let colNo of [0, 1, 2]) {
            let cellNo = rowNo * 3 + colNo;
            let cell = document.createElement('td');
            cell.id = 'cell' + cellNo;
            cell.classList.add('cell');
            cell.innerHTML = 'cell';
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    gameBoard.innerHTML = '';
    gameBoard.appendChild(board);
}

function takeTurn(cellNo) {
    console.log('tried to select cell ' + cellNo);
}