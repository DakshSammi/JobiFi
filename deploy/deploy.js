const { TonClient, abiContract, contract } = require("@tonclient/core");
const { libNode } = require("@tonclient/lib-node");

// Initialize TON Client
TonClient.useBinaryLibrary(libNode);
const client = new TonClient({ network: { endpoints: ["net.ton.dev"] } });

const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Replace with your contract address
const abi = require("../contracts/MyToken.abi.json");

async function deploy() {
    try {
        // Deploy the contract
        const result = await client.abi.encode_message({
            abi: abiContract(abi),
            deploy_set: {
                tvc: "YOUR_CONTRACT_TVC", // Add your compiled TVC
                initial_data: {}
            },
            call_set: {
                function_name: "constructor",
                input: {}
            },
            signer: {
                type: "Keys",
                keys: {
                    // Add your key pair for deployment
                }
            }
        });

        console.log("Contract deployed at:", result.address);
    } catch (error) {
        console.error("Deployment error:", error);
    }
}

deploy();
