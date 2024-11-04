const { ethers } = require('ethers');
const RegistryABI = require('./src/Registry.json');
const ResolverABI = require('./src/Resolver.json');

async function main() {
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();

    const registryAddress = 'REGISTRY_CONTRACT_ADDRESS'; // Replace with your registry contract address
    const registryContract = new ethers.Contract(registryAddress, RegistryABI, signer);

    const resolverAddress = ethers.Wallet.createRandom().address; // Create a random resolver address for testing

    // Register resolver in registry
    console.log('Registering resolver...');
    const registerTx = await registryContract.register(ethers.utils.id('testHash'), resolverAddress);
    await registerTx.wait();
    console.log('Resolver registered.');

    // Instantiate resolver contract
    const resolverContract = new ethers.Contract(resolverAddress, ResolverABI, signer);

    // Add address to resolver
    console.log('Adding address...');
    const addAddressTx = await resolverContract.addAddress(ethers.utils.id('testHash'), signer.getAddress(), 'Test Detail');
    await addAddressTx.wait();
    console.log('Address added.');

    // Retrieve address details
    console.log('Fetching address details...');
    const details = await resolverContract.getAddressDetails(ethers.utils.id('testHash'), signer.getAddress());
    console.log('Address details: ', details);
}

main().catch(console.error);
