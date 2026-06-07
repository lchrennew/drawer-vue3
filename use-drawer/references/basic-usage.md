# Drawer Opener: Basic Usage

Shows the standard drawer pattern: use the default slot's `{ open }`, pass `:component-props`, and add `footer` only when needed.

## Correct Example

```vue
<template>
  <drawer-opener
    #="{ open }"
    :component="MyComponent"
    :component-props="{ id: 123, name: 'John' }"
    :props="{ title: 'User Details', width: 400 }"
    footer
  >
    <button @click="open">Open Drawer</button>
  </drawer-opener>
</template>

<script setup>
import { DrawerOpener } from 'drawer-vue3'
import MyComponent from './MyComponent.vue'
</script>
```

## Wrong Example

The button is rendered, but the drawer never opens because `open` is not called.

```vue
<template>
  <drawer-opener
    :component="MyComponent"
    :component-props="{ id: 123 }"
    :props="{ title: 'User Details' }"
  >
    <button>Open Drawer</button>
  </drawer-opener>
</template>
```

## Key Points
- Always pass `:component-props` even if it's a simple object
- The `footer` boolean prop enables footer slot in the inner component
- Use `#="{ open }"` to access the default slot props
- The trigger inside the default slot must explicitly call `open`
