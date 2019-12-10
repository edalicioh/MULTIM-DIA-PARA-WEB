<?php 
header('Content-Type: application/json');

require_once __DIR__ . "/Dao/Galeria.php";

if ( isset($_POST['data']) ) {

    $data = json_decode($_POST['data'])->galeria;
    $nome = $data->nome;
    $descriacao = $data->descricao;

    print( ( new Galeria() )->creatGaleria($nome , $descriacao) );


} else {
    print( json_encode( "Tem Erro!!!" ) );
}