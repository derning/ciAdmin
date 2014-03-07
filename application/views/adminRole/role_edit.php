<div class="dialog-content">
	<form class="form default-form" method="post" action="" onsubmit="return checkRoleFrom();" >
	<input type="hidden" name="id" id="id" value="<?=$info['id']?>" />
		<table class="field-table" width="100%">	
			<tbody>
				<tr>
				  <th>角色名称：</th>
				  <td><input placeholder="请输入角色名称" id="name" name="name" type="text" class="txt span3" value="<?=$info['name']?>"></td>
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