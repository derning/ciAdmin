/*!
 * Copyright ctrlv.cc, All rights reserved
 * @fixed.js
 * @description: fixed
 *
 * @author:imbingdian@gmail.com
 * @build:2013-04-10
 */
/*global jQuery:false */
;(function($){
	
	var ie6 = $.browser.msie && $.browser.version == 6.0,
		$win = $(window);
    /*
	 * Fixed CLASS definition
	 * @param {Object HTMLElement} el
	 * @param {Object} options 
	 */
    function Fixed(el, options) {
		this.$element = $(el);
		this.fix_margin = options.fix_margin;	//fixed后距离顶部距离
		this.origin_top = this.$element.offset().top; //原来距离顶部距离
		
		this.origin_tyles = { //原来的样式,用于恢复初始状诚
			position: this.$element.css('position'),
			marginTop: this.$element.css('margin-top'),
			marginBottom: this.$element.css('margin-bottom'),
			top: this.$element.css('top'),
			bottom: this.$element.css('bottom')
		};
		
		this._init();
    }

	/*
	 * Public Fixed definition
	 */
    Fixed.prototype = {
        constructor: 'Fixed',
		
		/*
		 * fix top
		 */
		_fixTop: function($element, origin_tyles, origin_top, fix_margin) {
			var scrollTop = $win.scrollTop(),
				distance = origin_top - scrollTop; //计算元素距离当前窗口上方的距离;
			
			if ( !ie6 ) {// 非ie6
				// 当距离小于等于预设的值时
                // 将元素设为 fix 状态
                if ( !$element.data('_fixed') && distance <= fix_margin ) {
                    $element.css({
                        position: 'fixed',
                        top: fix_margin
                    });
                    $element.data('_fixed', true);
                } else if ($element.data('_fixed') && distance > fix_margin) {
                    // 恢复原有的样式
                    $element.css(this.origin_tyles);
                    $element.data('_fixed', false);
                }
			} else {// ie6
				// 当距离小于等于预设的值时
                // 将元素设为 fix 状态
				/*
                if (distance <= fix_margin) {
                    $element.css({
                        position: 'absolute',
                        top: fix_margin + scrollTop
                    });
                    $element.data('_fixed', true);
                } else if ($element.data('_fixed') && distance > fix_margin) {
                    // 恢复原有的样式
                    $element.css(origin_tyles);
                    $element.data('_fixed', false);
                }*/
			}
		},
		
		/**
		 * 滚动事件
		 */
		_bindEvent: function() {
			var self = this,
				$element = this.$element,
				fix_margin = this.fix_margin,
				origin_top = this.origin_top,
				origin_tyles = this.origin_tyles;
				

			$win.bind('scroll', function() {
				self._fixTop($element, origin_tyles, origin_top, fix_margin);
			});
		},
		
		_init: function() {
			var $element = this.$element;
			
			// 一个元素指允许绑定一次
			if ($element.data('bind-fixed')) {
				//return;
			}
			
			// 绑定滚动事件
			this._bindEvent();
			$element.data('bind-fixed', true);
		}
    };
    
    /*
	 * Fixed plugin definition
	 */
	$.fn.fixed = function(option) {
		var	options = $.extend({}, $.fn.fixed.defaults, option);
		return this.each(function() {
			var fixed = new Fixed(this, options);
		});
	};
    
	/*
	 * Default options
	 */
	$.fn.fixed.defaults = {
		fix_margin: 0
	};
	
})(jQuery);

/*
 * Todo
 * fix ie6
 *
 */
