import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

import Galeria from './componets/Galeria.js'
import Albums from './componets/MenuAlbums.js'
import Modal from './componets/Modal.js'
import Add from './componets/AddImgs.js'

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
      open: '',
      isAdd: true,
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
          self.isAdd = false
          self.images = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    },
    getAlbums() {
      const self = this
      axios.get('api/galerias.php')
        .then(function ({ data }) {
          // handle success
          console.log(data);
          self.albums = data
        })
        .catch(function (error) {
          // handle error
          console.log(error);
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
    },
  },
  created() {
    this.getAlbums()
  },
})



export default {
  Vue
}