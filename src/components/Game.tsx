import React, { useState } from 'react';
import { Squares, Mark } from './Square';
import Board, { Line } from './Board';

type GameEndStatus = {
  gameIsEnd: boolean,
  winner?: Mark,
  wonLine?: Line
}

const calculateWinner = (squares: Squares): GameEndStatus => {
  const lines: Line[] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winner = squares[a];
      if (winner === null)
        throw new Error('winner must be non-null value');
      return {
        gameIsEnd: true,
        winner,
        wonLine: [a, b, c]
      };
    }
  }

  const gameIsEnd = squares.every(v => v != null);

  return {
    gameIsEnd: gameIsEnd,
  };
}

const idx2xy = (i: number): [number, number] => {
  return [i % 3, Math.floor(i / 3)];
}


type History = {
  squares: Squares,
  lastPutAt: number
}


const Game: React.FC<{}> = () => {
  const [history, setHistory] = useState<History[]>([{
    squares: Array(9).fill(null),
    lastPutAt: -1
  }]);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [historyOrderIsAsc, setHistoryOrder] = useState<boolean>(true);

  const handleClick = (i: number): void => {
    setHistory(history.slice(0, stepNumber + 1));
    const current: History = history[history.length - 1];
    const squares: Squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory(
      history.concat([{
        squares: squares,
        lastPutAt: i
      }])
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  }

  const jumpTo = (step: number): void => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  const toggleHistoryOrder = (): void => {
    setHistoryOrder(!historyOrderIsAsc);
  }

  const current = history[stepNumber];
  const { gameIsEnd, winner, wonLine } = calculateWinner(current.squares);

  const moves =
    history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      const p = idx2xy(step.lastPutAt);

      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{desc}</button>
          {p[0] >= 0 && `(${p[0]}, ${p[1]})`}
        </li>
      )
    })
  if (!historyOrderIsAsc) {
    moves.reverse();
  }

  const status: string = ((): string => {
    if (winner) return 'Winner: ' + winner;
    if (gameIsEnd) return 'Draw';
    return 'Next player: ' + (xIsNext ? 'X' : 'O');
  })();

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          lastPutAt={current.lastPutAt}
          wonLine={wonLine}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={toggleHistoryOrder}>order toggle</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
