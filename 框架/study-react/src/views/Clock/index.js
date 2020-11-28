import React, { useState, useEffect, useContext, useReducer }from 'react';


const reducer = function(state, action) {
  switch (action.type) {
    case 'add':
      return { count: state.count + 1};
    case 'subtract':
      return { count: state.count - 1};
    default:
      throw new Error();
  }
}
function Example() {
  const [state, dispatch] = useReducer(reducer, {count: 0});
  return (
    <>
      <div>{state.count}</div>
      <button onClick={() => dispatch({type: 'add'})}>Add</button>
      <button onClick={() => dispatch({type: 'subtract'})}>Subtract</button>
    </>
  )
};
export default Example;