<?php
header('Content-Type: application/json');

require_once  __DIR__ . '/Dao/Galeria.php';

$galeria = (new Galeria())->listaGalerias();

print($galeria);

