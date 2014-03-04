// JavaScript Document
// 全选、反选
function checkAll(state) {
	if (1 == state) {
		$('.role').attr('checked',true);
	}else{
		$('.role').attr('checked',false);
	}
}