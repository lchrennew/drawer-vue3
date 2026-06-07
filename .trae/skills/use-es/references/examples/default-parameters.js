// 1. 基础默认参数：只有在传入 undefined 或未传参时才会使用默认值（传入 null、false、"" 均不会触发默认值）
function greet(name = "Guest", greeting = "Hello") {
  console.log(`${greeting}, ${name}!`);
}

greet(); // "Hello, Guest!"
greet("Alice"); // "Hello, Alice!"
greet(undefined, "Hi"); // "Hi, Guest!"

// 2. 默认参数是在调用时求值的（动态求值）
function append(value, array = []) {
  array.push(value);
  return array;
}
// 每次调用未传 array 时，都会创建一个新的空数组
append(1); // [1]
append(2); // [2] 不会变成 [1, 2]

// 3. 后面的默认参数可以引用前面的参数（参数的作用域是从左到右的）
function calculateTotal(price, tax = price * 0.1, total = price + tax) {
  return total;
}
calculateTotal(100); // 110
