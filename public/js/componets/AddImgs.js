import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.esm.browser.js'

const add = Vue.component('add', {
    template: `
        <div class="row add-content mr-5 ml-2 ">
            <div class="col border bg-white add-form mr-3"  >
            <form  enctype="multipart/form-data">
                <div class="form-group">
                    <select class="form-control">
                        <option selected disabled> Escolha Album </option>
                        <option v-for="(item, index) in albums" :key="index">{{  item.nome  }}</option>
                    </select>
                </div>
                <div class="form-group" style="display: flex; justify-content: center;">
                    <label for="files" class="label-file" >
                        <i class="material-icons">camera_alt</i>
                    </label>
                    <input @change="preview" type="file"  id="files" name="files[]" multiple style="display: none" />
                </div>
            </form>
            <div class=" pre-view " >
            <div v-for="(f,index) in preImg" class="view-img"  @click.prevent.stop="closeImage(index)" > 
                <img :src="f" alt="Card image" style=" width: 100%;">
                <i class="material-icons delete">delete</i>
            </div>
            </div>
        </div>
        <div class="col-3 border bg-white add-form" style="max-height: 200px;">
            <h4 class="text-center"> Criar Novo Album</h4>
            <div class="form-group">
                <input type="text" class="form-control-file" >
            </div>
            <button class="btn btn-primary btn-block" >Criar</button>
        </div>
            <button type="submit" class="btn btn-primary btn-form-add mb-3" style="
            display: flex;
        "><i class="material-icons">
            cloud_upload
            </i></button>
        </div>
        
    `,
    props: ['albums'],
    data() {
        return {
            preImg: []
        }
    },
    methods: {
        preview(e) {
            let files = e.target.files;
            if (files) {
                let files_count = files.length;
                for (let i = 0; i < files_count; i++) {
                    let reader = new FileReader();
                    reader.onload = e => {
                        this.preImg.push(e.target.result)
                    }
                    reader.readAsDataURL(files[i]);
                }
            }
        },
        closeImage(index){
            this.preImg.splice(index, 1);
        }
    },
})
export default add