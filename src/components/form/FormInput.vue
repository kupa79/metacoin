<template>
  <div class="form-group">
    <label :for="fid" class="text-xs-right">{{label}}</label>
    <input
      class="form-control"
      v-bind:class="{ 'is-invalid': errors.has(fid) }"
      v-validate="validate"
      :type="type"
      :name="fid" :id="fid"
      :placeholder="placeholder"
      :readonly="ro"
      :value="value"
      @input="ccc($event.target.value)" />
    <div v-show="errors.has(fid)" class="invalid-feedback">
        {{errors.first(fid)}}
    </div>
  </div>
</template>

<script>
export default {
  inject: ['$validator'],
  name: 'TextInput',
  props: ['fid', 'label', 'placeholder', 'type', 'value', 'ro', 'validate'],
  methods: {
    ccc: function (val) {
      this.$emit('input', val)
    }
  }
}
</script>
