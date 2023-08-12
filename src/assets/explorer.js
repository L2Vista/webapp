const NUM_OF_LOGS = 10; // per page
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

export { NUM_OF_LOGS, getLogArray, getExplorerUrl };