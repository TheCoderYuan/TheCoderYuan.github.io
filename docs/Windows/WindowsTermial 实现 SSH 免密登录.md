# WindowsTermial SSH 免密登录

### Windows 端

生成公私钥

文件路径: $HOME/.ssh/

公钥: id_rsa_pub

私钥: id_rsa

```shell
ssh-keygen
```

上传到 Linux 端的 ~/.ssh/ 并修改名称为 authorized_keys

修改权限
```shell
chmod 600 ~/.ssh/authorized_keys
```

### Linux 端

修改 /etc/ssh_config 文件

```shell
vim /etc/ssh_config
```

取消注释

```shell
# 启用公钥链接
PubkeyAuthentication yes

# The default is to check both .ssh/authorized_keys and .ssh/authorized_keys2
# but this is overridden so installations will only check .ssh/authorized_keys
AuthorizedKeysFile .ssh/authorized_keys
```

重启 SSH 服务

```shell
service sshd restart
```




