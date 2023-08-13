const NUM_OF_LOGS = 10; // per page
const NUM_OF_PAGE = 10;
const CHAINS = [
    { name: 'Base', id: '84531' },
    { name: 'Mode', id: '919' },
    { name: 'Optimism', id: '420' },
    { name: 'Zora', id: '999' },
    { name: 'Sepolia', id: '11155111' }
];
const PROTOCOLS = [
    { name: 'CCIP', id: 'ccip' },
    { name: 'Hyperlane', id: 'hyperlane' },
];

let logArray = [];

function getLogArray() {
    return logArray;
}

function getChainID(name) {
    for (let i = 0; i < CHAINS.length; i++) {
        let chain = CHAINS[i];
        if (name.toLowerCase() === chain.name.toLowerCase()) {
            console.log("chainid", chain.id)
            return chain.id;
        }
    }
    return "null";
}

function getProtocolName(id) {
    for (let i = 0; i < PROTOCOLS.length; i++) {
        let protocol = PROTOCOLS[i];
        if (id === protocol.id) {
            return protocol.name;
        }
    }
    return "null";
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

function getDateTime(t) {
    var date = new Date(t * 1000);
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}

export { NUM_OF_LOGS, NUM_OF_PAGE, CHAINS, PROTOCOLS, getLogArray, getExplorerUrl, getDateTime, getChainID, getProtocolName };