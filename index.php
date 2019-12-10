<?php
    include_once __DIR__ . '/api/layout/head.phtml';
?>
<div id="app">
    <div v-if="isLoad">
        <load />
    </div>
    <div v-else>
        <nav class="navbar navbar-light bg-light fixed-top">
            <a class="navbar-brand" href="#">{{titulo}}</a>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <ul class="list-group" v-if="albums">
                        <albums 
                            v-for="(item, index) in albums" 
                            :key="index" :ac='active' :itens="item" 
                            @id="getImages" 
                                                      
                        />
                    </ul>
                    <button type="button" @click="addImg()" class="btn btn-primary btn-add mb-3 ">ADD</button>
                </div>
                <div class="col-md-10 mt-3 content">
                    <h3 v-if="nomegale && !isAdd" class="text-center">Galeria - {{ nomegale }}</h3>
                    <h4 v-if="nomegale && !isAdd" class="text-center">{{ desgale }}</h4>
                    <h3 v-if="!nomegale && isAdd" class="text-center">Adicionar Imagens</h3>
                    <div class="content-galeria" v-if='!isAdd'>
                        <Galeria v-for="(imagen, index) in images" :key="index" :index='index' :imagen='imagen' @open='openModal' />

                    </div>
                    <add v-if='isAdd' @reload="reload"   :albums="albums" />
                </div>
            </div>
        </div>

        <modal v-if="showModal" :imgs='images' :id="open" :albums="albums" @close="closeModal" />
    </div>
</div>
<?php
include_once __DIR__ . '/api/layout/footer.phtml';
