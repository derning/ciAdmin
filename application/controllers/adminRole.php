<?php
/**
 * 系统角色控制器
 * @author dongyaungong
 *
 */
class AdminRole extends MY_Controller{
	
	public function __construct(){
		parent::__construct();
		$this->load->model("admin_role");
	}
	
	public function index(){
		$p = $this->input->get("p");
		$p = $p ? $p :1;
		$query['order_by'] = "id desc";
		$result = $this->admin_role->getRolesList($query,$p,PER_PAGE);
		$this->load->view("adminRole/role_index",$result);
	}
	/**
	 * 添加，编辑角色
	 */
	public function editRole(){
		$id = $_REQUEST['id'];
		if($_POST){
			$name = $this->input->post("name");
			if($id){
				$set = array("name"=>$name);
				$res = $this->admin_role->editData($id,$set);
				$msg = "编辑";
			}else{
				$data = array("name"=>$name,"add_user"=>$this->adminId,"add_time"=>time());
				$res = $this->admin_role->addData($data);
				$msg = "添加";
			}
			if ($res) {
				$result = array('status'=>1,"msg"=>"{$msg}成功");
			}else{
				$result = array('status'=>-1,"msg"=>"{$msg}失败");
			}
			echo json_encode($result);
			exit();
		}
		$info = $this->admin_role->getInfoById($id);
		$data['info'] = $info;
		$this->load->view('adminRole/role_edit' , $data);
	}
	/**
	 * 编辑角色对应的权限
	 */
	public function editAdminRole(){
		$this->load->model('admin_operate');
		$this->load->model("admin_rom");
		if ($_POST) {
			$type = $this->input->post("type");
			$type_id = $this->input->post("type_id");
			$ids = $this->input->post('ids');
			if ($ids) {
				$idArr = explode(",", $ids);
				//先删除所有的值，再添加
				$this->admin_rom->deleteRomByTypeId($type_id,$type);
				foreach ($idArr as $id){
					$data = array("type"=>$type,"type_id"=>$type_id,"operate_id"=>$id,'add_user'=>$this->adminId);
					$this->admin_rom->addData($data);
				}
			}
			$result = array('status'=>1,"msg"=>"操作成功");
			echo json_encode($result);
			exit();
		}
		$type = $this->input->get('type');
		$type = $type ? $type : 1;
		if (1 == $type) {
			$type_id = $this->input->get('id');
		}else {
			$type_id = $this->adminId;
		}
		$data['type'] = $type;
		$data['type_id'] = $type_id;
		$list = $this->admin_operate->getMenusByParentId(0);
		$data['menus'] = $list;
		//获取该角色已有的权限
		$roms = $this->admin_rom->getListByTypeId($type_id,$type);
		$havaIds = '';
		if ($roms) {
			foreach ($roms as $rm){
				$havaIds.=$rm['operate_id'].',';
			}
			$havaIds = rtrim($havaIds,",");
			$data['havaIds'] = $havaIds;
		}
		$this->load->view('adminRole/admin_roles' , $data);
	}
	/**
	 * 删除角色
	 */
	public function deleteRole(){
		$id = $_REQUEST['id'];
		if ($id) {
			$res = $this->admin_role->deleteRole($id);
			if ($res) {
				$result = array('status'=>1,"msg"=>"删除成功");
			}else{
				$result = array('status'=>-1,"msg"=>"删除失败");
			}
		}else {
			$result = array("status"=>-1,"msg"=>"删除的编号不存在");
		}
		echo json_encode($result);
		exit;
	}
}