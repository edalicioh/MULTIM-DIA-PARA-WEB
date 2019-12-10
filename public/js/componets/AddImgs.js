import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'
import addGaleria from './AddGaleria.js'

const add = Vue.component('add', {
    template: `
        <div class="row add-content mr-5 ml-2" style="    min-heigh: calc( 100vh - 129px );">
            <div class="col border bg-white add-form mr-3"  >
            <form  enctype="multipart/form-data">
                <div class="form-group">
                <label for="exampleFormControlTextarea1">Example textarea</label>
                    <select class="form-control" v-model="galeriaid">
                        <option selected disabled value=""> Escolha Album </option>
                        <option v-for="(item, index) in albums" :key="index" :value="item.id" >{{  item.nome  }}</option>
                    </select>
                </div>
                <div class="form-group" style="display: flex; justify-content: center;" >
                    <label for="files" class="label-file" 
                        :class="{ active : isondragover}" 
                        @dragenter.prevent="isondragover = true"
                        @dragover.prevent="isondragover = true"
                        @dragleave.prevent="isondragover = false"
                        @dragend.prevent="isondragover = false"
                        @drop="onDrop" 
                    > 
                        <i class="material-icons">camera_alt</i>
                    </label>
                    <input @change="fileChange" type="file"  id="files" name="files[]" multiple style="display: none" />
                </div>
            </form>
            <div class=" pre-view " >
            <div v-for="(f,index) in preImg" class="pre-view-box" > 
                <div class="view-img" @click.prevent.stop="closeImage(index)">
                    <img :src="f" alt="Card image" style=" width: 100%;">
                    <i class="material-icons delete">delete</i> 
                </div>           
                <div class="sasasas">
                    <textarea class="form-control mt-1" v-model="descricao[index]" :id="index" rows="1" placeholder="Descrição"></textarea>
                </div>
            </div>
            </div>
        </div>
        
           <addGaleria  @error="alerta" @creadGaleria="reload" />

            <button type="submit" @click.prevent="submitImg" class="btn btn-primary btn-form-add mb-3" style="
            display: flex;
        "><i class="material-icons">
            cloud_upload
            </i></button>

            <div v-if="isAlert" :class="'alert-' + isAlert.classe "

            class="alert mr-5 alert-flot" role="alert">
                {{ isAlert.text }}
            </div>
        </div>
        
    `,
    props: ['albums'],
    data() {
        return {
            preImg: [],
            uploadImgs: [],
            galeriaid: '',
            descricao: [],
            formData: new FormData(),
            name: 0,
            isondragover: false,
            isAlert: false
        }
    },
    methods: {
        fileChange(e) {
            let files = e.target.files;
            this.preview(files)
        },
        preview(files) {
            if (files) {
                let files_count = files.length;
                for (let i = 0; i < files_count; i++) {
                    this.formData.append(this.name, files[i])
                    this.name++
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.preImg.push(e.target.result)
                    }
                    reader.readAsDataURL(files[i]);
                }
            }
        },
        closeImage(index) {
            this.preImg.splice(index, 1)
            this.descricao.splice(index, 1)
            this.formData.delete(index)
            this.name--
        },
        onDrop(e) {
            e.stopPropagation();
            e.preventDefault();
            this.isondragover = false
            let files = e.dataTransfer.files;
            this.preview(files)
        },
        submitImg() {
            const self = this

            if (this.galeria === "" || this.descricao.length === 0) {
                this.alerta("Deu Erro!!!" , 'danger')

            } else {
                this.formData.append("data", JSON.stringify({
                    galeria: this.galeriaid,
                    descricao: this.descricao
                }))
                axios.post('api/uploadFile.php',
                    self.formData,
                    {
                        header: {
                            'Content-Type': 'multipart/form-data',
                        }
                    },
                ).then(({ data }) => {
                    if (data) {
                        this.galeriaid = ""
                        this.preImg = ""
                        this.descricao = ""
                        this.formData = ""
                        this.name = 0
                        this.alerta("deu certo" , "success")
                    }

                })
            }
        },
        alerta(text , classe) {
            this.isAlert = {
                text : text,
                classe : classe
            }
            setTimeout(() => {
                this.isAlert = false
            }, 3000);
        },
        reload(e) {
            console.log(`img ->`, e.data);

            this.$emit('reload', e.data)
        }
    },
})
export default add