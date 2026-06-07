// 1. 对象属性的可选链访问
const user = { name: "Alice", address: { city: "Wonderland" } };
// 如果 address 存在则读取 zipCode，否则返回 undefined（不会抛出错误）
const zip = user?.address?.zipCode;
const nonExistentUser = null;
const name = nonExistentUser?.name; // undefined

// 2. 括号语法访问 (Bracket notation)
// 适用于动态属性名或数组索引
const propName = "city";
const city = user?.address?.[propName];
const arr = undefined;
const firstItem = arr?.[0]; // undefined

// 3. 函数或方法调用的可选链
const obj = {
    sayHello() { console.log("Hello"); }
};
// 仅当 sayHello 是一个函数时才会执行，否则返回 undefined
obj.sayHello?.();
obj.nonExistentMethod?.(); // undefined，不会抛出 TypeError: ... is not a function

// 4. 与空值合并运算符 (??) 结合使用的经典模式
// 当嵌套属性不存在时，提供一个默认值
const customerCity = user?.customerInfo?.city ?? "Unknown City";

// 5. 注意事项：可选链不能用于赋值操作的左侧
// user?.address?.zipCode = "12345"; // 语法错误：SyntaxError: Invalid left-hand side in assignment
