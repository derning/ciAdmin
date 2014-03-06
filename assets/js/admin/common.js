/**
 * @upload
 * @description:common js for admin
 *
 * @author: imbingdian@gmail.com 
 * @build:2013-08-15
 */
;(function($) {
	/*
	 * 侧边栏nav交互
	 */
	$('.nav-link').on('click', function(){
		var $parent = $(this).parent('li'),
			hasCur = $parent.hasClass('cur'),
			$subNav = $parent.find('.sub-nav'),
			isVisible = $subNav.is(':visible'),
			duration = 300,
			expandCls,
			hasExpand;
		
		
		
		if ( hasCur ) {
			expandCls = 'cur-expand';
		} else {
			expandCls = 'expand';
		}
		
		hasExpand = $parent.hasClass(expandCls);
		
		// set class
		if ( !hasExpand && !isVisible ) {
			$parent.addClass(expandCls);
		} else {
			$parent.removeClass(expandCls);
		}
		
		if ( !isVisible ) {
			//$subNav.slideDown(duration);
			$subNav.show();
		} else {
			//$subNav.slideUp(duration);
			$subNav.hide();
			
		}
		
		$parent.siblings('li').find('.sub-nav').hide();
		$parent.siblings('li').removeClass('expand');
		
	});
	
	
	/*
	 * ui
	 */
	$('.ui-tooltip').tooltip();
	
	/*
	 * fixed
	 */
	$(function() {
		$('.nav').fixed({
			fix_margin: -10
		});
	});

	/*
	 * user-nav
	 */

	$(".account-setting").bind("mouseover",function(){
		var $children = $(this).find(".dropdown-menu");
		$children.show();
	})
	$(".account-setting").bind("mouseout",function(){
		var $children = $(this).find(".dropdown-menu");
		$children.hide();
	})
	
	$(".apct").each(function(){
		var mApp = $(this).attr('app');
		var mAct = $(this).attr('act');
		
		if(mApp == APP && mAct == ACT){
			$(this).removeClass();
			$(this).addClass('cur');
			$(this).parents('li').addClass('cur cur-expand');
		}
	});
	
}(jQuery));
 
/*排序规则*/
$(function(){
	$("#sort_order").bind('change', function(){
		if(isNaN(this.value)){
			alert('排序数值只能是数字');
			this.value = '';
			return false;
		}
		if(this.value > 255){
			alert('排序数值不能大于255');
			this.value = '';
			return false;
		}
	});
	/* 全选 */
	$(".checkall").change(function(){
		$('.checkitem').attr('checked', this.checked)
	});
	//列表页单个删除
	$('.listDrop').live('click' , function(){
		var dataId = $(this).attr('dataId');
		if(dataId){
			//确保只能删除当前行
			$(".checkitem").attr('checked' , false);
			$("#id_" + dataId).attr('checked' , 'checked');
			$('.batchButton').click();
		}
	});
	/* 批量操作按钮 */
	if($('#batchAction').length == 1){
		$('.batchButton').click(function(){
			/* 是否有选择 */
			if($('.checkitem:checked').length == 0){	//没有选择
				alert('无任何选中项.');
				return false;
			}
			
			/* 获取选中的项 */
			var items = '';
			$('.checkitem:checked').each(function(){
				items += this.value + ',';
			});
			
			items = items.substr(0, (items.length - 1));
			
			var fun = $(this).attr('fun');
			var param = $.trim($(this).attr("param"));
			if(param){
				param = "'"+items + "'," + param ;	
			}else{
				param = "'" + items + "'" ;
			}
			eval(fun + "("+param+")");
		});
	}
	//设置时间选择框的只读
	if(typeof("#begin_date")!="undefined"){
		$("#begin_date").attr("readonly",true);
	}
	if(typeof("#end_date")!="undefined"){
		$("#end_date").attr("readonly",true);
	}
}) ;

function doDrop(url,obj){
	if(!confirm('确定要执行删除操作吗？')){
		return ;
	}
	var id = $(obj).attr("data-id");
	$.ajax({
		url:url,
		data:{id:id},
		type:"post",
		dataType:"json",
		success:function(data){
			alert(data.msg);
			if(data.status==1){
				$(obj).parents('tr').remove();
			}
		}
	});
}
function closeDialog(){
	$(".ui-dialog-close").click();	
}

function is_int(str) {
	patten = /^-?[1-9]\d*$/;
	if (null == str.match(patten)) {
		return false;
	} else {
		return true;
	}
}

function is_decimal(str) {
	patten = /^-?\d+(?:\.\d+)?$/;
	if (null == str.match(patten)) {
		return false;
	} else {
		return true;
	}
}
function check_upload_file(input_name,last_names){
	var filepath = $('#'+input_name).val();
	var re = /(\\+)/g; 
	var filename=filepath.replace(re,"#");
	var one=filename.split("#");
	var two=one[one.length-1];
	var three=two.split(".");
	var last=three[three.length-1];
	last=last.toLowerCase();
	var tp = last_names;
	var rs=tp.indexOf(last);
	if(rs>=0){
		return true;
	}else{
		alert("您上传的文件不是有效的格式，请上传以下文件 "+last_names+" ！");
		$('#'+input_name).val('');
		return false;
	}
}

function f5(url){
	if(url == '')
		location.href = location.href ;	
	else
		location.href = url ;	
}
function fh(){
	history.back();	
}

/**
 * 格式化一个时间戳
 * @param ing time
 * @return date
 */
