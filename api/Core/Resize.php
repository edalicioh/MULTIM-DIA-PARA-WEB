<?php
class Resize
{
    private $largura_nova;
    private $altura_nova;
    private $arquivo;
    private $destino;
    private $qualidade;
    private $allowedTypes = array(1, 2, 3, 6);
    public  $resp;

    public function __construct($tamanho, $arquivo, $destino, $qualidade)
    {
        if ($arquivo) {
            $this->largura_nova = $tamanho;
            $this->altura_nova = $tamanho;
            $this->arquivo = $arquivo;
            $this->destino = $this->isPath($destino);
            $this->qualidade = $qualidade;

            list($largura_antiga, $altura_antiga, $type) = getimagesize($this->arquivo);
            $this->mantendoProporção($largura_antiga, $altura_antiga);

            if (in_array($type, $this->allowedTypes)) {
                $imagem_original =  $this->imageCreate($type);
            }

            $imagem_nova = imagecreatetruecolor($this->largura_nova, $this->altura_nova);
            imagecopyresampled(
                $imagem_nova,
                $imagem_original,
                0,
                0,
                0,
                0,
                $this->largura_nova,
                $this->altura_nova,
                $largura_antiga,
                $altura_antiga
            );
            if ($this->criaArquivo($type, $imagem_nova)) {
                imagedestroy($imagem_original);
                imagedestroy($imagem_nova);
                return $this->resp = true;
            } else return  $this->resp = false;
        } else return $this->resp = false;
    }
    private function mantendoProporção($largura_antiga, $altura_antiga)
    {
        $areaOriginal = $largura_antiga / $altura_antiga;

        if ($this->largura_nova / $this->altura_nova >  $areaOriginal) {
            $this->largura_nova = $this->altura_nova * $areaOriginal;
        } else {
            $this->altura_nova = $this->largura_nova / $areaOriginal;
        }
        return [$this->largura_nova,  $this->altura_nova];
    }
    private function imageCreate($type)
    {
        switch ($type) {
            case 1:
                return imageCreateFromGif($this->arquivo);
                break;
            case 2:
                return imageCreateFromJpeg($this->arquivo);
                break;
            case 3:
                return imageCreateFromPng($this->arquivo);
                break;
            case 6:
                return imageCreateFromBmp($this->arquivo);
                break;
        }
    }
    private function criaArquivo($type, $imagem_nova)
    {
        switch ($type) {
            case 1:
                return  imagegif($imagem_nova, $this->destino);
            case 2:
                return  imagejpeg($imagem_nova, $this->destino, $this->qualidade);
            case 3:
                return  imagepng($imagem_nova, $this->destino);
            case 6:
                return  imagewbmp($imagem_nova, $this->destino);
            default:
                return false;
        }
    }
    public function isPath($destino)
    {
        $path = substr($destino, 0, -36);
        if (!is_dir($path)) {
            mkdir($path);
            return $destino;
        }
        return $destino;
    }
}
