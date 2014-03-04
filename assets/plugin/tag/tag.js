/*!
 * Copyright 2012, Athena UI Library
 * MIT Licensed
 * @ tag
 * @author imbingdian@gmail.com
 * @build 2013/01/04
 */
/*global jQuery:false, Handlebar:false */
;(function($) {
	
	/*
	 * Tag CLASS definition
	 * @param {Object HTMLElement} el
	 * @param {Object} options 
	 */
	var Tag = function(el, options, index) {
		this.tags = options.tags;
		this.container_cls = options.container_cls;
		this.template = Handlebars.compile(options.tpl);
		this.$input = $(el).find('.' + options.input_cls);
		this.index = index;
		
		this.init();
	};
	
	
	/*
	 * Public Tag definition
	 */
	Tag.prototype = {
		constractor: 'Tag',
		
		/**
		 * 插入tag提示层
		 */
		_initContainer: function() {
			var container_cls = this.container_cls + '-' + this.index,
				$container = $('.' + this.container_cls),
				tag_html = this.template(this.tags);
				
			$('body').append($('<div class="' +container_cls+ ' ' +this.container_cls+ ' clear" style="position:absolute;display:none;">' + tag_html+ '<a class="ui-tag-close" href="javascript:void(0)">关闭</a></div>'));
			
			this.$container = $('.' + container_cls);
			
		},
		
		
		/**
		 * 设置tag提示层位置
		 */
		_setContainerPosition: function() {
			
			var $container = this.$container,
				$input = this.$input,
				_pos = $input.offset(),
				_left = _pos.left,
				_top = _pos.top - $container.outerHeight(),
				_width = $input.outerWidth() - 44; //默认取css中设置的宽度，如果没有设置宽度，则根据input计算宽度，container默认有1px边框，需要-2
			
			$container.css({
				width: _width,
				left: _left,
				top: _top,
				zIndex: 999998
			});
		},
		
		/*
		 * input 事件
		 */
		_initInput: function() {
			var self = this;
			
			this.$input.live('click', function(e) {
				e.stopPropagation();
				self._setContainerPosition();
				$('.' + self.container_cls).hide();
				self.$container.show();
			});
			
			//esc 键隐藏提示层
			this.$input.live('keyup', function(e) {
				var keyCode = e.keyCode;
				
				if ( keyCode === 27 ) {
					self.$container.hide();
				}
			});

		},
		
		/*
		 * tag提示层事件
		 */
		_initContainerEvent: function() {
			var self = this;

			this.$container.find('div').delegate('a', 'click', function(e) {
				var tag = $.trim($(this).text());
				e.stopPropagation();
				self._updateTag(tag);
			});
			
			this.$container.live('click', function(e) {
				e.stopPropagation();
			});
			
			
			
			$('body, .ui-dialog-close, .ui-tag-close').live('click', function() {
				$('.ui-tag-container').hide();
			});
			$('.position-select input').live('focus', function() {
				$('.ui-tag-container').hide();
			});
			
		},
		
		
		/*
		 * 更新tag
		 * @param {String} tag
		 */
		_updateTag: function(tag) {
			
			var tags = this.$input.val(),
				tags_arr = tags.length > 0 ? (tags.split(',')) : [],
				len = tags_arr.length,
				i = 0;
			
			if ( tag !== '' && tag !== '关闭' ) {
				tag = tag.replace(/[，| |,,]/g,",");// 中文逗号替换
				
				if ( len === 0 ) {
					tags = tag;
				} else {
					//检查input中是否已经存在该tag
					for ( i ; i < len; i ++) {
						if ( tag === tags_arr[i] ) {
							return;
						}
					}
					
					tags = tags + ',' + tag;
				}

				//更新input value
				this.$input.val(tags);
			}
		},
		
		
		/**
		 * 窗口缩放时重新定位tag提示层
		 */
		_doResize: function() {
			var self = this,
				timer;
			
			$(window).bind('resize', function() {
				if ( timer ) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					self._setContainerPosition();
				}, 50);
			});
		},
		
		/*
		 * init
		 */
		init: function() {
			this.$input.addClass('tag-input-' + this.index);
			
			this._initContainer();
			this._initContainerEvent();
			this._initInput();
			this._doResize();
		}
	}
	
    /*
	 * Tag plugin definition
	 */
	$.fn.tag = function(option) {
		var	options = $.extend({}, $.fn.tag.defaults, option);
		return this.each(function(index) {
			if ( !$.data(this, 'plugin_tag') ) {
                $.data(this, 'plugin_tag', new Tag(this, options, index) );
            }
		});
	};
	
	
	/*
	 * Default options
	 */
	$.fn.tag.defaults = {
		tags: [],
		container_cls: 'ui-tag-container',
		input_cls: 'ui-tag-input',
		tpl: '<a href ="javascript:void(0);">{{.}}</a>'
	};
	
}(jQuery));