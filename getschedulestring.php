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

    // execute select
    $stmt = $conn->prepare("SELECT * FROM schedule WHERE schedule_id=0"); 
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    foreach($stmt->fetchAll() as $k => $v) { 
        echo $v["value"];
    }

} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>