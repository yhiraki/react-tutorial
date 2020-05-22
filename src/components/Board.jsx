import React from 'react';
import Square from './Square.jsx';


class Board extends React.Component {
  renderSquare(i, options = {}) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        bold={this.props.lastPutAt === i}
        highlihgted={options.highlihgted}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  generateBoard(cols, rows) {
    const c = Array(cols).fill(null);
    const r = Array(rows).fill(null);
    return (
      c.map((_, i) =>
        <div className="board-row" key={i}> {
          r.map((_, j) => {
            const idx = i * 3 + j;
            return this.renderSquare(idx, {
              highlihgted: this.props.wonLine.includes(idx)
            })
          })
        } </div>
      )
    );
  }

  render() {
    return this.generateBoard(3, 3);
  }
}

export default Board;
