const dx = [-1, 1, -1, 1, 0, 0, -1, 1];
const dy = [0, 0, -1, 1, -1, 1, 1, -1];
function isInside(x, y, board){
    if(x < 0 || y < 0 || x >= board.length || y >= board[0].length) return false;
    return true;
}
function revealCell (board, x, y){
    if(!isInside(x, y, board) || board[x][y].isRevealed) return board;
    if(board[x][y].value === "X"){
        return board
    }
    else if(board[x][y].value !== 0){
        board[x][y].isRevealed = true;
        return board;
    }
    board[x][y].isRevealed = true;
    for(let i=0;i<8;i++){
        board = revealCell(board, x + dx[i], y+dy[i]);
    }
    
    return board;
}

export default revealCell;