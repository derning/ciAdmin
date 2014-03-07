<div class="content-wrap">
	<div id="content">
        <div id="breadcrumb">
            <i class="icon icon-home"></i><a href="/" class="frame-hash-link">首页</a> 
            <span id="breadcrumb-text"> &gt; <?php echo $menuInfo['parent_info']['title'];?> &gt; <?php echo $menuInfo['title'];?></span>
        </div><!--/ #breadcrumb  -->
		<div class="hd-action mb10">       
       	 <button class="btn btn-primary dialog" data-url="?c=adminRole&m=editRole&height=400&width=600&animate=false&is_ajax=1&parent_id=0" data-title="添加角色" type="button">添加</button>
    	</div>
        <table class="table table-bordered" width="100%">
			<thead>
				<tr>
					<th width="5%" align="center"><span ectype="order_by" fieldname="id" >ID</span></th>
					<th width="35%" >操作名称</th>
					<th width="35%" >添加时间</th>
					<th width="35%" >操作</th>
				</tr>
			</thead>
			<tbody>
			<?php foreach ($list as $lt):?>
				<tr id="tr_<?=$lt['id']?>">
					<td><?=$lt['id']?></td>
					<td class="node" style="padding-left:10px;text-align:left"><?=$lt['name']?></td>
					<td><?php echo date("Y-m-d H:i:s",$lt['add_time']);?></td>
					<td>
						<a href="javascript:void(0);" data-url="?c=adminRole&m=editRole&height=600&width=700&animate=false&is_ajax=1&id=<?=$lt['id']?>" data-title="编辑角色" class="dialog">编辑</a> 
						<a href="javascript:void(0);" onclick='doDrop("?c=adminRole&m=deleteRole",this)' data-id="<?=$lt['id']?>">删除</a>
						<a href="javascript:void(0);" data-url="?c=adminRole&m=editAdminRole&height=600&width=700&animate=false&is_ajax=1&id=<?=$lt['id']?>&dialog_type=iframe" data-title="角色菜单" class="dialog">菜单</a>
					</td> 
				</tr>
			<?php endforeach;?>
			</tbody>
        </table>
        <div class="pager"><?=$html?></div>
    </div>
</div>
<?php $this->load->view('public/comm');?>
<script src="<?php echo $base_url;?>/assets/js/plugin/dialog.js"></script>
<script src="<?php echo $base_url;?>/assets/js/admin/app/adminRole.js"></script>
<?php $this->load->view('public/footer');?>