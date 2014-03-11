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
		$info = $this->admin_user->getUseInfo($id);
		$data['info'] = $info;
		$this->load->view('adminUser/user_edit',$data);
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