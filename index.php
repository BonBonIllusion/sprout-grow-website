<?php
$var = "World";
if( isset($_POST['var']) )
     $var = $_POST['var'];
echo "Hello {$var}!";
?>