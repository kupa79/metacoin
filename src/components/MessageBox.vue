<template>
  <transition name="slide-fade">
    <div v-if="message.text" class="alert"
      v-bind:class="{ 'alert-danger': message.type=='error', 'alert-info': message.type=='info'||message.type=='waiting', 'alert-success': message.type=='success' }"
      role="alert">
      <i v-if="message.type=='waiting'" class="fa fa-spinner fa-spin"></i>
      {{message.text}}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'MessageBox',
  props: ['message']
}
</script>

<style>
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
