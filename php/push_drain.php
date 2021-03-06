<?php
require_once("db.php");
$servername = $_DB["host"];
$username = $_DB["username"];
$password = $_DB["password"];

try 
{
    $conn = new PDO("mysql:host=$servername;dbname=sprout", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // sql string
    $sql = "INSERT INTO drain (time) VALUES (NULL)";
    
    // use exec() because no results are returned
    $conn->exec($sql);
    
    echo $_DB['success_msg'];

} catch(PDOException $e) {
    echo $_DB["error_msg"] . $e->getMessage();
}

$conn = null;
?>