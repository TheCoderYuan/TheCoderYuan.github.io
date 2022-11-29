---
title: CentOS 7 下源码安装 Nginx
description: CentOS 7 下源码安装 Nginx
authors:
    name: CodeBoyDD
    title: CentOS 7 下源码安装 Nginx
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-11-29
---

:::info

CentOS 7 下源码安装 Nginx 并使用 systemctl 管理 nginx 服务

这里的Nginx是搭配PHP使用的,所以建议Nginx用户与PHP用户一致,以便共同管理web项目及权限分配

:::

### yum安装依赖
```shell
sudo yum install -y gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

### 下载 Nginx 源码包
```shell
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

> 解压源码包并进入安装目录

```shell
tar -zxvf nginx-1.18.0.tar.gz && cd nginx-1.18.0
```

### 创建 nginx 应用的用户及用户组 www:www
```shell
sudo groupadd www && sudo useradd -r -g www -s /sbin/nologin www
```

:::info

**构建参数文档:** http://nginx.org/en/docs/configure.html

**CSDN汉化:** https://blog.csdn.net/guojing1173132123/article/details/83623483

:::

### 配置 Nginx 安装选项(较全)
```shell showLineNumbers
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
--with-http_ssl_module
```

:::tip

| 参数 | 参数说明 |
| ---- | ---- |
| --prefix | 指定 nginx 安装目录; 默认: /usr/local/nginx |
| --sbin-path | 指定执行程序文件存放位置; 默认: prefix/sbin/nginx |
| --conf-path | 指定配置文件存放位置; 默认: prefix/conf/nginx.conf |
| --error-log-path | 指定错误日志存放位置; 默认: prefix/logs/error.conf |
| --pid-path | 指定 pid文件存放位置; 默认: prefix/logs/nginx.pid |
| --lock-path | 指定 lock文件存放位置; 默认: prefix/logs/nginx.lock |
| --http-log-path | 指定access.log路径; 默认: prefix/logs/access.log |
| --user | 指定用户; 默认: nobody |
| --group | 指定用户组; 默认: nobody |
| --with-http_ssl_module | 支持https协议,需要openssl |

:::

### 配置

> 无特殊配置默认一下即可

```shell showLineNumbers
./configure \
--prefix=/usr/local/nginx \
--user=www \
--group=www \
--with-http_ssl_module
```

### 编译安装
```shell
sudo make -j $(nproc) && sudo make install
```

### 创建软连接
```shell
sudo ln -s /usr/local/nginx/sbin/nginx /usr/bin/
```

### 设置nginx应用目录权限
```shell
sudo chown -R www:www /usr/local/nginx && sudo chmod -R 755 /usr/local/nginx
```

### 使用systemctl管理nginx服务
```shell
sudo vim /usr/lib/systemd/system/nginx.service
```

> 编辑文件内容

```shell title=/usr/lib/systemd/system/nginx.service showLineNumbers
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

### nginx服务授权 && 重载服务服务
```shell
sudo chmod 755 /usr/lib/systemd/system/nginx.service && sudo systemctl daemon-reload
```

### 开放80端口防火墙 && 重载防火墙服务
```shell
sudo firewall-cmd --zone=public --add-port=80/tcp --permanent && sudo firewall-cmd --reload
```

### nginx服务命令
```shell
systemctl start nginx       # 开启nginx
systemctl status nginx      # 关闭nginx
systemctl enable nginx      # 自启动ninx
systemctl restart nginx     # 重启nginx
```