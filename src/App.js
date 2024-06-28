import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import RegistryABI from "./Registry.json"; // Ensure this file exists and is correctly formatted
import ResolverABI from "./Resolver.json"; // Ensure this file exists and is correctly formatted
import "./styles.css";
import Loader from "./components/Loader";

function App() {
    const [addresses, setAddresses] = useState([]);
    const [uid, setUid] = useState("");
    const [hash, setHash] = useState("");
    const [resolverAddress, setResolverAddress] = useState("");
    const [registryContract, setRegistryContract] = useState(null);
    const [resolverContract, setResolverContract] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        async function init() {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();

                const registryAddress = "YOUR_REGISTRY_CONTRACT_ADDRESS"; // Replace with deployed registry contract address
                const registry = new ethers.Contract(registryAddress, RegistryABI, signer);
                setRegistryContract(registry);
            } catch (err) {
                setError("Failed to connect to wallet");
                console.error(err);
            }
        }
        init();
    }, []);

    const addAddressField = () => {
        setAddresses([...addresses, { address: "", detail: "" }]);
    };

    const handleAddressChange = (index, field, value) => {
        const newAddresses = addresses.map((item, i) => (
            i === index ? { ...item, [field]: value } : item
        ));
        setAddresses(newAddresses);
    };

    const generateUID = () => {
        const hash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode(["address[]"], [addresses.map(a => a.address)]));
        setUid(hash);
    };

    const fetchResolver = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            if (!registryContract) throw new Error("Registry contract is not set");
            const resolver = await registryContract.getResolver(hash);
            setResolverAddress(resolver);
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const resolverContract = new ethers.Contract(resolver, ResolverABI, signer);
            setResolverContract(resolverContract);
            setSuccess("Resolver fetched successfully");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addAddress = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            if (!resolverContract) throw new Error("Resolver contract is not set");
            for (const { address, detail } of addresses) {
                const tx = await resolverContract.addAddress(hash, address, detail);
                await tx.wait();
            }
            setSuccess("Addresses added successfully");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-2">
            <header className="bg-gray-800 text-white w-full py-4 text-center mb-4">
                <h1 className="text-4xl font-bold">ENS Management and Attestation Group Interface</h1>
                <p className="text-lg mt-2">Manage your Ethereum Name Service (ENS) domains easily and handle address attestations</p>
            </header>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={addAddressField}
                >
                    Add Address
                </button>
                {addresses.map((item, index) => (
                    <div key={index} className="address-input mb-4">
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="Enter address"
                            value={item.address}
                            onChange={(e) => handleAddressChange(index, "address", e.target.value)}
                        />
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
                            type="text"
                            placeholder="Enter detail"
                            value={item.detail}
                            onChange={(e) => handleAddressChange(index, "detail", e.target.value)}
                        />
                    </div>
                ))}
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                    onClick={generateUID}
                >
                    Generate UID
                </button>
                <p className="text-lg mb-4">UID: {uid}</p>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
                    type="text"
                    placeholder="Enter hash"
                    value={hash}
                    onChange={(e) => setHash(e.target.value)}
                />
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mb-2"
                    onClick={fetchResolver}
                    disabled={loading}
                >
                    Fetch Resolver
                </button>
                <button
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                    onClick={addAddress}
                    disabled={loading}
                >
                    Add Address
                </button>
                <p className="text-lg mt-4">Resolver Address: {resolverAddress}</p>
                {loading && <Loader />}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {success && <p className="text-green-500 mt-4">{success}</p>}
            </div>
        </div>
    );
}

export default App;

