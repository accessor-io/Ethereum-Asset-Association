import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SUPPORTED_CHAINS, NETWORK_NAMES } from '../config';

function ChainSelector({ chainId, onChainChange }) {
  return (
    <FormControl fullWidth sx={{ marginBottom: 4 }}>
      <InputLabel>Select Chain</InputLabel>
      <Select
        value={chainId}
        label="Select Chain"
        onChange={(e) => onChainChange(Number(e.target.value))}
      >
        {SUPPORTED_CHAINS.map((id) => (
          <MenuItem key={id} value={id}>
            {NETWORK_NAMES[id]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default ChainSelector;