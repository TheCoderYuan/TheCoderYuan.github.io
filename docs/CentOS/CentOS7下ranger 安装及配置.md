---
title: CentOS 7 下 Ranger安装及配置
description: CentOS 7 下 Ranger安装及配置
authors:
    name: CodeBoyDD
    title: CentOS 7 下 Ranger安装及配置
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-18
---

前提条件是安装了 epel-release 依赖

下载 pip3
```shell
yum -y install python3-pip
```
或者使用 dnf 下载
```shell
dnf -y install python3-pip
```

安装 ranger
```shell
pip3 install ranger-fm
```