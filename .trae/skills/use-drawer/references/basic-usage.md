# Basic DrawerOpener Usage

Example of opening a drawer with component props.

```vue
<template>
  <drawer-opener
    :component="MyComponent"
    :component-props="{ id: 123, name: 'John' }"
    :props="{ title: 'User Details', width: 400 }"
    footer
  >
    <template #default="{ open }">
      <button @click="open">Open Drawer</button>
    </template>
  </drawer-opener>
</template>

<script setup>
import { DrawerOpener } from 'drawer-vue3'
import MyComponent from './MyComponent.vue'
</script>
```

## Key Points
- Always pass `:component-props` even if it's a simple object
- The `footer` boolean prop enables footer slot in the inner component
- Use `#default="{ open }"` slot to access the open function