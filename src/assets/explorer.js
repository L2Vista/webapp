const NUM_OF_LOGS = 10; // per page
const NUM_OF_PAGE = 10;
const CHAINS = [
    { name: 'Base', id: '84531' },
    { name: 'Mode', id: '919' },
    { name: 'Optimism', id: '420' },
    { name: 'Zora', id: '999' },
    { name: 'Sepolia', id: '11155111' },
    { name: 'BNB', id: '97' },
    { name: 'Avalanche', id: '43113' },
    { name: 'Moonbase', id: '1287' },
    { name: 'Goerli', id: '5' },
    { name: 'Celo', id: '44787' },
    { name: 'Arbitrum', id: '421613' },
    { name: 'Mumbai', id: '80001' },
];
const PROTOCOLS = [
    { name: 'CCIP', id: 'ccip' },
    { name: 'Hyperlane', id: 'hyperlane' },
];
const STATES = [
    { name: 'All', id: '0' },
    { name: 'Success', id: '1' },
    { name: 'Pending', id: '2' },
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

        // sepolia
        case '11155111':
            return "https://sepolia.etherscan.io/tx/";

        // bnb
        case '97':
            return "https://testnet.bscscan.com/tx/";

        // avalanche
        case '43113':
            return "https://testnet.snowtrace.io/tx/";

        // moonbase
        case '1287':
            return "https://moonbase.moonscan.io/tx/";

        // Goerli
        case '5':
            return "https://goerli.etherscan.io/tx/";

        // Celo
        case '44787':
            return "https://alfajores.celoscan.io/tx/";

        // Arbitrum
        case '421613':
            return "https://testnet.arbiscan.io/tx/";

        // Mumbai
        case '80001':
            return "https://mumbai.polygonscan.com/tx/";
    }

    return "";
}

function getDateTimeStr(date) {
    var year = date.getFullYear();
    var month = "0" + (date.getMonth() + 1);
    var day = "0" + date.getDate();
    var hour = "0" + date.getHours();
    var minute = "0" + date.getMinutes();
    var second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}

function getDateTime(t) {
    var date = new Date(t * 1000);
    return getDateTimeStr(date)
}

function getCurrentDateTime() {
    var currentdate = new Date();
    return getDateTimeStr(currentdate);
}

function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}

export { NUM_OF_LOGS, NUM_OF_PAGE, CHAINS, PROTOCOLS, STATES, getLogArray, getExplorerUrl, getDateTime, getChainID, getProtocolName, getCurrentDateTime, sleep };