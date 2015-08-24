<?php
function write_ini_file($assoc_arr, $path) { 
    $content = ""; 
    
    foreach ($assoc_arr as $key=>$elem) { 
        $content .= $key." = $elem"."\n"; 
    } 
    

    if (!$handle = fopen($path, 'w')) { 
        return false; 
    }

    $success = fwrite($handle, $content);
    fclose($handle); 

    return $success; 
}
?>