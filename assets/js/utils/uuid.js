/*!
 * uuid
 * 定时器检测是否有新的内容
 */

/*global jQuery:false, utils: true */
;(function(utils, $){
	utils.uuid = function(a, b){
		for( b=a=''; a++<36; b+=a*51&52 ? ( a^15 ? 8^Math.random()*(a^20?16:4):4).toString(16): '-'){}
		return b;
	}
})(window.utils = window.utils || {});



