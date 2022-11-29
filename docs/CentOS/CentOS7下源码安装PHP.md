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

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

源码安装 PHP 并使用 systemctl 管理 php-fpm 服务

:::

### 下载 PHP 源码包
```shell
wget https://www.php.net/distributions/php-7.4.3.tar.gz
```

### 解压源码包并进入安装目录
```shell
tar -zxvf php-7.4.3.tar.gz && cd php-7.4.3
```

### 构建php
```shell showLineNumbers
EXTENSION_DIR=/usr/local/php/ext \
./configure \
--prefix=/usr/local/php \
--with-config-file-path=/usr/local/php/etc \
--with-fpm-user=www \
--with-fpm-group=www \
--with-mysqli \
--with-pdo-mysql \
--enable-fpm
```

### 更多构建参数
```shell
./configure --help | grep "构建参数*"
```

### 编译安装
```shell
sudo make -j $(nproc) && sudo make install
```

### 生成php.ini
```shell
sudo cp php.ini-production /usr/local/php/etc/php.ini
```

### 生成php-fpm.conf
```shell
sudo cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
```

### 生成www.conf
```shell
sudo cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
```

### 生成php服务
```shell
sudo cp sapi/fpm/php-fpm.service /usr/lib/systemd/system/php-fpm.service
```

### 授权php服务 && 重载服务
```shell
sudo chmod 755 /usr/lib/systemd/system/php-fpm.service && systemctl daemon-reload
```

### 写入环境变量 && 重载环境变量
<Tabs groupId="user-type">
<TabItem value="root" label="root用户">

```shell
echo 'export PATH=$PATH:/usr/local/php/bin/' >> /etc/profile && source /etc/profile
```

</TabItem>
<TabItem value="un-root" label="非root用户">

```shell
echo 'export PATH=$PATH:/usr/local/php/bin/' | sudo tee -a /etc/profile && source /etc/profile
```

</TabItem>
</Tabs>

### PHP应用目录授权
```shell
sudo chown -R www:www /usr/local/php && sudo chmod -R 755 /usr/local/php
```

### PHP服务命令
```shell
systemctl start php-fpm
systemctl status php-fpm
systemctl stop php-fpm
systemctl restart php-fpm
systemctl enable php-fpm
```

