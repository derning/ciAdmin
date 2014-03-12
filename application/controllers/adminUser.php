<?php
class AdminUser extends MY_Controller{
	
	public function __construct(){
		parent::__construct();
		$this->load->model('admin_user');
	}
	
	public function index(){
		$p = $this->input->get('p');
		$p = $p ? $p :1;
		$query = array("order_by"=>'id desc');
		$userList = $this->admin_user->getUserList($query,$p);
		$data['list'] = $userList;
		$this->load->view('adminUser/user_index',$data);
	}
	
	public function editUser(){
		$id = $_REQUEST['id'];
		if ($_POST) {
			$username = $this->input->post("username");
			$password = $this->input->post("password");
			if($id){
				$set = array("username"=>$username,"password"=>md5($password));
				$res = $this->adin_user->editUser($id,$set);
				$msg = "编辑";
			}else {
				$data = array("username"=>$username,'password'=>md5($password));
				$res = $this->admin_user->insert_entry($data);
				$msg = "添加";
			}
			if(-1==$res){
				$result = array("status"=>-1,"msg"=>"用户名已经存在");
			}elseif($res>0){
				$result = array("status"=>1,"msg"=>"{$msg}成功");
			}else{
				$result = array("status"=>-1,"msg"=>"{$msg}失败");
			}
			echo json_encode($result);
			exit;
		}
		$info = $this->admin_user->getUseInfo($id);
		$data['info'] = $info;
		$this->load->view('adminUser/user_edit',$data);
	}
	
	public function editUserRole(){
		$this->load->model('admin_role');
		$this->load->model('admin_ror');
		if($_POST){
			$user_id = $this->input->post("user_id");
			$role_ids = rtrim($this->input->post('role_ids'),",");
			$roleIds = explode(",", $role_ids);
			
			if ($roleIds) {
				$this->admin_ror->deleteRoleByUserId($user_id);
				foreach ($roleIds as $rid){
					if ($rid) {
						$insert = array('role_id'=>$rid,'user_id'=>$user_id,'add_user'=>$this->adminId);
						$this->admin_ror->addData($insert);
					}
				}
			}
			$result = array("status"=>1,"msg"=>"添加成功");
			echo json_encode($result);
			exit;
		}
		$user_id = $this->input->get('user_id');
		$allRoles = $this->admin_role->getAllRoles();
		$userRoles = $this->admin_ror->getInfoByUserId($user_id);
		$data['roles'] = $allRoles;
		$data['userRoles'] = $userRoles;
		$data['user_id'] = $user_id;
		$this->load->view('adminUser/user_role' , $data);
	}
	/**
	 * 删除用户信息
	 */
	public function delete(){
		$id = $this->input->get("id");
		if($id){
			$res = $this->admin_user->deleteUser($id);
			if ($res) {
				$result = array('status'=>1,'msg'=>'删除成功');
			}else{
				$result = array('status'=>-1,'msg'=>'删除失败');
			}
		}else{
			$result = array('status'=>-1,'msg'=>'删除编号不存在');
		}
		echo json_encode($result);
		exit;
	}
}