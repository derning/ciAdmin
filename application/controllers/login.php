<?php
class Login extends CI_Controller
{
	public function __construct(){
		parent::__construct();
		$this->load->library('session');
	}
	public function index(){
		$this->load->view('login');
	}
	public function ajaxLogin()
	{
		$username = trim($this->input->post('username'));
		$password = trim($this->input->post('pwd'));
		$code = $this->input->post('code');
		$scode = $this->session->userdata("yzm");
		if('' == $username){
			$result['status'] =-1;
			$result['msg'] = '用户名不能为空';
			echo json_encode($result);
			return;
		}
		if('' == $password){
			$result['status'] =-1;
			$result['msg'] = '密码不能为空';
			echo json_encode($result);
			return;
		}
		if('' == $code){
			$result['status'] =-1;
			$result['msg'] = '验证码不能为空';
			echo json_encode($result);
			return;
		}else{
			$code = strtolower($code);
			$scode = strtolower($scode);
			if($code != $scode){
				$result['status'] =-1;
				$result['msg'] = '验证码不正确';
				echo json_encode($result);
				return;
			}
		}
		//查询数据库
		$this->load->model('admin_user');
		$info = $this->admin_user->getUserByPwd($username,$password);
		if($info){
			$result = array('status'=>1,'msg'=>'登录成功');
			$this->session->set_userdata('adminId',$info['id']);
		}else{
			$result = array('status'=>-1,'msg'=>'用户名或密码错误');
		}
		echo json_encode($result);
	}
	
	public function capt(){
		$conf['name']='yzm';
		$this->load->library('captcha',$conf);
		$this->captcha->code1();
	}
	
	public function logingOut(){
		$this->session->unset_userdata('adminId');
		header("Location:/");
	}
}