<template>
  <div class="text-center text-muted small">
    {{contractAddress}} | {{network}} | {{web3version}}
  </div>
</template>

<script>
import {getWeb3, getMetaCoin} from '@/services/web3util'

export default {
  name: 'FooterComp',
  data () {
    return {
      network: 'unknown',
      contractAddress: '0x0',
      web3version: '0'
    }
  },
  methods: {
    loadContractAddress () {
      return getMetaCoin().then(instance => {
        this.contractAddress = instance.address
      })
    },
    loadNetwork () {
      return getWeb3().then(web3 => {
        return web3.eth.net.getNetworkType()
      }).then((name) => {
        this.network = name
      })
    },
    loadWeb3version () {
      return getWeb3().then(web3 => {
        this.web3version = 'web3.js@' + web3.version
      })
    }
  },

  created () {
    getWeb3(true).then(() => {
      return getMetaCoin(true)
    }).then(() => {
      this.loadWeb3version()
      this.loadNetwork()
      this.loadContractAddress()
    })
  }
}
</script>
