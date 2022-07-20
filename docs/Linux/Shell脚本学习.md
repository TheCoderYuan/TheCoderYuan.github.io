# Shell脚本学习

Shell 脚本学习记录

## 变量

### 1. 声明变量

> 变量名和等号之间不能有空格

```shell
#!/bin/bash
variable="DDBGW"
```

### 2. 使用定义过的变量

```shell
#!/bin/bash
echo $variable
# 或 { } 识别变量的边界
echo ${variable}

# 已定义过的变量可以被重新定义
# 第二次赋值不能写 $variable="XXX"

variable="DD"
echo ${variable}
```

### 3. 只读变量

```shell
#!/bin/bash
readonly url="https://www.baidu.com"
```

### 4. 删除变量

```shell
#!/bin/bash
unset url
```

### 5. 变量类型

> 局部变量
> 环境变量 
> 全局变量

### 6. Shell字符串

> 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

```shell
#!/bin/bash
str='this is a string'
```

**拼接字符串**

```shell
#!/bin/bash
my_name="xsy"
str="Hello, my name is \"${my_name}\"! \n"
echo -e $str
```

**单引号与双引号**
> 双引号里可以有变量
> 双引号里可以出现转义字符

```shell
#!/bin/bash
your_name="runoob"
# 使用""
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1

# 使用''
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2 $greeting_3
```

**获取字符串长度**
```shell
#!/bin/bash
string="abcd"
echo ${#string}
```

### 7. Shell数组

**bash只支持一维数组(没有限制大小)**

```shell
#!/bin/bash
array_name=(v1 v2 v3 v4 v5)
# 或
array_name=(
v1
v2
v3
v4
v5
)
# 或
array_name[0]=v1
```

**读取数组**

```shell
#!/bin/bash
va=${array_name[1]}
```

**使用 @ 可以获取数组中所有的元素**

```shell
#!/bin/bash
echo ${array_name[@]}
```

**获取数组长度**

```shell
#!/bin/bash
length=${#array_name[@]}
# 或
length=${#array_name[*]}
```

**获取数组单个元素的长度**

```shell
#!/bin/bash
length=${#array_name[n]}
```

### 8. 注释

```shell
# 单行注释

# 多行注释
:<<EOF
xxxx
xxxx
xxxx
EOF
```

## 传递参数

```shell
#!/bin/bash
echo "Shell 传递参数实例！";
#  $0 为执行的文件名（包含文件路径）
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

```shell
$ chmod +x test.sh 
$ ./test.sh 1 2 3
Shell 传递参数实例！
执行的文件名：./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
```