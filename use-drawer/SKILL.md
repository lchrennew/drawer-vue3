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
- **CRITICAL: ALWAYS pass `:component-props` to `<drawer-opener>` even if it's an empty object `{}`**. The inner component expects props, and omitting this attribute will cause props to be undefined. If the inner component has no props, explicitly pass `:component-props="{}"`.
- The application or the relevant parent section MUST be wrapped in `<drawer-provider>`.
- **Multi-level drawers:** A single `<drawer-provider>` can only manage one drawer at a time. To open a drawer from inside another drawer, the inner component MUST declare its own `<drawer-provider>` to wrap the trigger/opener.
- To render a footer, you MUST set the `footer` boolean prop on `<drawer-opener>`, and then use the `<drawer-footer>` component inside your dynamic component.
- **Important for Footers in Multi-level Drawers:** When using a new `<drawer-provider>` inside a drawer, ensure `<drawer-footer>` is placed **outside/sibling** to the new `<drawer-provider>`, so it correctly teleports to the current drawer's footer, not the nested one.
- Component tags in templates MUST use kebab-case (e.g., `<drawer-provider>`, `<drawer-opener>`, `<drawer-footer>`).
- Vue component code lines should not exceed 100 lines. Refactor large components continuously when modifying code.
- Use ES6 syntax and `<style lang="less">` for styling. Do not use `key` attributes in `v-for` loops.
- Before committing code, ensure you check it against the project's rule files.

## Workflow: Opening a Component in a Drawer

### 1. Setup Provider
Ensure `<drawer-provider>` wraps the area where the drawer should appear (typically at app root or layout level).

### 2. Use DrawerOpener
Wrap your trigger element with `<drawer-opener>`:
- Pass `:component="YourComponent"` to specify what to render inside the drawer
- **MANDATORY**: Pass `:component-props="{ ... }"` or `:component-props="{}"` (never omit)
- Pass `:props="{ title, width, ... }"` for Ant Design drawer configuration
- Add `footer` boolean prop if the inner component uses `<drawer-footer>`

### 3. Create Inner Component
In the component that will be rendered inside the drawer:
- Use `inject('closeDrawer')` to get the close function
- Access passed props via `defineProps()`
- Use `inject('key')` for componentContext values
- Place `<drawer-footer>` at the end if needed (requires `footer: true` on opener)

### 4. Multi-level Drawers (Optional)
To open a drawer from inside another drawer:
- Add a new `<drawer-provider>` inside the first drawer's component
- Place `<drawer-footer>` OUTSIDE the new provider (so it attaches to the parent drawer)

## Code Examples

When you need implementation details, refer to these examples:
- [basic-usage.md](references/basic-usage.md) - Opening a drawer with props
- [no-props-usage.md](references/no-props-usage.md) - When inner component has no props
- [inner-component.md](references/inner-component.md) - Creating the drawer content with footer
- [multi-level.md](references/multi-level.md) - Nested drawers implementation

## Checklist
- [ ] `<drawer-provider>` present in parent tree
- [ ] Using `<drawer-opener>` (NOT `inject('openDrawer')`)
- [ ] `:component="Component"` passed
- [ ] **`:component-props` ALWAYS passed** (use `{}` if no props)
- [ ] `:props="{ title, ... }"` for drawer config
- [ ] `footer` prop set if using `<drawer-footer>`
- [ ] Inner component injects `closeDrawer`
- [ ] Multi-level: new provider + footer placement correct
- [ ] kebab-case for all custom tags