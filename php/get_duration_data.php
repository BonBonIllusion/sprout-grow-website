<?php
require_once("db.php");
$servername = $_DB["host"];
$username = $_DB["username"];
$password = $_DB["password"];

$mode = $_GET["mode"];
$start_time = null;
$end_time = null;

if( isset($_GET['start']) && isset($_GET['end']) )
{
	$start_time = $_GET["start"];
	$end_time = $_GET["end"];
}

try 
{
	$conn = new PDO("mysql:host=$servername;dbname=sprout", $username, $password);
	// set the PDO error mode to exception
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	$sql = "SELECT * FROM ".$mode;

	// execute select
	$stmt = $conn->prepare($sql); 
	$stmt->execute();

	// set the resulting array to associative
	$result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
	$data = $stmt->fetchAll();
	foreach ($data as $key => $d){
		$data[$key]["start_time"] = strtotime($d["start_time"]);
		$data[$key]["stop_time"] = strtotime($d["stop_time"]);
		if( $start_time != null && $end_time != null ){
			if($data[$key]["start_time"] < $start_time || $data[$key]["start_time"] > $end_time)
				unset($data[$key]);
		}
	}
	$data = array_values($data);
	echo json_encode($data);

} catch(PDOException $e) {
	echo "Connection failed: " . $e->getMessage();
}

$conn = null;
?>