function formatTime(time){
	var d = new Date(time*1000);
	return d.getFullYear()+"-"+(checkTime(d.getMonth()+1))+"-"+checkTime(d.getDate())+" "+checkTime(d.getHours())+":"+checkTime(d.getMinutes())+":"+checkTime(d.getSeconds());	
}


function checkTime(i){
	if (i<10) 
	  {i="0" + i}
	  return i ;
}

function setSearchForm(){
	//var fh = document.getElementById("searchForm").style.display;
	var fh = $("#searchForm").css("display"); 
	if(fh == "none"){
		$("#searchForm").show() ;
		$("#searchFormImg").attr('src' ,  RES_URL + "/admin/images/nolines_minus.gif");
	}else{
		$("#searchForm").hide();
		$("#searchFormImg").attr('src' ,  RES_URL + "/admin/images/nolines_plus.gif");
	}
}

//=======================表单验证开始=======================
function cmf(msg , id){
	alert(msg);
	if(id != ""){
		$("#"+id).focus();	
	}
}
//=======================表单验证结束=======================

function checkPhone(phone){
	//验证电话号码手机号码，包含至今所有号段   
	var ab=/^(13[0-9]|15[0-9]|18[0-9])\d{8}$/;
	if(ab.test(phone) == false){
		return false;
	  }
	return true;
}

function checkEmail(email){   
	var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!myreg.test(email)){
		return false;
	}
	return true ;
}
function cf(url){
	if ($.isFunction(parent.create_frameTab))
		parent.create_frameTab(url);
	else
		location.href = url;
}

//检查图片的上传格式
function checkImage(str){
	if(/^.*?\.(gif|png|jpg|jpeg)$/.test(str.toLowerCase())){
		return true ;
	} else {
		alert("只能上传jpg、jpeg、png或gif格式的图片！");
		return false;
	}	
}

//初始化打开Dialog
function initDialog(url , title){
	url = url + "&animate=true";
	$(".virtue").attr("data-url" , url);
	$(".virtue").attr("data-title" , title);
	$(".virtue").click();
}

//URL验证
function isURL(url){
	//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	//判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
	//下面的代码中应用了转义字符"\"输出一个字符"/"
	var Expression=/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/; 
	var objExp=new RegExp(Expression);
	if(objExp.test(url)==true){
		return true;
	}else{
		return false;
	}
}

function len(s) { 
	var number = 0; 
	var a = s.split(""); 
	for (var i=0;i<a.length;i++) { 
		if (a[i].charCodeAt(0)<299) { 
			number++; 
		} else { 
			number+=2; 
		} 
	} 
	return l; 
}



function tips_pop(){
	var MsgPop=document.getElementById("winpop");
	var popH=parseInt(MsgPop.style.height);//将对象的高度转化为数字
	if (popH==0){
		MsgPop.style.display="block";//显示隐藏的窗口
		show=setInterval("changeH('up')",2);
	}else {
		hide=setInterval("changeH('down')",2);
	}
}
function changeH(str) {
	var MsgPop=document.getElementById("winpop");
	var popH=parseInt(MsgPop.style.height);
	if(str=="up"){
		if (popH<=100){
			MsgPop.style.height=(popH+8).toString()+"px";
		}
		else{
			clearInterval(show);
		}
	}
	if(str=="down"){
		if (popH>=4){
			MsgPop.style.height=(popH-4).toString()+"px";
		}
		else{
			clearInterval(hide);
			MsgPop.style.display="none";  //隐藏DIV
		}
	}
}

function checkMessage() { return ;
	$.post("?app=message&act=myMessage",null,function(data){
		if(data.success){
			//var msgIframe = "";
			//$("#messageBox").html(msgIframe);
			//$("#messageBox").show();
			//showBox() ;
			document.getElementById('winpop').style.height='0px';
			$("#msgTitle").html("&nbsp;&nbsp;&nbsp;&nbsp;"+data.title);
			$("#msgContent").html(data.content);
			tips_pop();
		}
	},'json') ;
}

function getRecommend(){
	/* 获取选中的项 */
	var recommmendItems = '';
	$('.recommmendType:checked').each(function(){
		recommmendItems += this.value + ',';
	});
	recommmendItems = recommmendItems.substr(0, (recommmendItems.length - 1));
	return recommmendItems ;
}



/**
 * 验证url格式
 * @author 刘阳(alexdany@126.com)
 * @date 2012-12-7 17:00:31
 */
function verUrl(url){ 
	var strRegex = "^((https|http|ftp|rtsp|mms)://)"  
	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
	+ "|" // 允许IP和DOMAIN（域名） 
	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
	+ "[a-z]{2,6})" // first level domain- .com or .museum  
	+ "(:[0-9]{1,4})?" // 端口- :80  
	+ "((/?)|" // a slash isn't required if there is no file name  
	+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  
	var re=new RegExp(strRegex);  
	if (re.test(url)){ 
		return (true);  
	}else{ 
		return (false);  
	} 
}// end of function verUrl


// 验证URL只能是本站域名
function verDomainUrl(url){ 
	var urlreg=/^(http(s)?:\/\/)?(www\.)?[ctrlv]+\.([c]{2})(\/[\w- .\/?%&=]*)?$/;
	if (!urlreg.test(url)){
		return false;
	}
	return true;
}

function getCaptcha(){
	$("#captchaCode").attr("src" , "?c=login&m=capt&is_ajax=1&rand="+Math.random());
}
