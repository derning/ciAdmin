//确认删除
function confirmDelete(id){
	if(!confirm("确认删除？")){
		return;
	}
	ajaxDelete(id);
}

//ajax删除
function ajaxDelete(id){
	$.post(
		aUrl+"&act=delete",
		{id:id},
		function(data){
			alert(data.msg);
			if(data.success){
				window.location.href= location.href;
			}
		},
		'json'
	);
}

function getCheckedIds(){
	var ids="";
	var tmp_id;
	$("input:checkbox").each(function(){
		if ($(this).attr("checked")=="checked") {
			tmp_id=$(this).attr("data-id");
			if (tmp_id) {
				if (ids) {
					ids += ",";				
				}
				ids += tmp_id;
			}
		}
	});
	return ids;
}

function followCheck(obj) {
	if ($(obj).attr("checked")=="checked") {
		$("input:checkbox").attr("checked","checked");	
	}else{
		$("input:checkbox").removeAttr("checked");
	}
}

function showSelectDialog(act,title,extra_param){
	var dialog_width=600;
	var dialog_height=520;
	href= "?app=select&act="+act+"&data_title="+Url.encode(title)+"&width="+dialog_width+"&height="+dialog_height+"&type=ajax";
	$.dialog.dialogShow(href,title);
}

//只显示单个dialog
$(".single-dialog").die().live("click",function(){
	var tmp = $(".ui-dialog");
	setTimeout(function(){
		tmp.remove();
	}, 100);
	var title = $(this).attr('data-title'),
	url = $(this).attr('data-url'),
	description = $(this).attr('description');
	$.dialog.dialogShow(url, title, description);	
});


//dialog GET提交数据
function dialogSubmit(form){
  var url = $(form).attr("action");
  var title = $(".ui-dialog-hd").text();
  url += "&data_title="+Url.encode(title);
  $(form).find("input[type=text]").each(function(){								 
	 url += "&"+$(this).attr("name")+"="+Url.encode($(this).val());
  });
  $(form).find("input[type=hidden]").each(function(){
	url += "&"+$(this).attr("name")+"="+Url.encode($(this).val());
  });
  $(form).find("select").each(function(){
	url += "&"+$(this).attr("name")+"="+Url.encode($(this).val());
  });
  $(form).find("input[type=checkbox]").each(function(){
	  if($(this).attr("checked")=="checked")
		url +="&"+$(this).attr("name")+"="+$(this).val();
  });
  url += "&height=520&width=600&type=ajax";
  var tmp=$(".ui-dialog");
  setTimeout(function(){
	tmp.remove();
  }, 100);
  $.dialog.dialogShow(url, title);
  return false;	
}

//-------------------------------------------------------------------------------------------------------------- url编码
var Url = {
 
    // public method for url encoding
    encode : function (string) {
        return escape(this._utf8_encode(string));
    },
 
    // public method for url decoding
    decode : function (string) {
        return this._utf8_decode(unescape(string));
    },
 
    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
 
        for (var n = 0; n < string.length; n++) {
 
            var c = string.charCodeAt(n);
 
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
 
        }
 
        return utftext;
    },
 
    // private method for UTF-8 decoding
    _utf8_decode : function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;
 
        while ( i < utftext.length ) {
 
            c = utftext.charCodeAt(i);
 
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
 
        }
 
        return string;
    }
}	