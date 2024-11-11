const express = require('express');
const bodyParser = require('body-parser');
const ethers = require('ethers');

const app = express();
app.use(bodyParser.json());

// Verification logic here

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Verification service running on port ${PORT}`);
});
