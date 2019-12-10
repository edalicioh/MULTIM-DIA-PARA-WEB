<?php
require_once __DIR__ . "/core/Resize.php";
require_once __DIR__ . "/Dao/Imagem.php";

if ( isset($_POST['data']) && isset($_FILES) ) {

    $files = $_FILES;
    $data = json_decode($_POST['data']);
    $galeria = $data->galeria;

    for ($i=0; $i < count($files) ; $i++) { 
        $file = $_FILES[$i]["tmp_name"];
        $path =  md5(date('D, d M Y H:i:s')) . substr($_FILES[$i]["name"], -4);

        $path200 = __DIR__ . "/../public/imgs/thumbs/$path";
        $path1200 = __DIR__ . "/../public/imgs/$path";

        $resize200 = new Resize(200, $file, $path200, 72);
        $resize1200 = new Resize(1200, $file, $path1200, 72);

        if ($resize1200->resp && $resize200->resp) { 
            $res =  (new Imagem())->insereImagem($data->descricao[$i], $path, $galeria );
            var_dump($res);
        } else print("error");
    }

} else print("ERROR !!!");