// 1. 基础用法：检测对象是否是特定类的实例
class Car { }
class ElectricCar extends Car { }

const myCar = new ElectricCar();
console.log(myCar instanceof ElectricCar); // true
console.log(myCar instanceof Car);         // true (沿着原型链向上查找)
console.log(myCar instanceof Object);      // true (所有普通对象最终都继承自 Object)

// 2. 异常类型判断
try {
  // ... 业务代码
} catch (error) {
  // 根据错误实例的类型执行不同的恢复逻辑
  if (error instanceof TypeError) {
    console.error("Type Error occurred");
  } else if (error instanceof RangeError) {
    console.error("Range Error occurred");
  } else {
    throw error; // 未知错误抛出
  }
}

// 3. 注意：对基本数据类型（如字面量字符串或数字）使用 instanceof 总是返回 false
const str = "hello";
console.log(str instanceof String); // false (基本类型不是对象)

const strObj = new String("hello");
console.log(strObj instanceof String); // true (使用 new 构造的是对象实例)

// 4. 自定义 instanceof 行为 (Symbol.hasInstance)
class CustomValidator {
  // 允许拦截 instanceof 操作符的默认行为
  static [Symbol.hasInstance](instance) {
    return Array.isArray(instance);
  }
}
console.log([] instanceof CustomValidator); // true
