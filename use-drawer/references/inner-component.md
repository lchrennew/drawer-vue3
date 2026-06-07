# Drawer Content: Footer and Close

Shows the dynamic component rendered inside the drawer, including `closeDrawer`, `defineProps()`, and `<drawer-footer>`.

```vue
<template>
  <div class="my-drawer-content">
    <p>Drawer Content Here for ID: {{ id }}</p>
    <p>User: {{ user }}</p>
  </div>
  
  <drawer-footer>
    <button @click="closeDrawer">Cancel</button>
    <button type="primary" @click="handleSubmit">Submit</button>
  </drawer-footer>
</template>

<script setup>
import { inject } from 'vue'
import { DrawerFooter } from 'drawer-vue3'

const closeDrawer = inject('closeDrawer')
const { id } = defineProps({ id: Number })
const user = inject('user')

const handleSubmit = () => {
  console.log('Submit', id)
  closeDrawer()
}
</script>

<style scoped lang="less">
.my-drawer-content {
  padding: 16px;
}
</style>
```

## Key Points
- Use `inject('closeDrawer')` to get the close function
- Access props via `defineProps()` as usual
- `<drawer-footer>` content will be teleported to the drawer's footer slot
- The opener must have `footer` prop set to `true` for footer to work
