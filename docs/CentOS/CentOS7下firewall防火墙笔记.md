---
title: CentOS 7 下 FireWall 防火墙笔记
description: CentOS 7 下firewall防火墙笔记
authors:
    name: CodeBoyDD
    title: CentOS 7 下firewall防火墙笔记
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-18
---

:::info

CentOS 7 默认使用的防火墙是 firewall, 代替了之前的 iptables

firewall 有 --zone 域管理(默认: public) --port 端口管理 services 服务管理

还可以实现端口转发

:::

### 查看帮助
```shell
firewall-cmd --help
```

### 更新防火墙规则
```shell
firewall-cmd --reload
```
## 端口管理

### 查看所有打开的端口
```shell
firewall-cmd --list-ports
```
### 更加全面的信息
```shell
firewall-cmd --list-all
```

### 永久打开3306/tcp端口
```shell
firewall-cmd --zone=public --permanent --add-port=3306/tcp
```

### 关闭3306/tcp端口
```shell
firewall-cmd --zone=public --permanent --remove-port=3306/tcp
```

