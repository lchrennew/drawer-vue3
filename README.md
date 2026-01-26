# drawer-vue3

[中文](./README.zh-CN.md) | English

A flexible and powerful Drawer component wrapper for Vue 3 and Ant Design Vue. It simplifies drawer management by allowing you to open drawers programmatically, pass components and props dynamically, and handle footers with ease.

## Features

- **Programmatic Control**: Open and close drawers using `inject` or helper components.
- **Dynamic Content**: Render any Vue component inside the drawer with props and context.
- **Footer Management**: Easily render custom footers from within the drawer content using `<DrawerFooter>`.
- **Context Injection**: Pass context data seamlessly to the drawer component.
- **Docked Mode**: Support for docking the drawer within a specific container.

## Installation

```bash
npm install drawer-vue3
# or
yarn add drawer-vue3
```

Ensure you have `ant-design-vue` and `vue` installed.

## Usage

### 1. Setup

Wrap your application (or the part where you want drawers to appear) with `DrawerProvider`.

```vue
<template>
  <DrawerProvider>
    <App />
  </DrawerProvider>
</template>

<script setup>
import DrawerProvider from './src/DrawerProvider.vue'; // Adjust path based on your structure
</script>
```

### 2. Opening a Drawer

You can open a drawer using the provided `openDrawer` function or the `DrawerOpener` component.

#### Method A: Using `inject`

```vue
<script setup>
import { inject } from 'vue';
import MyComponent from './MyComponent.vue';

const openDrawer = inject('openDrawer');

const handleOpen = () => {
  openDrawer({
    component: MyComponent,
    props: { title: 'My Drawer', width: 500 }, // Ant Design Drawer props
    componentProps: { id: 123 }, // Props passed to MyComponent
    footer: true, // Enable footer area
  });
};
</script>

<template>
  <button @click="handleOpen">Open Drawer</button>
</template>
```

#### Method B: Using `DrawerOpener`

```vue
<template>
  <DrawerOpener
    :component="MyComponent"
    :props="{ title: 'My Drawer' }"
    :component-props="{ id: 123 }"
    footer
  >
    <template #default="{ open }">
      <button @click="open">Open Drawer</button>
    </template>
  </DrawerOpener>
</template>

<script setup>
import DrawerOpener from './src/DrawerOpener.vue';
import MyComponent from './MyComponent.vue';
</script>
```

### 3. Custom Footer

Inside your drawer component (`MyComponent.vue`), you can render content into the drawer's footer using `DrawerFooter`.

```vue
<template>
  <div>
    <h1>Drawer Content</h1>
    <p>Some content here...</p>

    <DrawerFooter>
      <a-button @click="close">Cancel</a-button>
      <a-button type="primary" @click="save">Save</a-button>
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
  // Logic...
  closeDrawer();
};
</script>
```

## API

### DrawerProvider

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `drawer` | Object | `{}` | Default props applied to the underlying `a-drawer`. |
| `docked` | Boolean | `false` | If `true`, the drawer container positions absolutely within its parent. |

### openDrawer Options

| Property | Type | Description |
| --- | --- | --- |
| `component` | Component | The Vue component to render inside the drawer. |
| `props` | Object | Props passed to `a-drawer` (e.g., `title`, `width`, `maskClosable`). |
| `componentProps` | Object | Props passed to the rendered `component`. |
| `componentContext` | Object | Additional context provided to the component (accessible via `inject`). |
| `footer` | Boolean | Whether to enable the footer portal. Default `false`. |

### DrawerOpener Props

| Prop | Type | Required | Description |
| --- | --- | --- | --- |
| `component` | Component | Yes | The component to render. |
| `props` | Object | No | Props for the drawer. |
| `componentProps` | Object | Yes | Props for the component. |
| `componentContext` | Object | No | Context for the component. |
| `footer` | Boolean | No | Enable footer. Default `false`. |
| `closeOnDestroy` | Boolean | No | Close drawer when opener unmounts. Default `true`. |
