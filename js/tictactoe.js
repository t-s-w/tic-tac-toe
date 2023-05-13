/*----- constants -----*/
// Number the cells from left-right, top-bottom as 0 to 8.
// hard code the winning lines to make checking for win conditions easier
const winningLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

/*----- state variables -----*/
let gameState = {
    board: [[, , ,], [, , ,], [, , ,]],
    currentTurn: 0
}

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/