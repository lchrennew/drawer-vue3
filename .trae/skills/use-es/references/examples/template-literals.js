// 1. 基础多行字符串 (Multi-line strings)
// 会保留所有的换行符和缩进
const message = `
  Hello, user!
  Welcome to our platform.
`;

// 2. 字符串插值 (String interpolation)
// 可以嵌入任何有效的 JavaScript 表达式
const a = 5;
const b = 10;
console.log(`Fifteen is ${a + b} and not ${2 * a + b}.`);

// 3. 嵌套模板 (Nesting templates)
const classes = `header ${isLargeScreen() ? '' : `icon-${item.isCollapsed ? 'expander' : 'collapser'}`}`;

// 4. 标签模板 (Tagged templates)
// 标签是一个可以解析模板字面量的函数。
// 它的第一个参数包含一个字符串值的数组，其余参数与表达式相关。
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? `<strong>${values[i]}</strong>` : '';
    return result + str + value;
  }, '');
}
const name = "Alice";
const age = 25;
const html = highlight`User ${name} is ${age} years old.`;
// 结果: "User <strong>Alice</strong> is <strong>25</strong> years old."

// 5. 原始字符串 (Raw strings)
// 使用内置的 String.raw 标签，可以获取不处理转义字符（如 \n, \t）的原始字符串
const filePath = String.raw`C:\Development\profile\aboutme.html`;
// 打印出来会有完整的反斜杠，而不会把 \n 解析为换行
