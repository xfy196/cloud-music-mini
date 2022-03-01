# 原生小程序打造仿造网易云webapp

![在线体验地址](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272028947.jpg)



如果需要更改网易云接口请参考 [网易云接口提供者](https://github.com/Binaryify/NeteaseCloudMusicApi)

打开方式:
1. 将项目 clone 下来
```shell
$ git clone https://github.com/xfy196/cloud-music-mini.git
$ cd cloud-music-mini
```
接下来，要记得把`src/config/config.js`中把`baseUrl`改成接口的地址。（一定要记得,不然报404!）

2. 运行
将包导入微信开发小程序即可

项目介绍:

说明:本项目参考网易云音乐安卓端app界面开发，基础UI绝大多数自己来构建，算是对自己的一个挑战，在这个过程也学到了不少设计经验。

![](https://user-gold-cdn.xitu.io/2019/8/11/16c80048984d1af3?w=1423&h=1092&f=png&s=407282)

### 功能介绍

#### 1、推荐部分

首页推荐:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202271955634.png)

推荐歌单详情:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272032038.png)

空中切入切出效果，另外还有随着滑动会产生和标题跑马灯效果。
在歌单中歌曲数量过多的情况下，做了分页处理，随着滚动不断进行上拉加载，防止大量DOM加载导致的页面卡顿。

#### 2、歌手部分
歌手列表:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272033491.png)

这里做了异步加载的处理，上拉到底进行新数据的获取，下拉则进行数据的重新加载。

歌手详情:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272033014.png)


#### 3、排行榜

榜单页:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272034524.png)

榜单详情:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272034743.png)

#### 4、播放器

播放器内核:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272035215.png)

播放列表:

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272035461.png)

会有移动端app一样的反弹效果。

#### 5、搜索部分

![](https://cdn.jsdelivr.net/gh/xfy196/images@main/202202272036748.png)


### 未来规划和展望
目前这个项目的核心已经完成，但是还是有很多扩展的余地。关于未来的规划，我是这么安排的:

- 完成收藏、播放历史功能
- 完成登录功能和评论模块
- 实现MV模块
- 未来更多功能待补充...

这个项目长期维护，希望大家踊跃提issue和pr，把这个项目打造得更加完美，帮助到更多的react开发者！

