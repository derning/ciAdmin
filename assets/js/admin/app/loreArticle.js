function supperSearch() {
	$("#quick_search").hide();
	$("#supper_search").show();
}

function quickSearch() {
	$("#supper_search").hide();
	$("#quick_search").show();
}

function checkForm(){
	var id=$.trim($("#id").val());
	var title=$.trim($("#title").val());
	var tags=$.trim($("#tags").val());
	var summary=$.trim($("#summary").val());
	if (!title) {
		alert("请输入文章标题");
		return false;
	}
	$.post(
		location.href+"&act=edit&is_ajax=1",
		{"id":id, "title":title, "tags":tags, "summary":summary}, 
		function(data){
			alert(data.msg);
			if (data.success) {
				location.href=location.href;
			}
		},
		'json'
	);
	return false;
}

function multiCheck(state) {
	var ids=getCheckedIds();
	if (!ids) {
		alert("请选择");
		return;
	}
	confirmCheck(ids,state);
}

function confirmCheck(id,state) {
	if (!confirm("确认此操作?")) {
		return;
	}
	$.post(
		location.href+"&act=checkState&is_ajax=1",
		{"id":id, "state":state}, 
		function(data) {
			alert(data.msg);
			if(data.success){
				location.href=location.href;
			}
		},
		'json'
		
	);
}