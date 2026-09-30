# Contributing

Thank you for contributing to SPlayer-Next. This page covers the local environment and core conventions.

## Requirements

- **Node.js** >= 22.19.0
- **pnpm** >= 10
- **Rust toolchain** for [native modules](/en/native)

## Getting started

```bash
git clone https://github.com/Aruvelut-123/SPlayer-Next-ios15.git
cd SPlayer-Next-ios15
pnpm install

# Preview the mobile UI in a browser
pnpm mobile:dev

# Run on an iOS simulator or device (requires macOS and Xcode)
pnpm ios:dev
```

Set `SKIP_NATIVE_BUILD=true` to skip Rust compilation during renderer-only development.

## Building

This project ships iOS / iPadOS only, as an unsigned IPA.

```bash
pnpm mobile:build   # Build the iOS frontend bundles (Siri extension + main) and verify them
pnpm ios:build      # Build the iOS app via Tauri (requires macOS and Xcode)
```

Run `pnpm ios:init` once to generate `src-tauri/gen/apple` locally.

## Common scripts

```bash
pnpm typecheck
pnpm lint
pnpm format
pnpm build:native
pnpm build:native --dev
```

## Project structure

```text
src/                Vue 3 renderer application (mobile entry lives in src/mobile)
src/mobile/         iOS platform adaptation: updates, Siri, native player bridge
src-tauri/          Tauri native shell and iOS project configuration
electron/           Shared main-process logic (network, login, services) reused by mobile
native/             Rust native modules built with NAPI-RS
shared/             Cross-process types and defaults
docs/               VitePress documentation
```

## Conventions

- Write code comments in Chinese. Use standard JSDoc for methods and comment only when the reason is not obvious.
- Follow Prettier: double quotes, semicolons, 100 columns, and trailing commas.
- Run `pnpm typecheck` and `pnpm lint` before submitting.
- Import native types from `@splayer/*`; do not edit generated `native/*/index.d.ts` files.
- Use Conventional Commits in the form `<type>: <Chinese summary>` and keep the title on one line.

## Application localization

The application uses [vue-i18n](https://vue-i18n.intlify.dev/). Locale files are stored in `src/i18n/locales/`.

### Visual Studio Code

Install [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally) and configure:

```json
{
  "i18n-ally.localesPaths": "./src/i18n/locales/"
}
```

### JetBrains IDEs

Install [Easy i18n](https://plugins.jetbrains.com/plugin/16316-easy-i18n), select the `VUE_I18N` preset, and use this path template:

```text
$PROJECT_DIR$/src/i18n/locales/{locale}.json
```

## Pull requests

1. Create a feature branch from `dev`.
2. Run formatting, type checking, and linting.
3. Open the PR against `dev` and clearly describe the motivation and changes.
