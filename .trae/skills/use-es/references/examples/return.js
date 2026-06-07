// 箭头函数体如果是单行表达式，省略 return 关键字和花括号。
// 推荐写法：简写体 (concise body)，直接返回表达式
const double = n => n * 2;
const getUser = id => ({ id, name: 'John' });

// 避免写法：块体 (block body)，多余的 return
// const double = n => { return n * 2; };
// const getUser = id => { return { id, name: 'John' }; };

// 2. 卫语句提前返回 (Early Return)：简化嵌套条件
// 推荐写法：提前返回
function processUser(user) {
  if (!user?.age) return;
  return user.age < 18 ? 'minor' : 'adult';
}

// 避免写法：嵌套 if
// function processUser(user) {
//   if (user) {
//     if (user.age) {
//       return user.age < 18 ? 'minor' : 'adult';
//     }
//   }
// }

// 3. 使用可选链 (?.) 与 空合并 (??) 消除多个递进的 if 卫语句
function handleClick(event) {
  // 推荐写法
  if (event.target?.disabled ?? true) return;

  // 避免写法1
  // if (!event.target) return;
  // if (event.target.disabled) return;

  // 避免写法2
  // if (!event.target || event.target.disabled) return;

  event.target.classList.toggle('active');
}

// 4. 空返回优先原则：优先使用 return; 替代 return falsy
// 推荐写法：空返回
function validateAndLog(user) {
  if (!user?.email) return;
  console.log('Valid user:', user);
}

// 避免写法：返回假值
// function validateAndLog(user) {
//   if (!!user?.email) return false;
//   console.log('Valid user:', user);
// }

// 5. 隐式 undefined 返回
function logMessage(msg) {
  console.log(msg);
  // 隐式返回 undefined
}

// 6. 三元运算符返回：取代 if-else 返回
// 推荐写法：三元运算符
const getStatus = age => age >= 18 ? 'adult' : 'minor';

// 避免写法：用if-else返回
// function getStatus(age) {
//   if (age >= 18) {
//     return 'adult';
//   } else {
//     return 'minor';
//   }
// }


// 7. 逻辑运算符和空合并返回：利用短路求值
// 【推荐】极简原则：利用 && 和 || 的短路特性，直接返回计算结果。

// 推荐写法：直接返回逻辑表达式和空合并表达式
const getDisplayName = user => user?.name || 'Anonymous';
const canEdit = (user, doc) => user?.isAdmin ?? user?.id === doc?.ownerId;

// 避免写法：先判断再返回
// function getDisplayName(user) {
//   if (user && user.name) {
//     return user.name;
//   } else {
//     return 'Anonymous';
//   }
// }
