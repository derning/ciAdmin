<?php  function smarty_function_component($params){ if(empty($params['file']) || empty($params['class'])){ return false; } $content = array(); if(!empty($params['data'])){ $content = $params['data']; } component($params['file'], $params['class'], $content); } ?>