import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { setTextRecord, getProfile } from '../utils/ens';

function TextRecordSetter({ ensName, chainId, onProfileUpdate }) {
  const [newTextRecord, setNewTextRecord] = useState({ key: '', value: '' });

  const handleSetTextRecord = async () => {
    if (!ensName) {
      alert('You need an ENS name to set a text record');
      return;
    }
    try {
      await setTextRecord(ensName, newTextRecord.key, newTextRecord.value, chainId);
      alert('Text record set successfully');
      const updatedProfile = await getProfile(ensName, chainId);
      onProfileUpdate(updatedProfile);
    } catch (error) {
      console.error('Error setting text record:', error);
      alert('Error setting text record');
    }
  };

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Set Text Record</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            value={newTextRecord.key}
            onChange={(e) => setNewTextRecord({ ...newTextRecord, key: e.target.value })}
            placeholder="Record key"
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <TextField
            value={newTextRecord.value}
            onChange={(e) => setNewTextRecord({ ...newTextRecord, value: e.target.value })}
            placeholder="Record value"
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleSetTextRecord}>Set Record</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default TextRecordSetter;