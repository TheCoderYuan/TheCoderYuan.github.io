---
title: CentOS 7 下源码安装 MySQL 5.7
description: CentOS 7 下源码安装 MySQL 5.7
authors:
    name: CodeBoyDD
    title: CentOS 7 下源码安装 MySQL 5.7
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-18
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

CentOS 7 下源码安装 mysql 并使用 systemctl 管理 mysql 服务

安装帮助文档可以在源码包的INSTALL文件查看

https://dev.mysql.com/doc/refman/5.7/en/source-installation.html

:::


### 检查系统中的MySQL或Mariadb
```shell
sudo yum list installed | grep "mysql*"
```

```shell
sudo yum list installed | grep "mariadb*"
```


### 卸载系统自带的MySQL或Mariadb
```shell
sudo yum remove $(sudo yum list installed | grep "mysql*")
```

```shell
sudo yum remove $(sudo yum list installed | grep "mariadb*")
```


### 下载 MySQL 源码包
```shell
wget https://cdn.mysql.com/archives/mysql-5.7/mysql-boost-5.7.24.tar.gz
```


### 解压源码并进入安装目录
```shell
tar -zxvf mysql-boost-5.7.24.tar.gz && cd mysql-5.7.24 && mkdir build && cd build
```


### 构建参数说明
:::tip

```shell showLineNumbers
cmake .. \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql	\
-DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \
-DSYSCONFDIR=/etc \
-DWITH_BOOST=../boost \
-DDEFAULT_CHARSET=utf8mb4 \
-DDEFAULT_COLLATION=utf8_general_ci \
-DMYSQL_TCP_PORT=3306  \
```

| 参数 | 参数说明 |
| ---- | ---- |
| -DCMAKE_INSTALL_PREFIX | 指定 mysql 安装目录; 默认: /usr/local/mysql |
| -DMYSQL_UNIX_ADDR | 指定sock文件目录; 默认: /tmp/mysql.sock;绝对路径|
| -DSYSCONFDIR | 指定my.cnf路径; 默认: /etc/my.cnf |
| -DWITH_BOOST | 引入boost库,构建mysql需要boost库 |
| -DDEFAULT_CHARSET | 指定数据库字符集 |
| -DDEFAULT_COLLATION | 字符排序规则 |
| -DMYSQL_TCP_PORT | 指定监听TCP/IP端口 |

:::


### 构建 MySQL
```shell showLineNumbers
cmake .. \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql \
-DMYSQL_UNIX_ADDR=/usr/local/mysql/mysql.sock \
-DSYSCONFDIR=/etc \
-DWITH_BOOST=../boost
```


### 若构建失败则删除build目录重新构建
```shell
cd .. && rm -rf build && mkdir build && cd build
```


### 编译安装
```shell
sudo make -j $(nproc) && sudo make install
```


### 设置mysql应用目录权限
```shell
sudo chown -R mysql:mysql /usr/local/mysql && sudo chmod -R 755 /usr/local/mysql
```


### 写入环境变量 && 重载环境变量

<Tabs groupId="user-type">
<TabItem value="root" label="root用户">

```shell
echo 'export PATH=$PATH:/usr/local/mysql/bin' >> /etc/profile && source /etc/profile
```

</TabItem>
<TabItem value="un-root" label="非root用户">

```shell
echo 'export PATH=$PATH:/usr/local/mysql/bin/' | sudo tee -a /etc/profile && source /etc/profile
```

</TabItem>
</Tabs>


### 生成mysql服务
```shell
sudo cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql.server
```


### mysql服务授权 && 重载服务
```shell
sudo chmod 755 /etc/init.d/mysql.server && sudo systemctl daemon-reload
```


### 初始化mysql

:::info

initialize-insecure 生成空密码

initialize 生成随机密码

注意初始化时运行mysql的用户

:::

```shell
sudo mysqld --initialize-insecure --user=mysql
```


### 如果mysqld无法识别正确位置
```shell showLineNumbers
sudo mysqld --initialize-insecure --user=mysql \ 
--basedir=/usr/local/mysql \
--datadir=/usr/local/mysql/data
```


### 启动mysql服务
```shell
systemctl start mysql
```


### 简单配置mysql
```sql showLineNumbers
mysql -u root -p
use mysql;
# 修改root密码
ALTER USER root@'localhost' IDENTIFIED BY 'root';
# 设置root登录ip[危险-开发使用]
update user set host = '%' where user = 'root';
# 刷新权限
flush privileges;
```


### # 开放3306端口 && 重载防火墙
```shell
sudo firewall-cmd --zone=public --add-port=3306/tcp --permanent && sudo firewall-cmd --reload
```


### mysql服务命令
```shell
sudo systemctl start mysql
sudo systemctl stop mysql
sudo systemctl status mysql
sudo systemctl restart mysql
sudo systemctl enable mysql.server
```