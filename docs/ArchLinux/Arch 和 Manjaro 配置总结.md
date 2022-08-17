# Arch 和 Manjaro 配置总结

Arch 和 Manjaro 配置总结

因为 Arch 和 Manjaro 比较相似, 有些配置可以参考

## 目录

### ArchLiveCD 配置

1. [更改终端字体](#更改终端字体)
2. [连接互联网](#连接互联网)
3. [可选：SSH连接](#可选：SSH连接)
4. [更新系统时钟](#更新系统时钟)
5. [自动换源](#自动换源)
6. [手动换源:需联网前设置](#手动换源)
7. [磁盘分区](#磁盘分区)
8. [下载系统](#下载系统)
9. [自动安装脚本](#自动安装脚本)

### Arch 系统配置

1. [进入系统](#进入系统)
2. [时区设置](#时区设置)
3. [本地化设置](#本地化设置)
4. [设置主机名](#设置主机名)
5. [设置root密码](#设置root密码)
6. [安装微码](#安装微码)
7. [安装引导程序](#安装引导程序)
8. [完成安装](#完成安装)

### Arch 配置

1. [创建普通用户](#创建普通用户)
2. [添加ArchLinuxCN源](#添加ArchLinuxCN源)
3. [显示输入密码字符](#显示输入密码字符)

## ArchLiveCD 配置

### 更改控制台字体

> 字体文件路径：/usr/share/kbd/consolefonts/

修改字体

```shell
setfont /usr/share/kbd/consolefonts/ter-c24b.psf.gz
```

### 连接互联网

> 无线连接 和 有线连接，建议有线连接，WIFI 会导致某些密钥无法导入

1. 无线连接

查询网络接口

```shell
ip link					# 列出网络接口
ip link set wlan0 up	# 开启 wlan0 接口
```

查看无线连接是否被禁用

```shell
rfkill list
```

启用无线连接

```shell
rfkill unblock wifi
```

使用 iwctl 连接 wifi

```shell
iwctl
[iwd]# device list					    # 查看网卡接口
[iwd]# station wlan0 get-networks       # 查看wifi
[iwd]# station wlan0 connect CMCC-JnDa  # 连接wifi回车输入密码
[iwd]# exit							    # 退出
```

2.   有线连接

手机USB数据共享即可
然后终端输入 dhcpcd 目的是分配 ip 地址

### 可选：SSH连接

有空闲的电脑的话，可以远程 SSH 连接 ArchLinux 进行更快的安装

**开启 SSH 服务**

```shell
# pacman -S openssh
systemctl start sshd.service
```

**设置 root 密码**

```shell
passwd root
```

### 更新系统时钟

```shell
timedatectl set-ntp true	# 同步时钟
timedatectl status			# 查看状态
```

### 自动换源

>  使用 reflector 来获取速度最快的6个镜像, 并将地址保存至 /etc/pacman.d/mirrorlist
>  新版 archliveiso 会自动更新mirrorlist, 会导致删除某些源, 建议关闭

```shell
# 关闭自动环院
systemctl stop reflector.service

# 自动换源
reflector -c China -a 6 --sort rate --save /etc/pacman.d/mirrorlist
```

### 手动换源

```shell
vim /etc/pacman.d/mirrorlist
# 把 China 源放到最上方

# 若源被自动换源后可以添加到最上方
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

镜像源生成([Arch Linux - Pacman Mirrorlist Generator](https://archlinux.org/mirrorlist/))

### 磁盘分区

> 注意：设置磁盘格式为：gpt

```shell
lsblk					# 查看分区信息
fdisk -l				# 产看磁盘设备
cfdisk /dev/nvme0n1		# 执行分区操作
```

> 分区说明：
>
> EFI 分区：/efi    300M
>
> 根目录：/ 		  100M
>
> 用户目录：/home 全部

| 分区           | 格式 | 挂载点    |
| -------------- | ---- | --------- |
| /dev/nvme0n1p5 | fat  | /mnt/efi  |
| /dev/nvme0n1p6 | ext4 | /mnt      |
| /dev/nvme0n1p7 | ext4 | /mnt/home |

设置分区磁盘格式

```shell
mkfs.vfat /dev/nvme0n1p5
mkfs.ext4 /dev/nvme0n1p6
mkfs.ext4 /dev/nvme0n1p7
```

挂载系统分区
> 挂载顺序从根目录开始,在挂载 efi 分区, 最后挂载 home 分区

```shell
mount /dev/nvme0n1p6 /mnt
mkdir /mnt/efi
mount /dev/nvme0n1p5 /mnt/efi
mkdir /mnt/home
mount /dev/nvme0n1p7 /mnt/home
# swap 分区不需要挂载
```

### 下载系统

```shell
# 安装必须基础包
pacstrap /mnt base base-devel linux linux-headers linux-firmware  #base-devel在AUR包的安装是必须的
# 安装必须的功能性软件 | iwd 联网 | dhcpcd 分配 ip | bash 补全
pacstrap /mnt dhcpcd iwd vim bash-completion
```

**密钥环错误**

[Arch Linux - News: GnuPG-2.1 and the pacman keyring](https://archlinux.org/news/gnupg-21-and-the-pacman-keyring/)

生成 fstab 文件

> fstab 用来定义磁盘分区

```shell
genfstab -U /mnt >> /mnt/etc/fstab
# 复查确保没有报错
cat /mnt/etc/fstab
```

到此，已经从 ArchLiveCD 写入到电脑中了。

### 自动安装脚本

实在是不会的话，ArchLinux 内置了安装脚本

```shell
archinstall
```

## Arch 系统配置

### 进入系统

```shell
arch-chroot /mnt
```

### 时区设置

设置上海时区

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
```

将当前的正确 UTC 时间写入硬件时间

```shell
hwclock --systohc
```

### 本地化设置

去掉 en_US.UTF-8 所在行以及 zh_CN.UTF-8 所在行的注释符号（#）

```shell
vim /etc/locale.gen
```

生成 locale

```shell
locale-gen
```

向 /etc/locale.conf 导入内容

```shell
# 目的：配置全局语言区域设置
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

### 设置主机名

在 /etc/hostname 设置主机名

```shell
vim /etc/hostname
```

或者

```shell
echo '你的 Arch 主机名' > /etc/hostname
```

编辑 /etc/hosts

```shell
vim /etc/hosts
```

加入如下内容

```shell
127.0.0.1	localhost
::1			localhost
127.0.0.1	'你的 Arch 主机名'
```

### 设置root密码

```shell
passwd root
```

### 安装微码

根据 CPU 类型选择安装

```shell
pacman -S intel-ucode   # Intel
pacman -S amd-ucode     # AMD
```

### 安装引导程序

```shell
pacman -S grub efibootmgr   # grub是启动引导器，efibootmgr被 grub 脚本用来将启动项写入 NVRAM。
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=ArchLinux	# ArchLinux 为引导的名称
```

接下来编辑/etc/default/grub 文件，去掉`GRUB_CMDLINE_LINUX_DEFAULT`一行中最后的 quiet 参数，同时把 log level 的数值从 3 改成 5。这样是为了后续如果出现系统错误，方便排错。同时在同一行加入 nowatchdog 参数，这可以显著提高开关机速度。

```shell
vim /etc/default/grub
```

生成 GRUB 所需的配置文件

```shell
grub-mkconfig -o /boot/grub/grub.cfg
```

### 完成安装

```shell
exit                # 退回安装环境#
umount -R  /mnt     # 卸载新分区
reboot              # 重启
```

拔掉U盘，重启

有线连接

```shell
systemctl start dhcpcd  # 立即启动dhcp
ping www.baidu.com      # 测试网络连接
```

无线连接，还需要启动 iwd 才可以使用 iwctl 连接网络

```shell
systemctl start iwd # 立即启动iwd
iwctl               # 和之前的方式一样，连接无线网络
```

## Arch 配置

### 创建普通用户

wheel 附加组可用 sudo，以root用户执行命令 -m同时创建用户家目录

```shell
useradd -m -G wheel -s /bin/bash testuser
```

设置新用户 testuser 的密码

```shell
passwd testuser
```

编辑 sudoers 配置文件
```shell
EDITOR=vim visudo  # 需要以 root 用户运行 visudo 命令
# 去掉注释(#)
%wheel ALL=(ALL) ALL
```

### 添加ArchLinuxCN源

编辑 pacman 配置文件

```shell
sudo vim /etc/pacman.conf

# 编写ArchCNmirrorlist
sudo vim /etc/pacman.d/ArchCNmirrorlist

# 官方源
Server = http://repo.archlinuxcn.org/$arch
# 163源
Server = http://mirrors.163.com/archlinux-cn/$arch
# 清华大学
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch

# 注意：使用顺序，从上往下优先级越来越低，越靠上，优先级越高

# 开启 32 位支持库 [ 去掉[multilib]一节中两行的注释，来开启 32 位库支持 ]
```

安装密钥

```shell
sudo pacman -S archlinux-keyring archlinuxcn-keyring
```

### 显示输入密码字符

```shell
sudo visudo
# 末尾添加
Defaults　pwfeedback
```

