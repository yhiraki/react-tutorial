import React from 'react';

export type Mark = 'X' | 'O';
type SquareValue = (Mark | null);
export type Squares = SquareValue[];

type Props = {
  key: number,
  value: SquareValue,
  bold: boolean,
  highlihgted?: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const Square: React.FC<Props> = ({ key, value, bold, highlihgted, onClick }) => {
  const markClass = highlihgted ? 'highlighted' : '';
  const mark = bold
    ? <b>{value}</b>
    : <span>{value}</span>;

  return (
    <button className='square' onClick={onClick}>
      <span className={markClass}>{mark}</span>
    </button>
  )
}

export default Square;
