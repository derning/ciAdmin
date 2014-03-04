function edit(id,pid){
	id = id ? id :0;
	pid = pid ? pid:0;
	var dataUrl = "?app="+APP+"&act=edit&id="+id+"&pid="+pid+"&height=280&width=450" ;
	var title = id ? "编辑职位":"添加职位";
	initDialog(dataUrl , title) ;
}

function checkForm(){
	var name	=	$.trim($("#name").val());
	var sortno	=	$.trim($("#sortno").val());
	var pid = $.trim($("#pid").val());
	var id = $.trim($("#id").val());
	if(!name){
		alert('请输入部门名称');
		$("#name").focus();
		return false ;
	}
	$.post(aUrl+"&act=edit", {"id":id,"pid":pid,"name":name,"sortno":sortno} , function(data){
		alert(data.msg);
		if(data.success){
			$.dialog.dialogClose();
		}
	} , 'json');
	
	return false ;
}

$("#sortno").live("keydown",function(event){
	if((event.keyCode>0&&event.keyCode<48&&event.keyCode!=8)||event.keyCode>57){
		event.returnValue=false;   
		return false;  
	}
});