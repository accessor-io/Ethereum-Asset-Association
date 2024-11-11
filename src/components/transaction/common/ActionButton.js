import React from 'react';

const ActionButton = ({ onClick, label }) => {
  return (
    <button onClick={onClick}>{label}</button>
  );
};

export default ActionButton;