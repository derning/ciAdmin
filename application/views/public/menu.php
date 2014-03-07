<div id="sidebar">
    <ul class="nav">
       <?php foreach ($menu as $m):?>
        <li class="{if true} cur cur-expand{/if}">
            <a href="javascript:void(0)" class="nav-link"><?php echo $m['title'];?><i class="arrow"></i></a>
            <ul class="sub-nav">
            	<?php foreach ($m['list'] as $list):?>
                <li <?php if($list['app']==$c):?>class="cur"<?php endif;?>><a href="?c=<?php echo $list['app']?>&m=<?php echo $list['act'];?>" class="sub-nav-link"><?php echo $list['title'];?></a></li>
                <?php endforeach;?>
            </ul>
        </li>
        <?php endforeach;?>
    </ul>
</div><!-- / #sidebar -->