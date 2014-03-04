/*!
 * Copyright 2012, Athena UI Library
 * MIT Licensed
 * @ select
 * @author imbingdian@gmail.com
 * @build 2013/01/04
 */
/*global jQuery:false, utils:false, Handlebar:false */
;(function($) {
	/*
	 * Select CLASS definition
	 * @param {Object HTMLElement} el
	 * @param {Object} options 
	 */
    function Select(el, options) {
		this.$select = $(el);
		this.select_input_cls = options.select_input_cls;
		this.$input = $(el).find('.' + options.select_input_cls); //input元素
		this.$container = undefined;						//提示层
		this.container_cls = options.container_cls;			//提示内容显示容器class
		//console.log($('#' +options.container_cls + '-' + index).length > 0);
		//this.index = ( $('#' +options.container_cls + '-' + index).length > 0 ) ? ( index + 1 ) : index; //index
		this.container_id = options.container_cls + '-' + utils.uuid(); //提示内容显示容器id,每个提示层一个
		this.selected_cls = options.selected_cls;			//选中项class
		this.$selected_val_input =$(el).find('.' + options.selected_val_cls);	//选中项value值input
		this.api = options.api;								//suggest api
		this.params = options.params;						//suggest 参数
		//this.query_name = options.query_name;				//input查询name值
		this.query = '';									//查询值，默认为空
		this.cache = options.cache;							//是否使用缓存
		this.data_cache = {};								//数据缓存放在data_cache对象中
		this.delay = options.delay;							//提示延迟时间
		this.offset = options.offset;						//提示层和输入框的垂直偏离
		this.template = Handlebars.compile(options.tpl);	//使用Handlebars编译模板
		this.callback = options.callback || $.noop;
		
		this._is_running = false;							//记录计时器状态
		this.$selected_item = undefined;					//记录是否有选中状态
		
        this.init();
    }

	/*
	 * Public Select definition
	 */
    Select.prototype = {
        constructor: 'Select',
		
		/**
		 * init输入框
		 */
		_initInput: function() {
			var self = this,
				$input = self.$input,
				is_downing_or_uping = false, //是否持续按住 DOWN / UP 键;
				pressing_count = 0; //持续按住某键时，连续触发的keydown次数
			
			$input.attr('autocomplete', 'off');//关闭浏览器自动填充表单
			
			//keydown event
			$input.live('keydown', function(e) {
				var keyCode = e.keyCode;
				//console.log('keyCode:' + keyCode);
				
				//home end
				if (keyCode === 35 || keyCode === 36) {
                    return;
                }
				
				//esc 隐藏提示层并还原初始输入
                if ( keyCode === 27 || keyCode === 9 ) {
                    self._hide();
                    //input.value = self.query;
                } else if (keyCode > 32 && keyCode < 41) {
					//方向键，包括 PageUp, PageDown, End, Home, Left, Up, Right, Down
                    //如果输入框无值，按下以上键时，将响应转移到页面上，避免自动定焦导致的键盘导航问题
                    if ( !$input.val() ) {
                        $input.blur();
                    } else if (keyCode === 40 || keyCode === 38) { // DOWN, UP 键
                        // 按住键不动时，延时处理。这样可以使操作看起来更自然，避免太快导致的体验不好
                        if ( pressing_count++ === 0 ) {
							if (self._is_running) {
								self.stop();
							}
                            is_downing_or_uping = true;
							self._selectItem(keyCode === 40); //keyCode为40，为ture (down)
                        } else if ( pressing_count === 3 ) {
                            pressing_count = 0;
                        }
                        // webkit 内核下，input 中按 UP 键，默认会导致光标定位到最前
                        e.preventDefault();
                    }
                } else if ( keyCode === 13) {
					if ( self.$container.find('li').hasClass(self.selected_cls) ) {
						self._hide();
					} else {
						$input.blur(); //
					}
                    
				} else {
					if ( !self._is_running ) {
						self.start();
						is_downing_or_uping = false;
					}
				}
			});
			
			
			//keyup event
			$input.live('keyup', function() {
				pressing_count = 0;
			});
			
			//点击input显示
			$input.live('click', function(e) {
				e.stopPropagation();
				self.$container.siblings('.' + self.container_cls).hide();
				self._setContainerPosition();
				self.$container.show();
				//self._updateContent();
				//点击时请求全部数据
				if ( !self.query ) {
					self.query = '';
				}
				self._requestData();
			});
			
			//点击select之外的区域隐藏
			$('body').live('click', function() {
				$('.' + self.container_cls).hide();
			});
			
			//select 区域内元素点击阻止冒泡
			$('.' + self.container_cls).live('click', function(e) {
				e.stopPropagation();
			});
		},
		
				
		/**
		 * 插入suggest提示层
		 */
		_initContainer: function() {
			var container_cls = this.container_cls,
				container_id = this.container_id,
				$container = $('#' + container_id);
				
			if ( $container.length === 0 ) {
				$('body').append($('<div id="' +container_id+ '" class="' +container_cls+ '" style="position:absolute;display:none;"></div>'));
			}
			
			this.$container = $('#' + container_id);
		},
		
		/**
		 * 设置suggest提示层位置
		 */
		_setContainerPosition: function() {
			var $container = $('#' + this.container_id),
				$input = this.$input,
				_pos = $input.offset(),
				_left = _pos.left,
				_top = _pos.top + $input.outerHeight() + this.offset,
				_width = $input.outerWidth() - 2; //默认取css中设置的宽度，如果没有设置宽度，则根据input计算宽度，container默认有1px边框，需要-2
			
			//console.log('init container position...');
			$container.css({
				width: _width,
				left: _left,
				top: _top,
				zIndex: 999999
			});
		},
		
		/**
		 * suggest提示层相关事件
		 */
		_initContainerEvent: function() {
			var self = this,
				$input = self.$input,
				$container = self.$container,
				$results = $container.find('li');
			
			$results.live('mouseenter', function() {
				self._setItemSelect($(this));
				self._updateInputText();
			});
			$results.live('mouseleave', function() {
				self._removeSelectItem();
			});
			$results.live('click', function(e) {
				//self._removeSelectItem();
				e.stopPropagation();
				try {
                    $input.blur();
                } catch (e) {
                }
				self._hide();
			});
			
			$('.ui-dialog-close').live('click', function() {
				//self._hide();
				self.$container.remove();
			});
			
		},
		
		
		/**
		 * 更新内容
		 */
		_updateContent: function() {
			var $input = this.$input,
				cache = this.cache,
				input_val = $input.val(),
				q;
			
			//检测输入值是否更新
			if ( input_val !== '' && input_val === this.query ) {
				return;
			}
			
			//更新this.query值
			q = this.query = input_val;
			
			if ( cache ) {
				if (this.data_cache[q] !== undefined) {  //存在缓存数据，取缓存
					//console.log('use cache');
					this._fillContent(this.data_cache[q]);
					this._display();
					if (typeof this.callback === 'function') {
						this.callback(self.$input, true);
					}
				} else {
					//console.log('no cache, will load data from server...');
					this._requestData();
				}
				
			} else {
				//console.log('load data from server...');
				this._requestData();
			}
		},
		
		/**
		 * 请求api数据
		 */
		_requestData: function() {
			var self = this,
				api = self.api,
				q = self.query,
				timestamp = new Date().getTime(),
				params = self.params;
			
			params.q = q;
			params.timestamp = timestamp; //api增加时间戳
			
			$.ajax({
				url: api,
				data: params,
				dataType: 'json',
				success: function(data) {
					if ( data.result.length !== 0 ) {
						self._handleResponse(data);
						
						if (typeof self.callback === 'function') {
							self.callback(self.$input, true);
						}
					} else {
						self.$container.html('');
						//self.callback();
						if (typeof self.callback === 'function') {
							self.$container.hide();
							self.callback(self.$input);
						}
					}
					
					//console.log('load data success');
				},
				error: function() {
					//console.log('load data error');
				}
			});
		},
		
		/**
		 * 处理返回的请求数据
		 * @param {Object} data
		 */
		_handleResponse: function(data) {
			var html = this._renderContent(data);
			
			// html不为空
			if ( html ) {
				this._fillContent(html);
				//缓存数据
				if ( this.cache ) {
					this.data_cache[this.query] = html;
				}
				
				this._display();
			} else {
				this._hide();
			}

		},
		
		
		/**
		 * 渲染内容，将data数据处理为html
		 * @param {Object} data
		 */
		_renderContent: function(data) {
			var template = this.template,
				content = template(data);
				
			//console.log('render container...');
			return content;
		},
		
		/**
		 * 填充内容,将html插入提示层
		 * @param {String} html
		 */
        _fillContent:function (html) {
			//console.log('fill content ...');
            this.$container.html($(html));
            this.$selected_item = undefined; // 填充，需要重置selected_item
        },
		
		
		/**
		 * 提示层选择
		 * @param {String} Boolean 方向键是否向下
		 */
		_selectItem: function(down) {
			var self = this,
				$results = self.$container.find('li'),
				$selected_item = self.$selected_item,
				$new_selected_item,
				len = $results.length,
				selected_index;
			
			if ( len === 0 ) {
				return;
			}
			
			if ( !self._visible() ) { //如果被隐藏，则显示出来
				self._show();
			}
			
			if ( !$selected_item ) { //如果没有选中项，指定第一个或最后一个为选中项
				$new_selected_item = $results.eq(down ? 0 : len - 1);
				
			} else {
				selected_index = $results.index(this.$selected_item) +  (down ? 1 : -1);
				
				if ( selected_index !== -1 && selected_index !== len) {
					$new_selected_item = $results.eq(selected_index);
				} else {
					this.$input.val(this.query);
				}
			}
			
			//移除当前选中项
			self._removeSelectItem();
			
			if ( $new_selected_item ) {
				self._setItemSelect($new_selected_item);
				self._updateInputText();
			} 
		},
		
		/**
		 * 移除选中操作
		 */
		_removeSelectItem: function() {
			if ( this.$selected_item )  {
				this.$selected_item.removeClass(this.selected_cls);
				this.$selected_item = undefined;
			}
		},
		
		/**
		 * 选中操作
		 */
		_setItemSelect: function($item) {
			$item.addClass(this.selected_cls);
			this.$selected_item = $item;
			this.$input.focus();
		},
		
		/**
		 * 获取选中状态的值，填入input
		 */
		_updateInputText: function() {
			var txt = this.$selected_item.text(),
				val = this.$selected_item.attr('data');
			
			//console.log(this.$selected_val_input.val());
			//console.log(this.$select);
			this.$input.val(txt);
			this.$selected_val_input.val(val);
		},
		
		/**
		 * 启动定时器，开始监听用户输入
		 */
		start: function() {
			var self = this,
				delay = self.delay;
			
			//连续输入清除定时器
			clearTimeout(self._timer);
			
			self._timer = setTimeout(function() {
				//console.log('start render data...');
				self._updateContent();
			}, delay);
		},
		
		/**
		 * 停止计时器
		 */
		stop: function() {
			var _timer = this._timer;
			
			if ( _timer ) {
				clearTimeout(_timer);
			}
			this._is_running = false;
		},
		
		
		/**
		 * suggest提示层是否可见
		 */
		_visible: function() {
			return this.$container.is(":visible");
		},
		
		/**
		 * 显示suggest提示层
		 */
		_show: function() {
			if ( this._visible() ) {
				return;
			}
			this._setContainerPosition();
			this.$container.show();
		},
		
		/**
		 * 隐藏suggest提示层
		 */
		_hide: function() {
			this.$container.html('');
			
			if ( !this._visible() ) {
				return;
			}
			this.$container.hide();
			
		},
		
		/**
		 * 根据 contanier有无内容，显示或隐藏提示层
		 */
		_display: function() {
			var self = this;
			
			//console.log(self.$container.text());
			if ( $.trim(self.$container.text()) ) {
				self._show();
			} else {
				self._hide();
			}
		},
		
		/**
		 * 窗口缩放时重新定位suggest提示层
		 */
		_doResize: function() {
			var self = this,
				timer;
			
			$(window).bind('resize', function() {
				if ( timer ) {
					clearTimeout(timer);
				}
				//console.log('resize');
				timer = setTimeout(function() {
					self._setContainerPosition();
				}, 100);
			});
		},
		
		/**
		 * init
		 */
        init: function() {
			this._initInput();
			this._initContainer();
			this._setContainerPosition();
			this._initContainerEvent();
			this._doResize();
        }
    };
    
    /*
	 * Select plugin definition
	 */
	$.fn.select = function(option) {
		var	options = $.extend({}, $.fn.select.defaults, option);
		return this.each(function() {
			if ( !$.data(this, 'plugin_select') ) {
                $.data(this, 'plugin_select', new Select(this, options) );
            }
		});
	};
    
	/*
	 * Default options
	 */
	$.fn.select.defaults = {
		api: '',											//select api
		params: {},											//其它参数
		cache: false,										//请求数据是否使用缓存
		delay: 200,											//提示延迟
		offset: 1,											//默认向上1px, 使提示层刚好遮住input下边框
		select_input_cls: 'ui-select-input',				//select input 框
		selected_val_cls: 'ui-select-value',				//select 隐藏input,记示select的value
        container_cls: 'ui-select-container',				//suggest container 
        selected_cls: 'ui-select-hover',						//select选中状态class
        tpl: '<ul>{{#each result}}<li data="{{id}}">{{name}}</li>{{/each}}</ul>',	//select数据渲染模板,优先取data值
		callback: null	//没有数据时callback
	};
	
}(jQuery));