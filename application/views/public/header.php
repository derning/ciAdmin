<!doctype html>
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8" lang="zh-CN"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9" lang="zh-CN"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>后台管理系统</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="<?php echo $base_url;?>/assets/css/lib/base.css">
    <link rel="stylesheet" href="<?php echo $base_url;?>/assets/css/lib/font-awesome.css">
    <link rel="stylesheet" href="<?php echo $base_url;?>/assets/css/admin/main.css">
    <script type="text/javascript">
		var aUrl = "?c=<?=$c?>",
			libUrl = "<?=$base_url?>/assets/js";
    </script>
</head>
<body id="index" class="scrollbar">
<div id="header">
    <a href="index.php" class="pull-left"><img src="<?php echo $base_url;?>/assets/img/admin/logo.png" alt=""></a>
    <div class="account-setting pull-right">
    	<?php if($adminId > 0):?>
        <a href="javascript:void(0);" class="dropdown-toggle" data-toggle="dropdown"><img width="36" height="36" src="<?php echo $base_url;?>/assets/img/noavatar.png" />技术部/<?php echo $userInfo['username']?><b class="icon icon-caret-down"></b></a>
        <ul class="dropdown-menu">
            <li><a href="/user/index.php">个人中心</a></li>
            <li><a href="/user/info.php">查看个人信息</a></li>
            <li><a href="/user/password.php">修改密码</a></li>
            <li><a href="/login/loginOut/">退出</a></li>
        </ul>
        <?php endif; ?>
    </div> 
</div>