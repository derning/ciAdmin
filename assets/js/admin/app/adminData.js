// JavaScript Document
$(function(){
	setTable();
	isShowReason();
	tongjiTr();
	banTr();
	$("li a").live('click' , function(data){
		$("li").removeClass('active');
		$(this).parents('li').addClass('active');
		type = $(this).attr("type");
		setTable();
	});
	
	$(".ss").live('click' , function(){
		isShowReason();
	});
	
	$(".tc").live('click' , function(){
		tongjiTr();
	});

	$(".ban").live('click' , function(){
		banTr();
	});
});


function checkForm(){
	var pd ;
	if(type == "base"){
		var site_state 	= $('input:radio[name="site_state"]:checked').val() ;
		var reason	 	= $.trim($("#reason").val());
		var name 		= $.trim($("#name").val());
		var title 		= $.trim($("#title").val());
		var keywords 	= $.trim($("#keywords").val());
		var description = $.trim($("#description").val());
		var isTongji 	= $('input:radio[name="isTongji"]:checked').val() ;
		var tongji 		= $.trim($("#tongji").val());
		
		if(site_state == 2){
			if(!reason){
				alert('您还没有填写网站关闭的原因');
				$("#reason").focus();
				return false ;
			}
		}
		if(!name){
			alert('您还没有填写网站名称');
			$("#name").focus();
			return false ;
		}
		if(!title){
			alert('您还没有填写网站名称');
			$("#title").focus();
			return false ;
		}	
		
		if(!keywords){
			alert('您还没有填写网站关键词');
			$("#keywords").focus();
			return false ;
		}		
		
		
		if(!description){
			alert('您还没有填写网站名描述');
			$("#description").focus();
			return false ;
		}
		
		pd = { "type":type , "site_state":site_state , "reason":reason , "name":name ,  "title":title , "keywords":keywords , "description":description , "isTongji":isTongji , "tongji":tongji };
	}else if(type == "admin"){
		var adminLog	= $('input:radio[name="adminLog"]:checked').val() ;
		var adminImage	= $('input:radio[name="adminImage"]:checked').val() ;
		
		pd = {"type":type , "log":adminLog , "image":adminImage};
	}else if(type == "mail"){
		var mailHost = $.trim($("#mailHost").val());
		var mailPort = $.trim($("#mailPort").val());
		var mailUser = $.trim($("#mailUser").val());
		var mailPass = $.trim($("#mailPass").val());
		
		if(!mailHost){
			cmf("您还没有填写邮箱的主机地址" , "mailHost") ;
			return false ;
		}
		if(!mailPort){
			cmf("您还没有填写邮箱的主机端口" , "mailPort") ;
			return false ;
		}		
		if(!mailUser){
			cmf("您还没有填写邮箱地址" , "mailUser") ;
			return false ;
		}		
		if(!mailPass){
			cmf("您还没有填写邮箱登录密码" , "mailPass") ;
			return false ;
		}		
		
		pd = {"type":type , "host":mailHost , "port":mailPort , "user":mailUser , "pass":mailPass};
	}else if (type == 'ban'){
		var keywords = $.trim($("#banKeywords").val());
		var exchange = $.trim($("#banExchange").val());
		var isUse	 = $('input:radio[name="banUse"]:checked').val() ;
		
		
		if(!keywords){
			cmf("您还没有填写禁忌词语" , "keywords") ;
			return false ;
		}
		if(!exchange){
			cmf("您还没有填写替换词语" , "exchange") ;
			return false ;
		}		
		
		pd = {"type":type , "isUse":isUse , "exchange":exchange , "keywords":keywords};
	}else if (type == "blacklist"){
		var check = $('input:radio[name="blacklistCheck"]:checked').val() ;
		var keywords = $.trim($("#blacklistKeywords").val());
		
		if(!check){
			cmf("您还没有选择状态" , "check") ;
			return false ;
		}
		if(!keywords){
			cmf("您还没有填写禁用用户" , "keywords") ;
			return false ;
		}		
		
		pd = {"type":type , "check":check , "keywords":keywords};
	}else if (type == "IP"){
		var keywords 	= $.trim($("#IPList").val());
		var isUse		= $('input:radio[name="IPCheck"]:checked').val() ;
		pd = {"type":type , "isUse":isUse , "keywords":keywords};
	}
	
	
	$.post(aUrl , pd , function(data) {
		alert(data.msg);
	} , 'json');
	
	return false ;
}


function mailTest(){
	var mailHost 	= $.trim($("#mailHost").val());
	var mailPort 	= $.trim($("#mailPort").val());
	var mailUser 	= $.trim($("#mailUser").val());
	var mailPass 	= $.trim($("#mailPass").val());
	var toMail 		= $.trim($("#toMail").val());
	
	if(!mailHost){
		cmf("您还没有填写邮箱的主机地址" , "mailHost") ;
		return false ;
	}
	if(!mailPort){
		cmf("您还没有填写邮箱的主机端口" , "mailPort") ;
		return false ;
	}		
	if(!mailUser){
		cmf("您还没有填写邮箱地址" , "mailUser") ;
		return false ;
	}		
	if(!mailPass){
		cmf("您还没有填写邮箱登录密码" , "mailPass") ;
		return false ;
	}
	if(!toMail){
		cmf("请填写测试发送的邮箱地址" , "toMail") ;
		return false ;
	}
	
	pd = {"toMail":toMail , "host":mailHost , "port":mailPort , "user":mailUser , "pass":mailPass};
	
	$.post(aUrl , pd , function(data) {
		alert(data.msg);
	} , 'json');
	
	return false ;	
}

//功能区块是否显示
function setTable(){
	$(".setting").hide();
	$("." + type).show();
	if(type == 'cache'){
		$(".post").hide();
	}else{
		$(".post").show();
	}
}

function tongjiTr(){
	var isTongji 	= $('input:radio[name="isTongji"]:checked').val() ;
	if(isTongji == 1){
		$(".tjCode").show();
	}else{
		$(".tjCode").hide();
	}
}

function banTr(){
	var banUse 	= $('input:radio[name="banUse"]:checked').val() ;
	if(banUse == 1){
		$(".banTr").show();
	}else{
		$(".banTr").hide();
	}
}


//关闭原因是否显示
function isShowReason(){
	var siteState = $('input:radio[name="site_state"]:checked').val() ;
	if(siteState == 1){
		$(".reason").hide();
	}else{
		$(".reason").show();
	}
}


function cacheCrlear(type) {
	if(confirm('确认要执行该操作吗')) {
		$.post(aUrl , { "type":type } , function(data) {
			pButton(1);
			alert(data.msg);
			pButton(0);
		} , 'json');
	}
}