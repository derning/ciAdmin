<div class="content-wrap">
	<div id="content">
        <div id="breadcrumb">
            <i class="icon icon-home"></i><a href="/" class="frame-hash-link">首页</a> 
            <span id="breadcrumb-text"> &gt; <?php echo $menuInfo['parent_info']['title'];?> &gt; <?php echo $menuInfo['title'];?></span>
        </div><!--/ #breadcrumb  -->
		<div class="hd-action mb10">       
       	 <button class="btn btn-primary dialog" data-url="?c=operate&m=editOperate&height=600&width=700&animate=false&is_ajax=1&parent_id=0" data-title="添加菜单" type="button">添加操作</button>
    	</div>
        <table class="table table-bordered" width="100%">
			<thead>
				<tr>
					<th width="5%" align="center"><span ectype="order_by" fieldname="id" >ID</span></th>
					<th width="35%" >操作名称</th>
					<th width="35%" >排序</th>
					<th width="35%" >操作</th>
				</tr>
			</thead>
			<tbody>
			<?php foreach ($list as $lt):?>
				<tr id="tr_<?=$lt['id']?>">
					<td><?=$lt['id']?></td>
					<td class="node" style="padding-left:10px;text-align:left">
					<img src="<?=$base_url?>/assets/js/lib/jqtreetable/images/tv-expandable.gif" ectype="flex" status="open" fieldid="<?=$lt['id']?>" onClick="getChilds($(this),'?c=operate&m=getChildInfo')">
					<span class="node_name">&nbsp;&nbsp;<?=$lt['title']?></span>
				
				</td>
					<td><span ectype="inline_edit" fieldname="sort_order" fieldid="<?=$lt['id']?>" datatype="pint" maxvalue="255" title="单击可以编辑" class="editable" style="display: inline;"><?=$lt['sort_order']?></span></td>
					<td>
						<a href="javascript:void(0);" data-url="?c=operate&m=editOperate&height=600&width=700&animate=false&is_ajax=1&parent_id=<?=$lt['id']?>" data-title="添加菜单" class="dialog">添加</a>
						<a href="javascript:void(0);" data-url="?c=operate&m=editOperate&height=600&width=700&animate=false&is_ajax=1&parent_id=<?=$lt['parent_id']?>&id=<?=$lt['id']?>" data-title="编辑菜单" class="dialog">编辑</a> 
						<a href="javascript:void(0);" onclick='doDrop("?c=operate&m=delete",this)' data-id="<?=$lt['id']?>">删除</a></td>
				</tr>
			<?php endforeach;?>
			</tbody>
        </table>
    </div>
</div>
<?php $this->load->view('public/comm');?>
<script src="<?php echo $base_url;?>/assets/js/plugin/dialog.js"></script>
<script src="<?php echo $base_url;?>/assets/js/admin/app/operate.js"></script>
<script src="<?php echo $base_url;?>/assets/js/plugin/inline_edit.js"></script>
<?php $this->load->view('public/footer');?>