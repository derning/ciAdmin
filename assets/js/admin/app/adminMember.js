function checkUserForm(){
	var username = $("#username").val(),
		password = $("#password").val(),
		id = $("#id").val();
	if(''==username){
		alert('用户名不能为空');
		return false;
	}
	if(''==password){
		alert('密码不能为空');
		return false;
	}
	$.ajax({
		url:"?c=adminUser&m=editUser",
		data:{username:username,password:password,id:id},
		type:"post",
		dataType:"json",
		success:function(data){
			alert(data.msg)
			if(1==data.status){
				window.location.reload();
			}
		}
	});
	
	return false;
}
function checkUserRoleForm(){
	var user_id = $("#id").val(),
		role_ids = '';
	$('.chk-list').each(function(){
		if($(this).attr("checked")){
			role_ids+=$(this).val()+",";
		}
	});
	if(''==role_ids){
		alert('请选择角色');
		return false;
	}
	$.ajax({
		url:"?c=adminUser&m=editUserRole",
		data:{user_id:user_id,role_ids:role_ids},
		type:"post",
		dataType:"json",
		success:function(data){
			alert(data.msg);
			if(data.status==1){
				$.dialog.dialogClose();
			}else{
				
			}
		}
	});
	return false;
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

