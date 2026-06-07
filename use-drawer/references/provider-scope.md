# Provider Scope: Reuse vs Nested

Shows how nearest-provider scope works and how to decide whether to reuse the current `drawer-provider` or create a nested one.

## Rule Summary

- `drawer-opener` always uses the nearest ancestor `drawer-provider`
- `inject('closeDrawer')` also closes the nearest ancestor provider's drawer
- Do not add a new provider unless two drawer layers must stay visible at the same time

## Scenario 1: Reuse Current Provider

Use the existing provider when the next action should replace the current drawer.

```vue
<template>
  <drawer-opener
    #="{ open }"
    :component="EditForm"
    :component-props="{ id }"
    :props="{ title: 'Edit User' }"
  >
    <a @click="open">Edit</a>
  </drawer-opener>
</template>
```

## Scenario 2: Add Nested Provider

Add a nested provider when a drawer rendered inside another drawer must open a second drawer without closing the first.

```vue
<template>
  <div class="detail-panel">
    <drawer-provider>
      <drawer-opener
        #="{ open }"
        :component="AuditLog"
        :component-props="{ id }"
        :props="{ title: 'Audit Log', width: 720 }"
      >
        <button @click="open">View Audit Log</button>
      </drawer-opener>
    </drawer-provider>
  </div>

  <drawer-footer>
    <button @click="closeDrawer">Close Detail</button>
  </drawer-footer>
</template>
```

## Quick Check

- Which provider is the nearest ancestor of this opener
- Should the parent drawer remain visible after clicking the trigger
- Which drawer should `closeDrawer` close in the current component
