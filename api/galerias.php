<?php
header('Content-Type: application/json');

require_once  __DIR__ . '/model/GaleriaDAO.php';

$dao = new GaleriaDAO();
$galerias = $dao->listaGalerias();
echo json_encode($galerias);