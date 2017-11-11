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
