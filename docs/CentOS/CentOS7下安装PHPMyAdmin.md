---
title: CentOS 7 下安装 phpMyAdmin
description: CentOS 7 下安装 phpMyAdmin
authors:
    name: CodeBoyDD
    title: CentOS 7 下安装 phpMyAdmin
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-11-29
---

```shell
sudo sh -c 'echo "source /opt/rh/devtoolset-9/enable" >> /etc/profile' && source /etc/profile
```

### 下载 phpMyAdmin 源码包

```shell
wget https://files.phpmyadmin.net/phpMyAdmin/5.1.3/phpMyAdmin-5.1.3-all-languages.tar.gz
```

### 解压到web目录

> 注意文件及目录权限及文件拥有者/组

```shell
sudo tar -zxvf phpMyAdmin-5.1.3-all-languages.tar.gz -C /var/web/
```

### 简化目录名称

> 注意文件及目录权限及文件拥有者/组

```shell
sudo mv /var/web/phpMyAdmin-5.1.3-all-languages /var/web/phpmyadmin
```

### 生成config.ini.php配置文件

> 注意文件及目录权限及文件拥有者/组

```shell
sudo mv /var/web/phpmyadmin/config.sample.inc.php /var/web/phpmyadmin/config.inc.php
```

### 设置缓存目录 && 授予可读写权限

```shell
sudo mkdir -p /var/web/phpmyadmin/tmp && sudo chmod -R 777 /var/web/phpmyadmin/tmp
```

### 配置phpmyadmin

```shell
sudo vim /var/web/phpmyadmin/config.inc.php
```

### 问题: mysqli::real_connect(): (HY000/2002): No such file or directory

> 修改配置文件 config.inc.php 将 localhost 改为 127.0.0.1 即可

```php title=/var/web/phpmyadmin/config.inc.php
$cfg['Servers'][$i]['host'] = '127.0.0.1';
```

### 解决"配置文件现在需要一个短语密码"

```php title=/var/web/phpmyadmin/config.inc.php
# 改为 "任意字符32位"
$cfg['blowfish_secret'] = "1234567890987654321234567890987654321";
```
