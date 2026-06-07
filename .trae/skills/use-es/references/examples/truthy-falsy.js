// 1. 明确假值 (Falsy values)
// JavaScript 中只有 8 个假值：
// false, 0, -0, 0n (BigInt 零), "", null, undefined, NaN
// 其他所有的值都是真值 (Truthy)。

// 2. 利用假值简化条件判断
const value = "Hello";
const arr = [];
const obj = { isValid: true };

// 推荐的极简写法 (配合可选链 ?.)
if (value) { /* 只要 value 是真值，包括 " ", "0" 等非空字符串 */ }
if (!arr?.length) { /* 数组不存在或为空时 arr?.length 返回 undefined 或 0 (均为假值)，! 变为 true */ }
if (obj?.isValid) { /* 对象存在且 isValid 为真值 */ }

// 应该避免的冗余写法
if (value !== null && value !== undefined && value !== '') { /* ... */ }
if (arr == null || arr.length === 0) { /* ... */ }
if (obj !== null && obj.isValid === true) { /* ... */ }
// 即使是老旧的短路写法，现在也推荐直接用可选链替代：
// if (obj && obj.isValid) { /* ... */ }

// 3. 注意容易混淆的真值 (Truthy values)
// 下面这些看起来像空的/假的，但实际上在 JS 中都是真值！
if ("false") { console.log("执行：包含文字 'false' 的字符串是真值"); }
if ("0") { console.log("执行：包含文字 '0' 的字符串是真值"); }
if ([]) { console.log("执行：空数组对象是真值"); }
if ({}) { console.log("执行：空对象是真值"); }
if (function () { }) { console.log("执行：空函数是真值"); }

// 4. 双非操作符 (!!) 强制转换为布尔值
// 有时需要将 truthy/falsy 强制转为严格的 true/false 布尔值（例如传递给强类型的组件或 API）
const isUserLoggedIn = !!userToken; // 如果有 token 返回 true，没有返回 false

// 5. 结合箭头函数进行极简的过滤与查找
// 利用假值的特性，配合简写体箭头函数，实现极为精简的数组处理

const mixedArray = [0, 1, false, 2, '', 3, "hello", null, undefined, NaN];

// 【推荐】过滤掉所有假值 (Falsy values) 的极致写法
// 仅保留真值 (1, 2, 3, "hello")。由于 Boolean 函数也是将其参数转为布尔值，或者直接利用 Boolean 构造函数作为回调
const truthyValues1 = mixedArray.filter(item => !!item); // 不够简洁
const truthyValues2 = mixedArray.filter(Boolean); // 最极简写法

// 【推荐】判断数组中是否包含有效字符串
const strings = ["", "  ", "hello"];
// 过滤空字符串（"" 是假值）并处理空白字符
const validStrings = strings.filter(str => str.trim());
// 找到第一个非空字符串
const firstValid = strings.find(str => str.trim());
