import Web3 from 'Web3'
import MetaCoinArtifacts from '@/../build/contracts/MetaCoin.json'
import { default as contract } from 'truffle-contract'

let web3 = null

export function getWeb3 (createNew) {
  return new Promise(function (resolve, reject) {
    if (!createNew && web3 != null) {
      console.log('Recycled web3 ...')
      resolve(web3)
      return
    }

    if (Web3.givenProvider == null) {
      let error = new Error('Please use an ethereum compatible browser.')
      console.log(error)
      reject(error)
      return
    }

    try {
      web3 = new Web3(Web3.givenProvider)
    } catch (e) {
      console.log(e)
      reject(e)
      return
    }

    resolve(web3)
  })
}

let MetaCoin = null
export function getMetaCoinSpec (createNew) {
  return new Promise(function (resolve, reject) {
    if (!createNew && MetaCoin != null) {
      console.log('Recycled MetaCoin Spec ...')
      resolve(MetaCoin)
      return
    }

    getWeb3().then(webdrei => {
      MetaCoin = contract(MetaCoinArtifacts)
      MetaCoin.setProvider(web3.currentProvider)
      resolve(MetaCoin)
    }).catch(e => {
      reject(e)
    })
  })
}

let MetaCoinInstance = null

export function getMetaCoin (createNew) {
  return new Promise(function (resolve, reject) {
    if (!createNew && MetaCoinInstance != null) {
      console.log('Recycled MetaCoin ...')
      resolve(MetaCoinInstance)
      return
    }

    getWeb3().then(webdrei => {
      return getMetaCoinSpec()
    }).then(spec => {
      return spec.deployed()
    }).then(instance => {
      MetaCoinInstance = instance
      resolve(MetaCoinInstance)
    }).catch(e => {
      reject(e)
    })
  })
}

export function getAccount () {
  return getWeb3().then(w3 => {
    return w3.eth.getAccounts()
  }).then((accounts) => {
    if (accounts.length <= 0) {
      throw new Error('No accounts available. Maybe the wallet is locked. Please unlock your wallet and reload the page.')
    }
    return accounts[0]
  })
}

export function getBalance () {
  let account = null
  return getAccount().then(acc => {
    account = acc
    return getMetaCoin()
  }).then((instance) => {
    return instance.getBalance.call(account)
  }).then((balance) => {
    return balance.valueOf()
  })
}

let transferEvent = null
export function installEvent (callback) {
  let web3 = null
  let metaCoin = null
  let blockNumber
  let account
  getMetaCoin(true).then(mc => {
    metaCoin = mc
    return getWeb3()
  }).then(w3 => {
    web3 = w3
    return web3.eth.getBlockNumber()
  }).then(bn => {
    blockNumber = bn
    return getAccount()
  }).then(acc => {
    account = acc
    console.log(blockNumber + ':latest')

    new Promise((resolve, reject) => {
      if (transferEvent !== null) {
        return transferEvent.stopWatching(resolve)
      } else {
        resolve()
      }
    }).then(() => {
      transferEvent = metaCoin.Transfer({'_to': account}, {fromBlock: blockNumber, toBlock: 'latest'})
      transferEvent.watch(callback)
    })
  }).catch(e => {
    console.log(e.message)
  })
}
