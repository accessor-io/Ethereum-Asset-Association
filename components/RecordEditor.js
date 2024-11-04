import { useState } from 'react';

export const RecordEditor = ({ onSave }) => {
  const [record, setRecord] = useState('');

  return (
    <div>
      <input
        type="text"
        value={record}
        onChange={(e) => setRecord(e.target.value)}
      />
      <button onClick={() => onSave(record)}>Save Record</button>
    </div>
  );
}; 