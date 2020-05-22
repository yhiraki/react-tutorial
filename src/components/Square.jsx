import React from 'react';

const Square = (props) => {
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
