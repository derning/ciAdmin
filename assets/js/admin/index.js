/**
 * @index.js
 * @description:index js for admin
 *
 * @author: imbingdian@gmail.com 
 * @build:2013-08-15
 */
;(function($) {
	
	/*
	 * 设置iframe遮罩层的初始高度，以使进度条显示在合适的位置
	 */
	function setFrameMask() {
		var height = $(window).height() - $('#main-frame').offset().top;
		$('#main-frame-mask').height(height);
	}
	setFrameMask();
	
	
	/*
	 * fixed
	 */
	$(function() {
		$('.nav').fixed({
			fix_margin: -10
		});
	});
	
	/*
	 * 点击侧边栏菜单链接替换内容区域iframe
	 */
	$('a.hash-link').on('click', function() {
		var url = $(this).attr('data-url') || $(this).attr('href'),
			$parent = $(this).parent('li');
		
		if ( url ) {
			$('#main-frame').attr('src', url);
			$('#main-frame-mask').show();
			
			if ( $(this).hasClass('nav-link') ) {
				$parent.siblings('li').removeClass('cur');
				$parent.addClass('cur');
			} 
		}
		
		return false;
	});
	
	/*
	 * 侧边栏nav交互
	 */
	// 点击父分类
	$('.nav-link').on('click', function() {
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
		$parent.siblings('li').removeClass('cur-expand');
	});
	
	// 点击子分类
	$('.sub-nav-link').on('click', function() {
		var $parent = $(this).parent('li'),
			$parents = $(this).parents('.parent');
			
		$parent.addClass('cur').siblings('li').removeClass('cur');
		$parents.removeClass('expand').addClass('cur cur-expand');
		$parents.siblings('li').removeClass('cur cur-expand').find('li').removeClass('cur');
	});
	
}(jQuery));
 
 
