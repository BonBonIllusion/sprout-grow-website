<?php
require_once("db.php");
require_once("lib/ini.php");
$servername = $_DB["host"];
$username = $_DB["username"];
$password = $_DB["password"];

try
{
    $flags = parse_ini_file("flags");
    // print_r($flags);

    $conn = new PDO("mysql:host=$servername;dbname=sprout", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // execute select
    $stmt = $conn->prepare("SELECT * FROM schedule ORDER BY schedule_id DESC");
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $data = $stmt->fetchAll();

	  $data = array_values($data);
    echo json_encode($data);

} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;


?>
