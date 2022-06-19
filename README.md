# OhMySite 搭建流程

### 下载 Installation

npx create-docusaurus@latest OhMySite classic

```shell
$ npx create-docusaurus@latest OhMySite classic
```

### 仓库说明 repo explain

**master** 分支 : 保存源代码

**gh-pages** 分支 : 编译后的页面存放

### 创建 CodeBoyDD.github.io 仓库

`默认分支 : master`

>  初始化 + 上传文件源代码

```shell
$ git init
$ git add .
$ git commit -m "first commit"
$ git remote add origin git@github.com:CodeBoyDD/CodeBoyDD.github.io.git
$ git push -u origin master
```

### 创建仓库新分支 gh-pages 拉取新分支

```shell
$ git pull
$ git checkout -b gh-pages origin/gh-pages
```

### 修改 docusaurus.config.js 下 git-page 推送分支

```js
// changes url for you repo
url: 'https://CodeBoyDD.github.io',
// ...
// ...
// GitHub pages deployment config.
organizationName: 'CodeBoyDD',      // Usually your GitHub org/user name.
projectName: 'CodeBoyDD.github.io', // Usually your repo name.
deploymentBranch: 'gh-pages',
trailingSlash: false,

// customer
customFields: {
	//  Put your custom environment here
	GET_USER: 'CodeBoyDD',
	USE_SSH: true,
	DEPLOYMENT_BRANCH: 'gh-pages',
  },
```

### 部署 推送 

>  master 分支下执行,推送到远程 gh-pages 分支

```shell
$ yarn deploy
```

### 本地开发

```shell
$ npm run start
// or
$ yarn run start
```

