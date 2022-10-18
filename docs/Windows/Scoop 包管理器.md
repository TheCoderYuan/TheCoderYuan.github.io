---
title: Scoop 包管理器
description: Windows 下的软件包管理器
authors:
    name: CodeBoyDD
    title: Scoop 包管理器
    url: https://github.com/codeboydd
    image_url: https://github.com/codeboydd.png
    email: 2568951696@qq.com
date: 2022-10-15
---

# Scoop 包管理器

:::info
为什么选择scoop?

与scoop类似的软件包管理器有: Chocolatey, WinGet[微软]

scoop目录统一, 环境变量统一, 安装卸载简洁方便, 软件源众多, 允许用户自行构建软件仓库
:::

### 关闭烦人的 UAC
:::danger
```powershell
Set-ItemProperty -Path REGISTRY::HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Policies\System -Name ConsentPromptBehaviorAdmin -Value 0
```
:::

## 安装 scoop

:::tip
scoop 官网: https://scoop.sh/
:::

### 普通用户安装

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser # Optional: Needed to run a remote script the first time
irm get.scoop.sh | iex
```

### [自定义安装](https://github.com/ScoopInstaller/Install#readme)

## 一些 scoop 命令
:::info
```shelle
# 部分使用基本命令
scoop help					帮助
scoop update				更新
scoop install/uninstall		安装/卸载
scoop list					安装列表
scoop search 				搜索[支持通配符]
scoop cache					缓存
scoop checkup    			检查问题
scoop cleanup				清理旧版本
scoop hold/unhold			禁用/启用更新
scoop prefix				返还软件目录
scoop which 				查看可执行程序路径[类似Linux的which]
scoop reset 				重置应用程序以解决冲突/切换应用程序版本
scoop info					查看软件包信息
scoop alias          		管理别名
scoop cat					Show content of specified manifest
scoop home           		打开应用程序主页
scoop config         		获取或设置配置值
scoop export         		导出(一个可导入的)已安装的应用程序列表
```
**实用命令**
```shell
scoop cache clean *    # 清理软件包下载缓存
scoop checkup          # scoop 健康检测
scoop status           # scoop 软件状态检测
```
:::

## 安装 git
```shell
scoop install git
```

## 配置 git
```shell
git config --global user.name "CodeBoyDD"
```
```shell
git config --global user.email "2568951696@qq.com"
```

## 生成 ssh 密钥
```shell
ssh-keygen -t rsa
# 私钥: ~/.ssh/id_rsa
# 公钥: ~/.ssh/id_rsa.pub
```

## 安装 sudo 提权工具
```shell
scoop install sudo
```

## scoop 健康检测
```shell
scoop checkup
```

## 导入 scoop 官方软件源
```shell
scoop bucket known list
scoop bucket add extras
scoop bucket add nerd-fonts
scoop bucket add versions
scoop bucket add nonportable
scoop bucket add nirsoft
```

## 一些要用的社区三方源
```shell
scoop bucket add echo   https://github.com/echoiron/echo-scoop
scoop bucket add dorado https://github.com/chawyehsu/dorado
scoop bucket add dodorz https://github.com/dodorz/scoop
# 国人整合的社区源头
scoop bucket add apps https://github.com/kkzzhizhou/scoop-apps
```

## 安装更好 scoop 搜索
```shell
scoop install scoop-search
```

## 安装 scoop 自动补全
> 配置补全: https://github.com/Moeologist/scoop-completion/blob/master/README.zh.md

```shell
scoop install scoop-completion
```

## 安装 vs 运行库
```shell
# vcredist 包含了 2005-2013, 其他的需要其他包
scoop install vcredist

# 按需选择安装
scoop install vcredist2015 vcredist2017 vcredist2019 vcredist2022
```

## 安装下载工具 Motrix
```shell
scoop install motrix
```

## 安装卸载工具 Geek
```shell
scoop install geekuninstaller
```

## 安装 Chrome 浏览器
```shell
scoop install googlechrome
```

## 安装文本编辑器 Notepad3
```shell
scoop install extras notepad3
```

## 安装资源监控软件 TrafficMonoitor
```shell
scoop install extras/trafficmonitor-lite
```

## 安装U盘驱动器制作 Rufus
```shell
scoop install rufus
```

## 安装系统使用工具 dism++
```shell
scoop install dismplusplus
```

## 安装压缩软件 WinRAR
```shell
scoop install winrar
```

## 安装字体 JetBrainsMono 
> 强烈建议: 管理员-全局方式安装 -g / --global

```shell
scoop install -g JetBrainsMono JetBrainsMono-NF-Mono
```

## 安装文件传输软件 WinScp
```shell
scoop install winscp
```

## 安装截图工具 Snipaste
```shell
scoop install snipaste
```

## 安装 PowerShell Core 7
```shell
scoop install pwsh
```

## 安装代码编辑器 VScode
```shell
scoop install vscode
```

## 安装 Nodejs
```shell
scoop install nodejs
```

## 安装 yarn
```shell
scoop install yarn
```

## 安装 node 版本管理工具
```shell
scoop install nvm
```




