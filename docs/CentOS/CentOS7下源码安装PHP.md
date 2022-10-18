---
title: CentOS 7 下源码安装 PHP
description: CentOS 7 下源码安装 PHP
authors:
    name: CodeBoyDD
    title: CentOS 7 下源码安装 PHP
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-18
---

:::info

先安装 MySQL 在安装 PHP

源码安装 PHP 并使用 systemctl 管理 php-fpm 服务

:::

## 下载 PHP 源码包
```shell
wget https://www.php.net/distributions/php-7.4.3.tar.gz
```

## 解压源码包并进入安装目录
```shell
tar -zxvf php-7.4.3.tar.gz && cd php-7.4.3
```

## # 构建php
```shell
./configure \
--prefix=/usr/local/php \
--with-config-file-path=/usr/local/php/etc \
--with-pdo-mysql=/usr/local/mysql \
--with-fpm-user=nginx \
--with-fpm-group=nginx \
--with-mysqli \
--with-pdo-mysql \
--enable-mbstring \
--enable-fpm
```

## 编译安装
```shell
sudo make -j $(nproc) && sudo make install
```

## 生成php.ini
```
sudo cp php.ini-production /usr/local/php/etc/php.ini
```

## 生成php-fpm.conf
```shell
sudo cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
```

# 生成www.conf
```shell
sudo cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
```

# 生成php服务
```shell
sudo cp sapi/fpm/php-fpm.service /usr/lib/systemd/system/php-fpm.service
```

# 授权php服务 && 重载服务
```shell
sudo chmod 755 /usr/lib/systemd/system/php-fpm.service && systemctl daemon-reload
```

# 写入环境变量 && 重载环境变量
```shell
sudo sh -c 'echo "export PATH=$PATH:/usr/local/php/bin" >> /etc/profile' && source /etc/profile
```

# php应用目录授权
```shell
sudo chown -R nginx:nginx /usr/local/php && sudo chmod -R 755 /usr/local/php
```

# php服务命令
```shell
systemctl start php-fpm
systemctl status php-fpm
systemctl stop php-fpm
systemctl restart php-fpm
systemctl enable php-fpm
```

