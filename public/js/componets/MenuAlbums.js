import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

const albums = Vue.component('albums', {
    template: `
        <li class="list-group-item" :class="{active: ac == itens.id }"  @click="getPhotos(itens.id , itens.nome  , itens.descricao)">{{ itens.nome }}</li>
    `,
    props: ['itens' , 'ac'],
    methods: {
        getPhotos(id , nome , descricao ){
           this.$emit('id' , { id , nome , descricao} )
        }
    },
})

export default albums