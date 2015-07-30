<?php
require_once("db.php");
$servername = $_DB["host"];
$username = $_DB["username"];
$password = $_DB["password"];

$temperature = $_GET["temp"];
$humid = $_GET["humid"];
$fan = null;

if( isset($_GET['fan']) )
{
     $fan = $_GET['fan'];
}

try 
{
    $conn = new PDO("mysql:host=$servername;dbname=sprout", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // sql string
    if($fan != null)
    	$sql = "INSERT INTO sensors (temperature, humid, fan_speed) VALUES ('{$temperature}', '{$humid}', '{$fan}')";
    else
    	$sql = "INSERT INTO sensors (temperature, humid) VALUES ('{$temperature}', '{$humid}')";
    
    // use exec() because no results are returned
    $conn->exec($sql);
    
    echo $_DB['success_msg'];

} catch(PDOException $e) {
    echo $_DB["error_msg"] . $e->getMessage();
}

$conn = null;
?>