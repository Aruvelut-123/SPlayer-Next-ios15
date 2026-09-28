/**
 * AbortSignal.timeout polyfill（Safari 16.0+ / iOS 16+ 才有）。
 * iOS 15.8.8 的 WKWebView 缺失该静态方法，移动端 fetch 超时多处依赖它，缺失会在
 * 构建产物求值时直接抛 TypeError。行为对齐规范：超时后以 DOMException
 * TimeoutError 中止信号，本次任务队列之后触发（0ms 也排到队尾）。
 */
const install = (): void => {
  if (typeof globalThis.AbortSignal === "undefined") return;
  const Ctor = globalThis.AbortSignal as typeof AbortSignal & {
    timeout?: (ms: number) => AbortSignal;
  };
  if (typeof Ctor.timeout === "function") return;
  Ctor.timeout = (ms: number): AbortSignal => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      controller.abort(new DOMException("The operation timed out.", "TimeoutError"));
    }, ms);
    controller.signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
      },
      { once: true },
    );
    return controller.signal;
  };
};

install();