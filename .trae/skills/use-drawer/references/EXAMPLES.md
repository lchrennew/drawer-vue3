# DrawerOpener Code Examples

Complete code examples for using drawer-vue3 in different scenarios.

## Basic Usage with Props

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

## Usage Without Props

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

## Inner Component with Footer

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
const props = defineProps({ id: Number })
const user = inject('user')

const handleSubmit = () => {
  console.log('Submit', props.id)
  closeDrawer()
}
</script>

<style scoped lang="less">
.my-drawer-content {
  padding: 16px;
}
</style>
```

## Multi-level Drawers

```vue
<template>
  <div class="first-drawer-content">
    <h3>First Level Drawer</h3>
    
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

## Setup DrawerProvider

```vue
<template>
  <drawer-provider>
    <router-view />
  </drawer-provider>
</template>

<script setup>
import { DrawerProvider } from 'drawer-vue3'
</script>
```
