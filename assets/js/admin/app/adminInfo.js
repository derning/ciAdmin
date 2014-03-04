// JavaScript Document
$(function(){
	$("#mobile").live("keydown",function(event) {
		if((event.keyCode>0&&event.keyCode<48&&event.keyCode!=8&&event.keyCode!=16)||event.keyCode>57) {
			event.returnValue=false;  
			return false;  
		}
	});
	$("#mobile").live("keyup",function() {
		$(this).val($(this).val().replace(/[^0123456789]/g, ''));
	});
})

function edit(id){
	id = id ? id :0;
	var dataUrl = "?app="+APP+"&act=edit&id="+id+"&height=250&width=450" ;
	var title = id ? "编辑职位":"添加职位";
	initDialog(dataUrl , title) ;
}

function checkPwd(){
	var old	=	$.trim($('#old').val());
	var np	=	$.trim($('#np').val());
	var rnp	=	$.trim($('#rnp').val());
	if(!old) {
		alert("请输入您的旧密码");
		$("#old").focus();
		return false;
	}
	if(!np) {
		alert("请输入您的新密码");
		$("#np").focus();
		return false;
	}
	if (!rnp) {
		alert("请再次输入新密码");
		$("#rnp").focus();
		return false;
	}
	if(np!=rnp) {
		alert("新密码两次输入不一致");
		return false;
	}
	if(old==np) {
		alert("您的新密码和旧密码相同，无需修改");
		return false;
	}
	$.post(aUrl, {"old":old,"np":np,"rnp":rnp}, function(data) {
		if(data.success){
			alert("密码修改成功");
			$("input:password").val("");
			return false ;
		}else{
			alert(data.msg);
		}
	} , 'json');
	
	return false ;
}


function checkInfoForm() {
	var email = $("#email").val();
	var mobile = $("#mobile").val();
	if (!email) {
		alert("请输入邮箱地址！");
		return false;
	}
	if (!mobile)
	{
		alert("请输入手机号");
		return false;
	}
	$.post(
		aUrl,
		{ "email":email,"mobile":mobile},
		function(res) {
			alert(res.msg);
			return false;
		},
		'json'
	);
	return false;
}