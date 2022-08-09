# 查询 Linux 发行版本

用于查询 Linux 发行版本的 Shell 脚本

```shell
#!/bin/bash
# 原理是： cat /etc/os-release
source /etc/os-release

echo $ID
echo $NAME
```

还有一个

```shell
if [[ "$OSTYPE" == "linux-gnu" ]]; then
	echo "当前操作系统: Linux"
    if [ -f /etc/redhat-release ]; then
        echo "当前发行版本: Redhat Linux"
    elif [ -f /etc/arch-release ]; then
        echo "当前发行版本: Arch Linux"
    elif [ -f /etc/debian_version ]; then
        echo "当前发行版本: Ubuntu/Debian Linux"
    else
        echo "未知发行版本"
    fi
elif [[ "$OSTYPE" == "darwin"* ]]; then
    echo "当前操作系统: Mac OS (Darwin)"
else
    echo "未知操作系统"
fi
```