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
	/**
	 * 获取用户列表
	 * @param  $where
	 * @param  $p
	 * @param  $per_page
	 * @return array
	 */
	public function getUserList($query,$p=1,$per_page=PER_PAGE){
		$limit = ($p-1)*$per_page;
		$query['limit'] = $limit;
		$data = $this->getPageData($query);
		return $data;
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
		$res = $this->doInsert($data);
		return $res;
	}
	
	public function editUser($id,$data){
		$res = $this->doEdit($id, $data);
		return $res;
	}
	public function deleteUser($id){
		$res = $this->deleteInfo($id);
		return $res;
	}
}