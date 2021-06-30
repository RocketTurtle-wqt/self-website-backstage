## self-website-backstage（后端项目）安装步骤

1. 将项目克隆到本地

```shell
git clone https://github.com/rocketturtlewqt/self-website-backstage.git
```

2. 安装相关依赖

```shell
npm i
```

3. 更改mysql配置

![更改mysql数据配置](https://rocketturtlewqt.github.io/2021063095548aft.png)

- 找到self-website-backstage/config/config.default.js
- 只需要更改client部分即可

4. 安装数据库及表

- 创建数据库
- sql文件在sql目录下，直接跑一下即可

5. 启动项目

```shell
npm run dev
```