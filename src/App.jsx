import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import {useState} from "react";
import {WINNING_COMBINATIONS} from './winning-combinations.js';

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
}

function deriveActivePlayer(gameTurns) {
    let currentPlayer = 'X';
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O';
    }
    return currentPlayer;
}

function deriveWinner(gameBoard, players) {
    for(const combination of WINNING_COMBINATIONS) {
        const firstSymbol = gameBoard[combination[0].row][combination[0].col];
        const secondSymbol = gameBoard[combination[1].row][combination[1].col];
        const thirdSymbol = gameBoard[combination[2].row][combination[2].col];
        if ( firstSymbol && firstSymbol === secondSymbol && secondSymbol === thirdSymbol) {
            return players[firstSymbol];
        }
    }
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(row=> [...row])];
    for ( const turn of gameTurns ) {
        const { square, player } = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function App() {
    function switchActivePlayer(rowIndex, colIndex) {
        setGameTurns(prevTurns => {
            let currentPlayer = deriveActivePlayer(prevTurns);
            const updatedTurns = [{ square: {
                    row: rowIndex,
                    col: colIndex
                },
                player: currentPlayer } ,...prevTurns];
            return updatedTurns;
        })
    }

    function handleRematch() {
        setGameTurns([]);
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(PLAYERS);
    let activePlayer = deriveActivePlayer(gameTurns);
    let gameBoard = deriveGameBoard(gameTurns);
    let winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    return (
        <main>
            <div id="game-container">
                <ol id="players" className="highlight-player">
                    <Player
                        initialName="Player 1"
                        symbol="X"
                        isActive={activePlayer === 'X'}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName="Player 2"
                        symbol="O"
                        isActive={activePlayer === 'O'}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>
            {(winner || hasDraw) && <GameOver winner={winner} rematch={handleRematch}/>}
            <GameBoard switchActivePlayer={switchActivePlayer} board={gameBoard}/>
            </div>
            <Log turns={gameTurns}/>
        </main>
    )
}

export default App
