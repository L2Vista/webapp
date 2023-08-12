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

export { NUM_OF_LOGS, CHAINS, PROTOCOLS, getLogArray, getExplorerUrl, getDateTime };