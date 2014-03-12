<div class="dialog-content">
	<form class="form default-form" method="post" action="" onsubmit="return checkUserRoleForm();" >
	<input type="hidden" name="id" id="id" value="<?=$user_id?>" />
		<table class="field-table" width="100%">	
			<tbody>
				<tr>
				  <td><button class="btn btn-primary check-all" type="button">全选</button>
				  	  <button class="btn btn-primary" type="submit">确定</button>
				  	  <button class="btn btn-primary" type="button" onclick="$.dialog.dialogClose();">关闭</button>
				  </td>
			  	</tr>
			  	<tr>
				  <td><?php foreach ($roles as $role):?>
				  <span style="padding-left: 10px">
				  <label><input type="checkbox" class="chk-list" name="u-role" value="<?=$role['id']?>" <?php foreach ($userRoles as $urole):?><?php if($urole['role_id'] == $role['id']):?>checked<?php endif;?><?php endforeach;?>/><?=$role['name']?></span></label>
				  <?php endforeach;?></td>
			  	</tr>
				
				
			</tbody>
		</table>
	</form>
</div>