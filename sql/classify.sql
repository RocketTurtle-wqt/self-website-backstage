/*
 Navicat MySQL Data Transfer

 Source Server         : wqt's database
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : self-website

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 30/06/2021 21:45:33
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of classify
-- ----------------------------
BEGIN;
INSERT INTO `classify` VALUES ('20210317233307', '个人网站项目问题');
INSERT INTO `classify` VALUES ('20210320152009', '关于我');
INSERT INTO `classify` VALUES ('20210321204221', 'Vue历险记');
INSERT INTO `classify` VALUES ('20210322171114', 'Webpack历险记');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
