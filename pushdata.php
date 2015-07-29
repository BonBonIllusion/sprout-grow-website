<?php
$servername = "localhost";
$username = "sprout";
$password = "nckume106c";

$temperature = $_POST["temp"];
$humid = $_POST["humid"];
$fan = null;

if( isset($_POST['fan']) )
{
     $fan = $_POST['fan'];
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
    
    echo "New record created successfully";

} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>