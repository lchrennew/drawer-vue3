// 1. 基础用法与 || 的对比
// ?? 仅在左侧为 null 或 undefined 时才返回右侧
// || 在左侧为任何假值 (0, "", NaN, false) 时都会返回右侧
const count = 0 ?? 42;          // 返回 0
const fallbackCount = 0 || 42;  // 返回 42

const text = "" ?? "default";          // 返回 ""
const fallbackText = "" || "default";  // 返回 "default"

const nullValue = null ?? "default";   // 返回 "default"
const undefValue = undefined ?? "default"; // 返回 "default"

// 2. 短路求值 (Short-circuiting)
// 与 || 和 && 类似，如果左侧能够决定结果，右侧的表达式将不会被执行
function getFallback() {
    console.log("Fallback evaluated!");
    return "fallback";
}
const result = "Valid string" ?? getFallback();
// getFallback() 不会被调用，result 为 "Valid string"

// 3. 不能与 AND (&&) 和 OR (||) 运算符直接混合使用，除非使用圆括号
// null || undefined ?? "foo"; // 语法错误：SyntaxError
(null || undefined) ?? "foo";  // 正确：返回 "foo"
