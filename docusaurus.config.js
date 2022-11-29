// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'OH My Site',
  tagline: '欢迎来到我的站点',
  url: 'https://CodeBoyDD.github.io',
  baseUrl: '/',
  staticDirectories: ['public', 'static'],
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  organizationName: 'CodeBoyDD',      // Usually your GitHub org/user name.
  projectName: 'CodeBoyDD.github.io', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  customFields: {
    //  Put your custom environment here
    GET_USER: 'CodeBoyDD',
    USE_SSH: true,
    DEPLOYMENT_BRANCH: 'gh-pages',
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/CodeBoyDD/CodeBoyDD.github.io/tree/master/',
          routeBasePath: '/',
        },
        // 关闭blog模块
        blog: false,
        theme: {
          // 引入自定义css样式
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 导航栏
      navbar: {
        title: '笔记',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: '项目简介',
            label: '笔记',
            position: 'left',
          },
          {
            href: 'https://github.com/codeboydd',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        // 添加代码块高亮语法,开发时需重启服务
        additionalLanguages: ['powershell', 'php', 'sql', 'nginx'],
        // 代码块主题
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
      },
      docs: {
        // 侧边栏设置
        sidebar: {
          // 自动隐藏非焦点项目
          autoCollapseCategories: true,
          // 收起导航栏
          hideable: true,
        },
      },
    }),
};

module.exports = config;
