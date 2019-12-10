<?php
header('Content-Type: application/json');

require_once  __DIR__ . '/Dao/Imagem.php';

if (isset($_GET['gal'])) {
    $galeria_id = $_GET['gal'];
    echo (new Imagem())->listaImagensPorGaleria($galeria_id);
} else {
    echo json_encode(array('erro' => 'Id de Galeria não informado'));
}
