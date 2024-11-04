import React, { useState } from 'react';

interface ToggleButtonProps {
  onToggle: (isOn: boolean) => void;
  initialState?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ onToggle, initialState = false }) => {
  const [isOn, setIsOn] = useState(initialState);

  const handleToggle = () => {
    const newState = !isOn;
    setIsOn(newState);
    onToggle(newState);
  };

  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
};

export default ToggleButton;