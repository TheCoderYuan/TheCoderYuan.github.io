---
title: CentOS 7 下搭建 FTP 服务器
description: CentOS 7 下搭建 FTP 服务器
authors:
    name: CodeBoyDD
    title: CentOS 7 下搭建 FTP 服务器
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-18
---

参考：[手动搭建FTP站点（CentOS 7） (aliyun.com)](https://help.aliyun.com/document_detail/92048.html)

上面的教程是在关闭防火墙下操作的，开启防火墙下的操作不一样

为什么需要：

1. FTP上传文件比SFTP快，加上服务器的带宽本就低，导致上传大文件缓慢
2. 也可以方便其他非专业人员通过Windows简单的上传文件到服务，无需下载SFTP软件

FTP支持三种登录模式：

1. 匿名用户【这里我不需要】
2. 本地用户
3. 虚拟用户【这里我也不需要】

## 安装vsftpd

```shell
yum install -y vsftpd
```

## 开放21端口防火墙

```shell
firewall-cmd --zone=public --add-port=21/tcp --permanent && firewall-cmd --reload
```

## systemctl管理vsftpd

FTP服务开机自启动

```shell
systemctl enable vsftpd
```

启动FTP服务

```shel
systemctl start vsftpd
```

关闭FTP服务

```shell
systemctl stop vsftpd
```

重启FTP服务

```shell
systemctl restart vsftpd
```

## 配置vsftpd

配置文件没目录：/etc/vsftpd

vsftpd配置文件：

* vsftpd.conf	主要配置文件
* ftpusers          用户黑名单文件，此文件中的用户不允许访问FTP服务器
* user_list          用户白名单文件，此文件中的用户允许访问FTP服务器
* chroot_list      允许离开家目录的用户名单



## 配置参数说明

**用户登录控制说明**

| 参数             | 说明                      |
| ---------------- | ------------------------- |
| anonymous_enable | 是否接受匿名用户          |
| no_anon_password | 匿名用户login时不询问口令 |
| anon_root        | 匿名用户主目录            |
| local_enable     | 是否接受本地用户          |
| local_root       | 本地用户主目录            |

**用户权限控制说明**

| 参数                       | 说明                        |
| -------------------------- | --------------------------- |
| write_enable               | 可以上传文件（全局控制）    |
| local_umask                | 上传文件的权限配合umask使用 |
| file_open_mode             | 上传文件的权限配合umask使用 |
| anon_upload_enable         | 匿名用户可以上传文件        |
| anon_mkdir_write_enable=NO | 匿名用户可以建目录          |
| anon_other_write_enable    | 匿名用户修改删除            |
| chown_username             | 匿名上传文件所属用户名      |

## 下面是配置文件我的翻译理解

```shell
# 是否允许匿名用户登录
anonymous_enable=NO
# 是否启动本地用户登录
local_enable=YES
# 是否允许写入
write_enable=YES
# 用户上传文件权限(本地用户:077;匿名用户:022)
local_umask=077
# 是否允许匿名用户上传
anon_upload_enable=NO
# 是否允许匿名用户创建目录
anon_mkdir_write_enable=NO
# 进入目录消息
dirmessage_enable=YES
# 开启上传/下载日志
xferlog_enable=YES
# Make sure PORT transfer connections originate from port 20 (ftp-data).
connect_from_port_20=YES
# 
chown_uploads=YES
chown_username=whoever
#
xferlog_file=/var/log/xferlog
#
xferlog_std_format=YES
# 会话无操作断开时间
idle_session_timeout=600
# 连接超时时间
data_connection_timeout=120
# unknown
nopriv_user=ftpsecure
#
# Enable this and the server will recognise asynchronous ABOR requests. Not
# recommended for security (the code is non-trivial). Not enabling it,
# however, may confuse older FTP clients.
#async_abor_enable=YES
#
# By default the server will pretend to allow ASCII mode but in fact ignore
# the request. Turn on the below options to have the server actually do ASCII
# mangling on files when in ASCII mode. The vsftpd.conf(5) man page explains
# the behaviour when these options are disabled.
# Beware that on some FTP servers, ASCII support allows a denial of service
# attack (DoS) via the command "SIZE /big/file" in ASCII mode. vsftpd
# predicted this attack and has always been safe, reporting the size of the
# raw file.
# ASCII mangling is a horrible feature of the protocol.
#ascii_upload_enable=YES
#ascii_download_enable=YES
#
# You may fully customise the login banner string:
#ftpd_banner=Welcome to blah FTP service.
#
# You may specify a file of disallowed anonymous e-mail addresses. Apparently
# useful for combatting certain DoS attacks.
#deny_email_enable=YES
# (default follows)
#banned_email_file=/etc/vsftpd/banned_emails
# 允许用户离开家目录
chroot_local_user=YES
chroot_list_enable=YES
# (default follows)
chroot_list_file=/etc/vsftpd/chroot_list
#
# You may activate the "-R" option to the builtin ls. This is disabled by
# default to avoid remote users being able to cause excessive I/O on large
# sites. However, some broken FTP clients such as "ncftp" and "mirror" assume
# the presence of the "-R" option, so there is a strong case for enabling it.
#ls_recurse_enable=YES
#
# When "listen" directive is enabled, vsftpd runs in standalone mode and
# listens on IPv4 sockets. This directive cannot be used in conjunction
# with the listen_ipv6 directive.
listen=NO
#
# This directive enables listening on IPv6 sockets. By default, listening
# on the IPv6 "any" address (::) will accept connections from both IPv6
# and IPv4 clients. It is not necessary to listen on *both* IPv4 and IPv6
# sockets. If you want that (perhaps because you want to listen on specific
# addresses) then you must run two copies of vsftpd with two configuration
# files.
# Make sure, that one of the listen options is commented !!
listen_ipv6=YES

pam_service_name=vsftpd
userlist_enable=YES
tcp_wrappers=YES
local_root=/

# 开启被动模式
pasv_enable=YES
# 设置最大和最下端口[端口数字随意]
pasv_min_port=30000
pasv_max_port=40000
# 允许在非家目录下写入
allow_writeable_chroot=YES
```

## 放行最大和最下端口

```shell
firewall-cmd --zone=public --add-port=30000-40000/tcp --permanent && firewall-cmd --reload
```

