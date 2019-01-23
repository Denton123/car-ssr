# ssr-nuxt

> 基于 `nuxtjs@2.3.4`

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn start

# generate static project
$ yarn run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

---

# 迁移指南

**_基于 `vue-cli` 项目迁移至 `nuxtjs`_**

迁移需要注意以下几点：

- 文件结构（结构需遵循nuxt构建的项目调整）

- 引用路径（目录结构一变，模块路径肯定需要调整）

- 第三方库的引用（并非引入即用那么简单，需要进行相关配置，而且使用方法可能需要根据情况改变）

- 样式引入（全局样式已引入，第三方样式根据需要引入，其它不需要动）

- 数据获取（需要在 `pages` 下的页面中通过 `asyncData` 去获取数据）

- 对于 `window` 或 `document` 对象，在服务端渲染会报错，需要根据情况去避免该报错

### 以下实践方案主要针对 《尖锋咖》 项目，提供有效快速的迁移手段

> 文件结构

- 主页面统一放到 `pages` 文件夹下，其余组件根据原项目结构迁移至 `components` 中的对应文件中

- 如原项目存在自定义文件夹如 `http` 、 `utils`等，则直接迁移至根目录

> 路由配置

- `pages`下文件结构即是路由，路由自动生成，因此页面组件需抽离页面文件夹

- 路由参数通过 `_(下划线)` 识别，文件夹下 `index.vue` 视为主路由组件

- 动态路由如 `/:model/detail/:id` 和首页 `/` 看起来应该是这样的

```
├─ pages
│   │
│   ├─ _model
│   │   │
│   │   ├─ detail
│   │   │   │
│   │   │   ├─ _id.vue (path: '/:model/detail/:id')
│   │
│   ├─ index.vue (path: '/')
```

> 快速替换路径

先根据路径配置 `resolve.alias`，再通过编译器全局查找替换。

为方便迁移过程路径替换，目前已内置以下几个别名：

| alias        | 目录            | 举例                                           |
| ------------ | --------------- | ---------------------------------------------- |
| `@`          | `src`（根目录） | `@/assets/your_image.png`                      |
| `assets`     | `/assets`       | `background: url('~assets/images/car.png')`    |
| `components` | `/components`   | `import BigCoursel from components/BigCoursel` |
| `http`       | `/http`         | -                                              |
| `utils`      | `/utils`        | -                                              |

> 第三方库引入

```js
// vue-swiper.js
import Vue from 'vue'

export default () => {
  // 指定在浏览器端才引入
  if (process.browser) {
    const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
    Vue.use(VueAwesomeSwiper)
  }
}

// nuxt.config.js
module.exports = {
    plugins: ['@/plugins/vue-swiper']
}
```

> 样式引入

- `styleResources` 引入全局变量

- `css` 引入全局样式

- 其它模块样式无需改动

> 数据获取（异步数据获取）

有些页面是需要先在服务端获取数据后进行渲染再传给客户端，那么可以通过 `pages`（只在该文件夹下提供）下的页面中添加 `asyncData` 方法。

```js
export default{
    // 在组件初始化前调用
    // 接收一个上下文对象参数
    async asyncData(context){
        // 进行异步数据获取操作
        // 返回对象
        return {}
    }
    // asyncData返回对象会合并到data中
    data(){
        return {}
    }
}
```

由于子组件不支持异步数据获取，所以根据实际情况进行数据获取操作：

- 在主页面获取数据后通过 `props` 传递给子组件，可正常进行服务端渲染（缺点：可读性低，因为需要加载其它组件数据）

- 在组件的 mounted 方法里面实现异步获取数据的逻辑，之后设置组件的数据（缺点：不支持服务端渲染）

总之，以上两点根据情况取舍。

> `window` 或 `document` 对象未定义？

- 由于服务端不支持，所以可通过 `process.client` 来判断引入：

```js
if (process.browser) {
  require('external_library')
}
```

- 也可通过 `NOSSR` 组件来让服务端忽略该节点：

```html
<no-ssr>
    <comments>该组件仅在客户端渲染</comments>
</no-ssr>
```

- 添加第三方库时，可通过设置 `ssr` 为 `false`：

```js
// nuxt.config.js
module.export = {
    plugins: [{
        src: '@/plugins/example',
        // 通过设置 ssr 为 false 避免在服务端引入
        ssr: false
    }]
}
```

- 利用服务端只执行 `beforeCreate` 和 `created` 钩子的特性，可在其它钩子中使用：

```js
export default{
    beforeMount(){
        localStorage.setItem('xxx', 'xxx')
    },
    mounted(){},
    // ...其它钩子
}
```