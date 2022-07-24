# SSH 长时间未操作断开问题

编辑 sshd_config 配置文件

```shell
vim /etc/ssh/sshd_config
```

添加即可

```shell
# 客户端每隔多少秒向服务发送一个心跳数据
ClientAliveInterval 30
# 客户端多少秒没有相应，服务器自动断掉连接
ClientAliveCountMax 86400
```

重启 ssh 服务

```shell
service sshd restart
```