import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

const addGaleria = Vue.component('addGaleria', {
    template: ` 
        <div class="col-3 border bg-white add-form" style="max-height: 250px;">
            <h4 class="text-center"> Criar Novo Album</h4>
            <div class="form-group">
                <input type="text" v-model="galeria.nome" placeholder="Nome" class="form-control-file" >
            </div>
            <div class="form-group">
                <input type="text" v-model="galeria.descricao" placeholder="Descrição" class="form-control-file" >
            </div>
            <button @click="addGaleria" class="btn btn-primary btn-block btn-add" 
                style=" margin: 0; position: relative; width: 100%; color: #000;" 
            >
                Criar
            </button>

            <div v-if="isError" :class="{ 'error': isError  }" class="alert alert-danger mr-5" role="alert">
                {{isError}}
            </div>
        </div>
    `,
    data() {
        return {
            galeria:{
                nome:'',
                descricao:'',
            },
            isError:``
        }
    },
    methods: {
        addGaleria(){
            if(this.galeria.nome !== '' && this.galeria.descricao !== ''  ){
                const self = this
                let formData = new FormData()
                formData.append("data", JSON.stringify({
                    galeria: this.galeria
                }))
                axios.post(
                    'api/creatGaleria.php',
                    formData
                ).then( res => {
                    if (res) {
                        this.$emit('creadGaleria' , res)
                        self.galeria = []
                    }   
                } )
                


            } else {
                this.$emit('error' , 'Erro adadadadada' , "danger" )
            }
        }
    },

})
export default addGaleria