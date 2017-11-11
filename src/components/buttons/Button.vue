<template>
      <button type="button" class="btn" v-bind:class="{ 'btn-primary': primary, 'btn-secondary': !primary}" v-on:click="clicked" :disabled="!clickable">
        {{label}}
      </button>
</template>

<script>
export default {
  name: 'button',
  props: ['label', 'clickable', 'primary'],
  methods: {
    clicked () {
      this.$emit('clicked')
    }
  }
}
</script>
