# 边狱巴士翻译器（翻译者用）v0.1.2

需要WebView2环境，win11默认安装了，可以直接运行。
winxp不支持，32位系统没有试过，win7/10没有WebView2的话去[这里](https://developer.microsoft.com/zh-cn/microsoft-edge/webview2/consumer/)安装，很快就能装好，装好就能用。

缓存文件夹是“我的文档\LimbusTranslator\cache”。

输出文件夹是“我的文档\LimbusTranslator\output”，点击保存后会将json文件输出到这里。

不点击保存是不会输出json文件的，但是都会缓存在缓存文件夹里，下次打开还是一样的。


“翻译项”功能用于隐藏不想见到的项或防止误操作，不影响文件输出。

“外键关联”功能目前不能添加新映射，但是有默认model->krname的映射，只在翻译项里把model调成1时适用。

点击打开文件会清空缓存并缓存选的文件，如果有翻到一半的记得提前保存，可以一次把所有要翻的文件打开免得时不时刷新。

# 开发环境及准备工作

## Rust

1. 安装[Rust](https://www.rust-lang.org/)，下载rustup，按引导安装，如果没有msvc需要提前安装msvc.
2. 安装[wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
## Node.js

1. 安装[node.js](https://nodejs.org/zh-cn/download/)
2. 安装yarn `npm install -g yarn`
## 依赖

1. 下载安装本仓库`git clone https://github.com/kkr223/limbusTranslator.git`
2. 进入文件夹`cd ./lormed/`，安装依赖`yarn install`

# 运行

1. 只运行web应用
```
yarn dev
```
2. 运行tauri桌面应用
```
yarn tauri dev
```

# 构建
1. 编译web文件
```
yarn build
```
  编译完成的文件在`./dist`里

2. 编译web文件并打包桌面应用
```
yarn tauri build
```
  安装包在`./src-tauri/target/release/bundle/msi`里

# 其他
推荐使用vscode作为ide，以下是推荐的扩展
1. Volar：vue3的扩展
2. rust-analyzer：rust的扩展
3. Tauri：tauri的扩展
