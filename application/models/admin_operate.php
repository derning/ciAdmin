<?php
class Admin_operate extends Base_mod{
	
	public function __construct(){
		parent::__construct('admin_operate');
	}
	
	public function getAllMenus(){
		$query['where'] = array('parent_id'=>0,'is_menu'=>1);
		$query['order_by'] = "sort_order asc";
		$result = $this->getData($query);
		if ($result) {
			foreach ($result as &$rs){
				$q['where'] = array("parent_id"=>$rs['id']);
				$q['order_by'] = array("sort_order asc");
				$list = $this->getData($q);
				$rs['list'] = $list;
			}
		}
		return $result;
	}
}