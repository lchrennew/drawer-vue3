// 1. 基础对象解构与深层解构
const user = { name: "Alice", age: 25, address: { city: "Wonderland" } };
const { name, age, address: { city } } = user;

// 2. 对象解构时的别名与默认值
const profile = { username: "Bob", role: "admin" };
// 将 username 提取为变量 loginName，并为可能缺失的 theme 赋予默认值
const { username: loginName, role, theme = "dark" } = profile;

// 3. 基础数组解构与剩余参数 (Rest property)
const array = [1, 2, 3, 4, 5];
// first 为 1，second 为 2，rest 为 [3, 4, 5]
const [first, second, ...rest] = array;

// 4. 数组解构跳过元素与默认值
const colors = ["red", undefined, "blue"];
// 跳过第二个元素，并为 undefined 元素提供默认值
const [primaryColor, , secondaryColor, tertiaryColor = "green"] = colors;

// 5. 在函数参数中直接使用解构
function printUser({ name, age, address: { city } = {} }) {
    console.log(`${name} is ${age} and lives in ${city}`);
}
// 搭配默认参数使用，防止传入 undefined 导致解构报错
function configure({ timeout = 1000, retries = 3 } = {}) {
    console.log(`Timeout: ${timeout}, Retries: ${retries}`);
}

// 6. 交换变量值 (不使用临时变量)
let a = 1, b = 2;
[a, b] = [b, a];
