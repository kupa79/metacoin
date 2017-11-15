import Vue from 'vue'
import {default as VeeValidate, Validator} from 'vee-validate'
import {getWeb3} from './services/web3util'

Vue.use(VeeValidate)
Validator.extend('etherAddress', {
  getMessage: field => 'This is not a valid ethereum address.',
  validate: value => getWeb3().then(web3 => {
    return web3.utils.isAddress(value)
  })
})
