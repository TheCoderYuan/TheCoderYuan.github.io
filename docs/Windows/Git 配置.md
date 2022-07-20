# Git 配置

Windows 上配置 Git 及一些细节

## 设置用户名和登录邮箱

```shell
# 用户名 / email 按需填写
git config --global user.name 'XieSenYuan'
git config --global user.email '2568951696@qq.com'
```

## 生成SSH密钥

```shell
# 不建议生成带用户名和邮箱的密钥,这样就相当于密钥绑定了用户
ssh-keygen -t rsa -C "XieSenYuan@2568951696@qq.com"

# 这样直接生成密钥即可
ssh-keygen

# id_rsa        私钥文件
# id_rsa.pub    公钥文件
```

## 拉取公司自建的 Git 仓库 SSH 报错解决

```shell
# .ssh 目录下添加 config 文件并写入以下
Host *
HostkeyAlgorithms +ssh-rsa
PubkeyAcceptedKeyTypes +ssh-rsa
```