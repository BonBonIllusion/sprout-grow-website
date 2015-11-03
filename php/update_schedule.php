<?php
require_once("db.php");
$servername = $_DB["host"];
$username = $_DB["username"];
$password = $_DB["password"];

$schedule = $_POST["schedule"];
$description = null;

if( isset($_POST['description']) )
{
     $description = $_POST['description'];
}

try
{
    $conn = new PDO("mysql:host=$servername;dbname=sprout", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT * FROM schedule";

    // execute select
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $data = $stmt->fetchAll();

    if( sizeof($data) == 5 )
      $conn->exec("DELETE FROM schedule LIMIT 1");

    // sql string
    if($description != null)
    	$sql = "INSERT INTO schedule (description, value) VALUES ('{$description}', '{$schedule}')";
    else
    	$sql = "INSERT INTO schedule (value) VALUES ('{$schedule}')";

    // use exec() because no results are returned
    $conn->exec($sql);

    $sql = "SELECT * FROM schedule ORDER BY schedule_id DESC";

    // execute select
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
    $data = $stmt->fetchAll();

    $data = array_values($data);
    echo json_encode($data);

} catch(PDOException $e) {
    echo $_DB["error_msg"] . $e->getMessage();
}

$conn = null;
?>
