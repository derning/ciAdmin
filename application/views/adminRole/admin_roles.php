<!doctype html>
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang="zh-CN"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang="zh-CN"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?=$base_url?>/assets/css/lib/base.css">
    <link rel="stylesheet" href="<?=$base_url?>/assets/css/lib/font-awesome.css">
    <link rel="stylesheet" href="<?=$base_url?>/assets/css/admin/main.css">
	
	<link href="<?=$base_url?>/assets/js/lib/tree/tree.css" type="text/css"  rel="stylesheet" />
	<script type="text/javascript" src="<?=$base_url?>/assets/js/lib/tree/tree_edit.js"></script>
	<script>var haveIds = "";</script>
</head>
<body style="min-width: 200px;">

<div class="dialog-content">
	<form name="form" id="searchForm" class="mb10" style="margin-top:10px;" onSubmit="return checkForm();">
		<input type="hidden" name="type" id="type" value="{$type}">
		<input type="hidden" name="type_id" id="type_id" value="{$type_id}">
			<table style="width:370px;" >
				<tr>
					<td>
						<button type="submit" class="btn btn-primary btn-small" onClick="return checkForm();">提交</button>
						<button type="button" class="btn btn-primary btn-small" onClick="checkAll(1);">全选</button>
						<button type="button" class="btn btn-primary btn-small" onClick="checkAll(0);">取消</button>
					</td>
				</tr>
				<tr>
				  <td width="77%">
						<div class="tree">
						<div class="dtree">
						
						<script language="javascript">  
						var TREE_URL = "<?=$base_url?>/assets/js/lib/tree/images";
						showTree();
						/**
						 * 生成dtree菜单树
						 * @author zhangxiang 10-09-02
						 */
						function showTree(){ 
							d = new dTree('d',TREE_URL,'searchForm');
							d.config.allowit = true;
							<?php foreach($menus as $menu):?>
							<?php if($menu['is_public']==2):?>
							d.add('<?=$menu['id']?>','<?=$menu['parent_id']?>','<?=$menu['title']?>','','<?=$menu['title']?>','menu_right','','','','','1');
							<?php endif;?>
							<?php endforeach;?>
							document.write(d);
							d.closeAll();
						}
						</script>  
					</div>
					</div>
				</td>
			  </tr>
			</table>
	</form>
</div>
<?php $this->load->view('public/comm');?>
<script type="text/javascript" src="<?=$base_url?>/assets/js/admin/app/adminRom.js"></script>
</body>
</html>