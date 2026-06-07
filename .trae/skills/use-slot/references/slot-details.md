# Vue 插槽详细示例

本参考文档提供了使用最简 `#` 语法操作 Vue 插槽的详细代码示例。

## 1. 独占默认插槽 (Lone Default Slot)

当组件**只包含一个默认插槽**时，你可以将 `#` 直接写在组件标签上，无需额外的 `<template>` 标签，这是最简练的写法。由于参数默认是 `default`，直接使用 `#` 即可，不用写 `#default`。

```vue
<fancy-list :items="items" #="{ item }">
  <div class="item">
    {{ item.body }}
  </div>
</fancy-list>
```
*注意：一旦你需要提供额外的具名插槽，就必须恢复使用 `<template>` 标签，不能再直接写在组件上了。*

## 2. 具名插槽与隐式默认插槽

使用 `#` 后跟插槽名称。在混合插槽的情况下，如果默认插槽不需要接收参数，最简方式是完全省略 `<template>` 标签（即隐式默认插槽：所有顶层非 `<template>` 节点都会被隐式地视为默认插槽的内容）。

```vue
<base-layout>
  <template #header>
    <h1>页面标题</h1>
  </template>

  <!-- 隐式默认插槽：不需要 template 包裹，直接写内容即可 -->
  <p>主要内容放在这里。</p>

  <template #footer>
    <p>底部内容</p>
  </template>
</base-layout>
```

## 3. 作用域插槽

当组件向插槽回传数据时，使用 `#slot-name="slotProps"`。

```vue
<fancy-list :items="items">
  <template #item="slotProps">
    <div class="item">
      {{ slotProps.body }}
    </div>
  </template>
</fancy-list>
```

## 4. 解构作用域插槽

使用 ES6 解构语法直接提取插槽属性中的特定字段，这使得代码更加简洁明了。

```vue
<fancy-list :items="items">
  <template #item="{ body, title }">
    <div class="item">
      <h2>{{ title }}</h2>
      <p>{{ body }}</p>
    </div>
  </template>
</fancy-list>
```

## 5. 动态插槽名

如果插槽的名称是动态的，请将表达式包裹在方括号中。

```vue
<base-layout>
  <template #[dynamicSlotName]>
    <p>动态插槽的内容</p>
  </template>
</base-layout>
```

## 6. 无渲染组件 (Renderless Components)

对于那些自身不渲染任何 HTML，仅提供逻辑的组件，可以使用独占默认插槽的写法，同样直接使用 `#` 即可。

```vue
<mouse-tracker #="{ x, y }">
  <p>鼠标位置：{{ x }}, {{ y }}</p>
</mouse-tracker>
```
