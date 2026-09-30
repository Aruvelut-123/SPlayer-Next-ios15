# iOS Actions

日常构建入口为 `.github/workflows/ios-unsigned.yml`，在 `main` 的相关代码变更时触发，也可手动运行。macOS 侧的构建步骤集中在可复用工作流 `.github/workflows/build-ios-ipa.yml`，`ios-unsigned.yml` 与 `release.yml` 都调用它，避免两套构建逻辑漂移。

- Linux：复用 `ci.yml`，执行格式、Lint、类型、完整 Vitest，以及 Siri 后台 API 和清单测试。
- macOS：与 Linux 并行，执行 Swift 队列、均衡器、歌词、下载器测试，构建并核验未签名 IPA。
- Action 通道：上述两项都通过后上传；发布脚本还会检查提交是否仍为 `main` 最新版本。

正式发布由 `release.yml` 在 `v*` 标签触发，除桌面安装包外还构建 IPA，并以 `SPlayer-Next-iOS-unsigned-<版本>.ipa` 一起挂到 Release。日常构建产物文件名保持 `SPlayer-Next-iOS-unsigned.ipa`，Action 通道的上传脚本依赖该名称。

同一分支的新提交自动取消旧构建。PR 单独执行 CI；不对 PR 发布安装包。

依赖使用锁文件安装，跳过不用于 iOS 的 Electron、SQLite 等安装脚本。Rust 缓存保留工作区产物，原生源码改变会更新缓存键，Cargo 仍负责判断是否需要重新编译。

自动模拟器冒烟已从日常构建移除。测试源码和手动诊断工作流仍保留；单元测试通过不等于 AirPlay、Siri 等功能已经完成真机验证。

优化前参考：构建 `34469244378` 的 IPA job 耗时 7 分 23 秒，编译步骤 4 分 21 秒。优化后的实际耗时以 Actions 为准，冷缓存与热缓存应分开比较。
