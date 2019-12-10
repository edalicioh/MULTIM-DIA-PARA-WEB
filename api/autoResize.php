<?php
require_once __DIR__ . "/core/Resize.php";

$pastaOrigem = __DIR__ . '/../public/imgs/';
$pastaDestino = __DIR__  .  "/../public/imgs/thumbs/";

$tamanho = 200;

if (!is_dir($pastaDestino)) {
    mkdir($pastaDestino);
}

if (is_dir($pastaOrigem)) {
    $arquivos = glob("$pastaOrigem{*.jpg,*.JPG,*.png,*.gif,*.bmp}", GLOB_BRACE);   
    for ($i = 0; $i < count($arquivos); $i++) {
        $nome = explode('/public/imgs/', $arquivos[$i])[1];
        $resize = new Resize($tamanho, $arquivos[$i], $pastaDestino . $nome, 72);
    }
}
