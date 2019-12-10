<?php
require_once __DIR__ . '/../Config/Connection.php';

class Galeria extends Connection
{
    public function listaGalerias()
    {
        try {
            $sql = "select * from galeria order by nome";
            $stmt = $this->connect()->prepare($sql);
            $stmt->execute();
            $galerias = $stmt->fetchAll(PDO::FETCH_OBJ);
            $stmt->closeCursor();
            return json_encode($galerias);
        } catch (PDOException $e) {
            throw $e;
        }
    }
    public function creatGaleria($nome , $descricao)
    {
        try {
            $sql = "INSERT INTO galeria( nome , descricao ) VALUES ( ? , ? )";
            $stmt = $this->connect()->prepare($sql);
            $stmt->bindParam(1 , $nome);
            $stmt->bindParam(2 , $descricao);
            $res = $stmt->execute();
            $stmt->closeCursor();
            if ($res) {
                return $this->listaGalerias();
            }
            return false;

        } catch ( PDOException $e ) {
            throw $e;
        }
    }
}
