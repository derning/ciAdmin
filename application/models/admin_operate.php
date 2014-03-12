<?php
class Admin_operate extends Base_mod{
	
	public function __construct(){
		parent::__construct('admin_operate');
	}
	/**
	 * 根据编号获取信息
	 * @param int $id
	 * @return array
	 */
	public function getInfoById($id){
		$where['id'] = $id;
		$info = $this->getRow($where);
		return $info;
	}
	/**
	 * 根据父级编号获取信息
	 * @param int $parent_id
	 * @return array
	 */
	public function getMenusByParentId($parent_id=1){
		if ($parent_id) {
			$where['where'] = array("parent_id"=>$parent_id);;
		}
		$data = $this->getData($where);
		return $data;
	}
	/**
	 * 获取所有菜单信息
	 * @return array
	 */
	public function getAllMenus(){
		$key = "admin_operate_list";
		$result = $this->getCache($key,"getMenus");
		return $result;
	}

	/**
	 * 根据控制器名称和方法明获取数据
	 * @param string $c
	 * @param string $m
	 * @return array
	 */
	public function getInfoByAct($c,$m){
		$where = array('app'=>$c,'act'=>$m);
		$info = $this->getRow($where);
		if ($info['parent_id']) {
			$parentInfo = $this->getInfoById($info['parent_id']);
			$info['parent_info'] = $parentInfo;
		}
		return $info;
	}
	/**
	 * 添加数据
	 * @param array $data
	 * @return 
	 */
	public function addData($data){
		$data['add_time'] = time();
		$res = $this->doInsert($data);
		if ($res) {
			$this->resetMenusCache("admin_operate_list","getMenus");
		}
		return $res;
	}
	/**
	 * 编辑数据
	 * @param int $id
	 * @param array $data
	 * @return unknown
	 */
	public function editData($id,$data){
		$res = $this->doEdit($id, $data);
		if ($res) {
			$this->resetMenusCache("admin_operate_list","getMenus");
		}
		return $res;
	}
	/**
	 * 删除信息
	 * @param int $id
	 */
	public function deleteData($id){
		$res = $this->deleteInfo($id);
		if ($res) {
			$this->resetMenusCache("admin_operate_list","getMenus");
		}
	}
	
	/**
	 * 缓存方法
	 * @param string $key
	 * @return array
	 */
	public function _cacheGetMenus($key){
		$query['where'] = array('parent_id'=>1,'is_menu'=>1);
		$query['order_by'] = "sort_order asc";
		$data = $this->getData($query);
		$result = array();
		if ($data) {
			foreach ($data as $rs){
				$q['where'] = array("parent_id"=>$rs['id']);
				$q['order_by'] = array("sort_order asc");
				$list = $this->getData($q);
				$rs['list'] = $list;
				$result[$rs['id']] = $rs;
			}
		}
		return $result;
	}
	/**
	 * 重置缓存方法
	 * @param string $key
	 */
	public function resetMenusCache($key){
		$this->resetCache($key,'getMenus');
	}
}