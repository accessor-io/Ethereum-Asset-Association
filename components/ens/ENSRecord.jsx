import React from 'react';

export const ENSRecord = ({ records, onUpdate, isEditable, isLoading }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">ENS Records</h3>
      <div className="space-y-4">
        {records ? (
          Object.entries(records).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
            </div>
          ))
        ) : (
          <p>No records found</p>
        )}
      </div>
    </div>
  );
}; 