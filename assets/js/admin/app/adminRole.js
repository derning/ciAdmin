// JavaScript Document
function edit(id){
	var dataUrl = "?app=adminRole&act=edit&id="+id+"&height=400&width=500" ;
	var title = (id == 0) ? "添加角色" : "编辑角色" ;
	initDialog(dataUrl , title) ;
}
function checkForm(){
	var id 			= jQuery.trim($("#id").val()) ;
	var name	 	= jQuery.trim($("#name").val()) ;
	if(name == ""){
		alert('您还没有填写角色名称');
		$("#name").focus();
		return false ;
	}

	$.post(aUrl + "&act=edit" , {"id":id , "name":name} , function(data){
		alert(data.msg);
		if(data.success){
			f5('');
			return false ;
		}
	} , 'json');
	
	return false ;
}

function drop(id){
	if(confirm('确认要删除该角色吗')){
		$.post(aUrl+"&act=drop" , {"id":id} , function(data){
			alert(data.msg);
			if(data.success){
				f5('');
			}
		} , 'json');
	}
}