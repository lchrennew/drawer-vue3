// 条件判断简化 (Condition Simplification)
// 本文件专注于如何利用 truthy/falsy 特性激进地简化条件判断

// 1. 布尔值显式比较的简化
// 【场景】检查布尔属性的值

// ❌ 冗余写法：显式与 true/false 比较
if (result.success === true) { /* ... */ }
if (result.success === false) { /* ... */ }
if (config.enabled !== false) { /* ... */ }

// ✅ 推荐写法：直接利用 truthy/falsy
if (result.success) { /* success 为真值时执行 */ }
if (!result.success) { /* success 为假值时执行 */ }
if (config.enabled) { /* enabled 为真值时执行 */ }

// 【注意】只有当属性可能是 undefined/null 且你需要区分它们时，才使用显式比较
// 例如：三态布尔（true/false/undefined）
if (config.enabled === false) { /* 仅当明确设置为 false 时，不包括 undefined */ }

// 2. 数字非零判断的简化
// 【场景】检查数字是否非零、code码检查

// ❌ 冗余写法
if (count !== 0) { /* ... */ }
if (result.code && result.code !== 0) { /* ... */ }
if (errorCode !== null && errorCode !== undefined && errorCode !== 0) { /* ... */ }

// ✅ 推荐写法：利用 0 是假值的特性
if (count) { /* count 非零时执行 */ }
if (result.code) { /* code 存在且非零时执行 */ }
if (errorCode) { /* errorCode 非零时执行 */ }

// 【注意】负数也是真值！
const negativeNum = -1;
if (negativeNum) { console.log("执行：-1 是真值"); }

// 3. 组合判断的激进简化
// 【场景】API 响应检查、多条件错误处理

const result = { success: false, code: 400, message: "请求失败" };

// ❌ 保守写法：保留显式比较
if (result.success === false) {
    throw new Error(result.message ?? '请求失败')
}
if (result.code && result.code !== 0) {
    throw new Error(result.message ?? '请求失败')
}

// ❌ 半简化写法：合并但保留显式比较
if (result.success === false || (result.code && result.code !== 0)) {
    throw new Error(result.message || '请求失败')
}

// ✅ 激进简化写法：充分利用 falsy 特性
// success 为 false（假值）或 code 存在且非零（真值）时抛出错误
if (!result.success || result.code) {
    throw new Error(result.message ?? '请求失败')
}

// 4. 更多组合简化示例

// 【示例 1】检查多个失败条件
// ❌ 保守写法
if (response.ok === false) { /* ... */ }
if (response.status !== null && response.status >= 400) { /* ... */ }
if (!response.data) { /* ... */ }

// ✅ 推荐写法
if (!response.ok || response.status >= 400 || !response.data) {
    // 响应不成功 或 状态码>=400 或 没有数据
}

// 【示例 2】检查有效性
// ❌ 保守写法
if (user !== null && user.isActive === true && user.role !== null && user.role !== undefined && user.isBlocked === false) { /* ... */ }

// ✅ 推荐写法
if (user?.isActive && user?.role && !user?.isBlocked) { /* ... */ }

// 【示例 3】表单验证
// ❌ 保守写法
if (form.name === null || form.name === undefined || form.name === '') {
    errors.push('姓名不能为空')
}
if (form.age !== null && form.age !== undefined && form.age < 18) {
    errors.push('年龄必须大于18岁')
}

// ✅ 推荐写法
if (!form.name) errors.push('姓名不能为空')
if (form.age && form.age < 18) errors.push('年龄必须大于18岁')

// 5. 空值与零值的区分场景

// 【场景】当你需要区分 null/undefined 和 0/false 时

// 使用 ?? (nullish coalescing) 处理 null/undefined，保留 0 和 false
const count = response.count ?? 0; // 如果是 null/undefined 则为 0，但保留 0 本身
const isEnabled = config.enabled ?? true; // 如果是 null/undefined 则为 true，但保留 false 本身

// 使用 || 处理所有假值
const count2 = response.count || 0; // 如果是任何假值（包括 0）则为 0
const name = user.name || 'Anonymous'; // 如果是任何假值（包括 ''）则为 'Anonymous'

// 6. 条件执行的简化

// ❌ 保守写法
if (isLoggedIn === true) {
    trackUserActivity();
}
if (userData !== null && userData !== undefined && userData.id !== null && userData.id !== undefined) {
    saveToCache(userData.id);
}

// ✅ 推荐写法：短路求值
isLoggedIn && trackUserActivity();
userData?.id && saveToCache(userData.id);

// 7. 链式条件取值

// ❌ 保守写法
let userDisplayName;
if (user.nickname !== null && user.nickname !== undefined && user.nickname !== '') {
    userDisplayName = user.nickname;
} else if (user.name !== null && user.name !== undefined && user.name !== '') {
    userDisplayName = user.name;
} else if (user.email !== null && user.email !== undefined && user.email !== '') {
    userDisplayName = user.email;
} else {
    userDisplayName = 'Guest';
}

// ✅ 推荐写法：链式 || 运算
const displayName = user.nickname || user.name || user.email || 'Guest';

// 8. 否定条件的简化

// ❌ 冗余写法
if (status !== 'success') { /* ... */ }
if (!(count > 0)) { /* ... */ }
if (isValid === false || isComplete === false) { /* ... */ }

// ✅ 推荐写法
if (status !== 'success') { /* 字符串比较保持原样 */ }
if (count <= 0) { /* 转换为更直观的表达 */ }
if (!isValid || !isComplete) { /* 利用布尔简化 */ }

// 9. 数组和对象存在性检查

// ❌ 冗余写法
if (arr !== null && arr !== undefined && arr.length > 0) { /* ... */ }
if (obj !== null && obj !== undefined && Object.keys(obj).length > 0) { /* ... */ }

// ✅ 推荐写法
if (arr?.length) { /* 数组存在且非空 */ }
if (Object.keys(obj ?? {}).length) { /* 对象存在且有属性 */ }

// 10. 卫语句 (Guard Clauses) 的简化
// 【场景】函数入口处的参数校验

function processUser(user) {
    // ❌ 保守写法
    if (user === null || user === undefined) {
        throw new Error('用户不能为空');
    }
    if (user.id === null || user.id === undefined || user.id === 0) {
        throw new Error('用户ID无效');
    }
    if (user.isActive === false) {
        throw new Error('用户未激活');
    }

    // ✅ 推荐写法
    if (!user) throw new Error('用户不能为空');
    if (!user.id) throw new Error('用户ID无效');
    if (!user.isActive) throw new Error('用户未激活');

    // 业务逻辑...
}
