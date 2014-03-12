<?php 
/**
* @Create by dongyg PhpCacheSever 
 * @Time:2014-03-12 07:18:49
 */

if(filemtime(__FILE__) + 86400 < time())return false;

return array (
  2 => 
  array (
    'id' => '2',
    'parent_id' => '1',
    'is_menu' => '1',
    'is_public' => '2',
    'is_show' => '1',
    'level' => '2',
    'title' => '系统配置',
    'app' => '',
    'act' => '',
    'parameter' => '',
    'add_time' => '0',
    'sort_order' => '0',
    'list' => 
    array (
      0 => 
      array (
        'id' => '3',
        'parent_id' => '2',
        'is_menu' => '1',
        'is_public' => '2',
        'is_show' => '1',
        'level' => '3',
        'title' => '操作管理',
        'app' => 'operate',
        'act' => 'index',
        'parameter' => '',
        'add_time' => '1394085126',
        'sort_order' => '1',
      ),
      1 => 
      array (
        'id' => '8',
        'parent_id' => '2',
        'is_menu' => '1',
        'is_public' => '2',
        'is_show' => '1',
        'level' => '3',
        'title' => '系统角色',
        'app' => 'adminRole',
        'act' => 'index',
        'parameter' => '',
        'add_time' => '1394161652',
        'sort_order' => '2',
      ),
      2 => 
      array (
        'id' => '7',
        'parent_id' => '2',
        'is_menu' => '1',
        'is_public' => '2',
        'is_show' => '1',
        'level' => '3',
        'title' => '用户列表',
        'app' => 'adminUser',
        'act' => 'index',
        'parameter' => '',
        'add_time' => '1394160879',
        'sort_order' => '4',
      ),
    ),
  ),
);

?>