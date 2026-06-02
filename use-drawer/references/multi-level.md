# Multi-level Drawers

Example of opening a drawer from inside another drawer.

```vue
<template>
  <div class="first-drawer-content">
    <h3>First Level Drawer</h3>
    
    <!-- New provider for second level -->
    <drawer-provider>
      <drawer-opener
        :component="SecondDrawerComponent"
        :component-props="{}"
        :props="{ title: 'Second Level Drawer', width: 600 }"
      >
        <template #default="{ open }">
          <button @click="open">Open Second Drawer</button>
        </template>
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
- To open a nested drawer, add a new `<drawer-provider>` inside the first drawer
- **CRITICAL**: Place `<drawer-footer>` OUTSIDE the new provider to attach it to the parent drawer
- If footer is inside the new provider, it will disappear when the second drawer opens