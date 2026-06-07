// 1. 基础用法：等待 Promise resolve 并捕获 rejection
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    // 如果 response.json() 返回 Promise，await 会解包它的结果
    return await response.json();
  } catch (error) {
    // 捕获 fetch 的网络错误或 json 解析错误
    console.error("Fetch failed", error);
  }
}

// 2. await 非 Promise 值
// 如果 await 后面的值不是 Promise，它会被自动包装进一个已 resolve 的 Promise 中
async function getNumber() {
  const num = await 42;
  return num; // 42
}

// 3. 顶层 await (Top-level await)
// 在 ES 模块 (ES modules) 中，可以在模块的顶层直接使用 await，而不需要包裹在 async 函数内
// const config = await fetch('/config.json').then(res => res.json());
// export { config };

// 4. 并发执行 Promise
// 注意：不要在相互独立的请求中连续使用 await，这会导致阻塞串行。应该使用 Promise.all。
async function fetchMultipleData() {
  // 错误示范：串行等待，耗时 = req1耗时 + req2耗时
  // const user = await fetchUser(1);
  // const posts = await fetchPosts(1);

  // 正确示范：并行触发，耗时 = max(req1耗时, req2耗时)
  const [user, posts] = await Promise.all([
    fetchUser(1),
    fetch(`/api/posts?userId=1`).then(res => res.json())
  ]);

  return { user, posts };
}
