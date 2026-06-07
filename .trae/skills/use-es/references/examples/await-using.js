// 1. 创建实现了 AsyncDisposable 接口的资源
function getAsyncResource() {
  return {
    // 必须实现 Symbol.asyncDispose 方法
    [Symbol.asyncDispose]: async () => {
      console.log("正在异步释放资源...");
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("资源释放完成");
    },
    doSomething() {
      console.log("正在使用资源执行操作");
    }
  };
}

// 2. 使用 await using 声明资源
async function doWork() {
  // 当离开此作用域时（无论正常结束还是抛出异常），都会自动调用 [Symbol.asyncDispose]()
  await using resource = getAsyncResource();

  resource.doSomething();
  // 不需要手动写 try...finally 来清理资源
}

doWork();
