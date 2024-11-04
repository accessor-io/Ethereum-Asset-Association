import React, { useState, useEffect } from 'react';
import { Box, Checkbox, VStack, Heading } from '@chakra-ui/react';
import { readdir } from 'fs/promises';
import path from 'path';

function FileManager({ selectedFiles, setSelectedFiles }) {
  const [availableFiles, setAvailableFiles] = useState([]);

  useEffect(() => {
    const loadFiles = async () => {
      const contractsPath = '/home/dot/ECL - Ethereum Cross Link - v.1.0/contracts';
      const scriptsPath = '/home/dot/ECL - Ethereum Cross Link - v.1.0/contract-deployment-scripts';
      
      const contractFiles = await readdir(contractsPath);
      const scriptFiles = await readdir(scriptsPath);
      
      setAvailableFiles([...contractFiles, ...scriptFiles]);
    };
    
    loadFiles();
  }, []);

  const handleFileSelection = (file) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter(f => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  return (
    <Box>
      <Heading as="h2" size="lg">File Manager</Heading>
      <VStack align="start">
        {availableFiles.map(file => (
          <Checkbox 
            key={file} 
            isChecked={selectedFiles.includes(file)}
            onChange={() => handleFileSelection(file)}
          >
            {file}
          </Checkbox>
        ))}
      </VStack>
    </Box>
  );
}

export default FileManager;
