// JavaScript Document
// JavaScript Document
function checked_parents(pid){
	if(pid == 0){
		return ;
	}
	$(".cx").each(function(){
		var my_pid = $(this).attr("value");
		if(my_pid == pid){
			$(this).attr('checked',true);
			checked_parents($(this).attr("pid")) ;
		}
	});
}
function un_checked_childs(node_id){
	$(".cx").each(function(){
		var my_pid = $(this).attr("pid");
		if(my_pid == node_id){
			$(this).attr('checked',false);
			un_checked_childs($(this).attr("value")) ;
		}
	});	
}

function checked_childs(node_id){
	$(".cx").each(function(){
		var my_pid = $(this).attr("pid");
		if(my_pid == node_id){
			$(this).attr('checked',true);
			checked_childs($(this).attr("value")) ;
		}
	});	
}

$(function(){
	$(".cx").click(function(){
		if($(this).attr('checked')){
			var flag = true;
		}else{
			var flag = false;
		}
		if(flag){
			var this_pid = $(this).attr("pid");
			checked_parents(this_pid) ;
			checked_childs($(this).attr("value")) ;
		}else{
			var this_id = $(this).attr("value");
			un_checked_childs(this_id) ;
		}
		//return false ;
	});
	

	if( haveIds){
		var hArr = haveIds.split(",");
		for(var i=0 ; i<hArr.length ; i++){
			$('input:checkbox[value='+hArr[i]+']').attr('checked','checked'); 
		}
	}	
	
	
});
// 全选、反选
function checkAll(state) {
	if (1 == state) {
		$('.cx').attr('checked',true);
	}else{
		$('.cx').attr('checked',false);
	}
}

function checkForm(){
	var ids = '' ;
	$(".cx").each(function(){
		if($(this).attr('checked')){
			ids += $(this).attr('value') + "," ;
		}
	});
	
	ids = ids.substr(0, (ids.length - 1));
	
	if(ids == ""){
		if(confirm("确认要取消所有吗")){
			
		}else{
			return false ;
		}
	}	
	
	var type = $("#type").val();
	var type_id = $("#type_id").val();
	
	$.post( aUrl , { "ids":ids , "type":type , "type_id":type_id} ,
		function(data){
			alert(data.msg);
			if(data.success){
				parent.closeDialog();
			}
		},'json'
	);
	return false ;
}