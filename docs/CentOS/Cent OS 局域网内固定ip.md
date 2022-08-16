# Cent OS 局域网内固定ip

Cent OS 局域网内固定ip

场景: 家里的 WIFI 局域网环境

类似 Windows 下的 "网络连接" 设置
进入网络配置目录
```shell
cd /etc/sysconfig/network-scripts/
```

编辑网络配置
```shell
# 文件因人而异 (我家的 WIFI 是 CMCC-JnDa)
vim ifcfg-CMCC-JnDa
``` 

```shell
ESSID=CMCC-JnDa
MODE=Managed
KEY_MGMT=WPA-PSK
SECURITYMODE=open
MAC_ADDRESS_RANDOMIZATION=default
TYPE=Wireless
PROXY_METHOD=none
BROWSER_ONLY=no
# BOOTPROTO=dhcp
# 设置静态ip
BOOTPROTO=static
DEFROUTE=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_FAILURE_FATAL=no
IPV6_ADDR_GEN_MODE=stable-privacy
NAME=CMCC-JnDa
UUID=77120448-657a-4892-b10c-c52b03a60a89
ONBOOT=yes
# 设置固定的ip地址
IPADDR=192.168.1.10
# 设置子网掩码
NETMASK=255.255.255.0
# 设置网关
GATEWAY=192.168.1.1
# 设置DNS [可选]
DNS1=114.114.114.114
DNS2=8.8.8.8
```

以上信息不知道的可以在 Windows 下连接 WIFI 在 CMD 中 运行 ipconfig 可查看网络信息
```shell
ipconfig
```

查看网卡接口
```shell
ip addr
```

