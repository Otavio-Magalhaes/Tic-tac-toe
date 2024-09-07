
import { useState } from "react"
import GameBoard from "./components/Gameboard/GameBoard"
import Player from "./components/Player/Player"
import Log from "./components/Log/Log"
import { WINNING_COMBINATIONS } from "./winning-combination"
import GameOver from "./components/GameOver/GameOver"

const PLAYERS = {
  X: "Player 1",
  O: "Player 2"
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function driveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=> [...array])];
  for( const turn of gameTurns){
    //desestruturando turn, tirando os valores de objeto e colocando em  square e em player
    const {square, player} = turn
    //desestrutura square e abstrai os valores de linha e coluna
    const {row, col} = square
    //seta dentro da matriz gameboard os symbolos/ jogadas do player
    gameBoard[row][col] = player
  }
  return gameBoard
}

function driveWinner(gameBoard, players){
  let winner

  for(const combination of WINNING_COMBINATIONS){
    const fristSquareSymbol = gameBoard[combination[0].row][combination[0].column] 
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if(fristSquareSymbol && 
      secondSquareSymbol === fristSquareSymbol && 
      thirdSquareSymbol === fristSquareSymbol
    ){
      winner = players[fristSquareSymbol]
    }

  }
  return winner
}


function deriveActivePlayer(gameTurns){
  let currentPlayer = "X"

  if(gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "O"
  }
  return currentPlayer
}


  const [players, setPlayers] = useState(PLAYERS)
  const [gameTurns, setGameTurns] = useState([])
  const activePlayer = deriveActivePlayer(gameTurns)  
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, players)
  let draw = gameTurns.length == 9 && !winner


  function handleSelectSquare(rowIndex, colIndex){
  setGameTurns((prevTurns)=>{
    const currentPlayer = deriveActivePlayer(prevTurns)
    const updateTurns = [
      { square: {row: rowIndex, col: colIndex }, player: activePlayer },
      ...prevTurns]
      
    return updateTurns
  })
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers =>{
      return{
        ...prevPlayers,
        [symbol]: newName
        
      }
    })
  }

  return (
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player" >
            <Player 
              initialName={PLAYERS.X} 
              symbol="X" 
              isActive={activePlayer === "X"} 
              onChangeName = {handlePlayerNameChange}
            />

            
            <Player 
            initialName={PLAYERS.O}
            symbol="O" 
            isActive={activePlayer === "O"}
            onChangeName = {handlePlayerNameChange}            
            />
          </ol>
          {(winner || draw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard 
          onSelectSquare={handleSelectSquare} 
          board = {gameBoard}
        />
        </div>
        <Log turn={gameTurns}/>
      </main>
  )
}

export default App
