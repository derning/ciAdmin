<div class="login-form">
<form name="loginform" id="loginform" class="form default-form" method="post" action="">
		<table>
			<tbody>
				<tr>
					<td width="72"><label for="accout">帐号：</label></td>
					<td width="186"><input id="accout" class="txt span3" type="text" tabindex="1" name="username" /></td>
				</tr>
				<tr>
					<td><label for="password">密码：</label></td>
					<td><input id="password" class="txt span3" type="password" tabindex="2" name="password" /></td>
				</tr>
				<tr>
					<td><label for="yanz">验证码：</label></td>
					<td>
						<input id="yanz" class="txt span1" type="text" tabindex="3" name="user_yanz" maxlength="5">
						<a href="javascript:reloadCode();"><img src="<?php echo site_url('/login/capt');?>" name="checkCodeImg" id="checkCodeImg" border="0" /></a>
					</td>
				</tr>
				
				<tr>
					<td>&nbsp;</td>
					<td>
						<button class="btn btn-primary admin-login">登录</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>
<?php include_once 'public/comm.php';?>
<script type="text/javascript" src="/assets/js/admin/login.js"></script>
<script type="text/javascript">
<!--
function reloadCode(){
	$('#checkCodeImg').attr('src',"<?php echo site_url('/login/capt'); ?>?tempstr="+Math.random());
}
//-->
</script>
<?php include_once 'public/footer.php';?>