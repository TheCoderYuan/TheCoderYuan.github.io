---
title: CentOS 7 下源码安装 MySQL
description: CentOS 7 下源码安装 MySQL
authors:
    name: CodeBoyDD
    title: CentOS 7 下源码安装 MySQL
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-18
---

:::info

包含了 MySQL5 和 MySQL8 的安装流程

MySQL8 构建需要 CMAKE3 以上, 需要安装新版 CMAKE

在安装 PHP 前, 先安装 MySQL

:::

## 下载 MySQL 源码包

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="mysql-versions">
<TabItem value="MySQL-8" label="MySQL-8">

```shell
wget https://cdn.mysql.com/archives/mysql-8.0/mysql-boost-8.0.12.tar.gz
```

</TabItem>
<TabItem value="MySQL-5" label="MySQL-5">

```shell
wget https://cdn.mysql.com/archives/mysql-5.7/mysql-boost-5.7.24.tar.gz
```

</TabItem>
</Tabs>


## 解压源码并进入安装目录

<Tabs groupId="mysql-versions">
<TabItem value="MySQL-8" label="MySQL-8">

```shell
tar -zxvf mysql-boost-8.0.12.tar.gz && cd mysql-8.0.12 && mkdir build && cd build
```

</TabItem>
<TabItem value="MySQL-5" label="MySQL-5">

```shell
tar -zxvf mysql-boost-5.7.24.tar.gz && cd mysql-5.7.24 && mkdir build && cd build
```

</TabItem>
</Tabs>

## 构建 MySQL

<Tabs groupId="mysql-versions">
<TabItem value="MySQL-8" label="MySQL-8">

```shell
cmake3 .. \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DSYSCONFDIR=/etc \
-DMYSQL_UNIX_ADDR=/usr/local/mysql \
-DWITH_BOOST=../boost
```

</TabItem>
<TabItem value="MySQL-5" label="MySQL-5">

```shell
cmake .. \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DSYSCONFDIR=/etc \
-DMYSQL_UNIX_ADDR=/usr/local/mysql \
-DWITH_BOOST=../boost
```

</TabItem>
</Tabs>

## 编译安装

<Tabs groupId="user-type">
<TabItem value="root" label="root用户">

```shell
make -j $(nproc) && make install
```

</TabItem>
<TabItem value="un-root" label="非root用户">

```shell
sudo make -j $(nproc) && sudo make install
```

</TabItem>
</Tabs>


## 设置mysql应用目录权限

<Tabs groupId="user-type">
<TabItem value="root" label="root用户">

```shell
chown -R mysql:mysql /usr/local/mysql && chmod -R 755 /usr/local/mysql
```

</TabItem>
<TabItem value="un-root" label="非root用户">

```shell
sudo chown -R mysql:mysql /usr/local/mysql && sudo chmod -R 755 /usr/local/mysql
```

</TabItem>
</Tabs>


## 写入环境变量 && 重载环境变量

<Tabs groupId="user-type">
<TabItem value="root" label="root用户">

```shell
echo "export PATH=$PATH:/usr/local/mysql/bin" >> /etc/profile && source /etc/profile
```

</TabItem>
<TabItem value="un-root" label="非root用户">

```shell
sudo sh -c 'echo "export PATH=$PATH:/usr/local/mysql/bin" >> /etc/profile' && source /etc/profile
```

</TabItem>
</Tabs>


## 生成mysql服务
<Tabs groupId="user-type">
<TabItem value="root" label="root用户">

```shell
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql.server
```

</TabItem>
<TabItem value="un-root" label="非root用户">

```shell
sudo cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql.server
```

</TabItem>
</Tabs>


## mysql服务授权 && 重载服务
<Tabs groupId="user-type">
<TabItem value="root" label="root用户">

```shell
chmod 755 /etc/init.d/mysql.server && systemctl daemon-reload
```

</TabItem>
<TabItem value="un-root" label="非root用户">

```shell
sudo chmod 755 /etc/init.d/mysql.server && sudo systemctl daemon-reload
```

</TabItem>
</Tabs>

# 配置my.cnf
```shell title=/etc/my.cnf showLineNumbers
[client]
port = 3306
socket = /usr/local/mysql-5.7/mysql.sock
[mysqld]
port = 3306
pid-file = /usr/local/mysql/mysql.pid
socket = /usr/local/mysql-5.7/mysql.sock
```

## mysql服务命令
```shell
sudo systemctl start mysql
sudo systemctl stop mysql
sudo systemctl status mysql
sudo systemctl restart mysql
sudo systemctl enable mysql.server
```

## 初始化mysql

:::info

initialize-insecure 生成空密码

initialize 生成随机密码

:::

```shell
/usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
```

```sql
mysql -u root -p
use mysql;
ALTER USER root@'localhost' IDENTIFIED BY 'root';
update user set host = '%' where user = 'root';
flush privileges;
```

## mysql8 密码加密
```sql
ALTER USER root@'%' IDENTIFIED WITH mysql_native_password BY 'root';
```

## # 开放3306端口 && 重载防火墙
```shell
sudo firewall-cmd --zone=public --add-port=3306/tcp --permanent && sudo firewall-cmd --reload
```
