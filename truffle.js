// This script requires web3@0.18.4!!!
// ## How to build
// npm uninstall web3
// npm install web3@0.18.4 ethereumjs-wallet bip39 web3-provider-engine@8.6.1 zeppelin-solidity --save-dev
// truffle migrate --network ropsten
// npm uninstall web3
// npm install web3

var mnemonic = "<YOUR_MNEMONIC>"

var bip39 = require("bip39")
var hdkey = require('ethereumjs-wallet/hdkey')
var ProviderEngine = require("web3-provider-engine")
var WalletSubprovider = require('web3-provider-engine/subproviders/wallet.js')
var Web3Subprovider = require("web3-provider-engine/subproviders/web3.js")
var Web3 = require("web3")
const FilterSubprovider = require('web3-provider-engine/subproviders/filters.js')

// Get our mnemonic and create an hdwallet
var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeed(mnemonic))

// Get the first account using the standard hd path.
var wallet_hdpath = "m/44'/60'/0'/0/"
var wallet = hdwallet.derivePath(wallet_hdpath + "0").getWallet()
var address = "0x" + wallet.getAddress().toString("hex")

var providerUrl = "https://testnet.infura.io"
var engine = new ProviderEngine()
// filters
engine.addProvider(new FilterSubprovider())

engine.addProvider(new WalletSubprovider(wallet, {}))
engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(providerUrl)))
engine.start() // Required by the provider engine.

module.exports = {
  networks: {
    "ropsten": {
      network_id: 3,    // Official ropsten network id
      provider: engine, // Use our custom provider
      from: address,    // Use the address we derived
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
