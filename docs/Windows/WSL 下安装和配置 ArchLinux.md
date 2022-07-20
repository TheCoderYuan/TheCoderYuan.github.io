# WSL下安装和配置 ArchLinux

Windows 上 WSL 安装 ArchLinux

## 配置 WSL

### 启用 WSL

用管理员打开 PowerShell 输入
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

### 升级 WSL 2

* x64系统 win10 1903 或者更高

* win + R 输入 winver查看版本

### 启用虚拟平台

用管理员打开 PowerShell 输入
```powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

### 下载Linux内核升级包

新版本的 Windows 可能会安装有, 按需下载更新

下载地址：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi


### 设置 WSL 2 为默认版本

用管理员打开 PowerShell 输入
```powershell
wsl --set-default-version 2
```

## 安装 LxRunOffline 

* 下载地址：https://github.com/DDoSolitary/LxRunOffline/releases
* 下载后将LxRunOffline.exe放入任意一个path文件夹下（比如C:/Windows/System32）

> 或者

```shell
# 前提是安装了 Scoop
scoop install extras/lxrunoffline
```

## 下载 ArchLinux

* 下载地址：https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/latest/

* 找到 archlinux-bootstrap-2020.10.01-x86_64.tar.gz， 注意是 tar.gz文件

## 安装 Arch Linux WSL

### 运行 LxRunOffline 安装 ArchLinux 到 WSL

```shell
LxRunOffline i -n <自定义名称> -f <Arch镜像位置> -d <安装系统的位置> -r root.x86_64
```

```shell
lxrunoffline i -n arch -f C:\Linux\archlinux-bootstrap-2022.06.01-x86_64.tar.gz -d C:\Linux -r root.x86_64
```

### 转化为 WSL 2

```powershell
wsl --set-version arch 2
```

## 配置 ArchLinux

### 进入系统

```powershell
wsl -d arch
```

### 修改pacman源

> 由于系统内没有内置编辑器, 所以需要调用 Windows 的编辑器来修改文件内容

```shell
cd /etc/
explorer.exe .

# 添加 archlinuxcn 源
# 修改 /etc/pacman.conf 添加
[archlinuxcn]
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch

# 修改 /etc/pacman.d/mirrorlist
# 将 China 源取消注释置顶
```

### 更新系统

```shell
pacman -Syy

# 更新密钥
pacman-key --init
pacman-key --populate

# 安装密钥
pacman -S archlinux-keyring

# 安装 archlinuxcn 源密钥
pacman -S archlinuxcn-keyring

# 更新系统
pacman -Syyu
```

### kernal tool old 问题解决

对于新安装的arch-wsl，在keyring初始化完成之后，可以通过指定archlinuxcn的glibc源来解决
```shell
pacman -S archlinuxcn-keyring
pacman -Syu --nodeps glibc-linux4
```

### 安装系统及系统应用

> 按需下载即可

```shell
pacman -S base base-devel vim git wget neovim zsh
```

### 用户管理

设置 root 密码

```shell
passwd root
```

创建普通用户
```shell
# yuan 为自身用户名
useradd -m -G wheel -s /bin/bash yuan
```

设置用户密码
```shell
passwd yuan
```

将 wheel 组提权
```shell
vim /etc/sudoers

# 取消注释
# wheel ALL=(ALL) ALL
```

### 设置普通用户登录 ArchLinux

查看用户id
```shell
id -u yuan
```

退出系统
```shell
exit
```

PowerShell 中执行
```shell
# lxrunoffline su -n <你的arch名字> -v <账户id>
lxrunoffline su -n arch -v 1000
```

## ArchWSL 配置到 WindowsTerminal

新增配置文件, 将 wsl -d arch 命令写入设置 "命令行" 即可



