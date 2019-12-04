import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
import Carousel from './Carousel.js'
import Add from './AddImgs.js'

const modal = Vue.component('modal', {
  template: `
  <div class="modal-mask">
    <button type="button" class="close" @click='closeModal' >
      <span>&times;</span>
    </button>
    <div class="modal-wrapper">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
            <carousel :imgs="imgs" :id="id" />
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['imgs', 'id'],
  methods: {
    closeModal() {
      this.$emit('close')
    }
  },

})

export default modal