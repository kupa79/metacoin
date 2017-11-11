<template>
  <div class="card mb-3">
    <h4 v-if="header" class="card-header">{{header}}</h4>
    <h4 v-if="hasHeaderSlot" class="card-header"><slot name="header" /></h4>
    <img v-if="src" class="card-img-top" :src="im" alt="Card image cap">
    <slot name="prebody" />
    <div class="card-body">
      <h4 v-if="title" class="card-title">{{title}}</h4>
      <p class="card-text">
        <slot />
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  inject: ['$validator'],
  props: ['src', 'title', 'header'],
  computed: {
    hasHeaderSlot () {
      return !!this.$slots['header']
    },
    im () {
      return require('@/assets/img/' + this.src + '.svg')
    }
  }
}
</script>
