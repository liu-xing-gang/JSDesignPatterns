<?php
    function udate($format = 'u', $utimestamp = null)
    {
        if (is_null($utimestamp)){
            $utimestamp = microtime(true);
        }
        $timestamp = floor($utimestamp);
        $milliseconds = round(($utimestamp - $timestamp) * 1000000);//改这里的数值控制毫秒位数
        return date(preg_replace('`(?<!\\\\)u`', $milliseconds, $format), $timestamp);
    }
    // echo udate('Y-m-d H:i:s u');
$arr = array([
    'key' => $_REQUEST,
    'time' => udate('Y-m-d H:i:s u')
]);
echo json_encode($arr);