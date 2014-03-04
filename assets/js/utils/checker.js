/*!
 * checker
 * 定时器检测是否有新的内容
 */

/*global jQuery:false, utils: true */
;(function(utils, $){
	/**
	* 定时器
	* http://stackoverflow.com/questions/7279567/how-do-i-pause-a-windows-setinterval-in-javascript
	* @param {Function} callback
	* @param {Number} number
	*/
	function RecurringTimer(callback, delay) {
		var timerId, start, remaining = delay;
	
		this.pause = function() {
			window.clearTimeout(timerId);
			remaining -= new Date() - start;
		};
	
		var resume = function() {
			start = new Date();
			
			//清除定时器，防止重复执行
			if (timerId) {
				window.clearTimeout(timerId);
			};
			timerId = window.setTimeout(function() {
				remaining = delay;
				resume();
				callback();
			}, remaining);
		};
	
		this.resume = resume;
	
		this.resume();
	}
		
	/*
	 * checker
	 * @params {Object} options
	 */
	function checker(options) {
		var interval = options.interval,
			checklist = options.checklist,
			scroll = options.scroll,
			offset = options.offset,
			len = checklist.length,
			i = 0,
			timer,
			_recurring,
			height = 0;
		
		/*
		 * 获取checklist中的function
		 */
		function checkerMethods() {
			for (name in checklist) {
				if (typeof checklist[name] === 'function') {
					checklist[name]();
				}
			}
		}	
		
		
		_recurring = new RecurringTimer(checkerMethods, interval);
		
		/*
		 * 滚动时清除定时器
		 */
		if ( scroll ) {
			$(window).bind('scroll', function() {
				if ( timer ) {
					clearTimeout(timer);
				}
				
				timer = setTimeout(function() {
					height = $(window).scrollTop();
					if ( height > offset ) {
						_recurring.pause();
					} else {
						_recurring.resume();
					}
				}, 200);
			});
		}
		
	}
	
	//向外暴露checker
	utils.checker = checker;

})(window.utils = window.utils || {}, jQuery);



