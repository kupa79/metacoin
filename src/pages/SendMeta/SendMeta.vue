<template>
  <seite title="MetaCoin Transfer" :message="message">

    <card>
      <div slot="header">
        <span class="align-middle">
          Balance: {{balance}} Meta
        </span>
        <div class="btn-group float-right" role="group">
          <button type="button" class="btn btn-default" v-on:click="reload" :disabled="loading || disabled" aria-label="refresh">
            <i class="fa fa-refresh"
              v-bind:class="{'fa-spin':loading}"
              aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <form>
        <fieldset :disabled="disabled">
          <form-input :validate="'alpha_num'" type="text" placeholder="0x0" fid="fromaddress" label="From Address" v-model="account" ro="true" />
          <form-input :validate="'required|etherAddress'" type="text" placeholder="0x0" fid="toaddress" label="To Address" v-model="toAddress" />
          <form-input :validate="'required|numeric'" type="text" placeholder="0" fid="amount" label="Amount" v-model="amount" />
          <div class="float-right">
            <m-button label="Send MetaCoin" :clickable="!loading && !errors.any() && !disabled" @clicked="transfer" :primary="true" />
          </div>
        </fieldset>
      </form>
    </card>

    <help slot="margin" />

  </seite>
</template>

<script>
import {COMPONENTS} from '@/components'
import Help from './Help'

import {getWeb3, getMetaCoin, getAccount, getBalance, installEvent} from '@/services/web3util'

export default {
  inject: ['$validator'],
  name: 'SendMeta',
  components: {...COMPONENTS, Help},
  data () {
    return {
      disabled: false,
      loading: false,
      account: null,
      balance: 0,
      amount: null,
      toAddress: null,
      message: {
        text: '',
        type: 'info'
      }
    }
  },
  methods: {
    setStatus (message, type) {
      this.message = {text: message, type: type}
    },
    clearStatus () {
      this.setStatus('', 'info')
    },
    validate () {
      return this.$validator.validateAll()
    },
    loadAccount () {
      return getAccount().then(account => {
        this.account = account
      })
    },
    refreshBalance () {
      return getBalance().then(balance => {
        this.balance = balance
      })
    },
    transfer () {
      this.loading = true
      this.clearStatus()
      this.validate().then((result) => {
        if (!result) {
          throw new Error('Validation error')
        }
        return getMetaCoin()
      }).then(instance => {
        this.setStatus('Transfer...', 'waiting')
        console.log('send ' + this.toAddress + ' ' + this.amount)
        return instance.sendCoin(this.toAddress, this.amount, {
          from: this.account
        })
      }).then((result) => {
        console.log(result)
        this.refreshBalance()
      }).then(() => {
        this.setStatus('Transfer completed.', 'success')
      }).catch(e => {
        console.log(e)
        this.setStatus(e.message, 'error')
      }).then(() => {
        this.loading = false
      })
    },
    reload () {
      this.loading = true
      this.clearStatus()
      this.loadAccount().then(() => {
        this.refreshBalance()
      }).then(() => {
        this.installEvent()
      }).catch(e => {
        console.log(e)
        this.setStatus(e.message, 'error')
      }).then(() => {
        console.log('Fertig')
        this.loading = false
      })
    },
    installEvent () {
      installEvent((error, result) => {
        console.log('on watch ' + error)
        return this.refreshBalance()
      })
    }
  },

  created () {
    this.setStatus('Try to connect to web3 ...', 'waiting')

    getWeb3(true).then(() => {
      return getMetaCoin(true)
    }).then(() => {
      this.reload()
      this.disabled = false
    }).catch(e => {
      this.disabled = true
      this.setStatus(e.message, 'error')
    })
  }
}
</script>

<style>
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
