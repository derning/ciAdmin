/*!
 * dialog
 */
/*global jQuery:false */
;(function($) {
	
    /**
	* Dialog CLASS definition
	*/
    function Dialog() {
		this.flag = true;
    }
    
	/**
	 * parseQuery
	 * @param {String} query
	 */
	function _parseQuery(query) {
		var params = {},
			pairs = query.split(/[;&]/),
			len = pairs.length,
			i,
			key_val,
			key,
			val;
			
            if ( ! query ) {
				return params; //return empty object
			}
            
            for ( i = 0; i < len; i++ ) {
                key_val = pairs[i].split('=');
                if ( !key_val || key_val.length !== 2 ) {
					continue;
				}
                key = decodeURI( key_val[0] );
                val = decodeURI( key_val[1] );
                val = val.replace(/\+/g, ' ');
                params[key] = val;
            }
		
        return params;
	
	}
	
	/**
	 * Public method definition
	 * @param {Object HTMLElement} el
	 * @param {Object} options 
	*/
    Dialog.prototype = {
        constructor: Dialog,
		
		/**
		 * dialogShow
		 * @param {String} url
		 * @param {String} title
		 */
        dialogShow: function(url, title, description) {
            var self = this,
				$top = $(window.top.document),
				query_string = url.replace(/^[^\?]+\??/,''),//？id=1002&width=800&height=450,
                params = _parseQuery(query_string),
                width = params.width,//dialog 宽度
                height = params.height,//dialog 高度                
                animate = params.animate || 'false',//string: default false
				type = params.dialog_type || 'ajax',//string: ajax/url/flash/image, default ajax
				show_title = params.show_title || 'true',//string: default true
				title_height = 61,
				bdHeight = height - title_height,
				margin_left = -width/2,
                win_height = $(window).height(),
                scroll_top = $(window).scrollTop(),
                _top = (win_height - height) * 0.4 + scroll_top,
                top_pos = _top > 0 ? _top : scroll_top,
                overlay_html = '<div id="overlay"></div>',
                dialog_html,
				title_html = '',
				frame_height,
				overlay_exist = $('#overlay').length > 0 ? true : false;
			
			//show
			function show(html) {
				var $dialog;
				
				$top.find('body').append(html);
				$dialog = $top.find('.ui-dialog');
				//ainamate
				if ( animate === 'true') {
					$dialog.animate({
						top: top_pos
					}, 500);
				} else if ( animate === 'fade') {
					$dialog.css({
						display: 'none',
						top: top_pos
					});
					$dialog.fadeIn();
				} else {
					$dialog.css({
						top: top_pos
					});
				}
			}
			
			//if the overlay div exist, remove $('.ui-dialog')
            if ( overlay_exist > 0 ) {
				overlay_html = '';
			}
			
			//show title
			if ( show_title === 'true' ) {
				if ( description ) {
					title_html = '<div class="ui-dialog-hd"><h2>'+ title +'</h2><p>'+ description +'</p></div>';
				} else {
					title_html = '<div class="ui-dialog-hd"><h2 class="ui-dialog-title">'+ title +'</h2></div>';
				}
			}
			
			//url type
			if ( type === "ajax" ) { //ajax
				$.ajax({
					url: url,
					dataType: 'html',
					success: function(data) {
						dialog_html = '<div class="ui-dialog" style="width:'+ width +'px; height:'+ height +'px; margin-left:'+ margin_left +'px;">'+
									title_html+
									'<div class="ui-dialog-bd scrollbar clear" style="height:'+ bdHeight +'px;">'+
									data+
									'</div><div class="ui-dialog-ft"></div><span class="ui-dialog-close">X</span></div>';
						
						show( overlay_html + dialog_html);
						
						self.flag = true;
					},
					error: function() {
						dialog_html = '加载失败，请稍后再试。';
						self.flag = true;
					}
				});
			} else if ( type === "iframe" ) { // iframe
				//frame height
				if ( show_title === 'true' ) {
					frame_height = height - title_height;
				} else {
					frame_height = height;
				}
				dialog_html = '<div class="ui-dialog" style="width:'+ width +'px; height:'+ height +'px; margin-left:'+ margin_left +'px;">'+ 
							title_html+ 
							'<div class="ui-dialog-bd clear">'+ 
							'<iframe frameborder="0" allowtransparency="true" style="background-color:transparent"  width="'+ width +'" height="'+ frame_height +'"  src="' +url+ '" class="scrollbar"></iframe>'+ 
							'</div><div class="ui-dialog-ft"></div><span class="ui-dialog-close">X</span></div>';
				
				show( overlay_html + dialog_html);
				
				self.flag = true;
			}
 
        },
		
		/**
		 * dialog close
		 */
        dialogClose: function() {
			var len = $('.ui-dialog').length,
				$parent;
			
			if ( len === 1) {
				//如果有1个ui-dialog时，遮罩层remove
				$('.ui-dialog').remove();
				$('#overlay').remove();
			} else {
				//如果有多个ui-dialog时，遮罩层不remove
				$('.ui-dialog:last').remove();
			}
			
			this.flag = true;
			// window.frames['main-frame'].$.dialog.flag = true;
        },
		
		/**
		 * init
		 */
        init: function() {
            var self = this;
			
            // 显示弹出层
			$(document).on('click', '.dialog', function(e) {
				
				e.preventDefault();
				
				if ( self.flag ) {
					var title = $(this).attr('data-title'),
						url = $(this).attr('data-url'),
						description = $(this).attr('description');
					
					self.dialogShow(url, title, description);	
					self.flag = false;
				}
			});
			
			// 关闭弹出层
			$(document).on('click', '.ui-dialog-close', function(e) {
                self.dialogClose();
				self.flag = true;
            });
			
        }
    };
    
    var dialog = new Dialog();
    
    $.dialog = dialog;
    $.dialog.init();
}(jQuery));