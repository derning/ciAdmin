<?php
function smarty_function_sversion($params) {
	if(empty($params['data'])){
		return '';
	}
	$file = $params['data'];
	$file_url = STATIC_PATH."/v5/build/".$file;
	$file = filectime($file_url);
	if(!$file){
		$file = strtotime(date('Y-m-d',time()));
	}
	return $file;
}
?>