// ## How to build
// npm install truffle-hdwallet-provider
// truffle migrate --network ropsten

var mnemonic = "<mnemonic>"
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
