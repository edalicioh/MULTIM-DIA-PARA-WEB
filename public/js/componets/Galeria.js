import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

const galeria = Vue.component( 'galeria' , { 
  template : `
    <div class="col-4" @click="modelImg(index)">
        <div class="cont-img">
          <img :src="'public/imgs/thumbs/' + imagen.arquivo" alt="..." class="img-thumbnail">
          <p class="text-center"> {{ imagen.descricao }} </p>
        </div>
    </div>
  `,
  props: ['imagen' , 'index' ],
  data() {
    return {
    }
  },
  methods: {
    modelImg(index){
      this.$emit('open' , index )
    }
  },
})

export default galeria