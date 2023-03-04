# 边狱巴士翻译用软件(还没做完)

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
