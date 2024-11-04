import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { registerENS } from '../utils/ens';

function ENSRegistration({ chainId }) {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(1);

  const handleRegister = async () => {
    try {
      await registerENS(name, duration, chainId);
      alert(`Successfully registered ${name}.eth for ${duration} year(s)`);
    } catch (error) {
      console.error('Error registering ENS name:', error);
      alert('Error registering ENS name');
    }
  };

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Register ENS Name</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name to register"
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <TextField
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            placeholder="Duration (years)"
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleRegister}>Register</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ENSRegistration;