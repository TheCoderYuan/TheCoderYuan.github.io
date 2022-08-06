# SSH 无法使用 root 用户登录

解决方法：

编辑 /etc/ssh/sshd_config

```shell
vim /etc/ssh/sshd_config
```

取消注释并修改 PermitRootLogin 参数为 yes

| 参数                 | 类型   | 登录限制   |
| -------------------- | ------ | ---------- |
| yes                  | 允许   | 无         |
| without-password     | 允许   | 除密码以外 |
| forced-commands-only | 允许   | 仅允许密钥 |
| no                   | 不允许 | 不允许     |

