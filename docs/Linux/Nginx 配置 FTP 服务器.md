# Nginx 配置 FTP 服务器


### Nginx 配置
编写 Nginx 配置文件 vhosts/file.conf


```shell
autoindex on;			# 显示目录
autoindex_exact_size on;# 显示文件大小
autoindex_localtime on;	# 显示文件时间

server {
    listen       8080 default_server;
    listen       [::]:8080 default_server;
    server_name  _;
    charset utf-8; 					# 中文名的文件不乱码
    root         /www/file; 		# 保存文件的路径
    autoindex_exact_size off;      	# 显示文件大小
    autoindex_localtime on;       	# 显示文件时间
    

    location / {
    	root /www/file;
    	auth_basic "需要账号和密码";		# 验证用户名密码时的说明文字
    	auth_basic_user_file pwd.db;	# 以nginx.conf所在目录的相对路径
    }

}
```

### 登录验证

> 使用openssl加密密码

> openssl -1

> touch pwd.db

> 用户名:密码

将pwd.db文件放到nginx的配置目录

```shell
auth_basic "需要验证用户名和密码";    # 验证用户名密码时的说明文字
auth_basic_user_file pwd.db;    # 以nginx.conf所在目录的相对路径
```