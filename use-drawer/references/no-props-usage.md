# Drawer Opener: No Component Props

Shows the same opener pattern when the inner component has no props. You still MUST pass `:component-props="{}"`.

```vue
<template>
  <drawer-opener
    #="{ open }"
    :component="SimpleComponent"
    :component-props="{}"
    :props="{ title: 'Simple Drawer' }"
  >
    <button @click="open">Open</button>
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
