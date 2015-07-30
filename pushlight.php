<?php
require_once("db.php");
$servername = $_DB["host"];
$username = $_DB["username"];
$password = $_DB["password"];

$id = null;
$stop = null;

if( isset($_GET['id']) )
{
     $id = $_GET['id'];
}
if( isset($_GET['stop']) )
{
     $stop = $_GET['stop'];
}

try 
{
    $conn = new PDO("mysql:host=$servername;dbname=sprout", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // sql exec
    if($id == null){
        $sql = "INSERT INTO light (start_time) VALUES (NULL)";
        $stmt = $conn->prepare($sql); 
        $stmt->execute();
        echo $conn->lastInsertId();
    } else {
        $sql = "UPDATE light SET stop_check={$stop} WHERE light_id={$id}";
        $conn->exec($sql);
        echo $_DB['success_msg'];
    }

} catch(PDOException $e) {
    echo $_DB["error_msg"] . $e->getMessage();
}

$conn = null;
?>