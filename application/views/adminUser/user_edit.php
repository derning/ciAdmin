<div class="dialog-content">
	<form class="form default-form" method="post" action="" onsubmit="return checkUserForm();" >
	<input type="hidden" name="id" id="id" value="<?=$info['id']?>" />
		<table class="field-table" width="100%">	
			<tbody>
				<tr>
				  <th>用户名称：</th>
				  <td><input placeholder="用户名称" id="username" name="username" type="text" class="txt span3" value="<?=$info['username']?>"></td>
			  	</tr>
			  	<tr>
				  <th>用户密码：</th>
				  <td><input placeholder="用户密码" id="password" name="password" type="password" class="txt span3" value=""></td>
			  	</tr>
				
				<tr>
					<th></th>
					<td>
						<button class="btn btn-small btn-primary" type="submit">确定</button>
						<span class="ml10"><a href="javascript:$.dialog.dialogClose();">取消</a></span>					</td>
				</tr>
			</tbody>
		</table>
	</form>
</div>