# DrawerOpener Without Props

Example when the inner component has no props.

```vue
<template>
  <drawer-opener
    :component="SimpleComponent"
    :component-props="{}"
    :props="{ title: 'Simple Drawer' }"
  >
    <template #default="{ open }">
      <button @click="open">Open</button>
    </template>
  </drawer-opener>
</template>

<script setup>
import { DrawerOpener } from 'drawer-vue3'
import SimpleComponent from './SimpleComponent.vue'
</script>
```

## Key Points
- **CRITICAL**: Even when the component has no props, you MUST pass `:component-props="{}"`
- Omitting `:component-props` will cause the inner component to receive `undefined`