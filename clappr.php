<?php
// header('X-Accel-Redirect: /JSDesignPatterns/oceans.mp4'); 
// header("Content-Type: application/vnd.apple.mpegurl");
// header("Accept-Ranges: bytes");
// header('X-Accel-Redirect: /JSDesignPatterns/m3u8/playlist.m3u8');

echo 'http://localhost:9001/JSDesignPatterns/m3u8/playlist.m3u8';
// $file = $_SERVER['DOCUMENT_ROOT'] . '/JSDesignPatterns/m3u8/playlist.m3u8';
//         $size = filesize($file);
    
//         header("Content-type: application/vnd.apple.mpegurl");
//         header("Accept-Ranges: bytes");
//         if(isset($_SERVER['HTTP_RANGE'])){
//             header("HTTP/1.1 206 Partial Content");
//             list($name, $range) = explode("=", $_SERVER['HTTP_RANGE']);
//             list($begin, $end) =explode("-", $range);
//             if($end == 0){
//                 $end = $size - 1;
//             }
//         }else {
//             $begin = 0; $end = $size - 1;
//         }
//         header("Content-Length: " . ($end - $begin + 1));
//         header("Content-Disposition: filename=".basename($file));
//         header("Content-Range: bytes ".$begin."-".$end."/".$size);
//         $fp = fopen($file, 'rb');
//         fseek($fp, $begin);
//         while(!feof($fp)) {
//             $p = min(1024, $end - $begin + 1);
//             $begin += $p;
//             echo fread($fp, $p);
//         }
//         fclose($fp);

?>