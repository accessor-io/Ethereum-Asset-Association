import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { resolveENS, isENSNameAvailable } from '../utils/ens';

function ENSSearch({ chainId }) {
  const [searchName, setSearchName] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleSearch = async () => {
    try {
      const resolved = await resolveENS(searchName, chainId);
      const available = await isENSNameAvailable(searchName, chainId);
      setSearchResult({ resolved, available });
    } catch (error) {
      console.error('Error searching ENS name:', error);
      setSearchResult({ error: 'Error searching ENS name' });
    }
  };

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>Search ENS Name</Typography>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter ENS name to search"
            variant="outlined"
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleSearch}>Search</Button>
        </Box>
        {searchResult && (
          <Box mt={2}>
            <Typography>Resolved Address: {searchResult.resolved || 'Not resolved'}</Typography>
            <Typography>Available: {searchResult.available ? 'Yes' : 'No'}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default ENSSearch;