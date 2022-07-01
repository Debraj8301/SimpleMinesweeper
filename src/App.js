import {useEffect, useState} from 'react'
import { useStopwatch } from 'react-timer-hook';  
import createBoard from './util/createBoard'
import revealCell from './util/revealCell';
import Cell from './components/Cell'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fasolid, faflag, faclock, fabomb} from '@fortawesome/fontawesome-free-solid'

import './App.css';

function App() {
  const [grid, setGrid] = useState(JSON.parse(localStorage.getItem("MyMinesweeper")) || []);
  const [flagCount, setFlagCount] = useState(JSON.parse(localStorage.getItem("FlagCount")) || 0);
  const [gameFinish, setGameFinish] = useState(false);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false, stopwatchOffset: new Date() });
  const stopwatchOffset = new Date();
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);
  function getDeepCopy(arr){
    return JSON.parse(JSON.stringify(arr));
  }
  function freshBoard() {
    let newBoard = createBoard(10, 10, 15).board;
    console.log(newBoard);
    localStorage.setItem("MyMinesweeper", JSON.stringify(newBoard));
    setGrid(JSON.parse(localStorage.getItem("MyMinesweeper")));
    // startTimer();
    reset();
    setFlagCount(0);
    setGameFinish(false);
    // restartTimer();
  }
  
  useEffect(() => {
    let item = localStorage.getItem("MyMinesweeper");
    let item2 = localStorage.getItem("FlagCount");
    if(!item2) setFlagCount(0);
    if(!item) freshBoard();
    setGrid(JSON.parse(localStorage.getItem("MyMinesweeper")));
  }, []);                                                                           
  function updateFlag(e, x, y) {
      e.preventDefault();
      let newBoard = getDeepCopy(grid);
      newBoard[x][y].isFlagged = !newBoard[x][y].isFlagged;
      let cnt;
      if(newBoard[x][y].isFlagged) cnt = flagCount + 1;
      else cnt = flagCount - 1;
      localStorage.setItem("FlagCount", JSON.stringify(cnt));
      setFlagCount(JSON.parse(localStorage.getItem("FlagCount")));
      localStorage.setItem("MyMinesweeper", JSON.stringify(newBoard));
      setGrid(JSON.parse(localStorage.getItem("MyMinesweeper")));
  }
  function gameOver(board) {
    for(let i=0;i<board.length;i++){
      for(let j=0;j<board[0].length;j++){
          board[i][j].isRevealed = true;
          if(board[i][j].value !== "X") board[i][j] = 0;
      }
  }
    pause();
    return board;
  }
  function isGameOver(board){
    for(let i=0;i<board.length;i++){
      for(let j=0;j<board[0].length;j++){
        if(board[i][j].value !== "X" && board[i][j].isRevealed === false) return false;
      }
    }
    pause();
    return true;
  }
  function triggerPress(x, y){
    let newBoard = getDeepCopy(grid), nBoard;
    if(newBoard[x][y].value === "X"){
      nBoard = gameOver(newBoard);
      alert("AHHH!! You stepped on a bomb... Try again");
    } else if(!newBoard[x][y].isRevealed){
      nBoard = revealCell(newBoard, x, y);
      if(isGameOver(nBoard)){
        setGameFinish(true);
      } 
    }
    localStorage.setItem("MyMinesweeper", JSON.stringify(nBoard));
    setGrid(JSON.parse(localStorage.getItem("MyMinesweeper")));
  }
  return (
    <div className="App">
      <header className="App-header">
        <h3>{gameFinish ? "Congratulations!! You Won" : "Simple Minesweeper"}</h3> 
        <div className="stats">{flagCount}<FontAwesomeIcon icon="fa-solid fa-flag" className="flag-stat"/>
        <FontAwesomeIcon icon="fa-solid fa-clock" className="timer-stat"/>{minutes < 10 ? "0"+ minutes : minutes}:{seconds < 10 ? "0"+ seconds : seconds}
        <FontAwesomeIcon icon="fa-solid fa-bomb" className="bomb-stat"/> 15
        </div>
        <table>
          <tbody>
            {
              grid.map((singleRow, rIndex) => {
                return <tr key={rIndex}>
                  {singleRow.map((singleBlock, cIndex) => {
                    return <td key={rIndex+cIndex}>
                      <Cell triggerPress={triggerPress} details={singleBlock} updateFlag={updateFlag}/>
                    </td>
                  })}
                </tr>  
              })
            }
          </tbody>
        </table>
        <div className="buttonContainer">
            <button className="newGameButton" onClick={freshBoard}>Create New Game</button>
        </div>
      </header>
    </div>
  );
}

export default App;
