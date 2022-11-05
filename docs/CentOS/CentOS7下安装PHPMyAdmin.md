---
title: CentOS 7 下安装 PHPMyAdmin
description: CentOS 7 下安装 PHPMyAdmin
authors:
    name: CodeBoyDD
    title: CentOS 7 下安装 PHPMyAdmin
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-18
---

:::info

PHPMyAdmin-5.2.0 我这里有报错, 但是接口返回的是200, 不知道为什么

:::

## 下载 PHPMyAdmin 源码包
```shell
wget https://files.phpmyadmin.net/phpMyAdmin/5.1.3/phpMyAdmin-5.1.3-all-languages.tar.gz
```
23
## 解压到web目录
```shell
sudo tar -zxvf phpMyAdmin-5.1.3-all-languages.tar.gz -C /var/web/
```

## 简化目录名称
```shell
sudo mv /var/web/phpMyAdmin-5.1.3-all-languages /var/web/phpmyadmin
```

## 生成config.ini.php配置文件
```shell
sudo mv /var/web/phpmyadmin/config.sample.inc.php /var/web/phpmyadmin/config.inc.php
```

# 设置缓存目录 && 授予可读写权限
```shell
sudo mkdir -p /var/web/phpmyadmin/tmp && sudo chmod -R 777 /var/web/phpmyadmin/tmp
```

# 配置phpmyadmin
```shell
sudo vim /var/web/phpmyadmin/config.inc.php
```
