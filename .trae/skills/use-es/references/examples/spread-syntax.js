// 1. 在函数调用中展开数组 (替代 apply)
function sum(x, y, z) {
    return x + y + z;
}
const numbers = [1, 2, 3];
// 传统写法：sum.apply(null, numbers)
console.log(sum(...numbers));

// 2. 构造和合并数组
const arr1 = [1, 2];
const arr2 = [3, 4];
// 可以将展开操作放在数组字面量的任何位置
const combined = [0, ...arr1, 2.5, ...arr2, 5]; // [0, 1, 2, 2.5, 3, 4, 5]

// 3. 数组的浅拷贝 (Shallow copy)
const originalArr = ['a', 'b', 'c'];
const copiedArr = [...originalArr]; // 更改 copiedArr 不会影响 originalArr

// 4. 将类数组对象或可迭代对象转换为真正数组
const nodeList = document.querySelectorAll('div');
const nodeArray = [...nodeList];
const charArray = [...'hello']; // ['h', 'e', 'l', 'l', 'o']

// 5. 构造和合并对象 (Object spread)
const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { lang: 'fr', admin: true };
// 后面展开的属性会覆盖前面的同名属性
const finalConfig = { ...defaults, ...userPrefs, status: 'active' };
// { theme: 'light', lang: 'fr', admin: true, status: 'active' }

// 6. 对象的浅拷贝 (Shallow copy)
const originalObj = { a: 1, b: { c: 2 } };
const copiedObj = { ...originalObj };
// 注意：嵌套的对象引用并未断开
copiedObj.b.c = 3;
console.log(originalObj.b.c); // 3
