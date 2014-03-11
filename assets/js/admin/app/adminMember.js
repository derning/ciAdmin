// JavaScript Document
//添加用户
/*
function edit(){
	var dataUrl = "?app="+APP+"&act=edit&height=350&width=450" ;
	var title = "快速添加会员" ;
	initDialog(dataUrl , title) ;
}
**/

//用户与角色关联的模板加载
function rmr(adminId){
	var dataUrl = "?app=adminRmr&memberId="+adminId+"&height=400&width=700&type=url" ;
	var title = "角色设置" ;
	initDialog(dataUrl , title) ;
}
//检查快速添加用户的表单
function checkUserForm(){
	var id          = $.trim($("#id").val()) ;
    var username 	= $.trim($("#username").val()) ;
    var password 	= $.trim($("#password").val()) ;
    var email 		= $.trim($("#email").val()) ;
    var mobile      = $.trim($("#mobile").val());
    var department_id  = $.trim($("#department_id").val());
	if (!username){
		alert('您还没有填写用户名');
		$("#username").focus();
		return false;
	}
    if (department_id==0) {
        alert('请选择所在部门');
        return false;
    }
	pButton(1);
	$.post(aUrl+"&act=edit" , {"id":id , "username":username , "password":password,"department_id":department_id, "email":email,"state":1} , function(data){
		alert(data.msg);
		if(data.success){
			parent.f5('');
		}else{
			pButton(2);
		}
	} , 'json');
	
	return false ;
}

//人员密码初始化
function passwordRevert(id){
	if(confirm('确认要初始化密码？')){
		$.post(aUrl+"&act=revert" , {"id":id} , function(data){
			if(data.success){
				alert('操作成功，新密码是：'+data.data);
			}else{
				alert(data.msg);
			}
			return false ;
		} , 'json');
	}
}

function checkLockForm(){
	var id = $.trim($('#id').val());
	var reason = $.trim($("#reason").val());
	
	if(reason == ""){
		alert('请填写锁定原因');	
		$("#reason").focus();
		return false ;
	}
	
	$.post(aUrl+"&act=lock" , {"id":id , "state":"2" , "reason":reason} , function(data){
		alert(data.msg);
		if(data.success){
			parent.f5('');
		}
	} , 'json');
	
	return false ;
}

//帐号锁定与解锁
function lock(ids , state){
	if(state == 1){
		if(confirm('确认要解锁吗')){
			$.post(aUrl+"&act=lock" , {"id":ids , "state":state} , function(data){
				alert(data.msg);
				if(data.success){
					f5('');
				}
			} , 'json');
			return false ;
		}
	}else{
		var dataUrl = "?app="+APP+"&act=lock&id="+ids+"&height=200&width=500&type=url" ;
		var title = "帐号锁定" ;
		initDialog(dataUrl , title) ;
	}
}

function checkLogin(){
	var user_name 	= $.trim($("#user_name").val());
	var user_pass 	= $.trim($("#user_pass").val());
	var captcha		= $.trim($("#captcha").val());
	if(user_name == ''){
		alert('您还没有填写登录名称');
		$("#user_name").focus();
		return false;
	}
	if(user_pass == ''){
		alert('您还没有填写登录密码');
		$("#user_pass").focus();
		return false;
	}
	if(captcha == ''){
		alert('您还没有填写验证码');
		$("#captcha").focus();
		return false;
	}	
	pButton(1);

	$.post( "?act=login&is_ajax=1", { username:user_name,password:user_pass,captcha:captcha }, function(data){
		if(data.success){
			/*if(url != '') location.href = url;
			else location.href = '?app=default';*/
			location.href=$("#system").val();
		}else{
			alert(data.msg);
			pButton(0);
			$("#captchaCode").attr("src" , "?act=captcha&is_ajax=1&rand="+Math.random());
			return false;
		} },'json'
	);
	return false;
}

function checkPassrordForm() {
	var old 	= $.trim($("#oldPassword").val());
	var new1 	= $.trim($("#newPassword").val());
	var new2   	= $.trim($("#newPassword1").val());
	
	if(!old) {
		alert('原始密码不能为空');	
		$("#old").focus();
		return false ;
	}
	
	if(!new1) {
		alert('新密码不能为空');	
		$("#new1").focus();
		return false ;		
	}
	
	if(new1 != new2) {
		alert('两次密码输入不一致');	
		return false ;
	}
	
	if(new1.length <= 5) {
		alert('新密码长度不能小于6');	
		return false ;
	}
	pButton(1);
	
	$.post(aUrl+"&app=adminMember&act=changePassword" , {"old":old , "np":new1} , function(data) {
		alert(data.msg);
		if(data.success == false) {
			pButton(0);
			f5('');
		}
	} , 'json');
	return false ;
}

