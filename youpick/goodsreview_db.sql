/*
Navicat MySQL Data Transfer

Source Server         : 120
Source Server Version : 50520
Source Host           : 120.79.68.178:3306
Source Database       : goodsreview_db

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2019-05-21 13:58:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin_tb
-- ----------------------------
DROP TABLE IF EXISTS `admin_tb`;
CREATE TABLE `admin_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_ account` varchar(32) NOT NULL,
  `admin_ password` varchar(16) DEFAULT NULL,
  `admin_ name` varchar(32) NOT NULL,
  `admin_ tel` varchar(16) NOT NULL,
  `admin_ email` varchar(50) DEFAULT NULL,
  `admin_ regstTime` datetime NOT NULL,
  `admin_lastLoginTime` datetime DEFAULT NULL,
  `admin_remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for collectioninfo_tb
-- ----------------------------
DROP TABLE IF EXISTS `collectioninfo_tb`;
CREATE TABLE `collectioninfo_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_openid` varchar(100) NOT NULL,
  `GoodsInfo_ID` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for commentinfo_tb
-- ----------------------------
DROP TABLE IF EXISTS `commentinfo_tb`;
CREATE TABLE `commentinfo_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Comment_content` varchar(255) DEFAULT NULL,
  `Comment_time` datetime NOT NULL,
  `Wx_openid` varchar(50) NOT NULL,
  `Wx_nikename` varchar(32) NOT NULL,
  `GoodsInfo_ID` int(11) NOT NULL,
  `GoodsInfo_title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for feedbackinfo_tb
-- ----------------------------
DROP TABLE IF EXISTS `feedbackinfo_tb`;
CREATE TABLE `feedbackinfo_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `feedbackInfo_content` varchar(255) NOT NULL,
  `wx_openid` varchar(50) NOT NULL,
  `userEmail` varchar(50) DEFAULT NULL,
  `wx_nikename` varchar(32) NOT NULL,
  `feedbackInfo_createtime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for followinfo_tb
-- ----------------------------
DROP TABLE IF EXISTS `followinfo_tb`;
CREATE TABLE `followinfo_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fan_wxopenid` varchar(50) NOT NULL,
  `followed_wxopenid` varchar(50) NOT NULL,
  `follow_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for goodsinfo_tb
-- ----------------------------
DROP TABLE IF EXISTS `goodsinfo_tb`;
CREATE TABLE `goodsinfo_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `release_openid` varchar(50) NOT NULL,
  `release_time` datetime NOT NULL,
  `review_title` varchar(50) NOT NULL,
  `review_detail` varchar(500) NOT NULL,
  `goods_imgPath` varchar(255) DEFAULT NULL,
  `goods_price` varchar(50) DEFAULT NULL,
  `goods_discountPrice` varchar(50) DEFAULT NULL,
  `goods_link` varchar(255) NOT NULL,
  `goods_sortID` int(11) NOT NULL,
  `goods_comments` int(11) DEFAULT NULL,
  `goods_likes` int(11) DEFAULT NULL,
  `goods_share` int(11) DEFAULT NULL,
  `goods_buycode` varchar(255) DEFAULT NULL,
  `goods_platform` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for goodssort_tb
-- ----------------------------
DROP TABLE IF EXISTS `goodssort_tb`;
CREATE TABLE `goodssort_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsSort_name` varchar(32) NOT NULL,
  `goodsSort_describe` varchar(255) DEFAULT NULL,
  `goodsSort_createTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for goodstopic_tb
-- ----------------------------
DROP TABLE IF EXISTS `goodstopic_tb`;
CREATE TABLE `goodstopic_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(32) NOT NULL,
  `topic_describe` varchar(255) DEFAULT NULL,
  `goodsInfo_ID` int(11) NOT NULL,
  `topic_imgPath` varchar(255) DEFAULT NULL,
  `topic_createTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for reportinfo_tb
-- ----------------------------
DROP TABLE IF EXISTS `reportinfo_tb`;
CREATE TABLE `reportinfo_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reportInfo_violationSort` varchar(32) NOT NULL,
  `reportInfo_content` varchar(255) NOT NULL,
  `reportInfo_title` varchar(50) NOT NULL,
  `reportInfo_createtime` datetime NOT NULL,
  `goodsInfo_ID` int(11) NOT NULL,
  `wx_openid` varchar(50) NOT NULL,
  `wx_nikename` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for wxuser_tb
-- ----------------------------
DROP TABLE IF EXISTS `wxuser_tb`;
CREATE TABLE `wxuser_tb` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wx_openid` varchar(50) NOT NULL,
  `wx_nickname` varchar(32) NOT NULL,
  `user_tel` varchar(32) DEFAULT NULL,
  `wx_imgPath` varchar(255) NOT NULL,
  `wx_motto` varchar(100) DEFAULT NULL,
  `wx_authorizeTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
