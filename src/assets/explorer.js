const NUM_OF_LOGS = 10; // per page
const CHAINS = [
    { name: 'Base', id: '84531' },
    { name: 'Mode', id: '919' },
    { name: 'Optimism', id: '420' },
    { name: 'Zora', id: '999' },
];
const PROTOCOLS = [
    { name: 'ccip', id: 'ccip' },
    { name: 'hyperlane', id: 'hyperlane' },
];

let logArray = [];

function getLogArray() {
    return logArray;
}

function getExplorerUrl(chainid) {
    switch (chainid) {
        // mode
        case '919':
            return "https://sepolia.explorer.mode.network/tx/";

        // zora
        case '999':
            return "https://testnet.explorer.zora.energy/tx/";

        // optimism
        case '420':
            return "https://goerli-optimism.etherscan.io/tx/";

        // base
        case '84531':
            return "https://base-goerli.blockscout.com/tx/";
    }

    return "";
}

export { NUM_OF_LOGS, CHAINS, PROTOCOLS, getLogArray, getExplorerUrl };