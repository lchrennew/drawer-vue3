---
name: use-es
description: >
  Apply modern ECMAScript (ES) features to generate the most simplified, idiomatic JavaScript/TypeScript code. 
  Use when the user asks to "simplify this code", "refactor using modern JS", "write minimal JS", 
  "use ES6+", or when generating new JS/TS code that should be concise. 
  It enforces best practices for destructuring, optional chaining, nullish coalescing, arrow functions, and truthy/falsy evaluation.
license: CC BY-NC-SA 4.0
metadata:
  author: Li Chun
  version: "1.0"
---

# use-es (使用现代 ES 特性)

本技能旨在指导智能体在编写或重构 JavaScript/TypeScript 代码时，尽可能使用现代 ECMAScript (ES) 特性，以生成最简化的代码。

## 触发条件

- 用户要求编写最简化的 JS 代码。
- 用户要求使用现代 JS 语法重构现有代码。
- 代理在生成 JS/TS 代码时，应当主动遵循本指南以保持代码简洁。

## 核心工作流与指令

当你准备使用 ES 特性编写或重构代码时，必须遵循以下步骤：

1. **评估代码重构点**：仔细阅读现有代码，找出冗余的 `if` 判断、旧式的 `apply` 调用、复杂的回调嵌套、多余的临时变量以及可以通过解构提取的对象属性。
2. **渐进式读取文档**：根据需要重构的具体点，按需加载对应的特性示例文件,切勿在一开始读取所有文件：
   - 涉及变量赋值与属性提取：读取 [destructuring.js](references/examples/destructuring.js)、[optional-chaining.js](references/examples/optional-chaining.js)、[nullish-coalescing.js](references/examples/nullish-coalescing.js) 或 [nullish-coalescing-assignment.js](references/examples/nullish-coalescing-assignment.js)。
   - 涉及函数定义：读取 [arrow-functions.js](references/examples/arrow-functions.js)、[default-parameters.js](references/examples/default-parameters.js) 或 [rest-parameters.js](references/examples/rest-parameters.js)。
   - 涉及函数返回值与控制流简化：读取 [return.js](references/examples/return.js)。
   - 涉及数据结构：读取 [spread-syntax.js](references/examples/spread-syntax.js) 或 [template-literals.js](references/examples/template-literals.js)。
   - 涉及异步操作：读取 [promise-await.js](references/examples/promise-await.js)、[for-await-of.js](references/examples/for-await-of.js) 或 [await-using.js](references/examples/await-using.js)。
   - 涉及条件判断简化：读取 [condition-simplify.js](references/examples/condition-simplify.js)（布尔值、数字、组合判断的激进简化）或 [truthy-falsy.js](references/examples/truthy-falsy.js)（truthy/falsy 基础概念）。
   - 涉及类型判断：读取 [instanceof.js](references/examples/instanceof.js)。
   - 需要高级组合用法参考：读取 [combined-example-1.js](references/examples/combined-example-1.js) 和 [combined-example-2.js](references/examples/combined-example-2.js)。
3. **应用 ES 特性**：
   - 只要能写成单行表达式的箭头函数，**必须**使用简写体。
   - 取代所有旧的 `&&` 短路判空，全面使用可选链 `?.`。
   - 全面拥抱假值 (Falsy) 特性，消除 `!== null && !== undefined` 这种啰嗦的判断。
   - **激进简化布尔和数字判断**：
     - `=== true/false` 一律简化为直接判断或 `!` 取反
     - `!== 0` 一律简化为直接判断（利用 0 是假值）
     - 多个独立的错误检查合并为单个 `||` 或 `&&` 表达式
   - 消除所有的 `arguments`，使用剩余参数 `...args`。
4. **自查与验证**：在输出代码前，自行检查是否达到了“绝对精简”的目标，并确认代码逻辑没有因为过度简写而改变原始行为。

## 陷阱与易错点 (Gotchas)

- **箭头函数陷阱**：箭头函数没有自己的 `this` 和 `arguments`，绝不能用作构造函数或对象方法（若需绑定自身 `this`）。
- **空值合并 `??` 与 `||` 的混淆**：`??` 只在 `null/undefined` 时生效。如果你希望 `0` 或 `""` 被视为无效并使用默认值，请使用 `||` 而不是 `??`。
- **解构陷阱**：在函数参数中使用解构时，务必提供默认值（如 `({ name } = {})`），防止传入 `undefined` 导致整个解构崩溃。
- **可选链赋值陷阱**：`?.` 只能用于读取或执行，绝对不能出现在赋值等式的左侧（如 `a?.b = 1` 是语法错误）。

## 代码生成约束

1. **绝对精简**：避免任何可以通过上述 ES 特性简化的冗余代码。
2. **优先解构**：在提取对象属性或数组元素时，优先使用解构赋值。
3. **保持可读性**：在极度简化的同时，确保代码逻辑清晰易懂。
4. **渐进披露**：不要在一开始加载所有示例代码，只在遇到不确定的特性时，才读取对应的参考文件。

> **组合用法提示**：当你准备进行复杂的代码重构或不确定如何组合上述特性时，请主动读取 [combined-example-1.js](references/examples/combined-example-1.js) 和 [combined-example-2.js](references/examples/combined-example-2.js) 获取综合示例。
