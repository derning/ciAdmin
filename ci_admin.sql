-- phpMyAdmin SQL Dump
-- version 4.0.9
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014-03-12 08:22:34
-- 服务器版本: 5.5.34
-- PHP 版本: 5.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `ci_admin`
--

-- --------------------------------------------------------

--
-- 表的结构 `ci_admin_operate`
--

CREATE TABLE IF NOT EXISTS `ci_admin_operate` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` smallint(4) unsigned NOT NULL,
  `is_menu` tinyint(2) unsigned NOT NULL DEFAULT '1' COMMENT '1菜单 2不是',
  `is_public` tinyint(1) unsigned NOT NULL DEFAULT '2' COMMENT '1公开 2不公开',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否显示 1显示 2不显示',
  `level` tinyint(4) unsigned NOT NULL,
  `title` varchar(20) NOT NULL,
  `app` varchar(20) NOT NULL,
  `act` varchar(20) NOT NULL,
  `parameter` varchar(12) NOT NULL,
  `add_time` int(11) NOT NULL,
  `sort_order` smallint(9) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=10 ;

--
-- 转存表中的数据 `ci_admin_operate`
--

INSERT INTO `ci_admin_operate` (`id`, `parent_id`, `is_menu`, `is_public`, `is_show`, `level`, `title`, `app`, `act`, `parameter`, `add_time`, `sort_order`) VALUES
(1, 0, 1, 2, 2, 1, '后台管理', '', '', '', 0, 0),
(2, 1, 1, 2, 1, 2, '系统配置', '', '', '', 0, 0),
(3, 2, 1, 2, 1, 3, '操作管理', 'operate', 'index', '', 1394085126, 1),
(7, 2, 1, 2, 1, 3, '用户列表', 'adminUser', 'index', '', 1394160879, 4),
(8, 2, 1, 2, 1, 3, '系统角色', 'adminRole', 'index', '', 1394161652, 2);

-- --------------------------------------------------------

--
-- 表的结构 `ci_admin_role`
--

CREATE TABLE IF NOT EXISTS `ci_admin_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '权限名称',
  `add_time` int(11) DEFAULT NULL COMMENT '添加时间',
  `add_user` mediumint(5) NOT NULL COMMENT '添加人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `ci_admin_role`
--

INSERT INTO `ci_admin_role` (`id`, `name`, `add_time`, `add_user`) VALUES
(1, '管理员', 1394164284, 1),
(4, '普通用户', 1394526064, 1);

-- --------------------------------------------------------

--
-- 表的结构 `ci_admin_rom`
--

CREATE TABLE IF NOT EXISTS `ci_admin_rom` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` tinyint(1) unsigned NOT NULL COMMENT '1角色  2用户',
  `type_id` int(11) unsigned NOT NULL COMMENT '用户或者角色对应的编号',
  `operate_id` mediumint(5) unsigned NOT NULL COMMENT '菜单的值',
  `add_user` int(11) unsigned NOT NULL COMMENT '添加用户',
  `add_time` int(11) unsigned NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=16 ;

--
-- 转存表中的数据 `ci_admin_rom`
--

INSERT INTO `ci_admin_rom` (`id`, `type`, `type_id`, `operate_id`, `add_user`, `add_time`) VALUES
(13, 1, 1, 8, 1, 1394605170),
(12, 1, 1, 7, 1, 1394605170),
(11, 1, 1, 3, 1, 1394605170),
(10, 1, 1, 2, 1, 1394605170),
(14, 1, 4, 2, 1, 1394605180),
(15, 1, 4, 7, 1, 1394605180);

-- --------------------------------------------------------

--
-- 表的结构 `ci_admin_ror`
--

CREATE TABLE IF NOT EXISTS `ci_admin_ror` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户编号',
  `role_id` mediumint(5) NOT NULL COMMENT '角色编号',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `add_user` int(11) NOT NULL COMMENT '添加人',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `ci_admin_ror`
--

INSERT INTO `ci_admin_ror` (`id`, `user_id`, `role_id`, `add_time`, `add_user`) VALUES
(5, 3, 4, 1394606834, 3),
(4, 1, 1, 1394604929, 1);

-- --------------------------------------------------------

--
-- 表的结构 `ci_admin_user`
--

CREATE TABLE IF NOT EXISTS `ci_admin_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(32) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '密码',
  `sex` tinyint(1) DEFAULT NULL COMMENT '性别',
  `add_time` int(11) unsigned NOT NULL COMMENT '添加时间',
  `phone` varchar(11) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '联系电话',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `ci_admin_user`
--

INSERT INTO `ci_admin_user` (`id`, `username`, `password`, `sex`, `add_time`, `phone`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', NULL, 0, ''),
(2, 'test', '098f6bcd4621d373cade4e832627b4f6', NULL, 1394605898, ''),
(3, 'test2', 'ad0234829205b9033196ba818f7a872b', NULL, 1394605915, ''),
(4, 'test3', '8ad8757baa8564dc136c1e07507f4a98', NULL, 1394605932, '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
