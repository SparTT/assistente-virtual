-- DROP TABLE `assistant-comments`;
CREATE TABLE IF NOT EXISTS `assistant-comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
 `comment` TEXT(999) NOT NULL,
 `comment_audio` LONGBLOB NOT NULL,
 `username` varchar(255),
 `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) AUTO_INCREMENT=1;
