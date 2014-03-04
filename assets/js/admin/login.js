$(function(){
	$('.admin-login').click(function(){
		var username = $('#accout').val(),
			pwd = $('#password').val(),
			code = $("#yanz").val(),
			islogin = $("#check1").attr("checked");
		if('' == username){
			alert("用户名不能为空");
			return false;
		}
		if(''==pwd){
			alert("密码不能为空");
			return false;
		}
		if(''==code){
			alert("请输入验证码");
			return false;
		}
		$.ajax({
			url:"/index.php?c=login&m=ajaxLogin",
			data:{username:username,pwd:pwd,code:code,islogin:islogin},
			dataType:"json",
			type:"post",
			success:function(data){
				if(1 == data.status){
					window.location.reload();
				}else{
					alert(data.msg);
					reloadCode;
				}
			}
		});
		return false;
	});
})

