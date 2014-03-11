<?php
/**
 * 用户，角色对应的权限列表
 */
class Admin_rom extends Base_mod{
	
	public function __construct(){
		parent::__construct('admin_rom');
	}
	/**
	 * 根据类型和编号获取数据
	 * @param int $type_id
	 * @param int $type
	 * @return array
	 */
	public function getListByTypeId($type_id,$type=1){
		$where = array("type_id"=>$type_id,"type"=>$type);
		$query['where'] = $where;
		$data = $this->getData($query);
		return $data;
	}
	/**
	 * 获取某个信息是否已经存在
	 * @param  $operate_id
	 * @param  $type_id
	 * @param  $type
	 * @return array
	 */
	public function isExistsInfo($operate_id,$type_id,$type=1){
		$where = array("operate_id"=>$operate_id,'type'=>$type,'type_id'=>$type_id);
		$info = $this->getRow($where);
		return $info;
	}
	/**
	 * 添加权限数据
	 * @param array $data
	 * @return int
	 */
	public function addData($data){
		$info = $this->isExistsInfo($data['operate_id'], $data['type_id'],$data['type']);
		if (!$info) {
			$data['add_time'] = time();
			$res = $this->doInsert($data);
			return $res;
		}else{
			return 0;
		}
	}
	/**
	 * 编辑权限数据
	 * @param int $id
	 * @param array $data
	 * @return bollean
	 */
	public function editData($id,$data){
		$res = $this->doEdit($id, $data);
		return $res;
	}
	/**
	 * 根据条件删除信息
	 * @param int $type_id
	 * @param int $type
	 * @return boolean
	 */
	public function deleteRomByTypeId($type_id,$type=1){
		$where = array("type_id"=>$type_id,"type"=>$type);
		$res = $this->deleteAll($where);
		return $res;
	}
}