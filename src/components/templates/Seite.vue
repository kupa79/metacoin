<template>
  <div class="py-md-3">
    <h1 class="mb-4"><slot name="title">{{title}}</slot></h1>
    <div class="row">
      <div class="col-12 col-md-7">
        <message-box :message="message" />
        <slot>Content</slot>
        <slot name="content"></slot>
      </div>
      <div class="col-12 col-md-5">
        <div class="row">
          <div class="col">
            <slot name="margin"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-7">
        <footer-comp />
      </div>
    </div>
  </div>
</template>

<script>
import MessageBox from '@/components/MessageBox'
import FooterComp from '@/components/FooterComp'

export default {
  inject: ['$validator'],
  name: 'Seite',
  props: ['title', 'message'],
  components: {MessageBox, FooterComp}
}
</script>
