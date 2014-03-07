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
		$list = $this->admin_operate->getAllMenus();
		$data['menus'] = $list;
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