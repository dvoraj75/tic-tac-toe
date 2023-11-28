export default function GameBoard({switchActivePlayer, board}) {
    return (
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((col, colIndex) =>
                        <li key={colIndex}>
                            <button onClick={() => switchActivePlayer(rowIndex, colIndex)} disabled={col!==null }>{col}</button>
                        </li>)}
                </ol>
            </li>)}
        </ol>
    );
}