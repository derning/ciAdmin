
function checkRoleFrom(){
	var id 			= jQuery.trim($("#id").val()) ;
	var name	 	= jQuery.trim($("#name").val()) ;
	if(name == ""){
		alert('您还没有填写角色名称');
		$("#name").focus();
		return false ;
	}

	$.post(aUrl + "&m=editRole" , {"id":id , "name":name} , function(data){
		alert(data.msg);
		if(data.status){
			window.location.reload();
			return false ;
		}
	} , 'json');
	
	return false ;
}
