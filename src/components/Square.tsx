import React from 'react';

type Mark = 'X' | 'O';
export type SquareValue = (Mark|null);
export type Squares = SquareValue[];

type Props = {
  key: number,
  value: SquareValue,
  bold: boolean,
  highlihgted?: boolean,
  onClick: ()=>void
}

const Square = (props:Props) => {
  const markClass = props.highlihgted ? 'highlighted' : '';
  const mark = props.bold
    ? <b>{props.value}</b>
    : <span>{props.value}</span>;

  return (
    <button className='square' onClick={props.onClick}>
      <span className={markClass}>{mark}</span>
    </button>
  )
}

export default Square;
