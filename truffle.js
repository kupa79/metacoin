// This script requires web3@0.18.4!!!
// ## How to build
// npm uninstall web3
// npm install web3@0.18.4 ethereumjs-wallet bip39 web3-provider-engine@8.6.1 zeppelin-solidity --save-dev
// truffle migrate --network ropsten
// npm uninstall web3
// npm install web3

var mnemonic = "dismiss involve pelican need grocery elegant buzz toddler wolf fruit betray series"
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    "ropsten": {
      network_id: 3,    // Official ropsten network id
      provider: new HDWalletProvider(mnemonic, "https://testnet.infura.io"), 
      gas: 4002388
    }
  },
  rpc: {
    // Use the default host and port when not using ropsten
    host: "localhost",
    port: 8545
  }
}
/*
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    testnet: {
      host: "localhost",
      port: 8545,
      network_id: "3", // Match any network id
      gas: 4002388
      // geth --testnet --rpc
    }
  }
}*/
