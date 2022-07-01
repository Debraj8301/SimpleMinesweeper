function createBoard (rows, cols, bombs) {
    if(bombs > rows*cols){
        bombs = rows*cols;
    }
    let board = [];
    let mineLocation = [];
    for(let i=0;i<rows;i++){
        let subRow = [];
        for(let j=0;j<cols;j++){
            subRow.push({
                value: 0,
                isRevealed: false,
                x: i,
                y: j,
                isFlagged: false
            });
        }
        board.push(subRow);
    }
    let bombsCount = 0;
    while(bombsCount < bombs){
        let r = Math.floor(Math.random()*rows);
        let c = Math.floor(Math.random()*cols);
        if(board[r][c].value === 0){
            board[r][c].value = "X";
            mineLocation.push([r, c]);
            bombsCount++;
        }
    }
    
    for(let r=0;r<rows;r++){
        for(let c=0;c<cols;c++){
            if(board[r][c].value === "X") continue;
            else {
                if(r > 0 && board[r-1][c].value === "X"){
                    board[r][c].value = board[r][c].value + 1;
                } 
                if(r < rows-1 && board[r+1][c].value === "X"){ 
                    board[r][c].value = board[r][c].value + 1;
                }
                if(c > 0 && board[r][c-1].value === "X") {
                    board[r][c].value = board[r][c].value + 1;
                }
                if(c < cols-1 && board[r][c+1].value === "X") {
                    board[r][c].value = board[r][c].value + 1;
                }
                if(c > 0 && r > 0 && board[r-1][c-1].value === "X") {
                    board[r][c].value = board[r][c].value + 1;
                }
                if(c > 0 && r < rows-1 && board[r+1][c-1].value === "X") {
                    board[r][c].value = board[r][c].value + 1;
                }
                if(c < cols-1 && r > 0 && board[r-1][c+1].value === "X") {
                    board[r][c].value = board[r][c].value + 1;
                }
                if(c < cols-1 && r < rows-1 && board[r+1][c+1].value === "X") {
                    board[r][c].value = board[r][c].value + 1;
                }
            }
        }
    }
    return {board, mineLocation};
}

export default createBoard;