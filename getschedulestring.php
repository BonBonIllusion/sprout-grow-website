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
    $stmt = $conn->prepare("SELECT * FROM schedule WHERE schedule_id=0"); 
    $stmt->execute();

    // set the resulting array to associative
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC); 
    foreach($stmt->fetchAll() as $k => $v) { 
        echo time().','.$v["value"].','.$flags["on_scheduled"];
        if(!$flags["on_scheduled"]) {
            $flags["on_scheduled"] = 1;
            write_ini_file($flags, "flags");
        }
    }

} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

$conn = null;


?>