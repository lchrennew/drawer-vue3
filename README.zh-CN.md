# drawer-vue3

中文 | [English](./README.md)

一个基于 Vue 3 和 Ant Design Vue 的灵活强大的抽屉组件封装。它简化了抽屉管理，允许你通过编程方式打开抽屉，动态传递组件和属性，并轻松处理页脚。

## 特性

- **编程控制**：使用 `inject` 或辅助组件打开和关闭抽屉。
- **动态内容**：在抽屉中渲染任何带有属性和上下文的 Vue 组件。
- **页脚管理**：使用 `<DrawerFooter>` 在抽屉内容内部轻松渲染自定义页脚。
- **上下文注入**：将上下文数据无缝传递给抽屉组件。
- **停靠模式**：支持将抽屉停靠在特定容器内。

## 安装

```bash
npm install drawer-vue3
# 或
yarn add drawer-vue3
```

确保你已经安装了 `ant-design-vue` 和 `vue`。

## 使用方法

### 1. 设置

使用 `DrawerProvider` 包裹你的应用（或你希望抽屉出现的部分）。

```vue
<template>
  <DrawerProvider>
    <App />
  </DrawerProvider>
</template>

<script setup>
import DrawerProvider from './src/DrawerProvider.vue'; // 根据你的结构调整路径
</script>
```

### 2. 打开抽屉

你可以使用提供的 `openDrawer` 函数或 `DrawerOpener` 组件来打开抽屉。

#### 方法 A：使用 `inject`

```vue
<script setup>
import { inject } from 'vue';
import MyComponent from './MyComponent.vue';

const openDrawer = inject('openDrawer');

const handleOpen = () => {
  openDrawer({
    component: MyComponent,
    props: { title: '我的抽屉', width: 500 }, // Ant Design Drawer 属性
    componentProps: { id: 123 }, // 传递给 MyComponent 的属性
    footer: true, // 启用页脚区域
  });
};
</script>

<template>
  <button @click="handleOpen">打开抽屉</button>
</template>
```

#### 方法 B：使用 `DrawerOpener`

```vue
<template>
  <DrawerOpener
    :component="MyComponent"
    :props="{ title: '我的抽屉' }"
    :component-props="{ id: 123 }"
    footer
  >
    <template #default="{ open }">
      <button @click="open">打开抽屉</button>
    </template>
  </DrawerOpener>
</template>

<script setup>
import DrawerOpener from './src/DrawerOpener.vue';
import MyComponent from './MyComponent.vue';
</script>
```

### 3. 自定义页脚

在你的抽屉组件（`MyComponent.vue`）内部，你可以使用 `DrawerFooter` 将内容渲染到抽屉的页脚。

```vue
<template>
  <div>
    <h1>抽屉内容</h1>
    <p>这里是一些内容...</p>

    <DrawerFooter>
      <a-button @click="close">取消</a-button>
      <a-button type="primary" @click="save">保存</a-button>
    </DrawerFooter>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import DrawerFooter from './src/DrawerFooter.vue';

const closeDrawer = inject('closeDrawer');

const close = () => {
  closeDrawer();
};

const save = () => {
  // 逻辑...
  closeDrawer();
};
</script>
```

## API

### DrawerProvider

| 属性 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `drawer` | Object | `{}` | 应用于底层 `a-drawer` 的默认属性。 |
| `docked` | Boolean | `false` | 如果为 `true`，抽屉容器将在其父容器内绝对定位。 |

### openDrawer 选项

| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `component` | Component | 要在抽屉内渲染的 Vue 组件。 |
| `props` | Object | 传递给 `a-drawer` 的属性（例如 `title`、`width`、`maskClosable`）。 |
| `componentProps` | Object | 传递给渲染组件的属性。 |
| `componentContext` | Object | 提供给组件的额外上下文（可通过 `inject` 访问）。 |
| `footer` | Boolean | 是否启用页脚传送门。默认为 `false`。 |

### DrawerOpener 属性

| 属性 | 类型 | 必填 | 描述 |
| --- | --- | --- | --- |
| `component` | Component | 是 | 要渲染的组件。 |
| `props` | Object | 否 | 抽屉的属性。 |
| `componentProps` | Object | 是 | 组件的属性。 |
| `componentContext` | Object | 否 | 组件的上下文。 |
| `footer` | Boolean | 否 | 启用页脚。默认为 `false`。 |
| `closeOnDestroy` | Boolean | 否 | opener 卸载时关闭抽屉。默认为 `true`。 |
