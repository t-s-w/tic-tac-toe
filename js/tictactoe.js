/*----- constants -----*/
// Number the cells from left-right, top-bottom as 0 to 8.
// hard code the winning lines to make checking for win conditions easier
const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const screens = ['startUI', 'boardUI'];
const gameBoard = document.querySelector('#gameBoard');
const cat = String.fromCodePoint(0x1F431);
const dog = String.fromCodePoint(0x1F436);
const statusMsgs = {
    turn0: dog + "'s Turn!",
    turn1: cat + "'s Turn!",
    cputurn1: cat + " is thinking...",
    win0: dog + " wins!",
    win1: cat + " wins!",
    win2: dog + " It's a tie! " + cat
}
const gameStatusUI = document.querySelector('#gameStatus');
class Game {
    constructor(aiMode = 0) {
        this.board = [];
        this.currentTurn = 0;
        this.winningCells = [];
        this.aiMode = aiMode;
    }
}

class cellEnumerate {
    constructor(line) {
        this[0] = [];
        this[1] = [];
        this[undefined] = [];
        for (let cell of line) {
            this[gameState.board[cell]].push(cell);
        }
    }
}

const aiTurnDelay = 2000;

/*----- state variables -----*/
let gameState = new Game();

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
//rendering UIs
function render() {
    renderBoard();
    renderGameStatus();
    renderResetButton();
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
            let cellState = gameState.board[cellNo];
            let cell = document.createElement('td');
            cell.id = 'cell' + cellNo;
            cell.classList.add('cell');
            let content = '';
            // define content of the cell
            if (cellState === 0) {
                content = dog;
            } else if (cellState === 1) {
                content = cat;
            }
            // if game has been won, add / remove appropriate styling for the cell
            if (gameState.winner !== undefined) {
                if (!gameState.winningCells.includes(cellNo)) {
                    cell.classList.add('nonWinning');
                }
            } else if (cellState === undefined) {
                // else if not won yet, add clickability to the cell if it's still empty
                cell.classList.add('clickable');
                cell.addEventListener('click', function () { takeTurn(cellNo) });
            }
            cell.innerHTML = content;

            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    gameBoard.innerHTML = '';
    gameBoard.appendChild(board);
}

function renderGameStatus() {
    let msg = '';
    if (gameState.winner !== undefined) {
        msg = statusMsgs['win' + gameState.winner];
    } else if (gameState.currentTurn === 0) {
        msg = statusMsgs['turn0'];
    } else if (gameState.aiMode === 1) {
        msg = statusMsgs.cputurn1;
    } else {
        msg = statusMsgs.turn1;
    }
    gameStatusUI.innerHTML = msg;
}

function renderResetButton() {
    if (gameState.winner !== undefined) {
        document.querySelector('#resetButton').classList.remove('hidden');
    } else {
        document.querySelector('#resetButton').classList.add('hidden');
    }
}

// game flow control

function startGame(aiMode) {
    gameState = new Game(aiMode);
    changeScreen('boardUI');
    render();
}

function takeTurn(cellNo) {
    gameState.board[cellNo] = gameState.currentTurn;
    for (let line of winningLines) {
        if (line.includes(cellNo)) {
            if (line.every(function (cell) { return gameState.board[cell] === gameState.currentTurn })) {
                gameState.winner = gameState.currentTurn;
                line.forEach(function (cell) { gameState.winningCells.push(cell); });
            }
        }
    }
    if (gameState.winner === undefined) {
        gameState.currentTurn = 1 - gameState.currentTurn;
        // check for tie
        if ([0, 1, 2, 3, 4, 5, 6, 7, 8].every(function (cell) { return gameState.board[cell] !== undefined })) {
            gameState.winner = 2;
        }
    }
    render();
    if (gameState.aiMode === 1 && gameState.currentTurn === 1 && (gameState.winner === undefined)) {
        decision = decide(gameState.board);
        setTimeout(function () { takeTurn(decision) }, aiTurnDelay);
    }
}

function returnMain() {
    changeScreen('startUI');
    gameState = new Game();
}

// UI control

function changeScreen(screen) {
    for (let screen of screens) {
        document.querySelector('#' + screen).classList.add('hidden');
    }
    document.querySelector('#' + screen).classList.remove('hidden');
}

// CPU decision mechanics 

function decide(board) {
    // 1st turn handling
    if (board[4] === undefined) {
        return 4;
    }
    if (board[4] === 0 && board[0] === undefined) {
        return 0;
    }
    // 2nd turn onwards handling
    // if winning potential exists then win
    for (let winningLine of winningLines) {
        let counter = new cellEnumerate(winningLine);
        if (counter[1].length === 2 && counter[undefined].length === 1) {
            return counter[undefined][0];
        }
    }
    // if player about to win then block
    for (let winningLine of winningLines) {
        let counter = new cellEnumerate(winningLine);
        if (counter[0].length === 2 && counter[undefined].length === 1) {
            return counter[undefined][0];
        }
    }

}