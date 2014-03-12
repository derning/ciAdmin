<?php
/**
 * 系统角色mod
 * @author dongyaungong
 *
 */
class Admin_role extends Base_mod{
	
	public function __construct(){
		parent::__construct('admin_role');
	}
	/**
	 * 根据编号获取数据
	 * @param int $id
	 */
	public function getInfoById($id){
		$where['id'] = $id;
		return $this->getRow($where);
	}
	
	/**
	 * 获取分页数据
	 * @param  $query
	 * @param int $p
	 * @param int $per_page
	 * @return array
	 */
	public function getRolesList($query,$p=1,$per_page=20){
		$limit = ($p-1)*$per_page;
		$query['limit'] = "{$limit}";
		$result = $this->getPageData($query,$per_page);
		return $result;
	}
	/**
	 * 获取所有的角色
	 * @return array
	 */
	public function getAllRoles(){
		$query['order_by'] = "id desc";
		$data = $this->getData($query);
		return $data;
	}
	/**
	 * 编辑信息
	 * @param  $id
	 * @param  $data
	 * @return bollean
	 */
	public function editData($id,$data){
		$res = $this->doEdit($id, $data);
		return $res;
	}
	/**
	 * 添加信息
	 * @param  $data
	 * @return 
	 */
	public function addData($data){
		$res = $this->doInsert($data);
		return $res;
	}
	/**
	 * 根据编号删除信息
	 * @param int $id
	 * @return bool
	 */
	public function deleteRole($id){
		$res = $this->deleteInfo($id);
		return $res;
	}
}