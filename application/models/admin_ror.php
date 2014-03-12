<?php
class Admin_ror extends Base_mod{
	
	public function __construct(){
		parent::__construct('admin_ror');
	}
	
	/**
	 * 根据用户编号获取角色列表
	 * @param  $userId
	 * @return 
	 */
	public function getInfoByUserId($userId,$flag=TRUE){
		$query['where'] = array('user_id'=>$userId);
		$data = $this->getData($query);
		if ($data && $flag) {
			$this->load->model('admin_rom');
			$roles = array();
			foreach ($data as $arole){
				$roles[] = $arole['role_id'];
			}
			$operates = $this->admin_rom->getOperateByRoleIds($roles);
			if ($operates) {
				$operate_ids = array();
				foreach ($operates as $op){
					$operate_ids[] = $op['operate_id'];
				}
			}
		}
		return $operate_ids;
	}
	/**
	 * 根据用户和角色获取信息
	 * @param  $roleId
	 * @param  $userId
	 * @return 
	 */
	public function getInfoByRoleId($roleId,$userId){
		$where = array('role_id'=>$roleId,'user_id'=>$userId);
		$info = $this->getRow($where);
		return $info;
	}
	/**
	 * 添加角色
	 * @param  $data
	 * @return 
	 */
	public function addData($data){
		$info = $this->getInfoByRoleId($data['role_id'], $data['user_id']);
		if($info){
			return '';
		}
		$data['add_time'] = time();
		$res = $this->doInsert($data);
		return $res;
	}
	/**
	 * 编辑数据
	 * @param  $id
	 * @param  $data
	 * @return 
	 */
	public function editData($id,$data){
		$res = $this->doEdit($id, $data);
		return $res;
	}
	
	public function deleteRoleByUserId($userId){
		$where = array("user_id"=>$userId);
		$res = $this->deleteAll($where);
		return $res;
	}
}