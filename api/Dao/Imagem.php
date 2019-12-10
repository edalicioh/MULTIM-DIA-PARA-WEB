<?php
require_once __DIR__ . '/../Config/Connection.php';

class Imagem extends Connection
{
    public function listaImagensPorGaleria($galeria_id)
    {
        try {
            $sql = "select * from imagem where galeria_id=:galeria_id order by data desc";
            $stmt = $this->connect()->prepare($sql);
            $stmt->bindParam(':galeria_id', $galeria_id);
            $stmt->execute();
            $imagens = $stmt->fetchAll(PDO::FETCH_OBJ);
            $stmt->closeCursor();
            return json_encode( $imagens );
        } catch (PDOException $e) {
            throw $e;
        }
    }

    public function insereImagem($descricao, $arquivo, $galeria_id)
    {
        try {
            $sql = "insert into imagem (descricao, arquivo, galeria_id)
             values (:descricao, :arquivo, :galeria_id)";
            $stmt = $this->connect()->prepare($sql);

            $stmt->bindValue(':descricao', $descricao);
            $stmt->bindValue(':arquivo', $arquivo);
            $stmt->bindValue(':galeria_id', $galeria_id);
            $res = $stmt->execute();
            $stmt->closeCursor();
            return $res;
        } catch (PDOException $e) {
            throw $e;
        }
    }
}
