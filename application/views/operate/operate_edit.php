<div class="dialog-content">
	<form class="form default-form" method="post" action="" onSubmit="return checkForm();" >
	<input type="hidden" name="id" id="id" value="<?=$info['id']?>" />
	<input type="hidden" name="parent_id" id="parent_id" value="<?=$parent_info['id']?>" />
		<table class="field-table" width="100%">	
			<tbody>
				<tr>
					<th width="120">所在上级：</th>
					<td><?php if($parent_info):?><?php echo $parent_info['title'];?><?php else:?><?php echo '网站后台';?><?php endif;?></td>
				</tr>
				<tr>
				  <th>中文描述：</th>
				  <td><input placeholder="请输入中文描述" id="title" name="title" type="text" class="txt span3" value="<?=$info['title']?>"></td>
			  </tr>
				<tr>
				  <th>操作排序：</th>
				  <td><input name="sort_order" id="sort_order" type="text" class="txt span3" value="<?=$info['sort_order']?>" placeholder="请输入操作排序" maxlength="3"></td>
			  </tr>
				
				<tr>
				  <th>链接配置：</th>
				  <td><input name="app" id="app" type="text" class="txt span2 mr10" value="<?=$info['app']?>" placeholder="请输APP名称">-<input name="act" id="act" type="text" class="txt span2 ml10" value="<?=$info['act']?>" placeholder="请输入ACT名称"></td>
			  </tr>
				<tr>
				  <th>其他参数：</th>
				  <td><input name="parameter" id="parameter" type="text" class="txt span3" value="<?=$info['parameter']?>" placeholder="请输入其他参数"></td>
			  </tr>
				
				<tr>
				  <th>菜单应用：</th>
				  <td>
				  	<label><input type="radio" name="is_menu" value="1" <?php if($info['is_menu']==1 or !$info['is_menu']):?>checked<?php endif;?>>&nbsp;&nbsp;是&nbsp;&nbsp;</label>
			  		<label><input type="radio" name="is_menu" value="2" <?php if($info['is_menu']==2):?>checked<?php endif;?>>&nbsp;&nbsp;否&nbsp;&nbsp;</label>				  </td>
			  </tr>
				<tr>
				  <th>是否公共：</th>
				  <td>
				  	<label><input type="radio" name="is_public" value="1" <?php if($info['is_public']==1):?>checked<?php endif;?>>&nbsp;&nbsp;是&nbsp;&nbsp;</label>
			  		<label><input type="radio" name="is_public" value="2" <?php if($info['is_public']==2 or !$info['is_public']):?>checked<?php endif;?>>&nbsp;&nbsp;否&nbsp;&nbsp;</label>				  </td>
			  </tr>
			  <tr>
				  <th>是否显示：</th>
				  <td>
				  	<label><input type="radio" name="is_show" value="1" <?php if($info['is_show']==1 or !$info['is_show']):?>checked<?php endif;?>>&nbsp;&nbsp;是&nbsp;&nbsp;</label>
			  		<label><input type="radio" name="is_show" value="0" <?php if($info['is_show']==2):?>checked<?php endif;?>>&nbsp;&nbsp;否&nbsp;&nbsp;</label>				  </td>
			  </tr>
				<tr>
				  <th>&nbsp;</th>
				  <td>&nbsp;</td>
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