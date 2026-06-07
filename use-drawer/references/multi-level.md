# Nested Drawers: Reuse or Add Provider

Shows how to decide between reusing the current provider and adding a nested provider for a second visible drawer layer.

## When to Add a New Provider

- Reuse the current provider when you only need one visible drawer
- Add a nested provider when the parent drawer must stay open and a child drawer must open on top of it
- `drawer-opener` and `closeDrawer` always target the nearest `drawer-provider`

## Correct Example

```vue
<template>
  <div class="first-drawer-content">
    <h3>First Level Drawer</h3>
    
    <!-- New provider for second level -->
    <drawer-provider>
      <drawer-opener
        #="{ open }"
        :component="SecondDrawerComponent"
        :component-props="{}"
        :props="{ title: 'Second Level Drawer', width: 600 }"
      >
        <button @click="open">Open Second Drawer</button>
      </drawer-opener>
    </drawer-provider>
  </div>
  
  <!-- Footer OUTSIDE the new provider to attach to first drawer -->
  <drawer-footer>
    <button @click="closeDrawer">Close First Drawer</button>
  </drawer-footer>
</template>

<script setup>
import { inject } from 'vue'
import { DrawerProvider, DrawerOpener, DrawerFooter } from 'drawer-vue3'
import SecondDrawerComponent from './SecondDrawerComponent.vue'

const closeDrawer = inject('closeDrawer')
</script>

<style scoped lang="less">
.first-drawer-content {
  padding: 20px;
}
</style>
```

## Key Points
- **CRITICAL**: A single `<drawer-provider>` can only manage one drawer
- Add a nested `<drawer-provider>` only when two drawer levels must coexist
- **CRITICAL**: Place `<drawer-footer>` OUTSIDE the new provider to attach it to the parent drawer
- If footer is inside the new provider, it will disappear when the second drawer opens

## Reuse Current Provider

If the nested action should replace the current drawer instead of opening a second layer, do not add another provider.

```vue
<template>
  <drawer-opener
    #="{ open }"
    :component="SecondDrawerComponent"
    :component-props="{}"
    :props="{ title: 'Replace Current Drawer' }"
  >
    <button @click="open">Open Next Step</button>
  </drawer-opener>
</template>
```
