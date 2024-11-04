import React, { useState, useEffect, useCallback } from 'react';
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import { 
  Box, Typography, TextField, Button, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Snackbar, Alert, CircularProgress, Chip
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Add as AddIcon, Refresh as RefreshIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useWeb3React } from '@web3-react/core';
import { getSigner } from '@/utils/ethereum';
import { shortenAddress } from '@/utils/addressUtils';
import ActionButton from '@/components/common/ActionButton';

const EAS_CONTRACT_ADDRESS = process.env.REACT_APP_EAS_CONTRACT_ADDRESS;
const SCHEMA_UID = process.env.REACT_APP_SCHEMA_UID;

const AttestationManager = () => {
  const theme = useTheme();
  const { account, chainId } = useWeb3React();
  const [eas, setEas] = useState(null);
  const [attestations, setAttestations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newAttestation, setNewAttestation] = useState({ recipient: '', value: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    const initEAS = async () => {
      if (account && chainId) {
        try {
          const signer = await getSigner();
          const easInstance = new EAS(EAS_CONTRACT_ADDRESS);
          easInstance.connect(signer);
          setEas(easInstance);
        } catch (err) {
          console.error("Failed to initialize EAS:", err);
          setError("Failed to connect to Ethereum Attestation Service");
        }
      }
    };
    initEAS();
  }, [account, chainId]);

  const fetchAttestations = useCallback(async () => {
    if (!eas || !account) return;
    setLoading(true);
    try {
      const filter = await eas.getAttestationsBySchema({ schema: SCHEMA_UID, attester: account });
      const attestationsData = await Promise.all(filter.map(async (attestation) => {
        const onChainAttestation = await eas.getAttestation(attestation.id);
        return { ...attestation, ...onChainAttestation };
      }));
      setAttestations(attestationsData);
    } catch (err) {
      console.error("Error fetching attestations:", err);
      setError("Failed to fetch attestations");
    } finally {
      setLoading(false);
    }
  }, [eas, account]);

  useEffect(() => {
    fetchAttestations();
  }, [fetchAttestations]);

  const handleCreateAttestation = async () => {
    if (!eas) return;
    setLoading(true);
    try {
      const schemaEncoder = new SchemaEncoder("uint256 value");
      const encodedData = schemaEncoder.encodeData([
        { name: "value", type: "uint256", value: newAttestation.value }
      ]);

      const tx = await eas.attest({
        schema: SCHEMA_UID,
        data: {
          recipient: newAttestation.recipient,
          expirationTime: 0,
          revocable: true,
          data: encodedData,
        },
      });

      const newAttestationUID = await tx.wait();
      setSnackbar({ open: true, message: `Attestation created: ${newAttestationUID}`, severity: 'success' });
      setOpenDialog(false);
      fetchAttestations();
    } catch (err) {
      console.error("Error creating attestation:", err);
      setSnackbar({ open: true, message: "Failed to create attestation", severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeAttestation = async (uid) => {
    if (!eas) return;
    setLoading(true);
    try {
      const tx = await eas.revoke({
        schema: SCHEMA_UID,
        data: { uid },
      });
      await tx.wait();
      setSnackbar({ open: true, message: `Attestation revoked: ${uid}`, severity: 'success' });
      fetchAttestations();
    } catch (err) {
      console.error("Error revoking attestation:", err);
      setSnackbar({ open: true, message: "Failed to revoke attestation", severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return <Typography>Please connect your wallet to use this feature.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ p: 3, backgroundColor: theme.palette.background.paper }}>
      <Typography variant="h4" gutterBottom>Attestation Manager</Typography>
      
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
        <ActionButton
          onClick={() => setOpenDialog(true)}
          label="Create Attestation"
          startIcon={<AddIcon />}
        />
        <Button
          onClick={fetchAttestations}
          startIcon={<RefreshIcon />}
          disabled={loading}
        >
          Refresh
        </Button>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UID</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attestations.map((attestation, index) => (
              <TableRow key={index}>
                <TableCell>{attestation.uid}</TableCell>
                <TableCell>{attestation.recipient}</TableCell>
                <TableCell>{attestation.value}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleRevokeAttestation(attestation.uid)}
                    startIcon={<DeleteIcon />}
                  >
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AttestationManager;
 