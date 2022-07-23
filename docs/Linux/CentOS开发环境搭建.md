# CentOS 下 LNMP 开发环境搭建

CentOS 下 LNMP 源码搭建

## 目录 

1. [安装依赖](#安装依赖)
2. [下载源码包](#下载源码包)
3. [安装Nginx](#安装nginx)
4. [安装MySQL](#安装mysql)
5. [安装PHP](#安装php)
6. [安装phpMyAdmin](#安装phpmyadmin)
7. [安装PHP扩展](#安装php扩展)
8. [安装Composer](#安装composer)
9. [遇到的问题解决](#遇到的问题解决)
10. [服务器防火墙](#服务器防火墙)
10. [关闭SELinux](#关闭selinux)

## 安装依赖

> **依赖说明:**  
Linux版本: CentOS 7.6    
依赖说明: 编译Mysql的gcc版本太旧了[编译MySQL],需要自己下载新版或自己源码更新[不推荐]  
同样: CMake 版本太旧了,同样需要更新[安装cmake, mysql8需要cmake3以上]

### 下载依赖包
```shell
yum -y install gcc gcc-c++ pcre pcre-devel zlib zlib-devel gmp gmp-devel mpfr mpfr-devel openssl openssl-devel bzip2 bzip2-devel ncurses ncurses-devel libmpc libmpc-devel libxml2 libxml2-devel sqlite sqlite-devel libcurl libcurl-devel libtirpc libtirpc-devel
```

```shell
yum -y install oniguruma oniguruma-devel libaio libaio-devel libmcrypt libmcrypt-devel libpng-devel libjpeg-devel freetype-devel libicu-devel php-mcrypt autoconf
```

#### 安装扩展软件仓库
```shell
yum -y install bison mlocate lrzsz epel-release 
```

#### 更新软件库
```shell
updatedb	
```

#### 安装CMake 3.18.6
扩展软件库epel-release有CMake 3.17.5 可以直接安装或者按下面的源码安装高版本
```shell
yum -y install cmake3
```

##### 卸载旧版CMake
```shell
yum -y remove cmake 
```

##### 下载CMake源码包
```shell
wget https://cmake.org/files/v3.18/cmake-3.18.6.tar.gz --no-check-certificate
```

##### 解压源码包
```shell
tar -zxvf cmake-3.18.6.tar.gz #解压
```

##### 创建CMake安装目录
```shell
mkdir -p /usr/local/cmake
```

##### 进入源码目录
```shell
cd cmake-3.18.6
```

##### 配置
```shell
./configure --prefix=/usr/local/cmake
```

##### 编译安装
```shell
make && make install
```

##### 创建软链接
```shell
ln -s /usr/local/cmake/bin/cmake /usr/bin
```

##### 查看CMake版本
```shell
cmake -version
````

#### 更新libzip[安装高版本的PHP]

##### 卸载旧版libzip
```shell
yum -y remove libzip libzip-devel
```

##### 下载新版libzip源码包
```shell
wget https://libzip.org/download/libzip-1.2.0.tar.gz
```

##### 解压
```shell
tar -zxvf libzip-1.2.0.tar.gz
```

##### 进入源码目录
```shell
cd libzip-1.2.0
```

##### 配置 
```shell
./configure
```

##### 编译安装
```shell
make && make install
```

##### 指定libzip库文件的位置
```shell
export PKG_CONFIG_PATH="/usr/local/lib/pkgconfig/"
```

##### 查看libzip是否安装

```shell
which libzip
```

#### 升级GCC[编译MySQL]

##### 卸载旧版
```shell
yum -y remove gcc
```

##### 安装centos-release-scl
```shell
yum -y install centos-release-scl
```

##### 安装新版GCC
```shell
yum -y install devtoolset-10-gcc devtoolset-10-gcc-c++ devtoolset-10-binutils
```

##### 启用GCC工具
```shell
scl enable devtoolset-10 bash
```

##### 写入环境变量 
```shell
echo 'source /opt/rh/devtoolset-10/enable' >> /etc/profile
```

##### 重新读取环境变量
```shell
source /etc/profile
```

##### 查看gcc版本
```shell
gcc -v
```

## 下载源码包

### 下载Nginx 1.18.0
```shell
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

### 下载MySQL 8.0.23
```shell
wget https://cdn.mysql.com//Downloads/MySQL-8.0/mysql-boost-8.0.28.tar.gz
```

### 下载PHP 8.0.12
```shell
wget https://www.php.net/distributions/php-8.0.12.tar.gz --no-check-certificate # 不检查证书
```

### 下载phpMyAdmin 5.1.3
```shell
wget https://files.phpmyadmin.net/phpMyAdmin/5.1.3/phpMyAdmin-5.1.3-all-languages.tar.gz --no-check-certificate # 不检查证书
```

## 安装Nginx 

### [Nginx官方文档](http://nginx.org/en/docs/)

### 解压
```shell
tar -zxvf nginx-1.18.0.tar.gz
```

### 进入源码目录
```shell
cd nginx-1.18.0
```

### 创建用户组和用户
```shell
groupadd nginx
```
### 添加到nginx用户组,不允许登录操作系统
```shell
useradd -r -g nginx -s /bin/false nginx
```

### 配置 
```shell
./configure --prefix=/usr/local/nginx --user=nginx --group=nginx --with-threads --with-file-aio --with-http_ssl_module --with-http_realip_module --with-http_gzip_static_module
```

### 编译安装
```shell
make && make install
```

### 创建软链接
```shell
ln -s /usr/local/nginx/sbin/nginx /usr/bin
```

### Nginx目录授权
```shell
chown -R nginx:nginx /usr/local/nginx && chmod -R 755 /usr/local/nginx
```

### nginx使用命令

#### 查看nginx信息
```shell
nginx -v  #nginx -V
```

#### 启动nginx
```shell
nginx
```
#### 关闭nginx
```shell
nginx -s quit/stop
```

#### 重启nginx
```shell
nginx -s reload
```

### 配置Nginx解析PHP
```nginx
#将其中的/scripts 修改为 $document_root
#root	web网站目录
server {
	listen       80;
	server_name localhost;
	
	location / {
	index index.php index.html;
	root html;
	}
	
    location ~ \.php$ {
          root           html;
          fastcgi_pass   127.0.0.1:9000;
          fastcgi_index  index.php;
          fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
          include        fastcgi_params;
        }
}
```

## 安装MySQL

### [官方安装文档](https://dev.mysql.com/doc/refman/8.0/en/installing-source-distribution.html)
### [中文翻译文档](http://www.deituicms.com/mysql8cn/cn/web.html)

### 卸载原来系统自带的MySQL及Mariadb

#### 查询是否安装了MySQL
```shell
rpm -qa | grep mysql*
```

#### 卸载MySQL 
```shell
mysqlrpm -e --nodeps mysql*
```

#### 查询是否安装了MariaDB 						
```shell
rpm -qa | grep mariadb* 
```

#### 卸载MariaDB       						
```shell
rpm -e --nodeps mariadb-libs-5.5.68-1.el7.x86_64    
```

### 创建mysql组和用户
```shell
groupadd mysql
```

### 添加到mysql用户组,不允许登录操作系统
```shell
useradd -r -g mysql -s /bin/false mysql
```

### 解压
```shell
tar -zxvf mysql-boost-8.0.28.tar.gz
```

### 进入源码目录
```shell
cd mysql-boost-8.0.28
```

### 创建构建目录
```shell
mkdir build
```

### 进入构建目录
```shell
cd build
```

### CMake编译
```shell
cmake .. -DCMAKE_INSTALL_PREFIX=/usr/local/mysql -DWITH_BOOST=../boost
```

### [CMake安装编译参数讲解](https://www.cnblogs.com/martinzhang/p/3455681.html)

### 编译安装
```shell 
make && make install
```

### 更改权限
```shell
chown -R mysql:mysql /usr/local/mysql
```

### 初始化MySQL
```shell
/usr/local/mysql/bin/mysqld --initialize-insecure --user=mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data
# initialize-insecure 生成空密码
```

### 创建服务
```shell
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
# mysqld名字 对应 service后的名称
```

### 给予服务启动权限
```shell
chmod 755 /etc/init.d/mysqld
```

### 添加环境变量
```shell
echo 'export PATH=$PATH:/usr/local/mysql/bin' >> /etc/profile
```

### 重新读取环境变量
```shell
source /etc/profile
```

### 设置开机自启

```shell
chkconfig --add mysqld # 对应/etc/init.d/mysqld [对应文件名称]
```

### MySQL服务命令

#### 开启服务
```shell
service mysqld start	
```

#### 重启服务
```shell
service mysqld restart
```

#### 停止服务		
```shell
service mysqld stop
```

#### 查看服务状态		
```shell
service mysqld status		
```

### 登录MySql
```shell
mysql -u root -p
```

### 修改MySql用户密码
```sql
ALTER USER root@'localhost' IDENTIFIED BY 'root';

# 报错使用
# 重装PHP 会导致连接不到mysql,改下密码即可
alter user 'root'@'%' identified with mysql_native_password by 'root';
```

### [my.cnf参数详解](https://www.cnblogs.com/panwenbin-logs/p/8360703.html)

### 解决 this is incompatible with sql_mode=only_full_group_by 问题

```shell
# 在/etc/my.cnf的 [mysqld] 下添加
sql-mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION
# 注意 8.0以上已经取消了NO_AUTO_CREATE_USER关键字
```

### 添加远程访问权限

```shell
use mysql;
update user set host = '%' where user = 'root';
flush privileges;
# 重启mysql生效
# 开启3306防火墙
```

## 安装 PHP

### 解压PHP源码包
```shell
tar -zxvf php-8.0.12.tar.gz
```

### 进入源码目录
```shell
cd php-8.0.12
```

### 配置
```shell
./configure \
--prefix=/usr/local/php \
--with-config-file-path=/usr/local/php/etc \
--with-fpm-user=nginx \
--with-fpm-group=nginx \
--with-curl \
--with-gettext \
--with-kerberos \
--with-libdir=lib64 \
--with-mysqli \
--with-openssl \
--with-pdo-mysql \
--with-jpeg \
--with-zlib \
--with-zip \
--enable-fpm \
--enable-mbregex \
--enable-mbstring \
--enable-pcntl \
--enable-soap \
--enable-sockets \
--enable-sysvsem \
--enable-sysvshm \
--enable-xml
```

### [配置报错可以查看](https://www.cnblogs.com/sweetXiaoma/p/5855732.html)

### 安装
```shell
make && make install
```

### 生成php.ini配置文件
```shell
cp /root/php-8.0.12/php.ini-production /usr/local/php/etc/php.ini
```

### 生成php-fpm.conf配置文件
```shell
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
```

### 生成www.conf配置文件
```shell
cp /usr/local/php/etc/php-fpm.d/www.conf.default /usr/local/php/etc/php-fpm.d/www.conf
```

### php-fpm加入systemctl管理(php-fpm.service)
```shell
cp /root/php-8.0.12/sapi/fpm/php-fpm.service /usr/lib/systemd/system/php-fpm.service
```

### 更改php-fpm.service权限

```shell
chmod 755 /usr/lib/systemd/system/php-fpm.service
```

### 更改service配置

```shell
# 打开 /usr/lib/systemd/system/php-fpm.service 把
ProtectSystem=true
# 改成
ProtectSystem=false
```

### 添加PHP环境变量

```shell
echo 'export PATH=$PATH:/usr/local/php/bin' >> /etc/profile
```

### 重新读取环境变量
```shell
source /etc/profile
```

### 重新加载系统服务
```shell
systemctl daemon-reload
```

### 启动php-fpm  
```shell 
systemctl start php-fpm  
```

### 查看php-fpm状态

```shell
systemctl status php-fpm 
```

### 设置php-fpm开机启动 
```shell
systemctl enable php-fpm  
```

### 查看php版本
```shell
php -v
```

### 查看php扩展

```shell
php -m
```

## 安装phpMyAdmin

### 创建Web下应用目录
```shell
mkdir -p /www
```

### 解压源码包到Web应用目录

```shell
tar -zxvf phpMyAdmin-5.1.3-all-languages.tar.gz -C /www/
```

### 生成config.ini.php文件
```shell
mv /www/phpmyadmin/config.sample.inc.php /www/phpmyadmin/config.inc.php
```

### 编辑config.inc.php 

```PHP
$cfg['Servers'][$i]['host'] = 'localhost'; 
# 改成： 
$cfg['Servers'][$i]['host'] = '127.0.0.1';
```

### 解决"配置文件现在需要一个短语密码"

```shell
# 将phpmyadmin/config.inc.php
$cfg['blowfish_secret'] = "";
# 改为 "任意字符32位"
$cfg['blowfish_secret'] = "1234567890987654321234567890987654321";
```

### 生成tmp缓存文件

```shell
mkdir tmp && make -R 777 tmp/
```

## 安装PHP扩展

### 安装xmlrpc扩展

#### 下载源码包
```shell
wget https://pecl.php.net/get/xmlrpc-1.0.0RC1.tgz
```

#### 解压

```shell
tar -zxvf xmlrpc-1.0.0RC1.tgz
```

#### 进入源码目录
```shell
cd xmlrpc-1.0.0RC1
```

#### 使用phpize构建
```shell
/usr/local/php/bin/phpize
```

#### 配置
```shell
./configure --with-php-config=/usr/local/php/bin/php-config
```

#### 编译安装

```shell
make && make install
```

#### 启用扩展

```shell
# 在PHP.ini中 注释/加入 非官方的扩展,需要绝对路径引入
extension=/usr/local/php/lib/php/extensions/no-debug-non-zts-20200930/xmlrpc.so
```

### 安装intl扩展

#### 进入扩展源码目录

```
cd /root/php-8.0.12/ext/intl
```

#### 使用phpize构建

```
/usr/local/php/bin/phpize
```

#### 配置

```shell
./configure --with-php-config=/usr/local/php/bin/php-config
```

#### 编译安装

```shell
make && make install
```

#### 启用扩展

```shell
# 在PHP.ini中 注释/加入 非官方的扩展,需要绝对路径引入
extension=/usr/local/php/lib/php/extensions/no-debug-non-zts-20180731/intl.so
```

### 安装sodium扩展

#### 先安装libsodium

```shell
wget https://download.libsodium.org/libsodium/releases/libsodium-1.0.18.tar.gz
```

```shell
tar -zxcf libsodium-1.0.18.tar.gz
```

```shell
cd libsodium-1.0.18
```

```shell
./configure
```

```shell
make && make install
```

```shell
ldconfig
```

### 安装sodium

```shell
cd /root/php-8.0.12/ext/sodium

/usr/local/php/bin/phpize
./configure --with-php-config=/usr/local/php/bin/php-config
make && make install
```

```shell
extension=/usr/local/php/lib/php/extensions/no-debug-non-zts-20180731/sodium
```

## 安装Composer

### [国内Composer镜像](https://pkg.xyz/how-to-install-composer)

### 下载安装脚本
```shell
php -r "copy('https://install.phpcomposer.com/installer', 'composer-setup.php');"
```

### 执行安装过程
```shell
php composer-setup.php
```

### 删除安装脚本
```shell
php -r "unlink('composer-setup.php');"
```

### 全局安装
```shell
mv composer.phar /usr/local/bin/composer
```

### 更新Composer
```shell
composer selfupdate
```

## 遇到的问题解决

### ThinkCMF 后台验证码不显示

**原因: 未安装gd扩展/未使用freetype安装gd扩展**

#### 下载freetype源码包
```shell
wget http://download-mirror.savannah.gnu.org/releases/freetype/freetype-2.7.tar.gz
```

#### 下载jpeg库
```shell
wget http://www.ijg.org/files/jpegsrc.v8b.tar.gz
```

#### 安装流程
```shell
tar -zxvf freetype-2.7.tar.gz
cd freetype-2.7
./configure --prefix=/usr/local/freetype && make && make install
```

```shell
tar -zxvf jpegsrc.v8b.tar.gz
cd jpegsrc.v8b
./configure --prefix=/usr/local/jpeg-8b && make && make install
```

#### 进入gd扩展源码包
```
cd /root/php-8.0.12/ext/gd
/usr/local/php/bin/phpize
make clean
./configure --with-freetype=/usr/local/freetype --with-jpeg=/usr/local/jpeg-8b --with-php-config=/usr/local/php/bin/php-config
```

#### 启用扩展
```shell
# 在PHP.ini 下
extension=gd

# 重启PHP PHP -m查看扩展
```



## 服务器防火墙

### 查看firewalld状态 [dead状态，即防火墙未开启]

```shell
systemctl status firewalld
```

### 开启防火墙，没有任何提示即开启成功
```shell
systemctl start firewall
```

### 关闭防火墙，没有任何提示则关闭成功
```shell
systemctl stop firewalld
```

### 查看防火墙所有开放的端口
```shell
firewall-cmd --zone=public --list-ports
```

### 开启MySQL防火墙
```shell
firewall-cmd --zone=public --add-port=3306/tcp --permanent
```

###  配置立即生效
```shell
firewall-cmd --reload
```

### 查看防火墙所有开放的端口
```shell
firewall-cmd --zone=public --list-ports
```

## 关闭SELinux

### 查看SELinux状态

```bash
/usr/sbin/sestatus -v 
#SELinux status： enabled
# 或者
getenforce
# enabled
```

### 关闭SELinux方法

```bash
# 临时关闭
setenforce 0 #设置SELinux 成为permissive模式
setenforce 1 #设置SELinux 成为enforcing模式

# 永久关闭
vim /etc/selinux/config
SELINUX=enforcing 
# 改为
SELINUX=disabled
# 重启
```



