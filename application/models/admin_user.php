<?php
class Admin_user extends Base_mod
{
	public function __construct(){
		parent::__construct('admin_user');
	}
	public function getUseInfo($id){
		$info = $this->getInfo($id);
		return $info;
	}
	public function getUserByPwd($username,$pwd){
		$query['username'] = $username;
		$query['password'] = md5($pwd);
		$info = $this->getRow($query);
		if($info){
			return $info;
		}else{
			return array();
		}
	}
	function insert_entry($data)
	{
		$data['password'] = md5($data['password']);
		$data['add_time'] = time();
		$res = $this->db->insert('admin_user', $data);
		return $res;
	}
}