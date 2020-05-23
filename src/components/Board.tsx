import React, { ReactElement } from 'react';
import Square, { Squares } from './Square';

export type Line = [number, number, number];

type Props = {
  squares: Squares,
  lastPutAt: number,
  onClick: (i: number) => void,
  wonLine?: Line
}

type RenderOptions = {
  highlihgted?: boolean
}

const Board: React.FC<Props> = ({ squares, lastPutAt, onClick, wonLine }) => {
  const renderSquare = (i: number, options: RenderOptions = {}): ReactElement => {
    return (
      <Square
        key={i}
        value={squares[i]}
        bold={lastPutAt === i}
        highlihgted={options.highlihgted}
        onClick={() => onClick(i)}
      />
    );
  }

  const generateBoard = (cols: number, rows: number): ReactElement[] => {
    const c = Array(cols).fill(null);
    const r = Array(rows).fill(null);
    return (
      c.map((_, i) =>
        <div className="board-row" key={i}> {
          r.map((_, j) => {
            const idx = i * 3 + j;
            return renderSquare(idx, { highlihgted: wonLine && wonLine.includes(idx) })
          })
        } </div>
      )
    );
  }

  return (
    <>
      {generateBoard(3, 3)}
    </>
  );
}

export default Board;
