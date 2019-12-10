<?php
class Connection
{
    private $db = "mysql:host=localhost;dbname=imagens";
    private $user = "root";
    private $pass = "";

    public function connect()
    {
        try {
            $conn = new PDO($this->db, $this->user, $this->pass);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->query("SET CHARACTER SET utf8");
            return $conn;
        } catch (PDOException $e) {
            echo 'Erro ao conectar com o MySQL: ' . $e->getMessage();
        }
    }
}
