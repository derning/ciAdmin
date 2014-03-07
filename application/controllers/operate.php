<?php
/**
 * 菜单管理
 * @author dongyaungong
 *
 */
class Operate extends MY_Controller{
	
	public function __construct(){
		parent::__construct();
		$this->load->model('admin_operate');
	}
	
	public function index(){
		$result = $this->admin_operate->getMenusByParentId();
		$data['list'] = $result;
		$this->load->view('operate/index' , $data);
	}
	
	public function editOperate(){
		$id = $_REQUEST['id'];
		$parent_id = $_REQUEST['parent_id'];
		if ($_POST) {
			$title = $this->input->post("title");
			$app1 = $this->input->post("app1");
			$act1 = $this->input->post("act1");
			$parameter = $this->input->post("parameter");
			$is_public = $this->input->post("is_public");
			$is_menu = $this->input->post("is_menu");
			$is_show = $this->input->post("is_show");
			$sort_order = $this->input->post("sort_order");
			$data = array("title"=>$title,"app"=>$app1,"act"=>$act1,"parameter"=>$parameter,
						  "is_public"=>$is_public,"is_menu"=>$is_menu,"is_show"=>$is_show,
						   "sort_order"=>$sort_order);
			if ($parent_id) {
				$data['parent_id'] = $parent_id;
				$parentInfo = $this->admin_operate->getInfoById($parent_id);
				$level = $parentInfo['level']+1;
				$data['level'] = $level;
			}else{
				$data['level'] = 1;
				$data['parent_id']=1;
			}
			if (!$id) {
				$res = $this->admin_operate->addData($data);
				$msg = "添加";
			}else{
				$res = $this->admin_operate->editData($id,$data);
				$msg = "编辑";
			}
			if ($res) {
				$result = array("status"=>1,"msg"=>"{$msg}成功");
			}else {
				$result = array("status"=>-1,"msg"=>"{$msg}失败");
			}
			echo json_encode($result);
			exit();
		}
		$info = $this->admin_operate->getInfoById($id);
		if(!$parent_id && $id){
			$parent_id = $info['parent_id'];
		}
		$data['info'] = $info;
		$parent_info = $this->admin_operate->getInfoById($parent_id);
		$data['parent_info'] = $parent_info;
		$this->load->view('operate/operate_edit',$data);
	}
	
	public function getChildInfo(){
		$id = $this->input->post("id");
		$array = $this->admin_operate->getMenusByParentId($id);
		if ($array) {
			$data = array("success"=>true,"list"=>$array);
		}else {
			$data = array("success"=>false,"list"=>$array);
		}
		echo json_encode(array_values( $array ));
		exit;
			
	}
	/**
	 * 修改排序
	 */
	public function ml(){
		$id = $this->input->get('id');
		$val = $this->input->get("value");
		$data = array('sort_order'=>$val);
		$res = $this->admin_operate->editData($id,$data);
		if ($res) {
			$result = array("status"=>1,"msg"=>"修改成功");
		}else {
			$result = array("status"=>-1,"msg"=>"修改失败");
		}
		echo json_encode($result);
		exit();
	}
	/**
	 * 删除方法
	 */
	public function delete(){
		$id = $this->input->post("id");
		if (!$id) {
			$result = array("status"=>-1,"msg"=>"请选择要删除的编号");
			echo json_encode($result);
			exit();
		}
		$res = $this->admin_operate->deleteData($id);
		if ($res) {
			$result = array("status"=>1,"msg"=>"删除成功");
		}else {
			$result = array("status"=>-1,"msg"=>"删除失败");
		}
		echo json_encode($result);
		exit();
	}
}