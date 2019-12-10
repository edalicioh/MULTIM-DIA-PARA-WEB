import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

import Galeria from './componets/Galeria.js'
import Albums from './componets/MenuAlbums.js'
import Modal from './componets/Modal.js'
import Add from './componets/AddImgs.js'
import Load from './componets/Load.js'

new Vue({
  el: '#app',
  data() {
    return {
      titulo: 'Galeria',
      images: [],
      albums: [],
      showModal: false,
      active: '',
      nomegale: '',
      desgale: '',
      open: '',
      isAdd: true,
      isLoad: true,
    }
  },
  methods: {
    getImages(id) {
      const self = this
      axios.get(`api/imagens.php?gal=${id.id}`)
        .then(function (response) {
          // handle success
          console.log(response.data);
          self.active = id.id
          self.nomegale = id.nome
          self.desgale = id.descricao
          self.isAdd = false
          self.images = response.data
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
            
        });
    },
    getAlbums() {
      const self = this
      axios.get('api/galerias.php')
        .then(function ({ data }) {
          self.albums = data
          console.log( data );
        })
        .catch(function (error) {
            self.albums = false
        })
    },
    openModal(index) {
      console.log(index);
      this.open = index
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    addImg() {
      this.isAdd = true
      this.nomegale = false
      this.active = ''
    },
    reload(e){
        this.albums = e    
    } 
  },
  created() {
    this.getAlbums()
    setTimeout(() => {
        this.isLoad = false
    }, 2000);
  },

})



export default {
  Vue
}