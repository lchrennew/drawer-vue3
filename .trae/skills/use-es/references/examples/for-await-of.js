// 1. 遍历异步可迭代对象 (AsyncIterable)
// 常用于读取 Node.js 中的流或从异步生成器中获取数据
async function processStream(stream) {
  for await (const chunk of stream) {
    console.log("Received chunk:", chunk);
  }
}

// 2. 遍历由 Promise 组成的同步数组
// for await...of 会按照数组的顺序，等待每个 Promise resolve 后再执行下一次循环
async function fetchAll(urls) {
  const fetchPromises = urls.map(url => fetch(url));

  // 即使 fetchPromises 是一个同步数组，for await...of 也会等待每个 promise
  for await (const response of fetchPromises) {
    const data = await response.json();
    console.log("Data fetched:", data);
  }
}

// 3. 搭配异步生成器 (Async Generator) 使用
async function* asyncGenerator() {
  yield await Promise.resolve(1);
  yield await Promise.resolve(2);
  yield await Promise.resolve(3);
}

async function runGenerator() {
  for await (const num of asyncGenerator()) {
    console.log("Generated:", num);
  }
}
