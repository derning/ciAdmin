<div class="content-wrap">
	<div id="content" class="main-content">
<style>
body {
	background-color: #f6f6f8 !important;
}
</style>
	    <div class="main-section">
			<div class="main-section-hd">
				<h2>公告通知</h2>
			</div>
			<div class="main-section-bd">
				<ol class="main-list">
					<li class="first"><a href="">2011国庆节放假通知（22）</a><span>（2011-01-11）</span></li>
					<li><a href="">2012国庆节放假通知（134）</a><span>（2012-02-12）</span></li>
					<li><a href="">2013国庆节放假通知（23）</a><span>（2013-03-13）</span></li>
					<li><a href="">2014国庆节放假通知（9）</a><span>（2014-04-14）</span></li>
					<li><a href="">2015国庆节放假通知（566）</a><span>（2015-05-15）</span></li>
					<li><a href="">2016国庆节放假通知（135）</a><span>（2016-06-16）</span></li>
					<li><a href="">2017国庆节放假通知（57）</a><span>（2017-07-17）</span></li>
					<li><a href="">2018国庆节放假通知（24）</a><span>（2018-08-18）</span></li>
				</ol>
			</div>
		</div><!-- /.main-section -->
		
		<div class="main-section">
			<div class="main-section-hd">
				<h2>工作流</h2>
			</div>
			<div class="main-section-bd">
				<ul id="workflow-tabs" class="clear">
					<li data-tab="sect1" class="first"><a href="javascript:void(0);">我发起的<span>(10)</span></a><i></i></li>
					<li data-tab="sect2"><a href="javascript:void(0);">我的待办<span>(6)</span></a><i></i></li>
					<li data-tab="sect3"><a href="javascript:void(0);">我的已办<span>(5)</span></a></li>
				</ul>
				  
				<div id="workflow-main">
					<div data-tab="sect1">
						<ol class="main-list">
							<li><a href="">关于项目计划xxx洽谈记录，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于项目计划洽谈xxxxxxxxxxxxx记录，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于项目计划xxx洽谈记录，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于项目计xx划洽谈xxxxxx记录，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于项目计xxxx划洽谈记录，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于项目计划洽谈记录，请完成纪录</a><span>（2013-03-13）</span></li>
						</ol>
					</div>
					<div data-tab="sect2">
						<ol class="main-list">
							<li><a href="">提交电脑更xxx新申请，请完成审批</a><span>（2013-03-13）</span></li>
							<li><a href="">提交电脑更新申请，请完成审批</a><span>（2013-03-13）</span></li>
							<li><a href="">提交电脑更xxxxx新申请，请完成审批</a><span>（2013-03-13）</span></li>
							<li><a href="">提交电脑更新申请，请完成审批</a><span>（2013-03-13）</span></li>
							<li><a href="">提交电脑更新申请，请完成审批</a><span>（2013-03-13）</span></li>
							<li><a href="">提交电脑xxxx更新申请，请完成审批</a><span>（2013-03-13）</span></li>
						</ol>
					</div>
					<div data-tab="sect3">
						<ol class="main-list">
							<li><a href="">关于xxx的申请，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于xxx的申请，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于xxx的申请关于项目计划洽谈记录，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于xxx的申请，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于xxx的申请，请完成纪录</a><span>（2013-03-13）</span></li>
							<li><a href="">关于xxx的申请，请完成纪录</a><span>（2013-03-13）</span></li>
						</ol>
					</div>
				</div>		
			</div>
		</div><!-- /.main-section -->
		
		<div class="main-section">
			<ul class="sys-land-link">
				<li><a href="/index.php"><img src="/assets/img/admin/zhishi.png" alt=""></a></li>
				<li><a href="/brand/"><img src="/assets/img/admin/pinpai.png" alt=""></a></li>
				<li><a href="/zhaoshang/"><img src="/assets/img/admin/zhaoshang.png" alt=""></a></li>
			</ul>
		</div>
		
		
		
	</div>
</div>
<?php include_once 'public/comm.php';?>
<script>
jQuery.fn.tabs = function(control){
      var element = $(this);
      control = $(control);

      element.delegate("li", "click", function(){
        // Retrieve tab name
        var tabName = $(this).attr("data-tab");

        // Fire custom event on tab click
        element.trigger("change.tabs", tabName);
      });

      // Bind to custom event
      element.bind("change.tabs", function(e, tabName){
        element.find("li").removeClass("active");
        element.find(">[data-tab='" + tabName + "']").addClass("active");
      });

      element.bind("change.tabs", function(e, tabName){
        control.find(">[data-tab]").removeClass("active");
        control.find(">[data-tab='" + tabName + "']").addClass("active");
      });

      // Activate first tab
      var firstName = element.find("li:first").attr("data-tab");
      element.trigger("change.tabs", firstName);

      return this;
    };
</script>
<script>
$(function($){
    $("#workflow-tabs").tabs("#workflow-main");
})
</script>
<?php include_once 'public/footer.php';?>