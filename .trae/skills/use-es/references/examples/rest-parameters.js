// 1. 基础用法：将无限数量的参数表示为一个数组
function sum(...numbers) {
  // numbers 是一个真正的 Array 实例，可以直接使用所有的数组方法
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// 2. 结合常规参数使用：剩余参数必须是函数签名中的最后一个参数
function multiplyMultiplier(multiplier, ...numbers) {
  return numbers.map(n => n * multiplier);
}
console.log(multiplyMultiplier(2, 1, 2, 3)); // [2, 4, 6]

// 3. 与 arguments 对象的区别
// - arguments 是一个类数组对象，不具有 Array 的内置方法（如 map, sort, pop 等）
// - 剩余参数只包含没有对应形参的那些参数，而 arguments 包含传给函数的所有参数
// - 箭头函数中没有自己的 arguments 对象，只能使用剩余参数
const arrowFunc = (...args) => {
  // args.sort() 是合法的，而 arguments.sort() 会报错
  return args.sort();
};

// 4. 在剩余参数上使用解构
function handleMultipleUsers(...[firstUser, secondUser, ...otherUsers]) {
  console.log("First:", firstUser);
  console.log("Second:", secondUser);
  console.log("Others:", otherUsers);
}
handleMultipleUsers("Alice", "Bob", "Charlie", "Dave");
// First: Alice, Second: Bob, Others: ["Charlie", "Dave"]
