import React from 'react';
import { SquareValue, Squares } from './Square';
import Board from './Board';


type GameEndStatus = {
  gameIsEnd: boolean,
  winner: SquareValue,
  line: [number, number, number] | []
}

const calculateWinner = (squares: Squares): GameEndStatus => {
  const lines = [
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
      return {
        gameIsEnd: true,
        winner: squares[a],
        line: [a, b, c]
      };
    }
  }

  const gameIsEnd = squares.every(v => v != null);

  return {
    gameIsEnd: gameIsEnd,
    winner: null,
    line: []
  };
}

const idx2xy = (i: number): [number, number] => {
  return [i % 3, Math.floor(i / 3)];
}


type Props = {}

type History = {
  squares: Squares,
  lastPutAt: number
}

type State = {
  history: History[],
  stepNumber: number,
  xIsNext: boolean,
  historyOrderByAsc: boolean
}


class Game extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        lastPutAt: -1
      }],
      stepNumber: 0,
      xIsNext: true,
      historyOrderByAsc: true
    }
  }

  handleClick(i: number) {
    const history: History[] = this.state.history.slice(0, this.state.stepNumber + 1);
    const current: History = history[history.length - 1];
    const squares: Squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
        lastPutAt: i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  historyOrderToggle() {
    this.setState({
      historyOrderByAsc: !this.state.historyOrderByAsc
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const { gameIsEnd, winner, line } = calculateWinner(current.squares);

    const moves =
      history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        const p = idx2xy(step.lastPutAt);

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
            {p[0] >= 0 && `(${p[0]}, ${p[1]})`}
          </li>
        )
      })
    if (!this.state.historyOrderByAsc) {
      moves.reverse();
    }

    const status: string = (() => {
      if (winner) return 'Winner: ' + winner;
      if (gameIsEnd) return 'Draw';
      return 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    })();

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            lastPutAt={current.lastPutAt}
            wonLine={line}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button onClick={() => { this.historyOrderToggle() }}>order toggle</button>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
