// 1. 基础箭头函数：函数体 (Function body)
// 【推荐】极简原则：只要函数体能写成单行表达式，就坚决使用“简写体 (concise body)”，省略花括号和 return。
const numbers = [1, 2, 3];
// 推荐写法
const doubled = numbers.map(n => n * 2);

// 块体 (Block body)：仅在逻辑复杂，必须包含多条语句时才使用花括号，此时必须显式 return
const addAndLog = (a, b) => {
    const sum = a + b;
    console.log(`Sum is ${sum}`);
    return sum; // 必须显式 return
};

// 2. 参数括号
// 【推荐】极简原则：当只有一个参数时，坚决省略圆括号。
// 推荐写法： n => n * 2
// 避免写法： (n) => n * 2

// 多个参数或无参数时，必须保留括号
const add = (a, b) => a + b;
const ping = () => console.log("pong");

// 3. 返回对象字面量时，必须用圆括号包裹对象
// 【推荐】这比写块体加 return 更加极简
const createPerson = (name, age) => ({ name, age });
// 避免冗余写法： const createPerson = (name, age) => { return { name, age }; };

// 4. 不绑定自己的 this、arguments、super 或 new.target
// 箭头函数没有自己的 this，它会捕获其定义时所处的外层执行环境的 this
class Counter {
    constructor() {
        this.count = 0;
    }

    start() {
        // 这里的箭头函数中的 this 继承自 start() 方法被调用时的 this
        setInterval(() => {
            this.count++;
        }, 1000);
    }
}

// 5. 不能用作构造函数 (Cannot be used as constructors)
// 箭头函数不能使用 new 关键字调用，因为它们没有 prototype 属性，也没有自己的 this
const Foo = () => { };
// const foo = new Foo(); // TypeError: Foo is not a constructor

// 6. 不能用作生成器 (Cannot be used as generators)
// 箭头函数体内不能使用 yield 关键字
// const generator = () => { yield 1; }; // SyntaxError
