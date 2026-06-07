// 1. 基础用法：仅当左侧为 null 或 undefined 时才会进行赋值
const config = { timeout: 0, title: "" };

// timeout 为 0（假值但不是 null/undefined），所以不会发生赋值，仍为 0
config.timeout ??= 3000;

// title 为 ""（假值但不是 null/undefined），所以不会发生赋值，仍为 ""
config.title ??= "Default Title";

// retries 是 undefined，所以会进行赋值
config.retries ??= 5;

console.log(config); // { timeout: 0, title: "", retries: 5 }

// 2. 短路求值 (Short-circuiting)
// 与逻辑赋值运算符相同，??= 会进行短路求值。
// 如果左侧不是 nullish，右侧的表达式根本不会被执行。
let a = 1;
a ??= console.log("This will not be logged");

let b = null;
b ??= console.log("This WILL be logged"); // 打印并赋值为 undefined（因为 console.log 返回 undefined）

// 3. 在处理可能缺失的深层嵌套属性时的常见模式
const user = { settings: {} };
// 确保 user.settings.themes 存在，如果不存在则初始化为空数组
user.settings.themes ??= [];
user.settings.themes.push("dark");
