<template>
  <div class="row">
    <div class="col-sm-2"></div>
    <div class="col-sm-10">
      <div class="form-check">
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" :checked="value" v-on:click="ccc">
          <slot>Option is {{value}}</slot>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'checkbox',
  props: ['value'],
  methods: {
    ccc: function () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
