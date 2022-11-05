# LNMP 开发环境搭建

CentOS 下 LNMP 源码搭建

环境说明：

| 项目                           | 信息           |
| ------------------------------ | :------------- |
| 系统版本                       | CentOS 7       |
| 源码包下载目录[便于管理源码包] | /usr/local/src |
| 软件安装目录                   | /usr/local/    |

软件清单：

| 软件名称  | 所需版本  | 安装版本   | 说明                     |
| ----- | ----- | ------ | ---------------------- |
| gcc   | 7.1   | 7.3.1  | 源码编译MySQL需要gcc7.1及以上   |
| cmake | 3.7.5 | 3.17.5 | 构建MySQL需要cmake3.7.5及以上 |

**源码安装通用方法：**

**安装帮助文档一般在源码包的 INSTALL 或 README 文件中有说明**

## 目录

1. [更新系统软件包及安装依赖](#更新系统软件包及安装依赖)
2. [关闭SELinux](#关闭selinux)
3. [下载源码包](#下载源码包)
4. [可选:安装gcc7](#安装gcc7)
5. [可选:安装cmake3](#安装cmake3)
6. [安装Nginx](#安装nginx)
7. [安装MySQL-5.7](#安装mysql-57)
8. [安装MySQL-8.0](#安装mysql-80)
9. [安装PHP-7.4](#安装php-74)
10. [安装PHP-8.0](#安装php-80)
11. [安装phpMyAdmin](#安装phpmyadmin)
12. [编译PHP扩展](#编译php扩展)
13. [安装Composer](#安装composer)
14. [管理防火墙](#管理防火墙)

## 帮助文档目录

1. [阿里云关闭SELinux文档](https://help.aliyun.com/document_detail/157022.htm?spm=a2c4g.11186623.0.0.32626a94LDsLUi#task-2385075)
2. [Nginx构建参数文档](http://nginx.org/en/docs/configure.html)
3. [Nginx构建参数文档汉化](https://blog.csdn.net/guojing1173132123/article/details/83623483)
4. [Nginx调试DeBug文档](http://nginx.org/en/docs/debugging_log.html)
5. [cmake构建参数](https://dev.mysql.com/doc/refman/5.7/en/source-configuration-options.html)
6. 


## 更新系统软件包及安装依赖

### 更新系统软件库

```shell
yum -y update
```

### 安装依赖

```shell
yum -y install gcc gcc-c++ cmake gpcre pcre-devel zlib zlib-devel gmp gmp-devel mpfr mpfr-devel openssl openssl-devel bzip2 bzip2-devel ncurses ncurses-devel libmpc libmpc-devel libxml2 libxml2-devel sqlite sqlite-devel libcurl libcurl-devel libtirpc libtirpc-devel
```

```shell
yum -y install oniguruma oniguruma-devel libaio libaio-devel libmcrypt libmcrypt-devel libpng-devel libjpeg-devel freetype-devel libicu-devel php-mcrypt autoconf
```

## 关闭SELinux

[开启或关闭SELinux (aliyun.com)](https://help.aliyun.com/document_detail/157022.htm?spm=a2c4g.11186623.0.0.32626a94LDsLUi#task-2385075)

### 临时关闭SELinux

```shell
setenforce 0
```

### 永久关闭SELinux

编辑SELinux的config文件

```shell
vim /etc/selinux/config
```

**将 SELINUX=enforcing 改为 SELINUX=disabled**

重启系统

```shell
shutdown -r now
```

验证SELinux状态

```shell
getenforce
```

## 下载源码包

### 下载cmake3源码[可选]

```shell
wget https://cmake.org/files/v3.18/cmake-3.18.6.tar.gz --no-check-certificate
```

### 下载Nginx源码包

```shell
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

### 下载MySQL-5.7.24源码包

```shell
wget https://cdn.mysql.com/archives/mysql-5.7/mysql-boost-5.7.24.tar.gz
```

### 下载MySQL-8.0.12源码包

```shell
wget https://cdn.mysql.com/archives/mysql-8.0/mysql-boost-8.0.12.tar.gz
```

### 下载PHP-7.4.3源码包

```shell
wget https://www.php.net/distributions/php-7.4.3.tar.gz
```

### 下载PHP-8.0.12源码包

```shell
wget https://www.php.net/distributions/php-8.0.12.tar.gz
```

### 下载phpMyAdmin源码包

```shell
wget https://files.phpmyadmin.net/phpMyAdmin/5.1.3/phpMyAdmin-5.1.3-all-languages.tar.gz --no-check-certificate # 不检查证书
```

## 安装gcc7

### devtoolset-7对应gcc7.x.x版本

```shell
yum -y install centos-release-scl && yum -y install devtoolset-7
```

### 临时设置gcc变量

```shell
scl enable devtoolset-7 bash 或 source /opt/rh/devtoolset-7/enable
```

### 设置环境变量

```shell
echo 'source /opt/rh/devtoolset-7/enable' >> /etc/profile
```

### 重新读取环境变量

```shell
source /etc/profile
```

### 查看gcc版本

```shell
gcc -v
```

## 安装cmake3

### yum安装cmake3

```shell
yum -y install cmake3	#调用命令：cmake3，使用make命令调用的是cmake2.8
```

### 源码升级cmake3

### 解压并进入目录

```shell
tar -zxvf cmake-3.18.6.tar.gz && cd cmake-3.18.6
```

### 构建

```shell
./configure --prefix=/usr/local/cmake
```

### 编译安装

```shell
make -j $(nproc) && make install
```

### 创建软链接

```bash
ln -s /usr/local/cmake/bin/cmake /usr/bin/
```

### 查看cmake版本

```shell
cmake --version
```

## 安装Nginx

### 创建nginx用户组和用户[nobody用户]
```shell
groupadd nginx && useradd -r -g nginx -s /sbin/nologin nginx
```

### 解压并进入目录

```shell
tar -zxvf nginx-1.18.0.tar.gz && cd nginx-1.18.0
```

### 构建

构建参数说明：**[Nginx官网构建参数文档](http://nginx.org/en/docs/configure.html)**

下面这些基本都是默认的构建参数

```shell
./configure \
--prefix=/usr/local/nginx \
--sbin-path=/usr/local/nginx/sbin/nginx \
--conf-path=/usr/local/nginx/conf/nginx.conf \
--error-log-path=/usr/local/nginx/logs/error.log \
--pid-path=/usr/local/nginx/logs/nginx.pid \
--lock-path=/usr/local/nginx/logs/nginx.lock \
--http-log-path=/usr/local/nginx/logs/access.log \
--user=nginx \
--group=nginx \
--with-debug \
--with-http_ssl_module
```

**注意：** 指定了nginx用户,系统必须要有该用户才可以运行

**debug调试手册：**http://nginx.org/en/docs/debugging_log.html

### 编译安装

```bash
make -j $(nproc) && make install
```

### 创建软链接

```shell
ln -s /usr/local/nginx/sbin/nginx /usr/bin
```

### 更改nginx目录权限

**当前是以root用户安装的应用，其他或nginx用户使用需要更改目录权限**

```shell
chown -R nginx:nginx /usr/local/nginx && chmod -R 755 /usr/local/nginx
```

### nginx常用命令

```shell
nginx -v/V				# nginx简要信息/详情信息
nginx					# 启动nginx
nginx -s stop/quit		# 关闭nginx
nginx -s reload			# 重启nginx
nginx -t				# 测试nginx配置文件
```

### 创建nginx服务

编写 nginx.service 文件

```shell
vim /usr/lib/systemd/system/nginx.service
```

文件内容

```bash showLineNumbers
[Unit]
Description=nginx
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/nginx/sbin/nginx
ExecReload=/usr/local/nginx/sbin/nginx -s reload
ExecStop=/usr/local/nginx/sbin/nginx -s quit
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### 更改nginx服务权限

```shell
chmod 755 /usr/lib/systemd/system/nginx.service
```

### 重新加载系统服务
```shell
systemctl daemon-reload
```

### systemctl管理nginx命令
```shell
systemctl start nginx		# 启动nginx
systemctl status nginx		# 查看nginx状态
systemctl enable nginx		# 设置nginx自启动
systemctl restart nginx 	# 重启nginx
systemctl stop nginx		# 关闭nginx
```

### 开启80端口防火墙

```shell
firewall-cmd --zone=public --add-port=3306/tcp --permanent && firewall-cmd --reload
```

## 安装MySQL-5.7

### 查询并卸载系统MySQL或Mariadb

```shell
rpm -qa | grep mysql* && rpm -e --nodeps mysql*
```

```shell
rpm -qa | grep mariadb* && rpm -e --nodeps mariadb*
```

### 创建mysql组和用户

```shell
groupadd mysql && useradd -r -g mysql -s /sbin/nologin mysql
```

### 解压并进入目录

```shell
tar -zxvf mysql-boost-5.7.24.tar.gz && cd mysql-5.7.24
```

### 创建并进入构建目录

```shell
mkdir build && cd build
```

### cmake构建

[MySQL ：： MySQL 5.7 参考手册 ：： 2.9.7 MySQL 源配置选项](https://dev.mysql.com/doc/refman/5.7/en/source-configuration-options.html)

**cmake . -LH 或者 ccmake . 可以查看构建参数及默认构建参数**

同时 **ccmake .** 可以直接编辑默认构建参数非常方便

我的构建参数：

| 参数                   | 参数说明               | 参数默认值            |
| ---------------------- | ---------------------- | --------------------- |
| -DCMAKE_INSTALL_PREFIX | 安装根目录[prefix参数] | /usr/local/mysql      |
| -DINSTALL_BINDIR       | 用户可执行文件目录     | /usr/local/mysql/bin  |
| -DMYSQL_DATADIR        | 数据库存储目录         | /usr/local/mysql/data |
| -DSYSCONFDIR           | 配置文件my.cnf目录     | /etc/my.cnf           |
| -DMYSQL_TCP_PORT       | 指定启动端口           | 3306                  |
| -DMYSQL_UNIX_ADDR      | socket 文件路径        | /tmp/mysql.sock       |
| -DWITH_BOOST           | 指定boost库位置        | 空                    |

安装多版本需要修改些参数，以防文件冲突，如：my.cnf配置文件，端口号，sock文件等。

```shell
cmake .. \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql-5.7 \
-DSYSCONFDIR=/etc/mysql/mysql-5.7 \
-DMYSQL_TCP_PORT=3305 \
-DMYSQL_UNIX_ADDR=/usr/local/mysql-5.7 \
-DWITH_BOOST=../boost
```

### 编译安装

```shell
make -j $(nproc) && make install
```

### 更改mysql目录权限

```shell
chown -R mysql:mysql /usr/local/mysql
```

### 添加mysql环境变量

```shell
echo 'export PATH=$PATH:/usr/local/mysql/bin' >> /etc/profile
```

### 重新加载环境变量

```shell
source /etc/profile
```

### 创建mysql服务

```shell
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql.server
```

### 更改mysql服务权限

```shell
chmod 755 /etc/init.d/mysql.server
```

### 重新加载系统服务

```shell
systemctl daemon-reload
```

### systemctl管理mysql命令

```shell
systemctl start mysqld		# 启动mysql
systemctl stop mysqld		# 关闭mysql
systemctl status mysqld		# 查看mysql状态
systemctl restart mysqld	# 重启mysql
systemctl enable mysql		# 开机自启动mysql
```

### 编写my.cnf文件

[mysql之my.cnf详解 - 百衲本 - 博客园 (cnblogs.com)](https://www.cnblogs.com/panwenbin-logs/p/8360703.html)

编辑/etc/mysql-5.7/my.cnf 指定下socket文件位置

```shell
[client]
port = 3305
socket = /usr/local/mysql-5.7/mysql.sock
[mysqld]
port = 3305
socket = /usr/local/mysql-5.7/mysql.sock
```

### 启动mysql服务

```shell
systemctl start mysql
```

### 初始化mysql

initialize-insecure 生成空密码

initialize 生成随机密码

```shell
mysqld --initialize-insecure --user=mysql
```

### 修改mysql用户密码

登录mysql

```shell
mysql -u root -p
```

修改初始化的空密码

```shell
ALTER USER root@'localhost' IDENTIFIED BY 'root';

# 报错使用
# 重装PHP 会导致连接不到mysql,改下密码即可
alter user 'root'@'%' identified with mysql_native_password by 'root';
```

### 添加远程访问权限

需要开启3306防火墙

```shell
use mysql;
update user set host = '%' where user = 'root';
flush privileges;
# 重启mysql生效
```


## 安装MySQL-8.0

### 解压并进入目录

```shell
tar -zxvf mysql-boost-8.0.12.tar.gz && cd mysql-8.0.12
```

### 创建并进入构建目录

```shell
mkdir build && cd build
```

### cmake3构建

[MySQL ：： MySQL 8.0 参考手册 ：： 2.9.7 MySQL 源配置选项](https://dev.mysql.com/doc/refman/8.0/en/source-configuration-options.html)

```shell
cmake3 .. \
-DCMAKE_INSTALL_PREFIX=/usr/local/mysql-8.0 \
-DSYSCONFDIR=/etc/mysql/mysql-8.0 \
-DMYSQL_TCP_PORT=3306 \
-DMYSQL_UNIX_ADDR=/usr/local/mysql-8.0 \
-DWITH_BOOST=../boost
```

### 编译安装

```shell
make -j $(nproc) && make install
```

### 更改mysql目录权限

```shell
chown -R mysql:mysql /usr/local/mysql
```

### 添加mysql环境变量

```shell
echo 'export PATH=$PATH:/usr/local/mysql/bin' >> /etc/profile
```

### 重新加载环境变量

```shell
source /etc/profile
```

### 创建mysql服务

```shell
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysql.server
```

### 更改mysql服务权限

```shell
chmod 755 /etc/init.d/mysql.server
```

### 重新加载系统服务

```shell
systemctl daemon-reload
```

### systemctl管理mysql命令

```shell
systemctl start mysqld      # 启动mysql
systemctl stop mysqld       # 关闭mysql
systemctl status mysqld     # 查看mysql状态
systemctl restart mysqld    # 重启mysql
systemctl enable mysql      # 开机自启动mysql
```

### 初始化mysql

```shell
/usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
# initialize-insecure 生成空密码
```

### 修改mysql用户密码

登录mysql

```shell
mysql -u root -p
```

修改初始化的空密码

```shell
ALTER USER root@'localhost' IDENTIFIED BY 'root';

# 报错使用
# 重装PHP 会导致连接不到mysql,改下密码即可
alter user 'root'@'%' identified with mysql_native_password by 'root';
```

### 添加远程访问权限

需要开启3306防火墙，需要重启mysql

```shell
use mysql;
update user set host = '%' where user = 'root';
flush privileges;
```


## 安装PHP-7.4

### 解压并进入目录

```shell
tar -zxvf php-7.4.3.tar.gz && cd php-7.4.3
```

### 构建

```shell
./configure
```

### 编译安装

```shell
make && make install
```

### 生成php.ini文件

```shell
cp /usr/local/src/php-7.4.3/php.ini-production /usr/local/php/etc/php.ini
```

### 生成php-fpm.conf文件

```shell
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
```

### 生成www.conf文件

```shell
cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
```

### php-fpm加入systemctl管理

```shell
cp /usr/local/src/php-7.4.3/sapi/fpm/php-fpm.service /usr/lib/systemd/system/php-fpm.service
```

### 更改php-fpm服务权限

```shell
chmod 755 /usr/lib/systemd/system/php-fpm.service
```

### 重新加载系统服务

```shell
systemctl daemon-reload
```

### systemctl管理php-fpm命令

```shell
systemctl start php-fpm		# 启动php-fpm
systemctl stop php-fpm		# 关闭php-fpm
systemctl status php-fpm	# 查看php-fpm状态
systemctl restart php-fpm	# 重启php-fpm
systemctl enable php-fpm	# 开机自启动php-fpm
```

### 添加PHP环境变量

```shell
echo 'export PATH=$PATH:/usr/local/php/bin' >> /etc/profile
```

### 重新读取环境变量

```shell
source /etc/profile
```

### 查看php扩展

```shell
php -m
```

## 安装PHP-8.0

## 安装phpMyAdmin

### 解压源码包到Web应用目录

```shell
tar -zxvf phpMyAdmin-5.1.3-all-languages.tar.gz -C /var/web/
```

### 生成config.ini.php文件

```shell
mv /var/web/phpmyadmin/config.sample.inc.php /var/web/phpmyadmin/config.inc.php
```

### 编辑config.inc.php

```shell
$cfg['Servers'][$i]['host'] = 'localhost'; 
# 改成： 
$cfg['Servers'][$i]['host'] = '127.0.0.1';
```

### 生成tmp缓存文件

```shell
mkdir tmp && chmod -R 777 tmp/
```

### 解决"配置文件现在需要一个短语密码"

```shell
# 将phpmyadmin/config.inc.php
$cfg['blowfish_secret'] = "";
# 改为 "任意字符32位"
$cfg['blowfish_secret'] = "1234567890987654321234567890987654321";
```

## 编译PHP扩展



## 安装Composer



## 管理防火墙

### 查看防火墙状态

```shell
systemctl status firewalld
```

### 开启防火墙

```shell
systemctl start firewall
```

### 关闭防火墙

```shell
systemctl stop firewalld
```

### 查看防火墙开放的端口

```shell
firewall-cmd --zone=public --list-ports
```

### 开启3306端口防火墙

```shell
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```

### 重新加载防火墙

```shell
firewall-cmd --reload
```























