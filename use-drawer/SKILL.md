---
name: use-drawer
description: Use this skill when implementing sliding drawers, side panels, overlay windows, or detail panels in Vue 3 using drawer-vue3. Use when the user asks to add, create, show, or open a drawer, display a component in a side panel, or use DrawerProvider, DrawerOpener, DrawerFooter components. Activate even if they use informal terms like "弹出层", "侧边栏", "详情面板" or don't explicitly mention the library name. Do NOT use for modals, dialogs, or non-drawer overlays.
---

# use-drawer

Instructions for the agent to follow when implementing drawers using `drawer-vue3`.

## Overview
`drawer-vue3` is a dynamic drawer management library for Vue 3 based on Ant Design Vue's `<a-drawer>`. It provides a declarative way to open components inside drawers using `<drawer-opener>` without declaring drawer templates in every file.

## Gotchas
- **CRITICAL: DO NOT use programmatic ways (like `inject('openDrawer')`) to open drawers.** You MUST use the template-based `<drawer-opener>` component.
- The application or the relevant parent section MUST be wrapped in `<drawer-provider>`.
- **Multi-level drawers:** A single `<drawer-provider>` can only manage one drawer at a time. To open a drawer from inside another drawer, the inner component MUST declare its own `<drawer-provider>` to wrap the trigger/opener.
- To render a footer, you MUST set the `footer` boolean prop on `<drawer-opener>`, and then use the `<drawer-footer>` component inside your dynamic component.
- **Important for Footers in Multi-level Drawers:** When using a new `<drawer-provider>` inside a drawer, ensure `<drawer-footer>` is placed **outside/sibling** to the new `<drawer-provider>`, so it correctly teleports to the current drawer's footer, not the nested one.
- Component tags in templates MUST use kebab-case (e.g., `<drawer-provider>`, `<drawer-opener>`, `<drawer-footer>`).
- Vue component code lines should not exceed 100 lines. Refactor large components continuously when modifying code.
- Use ES6 syntax and `<style lang="less">` for styling. Do not use `key` attributes in `v-for` loops.
- Before committing code, ensure you check it against the project's rule files.

## Workflow: Opening a Component in a Drawer

### 1. Setup Provider (if not already done)
Ensure `<drawer-provider>` wraps the area where the drawer should appear.

```vue
<template>
  <drawer-provider>
    <app-content />
  </drawer-provider>
</template>

<script setup>
import { DrawerProvider } from 'drawer-vue3'
</script>
```

### 2. Usage (DrawerOpener)
Use `<drawer-opener>` to handle opening declaratively. **Programmatic opening via `inject('openDrawer')` is strictly forbidden.**

```vue
<template>
  <drawer-opener
    :component="MyComponent"
    :component-props="{ id: 123 }"
    :props="{ title: 'My Drawer', width: 400 }"
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

### 3. Creating the Inner Component with Footer
When creating the component to be rendered inside the drawer, you can inject `closeDrawer` and use `<drawer-footer>`:

```vue
<template>
  <div class="my-drawer-content">
    <p>Drawer Content Here for ID: {{ id }}</p>
  </div>
  <!-- Footer content teleported to the a-drawer footer slot -->
  <drawer-footer>
    <button @click="closeDrawer">Cancel</button>
    <button type="primary">Submit</button>
  </drawer-footer>
</template>

<script setup>
import { inject } from 'vue'
import { DrawerFooter } from 'drawer-vue3'

// Access the close function
const closeDrawer = inject('closeDrawer')

// Access componentProps
const props = defineProps({ id: Number })

// Access componentContext provided by drawer-opener
const user = inject('user')
</script>

<style scoped lang="less">
.my-drawer-content {
  padding: 16px;
}
</style>
```

### 4. Multi-level Drawers (Drawers inside Drawers)
To open a second drawer from within the first one, wrap the trigger area in a new `<drawer-provider>`. 

```vue
<template>
  <div class="first-drawer-content">
    <!-- New provider for the second level drawer -->
    <drawer-provider>
      <drawer-opener
        :component="SecondDrawerComponent"
        :props="{ title: 'Second Level Drawer' }"
      >
        <template #default="{ open }">
          <button @click="open">Open Second Drawer</button>
        </template>
      </drawer-opener>
    </drawer-provider>
  </div>
  
  <!-- Footer stays OUTSIDE the new provider to attach to the first drawer -->
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
```

## Checklist for Implementing a Drawer
- [ ] Verify `<drawer-provider>` is present in the parent component tree.
- [ ] Use `<drawer-opener>` to wrap the trigger element. **Never use `inject('openDrawer')`.**
- [ ] Pass the target component to `:component="TargetComponent"` on the opener.
- [ ] Pass required inner component props via `:component-props`.
- [ ] Pass Ant Design drawer config (like `title`, `width`) via `:props`.
- [ ] Add the `footer` prop on `<drawer-opener>` if the inner component uses `<drawer-footer>`.
- [ ] In the inner component, inject `closeDrawer` to close it programmatically.
- [ ] **For multi-level drawers:** Ensure the inner component declares a new `<drawer-provider>` and that `<drawer-footer>` is placed outside of this new provider.
- [ ] Check that component templates use kebab-case for custom tags.