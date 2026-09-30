# 贡献指南

欢迎为 SPlayer-Next 贡献代码！本页介绍本地开发环境与基本约定。

## 环境要求

- **Node.js** >= 22.19.0
- **pnpm** >= 10
- **Rust 工具链**（构建原生模块所需，见 [原生模块](/native)）

## 快速开始

```bash
# 克隆仓库
git clone https://github.com/Aruvelut-123/SPlayer-Next-ios15.git
cd SPlayer-Next-ios15

# 安装依赖
pnpm install

# 启动移动端网页预览（浏览器中调试界面）
pnpm mobile:dev

# 在 iOS 模拟器或真机上运行（需 macOS 与 Xcode）
pnpm ios:dev
```

只做界面开发、想跳过 Rust 编译时，可设置 `SKIP_NATIVE_BUILD=true`。

## 构建

本项目只发布 iOS / iPadOS 版本，产物为未签名 IPA。

```bash
pnpm mobile:build   # 构建 iOS 移动端前端资源（Siri 扩展 + 主包，并校验产物完整性）
pnpm ios:build      # 调用 Tauri 构建 iOS 应用（需 macOS 与 Xcode）
```

首次在本地初始化 iOS 工程：

```bash
pnpm ios:init       # 生成 src-tauri/gen/apple
```

正式发布与日常构建均由 GitHub Actions 完成，详见 [iOS 构建](/ios-unsigned)。

## 常用脚本

```bash
pnpm typecheck        # tsc + vue-tsc（node + web 双目标）
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm build:native     # 仅构建 Rust 原生模块（加 `--dev` 为 debug 构建）
pnpm test             # 运行 Node 与 Web 两套单元测试
```

## 项目结构

```
src/                渲染层：Vue 3 单页应用（移动端入口见 src/mobile）
src/mobile/         iOS 端平台适配：更新检测、Siri、原生播放器桥接等
src-tauri/          Tauri 原生外壳与 iOS 工程配置
electron/           共享的主进程逻辑（网络、登录、服务等），供移动端复用
native/             Rust 原生模块（NAPI-RS）
shared/             跨进程共享的类型与默认配置
docs/               VitePress 文档
```

## 代码约定

- **注释**：一律中文，方法使用 JSDoc（`@param 名 - 说明` / `@returns`）；只在「为什么」不显然处写注释。
- **格式**：遵循 Prettier 配置（双引号、分号、100 列、尾随逗号）；提交前请运行 `pnpm format`。
- **类型检查**：提交前确保 `pnpm typecheck` 与 `pnpm lint` 通过。
- **原生类型**：从 `@splayer/*` 导入，切勿手写 `native/*/index.d.ts`。
- **提交信息**：使用 Conventional Commits，格式为 `<类型>: <中文摘要>`；标题保持单行，
  无特殊说明不附正文。类型按改动选择，如
  `feat`、`fix`、`refactor`、`perf`、`docs`、`test`、`build`、`ci`、`style`、`chore`。

## 国际化

本项目使用 [vue-i18n](https://vue-i18n.intlify.dev/) 进行国际化

### Visual Studio Code 系列

推荐使用 [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) 插件

1. 安装插件
2. 打开本项目，打开 `.vscode` 文件夹（若找不到，需要打开显示隐藏文件）
3. 编辑或新建 `settings.json` 文件，编辑或新增 `i18n-ally.localesPaths`，值为 `./src/i18n/locales/`，就像这样
   ```json
   {
     "i18n-ally.localesPaths": "./src/i18n/locales/"
   }
   ```

### JetBrains 系列

推荐使用 [Easy i18n](https://plugins.jetbrains.com/plugin/16316-easy-i18n) 插件

1. 安装插件
2. 打开本项目，在 **设置 → 工具 → Easy i18n** 中配置此插件
3. 在 **Modules Configuration → Add new module**，输入 SPlayer-Next（或任意名称），点击右侧的加号，新建模块
4. 在下方的配置中，找到 **Preset** 选择 **VUE_I18N**。在 **Resource Configuration** 的 **Path template** 中填写 `$PROJECT_DIR$/src/i18n/locales/{locale}.json`
5. (可选) 在上方的 **Common Configuration** 的 **Preview locale** 中填写 `zh-CN`

## 提交 Pull Request

1. 从 `dev` 分支切出特性分支进行开发；
2. 确保 `pnpm typecheck`、`pnpm lint` 通过，并已 `pnpm format`；
3. 向 `dev` 分支提交 PR，清晰描述改动动机与内容。

感谢你的贡献 💖
